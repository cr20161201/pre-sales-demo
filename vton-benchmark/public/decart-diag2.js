// Decart 聚焦诊断 v2：单次 h264 + initialState 会话，采集 LiveKit stats + 上行吞吐探针
// 目标：确认“无帧”根因是上行带宽饥饿（vs 编解码 / 服务端问题）
import { createDecartClient, models } from "@decartai/sdk";
import { DEFAULTS, params } from "../shared/config.mjs";
import { loadFile, postResults, sleep } from "../shared/metrics.mjs";

const logEl = document.querySelector("#log");
const stateEl = document.querySelector("#states");
const line = msg => {
  const t = `[${new Date().toLocaleTimeString("zh-CN", { hour12: false })}] ${msg}`;
  logEl.textContent += `\n${t}`;
  logEl.scrollTop = logEl.scrollHeight;
  console.log(`[diag2] ${msg}`);
};
const setChip = (key, text, ok) => {
  let el = document.querySelector(`#chip-${key}`);
  if (!el) { el = document.createElement("span"); el.id = `chip-${key}`; el.className = "chip"; stateEl.appendChild(el); }
  el.className = "chip " + (ok ? "ok" : "bad");
  el.textContent = `${key}: ${text}`;
};

const p = params();
p.prompt ||= DEFAULTS.promptDecart;
const durMs = Math.min(Number(p.durationMs || 90000), 120000);

const inputVideo = document.querySelector("#input");
const outputVideo = document.querySelector("#output");
const state = {
  provider: "decart-diag2",
  startedAt: Date.now(),
  durationMs: durMs,
  events: [],
  modelSpec: null,
  outputResolution: null,
  firstFrameMs: null,
  stats: { samples: [], agg: null },
  uploadProbe: null,
  remoteTracks: [],
  errors: [],
  endedAt: null,
  elapsedMs: null,
  estimatedCostUsd: null
};
const ev = (name, detail) => {
  state.events.push({ at: Date.now() - state.startedAt, name, detail: typeof detail === "string" ? detail : JSON.stringify(detail).slice(0, 600) });
  line(`EVENT ${name}: ${typeof detail === "string" ? detail.slice(0, 200) : JSON.stringify(detail).slice(0, 200)}`);
};

// ---- 上行吞吐探针：向 httpbin.org 上传 3MB，测真实上行 ----
async function probeUpload() {
  line("上行吞吐探针：POST ~3MB 到 httpbin.org ...");
  const size = 3 * 1024 * 1024;
  const blob = new Blob([new Uint8Array(size)], { type: "application/octet-stream" });
  const t0 = performance.now();
  try {
    const res = await fetch("https://httpbin.org/post", { method: "POST", body: blob, signal: AbortSignal.timeout(20000) });
    const ms = performance.now() - t0;
    const mbps = (size * 8) / ms / 1000;
    state.uploadProbe = { status: res.status, sizeBytes: size, elapsedMs: Math.round(ms), mbps: +mbps.toFixed(2), kbps: Math.round(mbps * 1000) };
    ev("upload-probe", JSON.stringify(state.uploadProbe));
    setChip("up", `${Math.round(mbps * 1000)}kbps`, mbps * 1000 >= 2000);
    return state.uploadProbe;
  } catch (e) {
    state.uploadProbe = { error: e.message };
    ev("upload-probe-error", e.message);
    setChip("up", "ERR:" + e.message.slice(0, 20), false);
    return state.uploadProbe;
  }
}

async function main() {
  line(`Decart 聚焦诊断 v2 启动，时长上限 ${Math.round(durMs / 1000)}s`);

  // 0. 加载输入视频
  line("加载测试视频...");
  inputVideo.src = "/results/transcoded/test-clip.webm";
  inputVideo.loop = true;
  await new Promise(res => { inputVideo.onloadeddata = res; setTimeout(res, 15000); });
  await inputVideo.play().catch(() => {});
  line("输入视频就绪");

  // 1. 上行探针
  await probeUpload();

  // 2. 连接
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
  try {
    rt = await client.realtime.connect(inputVideo.captureStream(), {
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
    line("连接失败，直接结束");
    state.endedAt = Date.now();
    state.elapsedMs = state.endedAt - state.startedAt;
    state.estimatedCostUsd = { usd: 0, note: "连接失败" };
    try { await postResults(state); } catch {}
    window.__BENCH_DONE__ = true;
    return;
  }

  // 3. 订阅 stats（1s 间隔，取聚合值）
  rt.on("stats", stats => {
    const s = {
      t: Date.now() - state.startedAt,
      rttMs: stats?.rttMs ?? null,
      inboundBitrateKbps: stats?.inboundBitrateKbps ?? null,
      outboundBitrateKbps: stats?.outboundBitrateKbps ?? null,
      fps: stats?.fps ?? null,
      packetLoss: stats?.packetLoss ?? null,
      upstreamJitterMs: stats?.upstreamJitterMs ?? null,
      availableUpstreamKbps: stats?.availableUpstreamKbps ?? null
    };
    state.stats.samples.push(s);
    if (state.stats.samples.length % 5 === 0) line(`stats: rtt=${s.rttMs} 上行可用=${s.availableUpstreamKbps}kbps 出帧=${s.fps}fps`);
  });

  // 4. 等首帧（60s），期间也主动发起一次 set() 强化生成信号
  const waitMs = Math.min(60000, durMs - 15000);
  const t0 = Date.now();
  let gotFrame = false;
  while (Date.now() - t0 < waitMs) {
    if (outputVideo.videoWidth > 0 && outputVideo.currentTime > 0) {
      gotFrame = true;
      state.firstFrameMs = Date.now() - state.startedAt;
      state.outputResolution = { width: outputVideo.videoWidth, height: outputVideo.videoHeight };
      ev("first-frame", `+${state.firstFrameMs}ms ${state.outputResolution.width}×${state.outputResolution.height}`);
      break;
    }
    if (Date.now() - t0 === 5000) {
      line("5s 无帧，主动补一次 set() 强化生成信号...");
      try { await rt.set({ prompt: p.prompt, image: garmentFile, enhance: false }); ev("set-1", "ok"); } catch (e) { ev("set-1-failed", e.message); }
    }
    if (Date.now() - t0 === 20000) {
      line("20s 无帧，再 set 一次...");
      try { await rt.set({ prompt: p.prompt, image: garmentFile, enhance: false }); ev("set-2", "ok"); } catch (e) { ev("set-2-failed", e.message); }
    }
    await sleep(500);
  }
  if (!gotFrame) {
    state.outputResolution = { width: outputVideo.videoWidth, height: outputVideo.videoHeight };
    ev("no-frame", `60s 内无帧, readyState=${outputVideo.readyState}, videoWidth=${outputVideo.videoWidth}`);
  }

  // 5. 剩余时间观察 + 每 10s 打点
  const deadline = Date.now() + Math.max(5000, durMs - (Date.now() - state.startedAt));
  while (Date.now() < deadline) {
    await sleep(10000);
    ev("video-poll", `readyState=${outputVideo.readyState} ${outputVideo.videoWidth}×${outputVideo.videoHeight} t=${+outputVideo.currentTime.toFixed(2)}`);
  }

  // 6. stats 聚合
  const agg = {};
  for (const k of ["rttMs", "inboundBitrateKbps", "outboundBitrateKbps", "fps", "packetLoss", "upstreamJitterMs", "availableUpstreamKbps"]) {
    const vals = state.stats.samples.map(s => s[k]).filter(v => v !== null && v !== undefined);
    if (vals.length) agg[k] = { min: +Math.min(...vals).toFixed(1), avg: +(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1), max: +Math.max(...vals).toFixed(1), n: vals.length };
  }
  state.stats.agg = agg;
  ev("stats-agg", JSON.stringify(agg));

  line("断开会话...");
  try { rt.disconnect(); } catch (e) {}
  await sleep(500);

  state.endedAt = Date.now();
  state.elapsedMs = state.endedAt - state.startedAt;
  state.estimatedCostUsd = { usd: +(state.elapsedMs / 1000 * 0.02).toFixed(2), note: "按 $0.02/秒上限估算" };
  try { await postResults(state); } catch (e) { line("结果上报失败: " + e.message); }
  line("结果已上报 → results/decart-diag2.json");
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
