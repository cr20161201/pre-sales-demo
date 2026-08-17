// 批量（异步任务）API 对比：Decart lucy-vton-3.5 vs Xmax offline-task
// 在 Node 服务端用主 Key 直接调用（server 与 .env 同属本机信任边界）
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

// @xmaxai/sdk 的 ESM 构建含对 @volcengine/rtc（CJS）的具名导出，Node ESM 直连会抛
// "Named export 'AudioSourceType' not found"，必须走 CJS require 入口（dist/index.cjs）。
// 顺序敏感：@volcengine/rtc 在加载时若检测到 globalThis.window 会走浏览器初始化分支直接崩，
// 所以必须先 require 加载 SDK，再补 window polyfill（仅用于 SDK HTTP 客户端运行时的
// window.setTimeout/clearTimeout 调用）。
const require = createRequire(import.meta.url);
const { createXmaxClient } = require("@xmaxai/sdk");
if (typeof globalThis.window === "undefined") {
  globalThis.window = globalThis;
}
// cos-js-sdk-v5 依赖浏览器 XMLHttpRequest：Node 用 xhr2 兜底；xhr2 不支持 send(Blob/File)，
// 包装 send 把 Blob 异步转 Buffer 后走内部 _sendHttp（其内部 _setData 支持 Buffer）。
if (typeof globalThis.XMLHttpRequest === "undefined") {
  const XHR = require("xhr2");
  const origSend = XHR.prototype.send;
  XHR.prototype.send = function (data) {
    if (typeof Blob !== "undefined" && data instanceof Blob) {
      data.arrayBuffer()
        .then(ab => this._sendHttp(Buffer.from(ab)))
        .catch(err => { throw err; });
      return undefined;
    }
    return origSend.call(this, data);
  };
  globalThis.XMLHttpRequest = XHR;
}

const moduleDir = path.dirname(fileURLToPath(import.meta.url));

export async function runBatch({ assetsDir, resultsDir, env, batchVideo }) {
  const batchDir = path.join(resultsDir, "batch");
  fs.mkdirSync(batchDir, { recursive: true });
  const out = { ranAt: new Date().toISOString(), jobs: {} };
  // 批量用裁剪过的 10s H.264 MP4（控制成本与耗时）；未提供则退回原始素材
  const video = batchVideo || path.join(assetsDir, env.TEST_VIDEO || "test-clip.mp4");
  const garment = path.join(assetsDir, env.TEST_GARMENT || "garment.jpg");

  if (env.DECART_API_KEY) {
    try {
      out.jobs.decart = await decartBatch({ video, garment, resultsDir: batchDir, apiKey: env.DECART_API_KEY });
    } catch (e) { out.jobs.decart = { error: e.message }; }
  }
  if (env.XMAX_API_KEY) {
    try {
      out.jobs.xmax = await xmaxBatch({ video, garment, resultsDir: batchDir, apiKey: env.XMAX_API_KEY });
    } catch (e) { out.jobs.xmax = { error: e.message }; }
  }
  fs.writeFileSync(path.join(batchDir, "meta.json"), JSON.stringify(out, null, 2));
  return out;
}

async function decartBatch({ video, garment, resultsDir, apiKey }) {
  const t0 = Date.now();
  const form = new FormData();
  form.append("data", new Blob([fs.readFileSync(video)], { type: "video/mp4" }), path.basename(video));
  form.append("reference_image", new Blob([fs.readFileSync(garment)], { type: "image/jpeg" }), path.basename(garment));
  form.append("prompt", "Substitute the current top with the garment in the reference image");
  form.append("resolution", "720p");

  const submit = await fetch("https://api.decart.ai/v1/jobs/lucy-vton-3.5", {
    method: "POST",
    headers: { "X-API-KEY": apiKey },
    body: form
  });
  const submitJson = await submit.json().catch(() => ({}));
  if (!submit.ok || !submitJson.job_id) throw new Error(`Decart 批量提交失败 ${submit.status}: ${JSON.stringify(submitJson)}`);
  const jobId = submitJson.job_id;

  let status = "submitted";
  let pollJson = null;
  while (status !== "completed" && status !== "failed") {
    await new Promise(r => setTimeout(r, 3000));
    if (Date.now() - t0 > 300000) throw new Error("Decart 批量任务超时（5min）");
    const poll = await fetch(`https://api.decart.ai/v1/jobs/${jobId}`, { headers: { "X-API-KEY": apiKey } });
    pollJson = await poll.json();
    status = pollJson.status;
  }
  if (status === "failed") throw new Error("Decart 批量任务失败");
  const content = await fetch(`https://api.decart.ai/v1/jobs/${jobId}/content`, { headers: { "X-API-KEY": apiKey } });
  const buf = Buffer.from(await content.arrayBuffer());
  const outFile = path.join(resultsDir, "decart-batch.mp4");
  fs.writeFileSync(outFile, buf);
  return { jobId, status, latencyMs: Date.now() - t0, outputBytes: buf.length, outputFile: "decart-batch.mp4" };
}

async function xmaxBatch({ video, garment, resultsDir, apiKey }) {
  const client = createXmaxClient({ apiKey });
  const t0 = Date.now();
  const videoFile = new File([fs.readFileSync(video)], path.basename(video), { type: "video/mp4" });
  const imageFile = new File([fs.readFileSync(garment)], path.basename(garment), { type: "image/jpeg" });

  const videoUpload = await client.files.uploadVideo(videoFile);
  const imageUpload = await client.files.uploadImage(imageFile);

  const submit = await fetch("https://api.xmaxai.com/open/api/v1/offline-task", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Api-Key": apiKey },
    body: JSON.stringify({
      prompt: "视频中人物衣服替换成参考图中衣服",
      refVideoPath: videoUpload.url,
      refImagePath: imageUpload.url,
      quality: "hd",
      fps: 24
    })
  });
  const submitJson = await submit.json().catch(() => ({}));
  if (!submit.ok || !submitJson.data?.uid) throw new Error(`Xmax 离线任务提交失败 ${submit.status}: ${JSON.stringify(submitJson)}`);
  const uid = submitJson.data.uid;

  let status = "submitted";
  let meta = null;
  while (status !== "completed" && status !== "error") {
    await new Promise(r => setTimeout(r, 3000));
    if (Date.now() - t0 > 300000) throw new Error("Xmax 离线任务超时（5min）");
    const poll = await fetch(`https://api.xmaxai.com/open/api/v1/offline-task/${uid}`, { headers: { "X-Api-Key": apiKey } });
    const pollJson = await poll.json();
    meta = pollJson.data;
    status = meta?.status;
  }
  if (status === "error") throw new Error("Xmax 离线任务失败");
  const dl = await fetch(meta.result?.result_url);
  const buf = Buffer.from(await dl.arrayBuffer());
  const outFile = path.join(resultsDir, "xmax-batch.mp4");
  fs.writeFileSync(outFile, buf);
  return {
    uid,
    status,
    latencyMs: Date.now() - t0,
    chargePoints: meta.chargePoints,
    billableDurationSeconds: meta.billableDurationSeconds,
    outputBytes: buf.length,
    outputFile: "xmax-batch.mp4"
  };
}
