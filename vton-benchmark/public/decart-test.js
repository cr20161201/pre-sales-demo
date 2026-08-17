import { createDecartClient, models } from "@decartai/sdk";
import { DEFAULTS, params } from "../shared/config.mjs";
import { createRecorder, loadFile, postResults, waitMediaLoaded } from "../shared/metrics.mjs";
import { runRealtimeSequence } from "../shared/harness.mjs";

const logEl = document.querySelector("#log");
const line = msg => {
  logEl.textContent += `\n[${new Date().toLocaleTimeString("zh-CN", { hour12: false })}] ${msg}`;
  console.log(msg);
};

const p = params();
p.prompt ||= DEFAULTS.promptDecart;
const switch1 = new URLSearchParams(location.search).get("switch1") || DEFAULTS.switchDecart;

const inputVideo = document.querySelector("#input");
const outputVideo = document.querySelector("#output");
const recorder = createRecorder({ provider: "decart", durationMs: p.durationMs, runId: p.runId });

async function connect({ recorder, p, log, keyPayload }) {
  log("加载测试视频...");
  inputVideo.src = p.inputUrl;
  inputVideo.loop = true;
  await waitMediaLoaded(inputVideo, 20000);
  await inputVideo.play().catch(() => {});
  const stream = inputVideo.captureStream();

  log("加载服装参考图...");
  const garmentBlob = await loadFile(`/assets/${p.garment}`);
  const garmentFile = new File([garmentBlob], p.garment, { type: garmentBlob.type || "image/jpeg" });

  const client = createDecartClient({ apiKey: keyPayload.temporaryApiKey });
  const model = models.realtime(p.decartModel);
  log("连接实时会话...");
  const rt = await client.realtime.connect(stream, {
    model,
    mirror: false,
    preferredVideoCodec: "vp9",
    initialState: {
      prompt: { text: p.prompt, enhance: false },
      image: garmentFile
    },
    onRemoteStream: s => {
      outputVideo.srcObject = s;
      outputVideo.play().catch(() => {});
    },
    onConnectionChange: state => {
      recorder.recordState(state);
      if (state === "reconnecting") recorder.recordDisconnect("reconnecting");
    }
  });
  recorder.markSessionReady();

  return {
    modelSpec: { name: p.decartModel, width: model.width, height: model.height, fps: model.fps, source: "model" },
    session: rt,
    makeSet: async ({ target, p }) => {
      const source = target === "A" ? garmentFile : await loadFile(`/assets/${p.garmentB}`);
      await rt.set({
        prompt: target === "A" ? p.prompt : switch1,
        image: source instanceof File ? source : new File([source], p.garmentB, { type: source.type || "image/png" }),
        enhance: false
      });
    }
  };
}

main().catch(async error => {
  line("测试失败: " + error.message);
  try {
    await postResults({ provider: "decart", error: String(error.message), partial: recorder.finish() });
  } catch {}
  window.__BENCH_FAILED__ = true;
});

async function main() {
  await runRealtimeSequence({ provider: "decart", p, log: line, connect });
}
