// 共享配置与 URL 参数解析（浏览器端）
export const DEFAULTS = {
  durationMs: 180000,
  video: "test-clip.mp4",
  garment: "garment.jpg",
  garmentB: "garment-b.png",
  promptXmax: "Substitute the upper-body garment with a white long-sleeve button-up shirt, closed front, relaxed fit. Preserve the person's face, hair, body shape, lower-body clothing, accessories, pose, motion, and background.",
  promptDecart: "Substitute the upper-body garment with a white long-sleeve button-up shirt, closed front, relaxed fit. Preserve the person's face, hair, body shape, lower-body clothing, accessories, pose, motion, and background.",
  switchXmax: "Substitute the upper-body garment with a brown plaid double-breasted blazer, worn over a plain neutral crew-neck T-shirt. Preserve the person's face, hair, body shape, lower-body clothing, accessories, pose, motion, and background.",
  switchDecart: "Substitute the upper-body garment with a brown plaid double-breasted blazer, worn over a plain neutral crew-neck T-shirt. Preserve the person's face, hair, body shape, lower-body clothing, accessories, pose, motion, and background."
};

export function params() {
  const p = new URLSearchParams(location.search);
  return {
    runId: p.get("runId") || "manual",
    inputUrl: p.get("inputUrl") || "/results/transcoded/test-clip.webm",
    decartModel: p.get("decartModel") || "lucy-vton-3.5",
    provider: p.get("provider") || "xmax",
    auto: p.get("auto") === "1",
    durationMs: Number(p.get("duration") || DEFAULTS.durationMs),
    video: p.get("asset") || DEFAULTS.video,
    garment: p.get("garment") || DEFAULTS.garment,
    garmentB: p.get("garmentB") || DEFAULTS.garmentB,
    prompt: p.get("prompt") || null
  };
}
