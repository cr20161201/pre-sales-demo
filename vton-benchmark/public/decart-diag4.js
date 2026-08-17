// Decart 聚焦诊断 v4：强制 TURN/TCP relay（绕过可能的 UDP 媒体限速）
// 假设：国内 → us-west-1 的 WebRTC UDP 媒体上行被 QoS 限速（diag1-3 证据：可用上行 300~1000kbps vs 需 3500）
// 验证：强制 iceTransportPolicy=relay 后是否出帧；若出帧 → 根因坐实为 UDP 路径受限，且 TCP/TURN 可用作变通
import { createDecartClient, models } from "@decartai/sdk";
import { DEFAULTS, params } from "../shared/config.mjs";
import { loadFile, postResults, sleep } from "../shared/metrics.mjs";

// 关键开关：在 connect 前设置，SDK media-channel 会读取并强制 relay（已打补丁，默认关闭）
globalThis.__DECART_FORCE_RELAY__ = true;

const logEl = document.querySelector("#log");
const stateEl = document.querySelector("#states");
const line = msg => {
  const t = `[${new Date().toLocaleTimeString("zh-CN", { hour12: false })}] ${msg}`;
  logEl.textContent += `\n${t}`;
  logEl.scrollTop = logEl.scrollHeight;
  console.log(`[diag4] ${msg}`);
};
const setChip = (key, text, ok) => {
  let el = document.querySelector(`#chip-${key}`);
  if (!el) { el = document.createElement("span"); el.id = `chip-${key}`; el.className = "chip"; stateEl.appendChild(el); }
  el.className = "chip " + (ok ? "ok" : "bad");
  el.textContent = `${key}: ${text}`;
};

const p = params();
p.prompt ||= DEFAULTS.promptDecart;
const durMs = Math.min(Number(p.durationMs || 75000), 120000);

const inputVideo = document.querySelector("#input");
const outputVideo = document.querySelector("#output");
const state = {
  provider: "decart-diag4",
  transportPolicy: "relay",
  startedAt: Date.now(),
  durationMs: durMs,
  events: [],
  modelSpec: null,
  outputResolution: null,
  firstFrameMs: null,
  stats: { samples: [], agg: null, relaySamples: 0, udpSamples: 0 },
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

function selectedCandidateInfo(stats) {
  const pairs = stats?.connection?.selectedCandidatePairs;
  if (!pairs || !pairs.length) return null;
  return pairs.map(pair => ({
    local: pair.local?.candidateType ?? "?",
    remote: pair.remote?.candidateType ?? "?",
    protocol: pair.local?.protocol ?? pair.remote?.protocol ?? "?",
    transport: pair.transport ?? "?"
  }));
}

async function main() {
  line("Decart 诊断 v4（强制 relay）启动");
  setChip("relay", "强制 TURN/TCP", true);

  // 0. 加载输入视频
  line("加载测试视频...");
  inputVideo.src = "/results/transcoded/test-clip.webm";
  inputVideo.loop = true;
  await new Promise(res => { inputVideo.onloadeddata = res; setTimeout(res, 15000); });
  await inputVideo.play().catch(() => {});
  line("输入视频就绪");

  // 1. 凭证
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

  // 2. 订阅 stats：重点看 selectedCandidatePair 是否 relay + 可用上行 + 出帧
  rt.on("stats", stats => {
    const cand = selectedCandidateInfo(stats);
    const relayed = cand ? cand.some(c => c.local === "relay" || c.remote === "relay") : null;
    if (relayed === true) state.stats.relaySamples++;
    if (relayed === false) state.stats.udpSamples++;
    const s = {
      t: Date.now() - state.startedAt,
      rttMs: stats?.rttMs ?? null,
      inboundBitrateKbps: stats?.inboundBitrateKbps ?? null,
      outboundBitrateKbps: stats?.outboundBitrateKbps ?? null,
      fps: stats?.fps ?? null,
      packetLoss: stats?.packetLoss ?? null,
      upstreamJitterMs: stats?.upstreamJitterMs ?? null,
      availableUpstreamKbps: stats?.availableUpstreamKbps ?? null,
      isRelayed: relayed,
      candidate: cand ? cand.map(c => `${c.local}/${c.remote}${c.protocol ? ":" + c.protocol : ""}`).join(" ") : null
    };
    state.stats.samples.push(s);
    if (state.stats.samples.length % 5 === 0) line(`stats: relay=${relayed} rtt=${s.rttMs} 上行可用=${s.availableUpstreamKbps}kbps 出帧=${s.fps}fps cand=${s.candidate}`);
  });

  // 3. 等首帧（60s）
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
      line("5s 无帧，主动补一次 set()...");
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

  // 4. 剩余时间观察
  const deadline = Date.now() + Math.max(5000, durMs - (Date.now() - state.startedAt));
  while (Date.now() < deadline) {
    await sleep(10000);
    ev("video-poll", `readyState=${outputVideo.readyState} ${outputVideo.videoWidth}×${outputVideo.videoHeight} t=${+outputVideo.currentTime.toFixed(2)}`);
  }

  // 5. stats 聚合
  const agg = {};
  for (const k of ["rttMs", "inboundBitrateKbps", "outboundBitrateKbps", "fps", "packetLoss", "upstreamJitterMs", "availableUpstreamKbps"]) {
    const vals = state.stats.samples.map(s => s[k]).filter(v => v !== null && v !== undefined);
    if (vals.length) agg[k] = { min: +Math.min(...vals).toFixed(1), avg: +(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1), max: +Math.max(...vals).toFixed(1), n: vals.length };
  }
  state.stats.agg = agg;
  ev("stats-agg", JSON.stringify({ ...agg, relaySamples: state.stats.relaySamples, udpSamples: state.stats.udpSamples }));

  line("断开会话...");
  try { rt.disconnect(); } catch (e) {}
  await sleep(500);

  state.endedAt = Date.now();
  state.elapsedMs = state.endedAt - state.startedAt;
  state.estimatedCostUsd = { usd: +(state.elapsedMs / 1000 * 0.02).toFixed(2), note: "按 $0.02/秒上限估算" };
  try { await postResults(state); } catch (e) { line("结果上报失败: " + e.message); }
  line("结果已上报 → results/decart-diag4.json");
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
