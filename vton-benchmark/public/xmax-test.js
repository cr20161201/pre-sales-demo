import { createXmaxClient, models } from "@xmaxai/sdk";
import { DEFAULTS, params } from "../shared/config.mjs";
import { createRecorder, loadFile, postResults, waitMediaLoaded } from "../shared/metrics.mjs";
import { runRealtimeSequence } from "../shared/harness.mjs";

const logEl = document.querySelector("#log");
const line = msg => {
  logEl.textContent += `\n[${new Date().toLocaleTimeString("zh-CN", { hour12: false })}] ${msg}`;
  console.log(msg);
};

const p = params();
p.prompt ||= DEFAULTS.promptXmax;
const switch1 = new URLSearchParams(location.search).get("switch1") || DEFAULTS.switchXmax;

const inputVideo = document.querySelector("#input");
const outputVideo = document.querySelector("#output");
const recorder = createRecorder({ provider: "xmax", durationMs: p.durationMs, runId: p.runId });
let garmentBUrl = null;

async function connect({ recorder, p, log, keyPayload }) {
  log("加载测试视频（预览）...");
  inputVideo.src = p.inputUrl;
  inputVideo.loop = true;
  await waitMediaLoaded(inputVideo, 20000);
  inputVideo.play().catch(() => {});

  log("加载并上传服装参考图...");
  const garmentBlob = await loadFile(`/assets/${p.garment}`);
  const client = createXmaxClient({
    apiKey: keyPayload.temporaryApiKey,
    onError: (m, e) => recorder.recordError(`${m}${e?.message ? ": " + e.message : ""}`)
  });
  const model = models.realtime("x2.0");
  const refImageUrl = await client.files.uploadAndCheckImage(new File([garmentBlob], p.garment, { type: garmentBlob.type || "image/jpeg" }));
  log("服装图上传完成");

  log("连接实时会话（context 预置试穿）...");
  const videoBlob = await loadFile(p.inputUrl);
  const session = await client.realtime.connectMedia(new File([videoBlob], "test-clip.webm", { type: "video/webm" }), {
    model,
    playback: { playbackRate: 1 },
    context: { prompt: p.prompt, refImageUrl },
    audio: { publish: false, subscribe: false },
    log: { rtc: false },
    autoStart: true,
    onRemoteStream: stream => {
      outputVideo.srcObject = stream;
      outputVideo.play().catch(() => {});
    },
    onRemoteVideoFirstFrame: () => recorder.markFirstFrame(),
    onStateChange: s => recorder.recordState(s),
    onDisconnect: reason => recorder.recordDisconnect(reason),
    onError: (m, e) => recorder.recordError(`${m}${e?.message ? ": " + e.message : ""}`)
  });
  recorder.markSessionReady();

  return {
    modelSpec: { name: "x2.0", width: model.width, height: model.height, fps: model.fps, source: "model" },
    session,
    makeSet: async ({ target, p }) => {
      if (target === "B" && !garmentBUrl) {
        const b = await loadFile(`/assets/${p.garmentB}`);
        garmentBUrl = await client.files.uploadAndCheckImage(new File([b], p.garmentB, { type: b.type || "image/png" }));
      }
      await session.set({
        prompt: target === "A" ? p.prompt : switch1,
        refImageUrl: target === "A" ? refImageUrl : garmentBUrl
      });
    }
  };
}

main().catch(async error => {
  line("测试失败: " + error.message);
  try {
    await postResults({ provider: "xmax", error: String(error.message), partial: recorder.finish() });
  } catch {}
  window.__BENCH_FAILED__ = true;
});

async function main() {
  await runRealtimeSequence({ provider: "xmax", p, log: line, connect });
}
