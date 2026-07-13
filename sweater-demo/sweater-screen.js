const config = window.SWEATER_DEMO_CONFIG;

const TRYON_PAGE_SIZE = 6;
const DIY_STYLE_PAGE_SIZE = 6;
const DIY_KNIT_PAGE_SIZE = 6;
const ELEMENT_PAGE_SIZE = 12;
const DESIGN_WIDTH = 2160;
const DESIGN_HEIGHT = 3840;

const state = {
  view: "home",
  selectedProductId: config.products[0]?.id,
  selectedTryOnItemId: config.products[0]?.id,
  tryOnSource: "home",
  tryOnPage: 0,
  diy: {
    step: "style",
    styleId: config.diy.styles[0]?.id,
    stylePage: 0,
    knitId: config.diy.knits[0]?.id,
    knitPage: 0,
    resultId: config.diy.aiResults[0]?.id,
    editMode: "color",
    colorMode: config.diy.colorModes[0]?.id,
    manualColor: "#8ca2b8",
    elementCategoryId: config.diy.elementCategories[0]?.id,
    elementPage: 0,
    elementId: config.diy.elementCategories[0]?.items[0]?.id,
    localChangeId: config.diy.localChanges[0]?.id,
    localOption: config.diy.localChanges[0]?.options[0],
    localPreviewReady: false,
    localPreviewOpen: false,
    toolCollapsed: false,
    fileGenerateStatus: "idle",
  },
  finder: {
    step: 1,
    season: config.finder.seasons[0],
    gender: config.finder.genders[0],
    category: config.finder.categories[0],
    occasion: config.finder.occasions[0],
    style: config.finder.styles[0],
    color: config.finder.colors[0],
    recommendationIndex: 0,
  },
};

const initialParams = new URLSearchParams(window.location.search);
if (["home", "diy", "finder", "tryon"].includes(initialParams.get("view"))) {
  state.view = initialParams.get("view");
}
if (initialParams.get("product")) {
  state.selectedProductId = initialParams.get("product");
  state.selectedTryOnItemId = initialParams.get("product");
}
if (["style", "knit", "results", "edit"].includes(initialParams.get("diyStep"))) {
  state.diy.step = initialParams.get("diyStep");
}
if (["smart", "manual"].includes(initialParams.get("colorMode"))) {
  state.diy.colorMode = initialParams.get("colorMode");
}
if (initialParams.get("toolCollapsed") === "1") {
  state.diy.toolCollapsed = true;
}
if (["diy", "finder", "home"].includes(initialParams.get("tryOnSource"))) {
  state.tryOnSource = initialParams.get("tryOnSource");
}

const screenApp = document.querySelector("#screenApp");

function selectedProduct() {
  return config.products.find((item) => item.id === state.selectedProductId) || config.products[0];
}

function productById(id) {
  return config.products.find((item) => item.id === id) || config.products[0];
}

function bottomById(id) {
  return config.bottoms.find((item) => item.id === id);
}

function selectedDiyResult() {
  return config.diy.aiResults.find((item) => item.id === state.diy.resultId) || config.diy.aiResults[0];
}

function selectedElementCategory() {
  return config.diy.elementCategories.find((item) => item.id === state.diy.elementCategoryId) || config.diy.elementCategories[0];
}

function selectedLocalChange() {
  return config.diy.localChanges.find((item) => item.id === state.diy.localChangeId) || config.diy.localChanges[0];
}

function selectedDiyStyle() {
  return config.diy.styles.find((item) => item.id === state.diy.styleId) || config.diy.styles[0];
}

function storeForProduct() {
  return config.store;
}

function recommendedProducts() {
  const ids = new Set(config.finder.recommendations.map((item) => item.productId));
  const primaryProducts = config.products.filter((item) => ids.has(item.id));
  const remainingProducts = config.products.filter((item) => !ids.has(item.id));
  const productImageUrls = new Set(config.products.map((item) => item.imageUrl));
  const styleSupplements = config.diy.styles
    .filter((item) => !productImageUrls.has(item.imageUrl))
    .map((item) => ({
      id: `finder-${item.id}`,
      name: item.name,
      shortName: item.name,
      subtitle: "AI补充推荐款",
      category: item.tags?.[0] || "上装",
      colors: ["AI推荐"],
      color: "AI推荐",
      material: "针织 / 工艺款",
      scene: "智能穿搭推荐",
      imageUrl: item.imageUrl,
      tryOnMediaUrl: item.imageUrl,
      tryOnMediaType: "image",
      posterUrl: item.imageUrl,
      qrCodeUrl: config.store.qrCodeUrl,
      tags: item.tags || [],
    }));
  const products = [...primaryProducts, ...remainingProducts, ...styleSupplements];
  return products.length > 0 ? products : config.products;
}

function diyTryOnItems() {
  return config.diy.aiResults.map((item) => ({
    ...item,
    shortName: item.name,
    subtitle: "DIY生成款式",
    category: "AI设计结果",
    colors: ["AI生成"],
    color: "AI生成",
    material: "基于当前款式与织片生成",
    scene: "DIY柔性定制",
    tryOnMediaType: "image",
    tryOnMediaUrl: item.imageUrl,
    posterUrl: item.imageUrl,
    qrCodeUrl: config.store.qrCodeUrl,
  }));
}

function tryOnItemsForSource() {
  if (state.tryOnSource === "diy") return diyTryOnItems();
  if (state.tryOnSource === "finder") return recommendedProducts();
  return config.products;
}

function selectedTryOnItem() {
  const items = tryOnItemsForSource();
  return items.find((item) => item.id === state.selectedTryOnItemId)
    || items.find((item) => item.id === state.selectedProductId)
    || items[0];
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function clampTryOnPage() {
  const totalPages = Math.max(1, Math.ceil(tryOnItemsForSource().length / TRYON_PAGE_SIZE));
  state.tryOnPage = Math.min(Math.max(state.tryOnPage, 0), totalPages - 1);
}

function clampDiyPages() {
  const stylePages = Math.max(1, Math.ceil(config.diy.styles.length / DIY_STYLE_PAGE_SIZE));
  const knitPages = Math.max(1, Math.ceil(config.diy.knits.length / DIY_KNIT_PAGE_SIZE));
  const elementPages = Math.max(1, Math.ceil((selectedElementCategory()?.items.length || 0) / ELEMENT_PAGE_SIZE));
  state.diy.stylePage = Math.min(Math.max(state.diy.stylePage, 0), stylePages - 1);
  state.diy.knitPage = Math.min(Math.max(state.diy.knitPage, 0), knitPages - 1);
  state.diy.elementPage = Math.min(Math.max(state.diy.elementPage, 0), elementPages - 1);
}

function render() {
  clampTryOnPage();
  clampDiyPages();
  screenApp.innerHTML = `<main class="screen-shell"><section class="screen">${renderView()}</section></main>`;
  fitScreen();
  bindEvents();
}

function fitScreen() {
  const scale = Math.min(window.innerWidth / DESIGN_WIDTH, window.innerHeight / DESIGN_HEIGHT);
  document.documentElement.style.setProperty("--screen-scale", Math.max(scale, 0.1).toFixed(4));
}

window.addEventListener("resize", fitScreen);

function renderView() {
  if (state.view === "diy") return renderDiy();
  if (state.view === "finder") return renderFinder();
  if (state.view === "tryon") return renderTryOn();
  return renderHome();
}

function renderHome() {
  const hero = productById(config.products[0]?.id);

  return `
    <section class="home">
      <img class="home-hero-media" src="${escapeHtml(config.homeHeroMediaUrl || hero.posterUrl || hero.tryOnMediaUrl || hero.imageUrl)}" alt="AI 推荐找款试衣" />
      <div class="home-shade"></div>

      <header class="home-hero-copy">
        <div>
          <h1></h1>
          <p></p>
        </div>
      </header>

      <nav class="home-actions" aria-label="功能入口">
        <button class="home-action primary-entry" data-view="diy">
          <span>DIY柔性定制</span>
          <strong>从款式、织片到颜色图案，生成专属款式</strong>
        </button>
        <button class="home-action" data-view="finder">
          <span>智能穿搭推荐</span>
          <strong>按季节、场景和风格推荐搭配</strong>
        </button>
      </nav>
    </section>`;
}

function renderIconNav({ showBack = true, title = "", subtitle = "" } = {}) {
  return `
    <header class="icon-page-head">
      <div class="icon-nav">
        <button class="icon-btn" data-view="home" aria-label="返回首页">${icon("home")}</button>
        ${showBack ? `<button class="icon-btn" data-back aria-label="返回上一步">${icon("back")}</button>` : ""}
      </div>
      <div>
        <h1>${escapeHtml(title)}</h1>
        <p>${escapeHtml(subtitle)}</p>
      </div>
    </header>`;
}

function icon(name) {
  if (name === "home") {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10.8 12 3l9 7.8v9.7a.5.5 0 0 1-.5.5H15v-6h-6v6H3.5a.5.5 0 0 1-.5-.5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`;
  }
  if (name === "next") {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }
  if (name === "check") {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4.5 4.5L19 7" fill="none" stroke="currentColor" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

function renderDiy() {
  if (state.diy.step === "knit") return renderDiyKnit();
  if (state.diy.step === "results") return renderDiyResults();
  if (state.diy.step === "edit") return renderDiyEditor();
  return renderDiyStyle();
}

function renderDiyShell(title, subtitle, body, showBack = true, className = "") {
  const pageClass = className ? ` ${className}` : "";
  return `
    <section class="diy page glass-page${pageClass}">
      ${renderIconNav({ showBack, title, subtitle })}
      ${body}
    </section>`;
}

function renderDiyStyle() {
  const totalPages = Math.max(1, Math.ceil(config.diy.styles.length / DIY_STYLE_PAGE_SIZE));
  const start = state.diy.stylePage * DIY_STYLE_PAGE_SIZE;
  const pageStyles = config.diy.styles.slice(start, start + DIY_STYLE_PAGE_SIZE);

  return renderDiyShell(
    "选择版型",
    "先选择基础款式，再匹配织片生成专属款",
    `
      <section class="selection-board paged-selection-board">
        ${pageStyles.map((item) => imageChoice(item, "diy-style", state.diy.styleId)).join("")}
      </section>
      <footer class="flow-actions">
        ${renderInlinePager("style", state.diy.stylePage, totalPages)}
        <button class="primary-action glass-primary" data-diy-next="knit">下一步：选择织片</button>
      </footer>`,
  );
}

function renderDiyKnit() {
  const totalPages = Math.max(1, Math.ceil(config.diy.knits.length / DIY_KNIT_PAGE_SIZE));
  const start = state.diy.knitPage * DIY_KNIT_PAGE_SIZE;
  const pageKnits = config.diy.knits.slice(start, start + DIY_KNIT_PAGE_SIZE);

  return renderDiyShell(
    "选择织片",
    "选择纹理、织法和工艺素材",
    `
      <section class="selection-board paged-selection-board knit-selection-board">
        ${pageKnits.map((item) => imageChoice(item, "knit", state.diy.knitId)).join("")}
      </section>
      <footer class="flow-actions">
        ${renderInlinePager("knit", state.diy.knitPage, totalPages)}
        <button class="primary-action glass-primary" data-diy-next="results">生成设计效果</button>
      </footer>`,
  );
}

function renderInlinePager(type, page, totalPages) {
  if (totalPages <= 1) return "";
  return `
    <div class="inline-pager" aria-label="分页">
      <button class="pager-btn" data-diy-page="${type}" data-page-dir="-1" aria-label="上一页" ${page <= 0 ? "disabled" : ""}>${icon("back")}</button>
      <span>${page + 1} / ${totalPages}</span>
      <button class="pager-btn" data-diy-page="${type}" data-page-dir="1" aria-label="下一页" ${page >= totalPages - 1 ? "disabled" : ""}>${icon("next")}</button>
    </div>`;
}

function renderDiyResults() {
  return renderDiyShell(
    "设计结果",
    "从 4 张结果中选择方案",
    `
      <div class="ai-result-stage">
        <section class="ai-result-grid">
          ${config.diy.aiResults.map((item) => `
            <button class="ai-result-card ${item.id === state.diy.resultId ? "active" : ""}" data-diy-result="${escapeHtml(item.id)}">
              <img src="${escapeHtml(item.imageUrl)}" alt="${escapeHtml(item.name)}" />
            </button>`).join("")}
        </section>
        <footer class="flow-actions ai-result-actions">
          <button class="primary-action glass-primary result-primary-action" data-diy-next="edit">继续设计</button>
          <button class="secondary-action glass-secondary" data-diy-tryon>进入试衣</button>
        </footer>
      </div>`,
    true,
    "diy-result-page",
  );
}

function renderDiyEditor() {
  const result = selectedDiyResult() || selectedDiyStyle();
  const elementCategory = selectedElementCategory();
  const localChange = selectedLocalChange();

  return `
    <section class="diy-editor">
      <div class="diy-editor-stage">
        <img class="diy-editor-media" src="${escapeHtml(result.imageUrl)}" alt="${escapeHtml(result.name)}" />
      </div>
      <div class="tryon-vignette"></div>
      ${renderIconNav({ showBack: true, title: "DIY编辑", subtitle: "选择颜色、元素或局部改款，继续生成下一版" })}

      <button class="diy-tool-handle ${state.diy.toolCollapsed ? "collapsed" : "expanded"}" data-tool-toggle aria-label="${state.diy.toolCollapsed ? "展开设计工具" : "收起设计工具"}">
        ${icon(state.diy.toolCollapsed ? "back" : "next")}
      </button>
      ${state.diy.toolCollapsed ? "" : `
        <aside class="diy-tool-panel floating-section">
          <div class="diy-mode-tabs">
            ${["color", "pattern", "local"].map((mode) => `
              <button class="diy-mode ${state.diy.editMode === mode ? "active" : ""}" data-diy-mode="${mode}">
                ${mode === "color" ? "颜色" : mode === "pattern" ? "元素" : "局部"}
              </button>`).join("")}
          </div>
          ${state.diy.editMode === "color" ? renderColorTool() : ""}
          ${state.diy.editMode === "pattern" ? renderElementTool(elementCategory) : ""}
          ${state.diy.editMode === "local" ? renderLocalTool(localChange) : ""}
          <button class="primary-action glass-primary diy-generate" data-diy-next="results">生成新设计</button>
        </aside>`}
      ${state.diy.localPreviewOpen ? renderLocalPreviewLayer(result, localChange) : ""}
    </section>`;
}

function renderColorTool() {
  const isManual = state.diy.colorMode === "manual";
  return `
    <section class="tool-section">
      <h2>调整颜色</h2>
      <div class="pill-row">
        ${config.diy.colorModes.map((mode) => `<button class="choice-pill ${state.diy.colorMode === mode.id ? "active" : ""}" data-color-mode="${mode.id}">${escapeHtml(mode.name)}</button>`).join("")}
      </div>
      ${isManual ? `
        <div class="color-picker" style="--picked:${escapeHtml(state.diy.manualColor)}">
          <div class="inline-color-wheel">
            <div class="color-field" aria-label="选择颜色区域">
              <button class="color-hotspot warm" data-manual-color="#d76b6b" aria-label="暖红色"></button>
              <button class="color-hotspot light" data-manual-color="#e8d8b7" aria-label="浅米色"></button>
              <button class="color-hotspot cool" data-manual-color="#8ca2b8" aria-label="灰蓝色"></button>
              <button class="color-hotspot deep" data-manual-color="#2f5748" aria-label="深绿色"></button>
            </div>
            <div class="hue-strip" aria-label="选择色相">
              <button style="--hue-color:#d94d4d" data-manual-color="#d94d4d" aria-label="红色"></button>
              <button style="--hue-color:#e0c85b" data-manual-color="#e0c85b" aria-label="黄色"></button>
              <button style="--hue-color:#5fbf88" data-manual-color="#5fbf88" aria-label="绿色"></button>
              <button style="--hue-color:#5c9ee6" data-manual-color="#5c9ee6" aria-label="蓝色"></button>
              <button style="--hue-color:#9b6be8" data-manual-color="#9b6be8" aria-label="紫色"></button>
            </div>
          </div>
          <div class="picked-color">
            <span></span>
            <strong>${escapeHtml(state.diy.manualColor)}</strong>
          </div>
          <div class="swatch-grid">
            ${config.diy.colorSwatches.map((color) => `<button class="swatch ${state.diy.manualColor === color ? "active" : ""}" style="--swatch:${escapeHtml(color)}" data-manual-color="${escapeHtml(color)}" aria-label="${escapeHtml(color)}"></button>`).join("")}
          </div>
        </div>` : ""}
    </section>`;
}

function renderElementTool(category) {
  const totalPages = Math.max(1, Math.ceil(category.items.length / ELEMENT_PAGE_SIZE));
  const start = state.diy.elementPage * ELEMENT_PAGE_SIZE;
  const pageItems = category.items.slice(start, start + ELEMENT_PAGE_SIZE);

  return `
    <section class="tool-section">
      <h2>添加元素</h2>
      <div class="category-scroll-wrap">
        <div class="category-scroll">
          ${config.diy.elementCategories.map((item) => `<button class="choice-pill ${state.diy.elementCategoryId === item.id ? "active" : ""}" data-element-category="${item.id}">${escapeHtml(item.name)}</button>`).join("")}
        </div>
      </div>
      <div class="element-grid">
        ${pageItems.map((item) => `
          <button class="element-tile ${state.diy.elementId === item.id ? "active" : ""}" data-element="${escapeHtml(item.id)}" aria-label="${escapeHtml(item.name)}">
            ${state.diy.elementId === item.id ? `<span class="element-check">${icon("check")}</span>` : ""}
            <span class="element-image-frame">
              <img src="${escapeHtml(item.imageUrl)}" alt="${escapeHtml(item.name)}" />
            </span>
            <strong>${escapeHtml(item.name)}</strong>
          </button>`).join("")}
      </div>
      ${renderElementPager(state.diy.elementPage, totalPages)}
    </section>`;
}

function renderElementPager(page, totalPages) {
  if (totalPages <= 1) return "";
  return `
    <div class="element-pager">
      <button class="pager-btn" data-element-page="-1" aria-label="上一页" ${page <= 0 ? "disabled" : ""}>${icon("back")}</button>
      <span>${page + 1} / ${totalPages}</span>
      <button class="pager-btn" data-element-page="1" aria-label="下一页" ${page >= totalPages - 1 ? "disabled" : ""}>${icon("next")}</button>
    </div>`;
}

function renderLocalTool(change) {
  const previewText = state.diy.localPreviewReady ? "已预览调整" : "预览调整";
  const previewHint = state.diy.localPreviewReady ? "已选择局部区域，可继续选择快捷改法" : "未预览调整时，将自动识别替换服装";

  return `
    <section class="tool-section">
      <h2>局部改款</h2>
      <button class="preview-adjust ${state.diy.localPreviewReady ? "ready" : ""}" data-local-preview>
        <strong>${previewText}</strong>
        <span>${previewHint}</span>
      </button>
      <div class="tool-subhead">选择要修改的部位</div>
      <div class="pill-row local-region-row">
        ${config.diy.localChanges.map((item) => `<button class="choice-pill ${state.diy.localChangeId === item.id ? "active" : ""}" data-local-change="${item.id}">${escapeHtml(item.name)}</button>`).join("")}
      </div>
      <div class="tool-subhead">选择改法</div>
      <div class="quick-grid">
        ${change.options.map((option) => `<button class="choice-pill ${state.diy.localOption === option ? "active soft-active" : ""}" data-local-option="${escapeHtml(option)}">${escapeHtml(option)}</button>`).join("")}
      </div>
    </section>`;
}

function renderLocalPreviewLayer(result, change) {
  return `
    <section class="paint-layer" aria-label="预览调整">
      <div class="paint-canvas">
        <div class="paint-source">
          <img src="${escapeHtml(result.imageUrl)}" alt="${escapeHtml(result.name)}局部预览" />
          <span class="paint-mask ${escapeHtml(change.id)}"></span>
        </div>
        <div class="paint-preview">
          <span class="paint-cutout ${escapeHtml(change.id)}"></span>
          <strong>${escapeHtml(change.name)}预览</strong>
        </div>
      </div>
      <div class="paint-toolbar">
        <button class="paint-tool active">涂抹</button>
        <button class="paint-tool">擦除</button>
        <div class="brush-size"><span></span></div>
        <button class="primary-action paint-done" data-local-preview-done>完成</button>
      </div>
    </section>`;
}

function imageChoice(item, type, activeId) {
  const kindClass = type === "knit" ? "knit-choice" : "style-choice";
  return `
    <button class="image-choice ${kindClass} ${item.id === activeId ? "active" : ""}" data-${type}="${escapeHtml(item.id)}">
      ${item.id === activeId ? `<span class="selected-check">${icon("check")}</span>` : ""}
      <img src="${escapeHtml(item.imageUrl)}" alt="${escapeHtml(item.name)}" />
      <strong>${escapeHtml(item.name)}</strong>
      <span>${escapeHtml(item.tags.join(" / "))}</span>
    </button>`;
}

function renderTryOn() {
  const items = tryOnItemsForSource();
  const current = selectedTryOnItem();
  const currentStore = storeForProduct(current);
  const isDiySource = state.tryOnSource === "diy";
  const totalPages = Math.max(1, Math.ceil(items.length / TRYON_PAGE_SIZE));
  const start = state.tryOnPage * TRYON_PAGE_SIZE;
  const pageItems = items.slice(start, start + TRYON_PAGE_SIZE);
  const emptyRailSlots = Array.from({ length: Math.max(0, TRYON_PAGE_SIZE - pageItems.length) });

  return `
    <section class="tryon-mirror">
      ${renderTryOnMedia(current)}
      <div class="tryon-vignette"></div>

      <header class="tryon-topbar">
        <div class="icon-nav">
          <button class="icon-btn" data-view="home" aria-label="返回首页">${icon("home")}</button>
          <button class="icon-btn" data-back aria-label="返回上一步">${icon("back")}</button>
        </div>
        <div>
          <h1>AI试穿</h1>
          <p>选择款式，查看当前AI上身效果</p>
        </div>
      </header>

      <aside class="tryon-floating-panel">
        <section class="floating-section style-picker">
          <div class="floating-head">
            <h2>选择款式</h2>
            <span>${state.tryOnPage + 1} / ${totalPages}</span>
          </div>
          <div class="tryon-product-grid">
            ${pageItems.map(tryOnRailItem).join("")}
            ${emptyRailSlots.map(() => `<span class="rail-item rail-placeholder" aria-hidden="true"></span>`).join("")}
          </div>
          <div class="pager-actions">
            <button class="pager-btn" data-tryon-prev aria-label="上一页" ${state.tryOnPage <= 0 ? "disabled" : ""}>${icon("back")}</button>
            <button class="pager-btn" data-tryon-next aria-label="下一页" ${state.tryOnPage >= totalPages - 1 ? "disabled" : ""}>${icon("next")}</button>
          </div>
        </section>

        <section class="floating-section current-style">
          <p class="section-kicker">当前款式</p>
          <h2>${escapeHtml(current.shortName || current.name)}</h2>
          <p class="subtitle">${escapeHtml(current.subtitle)}</p>
          <div class="compact-meta">
            ${meta("颜色", listText(current.colors, current.color))}
            ${meta("材质", current.material)}
            ${meta("场景", current.scene)}
          </div>
        </section>

        ${isDiySource ? renderDiyFileGenerateAction() : renderFloatingStore(currentStore, current)}
      </aside>
    </section>`;
}

function renderFloatingStore(store, current) {
  return `
    <section class="floating-section floating-store">
      <div>
        <strong>${escapeHtml(store.boothNo)}</strong>
        <p>扫码查看当前款详情</p>
      </div>
      ${qrCode(current)}
    </section>`;
}

function renderDiyFileGenerateAction() {
  const isGenerated = state.diy.fileGenerateStatus === "generated";
  return `
    <section class="floating-section diy-file-card">
      <button class="primary-action glass-primary diy-file-generate ${isGenerated ? "generated" : ""}" data-diy-file-generate>
        ${isGenerated ? "已生成款式文件" : "上机文件生成"}
      </button>
    </section>`;
}

function renderTryOnMedia(product) {
  const mediaUrl = product.tryOnMediaUrl || product.posterUrl || product.imageUrl;
  if (product.tryOnMediaType === "video") {
    return `
      <video class="tryon-media" src="${escapeHtml(mediaUrl)}" poster="${escapeHtml(product.posterUrl || product.imageUrl)}" autoplay muted loop playsinline></video>`;
  }
  return `<img class="tryon-media" src="${escapeHtml(mediaUrl)}" alt="${escapeHtml(product.name)}试穿效果" />`;
}

function tryOnRailItem(product) {
  return `
    <button class="rail-item ${product.id === state.selectedTryOnItemId ? "active" : ""}" data-tryon-item="${escapeHtml(product.id)}">
      <span class="rail-image-frame">
        <img src="${escapeHtml(product.imageUrl)}" alt="${escapeHtml(product.name)}" />
      </span>
    </button>`;
}

function meta(label, value) {
  return `<div class="meta"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
}

function listText(values, fallback = "") {
  if (Array.isArray(values) && values.length > 0) return values.join(" / ");
  return fallback;
}

function renderFinder() {
  if (state.finder.step === 2) return renderFinderStyle();
  return renderFinderBasics();
}

function renderFinderBasics() {
  return `
    <section class="finder page panel-page">
      ${renderIconNav({ showBack: true, title: "智能穿搭推荐", subtitle: "先选择基础条件，缩小推荐范围" })}
      <div class="finder-desk">
        <section class="finder-options finder-options-large">
          ${choiceGroup("性别", "gender", config.finder.genders)}
          ${choiceGroup("季节", "season", config.finder.seasons)}
          ${choiceGroup("品类", "category", config.finder.categories)}
        </section>
        <footer class="flow-actions">
          <button class="primary-action glass-primary" data-finder-next>下一步</button>
        </footer>
      </div>
    </section>`;
}

function renderFinderStyle() {
  return `
    <section class="finder page panel-page">
      ${renderIconNav({ showBack: true, title: "智能穿搭推荐", subtitle: `${state.finder.season} · ${state.finder.gender} · ${state.finder.category}` })}
      <div class="finder-desk">
        <section class="finder-options finder-options-large">
          ${choiceGroup("场景", "occasion", config.finder.occasions)}
          ${choiceGroup("风格", "style", config.finder.styles)}
          ${choiceGroup("色系", "color", config.finder.colors)}
        </section>
        <footer class="flow-actions">
          <button class="primary-action glass-primary" data-finder-tryon>进入AI试穿</button>
        </footer>
      </div>
    </section>`;
}

function choiceGroup(label, key, values) {
  return `
    <div class="choice-group">
      <label>${escapeHtml(label)}</label>
      <div class="choice-row">
        ${values.map((value) => `<button class="choice ${state.finder[key] === value ? "active" : ""}" data-choice-key="${escapeHtml(key)}" data-choice-value="${escapeHtml(value)}">${escapeHtml(value)}</button>`).join("")}
      </div>
    </div>`;
}

function qrCode(product) {
  const qrCodeUrl = product?.qrCodeUrl || config.store.qrCodeUrl;
  if (qrCodeUrl) {
    return `<div class="qr"><img src="${escapeHtml(qrCodeUrl)}" alt="${escapeHtml(config.store.miniProgramName)}二维码" /></div>`;
  }
  return `<div class="qr">小程序码</div>`;
}

function goBack() {
  if (state.view === "diy") {
    if (state.diy.step === "style") {
      state.view = "home";
    } else if (state.diy.step === "knit") {
      state.diy.step = "style";
    } else if (state.diy.step === "results") {
      state.diy.step = "knit";
    } else {
      state.diy.step = "results";
    }
  } else if (state.view === "finder") {
    if (state.finder.step === 2) {
      state.finder.step = 1;
    } else {
      state.view = "home";
    }
  } else if (state.view === "tryon") {
    if (state.tryOnSource === "diy") {
      state.view = "diy";
      state.diy.step = "results";
    } else if (state.tryOnSource === "finder") {
      state.view = "finder";
      state.finder.step = 2;
    } else {
      state.view = "home";
    }
  }
  render();
}

function bindEvents() {
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      state.view = button.dataset.view;
      if (state.view === "diy") state.diy.step = "style";
      if (state.view === "finder") state.finder.step = 1;
      if (state.view === "home") state.tryOnSource = "home";
      render();
    });
  });

  document.querySelectorAll("[data-back]").forEach((button) => {
    button.addEventListener("click", goBack);
  });

  document.querySelectorAll("[data-diy-style]").forEach((button) => {
    button.addEventListener("click", () => {
      state.diy.styleId = button.dataset.diyStyle;
      render();
    });
  });

  document.querySelectorAll("[data-knit]").forEach((button) => {
    button.addEventListener("click", () => {
      state.diy.knitId = button.dataset.knit;
      render();
    });
  });

  document.querySelectorAll("[data-diy-page]").forEach((button) => {
    button.addEventListener("click", () => {
      const dir = Number(button.dataset.pageDir || 0);
      if (button.dataset.diyPage === "style") state.diy.stylePage += dir;
      if (button.dataset.diyPage === "knit") state.diy.knitPage += dir;
      render();
    });
  });

  document.querySelectorAll("[data-diy-next]").forEach((button) => {
    button.addEventListener("click", () => {
      state.diy.step = button.dataset.diyNext;
      if (state.diy.step === "edit") state.diy.toolCollapsed = false;
      render();
    });
  });

  document.querySelectorAll("[data-diy-result]").forEach((button) => {
    button.addEventListener("click", () => {
      state.diy.resultId = button.dataset.diyResult;
      render();
    });
  });

  document.querySelectorAll("[data-diy-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      state.diy.editMode = button.dataset.diyMode;
      state.diy.toolCollapsed = false;
      render();
    });
  });

  document.querySelectorAll("[data-tool-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      state.diy.toolCollapsed = !state.diy.toolCollapsed;
      render();
    });
  });

  document.querySelectorAll("[data-color-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      state.diy.colorMode = button.dataset.colorMode;
      render();
    });
  });

  document.querySelectorAll("[data-manual-color]").forEach((button) => {
    button.addEventListener("click", () => {
      state.diy.manualColor = button.dataset.manualColor || state.diy.manualColor;
      render();
    });
  });

  document.querySelectorAll("[data-element-category]").forEach((button) => {
    button.addEventListener("click", () => {
      state.diy.elementCategoryId = button.dataset.elementCategory;
      state.diy.elementPage = 0;
      state.diy.elementId = selectedElementCategory()?.items[0]?.id;
      render();
    });
  });

  document.querySelectorAll("[data-element]").forEach((button) => {
    button.addEventListener("click", () => {
      state.diy.elementId = button.dataset.element;
      render();
    });
  });

  document.querySelectorAll("[data-element-page]").forEach((button) => {
    button.addEventListener("click", () => {
      state.diy.elementPage += Number(button.dataset.elementPage || 0);
      render();
    });
  });

  document.querySelectorAll("[data-local-change]").forEach((button) => {
    button.addEventListener("click", () => {
      state.diy.localChangeId = button.dataset.localChange;
      state.diy.localOption = selectedLocalChange()?.options[0];
      render();
    });
  });

  document.querySelectorAll("[data-local-option]").forEach((button) => {
    button.addEventListener("click", () => {
      state.diy.localOption = button.dataset.localOption;
      render();
    });
  });

  document.querySelectorAll("[data-local-preview]").forEach((button) => {
    button.addEventListener("click", () => {
      state.diy.localPreviewOpen = true;
      render();
    });
  });

  document.querySelectorAll("[data-local-preview-done]").forEach((button) => {
    button.addEventListener("click", () => {
      state.diy.localPreviewOpen = false;
      state.diy.localPreviewReady = true;
      render();
    });
  });

  document.querySelectorAll("[data-diy-tryon]").forEach((button) => {
    button.addEventListener("click", () => {
      state.tryOnSource = "diy";
      state.selectedTryOnItemId = state.diy.resultId || config.diy.aiResults[0]?.id;
      state.diy.fileGenerateStatus = "idle";
      state.tryOnPage = 0;
      state.view = "tryon";
      render();
    });
  });

  document.querySelectorAll("[data-diy-file-generate]").forEach((button) => {
    button.addEventListener("click", () => {
      state.diy.fileGenerateStatus = "generated";
      render();
    });
  });

  document.querySelectorAll("[data-tryon-item]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedTryOnItemId = button.dataset.tryonItem;
      if (state.tryOnSource === "diy") {
        state.diy.resultId = button.dataset.tryonItem;
      } else {
        state.selectedProductId = button.dataset.tryonItem;
      }
      render();
    });
  });

  document.querySelectorAll("[data-tryon-prev]").forEach((button) => {
    button.addEventListener("click", () => {
      state.tryOnPage -= 1;
      render();
    });
  });

  document.querySelectorAll("[data-tryon-next]").forEach((button) => {
    button.addEventListener("click", () => {
      state.tryOnPage += 1;
      render();
    });
  });

  document.querySelectorAll("[data-choice-key]").forEach((button) => {
    button.addEventListener("click", () => {
      state.finder[button.dataset.choiceKey] = button.dataset.choiceValue;
      render();
    });
  });

  document.querySelectorAll("[data-finder-next]").forEach((button) => {
    button.addEventListener("click", () => {
      state.finder.step = 2;
      render();
    });
  });

  document.querySelectorAll("[data-finder-tryon]").forEach((button) => {
    button.addEventListener("click", () => {
      const recommendation = config.finder.recommendations[state.finder.recommendationIndex] || config.finder.recommendations[0];
      state.tryOnSource = "finder";
      state.selectedProductId = recommendation.productId;
      state.selectedTryOnItemId = recommendation.productId;
      state.tryOnPage = 0;
      state.view = "tryon";
      render();
    });
  });
}

render();
