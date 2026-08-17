// Decart 诊断 v5：严格复刻官方 Quick Start
// 输入：H.264+AAC 录制视频（1280×720 16:9），带音频轨
// 流程：connect() → 等 connected → set({prompt, image}) → 等首帧
// 不用 initialState，mirror 用 auto
import { createDecartClient, models } from "@decartai/sdk";
import { DEFAULTS, params } from "../shared/config.mjs";
import { loadFile, postResults, sleep } from "../shared/metrics.mjs";

const p = params();
p.prompt ||= DEFAULTS.promptDecart;

const state = {
  provider: "decart-diag5",
  startedAt: null,
  events: [],
  modelSpec: null,
  outputResolution: null,
  firstFrameMs: null,
  stats: { samples: [], agg: null },
  remoteTracks: [],
  disconnects: [],
  errors: [],
  generation: [],
  endedAt: null,
  elapsedMs: null,
  estimatedCostUsd: null
};
const ev = (name, detail) => {
  state.events.push({ at: Date.now() - state.startedAt, name, detail: typeof detail === "string" ? detail : JSON.stringify(detail).slice(0, 600) });
  console.log(`[diag5] EVENT ${name}:`, detail);
};

async function main() {
  state.startedAt = Date.now();
  console.log("[diag5] Decart 官方 Quick Start 复测启动");

  // 1. 加载 H.264+AAC 人物视频
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
  const localTracks = stream.getTracks().map(t => ({ kind: t.kind, label: t.label, readyState: t.readyState }));
  ev("input-ready", JSON.stringify({ localTracks, videoWidth: inputVideo.videoWidth, videoHeight: inputVideo.videoHeight }));

  // 2. 凭证
  const keyRes = await fetch("/api/token/decart", { method: "POST" });
  const keyPayload = await keyRes.json();
  if (!keyRes.ok) throw new Error(keyPayload.message || "token failed");
  ev("token-ok", `ttl=${keyPayload.ttlSeconds}s`);

  const client = createDecartClient({ apiKey: keyPayload.temporaryApiKey });
  const model = models.realtime("lucy-vton-3");
  state.modelSpec = { width: model.width, height: model.height, fps: model.fps, source: "model" };

  const garmentBlob = await loadFile(`/assets/${p.garment}`);
  const garmentFile = new File([garmentBlob], p.garment, { type: garmentBlob.type || "image/jpeg" });

  // 3. 连接（严格官方参数，不带 initialState）
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
        const tracks = s.getTracks().map(t => {
          const set = t.getSettings?.() || {};
          return { kind: t.kind, state: t.readyState, label: t.label, w: set.width, h: set.height };
        });
        state.remoteTracks.push({ at: Date.now() - state.startedAt, tracks });
        ev("remote-stream", JSON.stringify(tracks));
        outputVideo.srcObject = s;
        outputVideo.play().catch(() => {});
      },
      onConnectionChange: st => {
        ev("conn-change", st);
        if (st === "reconnecting") state.disconnects.push({ at: Date.now() - state.startedAt });
      },
      onQueuePosition: qp => ev("queue-position", JSON.stringify(qp)),
      onConnectionQuality: q => ev("conn-quality", JSON.stringify(q))
    });
    ev("connect-resolved", `sessionId=${rt.sessionId || "?"}`);
  } catch (e) {
    ev("connect-failed", `${e.name}: ${e.message}`);
    state.errors.push({ at: Date.now(), message: e.message });
    await finish();
    return;
  }

  rt.on("stats", stats => {
    const pairs = stats?.connection?.selectedCandidatePairs;
    const cand = pairs?.length ? pairs.map(pair => ({ local: pair.local?.candidateType ?? "?", remote: pair.remote?.candidateType ?? "?", protocol: pair.local?.protocol ?? pair.remote?.protocol ?? "?" })) : null;
    const s = {
      t: Date.now() - state.startedAt,
      rttMs: stats?.rttMs ?? null,
      inboundBitrateKbps: stats?.inboundBitrateKbps ?? null,
      outboundBitrateKbps: stats?.outboundBitrateKbps ?? null,
      fps: stats?.fps ?? null,
      packetLoss: stats?.packetLoss ?? null,
      availableUpstreamKbps: stats?.availableUpstreamKbps ?? null,
      candidate: cand ? cand.map(c => `${c.local}/${c.remote}:${c.protocol}`).join(" ") : null
    };
    state.stats.samples.push(s);
    if (state.stats.samples.length % 5 === 0) console.log(`[diag5] stats t=${s.t} rtt=${s.rttMs} up=${s.availableUpstreamKbps} in=${s.inboundBitrateKbps} fps=${s.fps}`);
  });

  // 监听生成事件（判断服务端是否开始推理）
  rt.on("generationTick", e => state.generation.push({ at: Date.now() - state.startedAt, type: "tick", ...e }));
  rt.on("generationEnded", e => state.generation.push({ at: Date.now() - state.startedAt, type: "ended", ...e }));

  // 4. 官方 set() 调用
  console.log("[diag5] 发起官方 set({prompt, image})...");
  try {
    await rt.set({ prompt: p.prompt, image: garmentFile, enhance: false });
    ev("set-resolved", "ok");
  } catch (e) {
    ev("set-failed", e.message);
    state.errors.push({ at: Date.now(), message: `set: ${e.message}` });
    await finish();
    return;
  }

  // 5. 等首帧（修正判定：必须有像素+播放进度）
  const t0 = Date.now();
  let gotFrame = false;
  console.log("[diag5] 等待首帧（最长 60s）...");
  while (Date.now() - t0 < 60000) {
    if (outputVideo.videoWidth > 0 && outputVideo.currentTime > 0) {
      gotFrame = true;
      state.firstFrameMs = Date.now() - state.startedAt;
      state.outputResolution = { width: outputVideo.videoWidth, height: outputVideo.videoHeight };
      ev("first-frame", `+${state.firstFrameMs}ms ${state.outputResolution.width}×${state.outputResolution.height}`);
      break;
    }
    await sleep(500);
  }
  if (!gotFrame) {
    ev("no-frame", `60s 无帧, readyState=${outputVideo.readyState}, videoWidth=${outputVideo.videoWidth}`);
  }

  // 6. 稳定观察 30s
  const deadline = Date.now() + 30000;
  while (Date.now() < deadline) {
    await sleep(10000);
    ev("video-poll", `readyState=${outputVideo.readyState} ${outputVideo.videoWidth}×${outputVideo.videoHeight} t=${+outputVideo.currentTime.toFixed(2)} gen=${state.generation.length}`);
  }

  await finish();
}

async function finish() {
  const agg = {};
  for (const k of ["rttMs", "inboundBitrateKbps", "outboundBitrateKbps", "fps", "packetLoss", "availableUpstreamKbps"]) {
    const vals = state.stats.samples.map(s => s[k]).filter(v => v !== null && v !== undefined);
    if (vals.length) agg[k] = { min: +Math.min(...vals).toFixed(1), avg: +(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1), max: +Math.max(...vals).toFixed(1), n: vals.length };
  }
  state.stats.agg = agg;
  state.endedAt = Date.now();
  state.elapsedMs = state.endedAt - state.startedAt;
  state.estimatedCostUsd = { usd: +(state.elapsedMs / 1000 * 0.02).toFixed(2), note: "按 $0.02/秒上限估算" };
  try {
    await postResults(state);
    console.log("[diag5] 结果已保存 → results/decart-diag5.json");
    window.__BENCH_DONE__ = true;
  } catch (e) {
    console.error("[diag5] 保存失败:", e.message);
  }
}

main().catch(async e => {
  console.error("[diag5] main error:", e);
  state.errors.push({ at: Date.now(), message: e.message });
  await finish();
});
