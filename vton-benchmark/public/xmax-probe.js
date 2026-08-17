import { createXmaxClient, models } from "@xmaxai/sdk";
import { DEFAULTS } from "../shared/config.mjs";
import { loadFile, postResults, waitFirstFrame } from "../shared/metrics.mjs";

const query = new URLSearchParams(location.search);
const runId = query.get("runId") || "xmax-probe";
const inputUrl = query.get("inputUrl") || "/results/transcoded/test-clip.webm";
const garment = query.get("garment") || "garment.jpg";
const startedAt = Date.now();

async function main() {
  const keyResponse = await fetch("/api/token/xmax", { method: "POST" });
  const keyPayload = await keyResponse.json();
  if (!keyResponse.ok) throw new Error(keyPayload.message || "临时凭证获取失败");
  const garmentBlob = await loadFile(`/assets/${garment}`);
  const videoBlob = await loadFile(inputUrl);
  const client = createXmaxClient({ apiKey: keyPayload.temporaryApiKey });
  const refImageUrl = await client.files.uploadAndCheckImage(new File([garmentBlob], garment, { type: garmentBlob.type || "image/jpeg" }));
  const output = document.querySelector("#output");
  const session = await client.realtime.connectMedia(new File([videoBlob], "probe.webm", { type: "video/webm" }), {
    model: models.realtime("x2.0"),
    playback: { playbackRate: 1 },
    context: { prompt: DEFAULTS.promptXmax, refImageUrl },
    audio: { publish: false, subscribe: false },
    autoStart: true,
    onRemoteStream: stream => { output.srcObject = stream; output.play().catch(() => {}); }
  });
  try {
    await waitFirstFrame(output, 20000);
    await postResults({ provider: "xmax-probe", runId, ok: true, elapsedMs: Date.now() - startedAt, outputResolution: { width: output.videoWidth, height: output.videoHeight } });
  } finally {
    session.disconnect();
  }
}

main().catch(error => postResults({ provider: "xmax-probe", runId, ok: false, elapsedMs: Date.now() - startedAt, error: String(error.message) }).catch(() => {}));
