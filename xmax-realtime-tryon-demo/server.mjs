import "dotenv/config";
import fs from "node:fs";
import http from "node:http";
import https from "node:https";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { createServer as createViteServer } from "vite";

const modulePath = fileURLToPath(import.meta.url);
const root = path.dirname(modulePath);
const defaultGarmentsDir = path.join(root, "public", "assets", "garments");
const supportedImages = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function getMetadata(garmentsDir) {
  const metadataPath = path.join(garmentsDir, "garments.json");
  if (!fs.existsSync(metadataPath)) return {};
  try { return JSON.parse(fs.readFileSync(metadataPath, "utf8")); }
  catch (error) { throw new Error(`garments.json 格式错误: ${error.message}`); }
}

export function listGarments(garmentsDir = defaultGarmentsDir) {
  fs.mkdirSync(garmentsDir, { recursive: true });
  const metadata = getMetadata(garmentsDir);
  return fs.readdirSync(garmentsDir)
    .filter(file => supportedImages.has(path.extname(file).toLowerCase()))
    .sort((left, right) => left.localeCompare(right, "zh-CN", { numeric: true }))
    .map((file, index) => {
      const configured = metadata[file] || {};
      return {
        id: configured.id || `garment-${String(index + 1).padStart(3, "0")}`,
        name: configured.name || path.basename(file, path.extname(file)),
        image: `/assets/garments/${encodeURIComponent(file)}`,
        file,
        prompt: configured.prompt || null
      };
    });
}

export function temporaryKeyRequest(environment = process.env) {
  return {
    expireSeconds: Number(environment.XMAX_KEY_EXPIRE_SECONDS || 1800),
    pointsLimit: Number(environment.XMAX_KEY_POINTS_LIMIT || 3000)
  };
}

export function configuredApiKey(environment = process.env) {
  const value = environment.XMAX_API_KEY?.trim() || "";
  if (!value || /replace|your[_-]?key/i.test(value)) return "";
  return value;
}

export async function createApp(options = {}) {
  const environment = options.environment || process.env;
  const garmentsDir = options.garmentsDir || defaultGarmentsDir;
  const app = express();
  app.use(express.json());

  app.get("/api/health", (_request, response) => {
    let garments = [];
    let assetError = null;
    try { garments = listGarments(garmentsDir); }
    catch (error) { assetError = error.message; }
    response.json({
      ok: Boolean(configuredApiKey(environment)) && !assetError,
      apiKeyConfigured: Boolean(configuredApiKey(environment)),
      garmentCount: garments.length,
      assetError,
      mode: environment.LAN_HTTPS === "1" ? "lan-https" : "localhost"
    });
  });

  app.get("/api/garments", (_request, response) => {
    try { response.json({ garments: listGarments(garmentsDir) }); }
    catch (error) { response.status(500).json({ message: error.message }); }
  });

  app.get("/api/config", (_request, response) => {
    response.json({
      prompt: environment.XMAX_TRYON_PROMPT || "Replace only the corresponding clothing area with the garment shown in the reference image. Preserve the person's face, hair, identity, body proportions, gender presentation, unaffected clothing, accessories, pose, motion, and background. Use a natural realistic fit and maintain modest everyday coverage.",
      model: "x2.0"
    });
  });

  app.post("/api/xmax/realtime-key", async (_request, response) => {
    const apiKey = configuredApiKey(environment);
    if (!apiKey) {
      response.status(503).json({ message: "XMAX_API_KEY 尚未配置，请先填写项目根目录的 .env 文件。" });
      return;
    }
    try {
      const upstream = await (options.fetchImpl || fetch)("https://api.xmaxai.com/open/api/v1/temporary-api-key", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Api-Key": apiKey },
        body: JSON.stringify(temporaryKeyRequest(environment)),
        signal: AbortSignal.timeout(15000)
      });
      const payload = await upstream.json().catch(() => ({}));
      if (!upstream.ok || !payload?.data?.temporaryApiKey) {
        response.status(upstream.status || 502).json({ message: payload?.message || "Xmax 临时密钥签发失败", code: payload?.code });
        return;
      }
      response.json({ temporaryApiKey: payload.data.temporaryApiKey, expireTimestamp: payload.data.expireTimestamp });
    } catch (error) {
      response.status(502).json({ message: `无法连接 Xmax API: ${error.message}` });
    }
  });

  if (!options.skipVite) {
    const vite = await createViteServer({ root, base: "./", server: { middlewareMode: true }, appType: "spa" });
    app.use(vite.middlewares);
  }
  return app;
}

export async function startServer(environment = process.env) {
  const port = Number(environment.PORT || 4300);
  const lanHttps = environment.LAN_HTTPS === "1";
  const app = await createApp({ environment });
  let server;
  if (lanHttps) {
    const keyPath = path.join(root, "certs", "lan-key.pem");
    const certPath = path.join(root, "certs", "lan-cert.pem");
    if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) throw new Error("缺少内网 HTTPS 证书。请先运行 ./setup-lan-cert.command");
    server = https.createServer({ key: fs.readFileSync(keyPath), cert: fs.readFileSync(certPath) }, app);
  } else {
    server = http.createServer(app);
  }
  server.listen(port, lanHttps ? "0.0.0.0" : "127.0.0.1", () => {
    console.log(`Xmax 实时试衣 Demo: ${lanHttps ? "https://0.0.0.0" : "http://localhost"}:${port}`);
  });
  return server;
}

if (process.argv[1] && path.resolve(process.argv[1]) === modulePath) {
  startServer().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
