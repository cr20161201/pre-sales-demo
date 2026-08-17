// Decart 诊断 v6：二次换装生效延迟
// 流程：connect(lucy-vton-3) → set#1(garment.jpg) → 等首帧 → 稳定 10s → set#2(garment.png)
// 换装生效判定：set#2 后帧间像素差显著跳变（>2.5× 基线均值）的时间点
import { createDecartClient, models } from "@decartai/sdk";
import { DEFAULTS, params } from "../shared/config.mjs";
import { loadFile, postResults, sleep } from "../shared/metrics.mjs";

const p = params();
p.prompt ||= DEFAULTS.promptDecart;

const state = {
  provider: "decart-diag6",
  startedAt: null,
  events: [],
  modelSpec: null,
  outputResolution: null,
  firstFrameMs: null,
  set1FirstFrameMs: null,
  set2ResolvedMs: null,
  swapDetectedMs: null,
  swapBaselineDiff: null,
  swapThreshold: null,
  stats: { samples: [], agg: null },
  remoteTracks: [],
  disconnects: [],
  errors: [],
  generation: [],
  frameDiffs: [],
  endedAt: null,
  elapsedMs: null,
  estimatedCostUsd: null
};
const ev = (name, detail) => {
  state.events.push({ at: Date.now() - state.startedAt, name, detail: typeof detail === "string" ? detail : JSON.stringify(detail).slice(0, 600) });
  console.log(`[diag6] EVENT ${name}:`, detail);
};

async function main() {
  state.startedAt = Date.now();
  console.log("[diag6] Decart 二次换装生效延迟测试启动");

  // 1. 输入视频（H.264+AAC）
  const inputVideo = document.createElement("video");
  inputVideo.src = "/results/transcoded/test-clip-h264.mp4";
  inputVideo.loop = true;
  inputVideo.muted = true;
  inputVideo.playsInline = true;
  await new Promise((res, rej) => {
    const to = setTimeout(() => rej(new Error("input timeout")), 20000);
    inputVideo.onloadeddata = () => { clearTimeout(to); res(); };
    inputVideo.onerror = () => { clearTimeout(to); rej(new Error("input load failed")); };
  });
  await inputVideo.play().catch(() => {});
  const stream = inputVideo.captureStream();
  ev("input-ready", `video ${inputVideo.videoWidth}x${inputVideo.videoHeight}`);

  // 2. 凭证
  const keyRes = await fetch("/api/token/decart", { method: "POST" });
  const keyPayload = await keyRes.json();
  if (!keyRes.ok) throw new Error(keyPayload.message || "token failed");
  ev("token-ok", `ttl=${keyPayload.ttlSeconds}s`);

  const client = createDecartClient({ apiKey: keyPayload.temporaryApiKey });
  const model = models.realtime("lucy-vton-3");
  state.modelSpec = { width: model.width, height: model.height, fps: model.fps, source: "model" };

  const garmentA = new File([await loadFile("/assets/garment.jpg")], "garment.jpg", { type: "image/jpeg" });
  const garmentB = new File([await loadFile("/assets/garment.png")], "garment.png", { type: "image/png" });

  // 3. 连接
  const outputVideo = document.createElement("video");
  outputVideo.autoplay = true;
  outputVideo.playsInline = true;
  outputVideo.muted = true;
  let rt;
  try {
    rt = await client.realtime.connect(stream, {
      model,
      mirror: "auto",
      onRemoteStream: s => {
        const tracks = s.getTracks().map(t => ({ kind: t.kind, state: t.readyState }));
        state.remoteTracks.push({ at: Date.now() - state.startedAt, tracks });
        ev("remote-stream", JSON.stringify(tracks));
        outputVideo.srcObject = s;
        outputVideo.play().catch(() => {});
      },
      onConnectionChange: st => {
        ev("conn-change", st);
        if (st === "reconnecting") state.disconnects.push({ at: Date.now() - state.startedAt });
      },
      onConnectionQuality: q => ev("conn-quality", JSON.stringify(q))
    });
    ev("connect-resolved", `sessionId=${rt.sessionId || "?"}`);
  } catch (e) {
    ev("connect-failed", `${e.name}: ${e.message}`);
    state.errors.push({ at: Date.now(), message: e.message });
    await finish();
    return;
  }

  rt.on("generationTick", e => state.generation.push({ at: Date.now() - state.startedAt, type: "tick", ...e }));
  rt.on("generationEnded", e => state.generation.push({ at: Date.now() - state.startedAt, type: "ended", ...e }));

  // 帧差测量（换装生效判定）
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  let prevData = null;
  const sampleFrameDiff = () => {
    if (!outputVideo.videoWidth) return null;
    canvas.width = outputVideo.videoWidth;
    canvas.height = outputVideo.videoHeight;
    ctx.drawImage(outputVideo, 0, 0);
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    if (!prevData) { prevData = data; return 0; }
    let diff = 0, n = 0;
    for (let i = 0; i < data.length; i += 1600) { diff += Math.abs(data[i] - prevData[i]); n++; }
    prevData = data;
    return Math.round(diff / n);
  };

  // 4. set#1 → 等首帧
  try {
    await rt.set({ prompt: p.prompt, image: garmentA, enhance: false });
    ev("set1-resolved", "ok");
  } catch (e) {
    ev("set1-failed", e.message);
    state.errors.push({ at: Date.now(), message: `set1: ${e.message}` });
    await finish();
    return;
  }
  const t0 = Date.now();
  while (Date.now() - t0 < 30000) {
    if (outputVideo.videoWidth > 0 && outputVideo.currentTime > 0) {
      state.firstFrameMs = Date.now() - state.startedAt;
      state.outputResolution = { width: outputVideo.videoWidth, height: outputVideo.videoHeight };
      ev("first-frame", `+${state.firstFrameMs}ms ${state.outputVideo ? "" : ""}${state.outputResolution.width}x${state.outputResolution.height}`);
      break;
    }
    await sleep(300);
  }
  if (!state.firstFrameMs) {
    ev("no-frame", "30s 无帧");
    await finish();
    return;
  }

  // 5. 稳定 8s，采集帧差基线
  ev("baseline-start", "8s 基线采集");
  const baseDiffs = [];
  const baseDeadline = Date.now() + 8000;
  while (Date.now() < baseDeadline) {
    const d = sampleFrameDiff();
    if (d !== null) baseDiffs.push(d);
    await sleep(500);
  }
  const baselineAvg = baseDiffs.length ? baseDiffs.reduce((a, b) => a + b, 0) / baseDiffs.length : 0;
  const threshold = baselineAvg * 2.5 + 8; // 2.5× 基线 + 8 下限
  state.swapBaselineDiff = +baselineAvg.toFixed(1);
  state.swapThreshold = +threshold.toFixed(1);
  ev("baseline-done", `基线均值 ${baselineAvg.toFixed(1)}, 阈值 ${threshold.toFixed(1)}`);

  // 6. set#2 → 轮询帧差直到跳变（最长 30s）
  ev("set2-start", "发起二次换装");
  try {
    await rt.set({ prompt: "Change to a different garment with a new color and fabric. Natural realistic fit.", image: garmentB, enhance: false });
    state.set2ResolvedMs = Date.now() - state.startedAt;
    ev("set2-resolved", `+${state.set2ResolvedMs}ms`);
  } catch (e) {
    ev("set2-failed", e.message);
    state.errors.push({ at: Date.now(), message: `set2: ${e.message}` });
    await finish();
    return;
  }

  const swapDeadline = Date.now() + 30000;
  let prevFrameT = outputVideo.currentTime;
  while (Date.now() < swapDeadline) {
    const d = sampleFrameDiff();
    const frameT = outputVideo.currentTime;
    const tSeek = frameT - prevFrameT; // 时间前进量
    state.frameDiffs.push({ at: Date.now() - state.startedAt, diff: d, seek: +tSeek.toFixed(3), gen: state.generation.length });
    if (d !== null && d > threshold) {
      state.swapDetectedMs = Date.now() - state.startedAt;
      ev("swap-detected", `+${state.swapDetectedMs}ms 帧差 ${d} > 阈值 ${threshold.toFixed(1)}（基线 ${baselineAvg.toFixed(1)}）`);
      break;
    }
    prevFrameT = frameT;
    await sleep(300);
  }
  if (!state.swapDetectedMs) {
    ev("swap-not-detected", `30s 内无显著跳变，最后帧差均值=${(state.frameDiffs.slice(-10).reduce((a, b) => a + b.diff, 0) / Math.min(10, state.frameDiffs.length)).toFixed(1)}`);
  }

  // 7. 收尾观察 5s
  await sleep(5000);
  ev("video-final", `readyState=${outputVideo.readyState} ${outputVideo.videoWidth}x${outputVideo.videoHeight} t=${+outputVideo.currentTime.toFixed(2)} gen=${state.generation.length}`);

  await finish();
}

async function finish() {
  state.endedAt = Date.now();
  state.elapsedMs = state.endedAt - state.startedAt;
  state.estimatedCostUsd = { usd: +(state.elapsedMs / 1000 * 0.02).toFixed(2), note: "按 $0.02/秒上限估算" };
  try {
    await postResults(state);
    console.log("[diag6] 结果已保存 → results/decart-diag6.json");
    window.__BENCH_DONE__ = true;
  } catch (e) {
    console.error("[diag6] 保存失败:", e.message);
  }
}

main().catch(async e => {
  console.error("[diag6] main error:", e);
  state.errors.push({ at: Date.now(), message: e.message });
  await finish();
});
