const config = window.HAT_DEMO_CONFIG;

const DESIGN_WIDTH = 2160;
const DESIGN_HEIGHT = 3840;

const state = {
  view: "home",
  selectedModuleId: config.modules[0]?.id,
};

const initialParams = new URLSearchParams(window.location.search);
if (initialParams.get("view")) {
  state.view = initialParams.get("view");
}
if (initialParams.get("module")) {
  state.selectedModuleId = initialParams.get("module");
}

const screenApp = document.querySelector("#screenApp");

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function selectedModule() {
  return config.modules.find((item) => item.id === state.selectedModuleId) || config.modules[0];
}

function render() {
  screenApp.innerHTML = `<main class="screen-shell"><section class="screen">${renderView()}</section></main>`;
  fitScreen();
  bindEvents();
}

function fitScreen() {
  const scale = Math.min(window.innerWidth / DESIGN_WIDTH, window.innerHeight / DESIGN_HEIGHT);
  document.documentElement.style.setProperty("--screen-scale", Math.max(scale, 0.1).toFixed(4));
}

function renderView() {
  if (state.view === "module") return renderModule();
  return renderHome();
}

function renderHome() {
  return `
    <section class="hat-page">
      <div class="hat-frame">
        ${renderHeader({ showHome: false, title: config.title, subtitle: config.subtitle })}
        <div class="module-grid">
          ${config.modules.map(renderModuleCard).join("")}
        </div>
        ${renderFooter("home")}
      </div>
    </section>`;
}

function renderModule() {
  const item = selectedModule();

  return `
    <section class="hat-page">
      <div class="hat-frame">
        ${renderHeader({
          showHome: true,
          title: item?.name || "模块",
          subtitle: item?.description || "预留页面",
        })}
        <section class="placeholder-panel">
          <div>
            <h2>内容框架预留</h2>
            <p>这里等待接入帽子 demo 的具体流程、数据结构和交互规则。</p>
          </div>
        </section>
        ${renderFooter(`module: ${item?.id || "empty"}`)}
      </div>
    </section>`;
}

function renderHeader({ showHome, title, subtitle }) {
  return `
    <header class="page-head">
      <div class="page-title">
        <h1>${escapeHtml(title)}</h1>
        <p>${escapeHtml(subtitle)}</p>
      </div>
      <nav class="nav-actions" aria-label="页面导航">
        ${showHome ? `<button class="icon-btn" data-view="home" aria-label="返回首页">${icon("home")}</button>` : ""}
      </nav>
    </header>`;
}

function renderModuleCard(item) {
  return `
    <button class="module-card" data-module="${escapeHtml(item.id)}">
      <h2>${escapeHtml(item.name)}</h2>
      <p>${escapeHtml(item.description)}</p>
    </button>`;
}

function renderFooter(label) {
  return `
    <footer class="page-foot">
      <span>2160 x 3840 竖屏静态框架</span>
      <span class="state-chip">${escapeHtml(label)}</span>
    </footer>`;
}

function bindEvents() {
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      state.view = button.dataset.view;
      render();
    });
  });

  document.querySelectorAll("[data-module]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedModuleId = button.dataset.module;
      state.view = "module";
      render();
    });
  });
}

function icon(name) {
  if (name === "home") {
    return `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 10.8 12 3l9 7.8" />
        <path d="M5.5 9.5V21h13V9.5" />
        <path d="M9.5 21v-6h5v6" />
      </svg>`;
  }

  return "";
}

window.addEventListener("resize", fitScreen);
render();
