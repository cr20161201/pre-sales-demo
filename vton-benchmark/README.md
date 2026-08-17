# vton-benchmark

Xmax ClothX (X2.0) vs Decart Lucy VTON 双 provider 实时试穿实测基准。

## 快速开始

```bash
# 1. 准备素材（业务素材最真实）
#    assets/test-clip.mp4   人物测试视频（mp4）
#    assets/garment.jpg     款式 A
#    assets/garment-b.png   款式 B（用于 A → B → A 切换）

# 2. 配置密钥（主 Key 只在本机 .env，浏览器端只拿临时凭证）
cp .env.example .env   # 填入 XMAX_API_KEY 和 DECART_API_KEY

# 3. 安装依赖
npm install

# 4. 标准对比（无头 Chrome 依次跑两家，每家默认 180s 上限）
npm run benchmark          # 仅实时
npm run benchmark:batch    # 实时 + 批量 API 对比
```

## 输出

| 文件 | 说明 |
|---|---|
| `reports/<run-id>/comparison.md` | 独立可读报告与人工评分表 |
| `runs/<run-id>/manifest.json` | 本次环境、输入和执行方式 |
| `runs/<run-id>/{xmax,decart}.json` | 原始指标数据 |
| `runs/<run-id>/shots/*.jpg` | 关键帧截图（主观画质评分用） |
| `runs/<run-id>/batch/` | 可选批量 API 对比结果 |

每次执行都会生成新的 `run-id`，不会覆盖历史测试。可通过 `RUN_ID=my-test npm run benchmark` 指定便于识别的编号。

## 手动模式（想看画面）

```bash
npm run transcode   # 先生成 headless 可解码的 VP9 视频
npm run server      # 启动本地服务
# 浏览器打开 http://localhost:4400
```

## 指标口径（写报告前必读）

- **首帧**：连接建立 → 输出视频渲染出第一帧。⚠️ 两家语义不同：Xmax 在连接 context 里预置试穿，首帧即含试穿；Decart 连接后需 set() 触发首次试穿（记录为 `initial-tryon`）。
- **换装生效耗时**：set 调用 → 输出流"停顿后恢复出帧"（requestVideoFrameCallback 帧间隔检测，停顿阈值 600ms）；3s 内无停顿记为"无缝衔接"。这是传输/再生恢复时间，**主观画质需人工对照截图评分**。
- **成本**：媒体口径估算（Xmax $6/h；Decart $0.02/s），未与账单核对。

## 预算护栏

- Xmax：临时 Key 积分上限 `XMAX_KEY_POINTS_LIMIT`（默认 500 积分）
- Decart：每轮会话时长 `TEST_DURATION_MS`（默认 180s ≈ $3.6/轮），到点自动断开
- 全局：runner 每页超时 = 时长 + 150s，卡死自动报错
