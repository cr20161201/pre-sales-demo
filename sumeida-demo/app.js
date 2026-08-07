const config = window.SUMEIDA_CONFIG;
const app = document.querySelector("#app");

const initialState = () => ({
  view: "home",
  backStack: [],
  photo: false,
  consentAccepted: false,
  captureTarget: "diagnosis",
  reportReady: false,
  recommendationMode: "report",
  flowSource: "recommendation",
  styleId: null,
  fabricId: null,
  comboId: null,
  libraryTab: "styles",
  designHistory: [],
  tryOnHistory: [],
  selectedTryOnId: null,
  tryOnSequence: 0,
  backgroundId: "bg-sunlit-gallery",
  backgroundMode: "new",
  realtimeComboId: null,
  tryonMode: null,
  pairingStyleId: null,
  toast: "",
  generating: false,
  pendingFabricId: null
});

const state = initialState();
const getStyle = id => config.styles.find(item => item.id === id);
const getFabric = id => config.fabrics.find(item => item.id === id);
const getCombination = id => config.combinations.find(item => item.id === id);
const getBackground = id => config.backgrounds.find(item => item.id === id);
const getPairingItem = id => config.pairingItems.find(item => item.id === id);
const getExactCombo = () => config.combinations.find(item => item.styleId === state.styleId && item.fabricId === state.fabricId) || null;
const getActiveCombo = () => getCombination(state.comboId) || getExactCombo() || config.combinations.find(item => item.styleId === state.styleId) || null;
const getSelectedTryOn = () => state.tryOnHistory.find(item => item.id === state.selectedTryOnId) || state.tryOnHistory[0] || null;
const getOrderedFabrics = (styleId = state.styleId) => {
  if (!styleId) return config.fabrics;
  const configuredFabricIds = new Set(config.combinations.filter(item => item.styleId === styleId).map(item => item.fabricId));
  return [...config.fabrics].sort((left, right) => Number(configuredFabricIds.has(right.id)) - Number(configuredFabricIds.has(left.id)));
};

function go(view, remember = true) {
  if (remember && state.view !== view) state.backStack.push(state.view);
  state.view = view;
  render();
}

function back() {
  state.view = state.backStack.pop() || "home";
  render();
}

function reset() {
  Object.assign(state, initialState());
  render();
}

function toast(message) {
  state.toast = message;
  render();
  window.setTimeout(() => {
    state.toast = "";
    render();
  }, 1800);
}

function topbar(title, options = {}) {
  if (title === "自主创款") title = "款式库";
  const { hideBack = false } = options;
  return `<header class="topbar">
    <div class="top-left">
      ${hideBack ? "" : `<button class="icon-btn" data-back aria-label="返回">‹</button>`}
    </div>
    <div class="page-title">${title}</div>
    <div class="top-actions"><button class="icon-btn" data-home aria-label="返回首页">⌂</button></div>
  </header>`;
}

function mediaPresentationStyle(item) {
  const presentation = item?.presentation || {};
  const offset = value => typeof value === "number" ? `${value}px` : value || "0px";
  return `--media-scale:${presentation.scale || 1};--media-x:${offset(presentation.x)};--media-y:${offset(presentation.y)}`;
}

function metadataGrid(rows) {
  const available = rows.filter(item => item.value !== undefined && item.value !== null && item.value !== "");
  return `<dl class="record-meta">${available.map(item => `<div><dt>${item.label}</dt><dd>${item.value}</dd></div>`).join("")}</dl>`;
}

function shell(content) {
  return `<section class="app-shell">${content}${state.toast ? `<div class="toast">${state.toast}</div>` : ""}</section>`;
}

function render() {
  app.innerHTML = shell(renderView());
  bind();
}

function renderView() {
  const views = {
    home: homeView,
    consent: consentView,
    camera: cameraView,
    loading: loadingView,
    report: reportView,
    recommendationList: recommendationListView,
    detail: detailView,
    studio: studioView,
    backgroundSelect: backgroundSelectView,
    imageTryon: imageTryonView,
    tryonMode: tryonModeView,
    manualPairing: manualPairingView,
    realtime: realtimeView
  };
  return (views[state.view] || homeView)();
}

function homeView() {
  return `<section class="home">
    <div class="home-visual">
      <img src="${config.modelImage}" alt="男装试穿示例">
      <div class="hero-copy"><div class="eyebrow">TEXTILE & FASHION INNOVATION</div><h1>从面料，到理想衣着</h1><p>${config.brand.subtitle}</p></div>
    </div>
    <div class="entry-band"><h2>选择体验方式</h2><div class="entry-grid">
      <button class="entry primary" data-go="consent"><span class="entry-icon">◎</span><span><h3>智能推荐</h3><p>拍照生成专属美学报告，发现适合你的款式与面料方案。</p></span><b>›</b></button>
      <button class="entry" data-open-studio><span class="entry-icon">✦</span><span><h3>款式库</h3><p>自由选择款式与面料，保留每一次创作并直接发起试穿。</p></span><b>›</b></button>
    </div></div>
  </section>`;
}

function consentView() {
  return `${topbar("智能推荐")}<section class="page center-page privacy-page"><div class="consent privacy-consent panel">
    <div class="privacy-mark" aria-hidden="true">◉</div><p class="privacy-eyebrow">图像采集授权</p>
    <h1>开始前，请确认图像采集与使用说明</h1>
    <p class="privacy-lead">为生成专属穿搭建议和试穿效果，我们需要采集您的正面全身图像，并分析与服装推荐相关的身形轮廓、面部轮廓及穿着特征。相关信息仅用于完成本次穿搭推荐和试穿服务。</p>
    <div class="privacy-summary">
      <article><span>01</span><div><h2>采集内容</h2><p>正面全身图像，以及从图像中提取的身形轮廓、面部轮廓和穿着特征。</p></div></article>
      <article><span>02</span><div><h2>使用目的</h2><p>用于生成穿搭建议、匹配服装款式，并呈现图片试穿或实时试穿效果。</p></div></article>
      <article><span>03</span><div><h2>保存与删除</h2><p>信息仅在完成服务所需的最短期限内保存。您可随时提出停止处理或删除请求。</p></div></article>
    </div>
    <div class="recommendation-mode"><span>完成拍摄后</span><label><input type="radio" name="recommendation-mode" value="report" data-recommendation-mode ${state.recommendationMode === "report" ? "checked" : ""}>查看报告</label><label><input type="radio" name="recommendation-mode" value="recommendations" data-recommendation-mode ${state.recommendationMode === "recommendations" ? "checked" : ""}>仅推荐</label></div>
    <label class="consent-check"><input type="checkbox" data-consent-check ${state.consentAccepted ? "checked" : ""}><span>我已阅读并同意<button type="button" class="privacy-link" data-privacy>《图像采集与隐私说明》</button>，并授权为本次穿搭推荐与试穿服务处理上述信息。</span></label>
    <div class="consent-actions"><button class="secondary-btn" data-decline>暂不体验</button><button class="primary-btn" data-diagnosis-camera ${state.consentAccepted ? "" : "disabled"}>同意并开始拍摄</button></div>
  </div></section>`;
}

function cameraView() {
  const title = state.captureTarget === "diagnosis" ? "形象采集" : "试穿照片采集";
  return `${topbar(title)}<section class="page camera-stage"><div class="camera-guide"></div><button class="capture" data-capture aria-label="拍照"></button></section>`;
}

function loadingView() {
  const title = state.recommendationMode === "recommendations" ? "推荐方案生成" : "美学报告生成";
  const heading = state.recommendationMode === "recommendations" ? "正在匹配推荐方案" : "正在生成专属美学报告";
  return `${topbar(title)}<section class="page center-page"><div class="loading-card panel"><div class="spinner"></div><h1>${heading}</h1><p>识别基础特征 · 定位穿搭风格 · 匹配推荐款式</p><div class="progress"><i></i></div></div></section>`;
}

function recommendationListView() {
  const items = [
    { styleId: "style-001", title: "蓝白条纹休闲套装", detail: "基础款 · 可添加配套长裤", image: getStyle("style-001").thumbnail || getStyle("style-001").image },
    { styleId: "style-002", comboId: "combo-style-002-fabric-003", title: "浅绿肌理修身上衣", detail: "换料方案 · 已有上身效果", image: getCombination("combo-style-002-fabric-003").image },
    { styleId: "style-003", comboId: "combo-style-003-fabric-006", title: "米白蓝棕格衬衫", detail: "换料方案 · 可添加配套长裤", image: getCombination("combo-style-003-fabric-006").image },
    { styleId: "style-002", comboId: "combo-style-002-fabric-001", title: "粉紫花格修身上衣", detail: "换料方案 · 已有上身效果", image: getCombination("combo-style-002-fabric-001").image },
    { styleId: "style-003", comboId: "combo-style-003-fabric-007", title: "蓝白横条经典衬衫", detail: "换料方案 · 已有上身效果", image: getCombination("combo-style-003-fabric-007").image },
    { styleId: "style-001", title: "蓝白条纹拉链外套", detail: "基础款 · 适合自动搭配", image: getStyle("style-001").thumbnail || getStyle("style-001").image }
  ];
  return `${topbar("推荐方案")}<section class="page report-page recommendation-list-page"><div class="report-document"><div class="full-report-heading"><div><p class="section-kicker">PERSONAL PICKS</p><h1>为你匹配的推荐方案</h1><p>基于本次采集结果整理，可直接进入款式详情继续试穿。</p></div></div><div class="report-look-grid">${items.map(item => `<article class="report-look-card report-card"><div class="report-look-visual"><img src="${item.image}" alt="${item.title}"></div><div class="report-look-body"><div><p>推荐方案</p><h3>${item.title}</h3><span>${item.detail}</span></div><button class="primary-btn" data-detail-style="${item.styleId}" ${item.comboId ? `data-recommendation-combo="${item.comboId}"` : ""}>查看方案</button></div></article>`).join("")}</div></div></section>`;
}

function reportView() {
  const report = config.report;
  return `${topbar("美学报告")}<section class="page report-page"><div class="report-document">
    <section class="full-report-section"><h2 class="full-report-title"><span>01</span>基础特征</h2><div class="trait-summary">${report.basicTraits.traits.map(item => `<article class="trait-card report-card"><div class="trait-visual ${item.visualMode === "crop" ? "trait-visual-crop" : "trait-visual-contain"}"><img src="${item.image}" alt="${item.title}"></div><div class="trait-copy"><h3>${item.title}</h3><ul>${item.points.map(point => `<li>${point}</li>`).join("")}</ul></div></article>`).join("")}</div><article class="skin-card report-card"><div><h3>${report.basicTraits.skinToneTitle}</h3><div class="report-info-list">${report.basicTraits.featureRows.map(reportInfoRow).join("")}</div></div><div><h3>配色原则</h3><div class="report-info-list">${report.basicTraits.colorRows.map(reportInfoRow).join("")}</div></div><div class="palette-list">${report.basicTraits.paletteRows.map(item => `<div class="palette-row"><b>${item.label}</b>${item.colors.map(color => `<i style="background:${color}"></i>`).join("")}</div>`).join("")}</div></article></section>
    <section class="full-report-section"><h2 class="full-report-title"><span>02</span>风格定位</h2><article class="style-position-card report-card"><div><p class="report-eyebrow">${report.stylePositioning.intro}</p><h3>${report.stylePositioning.title}</h3><div class="style-tags">${report.stylePositioning.tags.map(item => `<span>${item}</span>`).join("")}</div><div class="report-info-list style-info-list">${report.stylePositioning.coreElements.map(reportInfoRow).join("")}</div></div><div><h4>推荐色彩</h4><div class="report-color-grid">${report.stylePositioning.colors.map(item => `<div><i style="background:${item.color}"></i><span>${item.name}</span></div>`).join("")}</div></div></article></section>
    <section class="full-report-section"><div class="full-report-heading"><h2 class="full-report-title"><span>03</span>推荐款式</h2><button class="scan-btn" data-scan>▣ 扫码选款</button></div><div class="report-look-grid">${report.recommendedLooks.map(reportLookCard).join("")}</div></section>
    <section class="full-report-section"><h2 class="full-report-title"><span>04</span>穿搭建议</h2><div class="report-advice-grid"><article class="advice-card report-card"><h3>细节优化技巧</h3><ol>${report.stylingAdvice.refine.map(adviceItem).join("")}</ol></article><article class="advice-card report-card avoid"><h3>需要避开的单品</h3><ol>${report.stylingAdvice.avoid.map(adviceItem).join("")}</ol></article></div></section>
  </div></section>`;
}

function reportInfoRow(item) {
  return `<div class="report-info-row"><strong>${item.label}</strong><span>${item.value}</span></div>`;
}

function reportLookCard(item) {
  const style = getStyle(item.styleId);
  return `<article class="report-look-card report-card"><div class="report-look-visual"><img src="${style.thumbnail || style.image}" alt="${item.title}"></div><div class="report-look-body"><div><p>${item.name}</p><h3>${item.title}</h3><span>${item.description}</span></div><button class="primary-btn" data-detail-style="${style.id}">查看款式</button></div></article>`;
}

function adviceItem(item) {
  return `<li><span><strong>${item.title}</strong>${item.description}</span></li>`;
}

function detailView() {
  const style = getStyle(state.styleId) || getStyle(config.diagnosis.recommendedStyleIds[0]);
  if (!state.styleId) state.styleId = style.id;
  const active = getCombination(state.comboId);
  const fabric = active ? getFabric(active.fabricId) : null;
  const media = active ? active.image : style.image;
  const mediaItem = active || style;
  const variants = state.designHistory.map(getCombination).filter(item => item && item.styleId === style.id);
  const pendingFabric = getFabric(state.pendingFabricId);
  const detailRows = [
    { label: "样衣编号", value: style.sampleNo },
    { label: "颜色", value: style.color },
    { label: "尺码", value: style.size },
    { label: "面料编号", value: fabric?.artNo },
    { label: "面料成分", value: fabric?.comp }
  ];
  return `${topbar("款式详情")}<section class="page experience-page detail-page">
    <div class="experience-stage detail-media ${state.generating ? "generating" : ""}"><span class="demo-badge">预制创款效果</span><div class="detail-media-viewport"><img src="${media}" alt="${style.name}" style="${mediaPresentationStyle(mediaItem)}"></div></div>
    <section class="experience-console detail-console">
      <div class="experience-history"><div class="experience-section-head"><div><p class="section-kicker">THIS SESSION</p><h2>本次方案</h2></div><span>${variants.length + 1} 个方案</span></div><div class="variant-strip experience-rail" aria-label="款式方案切换">
        <button class="variant-thumb ${!state.comboId ? "active" : ""}" data-detail-version="base"><img src="${style.image}" alt="原款"><span>原款</span></button>
        ${variants.map(item => `<button class="variant-thumb ${state.comboId === item.id ? "active" : ""}" data-detail-version="${item.id}"><img src="${item.image}" alt="${getFabric(item.fabricId).name}"><span>${getFabric(item.fabricId).name}</span></button>`).join("")}
        ${state.generating && pendingFabric ? `<div class="variant-thumb pending"><img src="${pendingFabric.image}" alt="${pendingFabric.name}"><span>生成中</span></div>` : ""}
      </div>
      </div>
      <aside class="experience-controls detail-controls"><div class="selection-summary"><p class="section-kicker">当前款式</p><h1>${style.name}</h1>${metadataGrid(detailRows)}</div><div class="current-fabric"><div class="current-fabric-copy"><span>当前面料</span><strong>${fabric ? fabric.name : "原款默认面料"}</strong>${fabric ? `<small>${fabric.artNo}</small>` : ""}</div><button class="fabric-change-btn" data-open-fabrics>+ 添加面料方案</button></div><div class="experience-actions detail-actions"><span class="detail-action-label">开始试穿</span><button class="primary-btn" data-image-tryon>图片试穿</button><button class="secondary-btn live-tryon-btn" data-realtime-tryon>实时试穿</button></div></aside>
    </section>
  </section>`;
}

function productCard(item, action) {
  const active = state.styleId === item.id || state.fabricId === item.id;
  const reference = action === "select-style" ? item.sampleNo : item.artNo;
  return `<button class="product-card ${active ? "active" : ""}" data-${action}="${item.id}"><img src="${item.thumbnail || item.image}" alt="${item.name}"><span class="body"><h3>${item.name}</h3><p>${reference}</p></span></button>`;
}

function studioView() {
  const style = getStyle(state.styleId);
  const fabric = getFabric(state.fabricId);
  const combo = getCombination(state.comboId) || getExactCombo();
  const media = combo ? combo.image : style ? style.image : fabric ? fabric.image : "";
  const designs = state.designHistory.map(getCombination).filter(Boolean);
  const previewStatus = combo ? "方案已生成" : style || fabric ? "等待补充素材" : "等待选择";
  const scanTarget = state.libraryTab === "styles" ? "style" : "fabric";
  const scanLabel = scanTarget === "style" ? "扫码选款" : "扫码选料";
  const libraryItems = state.libraryTab === "styles" ? config.styles : getOrderedFabrics();
  return `${topbar("自主创款")}<section class="workspace studio-workspace"><div class="canvas studio-canvas"><div class="studio-preview-head"><div><p class="section-kicker">CREATION PREVIEW</p><h2>创作预览</h2></div><span class="studio-status ${combo ? "ready" : ""}">${previewStatus}</span></div><div class="canvas-view studio-preview ${state.generating ? "generating" : ""}">${media ? `<span class="demo-badge">${combo ? "预制组合效果" : "当前素材"}</span><img src="${media}" alt="当前创款">` : `<div class="empty-state"><b>开始你的创作</b>从右侧任选款式或面料，两项齐全后自动组合。</div>`}</div><div class="selection-float studio-selection"><div class="selected-row">${style ? `<img src="${style.image}" alt=""><span><small>已选款式</small><b>${style.name}</b></span><button class="text-btn" data-clear="style">移除</button>` : `<span class="selection-placeholder">款</span><span><small>已选款式</small><b>尚未选择</b></span><button class="text-btn" data-tab="styles">去选择</button>`}</div><div class="selected-row">${fabric ? `<img src="${fabric.image}" alt=""><span><small>已选面料</small><b>${fabric.name}</b></span><button class="text-btn" data-clear="fabric">移除</button>` : `<span class="selection-placeholder">料</span><span><small>已选面料</small><b>尚未选择</b></span><button class="text-btn" data-tab="fabrics">去选择</button>`}</div></div>${combo ? `<div class="studio-tryon-actions"><button class="secondary-btn" data-image-tryon>图片试穿</button><button class="primary-btn" data-realtime-tryon>实时试穿</button></div>` : ""}<section class="studio-history"><div class="studio-history-head"><div><span>本次方案</span><small>${designs.length} 个方案</small></div><button data-schemes>查看方案</button></div>${designs.length ? `<div class="studio-history-rail">${designs.map(item => `<button class="studio-history-card ${combo?.id === item.id ? "active" : ""}" data-studio-scheme="${item.id}"><img src="${item.image}" alt="${getStyle(item.styleId).name}"><span><strong>${getStyle(item.styleId).name}</strong><small>${getFabric(item.fabricId).name}</small></span></button>`).join("")}</div>` : `<div class="studio-history-empty">生成后的组合会自动保存在这里</div>`}</section></div><aside class="library"><div class="tabs"><button class="tab ${state.libraryTab === "styles" ? "active" : ""}" data-tab="styles">款式库</button><button class="tab ${state.libraryTab === "fabrics" ? "active" : ""}" data-tab="fabrics">面料库</button></div><div class="library-tools"><b>${state.libraryTab === "styles" ? "选择基础款式" : "选择面料"}</b><button class="scan-icon-btn" data-open-scan="${scanTarget}" aria-label="${scanLabel}" title="${scanLabel}"><span aria-hidden="true">▣</span></button></div><div class="library-grid">${libraryItems.map(item => productCard(item, state.libraryTab === "styles" ? "select-style" : "select-fabric")).join("")}</div></aside></section>`;
}

function backgroundSelectView() {
  const active = getActiveCombo();
  const needsPhoto = state.backgroundMode !== "change" && !state.photo;
  const guidance = needsPhoto
    ? "选择演示场景，下一步拍摄正面全身照片。"
    : "场景用于本次演示选择，结果展示预制试衣成片。";
  const actionLabel = state.backgroundMode === "change"
    ? "确认演示场景"
    : needsPhoto ? "下一步 · 拍照" : "生成试穿效果";
  return `${topbar("选择试穿背景")}<section class="page background-page"><div class="background-heading"><p class="section-kicker">IMAGE TRY-ON · DEMO SCENE</p><h1>${state.backgroundMode === "change" ? "选择其他演示场景" : "选择一个试穿背景"}</h1><p>${active ? getStyle(active.styleId).name : "当前款式"} · ${guidance}</p></div><div class="background-grid">${config.backgrounds.map(item => `<button class="background-card ${state.backgroundId === item.id ? "active" : ""}" data-background="${item.id}"><img src="${item.image}" alt="${item.name}"><span><i></i><strong>${item.name}</strong><small>${item.description}</small></span></button>`).join("")}</div><div class="background-footer"><div><span>当前演示场景</span><strong>${getBackground(state.backgroundId)?.name || "请选择背景"}</strong></div><button class="primary-btn" data-confirm-background>${actionLabel}</button></div></section>`;
}

function imageTryonView() {
  const result = getSelectedTryOn();
  const isStudioFlow = state.flowSource === "studio";
  if (!result) return `${topbar("图片试穿")}<section class="page center-page"><div class="consent panel"><h1>还没有试穿结果</h1><button class="primary-btn" data-continue-design>${isStudioFlow ? "返回创款" : "返回款式详情"}</button></div></section>`;
  const combo = getCombination(result.comboId);
  const style = getStyle(combo.styleId);
  const adjustmentTools = result.type === "image"
    ? `<div class="result-tool-group"><button data-change-background>换背景</button><button data-generate-video>生成视频</button></div>`
    : `<div class="result-status"><i></i><span><strong>视频已生成</strong><small>已保存在本次试穿记录</small></span></div>`;
  const nextActions = isStudioFlow
    ? `<button class="primary-btn" data-continue-design>继续设计</button><button class="result-link-btn" data-schemes>选择已完成方案</button>`
    : `<button class="primary-btn" data-other-recommendation>换其他推荐款</button><button class="result-link-btn" data-schemes>其他方案</button>`;
  return `${topbar("试穿结果")}<section class="page experience-page result-page"><div class="experience-stage result-stage"><span class="demo-badge">预制试穿效果</span>${result.type === "image" ? `<img src="${result.media}" alt="${style.name}试穿结果">` : `<video src="${result.media}" autoplay muted loop playsinline></video>`}</div><section class="experience-console result-console"><div class="experience-history result-history"><div class="experience-section-head"><div><p class="section-kicker">THIS SESSION</p><h2>本次试穿</h2></div><span>${state.tryOnHistory.length} 个结果</span></div><div class="result-rail experience-rail">${state.tryOnHistory.map(tryOnThumb).join("")}</div></div><aside class="experience-controls result-actions"><div class="result-action-header"><p class="section-kicker">当前结果</p><h2>试穿操作</h2></div><section class="result-action-section"><span class="result-action-label">调整当前结果</span>${adjustmentTools}</section><section class="result-action-section result-next-section"><span class="result-action-label">选择下一步</span><div class="result-nav-group">${nextActions}</div></section></aside></section></section>`;
}

function tryOnThumb(item) {
  const combo = getCombination(item.comboId);
  const style = getStyle(combo.styleId);
  const thumb = item.type === "image" ? item.media : combo.image;
  const label = item.type === "image" ? "图片" : item.type === "video" ? "视频" : "实时";
  return `<button class="result-thumb ${state.selectedTryOnId === item.id ? "active" : ""}" data-tryon-result="${item.id}"><span class="result-thumb-media"><img src="${thumb}" alt="${style.name}"><i>${label}</i></span><strong>${style.name}</strong><small>${getFabric(combo.fabricId).artNo}</small></button>`;
}

function realtimeView() {
  const combo = getCombination(state.realtimeComboId) || getActiveCombo() || getCombination(state.designHistory[0]);
  if (!combo) return `${topbar("实时试穿")}<section class="page center-page"><div class="consent panel"><h1>请先选择一套方案</h1><button class="primary-btn" data-go="studio">返回创款</button></div></section>`;
  const schemes = state.designHistory.map(getCombination).filter(Boolean);
  const returnLabel = state.flowSource === "studio" ? "返回创款" : "返回报告";
  return `<section class="realtime-page">${topbar("实时试穿")}<video class="realtime-media" src="${combo.realtime}" autoplay muted loop playsinline></video><div class="realtime-shade"></div><aside class="realtime-panel"><div class="realtime-panel-head"><p class="section-kicker">CREATED THIS SESSION</p><h2>本次方案</h2><span>${schemes.length} 款</span></div><div class="realtime-schemes">${schemes.map(item => `<button class="realtime-scheme ${combo.id === item.id ? "active" : ""}" data-realtime-scheme="${item.id}"><img src="${item.image}" alt="${getStyle(item.styleId).name}"><span><strong>${getStyle(item.styleId).name}</strong><small>${getFabric(item.fabricId).name}</small></span></button>`).join("")}</div><div class="realtime-panel-actions"><button class="secondary-btn" data-return-flow>${returnLabel}</button><button class="primary-btn" data-home>返回首页</button></div></aside><span class="demo-badge realtime-badge">演示视频 · 正式版接入摄像头</span></section>`;
}

function modal(content, className = "") {
  app.insertAdjacentHTML("beforeend", `<div class="modal-backdrop" id="modal"><div class="modal ${className}">${content}</div></div>`);
  bindModal();
}

function scanModal(target = "style") {
  const scanTarget = target === "fabric" ? "fabric" : "style";
  const isStyle = scanTarget === "style";
  const items = isStyle ? config.styles : config.fabrics;
  const codeKey = isStyle ? "sampleNo" : "artNo";
  modal(`<div class="modal-head"><h2>${isStyle ? "扫码选款" : "扫码选料"}</h2><button class="close" data-close aria-label="关闭">×</button></div><div class="scanner"><div class="scan-frame"><i class="scan-line"></i></div></div><p class="scan-hint">将${isStyle ? "样品码" : "面料码"}对准扫描框</p><div class="scan-demo-codes">${items.map(item => `<button data-scan-target="${scanTarget}" data-scan-item="${item.id}" data-scan-code="${item[codeKey]}">${item[codeKey]}</button>`).join("")}</div>`, "scan-modal");
}

function applyScannedItem(target, itemId, code) {
  const isStyle = target === "style";
  const item = isStyle ? getStyle(itemId) : getFabric(itemId);
  if (!item) return;
  if (isStyle) state.styleId = item.id;
  else state.fabricId = item.id;
  state.comboId = null;
  state.libraryTab = isStyle ? "styles" : "fabrics";
  if (state.view === "report" && isStyle) {
    state.flowSource = "recommendation";
    go("detail");
    return;
  }
  if (state.styleId && state.fabricId) combine();
  else toast(`已添加${isStyle ? "款式" : "面料"} ${code || item.name}`);
}

function fabricModal() {
  const variants = state.designHistory.map(getCombination).filter(item => item && item.styleId === state.styleId).map(item => item.fabricId);
  modal(`<div class="modal-head"><div><p class="section-kicker">ADD FABRIC</p><h2>添加面料方案</h2><p>已有预制组合的面料优先展示；选择后会新增方案并保留历史方案。</p></div><button class="close" data-close aria-label="关闭">×</button></div><div class="library-grid fabric-modal-grid">${getOrderedFabrics().map(item => `<button class="product-card ${state.fabricId === item.id ? "active" : ""}" data-modal-fabric="${item.id}"><img src="${item.image}" alt="${item.name}"><span class="body"><h3>${item.name}</h3><p>${item.artNo}</p>${variants.includes(item.id) ? `<i class="existing-label">已添加</i>` : `<i class="existing-label">${item.remark}</i>`}</span></button>`).join("")}</div>`);
}

function schemesModal() {
  const current = getSelectedTryOn();
  const currentBackground = current?.backgroundId || state.backgroundId;
  const isStudioFlow = state.flowSource === "studio";
  modal(`<div class="modal-head"><div><p class="section-kicker">THIS SESSION</p><h2>${isStudioFlow ? "选择已完成方案" : "查看方案"}</h2><p>选择已有方案直接试穿，并沿用当前背景。</p></div><button class="close" data-close aria-label="关闭">×</button></div>${state.designHistory.length ? `<div class="creation-grid">${state.designHistory.map(id => { const combo = getCombination(id); return `<button class="scheme-card" data-try-scheme="${id}" data-background-id="${currentBackground}"><img src="${combo.image}" alt="${getStyle(combo.styleId).name}"><span><strong>${getStyle(combo.styleId).name}</strong><small>${getFabric(combo.fabricId).name}</small><b class="scheme-action">立即试穿</b></span></button>`; }).join("")}</div>` : `<div class="empty-state"><b>还没有方案记录</b>选择款式和面料后，生成结果会自动保存在这里。</div>`}<div class="modal-actions"><button class="secondary-btn" data-new-design>${isStudioFlow ? "继续设计" : "继续新设计"}</button></div>`);
}

function privacyModal() {
  modal(`<div class="modal-head privacy-modal-head"><div><p class="privacy-eyebrow">PRIVACY NOTICE</p><h2>图像采集与隐私说明</h2></div><button class="close" data-close aria-label="关闭">×</button></div><div class="privacy-notice"><p class="notice-intro">请在授权前阅读以下内容。只有在您主动勾选同意后，系统才会进入图像采集环节。</p><section><h3>一、处理目的</h3><p>为提供个性化穿搭推荐、款式与面料匹配、图片试穿及实时试穿服务，我们需要处理与服装推荐相关的图像信息。相关信息不会用于与本次服务无关的用途。</p></section><section><h3>二、采集的信息</h3><p>我们将采集您的正面全身图像，并可能从中提取身形轮廓、面部轮廓、服装穿着及姿态等特征。我们不会主动要求您提供姓名、手机号码等与本次服务无关的信息。</p></section><section><h3>三、处理范围</h3><p>上述信息仅在实现本次穿搭推荐和试穿功能所必需的范围内处理。如实际服务涉及第三方技术服务商，现场运营方应另行告知其名称、处理目的、处理方式和信息种类。</p></section><section><h3>四、保存与删除</h3><p>相关信息将按照完成本次服务所需的最短期限保存，并在达到处理目的后删除或匿名化处理，法律法规另有规定的除外。您可向现场工作人员提出查阅、更正、撤回授权、停止处理或删除请求。</p></section><section><h3>五、您的选择</h3><p>您可以选择不同意或随时撤回授权。拒绝或撤回授权将使我们无法继续提供依赖图像信息的穿搭推荐与试穿服务，但不会影响其他不依赖该信息的功能。</p></section><section><h3>六、未成年人提示</h3><p>如您未满十四周岁，请在监护人陪同下使用本服务，并由监护人阅读和确认本说明。</p></section><section><h3>七、联系我们</h3><p>如对图像信息处理有疑问，或希望行使相关权利，请联系现场工作人员。实际运营主体及联系方式以现场公示信息为准。</p></section></div><div class="modal-actions privacy-modal-actions"><button class="primary-btn" data-close>我已了解</button></div>`);
}

function ensureDesign(combo) {
  if (combo && !state.designHistory.includes(combo.id)) state.designHistory.unshift(combo.id);
}

function combine() {
  if (!state.styleId || !state.fabricId) {
    render();
    return;
  }
  const combo = getExactCombo();
  if (!combo) {
    state.comboId = null;
    toast("该组合尚未配置预制素材");
    return;
  }
  if (state.designHistory.includes(combo.id)) {
    state.comboId = combo.id;
    toast("已切换到本次体验中的已有方案");
    return;
  }
  state.generating = true;
  state.pendingFabricId = state.fabricId;
  render();
  window.setTimeout(() => {
    state.generating = false;
    state.pendingFabricId = null;
    state.comboId = combo.id;
    ensureDesign(combo);
    toast("新方案已生成并保留");
  }, 800);
}

function openBackgroundSelect(mode = "new") {
  const combo = getActiveCombo();
  if (!combo) {
    toast("请先选择一套可试穿方案");
    return;
  }
  if (!Object.keys(combo.tryonByBackground || {}).length) {
    toast("当前方案暂无预制图片试衣素材");
    return;
  }
  state.comboId = combo.id;
  state.styleId = combo.styleId;
  state.fabricId = combo.fabricId;
  ensureDesign(combo);
  state.backgroundMode = mode;
  go("backgroundSelect");
}

function tryonModeView() {
  const isRealtime = state.tryonMode === "realtime";
  return `${topbar(isRealtime ? "实时试穿" : "图片试穿")}<section class="page center-page tryon-mode-page"><div class="tryon-mode-panel panel"><p class="section-kicker">TRY-ON MODE</p><h1>选择试穿方式</h1><p>可单件试穿，也可以先完成一套搭配。</p><div class="tryon-mode-grid"><button class="tryon-mode-card" data-tryon-choice="single"><strong>单件试穿</strong><span>直接试穿当前方案</span></button><button class="tryon-mode-card" data-tryon-choice="auto"><strong>自动搭配</strong><span>使用预制推荐搭配流程</span></button><button class="tryon-mode-card featured" data-tryon-choice="manual"><strong>手动搭配</strong><span>从款式库选择搭配款</span></button></div></div></section>`;
}

function manualPairingView() {
  const current = getActiveCombo();
  const candidates = config.pairingItems.filter(item => !item.styleIds || item.styleIds.includes(current?.styleId));
  const selected = getPairingItem(state.pairingStyleId);
  return `${topbar("手动搭配")}<section class="page manual-pairing-page"><div class="manual-pairing-heading"><p class="section-kicker">STYLE LIBRARY</p><h1>选择搭配款</h1><p>当前主款：${current ? getStyle(current.styleId).name : "未选择"}。选择一件有预制结果的搭配单品后继续试穿。</p></div><div class="library-grid manual-pairing-grid">${candidates.length ? candidates.map(item => `<button class="product-card ${state.pairingStyleId === item.id ? "active" : ""}" data-pairing-style="${item.id}"><img src="${item.image}" alt="${item.name}"><span class="body"><h3>${item.name}</h3><p>${item.sampleNo}</p></span></button>`).join("") : `<div class="empty-state"><b>暂无已配置搭配款</b>当前款式可返回选择单件试穿。</div>`}</div><div class="manual-pairing-footer"><span>${selected ? `已选择：${selected.name}` : "请选择一件搭配款"}</span><button class="primary-btn" data-confirm-pairing ${selected ? "" : "disabled"}>确认搭配并试穿</button></div></section>`;
}

function createImageResult(comboId, backgroundId, append = false) {
  const combo = getCombination(comboId);
  const media = combo?.tryonByBackground?.[backgroundId] || Object.values(combo?.tryonByBackground || {})[0];
  if (!combo || !media) {
    toast("当前方案暂无预制试衣结果");
    return false;
  }
  ensureDesign(combo);
  const baseId = `image-${comboId}-${backgroundId}`;
  const id = append ? `${baseId}-${++state.tryOnSequence}` : baseId;
  let result = append ? null : state.tryOnHistory.find(item => item.id === id);
  if (!result) {
    result = { id, type: "image", comboId, backgroundId, media };
    state.tryOnHistory.unshift(result);
  }
  state.selectedTryOnId = id;
  state.backgroundId = backgroundId;
  return true;
}

function generateVideoResult() {
  const current = getSelectedTryOn();
  if (!current || current.type !== "image") return;
  const combo = getCombination(current.comboId);
  const id = `video-${current.comboId}-${current.backgroundId}`;
  let result = state.tryOnHistory.find(item => item.id === id);
  if (!result) {
    result = { id, type: "video", comboId: current.comboId, backgroundId: current.backgroundId, media: combo.video };
    state.tryOnHistory.unshift(result);
    state.selectedTryOnId = id;
    toast("视频已生成并加入本次试穿");
    return;
  }
  state.selectedTryOnId = id;
  toast("已打开该结果生成过的视频");
}

function ensureRealtimeResult(combo) {
  ensureDesign(combo);
  const id = `realtime-${combo.id}`;
  if (!state.tryOnHistory.some(item => item.id === id)) state.tryOnHistory.unshift({ id, type: "realtime", comboId: combo.id, backgroundId: null, media: combo.realtime });
  state.realtimeComboId = combo.id;
}

function startImageTryOn() {
  const combo = getActiveCombo();
  if (!combo) {
    toast("请先完成一套方案");
    return;
  }
  ensureDesign(combo);
  state.tryonMode = "image";
  state.pairingStyleId = null;
  go("tryonMode");
}

function confirmBackgroundSelection() {
  const combo = getActiveCombo();
  if (!combo) {
    toast("请先完成一套方案");
    return;
  }
  if (state.backgroundMode !== "change" && !state.photo) {
    state.captureTarget = "imageTryon";
    go("camera");
    return;
  }
  createImageResult(combo.id, state.backgroundId);
  go("imageTryon", false);
}

function completeCapture() {
  state.photo = true;
  if (state.captureTarget === "imageTryon") {
    const combo = getActiveCombo();
    if (combo) createImageResult(combo.id, state.backgroundId);
    go("imageTryon", false);
    return;
  }
  goToReport();
}

function continueDesign() {
  go(state.flowSource === "studio" ? "studio" : "detail");
}

function continueTryOn() {
  if (state.tryonMode === "realtime") {
    const combo = getActiveCombo();
    if (!combo) return;
    ensureRealtimeResult(combo);
    go("realtime");
    return;
  }
  openBackgroundSelect("new");
}

function chooseTryOnMode(mode) {
  if (mode === "manual") {
    state.pairingStyleId = null;
    go("manualPairing");
    return;
  }
  state.pairingStyleId = null;
  const combo = getActiveCombo();
  if (mode === "auto" && combo?.pairingItemId) state.pairingStyleId = combo.pairingItemId;
  continueTryOn();
}

function startRealtimeTryOn() {
  const combo = getActiveCombo();
  if (!combo) {
    toast("请先完成一套方案");
    return;
  }
  state.tryonMode = "realtime";
  state.pairingStyleId = null;
  go("tryonMode");
}

function goToReport() {
  if (state.reportReady) {
    go(state.recommendationMode === "recommendations" ? "recommendationList" : "report");
    return;
  }
  go("loading");
  window.setTimeout(() => {
    state.reportReady = true;
    go(state.recommendationMode === "recommendations" ? "recommendationList" : "report", false);
  }, 2100);
}

function bindModal() {
  const modalElement = document.querySelector("#modal");
  modalElement.querySelectorAll("[data-close]").forEach(button => button.onclick = () => modalElement.remove());
  modalElement.querySelectorAll("[data-scan-item]").forEach(button => button.onclick = () => {
    modalElement.remove();
    applyScannedItem(button.dataset.scanTarget, button.dataset.scanItem, button.dataset.scanCode);
  });
  modalElement.querySelectorAll("[data-modal-fabric]").forEach(button => button.onclick = () => {
    state.fabricId = button.dataset.modalFabric;
    modalElement.remove();
    combine();
  });
  modalElement.querySelectorAll("[data-try-scheme]").forEach(button => button.onclick = () => {
    const combo = getCombination(button.dataset.tryScheme);
    if (!combo || button.disabled) return;
    modalElement.classList.add("is-trying");
    button.classList.add("trying");
    button.disabled = true;
    state.comboId = combo.id;
    state.styleId = combo.styleId;
    state.fabricId = combo.fabricId;
    window.setTimeout(() => {
      createImageResult(combo.id, button.dataset.backgroundId || state.backgroundId, true);
      modalElement.remove();
      state.view = "imageTryon";
      toast("已新增试穿结果");
    }, 650);
  });
  modalElement.querySelectorAll("[data-new-design]").forEach(button => button.onclick = () => {
    const current = getSelectedTryOn();
    const combo = current ? getCombination(current.comboId) : getActiveCombo();
    if (combo) {
      state.styleId = combo.styleId;
      state.fabricId = combo.fabricId;
      state.comboId = combo.id;
    }
    modalElement.remove();
    continueDesign();
  });
}

function bind() {
  document.querySelectorAll("[data-go]").forEach(button => button.onclick = () => go(button.dataset.go));
  document.querySelectorAll("[data-back]").forEach(button => button.onclick = back);
  document.querySelectorAll("[data-home]").forEach(button => button.onclick = reset);
  document.querySelectorAll("[data-open-studio]").forEach(button => button.onclick = () => { state.flowSource = "studio"; go("studio"); });
  document.querySelectorAll("[data-consent-check]").forEach(input => input.onchange = () => { state.consentAccepted = input.checked; const start = document.querySelector("[data-diagnosis-camera]"); if (start) start.disabled = !input.checked; });
  document.querySelectorAll("[data-recommendation-mode]").forEach(input => input.onchange = () => { state.recommendationMode = input.value; render(); });
  document.querySelectorAll("[data-privacy]").forEach(button => button.onclick = privacyModal);
  document.querySelectorAll("[data-decline]").forEach(button => button.onclick = reset);
  document.querySelectorAll("[data-diagnosis-camera]").forEach(button => button.onclick = () => { if (!state.consentAccepted) return; state.captureTarget = "diagnosis"; state.flowSource = "recommendation"; go("camera"); });
  document.querySelectorAll("[data-capture]").forEach(button => button.onclick = completeCapture);
  document.querySelectorAll("[data-detail-style]").forEach(button => button.onclick = () => {
    state.styleId = button.dataset.detailStyle;
    const recommendationCombo = getCombination(button.dataset.recommendationCombo);
    state.fabricId = recommendationCombo?.fabricId || null;
    state.comboId = recommendationCombo?.id || null;
    if (recommendationCombo) ensureDesign(recommendationCombo);
    state.flowSource = "recommendation";
    go("detail");
  });
  document.querySelectorAll("[data-open-fabrics]").forEach(button => button.onclick = fabricModal);
  document.querySelectorAll("[data-detail-version]").forEach(button => button.onclick = () => {
    if (button.dataset.detailVersion === "base") {
      state.comboId = null;
      state.fabricId = null;
    } else {
      const combo = getCombination(button.dataset.detailVersion);
      state.comboId = combo.id;
      state.fabricId = combo.fabricId;
    }
    render();
  });
  document.querySelectorAll("[data-tab]").forEach(button => button.onclick = () => { state.libraryTab = button.dataset.tab; render(); });
  document.querySelectorAll("[data-select-style]").forEach(button => button.onclick = () => { state.styleId = button.dataset.selectStyle; state.comboId = null; combine(); });
  document.querySelectorAll("[data-select-fabric]").forEach(button => button.onclick = () => { state.fabricId = button.dataset.selectFabric; state.comboId = null; combine(); });
  document.querySelectorAll("[data-clear]").forEach(button => button.onclick = () => { if (button.dataset.clear === "style") state.styleId = null; else state.fabricId = null; state.comboId = null; render(); });
  document.querySelectorAll("[data-studio-scheme]").forEach(button => button.onclick = () => {
    const combo = getCombination(button.dataset.studioScheme);
    if (!combo) return;
    state.comboId = combo.id;
    state.styleId = combo.styleId;
    state.fabricId = combo.fabricId;
    render();
  });
  document.querySelectorAll("[data-scan]").forEach(button => button.onclick = () => scanModal("style"));
  document.querySelectorAll("[data-open-scan]").forEach(button => button.onclick = () => scanModal(button.dataset.openScan));
  document.querySelectorAll("[data-schemes]").forEach(button => button.onclick = schemesModal);
  document.querySelectorAll("[data-image-tryon]").forEach(button => button.onclick = startImageTryOn);
  document.querySelectorAll("[data-realtime-tryon]").forEach(button => button.onclick = startRealtimeTryOn);
  document.querySelectorAll("[data-tryon-choice]").forEach(button => button.onclick = () => chooseTryOnMode(button.dataset.tryonChoice));
  document.querySelectorAll("[data-pairing-style]").forEach(button => button.onclick = () => { state.pairingStyleId = button.dataset.pairingStyle; render(); });
  document.querySelectorAll("[data-confirm-pairing]").forEach(button => button.onclick = () => { if (state.pairingStyleId) continueTryOn(); });
  document.querySelectorAll("[data-background]").forEach(button => button.onclick = () => { state.backgroundId = button.dataset.background; render(); });
  document.querySelectorAll("[data-confirm-background]").forEach(button => button.onclick = confirmBackgroundSelection);
  document.querySelectorAll("[data-tryon-result]").forEach(button => button.onclick = () => {
    const result = state.tryOnHistory.find(item => item.id === button.dataset.tryonResult);
    const combo = result && getCombination(result.comboId);
    state.selectedTryOnId = button.dataset.tryonResult;
    if (combo) {
      state.comboId = combo.id;
      state.styleId = combo.styleId;
      state.fabricId = combo.fabricId;
    }
    if (result?.backgroundId) state.backgroundId = result.backgroundId;
    render();
  });
  document.querySelectorAll("[data-change-background]").forEach(button => button.onclick = () => openBackgroundSelect("change"));
  document.querySelectorAll("[data-generate-video]").forEach(button => button.onclick = generateVideoResult);
  document.querySelectorAll("[data-other-recommendation]").forEach(button => button.onclick = goToReport);
  document.querySelectorAll("[data-continue-design]").forEach(button => button.onclick = continueDesign);
  document.querySelectorAll("[data-realtime-scheme]").forEach(button => button.onclick = () => { const combo = getCombination(button.dataset.realtimeScheme); ensureRealtimeResult(combo); render(); });
  document.querySelectorAll("[data-return-flow]").forEach(button => button.onclick = () => {
    if (state.flowSource === "studio") go("studio");
    else goToReport();
  });
}

function fitScreen() {
  const scale = Math.min(window.innerWidth / 1215, window.innerHeight / 2160);
  document.documentElement.style.setProperty("--screen-scale", Math.max(scale, 0.1).toFixed(4));
}

window.addEventListener("resize", fitScreen);
window.visualViewport?.addEventListener("resize", fitScreen);
fitScreen();
render();
