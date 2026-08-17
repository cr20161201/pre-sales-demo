import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";
import { startServer } from "./server.mjs";
import { buildBundles } from "./lib/build-bundles.mjs";
import { transcodeVideo } from "./lib/transcode.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const provider = process.argv[2];
const runId = process.argv[3];
if (!new Set(["xmax", "decart"]).has(provider) || !runId) throw new Error("用法: node run-provider.mjs <xmax|decart> <run-id>");
const durationMs = Number(process.env.TEST_DURATION_MS || 25000);
const port = Number(process.env.PORT || 4413);
const runDir = path.join(root, "runs", runId);
const inputFile = path.join(runDir, "transcoded", "test-clip.webm");
const sourceVideo = path.join(root, "assets", process.env.TEST_VIDEO || "test-clip.mp4");
const garment = process.env.TEST_GARMENT || "garment.jpg";
const garmentB = process.env.TEST_GARMENT_B || "garment-b.png";
fs.mkdirSync(runDir, { recursive: true });
await transcodeVideo(sourceVideo, inputFile);
await buildBundles();
fs.writeFileSync(path.join(runDir, "manifest.json"), JSON.stringify({
  runId,
  createdAt: new Date().toISOString(),
  provider,
  durationMs,
  mode: "fixed-video-A-B-A",
  assets: { video: path.basename(sourceVideo), garment, garmentB },
  prompts: {
    A: "Substitute the upper-body garment with a white long-sleeve button-up shirt, closed front, relaxed fit. Preserve the person's face, hair, body shape, lower-body clothing, accessories, pose, motion, and background.",
    B: "Substitute the upper-body garment with a brown plaid double-breasted blazer, worn over a plain neutral crew-neck T-shirt. Preserve the person's face, hair, body shape, lower-body clothing, accessories, pose, motion, and background."
  },
  model: provider === "xmax" ? "x2.0" : "lucy-vton-3.5"
}, null, 2));
const { server } = await startServer(port);
const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  args: ["--no-sandbox", "--autoplay-policy=no-user-gesture-required", "--mute-audio", "--disable-dev-shm-usage"]
});
try {
  const page = await browser.newPage();
  page.on("console", message => console.log(`[${provider}] ${message.text()}`));
  page.on("pageerror", error => console.error(`[${provider}] ${error.message}`));
  const query = new URLSearchParams({ auto: "1", duration: String(durationMs), runId, inputUrl: `/runs/${runId}/transcoded/test-clip.webm`, garment, garmentB, decartModel: "lucy-vton-3.5" });
  await page.goto(`http://localhost:${port}/${provider}-test.html?${query}`, { waitUntil: "domcontentloaded", timeout: 60000 });
  const resultFile = path.join(runDir, `${provider}.json`);
  const deadline = Date.now() + durationMs + 90000;
  while (Date.now() < deadline && !fs.existsSync(resultFile)) await new Promise(resolve => setTimeout(resolve, 500));
  if (!fs.existsSync(resultFile)) throw new Error(`${provider} 未生成结果`);
  const result = JSON.parse(fs.readFileSync(resultFile, "utf8"));
  const shotsDir = path.join(runDir, "shots");
  fs.mkdirSync(shotsDir, { recursive: true });
  for (const shot of result.shots || []) {
    if (!shot.dataUrl) continue;
    const name = `${provider}_${String(shot.label).replace(/[^\w-]/g, "_")}.jpg`;
    fs.writeFileSync(path.join(shotsDir, name), Buffer.from(shot.dataUrl.replace(/^data:image\/\w+;base64,/, ""), "base64"));
    shot.path = `shots/${name}`;
    delete shot.dataUrl;
  }
  fs.writeFileSync(resultFile, JSON.stringify(result, null, 2));
  console.log(JSON.stringify({ runId, provider, outputResolution: result.outputResolution, frameMetrics: result.frameMetrics, setResults: result.setResults, errors: result.errors }, null, 2));
} finally {
  await browser.close();
  server.close();
}
