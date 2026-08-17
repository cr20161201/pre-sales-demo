import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { fileURLToPath } from "node:url";
import express from "express";
import { createDecartClient } from "@decartai/sdk";

const modulePath = fileURLToPath(import.meta.url);
const root = path.dirname(modulePath);
const resultsDir = path.join(root, "results");
const assetsDir = path.join(root, "assets");
const publicDir = path.join(root, "public");
const sharedDir = path.join(root, "shared");

fs.mkdirSync(resultsDir, { recursive: true });
fs.mkdirSync(assetsDir, { recursive: true });

const env = process.env;
const isConfigured = value => {
  const v = String(value || "").trim();
  return Boolean(v && !/replace|your[_-]?key|xxxxxxxx|changeme/i.test(v));
};
const xmaxApiKey = env.XMAX_API_KEY || "";
const decartApiKey = env.DECART_API_KEY || "";

export function createApp() {
  const app = express();
  app.use(express.json({ limit: "100mb" }));

  app.use("/shared", express.static(sharedDir));
  app.use("/assets", express.static(assetsDir));
  app.use("/results", express.static(resultsDir));
  app.use("/runs", express.static(path.join(root, "runs")));
  app.use(express.static(publicDir));

  app.get("/api/health", (_req, res) => {
    let assets = [];
    try {
      assets = fs.readdirSync(assetsDir).filter(f => /\.(mp4|webm|mov|jpg|jpeg|png|webp)$/i.test(f));
    } catch { assets = []; }
    res.json({
      ok: isConfigured(xmaxApiKey) && isConfigured(decartApiKey),
      xmaxConfigured: isConfigured(xmaxApiKey),
      decartConfigured: isConfigured(decartApiKey),
      assets,
      port: Number(env.PORT || 4400)
    });
  });

  // Xmax：用主 Key 签发临时密钥（积分上限兜底），浏览器拿不到主 Key
  app.post("/api/token/xmax", async (_req, res) => {
    if (!isConfigured(xmaxApiKey)) {
      return res.status(503).json({ message: "XMAX_API_KEY 未配置，请先填写 .env" });
    }
    try {
      const upstream = await fetch("https://api.xmaxai.com/open/api/v1/temporary-api-key", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Api-Key": xmaxApiKey },
        body: JSON.stringify({
          expireSeconds: Number(env.XMAX_KEY_EXPIRE_SECONDS || 1800),
          pointsLimit: Number(env.XMAX_KEY_POINTS_LIMIT || 500)
        }),
        signal: AbortSignal.timeout(15000)
      });
      const payload = await upstream.json().catch(() => ({}));
      if (!upstream.ok || !payload?.data?.temporaryApiKey) {
        return res.status(upstream.status || 502).json({
          message: payload?.message || "Xmax 临时密钥签发失败",
          code: payload?.code
        });
      }
      res.json({ temporaryApiKey: payload.data.temporaryApiKey, expireTimestamp: payload.data.expireTimestamp });
    } catch (error) {
      res.status(502).json({ message: `无法连接 Xmax API: ${error.message}` });
    }
  });

  // Decart：用主 Key 创建 10 分钟 client token，浏览器拿不到主 Key
  app.post("/api/token/decart", async (_req, res) => {
    if (!isConfigured(decartApiKey)) {
      return res.status(503).json({ message: "DECART_API_KEY 未配置，请先填写 .env" });
    }
    try {
      const client = createDecartClient({ apiKey: decartApiKey });
      const token = await client.tokens.create({
        expiresIn: 600,
        allowedModels: ["lucy-vton-3.5"],
        constraints: { realtime: { maxSessionDuration: 240 } }
      });
      res.json({ temporaryApiKey: token.apiKey, ttlSeconds: 600 });
    } catch (error) {
      res.status(502).json({ message: `无法创建 Decart client token: ${error.message}` });
    }
  });

  // 正式结果按 run ID 隔离，避免后一次测试覆盖前一次证据。
  app.post("/api/results/:runId/:provider", (req, res) => {
    const runId = String(req.params.runId || "").replace(/[^\w.-]/g, "");
    const provider = String(req.params.provider || "").replace(/[^\w-]/g, "");
    if (!runId || !provider) return res.status(400).json({ message: "runId 或 provider 参数无效" });
    const runDir = path.join(root, "runs", runId);
    fs.mkdirSync(runDir, { recursive: true });
    const file = path.join(runDir, `${provider}.json`);
    fs.writeFileSync(file, JSON.stringify(req.body, null, 2));
    if (runId === "manual" && /^decart-(?:diag\d*|manual)$/.test(provider)) {
      fs.writeFileSync(path.join(resultsDir, `${provider}.json`), JSON.stringify(req.body, null, 2));
    }
    res.json({ ok: true, saved: file });
  });

  return app;
}

export async function startServer(port = Number(env.PORT || 4400)) {
  const app = createApp();
  const server = http.createServer(app);
  const host = env.BIND_HOST || "127.0.0.1";
  await new Promise(resolve => server.listen(port, host, resolve));
  return { server, port };
}

if (process.argv[1] && path.resolve(process.argv[1]) === modulePath) {
  startServer()
    .then(({ port }) => console.log(`vton-benchmark server: http://localhost:${port}`))
    .catch(error => { console.error(error.message); process.exitCode = 1; });
}
