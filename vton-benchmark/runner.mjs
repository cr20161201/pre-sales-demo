// vton-benchmark 自动化 runner：
// 转码素材 → 启动本地服务 → 无头 Chrome 依次跑 xmax/decart（每家 180s 上限）→ 提取截图 → 生成对比草稿
// 用法：node runner.mjs [--batch]
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";
import { startServer } from "./server.mjs";
import { buildBundles } from "./lib/build-bundles.mjs";
import { transcodeVideo, transcodeBatchMp4 } from "./lib/transcode.mjs";
import { buildComparison } from "./lib/build-comparison.mjs";
import { runBatch } from "./lib/batch.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const runId = String(process.env.RUN_ID || new Date().toISOString().replace(/[:.]/g, "-")).replace(/[^\w.-]/g, "-");
const runsDir = path.join(root, "runs");
const runDir = path.join(runsDir, runId);
const reportsDir = path.join(root, "reports");
const reportDir = path.join(reportsDir, runId);
const shotsDir = path.join(runDir, "shots");
const transcodedDir = path.join(runDir, "transcoded");
const assetsDir = path.join(root, "assets");
// 默认用系统 Chrome；若系统 Chrome 与 puppeteer-core 版本不兼容（Chrome 151 vs puppeteer 25），
// 可在 .env 里设 CHROME_PATH 指向下载的 Chrome for Testing（@puppeteer/browsers install chrome@137）
const CHROME_PATH =
  process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const durationMs = Number(process.env.TEST_DURATION_MS || 180000);
const port = Number(process.env.PORT || 4400);

async function waitForResultFile(provider, timeoutMs) {
  const file = path.join(runDir, `${provider}.json`);
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (fs.existsSync(file)) return file;
    await new Promise(r => setTimeout(r, 1000));
  }
  return null;
}

async function extractShots(provider) {
  const file = path.join(runDir, `${provider}.json`);
  if (!fs.existsSync(file)) return;
  const json = JSON.parse(fs.readFileSync(file, "utf8"));
  fs.mkdirSync(shotsDir, { recursive: true });
  for (const shot of json.shots || []) {
    if (!shot.dataUrl) continue;
    const name = `${provider}_${String(shot.label).replace(/[^\w-]/g, "_")}.jpg`;
    const buf = Buffer.from(shot.dataUrl.replace(/^data:image\/\w+;base64,/, ""), "base64");
    fs.writeFileSync(path.join(shotsDir, name), buf);
    shot.path = `shots/${name}`;
    delete shot.dataUrl;
  }
  fs.writeFileSync(file, JSON.stringify(json, null, 2));
}

async function main() {
  const doBatch = process.argv.slice(2).includes("--batch");
  fs.mkdirSync(runDir, { recursive: true });
  fs.mkdirSync(reportDir, { recursive: true });

  // 前置检查
  const videoSrc = path.join(assetsDir, process.env.TEST_VIDEO || "test-clip.mp4");
  const garmentSrc = path.join(assetsDir, process.env.TEST_GARMENT || "garment.jpg");
  for (const f of [videoSrc, garmentSrc]) {
    if (!fs.existsSync(f)) {
      console.error(`[素材缺失] ${f}\n请把测试视频（mp4）和服装图（jpg/png）放进 ${assetsDir}，并保持 .env 的 TEST_VIDEO/TEST_GARMENT 一致。`);
      process.exit(1);
    }
  }
  const missing = [];
  if (!(process.env.XMAX_API_KEY || "").trim()) missing.push("XMAX_API_KEY");
  if (!(process.env.DECART_API_KEY || "").trim()) missing.push("DECART_API_KEY");
  if (missing.length) {
    console.error(`[密钥缺失] .env 中缺少: ${missing.join(", ")}（复制 .env.example 为 .env 并填写）`);
    process.exit(1);
  }

  const manifest = {
    runId,
    createdAt: new Date().toISOString(),
    mode: "fixed-video-sequential",
    durationMs,
    providers: ["xmax", "decart"],
    assets: {
      video: path.basename(videoSrc),
      garment: path.basename(garmentSrc),
      garmentB: process.env.TEST_GARMENT_B || "garment-b.png"
    },
    prompts: {
      xmax: process.env.XMAX_PROMPT || null,
      decart: process.env.DECART_PROMPT || null
    },
    runtime: { node: process.version, platform: process.platform, chromePath: CHROME_PATH }
  };
  const lock = JSON.parse(fs.readFileSync(path.join(root, "package-lock.json"), "utf8"));
  manifest.dependencies = {
    xmaxSdk: lock.packages?.["node_modules/@xmaxai/sdk"]?.version || "unknown",
    decartSdk: lock.packages?.["node_modules/@decartai/sdk"]?.version || "unknown",
    xmaxModel: "x2.0",
    decartModel: process.env.DECART_MODEL || "lucy-vton-3.5"
  };
  fs.writeFileSync(path.join(runDir, "manifest.json"), JSON.stringify(manifest, null, 2));

  console.log(`[1/5] 转码测试视频（VP9 WebM 供实时测试 + H.264 MP4 供批量 API）...`);
  await transcodeVideo(videoSrc, path.join(transcodedDir, "test-clip.webm"));
  const batchClip = await transcodeBatchMp4(videoSrc, path.join(transcodedDir, "test-clip-batch.mp4"));
  console.log(`      产物: ${path.join(transcodedDir, "test-clip.{webm,mp4}")}`);

  console.log(`[2/5] 构建测试页 bundle + 启动本地服务 http://localhost:${port}`);
  await buildBundles();
  const { server } = await startServer(port);

  console.log(`[3/5] 无头 Chrome 实测（每 provider 上限 ${Math.round(durationMs / 1000)}s）`);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-first-run", "--no-default-browser-check", "--autoplay-policy=no-user-gesture-required", "--mute-audio", "--no-sandbox", "--disable-dev-shm-usage"]
  });
  try {
    for (const provider of ["xmax", "decart"]) {
      const resultFile = path.join(runDir, `${provider}.json`);
      if (fs.existsSync(resultFile)) fs.rmSync(resultFile);
      const page = await browser.newPage();
      // puppeteer 25 下 newPage() 后 main frame 异步初始化，
      // waitForFunction 会抛 "Requesting main frame too early!"，
      // 正确做法：不显式等待，直接 goto（导航本身会等 frame 就绪）
      page.on("console", msg => console.log(`  [${provider}] ${msg.text()}`));
      page.on("pageerror", err => console.error(`  [${provider}] pageerror: ${err.message}`));
      page.on("requestfailed", req => console.error(`  [${provider}] requestfailed: ${req.url()} (${req.failure()?.errorText || "unknown"})`));
      const query = new URLSearchParams({
        auto: "1",
        duration: String(durationMs),
        runId,
        inputUrl: `/runs/${runId}/transcoded/test-clip.webm`,
        garment: path.basename(garmentSrc),
        garmentB: process.env.TEST_GARMENT_B || "garment-b.png",
        decartModel: process.env.DECART_MODEL || "lucy-vton-3.5"
      });
      const url = `http://localhost:${port}/${provider}-test.html?${query}`;
      console.log(`  → ${url}`);
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
      const got = await waitForResultFile(provider, durationMs + 150000);
      if (!got) throw new Error(`[${provider}] 测试超时，未生成结果文件`);
      const json = JSON.parse(fs.readFileSync(got, "utf8"));
      if (json.error) {
        console.error(`  [${provider}] 测试失败: ${json.error}`);
      } else {
        const calls = (json.setResults || []).map(r => `${r.label}:${r.apiResolvedMs ?? "?"}ms(API)`).join(", ");
        console.log(`  [${provider}] 完成 · 切换调用: ${calls || "无"} · 成本≈$${json.estimatedCostUsd?.usd ?? "?"}`);
      }
      await page.close();
    }
  } finally {
    await browser.close();
  }

  console.log(`[4/5] 提取截图到 runs/${runId}/shots/`);
  await extractShots("xmax");
  await extractShots("decart");

  if (doBatch) {
    console.log(`[4.5/5] 批量 API 对比（Decart job + Xmax offline-task）`);
    await runBatch({ assetsDir, resultsDir: runDir, env: process.env, batchVideo: batchClip });
  }

  console.log(`[5/5] 生成对比草稿`);
  const draft = await buildComparison(runDir, { durationMs, reportDir });
  console.log(`\n全部完成！\n`);
  console.log(`对比草稿 : ${draft}`);
  console.log(`原始数据 : ${runDir}`);
  console.log(`截图目录 : ${shotsDir}/`);
  if (doBatch) console.log(`批量结果 : ${path.join(runDir, "batch", "meta.json")}`);

  server.close();
}

main().catch(error => { console.error(error); process.exitCode = 1; });
