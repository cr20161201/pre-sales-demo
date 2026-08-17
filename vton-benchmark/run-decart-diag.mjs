// Decart 专项诊断 runner：只跑 decart 诊断页，输出完整控制台日志 + results/<page>.json
// 用法：node run-decart-diag.mjs [durationSeconds] [pageName]
//   pageName: decart-diag（v1 多 codec 扫描）| decart-diag2（v2 单会话+stats），默认 decart-diag
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";
import { startServer } from "./server.mjs";
import { buildBundles } from "./lib/build-bundles.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const resultsDir = path.join(root, "results");
const CHROME_PATH = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const port = Number(process.env.PORT || 4400);
const durationMs = Math.min(Number(process.argv[2] || 150) * 1000, 180000);
const pageName = process.argv[3] || "decart-diag";

async function main() {
  console.log(`[1/3] 构建 bundle + 启动服务 :${port}`);
  await buildBundles();
  const { server } = await startServer(port);

  console.log(`[2/3] 无头 Chrome 跑 Decart 诊断（上限 ${Math.round(durationMs / 1000)}s + 30s 观察余量）`);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-first-run", "--no-default-browser-check", "--autoplay-policy=no-user-gesture-required", "--mute-audio", "--no-sandbox", "--disable-dev-shm-usage"]
  });
  const logFile = path.join(resultsDir, `${pageName}-console.log`);
  const logs = [];
  try {
    const resultFile = path.join(resultsDir, `${pageName}.json`);
    if (fs.existsSync(resultFile)) fs.rmSync(resultFile);
    const page = await browser.newPage();
    page.on("console", msg => { const l = `[console.${msg.type()}] ${msg.text()}`; logs.push(l); console.log(l); });
    page.on("pageerror", err => { const l = `[pageerror] ${err.message}`; logs.push(l); console.error(l); });
    page.on("requestfailed", req => { const l = `[requestfailed] ${req.url()} :: ${req.failure()?.errorText || "?"}`; logs.push(l); console.warn(l); });

    const url = `http://localhost:${port}/${pageName}.html?auto=1&duration=${durationMs}`;
    console.log(`  → ${url}`);
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

    // 等待结果文件（duration + 60s 余量）
    const deadline = Date.now() + durationMs + 60000;
    let json = null;
    while (Date.now() < deadline) {
      if (fs.existsSync(resultFile)) { json = JSON.parse(fs.readFileSync(resultFile, "utf8")); break; }
      await new Promise(r => setTimeout(r, 1000));
    }
    if (!json) {
      // 兜底：读页面上的 __BENCH_DONE__ / 报错
      const done = await page.evaluate(() => ({ done: window.__BENCH_DONE__, failed: window.__BENCH_FAILED__, log: document.querySelector("#log")?.textContent?.slice(-4000) })).catch(() => null);
      if (done?.log) logs.push("[page-log-tail] " + done.log);
      console.log("[兜底] 页面状态: " + JSON.stringify(done, null, 2).slice(0, 4000));
      throw new Error("诊断超时，未生成结果文件");
    }

    // 提取截图（诊断页 shots 字段如果有 dataUrl）
    const shotsDir = path.join(resultsDir, "shots");
    fs.mkdirSync(shotsDir, { recursive: true });
    for (const shot of json.shots || []) {
      if (!shot.dataUrl) continue;
      const name = `decartdiag_${String(shot.label).replace(/[^\w-]/g, "_")}.jpg`;
      fs.writeFileSync(path.join(shotsDir, name), Buffer.from(shot.dataUrl.replace(/^data:image\/\w+;base64,/, ""), "base64"));
      shot.path = `shots/${name}`;
      delete shot.dataUrl;
    }
    fs.writeFileSync(resultFile, JSON.stringify(json, null, 2));

    console.log("\n===== 诊断结果摘要 =====");
    console.log("connectivity:", JSON.stringify(json.connectivity, null, 1));
    if (json.codecSupport) console.log("codecSupport:", JSON.stringify(json.codecSupport, null, 1));
    if (json.uploadProbe) console.log("uploadProbe:", JSON.stringify(json.uploadProbe, null, 1));
    if (json.stats?.agg) console.log("stats.agg:", JSON.stringify(json.stats.agg, null, 1));
    if (json.triedCodecs) console.log("triedCodecs:", JSON.stringify(json.triedCodecs, null, 1));
    if (json.remoteTracks) console.log("remoteTracks:", JSON.stringify(json.remoteTracks, null, 1));
    console.log("firstFrameMs:", json.firstFrameMs, "output:", JSON.stringify(json.outputResolution));
    console.log("setResults:", JSON.stringify(json.setResults, null, 1));
    console.log("errors:", JSON.stringify(json.errors, null, 1));
    console.log("estimatedCostUsd:", JSON.stringify(json.estimatedCostUsd));
    console.log("事件数:", json.events?.length, "→ 详见", `${pageName}.json`);
    console.log("控制台日志:", logFile);
  } finally {
    fs.writeFileSync(logFile, logs.join("\n"));
    await browser.close();
    server.close();
  }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
