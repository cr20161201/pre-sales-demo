// Decart Lucy VTON 专项诊断：定位“连上但无帧”根因
// 覆盖：① checkConnectivity 预检 ② 编解码可用性探测 ③ 显式 codec + initialState 连接 ④ 全事件日志
import { createDecartClient, models } from "@decartai/sdk";
import { DEFAULTS, params } from "../shared/config.mjs";
import { loadFile, postResults, sleep } from "../shared/metrics.mjs";

const logEl = document.querySelector("#log");
const stateEl = document.querySelector("#states");
const line = msg => {
  const t = `[${new Date().toLocaleTimeString("zh-CN", { hour12: false })}] ${msg}`;
  logEl.textContent += `\n${t}`;
  logEl.scrollTop = logEl.scrollHeight;
  console.log(`[diag] ${msg}`);
};
const setChip = (key, text, ok) => {
  let el = document.querySelector(`#chip-${key}`);
  if (!el) { el = document.createElement("span"); el.id = `chip-${key}`; el.className = "chip"; stateEl.appendChild(el); }
  el.className = "chip " + (ok ? "ok" : "bad");
  el.textContent = `${key}: ${text}`;
};

const p = params();
p.prompt ||= DEFAULTS.promptDecart;
const durMs = Math.min(Number(p.durationMs || 150000), 180000);

const inputVideo = document.querySelector("#input");
const outputVideo = document.querySelector("#output");
const state = {
  provider: "decart-diag",
  startedAt: Date.now(),
  durationMs: durMs,
  log: [],
  events: [],
  modelSpec: null,
  outputResolution: null,
  firstFrameMs: null,
  setResults: [],
  errors: [],
  connectivity: null,
  codecSupport: null,
  triedCodecs: [],
  endedAt: null,
  elapsedMs: null,
  estimatedCostUsd: null
};
const ev = (name, detail) => {
  state.events.push({ at: Date.now() - state.startedAt, name, detail: typeof detail === "string" ? detail : JSON.stringify(detail) });
  line(`EVENT ${name}: ${typeof detail === "string" ? detail : JSON.stringify(detail)}`);
};

async function probeCodecSupport() {
  const out = { canPlay: {}, recorder: {} };
  const video = document.createElement("video");
  for (const c of ["avc1.42E01E", "vp8", "vp9"]) {
    out.canPlay[c] = video.canPlayType(`video/webm; codecs="${c}"`);
    out.canPlay[c + "-mp4"] = video.canPlayType(`video/mp4; codecs="${c}"`);
  }
  for (const m of ["video/webm;codecs=vp8", "video/webm;codecs=vp9", "video/mp4;codecs=avc1.42E01E", "video/mp4;codecs=avc1.64001F"]) {
    out.recorder[m] = typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(m);
  }
  out.h264EncodeHint = typeof RTCRtpSender !== "undefined" && typeof RTCRtpSender.getCapabilities === "function"
    ? (RTCRtpSender.getCapabilities("video")?.codecs || []).map(c => c.mimeType).filter(m => /h264|vp8|vp9/i.test(m))
    : "RTCRtpSender.getCapabilities 不可用";
  state.codecSupport = out;
  ev("codec-support", JSON.stringify(out, null, 0));
  return out;
}

async function runConnectivityCheck() {
  line("运行 checkConnectivity() 预检（STUN 可达性 + RTT，无 GPU 会话成本）...");
  const client = createDecartClient({ apiKey: "stub" });
  try {
    const report = await client.realtime.checkConnectivity({ iceGatherTimeoutMs: 15000 });
    state.connectivity = report;
    ev("connectivity", JSON.stringify(report, null, 0));
    setChip("net", report.quality || "?", report.quality === "good" || report.quality === "marginal");
    return report;
  } catch (e) {
    ev("connectivity-error", e.message);
    setChip("net", "ERR:" + e.message, false);
    return null;
  }
}

async function attemptConnect({ codec, withInitialState }) {
  const tag = `codec=${codec}${withInitialState ? "+initState" : ""}`;
  line(`\n===== 尝试连接: ${tag} =====`);
  setChip("connect", "connecting...", true);
  const startedAt = Date.now();

  const keyRes = await fetch("/api/token/decart", { method: "POST" });
  const keyPayload = await keyRes.json();
  if (!keyRes.ok) throw new Error(keyPayload.message || "凭证获取失败");
  ev("token-ok", `ttl=${keyPayload.ttlSeconds}s`);

  const client = createDecartClient({ apiKey: keyPayload.temporaryApiKey });
  const model = models.realtime("lucy-vton-latest");
  state.modelSpec = { width: model.width, height: model.height, fps: model.fps, source: "model" };
  line(`模型声明: ${model.width}×${model.height} @ ${JSON.stringify(model.fps)}`);

  const garmentBlob = await loadFile(`/assets/${p.garment}`);
  const garmentFile = new File([garmentBlob], p.garment, { type: garmentBlob.type || "image/jpeg" });

  let rt;
  let remoteStreamSeen = false;
  try {
    rt = await client.realtime.connect(inputVideo.captureStream(), {
      model,
      mirror: false,
      resolution: "720p",
      preferredVideoCodec: codec,
      ...(withInitialState ? { initialState: { prompt: { text: p.prompt, enhance: false }, image: garmentFile } } : {}),
      onRemoteStream: s => {
        remoteStreamSeen = true;
        const tracks = s.getTracks().map(t => `${t.kind}:${t.readyState}:${t.label}`);
        ev("remote-stream", `tracks=[${tracks.join(" | ")}]`);
        outputVideo.srcObject = s;
        outputVideo.play().catch(() => {});
      },
      onConnectionChange: st => {
        ev("conn-change", st);
        setChip("conn", st, st === "connected" || st === "generating");
      },
      onQueuePosition: qp => ev("queue-position", JSON.stringify(qp)),
      onConnectionQuality: q => ev("conn-quality", JSON.stringify(q)),
      onDiagnostic: d => ev("diag", JSON.stringify(d).slice(0, 500))
    });
    ev("connect-resolved", `elapsed=${Date.now() - startedAt}ms sessionId=${rt.sessionId || "?"}`);
    setChip("connect", "connected", true);
  } catch (e) {
    ev("connect-failed", `${e.name}: ${e.message}`);
    setChip("connect", "FAILED:" + e.message.slice(0, 40), false);
    state.errors.push({ at: Date.now(), message: `${tag}: ${e.message}` });
    try { rt?.disconnect?.(); } catch {}
    return null;
  }

  // 连接成功后：观察首帧（up to 25s）
  const firstFrameSeen = await waitForOutputFrame(25000);
  if (firstFrameSeen) {
    state.firstFrameMs = Date.now() - state.startedAt;
    state.outputResolution = { width: outputVideo.videoWidth, height: outputVideo.videoHeight };
    ev("first-frame", `+${state.firstFrameMs}ms ${state.outputResolution.width}×${state.outputResolution.height}`);
  } else {
    ev("no-first-frame", "25s 内输出视频无帧");
    state.outputResolution = { width: outputVideo.videoWidth, height: outputVideo.videoHeight };
  }

  // 触发换装 set()（显式传图+prompt，模拟真实用法）
  line("发起 set({prompt, image}) ...");
  const setAt = Date.now();
  try {
    await rt.set({ prompt: p.prompt, image: garmentFile, enhance: false });
    ev("set-resolved", `+${Date.now() - setAt}ms`);
  } catch (e) {
    ev("set-failed", `${e.name}: ${e.message}`);
    state.errors.push({ at: Date.now(), message: `set: ${e.message}` });
  }

  // 观察 set 后是否有帧（up to 20s）
  const frameAfterSet = await waitForOutputFrame(20000);
  state.setResults.push({
    label: "initial-tryon",
    latencyMs: frameAfterSet ? Date.now() - setAt : null,
    note: frameAfterSet ? `set 后 ${Date.now() - setAt}ms 出现帧` : "set 后 20s 仍无帧",
    width: outputVideo.videoWidth,
    height: outputVideo.videoHeight
  });

  // set 后固定观察 30s（采样稳定性），随后断开，让循环尝试下一个 codec
  const stabilityWindow = Math.min(30000, Math.max(5000, durMs - (Date.now() - state.startedAt)));
  const deadline = Date.now() + stabilityWindow;
  while (Date.now() < deadline) {
    await sleep(10000);
    const r = { w: outputVideo.videoWidth, h: outputVideo.videoHeight, rs: outputVideo.readyState, ct: +outputVideo.currentTime.toFixed(2) };
    ev("video-poll", `readyState=${r.rs} ${r.w}×${r.h} t=${r.ct}s`);
    if (outputVideo.videoWidth > 0) {
      state.outputResolution = { width: outputVideo.videoWidth, height: outputVideo.videoHeight };
    }
  }

  line("断开本次会话...");
  try { rt.disconnect(); } catch (e) { ev("disconnect-error", e.message); }
  return { remoteStreamSeen, gotFrame: frameAfterSet };
}

function waitForOutputFrame(timeoutMs) {
  return new Promise(resolve => {
    const start = Date.now();
    const check = () => {
      if (outputVideo.videoWidth > 0 && outputVideo.videoHeight > 0 && outputVideo.currentTime > 0) return resolve(true);
      if (Date.now() - start > timeoutMs) return resolve(false);
      setTimeout(check, 250);
    };
    check();
  });
}

async function main() {
  line(`Decart 专项诊断启动，时长上限 ${Math.round(durMs / 1000)}s`);
  state.log.push(`duration=${durMs}`);

  // 0. 加载输入视频
  line("加载测试视频...");
  inputVideo.src = "/results/transcoded/test-clip.webm";
  inputVideo.loop = true;
  await new Promise(res => { inputVideo.onloadeddata = res; setTimeout(res, 15000); });
  await inputVideo.play().catch(() => {});
  line("输入视频已就绪，captureStream 可用: " + (typeof inputVideo.captureStream === "function"));

  // 1. 编解码探测（headless Chrome 的 H.264 可用性是最大嫌疑）
  await probeCodecSupport();

  // 2. 网络预检（不花 GPU 钱）
  await runConnectivityCheck();

  // 3. 按顺序尝试：vp8+initState → vp9+initState → h264+initState → h264 无 initState
  //    （vp8/vp9 是 Chrome 软件编码最稳的；h264 若 chrome-for-testing 无编码器会 publish 失败）
  const attempts = [
    { codec: "vp8", init: true },
    { codec: "vp9", init: true },
    { codec: "h264", init: true },
    { codec: "h264", init: false }
  ];
  let anyFrame = false;
  for (const a of attempts) {
    state.triedCodecs.push(a);
    if (Date.now() - state.startedAt > durMs) { line("时长上限已到，跳过后续尝试"); break; }
    const r = await attemptConnect(a);
    if (r?.remoteStreamSeen && state.firstFrameMs !== null) { anyFrame = true; break; }
    await sleep(1500);
  }

  line(`\n===== 诊断结束 =====`);
  state.endedAt = Date.now();
  state.elapsedMs = state.endedAt - state.startedAt;
  state.estimatedCostUsd = { usd: +(state.elapsedMs / 1000 * 0.02).toFixed(2), note: "按 $0.02/秒上限估算" };
  try { await postResults(state); } catch (e) { line("结果上报失败: " + e.message); }
  line("结果已上报 → results/decart-diag.json");
  window.__BENCH_DONE__ = true;
}

main().catch(async error => {
  line("诊断失败: " + error.message);
  state.errors.push({ at: Date.now(), message: error.message });
  state.endedAt = Date.now();
  state.elapsedMs = state.endedAt - state.startedAt;
  try { await postResults(state); } catch {}
  window.__BENCH_FAILED__ = true;
});
