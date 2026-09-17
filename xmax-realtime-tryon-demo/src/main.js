import { createXmaxClient, models } from "@xmaxai/sdk";
import "./styles.css";

const app = document.querySelector("#app");
const DESIGN_WIDTH = 1215;
const DESIGN_HEIGHT = 2160;
const state = {
  screen: "entry",
  health: null,
  garments: [],
  config: null,
  selectedId: null,
  session: null,
  client: null,
  uploadedUrls: new Map(),
  connection: "idle",
  detail: "等待开始",
  error: "",
  diagnostics: [],
  startedAt: 0,
  busy: false
};

function fitCanvas() {
  const viewport = window.visualViewport;
  const width = viewport?.width || window.innerWidth;
  const height = viewport?.height || window.innerHeight;
  const scale = Math.min(width / DESIGN_WIDTH, height / DESIGN_HEIGHT);
  document.documentElement.style.setProperty("--canvas-scale", String(scale));
  document.documentElement.style.setProperty("--canvas-left", `${Math.max(0, (width - DESIGN_WIDTH * scale) / 2)}px`);
  document.documentElement.style.setProperty("--canvas-top", `${Math.max(0, (height - DESIGN_HEIGHT * scale) / 2)}px`);
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>'"]/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[character]);
}

function setDiagnostic(message) {
  state.diagnostics.unshift({ time: new Date().toLocaleTimeString("zh-CN", { hour12: false }), message });
  state.diagnostics = state.diagnostics.slice(0, 8);
  updateDiagnostics();
}

function statusLabel() {
  return {
    idle: "等待开始",
    preparing: "正在准备",
    uploading: "正在上传款式",
    connecting: "正在连接",
    active: "实时试衣中",
    switching: "正在切换款式",
    disconnected: "连接已断开",
    error: "连接失败"
  }[state.connection] || state.connection;
}

function checkRow(label, ok, detail) {
  return `<div class="check-row"><i class="check-mark ${ok ? "ok" : ""}">${ok ? "✓" : "!"}</i><span><strong>${escapeHtml(label)}</strong><small>${escapeHtml(detail)}</small></span></div>`;
}

function entryView() {
  const ready = state.health?.apiKeyConfigured && state.garments.length > 0 && window.isSecureContext;
  return `<section class="screen entry-screen">
    <header class="brand-bar"><div class="brand"><strong>SUMEC</strong><span>实时试衣接口测试</span></div><span class="environment">XMAX X2.0 · 真实 API</span></header>
    <div class="entry-content">
      <div class="entry-copy"><p class="eyebrow">REALTIME TRY-ON</p><h1>开始实时试衣</h1><p>连接摄像头与 Xmax 实时模型，验证服装参考图在 55 寸竖屏设备上的生成效果。</p></div>
      <section class="preflight-panel">
        <div class="preflight-head"><div><span>启动检查</span><strong>${ready ? "可以开始" : "等待配置"}</strong></div><i class="status-dot ${ready ? "ready" : ""}"></i></div>
        <div class="check-list">
          ${checkRow("API 密钥", state.health?.apiKeyConfigured, state.health?.apiKeyConfigured ? "已在服务端配置" : "请填写 .env")}
          ${checkRow("款式素材", state.garments.length > 0, state.garments.length ? `已发现 ${state.garments.length} 个款式` : "请添加款式图片")}
          ${checkRow("安全环境", window.isSecureContext, window.isSecureContext ? "摄像头权限可用" : "请通过 localhost 或可信 HTTPS 打开")}
        </div>
        ${state.error ? `<p class="error-message">${escapeHtml(state.error)}</p>` : ""}
        <button class="primary-action" data-start ${ready ? "" : "disabled"}>打开实时试衣</button>
        <button class="text-action" data-refresh>重新检查</button>
      </section>
    </div>
    <footer class="entry-footer"><span>1215 × 2160 竖屏</span><span>摄像头画面仅用于本次实时接口测试</span></footer>
  </section>`;
}

function garmentCards() {
  return state.garments.map(garment => `<button class="garment-card ${garment.id === state.selectedId ? "active" : ""}" data-garment="${escapeHtml(garment.id)}">
    <img src="${escapeHtml(garment.image)}" alt="${escapeHtml(garment.name)}">
    <span><strong>${escapeHtml(garment.name)}</strong><small>${garment.id === state.selectedId ? "当前试穿" : "点击切换"}</small></span>
  </button>`).join("");
}

function realtimeView() {
  return `<section class="screen realtime-screen">
    <header class="realtime-header"><div class="brand"><strong>SUMEC</strong><span>实时试衣</span></div><div class="connection-chip ${state.connection}"><i></i><span>${statusLabel()}</span></div><button class="exit-button" data-exit>结束体验</button></header>
    <div class="realtime-stage">
      <div id="remote-video" class="remote-video"><div class="stage-placeholder"><span class="stage-loader"></span><strong>${statusLabel()}</strong><small>${escapeHtml(state.detail)}</small></div></div>
      <div id="local-video" class="local-video"><span>本地画面</span></div>
      <div class="stage-error" hidden><strong>实时连接未完成</strong><span data-error-message></span><button data-retry>重新连接</button></div>
      <button class="diagnostic-toggle" data-diagnostics>接口状态</button>
      <aside class="diagnostic-panel" hidden><div><strong>接口诊断</strong><button aria-label="关闭接口诊断" data-diagnostics-close>×</button></div><dl><dt>状态</dt><dd data-diagnostic-status>-</dd><dt>当前款式</dt><dd data-diagnostic-garment>-</dd><dt>运行时间</dt><dd data-diagnostic-time>-</dd></dl><ol data-diagnostic-list><li>暂无日志</li></ol></aside>
    </div>
    <section class="garment-console"><div class="console-heading"><div><p class="eyebrow">GARMENT LIBRARY</p><h2>选择试穿款式</h2></div><span>${state.garments.length} 款</span></div><div class="garment-rail">${garmentCards()}</div></section>
  </section>`;
}

function render() {
  app.innerHTML = state.screen === "entry" ? entryView() : realtimeView();
  bind();
  if (state.screen === "realtime") updateRuntimeUi();
}

async function loadPreflight() {
  state.error = "";
  try {
    const [healthResponse, garmentsResponse, configResponse] = await Promise.all([fetch("/api/health"), fetch("/api/garments"), fetch("/api/config")]);
    if (!healthResponse.ok || !garmentsResponse.ok || !configResponse.ok) throw new Error("本地服务返回异常");
    state.health = await healthResponse.json();
    const garmentsPayload = await garmentsResponse.json();
    state.config = await configResponse.json();
    state.garments = garmentsPayload.garments || [];
    state.selectedId ||= state.garments[0]?.id || null;
    if (state.health.assetError) state.error = state.health.assetError;
  } catch (error) {
    state.error = `无法连接本地服务：${error.message}`;
  }
  render();
}

async function fetchGarmentFile(garment) {
  const response = await fetch(garment.image);
  if (!response.ok) throw new Error(`无法读取款式图片：${garment.name}`);
  const blob = await response.blob();
  return new File([blob], garment.file, { type: blob.type || "image/jpeg" });
}

async function getReferenceUrl(garment) {
  if (state.uploadedUrls.has(garment.id)) return state.uploadedUrls.get(garment.id);
  setConnection("uploading", `正在上传 ${garment.name}`);
  setDiagnostic(`上传参考图：${garment.name}`);
  const file = await fetchGarmentFile(garment);
  const url = await state.client.files.uploadAndCheckImage(file);
  state.uploadedUrls.set(garment.id, url);
  setDiagnostic(`参考图上传完成：${garment.name}`);
  return url;
}

function setConnection(connection, detail) {
  state.connection = connection;
  state.detail = detail;
  updateRuntimeUi();
}

async function connectSession() {
  const garment = state.garments.find(item => item.id === state.selectedId);
  if (!garment || state.busy) return;
  state.busy = true;
  state.error = "";
  setConnection("preparing", "正在申请临时凭证");
  try {
    const keyResponse = await fetch("/api/xmax/realtime-key", { method: "POST" });
    const keyPayload = await keyResponse.json();
    if (!keyResponse.ok) throw new Error(keyPayload.message || "临时密钥获取失败");
    state.client = createXmaxClient({
      apiKey: keyPayload.temporaryApiKey,
      onError: (message, error) => setDiagnostic(`${message}${error?.message ? `：${error.message}` : ""}`)
    });
    const referenceUrl = await getReferenceUrl(garment);
    setConnection("connecting", "正在连接摄像头与实时模型");
    const localContainer = document.querySelector("#local-video");
    const remoteContainer = document.querySelector("#remote-video");
    state.session = await state.client.realtime.connectCamera({
      model: models.realtime(state.config.model || "x2.0"),
      facingMode: "user",
      stream: { width: 1472, height: 832, fps: 24 },
      context: { prompt: garment.prompt || state.config.prompt, refImageUrl: referenceUrl },
      render: { localContainer, remoteContainer, mirror: true, fit: "cover" },
      audio: { publish: false, subscribe: false },
      log: { rtc: true },
      autoStart: true,
      onRemoteStream: () => setDiagnostic("远程生成流已连接"),
      onRemoteVideoFirstFrame: () => {
        state.startedAt ||= Date.now();
        setConnection("active", "实时生成画面已连接");
        setDiagnostic("远程生成首帧已就绪");
      },
      onStateChange: value => setDiagnostic(`会话状态：${String(value)}`),
      onDisconnect: reason => {
        if (state.connection !== "idle") setConnection("disconnected", String(reason || "会话已结束"));
        setDiagnostic(`连接断开：${String(reason || "会话已结束")}`);
      },
      onError: (message, error) => handleRuntimeError(`${message}${error?.message ? `：${error.message}` : ""}`)
    });
    state.startedAt ||= Date.now();
    setDiagnostic("实时会话已创建");
  } catch (error) {
    handleRuntimeError(error.message);
  } finally {
    state.busy = false;
    updateRuntimeUi();
  }
}

async function startSession() {
  state.screen = "realtime";
  state.connection = "preparing";
  state.detail = "正在准备实时试衣";
  state.error = "";
  render();
  await connectSession();
}

function updateRuntimeUi() {
  if (state.screen !== "realtime") return;
  const chip = document.querySelector(".connection-chip");
  if (chip) {
    chip.className = `connection-chip ${state.connection}`;
    chip.querySelector("span").textContent = statusLabel();
  }
  const placeholder = document.querySelector(".stage-placeholder");
  if (placeholder) {
    placeholder.hidden = state.connection === "active";
    placeholder.querySelector("strong").textContent = statusLabel();
    placeholder.querySelector("small").textContent = state.detail;
  }
  const errorPanel = document.querySelector(".stage-error");
  if (errorPanel) {
    errorPanel.hidden = !state.error;
    errorPanel.querySelector("[data-error-message]").textContent = state.error;
  }
  document.querySelectorAll("[data-garment]").forEach(button => {
    const selected = button.dataset.garment === state.selectedId;
    button.classList.toggle("active", selected);
    button.disabled = state.busy || ["uploading", "switching", "connecting", "preparing"].includes(state.connection);
    button.querySelector("small").textContent = selected ? "当前试穿" : "点击切换";
  });
  updateDiagnostics();
}

function updateDiagnostics() {
  const selected = state.garments.find(item => item.id === state.selectedId);
  const status = document.querySelector("[data-diagnostic-status]");
  const garment = document.querySelector("[data-diagnostic-garment]");
  const runtime = document.querySelector("[data-diagnostic-time]");
  const list = document.querySelector("[data-diagnostic-list]");
  if (status) status.textContent = statusLabel();
  if (garment) garment.textContent = selected?.name || "未选择";
  if (runtime) runtime.textContent = state.startedAt ? `${Math.floor((Date.now() - state.startedAt) / 1000)} 秒` : "-";
  if (list) list.innerHTML = state.diagnostics.map(item => `<li><time>${item.time}</time>${escapeHtml(item.message)}</li>`).join("") || "<li>暂无日志</li>";
}

function handleRuntimeError(message) {
  state.error = message || "未知错误";
  setConnection("error", "请检查摄像头、网络、密钥和账户余额");
  setDiagnostic(`错误：${state.error}`);
}

async function switchGarment(id) {
  if (id === state.selectedId || !state.session || state.busy) return;
  const garment = state.garments.find(item => item.id === id);
  if (!garment) return;
  state.busy = true;
  try {
    setConnection("switching", `正在切换至 ${garment.name}`);
    const referenceUrl = await getReferenceUrl(garment);
    await state.session.set({ prompt: garment.prompt || state.config.prompt, refImageUrl: referenceUrl });
    state.selectedId = id;
    setConnection("active", "款式已切换");
    setDiagnostic(`切换款式：${garment.name}`);
  } catch (error) {
    handleRuntimeError(`款式切换失败：${error.message}`);
  } finally {
    state.busy = false;
    updateRuntimeUi();
  }
}

async function disconnectSession() {
  const session = state.session;
  state.session = null;
  try { await session?.disconnect(); }
  catch (error) { setDiagnostic(`断开异常：${error.message}`); }
}

async function retrySession() {
  if (state.busy) return;
  await disconnectSession();
  state.client = null;
  state.startedAt = 0;
  state.error = "";
  await connectSession();
}

async function endSession() {
  await disconnectSession();
  Object.assign(state, { client: null, screen: "entry", connection: "idle", detail: "等待开始", error: "", startedAt: 0, busy: false });
  await loadPreflight();
}

function bind() {
  document.querySelector("[data-start]")?.addEventListener("click", startSession);
  document.querySelector("[data-refresh]")?.addEventListener("click", loadPreflight);
  document.querySelector("[data-exit]")?.addEventListener("click", endSession);
  document.querySelector("[data-retry]")?.addEventListener("click", retrySession);
  document.querySelectorAll("[data-garment]").forEach(button => button.addEventListener("click", () => switchGarment(button.dataset.garment)));
  document.querySelector("[data-diagnostics]")?.addEventListener("click", () => document.querySelector(".diagnostic-panel")?.removeAttribute("hidden"));
  document.querySelector("[data-diagnostics-close]")?.addEventListener("click", () => document.querySelector(".diagnostic-panel")?.setAttribute("hidden", ""));
}

window.addEventListener("beforeunload", () => { state.session?.disconnect(); });
window.addEventListener("resize", fitCanvas);
window.visualViewport?.addEventListener("resize", fitCanvas);
setInterval(updateDiagnostics, 1000);
fitCanvas();
loadPreflight();
