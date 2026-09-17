# Xmax 实时试衣 API 测试 Demo

面向 55 寸竖屏（设计画布 `1215 × 2160`）的真实接口测试页。流程为：启动检查 → 打开摄像头 → 上传款式参考图 → 连接 Xmax `x2.0` → 实时切换款式。

本 Demo 使用 Xmax 官方定义的 `ClothX` 服装上身工作流。实时模型仍为 `x2.0`，提示词以官方推荐值 `视频中人物衣服替换成参考图中衣服` 为基础，并追加外套必须搭配完整、不透视内搭的安全约束，避免出现裸穿外套或胸腹裸露。

## 1. 配置 API Key

首次双击 `start.command` 会自动创建 `.env`。也可以手动复制：

```bash
cp .env.example .env
```

编辑项目根目录的 `.env`：

```text
XMAX_API_KEY=uk_xxx
```

这里只填写 Xmax 永久 Key（`uk-...` 或平台实际签发格式）。永久 Key 只由本地 Node 服务读取，浏览器只拿短时临时 Key。不要把 Key 发到聊天中，也不要提交 `.env`。

## 2. 添加款式

把 `.jpg`、`.jpeg`、`.png` 或 `.webp` 图片放入：

```text
public/assets/garments/
```

文件名默认作为页面上的款式名称。需要改名称时编辑同目录的 `garments.json`，格式见该目录的 `README.md`。

## 3. 本机打开

双击：

```text
start.command
```

或在终端运行：

```bash
./start.command
```

浏览器地址为 `http://localhost:4300`。这是“本地 HTML 双击启动”的实现方式：双击脚本会启动必要的本地服务并打开页面。由于永久 Key 不能放进 HTML，直接双击 `index.html` 的 `file://` 模式不支持真实 API，也无法可靠使用摄像头。

## 4. 内网设备打开

摄像头在非 `localhost` 地址下要求可信 HTTPS。首次执行：

```bash
./setup-lan-cert.command
```

按脚本提示安装并信任 `mkcert` 根证书后，启动：

```bash
./start-lan.command
```

终端会输出 `https://内网IP:4300`。触控屏必须与电脑处于同一局域网，并信任同一个本地根证书。若客户环境无法安装根证书，应改用正式域名和受信任证书。

## 真实测试边界

- 不做 Mock：无 Key、无款式、无摄像头权限或接口失败时均显示真实状态。
- 本地款式会先由 SDK 的 `uploadAndCheckImage()` 上传，再传给实时会话。
- 切换款式使用同一会话的 `session.set()`，结束时调用 `session.disconnect()`。
- 真实调用会消耗 Xmax 账户积分，默认每个临时 Key 限额由 `.env` 中的 `XMAX_KEY_POINTS_LIMIT` 控制。
- 当前 `@xmaxai/sdk@1.1.6` 的传递依赖存在 npm 安全告警且上游暂无修复；本 Demo 不处理 XML 输入，仍建议后续跟随官方 SDK 升级并重新审计。

## 常用命令

```bash
npm test
npm run build
npm run dev
npm run lan
```
