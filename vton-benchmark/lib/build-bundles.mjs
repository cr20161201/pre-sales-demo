// 用 esbuild 把两个测试页的入口 JS 打包到 results/bundled/（浏览器无法直接 import 裸包名）
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const root = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(root, "..", "public");
const outdir = path.join(root, "..", "results", "bundled");

export async function buildBundles() {
  await build({
    entryPoints: {
      "xmax-test": path.join(publicDir, "xmax-test.js"),
      "xmax-probe": path.join(publicDir, "xmax-probe.js"),
      "decart-test": path.join(publicDir, "decart-test.js"),
      "decart-diag": path.join(publicDir, "decart-diag.js"),
      "decart-diag2": path.join(publicDir, "decart-diag2.js"),
      "decart-diag3": path.join(publicDir, "decart-diag3.js"),
      "decart-diag4": path.join(publicDir, "decart-diag4.js"),
      "decart-diag5": path.join(publicDir, "decart-diag5.js"),
      "decart-diag6": path.join(publicDir, "decart-diag6.js"),
      "decart-manual": path.join(publicDir, "decart-manual.js")
    },
    outdir,
    bundle: true,
    format: "esm",
    platform: "browser",
    target: ["chrome120"],
    logLevel: "info"
  });

  // Decart resolves this worker relative to the generated browser bundle.
  const workerSource = path.join(root, "..", "node_modules", "@decartai", "sdk", "dist", "realtime", "browser", "frame-metadata-worker.js");
  fs.copyFileSync(workerSource, path.join(outdir, "frame-metadata-worker.js"));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  buildBundles()
    .then(() => console.log("bundles 构建完成 → results/bundled/"))
    .catch(e => { console.error(e); process.exitCode = 1; });
}
