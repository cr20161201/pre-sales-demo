// 通用实时测试序列：凭证 → 连接 → 首帧 → 首次试穿(可选) → 换装×2 → 稳定性观察 → 上报
import { captureFrame, createRecorder, postResults, sleep, startFrameMetrics, waitFirstFrame } from "./metrics.mjs";

export async function runRealtimeSequence({ provider, p, log, connect }) {
  const recorder = createRecorder({ provider, durationMs: p.durationMs, runId: p.runId });
  const startedAt = Date.now();
  const hardStop = startedAt + p.durationMs;
  const outputVideo = document.querySelector("#output");

  const health = await fetch("/api/health").then(r => r.json());
  const hasGarmentB = (health.assets || []).includes(p.garmentB);
  log(`测试素材: ${p.video} / ${p.garment}${hasGarmentB ? " / " + p.garmentB : ""}，时长上限 ${Math.round(p.durationMs / 1000)}s`);

  log("获取临时凭证...");
  const keyRes = await fetch(`/api/token/${provider}`, { method: "POST" });
  const keyPayload = await keyRes.json();
  if (!keyRes.ok) throw new Error(keyPayload.message || "凭证获取失败");
  recorder.markToken();
  log("临时凭证已获取");

  log("建立实时会话...");
  const { modelSpec, makeSet } = await connect({ recorder, p, log, keyPayload });
  recorder.state.modelSpec = modelSpec;
  log(`模型声明: ${modelSpec.width}×${modelSpec.height} @ ${modelSpec.fps}fps`);

  log("等待首帧...");
  await waitFirstFrame(outputVideo, 30000);
  recorder.markFirstFrame();
  recorder.state.outputResolution = { width: outputVideo.videoWidth, height: outputVideo.videoHeight };
  const frameMetrics = startFrameMetrics(outputVideo);
  log(`首帧已就绪 (+${Date.now() - startedAt}ms)，实测输出 ${outputVideo.videoWidth}×${outputVideo.videoHeight}`);

  await sleep(2000);
  recorder.addShot("initial-A", captureFrame(outputVideo));

  // 只有存在第二件服装时才测 A -> B；重复提交同一张图不具备比较价值。
  const doSwitch = async target => {
    log(`发起切换至 ${target}...`);
    const setStartedAt = performance.now();
    await makeSet({ recorder, p, target, hasGarmentB, log });
    const apiResolvedMs = Math.round(performance.now() - setStartedAt);
    recorder.recordSet({
      label: `to-${target}`,
      apiResolvedMs,
      observationWindowMs: 4000,
      note: "API 返回后每秒截帧；首次视觉生效时间需按证据帧确认"
    });
    log(`切换至 ${target} API 返回: ${apiResolvedMs}ms，开始 4 秒逐秒取证...`);
    recorder.addShot(`to-${target}-t0s`, captureFrame(outputVideo));
    for (let second = 1; second <= 4; second += 1) {
      await sleep(1000);
      recorder.addShot(`to-${target}-t${second}s`, captureFrame(outputVideo, { width: 480 }));
    }
  };
  if (hasGarmentB) {
    await doSwitch("B");
    await doSwitch("A");
  }

  // 稳定性观察直到时长上限
  const remain = hardStop - Date.now();
  if (remain > 0) { log(`稳定性观察中，剩余 ${Math.round(remain / 1000)}s...`); await sleep(remain); }
  recorder.addShot("final", captureFrame(outputVideo));
  recorder.state.frameMetrics = frameMetrics.stop();

  const payload = recorder.finish();
  payload.assets = { video: p.video, garment: p.garment, garmentB: hasGarmentB ? p.garmentB : null };
  await postResults(payload);
  log("结果已上报，测试完成");
  window.__BENCH_DONE__ = true;
  return payload;
}
