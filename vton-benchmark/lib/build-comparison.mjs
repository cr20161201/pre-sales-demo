// 读取 xmax.json / decart.json，生成对比草稿 results/comparison.md
import fs from "node:fs";
import path from "node:path";

export async function buildComparison(resultsDir, { durationMs, reportDir = resultsDir }) {
  const read = name => {
    try { return JSON.parse(fs.readFileSync(path.join(resultsDir, name), "utf8")); } catch { return null; }
  };
  const x = read("xmax.json");
  const d = read("decart.json");
  const manifest = read("manifest.json");
  const review = read("visual-review.json");
  const lines = [];

  const runId = path.basename(resultsDir);
  const evidencePrefix = path.relative(reportDir, resultsDir) || ".";
  lines.push("# Xmax ClothX vs Decart Lucy VTON · 实测对比报告\n");
  lines.push(`> 生成时间：${new Date().toLocaleString("zh-CN")} · 每 provider 实时会话上限 ${Math.round(durationMs / 1000)}s（到点自动断开）\n`);
  lines.push(`> Run ID：${runId} · 本文件由测试脚本自动生成，主观评分需人工填写。\n`);

  lines.push("## 0. 本次测试条件\n");
  lines.push("| 项 | 值 |");
  lines.push("|---|---|");
  lines.push(`| 执行方式 | ${manifest?.mode || "-"} |`);
  lines.push(`| 输入视频 | ${manifest?.assets?.video || "-"} |`);
  lines.push(`| 服装 A / B | ${manifest?.assets?.garment || "-"} / ${manifest?.assets?.garmentB || "-"} |`);
  lines.push(`| SDK | Xmax ${manifest?.dependencies?.xmaxSdk || "-"} / Decart ${manifest?.dependencies?.decartSdk || "-"} |`);
  lines.push(`| 模型 | ${manifest?.dependencies?.xmaxModel || "x2.0"} / ${manifest?.dependencies?.decartModel || "lucy-vton-3"} |`);
  lines.push(`| 运行环境 | Node ${manifest?.runtime?.node || "-"} / ${manifest?.runtime?.platform || "-"} |`);
  lines.push("");

  lines.push("## 1. 模型与输出规格\n");
  lines.push("| 项 | Xmax ClothX | Decart Lucy VTON |");
  lines.push("|---|---|---|");
  lines.push(`| 模型 | ${x?.modelSpec?.name || "x2.0"} | ${d?.modelSpec?.name || "lucy-vton-3"} |`);
  lines.push(`| SDK 声明分辨率 | ${x?.modelSpec ? `${x.modelSpec.width}×${x.modelSpec.height}` : "-"} | ${d?.modelSpec ? `${d.modelSpec.width}×${d.modelSpec.height}` : "-"} |`);
  lines.push(`| SDK 声明 fps | ${x?.modelSpec?.fps ?? "-"} | ${d?.modelSpec?.fps ?? "-"} |`);
  lines.push(`| 实测输出分辨率 | ${x?.outputResolution ? `${x.outputResolution.width}×${x.outputResolution.height}` : "-"} | ${d?.outputResolution ? `${d.outputResolution.width}×${d.outputResolution.height}` : "-"} |`);
  lines.push("");

  lines.push("## 2. 连接与首帧（相对会话开始，毫秒）\n");
  lines.push("| 指标 | Xmax | Decart | 说明 |");
  lines.push("|---|---|---|---|");
  lines.push(`| 临时凭证获取 | ${x?.tTokenMs ? x.tTokenMs - x.startedAt : "-"} | ${d?.tTokenMs ? d.tTokenMs - d.startedAt : "-"} | 服务端签发临时密钥 |`);
  lines.push(`| 会话建立 | ${x?.tSessionReadyMs ? x.tSessionReadyMs - x.startedAt : "-"} | ${d?.tSessionReadyMs ? d.tSessionReadyMs - d.startedAt : "-"} | 含参考图上传 |`);
  lines.push(`| 首帧到达 | ${x?.tFirstFrameMs ? x.tFirstFrameMs - x.startedAt : "-"} | ${d?.tFirstFrameMs ? d.tFirstFrameMs - d.startedAt : "-"} | 两家均在连接时预置 A，首个有像素的视频帧即为 A 样本 |`);
  lines.push("");

  lines.push("## 3. A → B → A 切换记录\n");
  const seconds = ms => Number.isFinite(ms) ? `${(ms / 1000).toFixed(3)}s` : "-";
  const range = value => Array.isArray(value) ? `${seconds(value[0])}–${seconds(value[1])}` : "-";
  lines.push("| 事件 | Xmax | Decart | 口径 |");
  lines.push("|---|---|---|---|");
  lines.push(`| 初始 A | ${seconds(review?.initialA?.xmax?.totalMs)} | ${seconds(review?.initialA?.decart?.totalMs)} | 开始测试至首个带 A 的视频帧 |`);
  lines.push(`| 切换至 B | ${range(review?.toB?.xmax?.totalRangeMs)} | ${range(review?.toB?.decart?.totalRangeMs)} | 点击切换至首次明确出现 B；1 秒采样精度 |`);
  lines.push(`| 回切至 A | ${range(review?.toA?.xmax?.totalRangeMs)} | ${range(review?.toA?.decart?.totalRangeMs)} | 点击切换至首次明确恢复 A；1 秒采样精度 |`);
  lines.push("");
  lines.push("API 返回与视觉等待拆分：");
  lines.push("");
  lines.push("| 切换 | Xmax API / 返回后视觉等待 | Decart API / 返回后视觉等待 |");
  lines.push("|---|---|---|");
  lines.push(`| A → B | ${seconds(review?.toB?.xmax?.apiMs)} / ${range(review?.toB?.xmax?.visualAfterApiRangeMs)} | ${seconds(review?.toB?.decart?.apiMs)} / ${range(review?.toB?.decart?.visualAfterApiRangeMs)} |`);
  lines.push(`| B → A | ${seconds(review?.toA?.xmax?.apiMs)} / ${range(review?.toA?.xmax?.visualAfterApiRangeMs)} | ${seconds(review?.toA?.decart?.apiMs)} / ${range(review?.toA?.decart?.visualAfterApiRangeMs)} |`);
  lines.push("");

  lines.push("## 4. 稳定性与成本\n");
  lines.push("| 指标 | Xmax | Decart |");
  lines.push("|---|---|---|");
  lines.push(`| 断连次数 | ${x?.disconnects?.length ?? "-"} | ${d?.disconnects?.length ?? "-"} |`);
  lines.push(`| 错误数 | ${x?.errors?.length ?? "-"} | ${d?.errors?.length ?? "-"} |`);
  lines.push(`| 实际会话时长 | ${x?.elapsedMs ? Math.round(x.elapsedMs / 1000) + "s" : "-"} | ${d?.elapsedMs ? Math.round(d.elapsedMs / 1000) + "s" : "-"} |`);
  lines.push(`| 估算成本(USD) | ${x?.estimatedCostUsd?.usd ?? "-"} | ${d?.estimatedCostUsd?.usd ?? "-"} |`);
  lines.push(`| 成本口径 | ${x?.estimatedCostUsd?.note || "-"} | ${d?.estimatedCostUsd?.note || "-"} |`);
  lines.push(`| 平均渲染 FPS | ${x?.frameMetrics?.averageFps ?? "-"} | ${d?.frameMetrics?.averageFps ?? "-"} |`);
  lines.push(`| P90 帧间隔 | ${x?.frameMetrics?.p90FrameGapMs ?? "-"}ms | ${d?.frameMetrics?.p90FrameGapMs ?? "-"}ms |`);
  lines.push(`| 卡顿 >200ms / >500ms | ${x?.frameMetrics ? `${x.frameMetrics.stallsOver200ms} / ${x.frameMetrics.stallsOver500ms}` : "-"} | ${d?.frameMetrics ? `${d.frameMetrics.stallsOver200ms} / ${d.frameMetrics.stallsOver500ms}` : "-"} |`);
  if (x?.errors?.length) lines.push(`\nXmax 错误明细：${x.errors.map(e => e.message).join("；")}`);
  if (d?.errors?.length) lines.push(`\nDecart 错误明细：${d.errors.map(e => e.message).join("；")}`);
  if (review?.stabilityNotes?.decart) lines.push(`\n人工稳定性记录：${review.stabilityNotes.decart}`);
  lines.push("");

  lines.push("## 5. 截图（主观画质评分用）\n");
  lines.push("| 时间点 | Xmax | Decart |");
  lines.push("|---|---|---|");
  const labels = [...new Set([...(x?.shots || []).map(s => s.label), ...(d?.shots || []).map(s => s.label)])];
  for (const label of labels) {
    const xs = x?.shots?.find(s => s.label === label);
    const ds = d?.shots?.find(s => s.label === label);
    lines.push(`| ${label} | ${xs?.path ? `![${label}](${evidencePrefix}/${xs.path})` : "-"} | ${ds?.path ? `![${label}](${evidencePrefix}/${ds.path})` : "-"} |`);
  }
  lines.push("");

  let nextSection = 6;
  try {
    const meta = JSON.parse(fs.readFileSync(path.join(resultsDir, "batch", "meta.json"), "utf8"));
    lines.push(`## ${nextSection}. 批量 API（异步任务）\n`);
    lines.push("| 指标 | Xmax offline-task (hd) | Decart lucy-vton-3.5 (720p) |");
    lines.push("|---|---|---|");
    lines.push(`| 提交→完成耗时 | ${meta.jobs.xmax?.latencyMs ? Math.round(meta.jobs.xmax.latencyMs / 1000) + "s" : "-"} | ${meta.jobs.decart?.latencyMs ? Math.round(meta.jobs.decart.latencyMs / 1000) + "s" : "-"} |`);
    lines.push(`| 扣费积分 | ${meta.jobs.xmax?.chargePoints ?? "-"} | - |`);
    lines.push(`| 输出文件 | ${meta.jobs.xmax?.outputFile ? `batch/${meta.jobs.xmax.outputFile}` : "-"} | ${meta.jobs.decart?.outputFile ? `batch/${meta.jobs.decart.outputFile}` : "-"} |`);
    if (meta.jobs.xmax?.error) lines.push(`\nXmax 批量错误：${meta.jobs.xmax.error}`);
    if (meta.jobs.decart?.error) lines.push(`\nDecart 批量错误：${meta.jobs.decart.error}`);
    lines.push("");
    nextSection += 1;
  } catch {}

  lines.push(`## ${nextSection}. 人工视觉评分\n`);
  lines.push("| 维度 | Xmax（1-5） | Decart（1-5） | 观察记录 |");
  lines.push("|---|---:|---:|---|");
  for (const item of ["服装还原度", "人体与服装贴合", "动作与遮挡", "身份和身材稳定性", "安全风险", "整体可用性"]) {
    lines.push(`| ${item} |  |  |  |`);
  }
  lines.push("");

  lines.push(`## ${nextSection + 1}. 方法说明与待核实点\n`);
  lines.push("- **首帧语义不对称**：Xmax 通过 context 在连接时预置试穿，首帧即含试穿效果；Decart 连接后需 set() 触发首次试穿（initial-tryon 行）。如需对比“连接+首次试穿”总耗时，用 Xmax 首帧 vs Decart 首帧+initial-tryon。");
  lines.push("- **换装生效耗时** = set 调用 → 输出流“停顿后恢复出帧”（requestVideoFrameCallback 帧间隔检测，停顿阈值 600ms）；3s 内无停顿记为“无缝衔接”。");
  lines.push("- **成本为媒体口径估算**（Xmax $6/h；Decart $0.02/s），未与账单核对。");
  lines.push("- Decart 实时输出规格文档未公开，以 SDK model 对象 + 输出视频实际尺寸为准。");
  lines.push("- 测试输入：转码后的同一段 VP9 720p 视频 + 同一张服装图（两家共用，保证可比性）。");
  lines.push("- 截图是各 Provider 试穿稳定后的样本帧，不保证输入时间码逐帧对齐；适合观察总体还原与稳定性，不应据此比较同一动作瞬间的细节。");
  lines.push("- 主观画质（清晰度/动作跟随/光影/服装还原度）需人工对照第 5 节截图评分，脚本不评判。");

  fs.mkdirSync(reportDir, { recursive: true });
  const outFile = path.join(reportDir, "comparison.md");
  fs.writeFileSync(outFile, lines.join("\n"), "utf8");
  return outFile;
}
