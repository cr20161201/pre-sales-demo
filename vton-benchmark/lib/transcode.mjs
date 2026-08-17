// 用 ffmpeg 把业务素材转成 headless Chrome 可稳定解码的 VP9 720p 无音轨 WebM
// 以及批量 API 用的 10 秒 H.264 MP4（Decart batch 要求 MP4）
// 用法：node lib/transcode.mjs（产物在 results/transcoded/）
import fs from "node:fs";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

const execFileAsync = promisify(execFile);
const root = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(root, "..", "assets");
const outDir = path.join(root, "..", "results", "transcoded");

export async function transcodeVideo(src, dest, { durationSec = 10 } = {}) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const args = [
    "-y",
    "-i", src,
    "-t", String(durationSec),
    "-c:v", "libvpx-vp9",
    "-crf", "32",
    "-b:v", "0",
    "-an",
    "-vf", "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2",
    "-f", "webm",
    dest
  ];
  try {
    await execFileAsync("ffmpeg", args, { timeout: 180000 });
  } catch (error) {
    throw new Error(`ffmpeg 转码失败: ${error.message}`);
  }
  if (!fs.existsSync(dest)) throw new Error("转码失败：未生成产物");
  return dest;
}

// 批量 API 用：10 秒 H.264 720p MP4（Decart Batch API 要求 MP4，H.264 或 VP8）
export async function transcodeBatchMp4(src, dest, { durationSec = 10 } = {}) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const args = [
    "-y",
    "-i", src,
    "-t", String(durationSec),
    "-c:v", "libx264",
    "-preset", "veryfast",
    "-crf", "26",
    "-pix_fmt", "yuv420p",
    "-profile:v", "main",
    "-movflags", "+faststart",
    "-an",
    "-vf", "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2",
    dest
  ];
  try {
    await execFileAsync("ffmpeg", args, { timeout: 180000 });
  } catch (error) {
    throw new Error(`ffmpeg 批量转码失败: ${error.message}`);
  }
  if (!fs.existsSync(dest)) throw new Error("批量转码失败：未生成产物");
  return dest;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const src = path.join(assetsDir, process.env.TEST_VIDEO || "test-clip.mp4");
  if (!fs.existsSync(src)) {
    console.error(`缺少素材: ${src}`);
    process.exit(1);
  }
  Promise.all([
    transcodeVideo(src, path.join(outDir, "test-clip.webm")),
    transcodeBatchMp4(src, path.join(outDir, "test-clip-batch.mp4"))
  ])
    .then(files => files.forEach(f => console.log(`转码完成: ${f}`)))
    .catch(e => { console.error(e.message); process.exitCode = 1; });
}
