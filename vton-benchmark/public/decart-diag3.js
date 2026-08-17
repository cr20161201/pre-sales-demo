// Decart 决定性验证 v3：deep checkConnectivity（真实短会话测 glass-to-glass）
// 若 deep probe 有 g2g 帧 → 网络 OK，问题在我们的测试脚本（captureStream）；
// 若 deep probe 也无帧 → 网络受限坐实。
import { createDecartClient, models } from "@decartai/sdk";
import { params } from "../shared/config.mjs";
import { postResults } from "../shared/metrics.mjs";

const logEl = document.querySelector("#log");
const line = msg => {
  const t = `[${new Date().toLocaleTimeString("zh-CN", { hour12: false })}] ${msg}`;
  logEl.textContent += `\n${t}`;
  logEl.scrollTop = logEl.scrollHeight;
  console.log(`[diag3] ${msg}`);
};

const p = params();
const state = {
  provider: "decart-diag3",
  startedAt: Date.now(),
  durationMs: 60000,
  events: [],
  errors: [],
  endedAt: null,
  elapsedMs: null,
  estimatedCostUsd: null
};
const ev = (name, detail) => {
  state.events.push({ at: Date.now() - state.startedAt, name, detail: typeof detail === "string" ? detail : JSON.stringify(detail).slice(0, 800) });
  line(`EVENT ${name}: ${typeof detail === "string" ? detail.slice(0, 300) : JSON.stringify(detail).slice(0, 300)}`);
};

async function main() {
  line("Decart 决定性验证 v3：deep checkConnectivity");

  const keyRes = await fetch("/api/token/decart", { method: "POST" });
  const keyPayload = await keyRes.json();
  if (!keyRes.ok) throw new Error(keyPayload.message || "凭证获取失败");
  ev("token-ok", `ttl=${keyPayload.ttlSeconds}s`);

  const client = createDecartClient({ apiKey: keyPayload.temporaryApiKey });
  const model = models.realtime("lucy-vton-latest");
  line(`模型: ${model.name} ${model.width}×${model.height}@${JSON.stringify(model.fps)}`);

  // deep probe：开真实会话，用合成源 + frame-metadata 测 glass-to-glass（约 12s GPU 会话）
  line("运行 deep checkConnectivity（真实短会话，~12s）...");
  try {
    const report = await client.realtime.checkConnectivity({
      deep: true,
      model,
      durationMs: 20000
    });
    ev("deep-probe-result", JSON.stringify(report, null, 0));
    line("deep probe 结果: " + JSON.stringify(report, null, 2));
  } catch (e) {
    ev("deep-probe-error", `${e.name}: ${e.message}`);
    state.errors.push({ at: Date.now(), message: `deep: ${e.message}` });
  }

  // 常规 connect 对照（h264 + initialState，30s 观察）
  line("\n对照：常规 connect（h264 + initialState），观察 30s");
  try {
    const rt = await client.realtime.connect(new MediaStream(), {
      model,
      mirror: false,
      resolution: "720p",
      preferredVideoCodec: "h264",
      onRemoteStream: s => {
        const tracks = s.getTracks().map(t => `${t.kind}:${t.readyState}`);
        ev("remote-stream", `tracks=[${tracks.join(" | ")}]`);
      },
      onConnectionChange: st => ev("conn-change", st),
      onConnectionQuality: q => ev("conn-quality", JSON.stringify(q).slice(0, 300))
    });
    ev("connect-resolved", `sessionId=${rt.sessionId || "?"}`);
    await new Promise(r => setTimeout(r, 30000));
    try { rt.disconnect(); } catch {}
  } catch (e) {
    ev("connect-failed", `${e.name}: ${e.message}`);
    state.errors.push({ at: Date.now(), message: `connect: ${e.message}` });
  }

  state.endedAt = Date.now();
  state.elapsedMs = state.endedAt - state.startedAt;
  state.estimatedCostUsd = { usd: +(state.elapsedMs / 1000 * 0.02).toFixed(2), note: "按 $0.02/秒上限估算" };
  try { await postResults(state); } catch (e) { line("结果上报失败: " + e.message); }
  line("结果已上报 → results/decart-diag3.json");
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
