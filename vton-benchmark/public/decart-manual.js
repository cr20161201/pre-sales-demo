// Decart 手动实测页（人工跑，可用代理/摄像头）
// 用法：开代理后浏览器访问 http://localhost:4400/decart-manual.html
//   ?duration=120000     会话时长（默认 120s）
//   &relay=1             强制 TURN/TCP relay（默认 UDP 直连）
//   &cam=1               用真实摄像头替代预录视频（实机补充测试用）
//   &prompt=...          试穿提示词（默认读共享配置）
// 结果自动落盘 results/decart-manual.json（首帧判定已修正：videoWidth>0 && currentTime>0）
import { createDecartClient, models } from "@decartai/sdk";
import { DEFAULTS, params } from "../shared/config.mjs";
import { loadFile, postResults, sleep, watchSetLatency, captureFrame } from "../shared/metrics.mjs";

const qs = new URLSearchParams(location.search);
if (qs.get("relay") === "1") globalThis.__DECART_FORCE_RELAY__ = true; // 走 TURN/TCP
const useCam = qs.get("cam") === "1";

const logEl = document.querySelector("#log");
const stateEl = document.querySelector("#states");
const btn = document.querySelector("#start");
const line = msg => {
  const t = `[${new Date().toLocaleTimeString("zh-CN", { hour12: false })}] ${msg}`;
  logEl.textContent += `\n${t}`;
  logEl.scrollTop = logEl.scrollHeight;
  console.log(`[decart-manual] ${msg}`);
};
const setChip = (key, text, ok) => {
  let el = document.querySelector(`#chip-${key}`);
  if (!el) { el = document.createElement("span"); el.id = `chip-${key}`; el.className = "chip"; stateEl.appendChild(el); }
  el.className = "chip " + (ok ? "ok" : "bad");
  el.textContent = `${key}: ${text}`;
};

const p = params();
p.prompt ||= DEFAULTS.promptDecart;
const durMs = Math.min(Number(qs.get("duration") || 120000), 180000);

const inputVideo = document.querySelector("#input");
const outputVideo = document.querySelector("#output");
const state = {
  provider: "decart-manual",
  manual: true,
  transportPolicy: globalThis.__DECART_FORCE_RELAY__ ? "relay" : "udp",
  inputSource: useCam ? "camera" : "prerecorded",
  startedAt: null,
  durationMs: durMs,
  events: [],
  modelSpec: null,
  outputResolution: null,
  firstFrameMs: null,
  setResults: [],
  stats: { samples: [], agg: null },
  remoteTracks: [],
  disconnects: [],
  errors: [],
  shots: [],
  endedAt: null,
  elapsedMs: null,
  estimatedCostUsd: null
};
const ev = (name, detail) => {
  state.events.push({ at: Date.now() - state.startedAt, name, detail: typeof detail === "string" ? detail : JSON.stringify(detail).slice(0, 600) });
  line(`EVENT ${name}: ${typeof detail === "string" ? detail.slice(0, 200) : JSON.stringify(detail).slice(0, 200)}`);
};
const shot = (label) => {
  const dataUrl = captureFrame(outputVideo, { width: 640 });
  if (dataUrl) state.shots.push({ label, dataUrl });
  return dataUrl ? `已截图 ${label}` : "暂无可截图帧（无画面）";
};

async function setupInput() {
  if (useCam) {
    line("使用真实摄像头输入...");
    const stream = await navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false });
    inputVideo.srcObject = stream;
    inputVideo.muted = true;
    await inputVideo.play().catch(() => {});
    return stream;
  }
  line("加载预录测试视频...");
  inputVideo.src = "/results/transcoded/test-clip.webm";
  inputVideo.loop = true;
  await new Promise(res => { inputVideo.onloadeddata = res; setTimeout(res, 15000); });
  await inputVideo.play().catch(() => {});
  line("输入视频就绪");
  return inputVideo.captureStream();
}

async function main() {
  state.startedAt = Date.now();
  line(`Decart 手动实测启动：时长 ${Math.round(durMs / 1000)}s，传输=${state.transportPolicy === "relay" ? "TURN/TCP relay" : "UDP 直连"}，输入=${useCam ? "摄像头" : "预录视频"}`);
  line("提示：若需代理请先开全局代理再点开始（代理需支持 WebRTC，推荐 TUN 模式）");

  // 1. 输入
  let stream;
  try {
    stream = await setupInput();
  } catch (e) {
    state.errors.push({ at: Date.now(), message: `输入源不可用: ${e.message}` });
    line("输入源失败: " + e.message);
    await finishAndPost();
    return;
  }

  // 2. 凭证
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

  // 3. 连接（initialState 首帧即带图）
  let rt;
  try {
    rt = await client.realtime.connect(stream, {
      model,
      mirror: false,
      resolution: "720p",
      preferredVideoCodec: "h264",
      initialState: { prompt: { text: p.prompt, enhance: false }, image: garmentFile },
      onRemoteStream: s => {
        const tracks = s.getTracks().map(t => {
          const set = t.getSettings?.() || {};
          return { kind: t.kind, state: t.readyState, label: t.label, w: set.width, h: set.height };
        });
        state.remoteTracks.push({ at: Date.now() - state.startedAt, tracks });
        ev("remote-stream", JSON.stringify(tracks));
        if (tracks.some(t => t.kind === "video")) setChip("video-track", "有", true);
        outputVideo.srcObject = s;
        outputVideo.play().catch(() => {});
      },
      onConnectionChange: st => {
        ev("conn-change", st);
        if (st === "reconnecting") state.disconnects.push({ at: Date.now() - state.startedAt, reason: "reconnecting" });
        setChip("conn", st, st === "connected" || st === "generating");
      },
      onQueuePosition: qp => ev("queue-position", JSON.stringify(qp)),
      onConnectionQuality: q => ev("conn-quality", JSON.stringify(q))
    });
    ev("connect-resolved", `sessionId=${rt.sessionId || "?"}`);
    setChip("conn", "connected", true);
  } catch (e) {
    ev("connect-failed", `${e.name}: ${e.message}`);
    state.errors.push({ at: Date.now(), message: e.message });
    setChip("conn", "FAILED", false);
  }

  if (!rt) {
    line("连接失败，结束（错误已记录）");
    await finishAndPost();
    return;
  }

  // 4. stats 订阅（含 relay 判定）
  rt.on("stats", stats => {
    const pairs = stats?.connection?.selectedCandidatePairs;
    const cand = pairs?.length ? pairs.map(pair => ({ local: pair.local?.candidateType ?? "?", remote: pair.remote?.candidateType ?? "?", protocol: pair.local?.protocol ?? pair.remote?.protocol ?? "?" })) : null;
    const relayed = cand ? cand.some(c => c.local === "relay" || c.remote === "relay") : null;
    const s = {
      t: Date.now() - state.startedAt,
      rttMs: stats?.rttMs ?? null,
      inboundBitrateKbps: stats?.inboundBitrateKbps ?? null,
      outboundBitrateKbps: stats?.outboundBitrateKbps ?? null,
      fps: stats?.fps ?? null,
      packetLoss: stats?.packetLoss ?? null,
      availableUpstreamKbps: stats?.availableUpstreamKbps ?? null,
      isRelayed: relayed,
      candidate: cand ? cand.map(c => `${c.local}/${c.remote}:${c.protocol}`).join(" ") : null
    };
    state.stats.samples.push(s);
    if (state.stats.samples.length % 5 === 0) line(`stats: relay=${relayed} rtt=${s.rttMs} 上行可用=${s.availableUpstreamKbps}kbps 出帧=${s.fps}fps`);
  });

  // 5. 等首帧（修正判定：必须有像素 + 播放进度）
  const t0 = Date.now();
  let gotFrame = false;
  line("等待首帧（最长 60s）...");
  while (Date.now() - t0 < 60000) {
    if (outputVideo.videoWidth > 0 && outputVideo.currentTime > 0) {
      gotFrame = true;
      state.firstFrameMs = Date.now() - state.startedAt;
      state.outputResolution = { width: outputVideo.videoWidth, height: outputVideo.videoHeight };
      ev("first-frame", `+${state.firstFrameMs}ms ${state.outputResolution.width}×${state.outputResolution.height}`);
      setChip("first-frame", `${Math.round(state.firstFrameMs / 100) / 10}s`, true);
      line(`✅ 首帧 +${state.firstFrameMs}ms，分辨率 ${state.outputResolution.width}×${state.outputResolution.height}，${shot("首帧")}`);
      break;
    }
    await sleep(500);
  }
  if (!gotFrame) {
    state.outputResolution = { width: outputVideo.videoWidth, height: outputVideo.videoHeight };
    ev("no-frame", `60s 内无帧, readyState=${outputVideo.readyState}, videoWidth=${outputVideo.videoWidth}`);
    setChip("first-frame", "无帧", false);
    line("❌ 60s 内无帧（记录已保留，可换网络/参数重跑）");
  }

  // 6. 换装生效延迟（rVFC 停顿检测；无帧时也能记录 set 调用结果）
  line("发起换装 set()，测量生效延迟...");
  const { monitor, result: setResult } = watchSetLatency(outputVideo, { timeoutMs: 45000 });
  try {
    await rt.set({ prompt: p.prompt, image: garmentFile, enhance: false });
    monitor.markSet();
    line("set() 已发出，等待画面变化...");
  } catch (e) {
    ev("set-failed", e.message);
    state.errors.push({ at: Date.now(), message: `set: ${e.message}` });
  }
  const r = await setResult;
  state.setResults.push({ at: Date.now() - state.startedAt, latencyMs: r.latencyMs, note: r.note, seamless: !!r.seamless });
  ev("set-result", JSON.stringify(r));
  line(`换装生效: ${r.latencyMs != null ? r.latencyMs + "ms" : "未测到"}${r.note ? "（" + r.note + "）" : ""}`);
  if (gotFrame && outputVideo.videoWidth > 0) line(shot("换装后"));

  // 7. 稳定性观察（剩余时间，每 10s 打点）
  const deadline = Date.now() + Math.max(5000, Math.min(durMs, 150000) - (Date.now() - state.startedAt));
  while (Date.now() < deadline) {
    await sleep(10000);
    ev("video-poll", `readyState=${outputVideo.readyState} ${outputVideo.videoWidth}×${outputVideo.videoHeight} t=${+outputVideo.currentTime.toFixed(2)}`);
  }

  // 8. stats 聚合
  const agg = {};
  for (const k of ["rttMs", "inboundBitrateKbps", "outboundBitrateKbps", "fps", "packetLoss", "availableUpstreamKbps"]) {
    const vals = state.stats.samples.map(s => s[k]).filter(v => v !== null && v !== undefined);
    if (vals.length) agg[k] = { min: +Math.min(...vals).toFixed(1), avg: +(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1), max: +Math.max(...vals).toFixed(1), n: vals.length };
  }
  state.stats.agg = agg;
  const relaySamples = state.stats.samples.filter(s => s.isRelayed === true).length;
  const udpSamples = state.stats.samples.filter(s => s.isRelayed === false).length;
  ev("stats-agg", JSON.stringify({ ...agg, relaySamples, udpSamples }));

  line("断开会话...");
  try { rt.disconnect(); } catch (e) {}
  await sleep(500);
  if (useCam) inputVideo.srcObject?.getTracks().forEach(t => t.stop());

  await finishAndPost();
}

async function finishAndPost() {
  state.endedAt = Date.now();
  state.elapsedMs = state.endedAt - (state.startedAt || state.endedAt);
  state.estimatedCostUsd = { usd: +(state.elapsedMs / 1000 * 0.02).toFixed(2), note: "按 $0.02/秒上限估算" };
  try {
    await postResults(state);
    line("✅ 结果已保存 → results/decart-manual.json（把该文件发回即可）");
    setChip("saved", "已保存 results/decart-manual.json", true);
  } catch (e) {
    line("结果保存失败: " + e.message + "（可在页面日志里复制数据）");
    setChip("saved", "保存失败", false);
  }
  window.__BENCH_DONE__ = true;
  btn.disabled = false;
  btn.textContent = "重新开始";
}

btn.addEventListener("click", () => {
  btn.disabled = true;
  btn.textContent = "运行中...";
  logEl.textContent = "";
  stateEl.textContent = "";
  main().catch(async error => {
    line("测试失败: " + error.message);
    state.errors.push({ at: Date.now(), message: error.message });
    await finishAndPost().catch(() => {});
  });
});
