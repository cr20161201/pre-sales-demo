const assets = {
  uniqloLogo: "./assets/logo.png",
  toteBag: "./assets/图片1.png",
  umbrella: "./assets/图片2.png",
  bluePolo: "./assets/图片3.png",
  navyPolo: "./assets/图片4.png",
  stripedTee: "./assets/图片5.png",
  denimPants: "./assets/图片6.png",
  stripedDenimLook: "./assets/图片7.png",
  redStripedTee: "./assets/图片8.png",
  whitePants: "./assets/图片9.png",
  redStripeWhiteLook: "./assets/图片10.png",
  darkPolo: "./assets/图片11.png",
  easyShorts: "./assets/图片12.png",
  navyPoloShortsLook: "./assets/图片13.png",
  greenPoloShortsLook: "./assets/图片14.png",
  greenPolo: "./assets/图片15.png",
  kidsTop: "./assets/图片16.png",
  kidsSkirt: "./assets/图片17.png",
  kidsLook: "./assets/图片18.png",
  pajamaModel: "./assets/图片19.png",
  pajamaLifestyle: "./assets/图片20.png",
  outdoorLook: "./assets/图片21.png",
  orangeTee: "./assets/图片22.png",
  orangeStoreLook: "./assets/图片23.png",
  blackPants: "./assets/图片24.png",
  orangeBlackLook: "./assets/图片25.png",
  sizeTanModels: "./assets/图片26.png",
  tanTee: "./assets/图片27.png",
  sizeMonoModels: "./assets/图片28.png",
};

const products = [
  {
    id: "uq-101",
    name: "DRY-EX POLO衫",
    category: "POLO",
    color: "浅蓝",
    material: "速干网眼面料",
    image: assets.bluePolo,
    sourceImages: [
      { label: "主图", image: assets.bluePolo },
      { label: "门店参考", image: assets.navyPoloShortsLook },
      { label: "材质参考", image: assets.greenPolo },
    ],
    aiImages: [
      { label: "指定模特图", status: "审核中", image: assets.navyPoloShortsLook },
      { label: "商品对比图", status: "已通过", image: assets.greenPoloShortsLook },
      { label: "材质展示图", status: "未通过", image: assets.greenPolo },
    ],
  },
  {
    id: "uq-102",
    name: "条纹圆领T恤",
    category: "上衣",
    color: "灰白条纹",
    material: "棉混纺",
    image: assets.stripedTee,
    sourceImages: [
      { label: "主图", image: assets.stripedTee },
      { label: "搭配参考", image: assets.denimPants },
      { label: "门店参考", image: assets.stripedDenimLook },
    ],
    aiImages: [
      { label: "尺码展示图", status: "审核中", image: assets.sizeMonoModels },
      { label: "商品对比图", status: "生成中", image: assets.redStripedTee },
    ],
  },
  {
    id: "uq-103",
    name: "男装POLO衫",
    category: "POLO",
    color: "海军蓝",
    material: "棉质珠地",
    image: assets.darkPolo,
    sourceImages: [
      { label: "主图", image: assets.darkPolo },
      { label: "对比商品", image: assets.greenPolo },
      { label: "场景参考", image: assets.navyPoloShortsLook },
    ],
    aiImages: [
      { label: "材质展示图", status: "未通过", image: assets.navyPolo },
      { label: "商品对比图", status: "审核中", image: assets.greenPoloShortsLook },
      { label: "指定模特图", status: "审核中", image: assets.navyPoloShortsLook },
    ],
  },
  {
    id: "uq-104",
    name: "UT图案T恤",
    category: "T恤",
    color: "橙色",
    material: "棉质平纹",
    image: assets.orangeTee,
    sourceImages: [
      { label: "主图", image: assets.orangeTee },
      { label: "搭配参考", image: assets.blackPants },
      { label: "团定底图", image: assets.tanTee },
    ],
    aiImages: [
      { label: "尺码展示图", status: "已通过", image: assets.sizeTanModels },
      { label: "指定模特图", status: "已通过", image: assets.orangeStoreLook },
    ],
  },
  {
    id: "uq-105",
    name: "女装睡衣套装",
    category: "家居服",
    color: "浅蓝条纹",
    material: "柔软棉质",
    image: assets.pajamaModel,
    sourceImages: [
      { label: "主图", image: assets.pajamaModel },
      { label: "生活方式", image: assets.pajamaLifestyle },
      { label: "场景参考", image: assets.outdoorLook },
    ],
    aiImages: [
      { label: "指定模特图", status: "已通过", image: assets.pajamaLifestyle },
      { label: "产品细节图", status: "审核中", image: assets.pajamaModel },
    ],
  },
];

const references = [
  { id: "ref-01", name: "宽腿牛仔裤", type: "搭配单品", tone: "休闲", image: assets.denimPants },
  { id: "ref-02", name: "门店陈列场景", type: "场景参考", tone: "门店", image: assets.stripedDenimLook },
  { id: "ref-03", name: "POLO材质参考", type: "材质参考", tone: "速干", image: assets.greenPolo },
  { id: "ref-04", name: "尺码模特参考", type: "尺码参考", tone: "身高对比", image: assets.sizeTanModels },
  { id: "ref-05", name: "便携雨伞", type: "配件参考", tone: "功能配件", image: assets.umbrella },
  { id: "ref-06", name: "条纹T恤对比款", type: "对比商品", tone: "条纹", image: assets.redStripedTee },
];

const generatedResults = [
  { id: "img-01", product: "DRY-EX POLO衫", type: "指定模特图", status: "待审核", ratio: "4:5", image: assets.navyPoloShortsLook },
  { id: "img-02", product: "条纹圆领T恤", type: "尺码展示图", status: "待审核", ratio: "1:1", image: assets.sizeMonoModels },
  { id: "img-03", product: "男装POLO衫", type: "材质展示图", status: "需微调", ratio: "3:4", image: assets.greenPolo },
  { id: "img-04", product: "女装睡衣套装", type: "指定模特图", status: "已通过", ratio: "4:5", image: assets.pajamaLifestyle },
];

const productionTasks = [
  {
    id: "TASK-2406",
    title: "春夏新品指定模特图",
    type: "指定模特图",
    products: 18,
    images: 72,
    owner: "王运营",
    createdAt: "今日 10:24",
    status: "生成中",
    progress: 64,
    stage: "AI 生成",
    source: "款式库批量创建",
  },
  {
    id: "TASK-2405",
    title: "针织系列材质展示图",
    type: "材质展示图",
    products: 12,
    images: 36,
    owner: "李运营",
    createdAt: "昨日 18:12",
    status: "已完成",
    progress: 100,
    stage: "生成完成",
    source: "AI工具创建",
  },
  {
    id: "TASK-2404",
    title: "外套类商品对比图",
    type: "商品对比",
    products: 10,
    images: 30,
    owner: "赵运营",
    createdAt: "昨日 15:46",
    status: "失败",
    progress: 48,
    stage: "参照图缺失",
    source: "参照组任务",
  },
  {
    id: "TASK-2403",
    title: "POLO 尺码展示图",
    type: "尺码展示图",
    products: 8,
    images: 24,
    owner: "王运营",
    createdAt: "06-11 14:20",
    status: "已完成",
    progress: 100,
    stage: "可下载",
    source: "自动批量",
  },
];

const reviewTasks = [
  { id: "TASK-2405", title: "针织系列材质展示图", type: "材质展示图", total: 36, pass: 22, reject: 2, pending: 12, status: "审核中", stage: 3, updatedAt: "12 分钟前" },
  { id: "TASK-2404", title: "外套类商品对比图", type: "商品对比图", total: 30, pass: 20, reject: 2, pending: 8, status: "审核中", stage: 3, updatedAt: "28 分钟前" },
  { id: "TASK-2403", title: "POLO 尺码对比图", type: "尺码对比图", total: 24, pass: 24, reject: 0, pending: 0, status: "已审核", stage: 4, updatedAt: "昨日 16:08" },
  { id: "TASK-2401", title: "秋冬外套指定模特图", type: "指定模特图", total: 48, pass: 45, reject: 3, pending: 0, status: "已审核", stage: 4, updatedAt: "06-10 09:32" },
];

const state = {
  view: "home",
  operatorTab: "tools",
  stylePage: "list",
  styleViewMode: "grid",
  styleCategoryFilter: "全部",
  styleContentFilter: "全部",
  accountMenuOpen: false,
  assetTypeFilter: "全部",
  assetColorFilter: "全部",
  selectedAssetIds: [],
  submittedAssetIds: [],
  deletedAssetIds: [],
  uploadedAssetCount: 0,
  previewAssetId: "",
  taskDrawerId: "",
  reviewDrawerId: "",
  auditStatusFilter: "待审核",
  selectedAuditIds: [],
  sizeAdjustOpen: false,
  aiToolPage: "list",
  aiWorkbenchAbility: "尺码展示图",
  aiWorkbenchTaskId: "ai-sample-01",
  profileDrawerOpen: false,
  profileDrawerEditing: false,
  aiCreateDrawerOpen: false,
  aiCreateType: "虚拟模特着装",
  aiCreateSource: "style",
  taskTypeFilter: "指定模特图",
  profileSaved: false,
  adminTab: "review",
  designerMode: "guided",
  designerStep: 1,
  selectedDesignerProductId: "uq-104",
  selectedCraft: "刺绣",
  selectedModel: "门店模特",
  selectedScene: "标准白底",
  selectedProductId: products[0].id,
  mainBasket: [products[0].id, products[1].id],
  referenceBasket: [references[0].id, references[2].id],
  taskCreated: false,
  approvedCount: 1,
  exportReady: false,
  logoSize: 20,
  logoPosition: "左胸",
  freeLogo: { x: 52, y: 39, size: 20 },
  aiParamValues: {},
};

const app = document.querySelector("#app");

function render() {
  app.innerHTML = `
    <main class="app-shell">
      ${state.view === "home" ? renderTopbar() : ""}
      ${state.view === "home" ? renderHome() : ""}
      ${state.view === "operator" ? renderOperator() : ""}
      ${state.view === "designer" ? renderDesigner() : ""}
      ${state.view === "admin" ? renderAdmin() : ""}
    </main>`;
  bindEvents();
}

function renderTopbar() {
  return `
    <header class="topbar">
      <button class="brand" data-view="home" aria-label="返回入口">
        ${brandLogo("brand-mark")}
        <span>
          <strong>UNIQLO Content Studio</strong>
          <em>商品内容生产工作台</em>
        </span>
      </button>
      <div class="user-area">
        <button class="top-icon-btn lang-switch" data-lang-switch="en" aria-label="Switch to English">EN</button>
        <button class="top-icon-btn" aria-label="搜索">搜索</button>
        <button class="top-icon-btn" aria-label="通知">通知</button>
        <button class="top-icon-btn" aria-label="帮助">帮助</button>
        <div class="account-menu-wrap">
          <button class="account-button" data-account-menu>
            <span class="avatar">运</span>
            <span>运营账号</span>
            <em>⌄</em>
          </button>
          ${state.accountMenuOpen ? renderAccountMenu() : ""}
        </div>
      </div>
    </header>`;
}

function renderHome() {
  return `
    <section class="home-layout">
      <div class="hero-copy">
        <p class="eyebrow">Pre-sales clickable demo</p>
        <h1>AI商品视觉内容生成平台</h1>
      </div>
      <section class="entry-grid">
        ${entryCard("operator", "运营端 AI 工具", "AI工具、任务列表、素材图片。", "进入运营端")}
        ${entryCard("designer", "B端团定设计工具", "衣服 + Logo，支持选项式生成和 2D 自由编辑。", "进入设计工具")}
        ${entryCard("admin", "AI运营管理后台", "审核、员工角色、Prompt 优化与词库管理。", "进入后台")}
      </section>
    </section>`;
}

function entryCard(view, title, desc, action) {
  return `
    <article class="entry-card">
      <div>
        <h2>${title}</h2>
        <p>${desc}</p>
      </div>
      <button class="primary-btn" data-view="${view}">${action}</button>
    </article>`;
}

function renderOperator() {
  return `
    <section class="workbench operator-workbench">
      ${renderSideNav("operator", "商品内容生产", "运营工作台", [
        ["operatorTab", "tools", "AI工具", "spark"],
        ["operatorTab", "task", "任务列表", "tasks"],
        ["operatorTab", "audit", "素材图片", "review"],
      ])}
      <section class="work-area">
        ${state.operatorTab === "styles" ? renderStyleLibrary() : ""}
        ${state.operatorTab === "tools" ? renderAiTools() : ""}
        ${state.operatorTab === "task" ? renderGenerationTask() : ""}
        ${state.operatorTab === "audit" ? renderImageAudit() : ""}
      </section>
      ${state.aiCreateDrawerOpen ? renderAiCreateDrawer() : ""}
      ${state.sizeAdjustOpen && state.aiCreateDrawerOpen ? renderSizeAdjustModal(aiWorkbenchTasks()[0]) : ""}
    </section>`;
}

function renderSideNav(scope, title, subtitle, items) {
  return `
    <aside class="side-nav" aria-label="${title}">
      <div class="side-nav-brand">
        <button class="side-brand-mark" data-view="home">${brandLogo("brand-logo-inner")}</button>
        <div>
          <strong>${title}</strong>
          <span>${subtitle}</span>
        </div>
      </div>
      <nav class="side-menu">
        ${items.map(([key, value, label, icon]) => sideButton(key, value, label, icon)).join("")}
      </nav>
      <div class="side-footer">
        <div class="side-tools">
          <button class="side-tool-btn" aria-label="系统工具">${navIcon("settings")}</button>
          <button class="side-tool-btn" aria-label="通知">${navIcon("bell")}</button>
        </div>
        <div class="account-menu-wrap side-account-wrap">
          <button class="side-account" data-account-menu>
            <span class="avatar">${scope === "admin" ? "管" : "运"}</span>
            <span>
              <strong>${scope === "admin" ? "管理员" : "运营账号"}</strong>
              <em>${scope === "admin" ? "管理员" : "运营账号"}</em>
            </span>
            <b>⌄</b>
          </button>
          ${state.accountMenuOpen ? renderAccountMenu("side") : ""}
        </div>
      </div>
    </aside>`;
}

function brandLogo(className = "") {
  return `<span class="${className} brand-logo"><strong>UNI</strong><strong>QLO</strong></span>`;
}

function renderAccountMenu(placement = "top") {
  return `
    <div class="account-menu ${placement === "side" ? "side-account-menu" : ""}">
      <span class="menu-label">切换系统</span>
      <button class="${state.view === "operator" ? "active" : ""}" data-view="operator">运营端 AI 工具</button>
      <button class="${state.view === "designer" ? "active" : ""}" data-view="designer">B 端团定设计</button>
      <button class="${state.view === "admin" ? "active" : ""}" data-view="admin">AI 运营后台</button>
      <span class="menu-label">账号</span>
      <button>个人设置</button>
      <button>退出登录</button>
    </div>`;
}

function sideButton(key, value, label, icon = "") {
  const active = state[key] === value;
  return `
    <button class="side-link ${active ? "active" : ""}" title="${label}" data-label="${label}" data-state-key="${key}" data-state-value="${value}">
      ${navIcon(icon || value)}
      <span>${label}</span>
    </button>`;
}

function navIcon(name) {
  const icons = {
    library: '<svg viewBox="0 0 1024 1024" aria-hidden="true" data-icon-fill="true"><path d="M966.07744 211.935232L825.32352 99.335168c-16.893952-13.546496-38.156288-21.00736-59.870208-21.00736H258.578432c-21.71392 0-42.976256 7.45984-59.833344 20.97664L57.906176 211.955712c-31.1552 24.969216-43.598848 67.18976-30.96576 105.058304L83.28192 485.992448c9.393152 28.140544 31.747072 50.671616 59.754496 60.254208a95.270912 95.270912 0 0 0 19.781632 4.514816V849.90976c0 52.80256 42.957824 95.762432 95.761408 95.762432h506.875904c52.791296 0 95.73888-42.958848 95.73888-95.762432V550.761472a95.80544 95.80544 0 0 0 19.776512-4.504576c28.029952-9.604096 50.369536-32.132096 59.764736-60.280832l56.298496-168.920064c12.674048-37.878784 0.244736-80.113664-30.956544-105.120768z m-333.632512-54.759424c-4.007936 15.77984-14.404608 30.675968-30.26432 42.994688-23.66464 18.382848-55.694336 28.507136-90.187776 28.507136-34.49344 0-66.522112-10.124288-90.186752-28.507136-15.858688-12.31872-26.256384-27.214848-30.26432-42.994688h240.903168z m289.801216 134.902784l-56.308736 168.948736c-1.65888 4.970496-5.593088 8.946688-10.510336 10.631168-4.598784 1.574912-9.776128 1.068032-13.971456-1.349632l-59.111424-34.069504V849.90976c0 9.325568-7.576576 16.914432-16.89088 16.914432H258.578432c-9.325568 0-16.913408-7.58784-16.913408-16.914432V436.23936l-59.111424 34.069504c-4.185088 2.41152-9.37472 2.920448-13.950976 1.349632-4.934656-1.688576-8.871936-5.66272-10.525696-10.61888L101.738496 292.068352c-2.235392-6.699008-0.033792-14.168064 5.44768-18.561024L248.032256 160.84992c2.955264-2.368512 6.700032-3.674112 10.546176-3.674112h53.039104c1.942528 18.384896 7.532544 36.173824 16.720896 53.04832 10.75712 19.75808 25.929728 37.325824 45.097984 52.214784 37.428224 29.075456 86.634496 45.08672 138.55744 45.08672s101.13024-16.012288 138.558464-45.08672c19.167232-14.88896 34.340864-32.45568 45.097984-52.214784 9.188352-16.874496 14.778368-34.663424 16.720896-53.04832h53.08416c3.846144 0 7.590912 1.304576 10.579968 3.700736l140.760064 112.606208c5.505024 4.41344 7.701504 11.86816 5.450752 18.59584z"/></svg>',
    spark: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z"/><path d="M18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z"/></svg>',
    tasks: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6h14"/><path d="M5 12h14"/><path d="M5 18h10"/><path d="M4 6h.01"/><path d="M4 12h.01"/><path d="M4 18h.01"/></svg>',
    review: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14v14H5z"/><path d="M8 12l2.5 2.5L16 9"/></svg>',
    chart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19V5"/><path d="M5 19h14"/><path d="M9 16v-5"/><path d="M13 16V8"/><path d="M17 16v-3"/></svg>',
    grid: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h7v7H4z"/><path d="M13 4h7v7h-7z"/><path d="M4 13h7v7H4z"/><path d="M13 13h7v7h-7z"/></svg>',
    list: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6h12"/><path d="M8 12h12"/><path d="M8 18h12"/><path d="M4 6h.01"/><path d="M4 12h.01"/><path d="M4 18h.01"/></svg>',
    dashboard: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h7v6H4z"/><path d="M13 5h7v4h-7z"/><path d="M13 11h7v8h-7z"/><path d="M4 13h7v6H4z"/></svg>',
    prompt: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6h14v10H8l-3 3z"/><path d="M8 10h8"/><path d="M8 13h5"/></svg>',
    roles: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M3 19a5 5 0 0 1 10 0"/><path d="M17 11a2.5 2.5 0 1 0 0-5"/><path d="M15 15a4.5 4.5 0 0 1 6 4"/></svg>',
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.8 18a7.2 7.2 0 1 0 0-14.4 7.2 7.2 0 0 0 0 14.4z"/><path d="M16 16l4 4"/></svg>',
    bell: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg>',
    settings: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"/><path d="M18.5 12a6.8 6.8 0 0 0-.1-1.1l2-1.5-2-3.4-2.4 1a7.2 7.2 0 0 0-1.9-1.1L13.8 3h-3.6l-.4 2.9A7.2 7.2 0 0 0 8 7L5.6 6l-2 3.4 2 1.5a6.8 6.8 0 0 0 0 2.2l-2 1.5 2 3.4L8 17a7.2 7.2 0 0 0 1.9 1.1l.4 2.9h3.6l.4-2.9A7.2 7.2 0 0 0 16 17l2.4 1 2-3.4-2-1.5c.1-.4.1-.7.1-1.1z"/></svg>',
  };
  return `<span class="side-icon">${icons[name] || icons.library}</span>`;
}

function renderStyleLibrary() {
  if (state.stylePage === "content") return renderStyleContentHome();
  if (state.stylePage === "profileEdit") return renderProfileEditPage();

  return `
    <div class="toolbar-head">
      <h1>款式库</h1>
    </div>
    <section class="library-control-bar">
      <label class="library-search">
        ${navIcon("search")}
        <input value="" placeholder="搜索款式名称 / 款号 / 品类" />
      </label>
      <div class="library-filters">
        <select data-style-category>
          ${["全部", ...unique(products.map((product) => product.category))].map((item) => `
            <option value="${item}" ${state.styleCategoryFilter === item ? "selected" : ""}>${item}</option>
          `).join("")}
        </select>
        <select data-style-content>
          ${["全部", "有审核中素材", "有未审核素材", "素材完整"].map((item) => `
            <option value="${item}" ${state.styleContentFilter === item ? "selected" : ""}>${item}</option>
          `).join("")}
        </select>
        <div class="view-toggle" aria-label="切换款式库视图">
          <button class="icon-btn ${state.styleViewMode === "grid" ? "active" : ""}" title="大图模式" aria-label="大图模式" data-style-view="grid">${navIcon("grid")}</button>
          <button class="icon-btn ${state.styleViewMode === "list" ? "active" : ""}" title="列表模式" aria-label="列表模式" data-style-view="list">${navIcon("list")}</button>
        </div>
        <button class="ghost-btn">批量导入</button>
        <button class="primary-btn">新建款式档案</button>
      </div>
    </section>
    ${state.styleViewMode === "grid" ? renderStyleGrid() : renderStyleList()}`;
}

function renderStyleGrid() {
  const items = filteredProducts();
  if (!items.length) return emptyStyles();
  return `
    <section class="style-grid">
      ${items.map((product) => styleCard(product)).join("")}
    </section>`;
}

function renderStyleList() {
  const items = filteredProducts();
  if (!items.length) return emptyStyles();
  return `
    <section class="panel">
      <div class="table-list">
        ${items.map((product) => productRow(product)).join("")}
      </div>
    </section>`;
}

function emptyStyles() {
  return `
    <section class="panel empty-state">
      <strong>没有符合条件的款式</strong>
      <span>调整品类或素材筛选后再查看。</span>
    </section>`;
}

function styleCard(product) {
  const summary = assetSummary(product);
  return `
    <article class="style-card">
      <button class="style-card-main" data-open-style="${product.id}">
        <img src="${product.image}" alt="${product.name}" />
      </button>
      <div class="style-card-body">
        <strong>${product.name}</strong>
        <span>${product.category}</span>
        <div class="asset-overview" aria-label="素材概况">
          <div class="asset-overview-bar">
            <i class="approved" style="--w:${summary.approvedRatio}%"></i>
            <i class="reviewing" style="--w:${summary.reviewingRatio}%"></i>
            <i class="draft" style="--w:${summary.draftRatio}%"></i>
          </div>
          <em>${summary.total} 张素材 · 已审 ${summary.approved} · 审核中 ${summary.reviewing} · 未审 ${summary.draft}</em>
        </div>
      </div>
    </article>`;
}

function filteredProducts() {
  return products.filter((product) => {
    const categoryMatch = state.styleCategoryFilter === "全部" || product.category === state.styleCategoryFilter;
    const summary = assetSummary(product);
    const contentMatch =
      state.styleContentFilter === "全部" ||
      (state.styleContentFilter === "有审核中素材" && summary.reviewing > 0) ||
      (state.styleContentFilter === "有未审核素材" && summary.draft > 0) ||
      (state.styleContentFilter === "素材完整" && summary.draft === 0 && summary.reviewing === 0);
    return categoryMatch && contentMatch;
  });
}

function assetSummary(product) {
  const assets = [
    ...product.sourceImages.map(() => ({ status: "草稿" })),
    ...product.aiImages,
  ];
  const total = assets.length;
  const approved = assets.filter((asset) => asset.status === "已通过").length;
  const reviewing = assets.filter((asset) => ["审核中", "生成中"].includes(asset.status)).length;
  const draft = Math.max(total - approved - reviewing, 0);
  return {
    total,
    approved,
    reviewing,
    draft,
    approvedRatio: total ? (approved / total) * 100 : 0,
    reviewingRatio: total ? (reviewing / total) * 100 : 0,
    draftRatio: total ? (draft / total) * 100 : 0,
  };
}

function renderStyleContentHome() {
  const selected = selectedProduct();
  const assets = filteredAssets();
  const selectedCount = state.selectedAssetIds.length;
  const typeOptions = ["全部", "商品图", "尺码对比图", "材质展示图", "商品对比图", "穿搭细节图", "指定模特图"];
  const colorOptions = unique(["全部", selected.color, "全色通用", "米白", "黑色"]);
  return `
    <div class="compact-return-row">
      <button class="text-link back-link" data-style-page="list">← 返回款式库</button>
    </div>
    <section class="style-content-layout">
      <aside class="content-subnav">
        <section class="style-summary-card">
          <span>当前款式</span>
          <strong>${selected.name}</strong>
          <small>${selected.category}</small>
          <p>通勤 / 质感 / 秋冬外搭</p>
          <p>羊毛混纺长款外套，适合秋冬通勤场景。</p>
          <button class="text-link" data-profile-drawer>查看详情</button>
        </section>
        <section class="subnav-section">
          <h2>内容类型</h2>
          <div class="subnav-list">
            ${typeOptions.map((type) => `
              <button class="subnav-item ${state.assetTypeFilter === type ? "active" : ""}" data-asset-type="${type}">
                <span>${type}</span>
                <em>${assetCountBy("type", type)}</em>
              </button>
            `).join("")}
          </div>
        </section>
        <section class="subnav-section">
          <h2>颜色规格</h2>
          <div class="subnav-list">
            ${colorOptions.map((color) => `
              <button class="subnav-item ${state.assetColorFilter === color ? "active" : ""}" data-asset-color="${color}">
                <span>${color}</span>
                <em>${assetCountBy("color", color)}</em>
              </button>
            `).join("")}
          </div>
        </section>
      </aside>
      <section class="asset-manager asset-main">
        <div class="asset-main-head">
          <div>
            <h2>${selectedCount ? `已选 ${selectedCount} 张` : "图片内容"}</h2>
            <span>${selectedCount ? "草稿可发起审核，提交后进入审核中。" : `${state.assetTypeFilter} · ${state.assetColorFilter} · ${assets.length} 张`}</span>
          </div>
          <div class="head-actions">
            ${selectedCount ? `
              <button class="small-btn active" data-submit-assets>发起审核</button>
              <button class="small-btn" data-clear-assets>取消选择</button>
              <button class="danger-link" data-delete-assets>删除</button>
            ` : `
              <button class="ghost-btn" data-upload-asset>上传图片</button>
              <button class="primary-btn" data-ai-create data-ai-source="style">AI创建</button>
            `}
          </div>
        </div>
        <div class="content-asset-grid">
          ${assets.map(contentAssetCard).join("")}
        </div>
      </section>
    </section>
    ${state.previewAssetId ? renderPreviewModal() : ""}
    ${state.profileDrawerOpen ? renderProfileDrawer() : ""}`;
}

function renderAiCreateDrawer() {
  const selected = selectedProduct();
  const tools = flatAiTools();
  const currentTool = tools.find((tool) => tool.name === state.aiCreateType) || tools[0];
  const fromStyle = state.aiCreateSource === "style";
  return `
    <div class="drawer-backdrop" data-close-ai-create>
      <aside class="profile-drawer ai-create-drawer" data-drawer-panel>
        <div class="drawer-head">
          <div>
            <h2>AI创建</h2>
            <span>${currentTool.name} · ${selected.name}</span>
          </div>
          <button class="small-btn" data-close-ai-create>关闭</button>
        </div>
        <div class="ai-create-body">
          ${renderAiTargetBlock(selected, fromStyle)}
          ${renderAiTypeSelect(tools, currentTool)}
          ${renderAiCreateFields(currentTool, selected)}
          <button class="primary-btn wide" data-create-task>开始生成</button>
        </div>
      </aside>
    </div>`;
}

function renderAiTargetBlock(selected, fromStyle) {
  return `
    <section class="ai-field-block">
      <label class="ai-field-label">目标内容</label>
      <div class="ai-target-card">
        <img src="${selected.image}" alt="${selected.name}" />
        <div>
          <strong>${selected.name}</strong>
          <span>${selected.color} / M / 主图</span>
          <em>${fromStyle ? "当前款式内切换 SKU" : "默认目标，可从全库选择或上传"}</em>
        </div>
        <button class="small-btn">${fromStyle ? "切换SKU" : "切换目标"}</button>
      </div>
      ${fromStyle ? "" : `
        <div class="inline-actions">
          <button class="small-btn">从款式库选择</button>
          <button class="small-btn">上传图片</button>
        </div>
      `}
    </section>`;
}

function renderAiTypeSelect(tools, currentTool) {
  return `
    <section class="ai-field-block">
      <label class="ai-field-label">生成类型</label>
      <details class="ai-type-picker">
        <summary>
          <span>
            <strong>${currentTool.name}</strong>
            <em>${currentTool.needRef}</em>
          </span>
        </summary>
        <div class="drawer-option-list compact">
          ${tools.map((tool) => `
            <button class="drawer-option ${state.aiCreateType === tool.name ? "active" : ""}" data-ai-create-type="${tool.name}">
              <strong>${tool.name}</strong>
              <span>${tool.needRef}</span>
            </button>
          `).join("")}
        </div>
      </details>
    </section>`;
}

function renderAiCreateFields(tool, selected) {
  return `
    <section class="ai-field-stack">
      ${renderAiParamFields(tool.params || tool.fields || [], selected)}
    </section>`;
}

function renderAiField(field, selected) {
  if (!shouldShowAiField(field)) return "";
  if (field.type === "chips") return renderAiChoiceField(field.label, field.options, field.defaultValue, field.multiple);
  if (field.type === "select") return renderAiSelectField(field.label, field.options, field.defaultValue);
  if (field.type === "input") return renderAiInput(field.label, formatAiValue(field.defaultValue, selected));
  if (field.type === "size") return renderAiSizeInput(field.label, field.width, field.height);
  if (field.type === "images") return renderAiImageSelect(field.label, field.items);
  if (field.type === "upload") return renderUploadTile(field.label, field.defaultImage || selected.image);
  if (field.type === "colors") return renderAiColorField(field.label, field.options, field.defaultValue);
  if (field.type === "textarea") return renderAiTextArea(field.label, formatAiValue(field.defaultValue, selected));
  if (field.type === "action") return renderAiActionField(field.label, field.action || "进入设置");
  if (field.type === "common") return renderAiCommonParams(field);
  if (field.type === "placement") {
    return `
      <button class="placement-card" data-open-size-adjust>
        <span>${field.label}</span>
        <strong>打开定位面板</strong>
      </button>`;
  }
  return "";
}

function renderAiParamFields(params, selected) {
  return params.map((field) => renderAiField(field, selected)).join("");
}

function shouldShowAiField(field) {
  if (!field.showWhen) return true;
  return Object.entries(field.showWhen).every(([label, value]) => aiParamValue(label, value) === value);
}

function aiParamValue(label, fallback) {
  const key = aiParamKey(label);
  return state.aiParamValues[key] ?? fallback;
}

function aiParamKey(label) {
  return `${state.aiCreateType || state.aiWorkbenchAbility}:${label}`;
}

function formatAiValue(value, selected) {
  return String(value || "").replace("{material}", selected.material || "");
}

function renderAiChoiceField(label, options, defaultValue, multiple = false) {
  const currentValue = aiParamValue(label, defaultValue);
  const selectedValues = Array.isArray(currentValue) ? currentValue : [currentValue];
  return `
    <div class="ai-field-block">
      <label class="ai-field-label">${label}${multiple ? "<span>可多选</span>" : ""}</label>
      <div class="ai-chip-row">
        ${options.map((option) => `
          <button class="ai-chip ${selectedValues.includes(option) ? "active" : ""}" data-ai-param-label="${label}" data-ai-param-value="${option}" data-ai-param-multiple="${multiple ? "true" : "false"}">${option}</button>
        `).join("")}
      </div>
    </div>`;
}

function renderAiInput(label, value) {
  return `
    <label class="ai-field-block">
      <span class="ai-field-label">${label}</span>
      <input class="ai-input" value="${value}" />
    </label>`;
}

function renderAiSelectField(label, options, defaultValue) {
  return `
    <label class="ai-field-block">
      <span class="ai-field-label">${label}</span>
      <select class="ai-input">
        ${options.map((option) => `<option ${option === defaultValue ? "selected" : ""}>${option}</option>`).join("")}
      </select>
    </label>`;
}

function renderAiTextArea(label, value) {
  return `
    <label class="ai-field-block">
      <span class="ai-field-label">${label}</span>
      <textarea class="ai-input ai-textarea">${value}</textarea>
    </label>`;
}

function renderAiSizeInput(label, width, height) {
  return `
    <div class="ai-field-block">
      <label class="ai-field-label">${label}</label>
      <div class="ai-size-row">
        <label><span>宽</span><input class="ai-input" value="${width}" /></label>
        <label><span>高</span><input class="ai-input" value="${height}" /></label>
      </div>
    </div>`;
}

function renderAiColorField(label, options, defaultValue = []) {
  const selectedValues = Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  return `
    <div class="ai-field-block">
      <label class="ai-field-label">${label}<span>可多选</span></label>
      <div class="ai-color-row">
        ${options.map((option) => `
          <button class="ai-color-chip ${selectedValues.includes(option.name) ? "active" : ""}" title="${option.name}">
            <i style="background:${option.color}"></i>
            <span>${option.name}</span>
          </button>
        `).join("")}
      </div>
    </div>`;
}

function renderAiActionField(label, action) {
  return `
    <button class="placement-card">
      <span>${label}</span>
      <strong>${action}</strong>
    </button>`;
}

function renderAiCommonParams(field = {}) {
  return `
    <div class="ai-common-group">
      ${renderAiChoiceField("图片比例", ["1:1", "3:4", "4:5", "9:16", "16:9"], field.ratio || "4:5")}
      ${renderAiChoiceField("清晰度", ["1K", "2K", "4K"], field.quality || "2K")}
      ${renderAiChoiceField("生成数量", ["1 张", "2 张", "4 张", "6 张"], field.count || "4 张")}
    </div>`;
}

function renderAiImageSelect(label, items) {
  return `
    <div class="ai-field-block">
      <label class="ai-field-label">${label}</label>
      <div class="ai-image-row">
        ${items.map((item, index) => `
          <button class="ai-image-option ${index === 0 ? "active" : ""}">
            <img src="${item.image}" alt="${item.name}" />
            <span>${item.name}</span>
          </button>
        `).join("")}
      </div>
    </div>`;
}

function renderProfileDrawer() {
  const selected = selectedProduct();
  return `
    <div class="drawer-backdrop" data-close-profile-drawer>
      <aside class="profile-drawer" data-drawer-panel>
        <div class="drawer-head">
          <div>
            <h2>款式详情</h2>
            <span>${selected.id}</span>
          </div>
          <button class="small-btn" data-close-profile-drawer>关闭</button>
        </div>
        ${state.profileDrawerEditing ? `
          <div class="drawer-form">
            ${editField("款式名称", selected.name)}
            ${editField("品类", selected.category)}
            ${editField("卖点", "通勤 / 质感 / 秋冬外搭")}
            ${editField("简介", "羊毛混纺长款外套，适合秋冬通勤场景。")}
            ${editField("颜色", selected.color)}
            ${editField("材质", selected.material)}
            <div class="drawer-actions">
              <button class="ghost-btn" data-profile-view>取消</button>
              <button class="primary-btn" data-save-profile>保存</button>
            </div>
          </div>` : `
          <div class="drawer-detail">
            ${meta("款式名称", selected.name)}
            ${meta("品类", selected.category)}
            ${meta("卖点", "通勤 / 质感 / 秋冬外搭")}
            ${meta("简介", "羊毛混纺长款外套，适合秋冬通勤场景。")}
            ${meta("颜色", selected.color)}
            ${meta("材质", selected.material)}
          </div>
          <button class="primary-btn wide" data-profile-edit>编辑信息档案</button>`}
      </aside>
    </div>`;
}

function assetCountBy(kind, value) {
  return allContentAssets().filter((item) => {
    if (kind === "type") return value === "全部" || item.type === value;
    if (kind === "color") return value === "全部" || item.color === value;
    return true;
  }).length;
}

function renderProfileEditPage() {
  const selected = selectedProduct();
  return `
    <div class="toolbar-head">
      <button class="text-link back-link" data-style-page="content">← 返回内容主页</button>
    </div>
    <div class="form-action-row">
      <h1>编辑信息档案</h1>
      <button class="primary-btn" data-save-profile>${state.profileSaved ? "已保存" : "保存并返回"}</button>
    </div>
    <section class="panel profile-edit">
      ${editField("商品名称", selected.name)}
      ${editField("品类", selected.category)}
      ${editField("可用颜色", `${selected.color} / 米白 / 黑色`)}
      ${editField("材质", selected.material)}
      ${editField("商品卖点", "挺括廓形、通勤场景、秋冬外搭")}
      ${editField("搭配建议", "浅色内搭、直筒裤、短靴")}
      ${editField("禁用描述", "不使用绝对化功效描述")}
      ${editField("尺码信息", "S / M / L / XL")}
    </section>`;
}

function editField(label, value) {
  return `
    <label class="edit-field">
      <span>${label}</span>
      <input value="${value}" />
    </label>`;
}

function contentAssetCard(item) {
  const selected = state.selectedAssetIds.includes(item.id);
  return `
    <article class="content-asset-card ${selected ? "selected" : ""}" data-preview-asset="${item.id}">
      <label class="asset-check">
        <input type="checkbox" ${selected ? "checked" : ""} data-toggle-asset="${item.id}" />
        <span></span>
      </label>
      <div class="asset-image-btn">
        <img src="${item.image}" alt="${item.type}" />
      </div>
      <div class="cms-detail-head">
        <div>
          <h2>${item.type}</h2>
          <span>${item.color} · ${item.tags.join(" / ")}</span>
        </div>
        <span class="status-pill" data-status="${item.status}">${item.status}</span>
      </div>
    </article>`;
}

function renderPreviewModal() {
  const assets = filteredAssets();
  const asset = assets.find((item) => item.id === state.previewAssetId) || assets[0];
  const product = selectedProduct();
  if (!asset) return "";
  const index = Math.max(assets.findIndex((item) => item.id === asset.id), 0);
  const prev = assets[index - 1];
  const next = assets[index + 1];
  return `
    <div class="drawer-backdrop" data-close-preview>
      <aside class="profile-drawer preview-drawer" data-drawer-panel>
        <div class="drawer-head preview-drawer-head">
          <div>
            <h2>图片预览</h2>
            <span>${product.name} · ${asset.type} · ${asset.color} · ${asset.status}</span>
          </div>
          <button class="small-btn" data-close-preview>关闭</button>
        </div>
        <div class="preview-drawer-body">
          <div class="preview-image-stage">
            <button class="preview-arrow prev" ${prev ? `data-preview-asset="${prev.id}"` : "disabled"} aria-label="上一张">‹</button>
            <img src="${asset.image}" alt="${asset.type}" />
            <button class="preview-arrow next" ${next ? `data-preview-asset="${next.id}"` : "disabled"} aria-label="下一张">›</button>
            <strong class="preview-count">${index + 1} / ${assets.length}</strong>
          </div>
          <div class="preview-meta-line">
            <span>${asset.tags.join(" / ")} · ${asset.source}</span>
            <span>${asset.type} · ${asset.color}</span>
          </div>
          <div class="preview-action-row">
            <button class="primary-btn" data-ai-create data-ai-source="style">AI创建</button>
            <button class="small-btn" data-delete-one="${asset.id}">删除</button>
          </div>
        </div>
      </aside>
    </div>`;
}

function productRow(product) {
  const summary = assetSummary(product);
  return `
    <article class="product-row">
      <button class="row-main" data-open-style="${product.id}">
        <img src="${product.image}" alt="${product.name}" />
        <span>
          <strong>${product.name}</strong>
          <em>${product.category} · ${product.color} · ${product.material}</em>
        </span>
      </button>
      <div class="row-asset-summary">
        <div class="asset-overview-bar">
          <i class="approved" style="--w:${summary.approvedRatio}%"></i>
          <i class="reviewing" style="--w:${summary.reviewingRatio}%"></i>
          <i class="draft" style="--w:${summary.draftRatio}%"></i>
        </div>
        <span>${summary.total} 张素材 · 已审 ${summary.approved} · 审核中 ${summary.reviewing} · 未审 ${summary.draft}</span>
      </div>
      <button class="small-btn" data-open-style="${product.id}">进入主页</button>
    </article>`;
}

function allContentAssets() {
  const product = selectedProduct();
  const base = [
    ...product.sourceImages.map((item, index) => ({
      id: `${product.id}-source-${index}`,
      productId: product.id,
      type: item.label === "主图" || item.label === "白底图" ? "商品图" : item.label,
      color: index === 2 ? "全色通用" : product.color,
      status: state.submittedAssetIds.includes(`${product.id}-source-${index}`) ? "审核中" : "草稿",
      tags: [item.label, index === 0 ? "正面" : "参考"],
      source: "运营上传",
      image: item.image,
    })),
    ...product.aiImages.map((item, index) => ({
      id: `${product.id}-ai-${index}`,
      productId: product.id,
      type: item.label,
      color: item.label === "尺码对比图" || item.label === "商品对比图" ? "全色通用" : product.color,
      status: state.submittedAssetIds.includes(`${product.id}-ai-${index}`) ? "审核中" : item.status,
      tags: item.label.includes("模特") ? ["棚拍", "正面"] : ["AI生成"],
      source: "AI生成",
      image: item.image,
    })),
  ];

  const uploaded = Array.from({ length: state.uploadedAssetCount }, (_, index) => ({
    id: `${product.id}-uploaded-${index}`,
    productId: product.id,
    type: "商品图",
    color: product.color,
    status: state.submittedAssetIds.includes(`${product.id}-uploaded-${index}`) ? "审核中" : "草稿",
    tags: ["运营上传", "补充图"],
    source: "运营上传",
    image: product.image,
  }));

  return [...base, ...uploaded].filter((item) => !state.deletedAssetIds.includes(item.id));
}

function filteredAssets() {
  return allContentAssets().filter((item) => {
    const typeMatch = state.assetTypeFilter === "全部" || item.type === state.assetTypeFilter;
    const colorMatch = state.assetColorFilter === "全部" || item.color === state.assetColorFilter;
    return typeMatch && colorMatch;
  });
}

function renderAiTools() {
  const toolGroups = aiToolItems();
  const tools = flatAiTools();
  if (state.aiToolPage !== "workbench") {
    return `
      <section class="ai-tool-list-page">
        <div class="toolbar-head">
          <h1>AI工具</h1>
        </div>
        <div class="ai-tool-sections">
          ${toolGroups.map((group) => `
            <section class="ai-tool-section">
              <div class="ai-tool-section-head">
                <h2>${group.title}</h2>
                <span>${group.tools.length} 个工具</span>
              </div>
              <div class="ai-tool-grid">
                ${group.tools.map((tool) => `
                  <button class="ai-tool-card" data-open-ai-workbench="${tool.name}">
                    <img src="${tool.image}" alt="${tool.name}" />
                    <div>
                      <h2>${tool.name}</h2>
                      <p>${tool.desc}</p>
                    </div>
                  </button>
                `).join("")}
              </div>
            </section>
          `).join("")}
        </div>
      </section>`;
  }
  const currentTool = tools.find((tool) => tool.name === state.aiWorkbenchAbility) || tools[0];
  const tasks = aiWorkbenchTasks();
  const currentTask = tasks.find((task) => task.id === state.aiWorkbenchTaskId) || tasks[0];
  const results = aiWorkbenchResults(currentTool, currentTask);
  return `
    <section class="ai-studio">
      <aside class="ai-task-rail" aria-label="任务">
        <button class="ai-task-new">新建</button>
        ${tasks.map((task) => `
          <button class="ai-task-thumb ${currentTask.id === task.id ? "active" : ""}" data-ai-workbench-task="${task.id}">
            <img src="${task.productImage}" alt="" />
          </button>
        `).join("")}
      </aside>
      <section class="ai-params-panel">
        <div class="ai-params-scroll">
          <button class="text-link ai-tool-back" data-ai-tool-list>← AI工具</button>
          <div class="ai-ability-head">
            <select class="ai-tool-select" data-ai-workbench-select>
              ${tools.map((tool) => `
                <option value="${tool.name}" ${currentTool.name === tool.name ? "selected" : ""}>${tool.name}</option>
              `).join("")}
            </select>
          </div>
          ${renderAiWorkbenchInputs(currentTool, currentTask)}
        </div>
        <div class="ai-generate-bar">
          <button class="primary-btn wide" data-create-task>立即生成</button>
        </div>
      </section>
      <section class="ai-result-panel">
        <div class="ai-result-head">
          <div>
            <h2>结果区</h2>
          </div>
        </div>
        <div class="ai-result-grid">
          ${results.map((item) => `
            <figure class="ai-result-card">
              <img src="${item.image}" alt="${currentTool.name}" />
            </figure>
          `).join("")}
        </div>
      </section>
    </section>
    ${state.sizeAdjustOpen ? renderSizeAdjustModal(currentTask) : ""}`;
}

function aiWorkbenchTasks() {
  return [
    { id: "ai-sample-01", productImage: assets.bluePolo, referenceImage: assets.navyPoloShortsLook, resultImages: [assets.navyPoloShortsLook, assets.greenPoloShortsLook, assets.darkPolo, assets.easyShorts] },
    { id: "ai-sample-02", productImage: assets.stripedTee, referenceImage: assets.stripedDenimLook, resultImages: [assets.stripedDenimLook, assets.redStripeWhiteLook, assets.denimPants, assets.whitePants] },
    { id: "ai-sample-03", productImage: assets.orangeTee, referenceImage: assets.orangeStoreLook, resultImages: [assets.orangeStoreLook, assets.orangeBlackLook, assets.blackPants, assets.sizeTanModels] },
    { id: "ai-sample-04", productImage: assets.tanTee, referenceImage: assets.sizeTanModels, resultImages: [assets.sizeTanModels, assets.sizeMonoModels, assets.tanTee, assets.orangeTee] },
    { id: "ai-sample-05", productImage: assets.kidsTop, referenceImage: assets.kidsLook, resultImages: [assets.kidsLook, assets.kidsTop, assets.kidsSkirt, assets.toteBag] },
    { id: "ai-sample-06", productImage: assets.pajamaModel, referenceImage: assets.pajamaLifestyle, resultImages: [assets.pajamaLifestyle, assets.pajamaModel, assets.outdoorLook, assets.toteBag] },
  ];
}

function aiWorkbenchResults(tool, task) {
  const images = task.resultImages.length ? task.resultImages : [task.productImage, task.referenceImage];
  return images.slice(0, tool.resultCount || 4).map((image, index) => ({ id: `${task.id}-${index}`, image }));
}

function renderAiWorkbenchInputs(tool, task) {
  return `
    <div class="ai-workbench-fields">
      ${renderAiParamFields(hydrateAiParams(tool, task), selectedProduct())}
    </div>`;
}

function renderUploadTile(label, image) {
  return `
    <button class="upload-tile">
      <img src="${image}" alt="" />
      <span>${label}</span>
    </button>`;
}

function renderSizeAdjustModal(task) {
  return `
    <div class="drawer-backdrop" data-close-size-adjust>
      <aside class="size-adjust-sheet" data-drawer-panel>
        <div class="drawer-head">
          <div>
            <h2>调整参考图位置</h2>
            <span>产品图作为背景，参考图用于标记展示位置</span>
          </div>
          <button class="small-btn" data-close-size-adjust>关闭</button>
        </div>
        <div class="size-adjust-canvas">
          <img class="size-bg" src="${task.productImage}" alt="" />
          <img class="size-ref" src="${task.referenceImage}" alt="" />
        </div>
        <div class="drawer-actions">
          <button class="ghost-btn" data-close-size-adjust>取消</button>
          <button class="primary-btn" data-close-size-adjust>确认位置</button>
        </div>
      </aside>
    </div>`;
}

function aiToolItems() {
  return [
    {
      title: "商品详情图扩展",
      tools: [
        aiTool("尺码展示图", "生成服装尺码或箱包尺寸展示图。", "产品分类 / 产品图 / 对比图 / 展示方式", assets.sizeTanModels, "4:5", [
          { type: "chips", label: "产品分类", options: ["服装", "箱包"], defaultValue: "服装" },
          { type: "upload", label: "产品图", defaultImage: assets.tanTee },
          { type: "upload", label: "对比图", defaultImage: assets.sizeTanModels },
          { type: "upload", label: "参考图", defaultImage: assets.sizeMonoModels },
          { type: "chips", label: "展示方式", options: ["并排对比", "叠加对比", "表格对比"], defaultValue: "并排对比" },
          { type: "input", label: "服装尺码信息", defaultValue: "S / M / L / XL", showWhen: { 产品分类: "服装" } },
          { type: "size", label: "箱包尺寸", width: "42 cm", height: "30 cm", showWhen: { 产品分类: "箱包" } },
          { type: "placement", label: "调整参考图位置" },
          { type: "common", ratio: "4:5" },
        ], "保持商品颜色准确，尺码和身高信息由系统排版标注。"),
        aiTool("材质展示图", "生成面料质感和材质说明展示图。", "产品图 / 材质参考 / 面料成分 / 触感", assets.greenPolo, "4:5", [
          { type: "upload", label: "产品图", defaultImage: assets.greenPolo },
          { type: "upload", label: "材质参考", defaultImage: assets.darkPolo },
          { type: "chips", label: "展示模板", options: ["局部放大", "纹理拼接", "实穿近景", "材质说明版"], defaultValue: "局部放大" },
          { type: "input", label: "面料成分", defaultValue: "棉 73% / 聚酯纤维 27%" },
          { type: "chips", label: "触感", options: ["柔软", "轻薄", "挺括", "亲肤", "弹力", "干爽"], defaultValue: ["柔软", "亲肤"], multiple: true },
          { type: "textarea", label: "提示词", defaultValue: "突出面料纹理、厚薄和光泽，保持商品轮廓和颜色一致。" },
          { type: "common", ratio: "4:5" },
        ]),
        aiTool("商品对比", "生成男女、颜色或其他商品维度的对比图。", "产品图 / 对比维度 / 展示模板", assets.greenPoloShortsLook, "16:9", [
          { type: "upload", label: "产品图", defaultImage: assets.darkPolo },
          { type: "chips", label: "对比维度", options: ["对比男女", "对比颜色", "对比其他"], defaultValue: "对比颜色" },
          { type: "images", label: "模特参考图", items: [{ name: "男模", image: assets.sizeMonoModels }, { name: "女模", image: assets.sizeTanModels }], showWhen: { 对比维度: "对比男女" } },
          { type: "colors", label: "对比颜色", options: aiColorOptions(), defaultValue: ["白", "黑", "绿"], showWhen: { 对比维度: "对比颜色" } },
          { type: "upload", label: "对比产品图", defaultImage: assets.greenPoloShortsLook, showWhen: { 对比维度: "对比其他" } },
          { type: "chips", label: "展示模板", options: ["左右对比", "三列对比", "参数表 + 图片", "上图下表"], defaultValue: "左右对比" },
          { type: "textarea", label: "提示词", defaultValue: "生成同款商品不同颜色的对比图，保持拍摄角度、光线、比例一致。" },
          { type: "common", ratio: "16:9" },
        ]),
        aiTool("产品细节图", "生成局部细节、工艺和卖点展示图。", "产品图 / 细节参考 / 细节类型", assets.pajamaModel, "4:5", [
          { type: "upload", label: "产品图", defaultImage: assets.pajamaModel },
          { type: "upload", label: "细节参考", defaultImage: assets.pajamaLifestyle },
          { type: "chips", label: "细节类型", options: ["领口", "袖口", "下摆", "口袋", "拉链", "纽扣", "走线", "面料纹理", "Logo / 标识", "版型剪裁"], defaultValue: ["领口", "面料纹理"], multiple: true },
          { type: "chips", label: "展示模板", options: ["局部特写", "标注说明", "多宫格细节", "场景近景"], defaultValue: "局部特写" },
          { type: "textarea", label: "提示词", defaultValue: "生成商品局部细节图，突出结构、缝线和材质质感。" },
          { type: "common", ratio: "4:5" },
        ]),
      ],
    },
    {
      title: "平铺组合展示",
      tools: [
        aiTool("平铺组合图", "将多件商品生成平铺组合展示图。", "商品组 / 平铺模板 / 排布方式", assets.stripedDenimLook, "1:1", [
          { type: "images", label: "商品组", items: [{ name: "Polo", image: assets.bluePolo }, { name: "短裤", image: assets.easyShorts }, { name: "牛仔裤", image: assets.denimPants }] },
          { type: "chips", label: "平铺模板", options: ["白底平铺", "轻阴影平铺", "分类组合", "搭配套装", "促销陈列"], defaultValue: "白底平铺" },
          { type: "chips", label: "排布方式", options: ["横向排列", "纵向排列", "网格排列", "错落排列", "中心放射"], defaultValue: "网格排列" },
          { type: "chips", label: "数量", options: ["2 件", "3 件", "4 件", "6 件"], defaultValue: "4 件" },
          { type: "textarea", label: "提示词", defaultValue: "生成干净平铺组合图，商品间距统一，阴影自然。" },
          { type: "common", ratio: "1:1" },
        ]),
        aiTool("平铺场景图", "将商品组合放入指定场景背景。", "商品组 / 场景参考 / 背景", assets.orangeStoreLook, "4:5", [
          { type: "images", label: "商品组", items: [{ name: "T恤", image: assets.orangeTee }, { name: "裤装", image: assets.blackPants }, { name: "包袋", image: assets.toteBag }] },
          { type: "upload", label: "场景参考", defaultImage: assets.orangeStoreLook },
          { type: "chips", label: "背景", options: ["白底", "门店", "生活场景", "户外", "节日活动", "自定义上传"], defaultValue: "门店" },
          { type: "textarea", label: "提示词", defaultValue: "将平铺商品组合置于场景背景中，保持商品比例和陈列关系自然。" },
          { type: "common", ratio: "4:5" },
        ]),
        aiTool("商品 Logo 预览图", "指定商品与 Logo 生成服装预览图。", "商品图 / Logo / 位置模式 / 工艺", assets.outdoorLook, "4:5", [
          { type: "upload", label: "商品图", defaultImage: assets.outdoorLook },
          { type: "upload", label: "Logo", defaultImage: assets.uniqloLogo },
          { type: "chips", label: "位置模式", options: ["指定位置", "自由位置"], defaultValue: "指定位置" },
          { type: "chips", label: "位置参数", options: ["左胸", "右胸", "胸前居中", "后背居中", "袖口", "下摆"], defaultValue: "左胸", showWhen: { 位置模式: "指定位置" } },
          { type: "chips", label: "Logo尺寸", options: ["小", "中", "大"], defaultValue: "中" },
          { type: "action", label: "自由定位", action: "进入定位参考", showWhen: { 位置模式: "自由位置" } },
          { type: "chips", label: "工艺", options: ["刺绣", "热转印", "丝网印", "贴布绣", "高频TPU", "织标", "硅胶", "厚板印刷"], defaultValue: "刺绣" },
          { type: "textarea", label: "提示词", defaultValue: "保持 Logo 边缘清晰，贴合服装褶皱和工艺质感。" },
          { type: "common", ratio: "4:5" },
        ]),
      ],
    },
    {
      title: "立体模特展示",
      tools: [
        aiTool("虚拟模特着装", "生成 DP 模特单品着装图。", "产品图 / 性别 / 年龄段 / 场景", assets.sizeTanModels, "4:5", [
          { type: "upload", label: "产品图", defaultImage: assets.tanTee },
          { type: "chips", label: "性别", options: ["男", "女"], defaultValue: "女" },
          { type: "chips", label: "年龄段", options: ["成人", "儿童"], defaultValue: "成人" },
          { type: "chips", label: "场景", options: ["白底", "门店", "生活", "户外"], defaultValue: "白底" },
          { type: "textarea", label: "提示词", defaultValue: "生成标准模特着装图，保持商品颜色、长度和廓形准确。" },
          { type: "common", ratio: "4:5" },
        ]),
        aiTool("多件穿搭图", "将多件商品组合到同一模特身上。", "商品组 / 模特来源 / 搭配方式 / 场景", assets.greenPoloShortsLook, "4:5", [
          { type: "images", label: "商品组", items: [{ name: "上装", image: assets.greenPolo }, { name: "下装", image: assets.easyShorts }, { name: "配件", image: assets.toteBag }] },
          { type: "chips", label: "模特来源", options: ["上传/选择参考图", "生成模特"], defaultValue: "生成模特" },
          { type: "images", label: "模特参考图", items: [{ name: "门店模特", image: assets.orangeStoreLook }, { name: "真人模特", image: assets.pajamaModel }], showWhen: { 模特来源: "上传/选择参考图" } },
          { type: "chips", label: "模特参数", options: ["女", "青年", "东亚", "标准体型"], defaultValue: ["女", "青年", "东亚"], multiple: true, showWhen: { 模特来源: "生成模特" } },
          { type: "chips", label: "搭配方式", options: ["仅当前商品", "当前商品 + 推荐搭配", "完整套装"], defaultValue: "完整套装" },
          { type: "chips", label: "场景", options: ["白底", "门店", "生活", "户外"], defaultValue: "生活" },
          { type: "textarea", label: "提示词", defaultValue: "生成多件商品穿搭图，保持各商品比例和层次关系真实。" },
          { type: "common", ratio: "4:5" },
        ]),
        aiTool("姿势场景合成", "基于模特、姿势和场景生成合成图。", "产品图 / 模特来源 / 姿势来源 / 场景来源", assets.pajamaLifestyle, "4:5", [
          { type: "upload", label: "产品图", defaultImage: assets.pajamaModel },
          { type: "chips", label: "模特来源", options: ["上传图片", "参数生成"], defaultValue: "参数生成" },
          { type: "images", label: "模特图", items: [{ name: "门店模特", image: assets.orangeStoreLook }, { name: "真人模特", image: assets.pajamaModel }], showWhen: { 模特来源: "上传图片" } },
          { type: "chips", label: "模特参数", options: ["女", "青年", "东亚", "标准体型"], defaultValue: ["女", "青年", "东亚"], multiple: true, showWhen: { 模特来源: "参数生成" } },
          { type: "chips", label: "姿势来源", options: ["上传图片", "参数生成"], defaultValue: "参数生成" },
          { type: "upload", label: "姿势图", defaultImage: assets.sizeTanModels, showWhen: { 姿势来源: "上传图片" } },
          { type: "chips", label: "姿势参数", options: ["正面", "45度", "全身", "站立", "行走", "自然表情"], defaultValue: ["正面", "全身", "站立"], multiple: true, showWhen: { 姿势来源: "参数生成" } },
          { type: "chips", label: "场景来源", options: ["上传图片", "参数生成"], defaultValue: "参数生成" },
          { type: "upload", label: "场景图", defaultImage: assets.orangeStoreLook, showWhen: { 场景来源: "上传图片" } },
          { type: "chips", label: "场景参数", options: ["白底", "门店", "街景", "居家", "自然光", "日系"], defaultValue: ["门店", "自然光"], multiple: true, showWhen: { 场景来源: "参数生成" } },
          { type: "textarea", label: "提示词", defaultValue: "合成模特、姿势和场景，保持商品主体清晰，光线和透视一致。" },
          { type: "common", ratio: "4:5" },
        ]),
      ],
    },
  ];
}

function aiTool(name, desc, needRef, image, ratio, params, prompt = "") {
  return {
    name,
    desc,
    needRef,
    image,
    ratio,
    prompt,
    params,
    resultCount: 4,
  };
}

function flatAiTools() {
  return aiToolItems().flatMap((group) => group.tools);
}

function hydrateAiParams(tool, task) {
  return (tool.params || []).map((field) => {
    if (field.type !== "upload") return field;
    if (field.label.includes("产品") || field.label.includes("商品")) {
      return { ...field, defaultImage: field.defaultImage || task.productImage };
    }
    if (field.label.includes("参考") || field.label.includes("对比")) {
      return { ...field, defaultImage: field.defaultImage || task.referenceImage };
    }
    return field;
  });
}

function aiColorOptions() {
  return [
    { name: "白", color: "#f8fafc" },
    { name: "黑", color: "#16181c" },
    { name: "绿", color: "#83a98f" },
    { name: "蓝", color: "#567ca6" },
    { name: "红", color: "#c54d4a" },
    { name: "米", color: "#d7c6aa" },
  ];
}

function renderTaskBasket() {
  return `
    <div class="section-head">
      <div>
        <p class="eyebrow">Task basket</p>
        <h1>主商品篮 / 参照篮</h1>
        <p>穿搭、材质、对比这类任务先选参照物，再生成组合预览。</p>
      </div>
      <button class="primary-btn" data-operator-tab="task">创建 AI 任务</button>
    </div>
    <div class="basket-grid">
      ${basketPanel("主商品篮", "需要生成内容的商品", products, state.mainBasket, "main")}
      ${basketPanel("参照篮", "搭配商品、材质参考、场景参考、对比商品", references, state.referenceBasket, "reference")}
    </div>
    <section class="panel">
      <h2>组合预览</h2>
      <div class="match-list">
        ${renderCombination("uq-101", "ref-01", "成套穿搭图", "白底棚拍")}
        ${renderCombination("uq-102", "ref-03", "材质展示图", "纹理近景")}
        ${renderCombination("uq-103", "ref-04", "商品对比图", "版型对比")}
      </div>
    </section>`;
}

function basketPanel(title, desc, items, selectedIds, type) {
  return `
    <section class="panel basket-panel">
      <div>
        <h2>${title}</h2>
        <p>${desc}</p>
      </div>
      <div class="basket-items">
        ${items.map((item) => {
          const active = selectedIds.includes(item.id);
          return `
            <button class="basket-item ${active ? "active" : ""}" data-toggle-${type}="${item.id}">
              <img src="${item.image}" alt="${item.name}" />
              <span>
                <strong>${item.name}</strong>
                <em>${item.category || item.type}</em>
              </span>
            </button>`;
        }).join("")}
      </div>
    </section>`;
}

function renderCombination(productId, referenceId, type, scene) {
  const product = productById(productId);
  const reference = referenceById(referenceId);
  return `
    <article class="match-row">
      <img src="${product.image}" alt="${product.name}" />
      <span class="plus">+</span>
      <img src="${reference.image}" alt="${reference.name}" />
      <div>
        <strong>${product.name} × ${reference.name}</strong>
        <em>${type} · ${scene} · 提交后进入审核</em>
      </div>
      <button class="ghost-btn">替换参照物</button>
    </article>`;
}

function renderGenerationTask() {
  return `
    <section class="task-page">
      <div class="toolbar-head task-toolbar">
        <h1>任务列表</h1>
      </div>
      <section class="task-filter-bar">
        ${["全部", "生成中", "已完成", "失败"].map((filter, index) => `
          <button class="filter-chip ${index === 0 ? "active" : ""}">${filter}</button>
        `).join("")}
        <label class="search-field">
          <span>搜索</span>
          <input value="" placeholder="任务编号 / 类型" />
        </label>
      </section>
      <section class="task-board">
        ${productionTasks.map(taskCard).join("")}
      </section>
    </section>
    ${state.taskDrawerId ? renderTaskDrawer() : ""}`;
}

function taskOption(title, desc, checked) {
  return `
    <label class="check-line">
      <input type="checkbox" ${checked ? "checked" : ""} />
      <span>
        <strong>${title}</strong>
        <em>${desc}</em>
      </span>
    </label>`;
}

function taskCard(task, index) {
  const taskProducts = Array.from({ length: 4 }, (_, offset) => products[(index + offset) % products.length]);
  return `
    <article class="task-card" data-task-detail="${task.id}">
      <div class="task-album">
        ${taskProducts.map((product) => `<img src="${product.image}" alt="${product.name}" />`).join("")}
      </div>
      <div class="task-card-main">
        <div class="task-card-topline">
          <span class="status-pill" data-status="${task.status}">${task.status}</span>
        </div>
        <h2>${task.id}</h2>
        <div class="task-card-facts">
          <span>${task.createdAt}</span>
          <span>${task.images} 张</span>
          <span>${task.stage}</span>
        </div>
      </div>
    </article>`;
}

function renderTaskDrawer() {
  const task = productionTasks.find((item) => item.id === state.taskDrawerId) || productionTasks[0];
  const taskImages = taskAlbumProducts(task.id).slice(0, 6);
  return `
    <div class="drawer-backdrop" data-close-task-drawer>
      <aside class="profile-drawer task-detail-drawer" data-drawer-panel>
        <div class="drawer-head">
          <div>
            <h2>${task.id}</h2>
            <span>${task.type} · ${task.createdAt}</span>
          </div>
          <button class="small-btn" data-close-task-drawer>关闭</button>
        </div>
        <section class="task-detail-status">
          <span class="status-pill" data-status="${task.status}">${task.status}</span>
          <strong>${task.stage}</strong>
        </section>
        <section class="task-detail-section">
          <h3>生产图片</h3>
          <div class="task-detail-gallery">
            ${taskImages.map((product) => `<img src="${product.image}" alt="${product.name}" />`).join("")}
          </div>
        </section>
        <section class="task-detail-section compact-info-list">
          ${meta("生成类型", task.type)}
          ${meta("图片数量", `${task.images} 图片`)}
          ${meta("创建来源", task.source)}
          ${meta("提交人", task.owner)}
        </section>
      </aside>
    </div>`;
}

function renderReviewPool() {
  return `
    <div class="section-head">
      <div>
        <p class="eyebrow">Review required</p>
        <h1>审核中心</h1>
        <p>后台处理 AI 结果的通过、驳回、局部微调和重新生成。</p>
      </div>
      <button class="primary-btn" data-approve-all>批量通过待审核</button>
    </div>
    <section class="review-grid">
      ${generatedResults.map((item) => reviewCard(item)).join("")}
    </section>`;
}

function renderReviewProgress() {
  return `
    <section class="task-page">
      <div class="toolbar-head task-toolbar">
        <h1>审核进度</h1>
      </div>
      <section class="task-filter-bar">
        ${["全部", "审核中", "已审核"].map((filter, index) => `
          <button class="filter-chip ${index === 0 ? "active" : ""}">${filter}</button>
        `).join("")}
        <label class="search-field">
          <span>搜索</span>
          <input value="" placeholder="任务编号 / 款式 / 类型" />
        </label>
      </section>
      <section class="task-board">
        ${reviewTasks.map(reviewProgressCard).join("")}
      </section>
    </section>
    ${state.reviewDrawerId ? renderReviewDrawer() : ""}`;
}

function imageAuditItems() {
  return [
    { id: "AUD-10031", taskId: "TASK-2406", type: "尺码展示图", submitter: "王运营", status: "待审核", createdAt: "今日 11:02", image: assets.sizeTanModels },
    { id: "AUD-10032", taskId: "TASK-2406", type: "材质展示图", submitter: "李运营", status: "待审核", createdAt: "今日 11:01", image: assets.greenPolo },
    { id: "AUD-10033", taskId: "TASK-2405", type: "商品对比", submitter: "赵运营", status: "审核通过", createdAt: "昨日 18:42", image: assets.greenPoloShortsLook },
    { id: "AUD-10034", taskId: "TASK-2405", type: "产品细节图", submitter: "王运营", status: "审核驳回", createdAt: "昨日 18:40", image: assets.pajamaModel },
    { id: "AUD-10035", taskId: "TASK-2404", type: "指定模特图", submitter: "李运营", status: "待审核", createdAt: "昨日 16:10", image: assets.orangeStoreLook },
    { id: "AUD-10036", taskId: "TASK-2403", type: "尺码展示图", submitter: "王运营", status: "审核通过", createdAt: "06-11 15:30", image: assets.sizeMonoModels },
    { id: "AUD-10037", taskId: "TASK-2403", type: "商品对比", submitter: "赵运营", status: "待审核", createdAt: "06-11 15:28", image: assets.stripedDenimLook },
    { id: "AUD-10038", taskId: "TASK-2402", type: "材质展示图", submitter: "李运营", status: "审核通过", createdAt: "06-10 09:12", image: assets.darkPolo },
  ];
}

function renderImageAudit() {
  const items = imageAuditItems().filter((item) => item.status === state.auditStatusFilter);
  const batchLabel = state.auditStatusFilter === "待审核" ? "批量发起审核" : state.auditStatusFilter === "审核通过" ? "批量下载" : "";
  return `
    <section class="task-page image-audit-page">
      <div class="toolbar-head task-toolbar">
        <h1>素材图片</h1>
        ${batchLabel ? `<button class="primary-btn">${batchLabel}</button>` : ""}
      </div>
      <section class="task-filter-bar">
        ${["待审核", "审核通过", "审核驳回"].map((filter) => `
          <button class="filter-chip ${state.auditStatusFilter === filter ? "active" : ""}" data-audit-status="${filter}">${filter}</button>
        `).join("")}
        <label class="search-field">
          <span>搜索</span>
          <input value="" placeholder="图片编号 / 任务编号 / 类型" />
        </label>
      </section>
      <section class="audit-image-grid">
        ${items.map((item) => auditImageCard(item, { showCheckbox: state.auditStatusFilter !== "审核驳回", mode: "operator" })).join("")}
      </section>
    </section>
    ${state.reviewDrawerId ? renderImageAuditDrawer() : ""}`;
}

function auditImageCard(item, options = {}) {
  const showCheckbox = Boolean(options.showCheckbox);
  const adminMode = options.mode === "admin";
  const selected = state.selectedAuditIds.includes(item.id);
  return `
    <article class="audit-image-card ${selected ? "selected" : ""}" data-image-audit-detail="${item.id}">
      ${showCheckbox ? `
        <label class="audit-check">
          <input type="checkbox" ${selected ? "checked" : ""} data-toggle-audit="${item.id}" />
          <span></span>
        </label>
      ` : ""}
      <img src="${item.image}" alt="${item.type}" />
      <div>
        <strong>${item.type}</strong>
        ${adminMode ? `<span>${item.submitter}</span>` : ""}
      </div>
    </article>`;
}

function renderImageAuditDrawer() {
  const item = imageAuditItems().find((auditItem) => auditItem.id === state.reviewDrawerId) || imageAuditItems()[0];
  return `
    <div class="drawer-backdrop" data-close-review-drawer>
      <aside class="profile-drawer audit-detail-drawer" data-drawer-panel>
        <div class="drawer-head">
          <div>
            <h2>${item.id}</h2>
            <span>${item.taskId} · ${item.type}</span>
          </div>
          <button class="small-btn" data-close-review-drawer>关闭</button>
        </div>
        <div class="audit-preview-stage">
          <img src="${item.image}" alt="${item.type}" />
        </div>
        <section class="audit-meta-grid">
          ${compactMeta("审核状态", item.status)}
          ${compactMeta("创建时间", item.createdAt)}
          ${compactMeta("任务编号", item.taskId)}
          ${compactMeta("图片类型", item.type)}
          ${compactMeta("提交人", item.submitter)}
        </section>
        <div class="drawer-actions">
          <button class="small-btn">驳回</button>
          <button class="primary-btn">通过</button>
        </div>
      </aside>
    </div>`;
}

function reviewProgressCard(task, index) {
  const taskProducts = taskAlbumProducts(task.id, index).slice(0, 4);
  return `
    <article class="task-card" data-review-detail="${task.id}">
      <div class="task-album">
        ${taskProducts.map((product) => `<img src="${product.image}" alt="${product.name}" />`).join("")}
      </div>
      <div class="task-card-main">
        <div class="task-card-topline">
          <span class="status-pill" data-status="${task.status}">${task.status}</span>
        </div>
        <h2>${task.title}</h2>
        <div class="task-card-facts">
          <span>编号 ${task.id}</span>
          <span>更新于 ${task.updatedAt}</span>
          <span>${task.total} 张</span>
        </div>
      </div>
    </article>`;
}

function renderTypeTabs(tabs, active, key) {
  return `
    <nav class="task-type-tabs" aria-label="AI类型">
      ${tabs.map((tab) => `
        <button class="${active === tab ? "active" : ""}" data-${key}="${tab}">${tab}</button>
      `).join("")}
    </nav>`;
}

function renderReviewDrawer() {
  const task = reviewTasks.find((item) => item.id === state.reviewDrawerId) || reviewTasks[0];
  const steps = ["已提交", "机器质检", "人工审核", task.status === "已审核" ? "已完成" : "处理中"];
  const taskImages = taskAlbumProducts(task.id).slice(0, 6);
  return `
    <div class="drawer-backdrop" data-close-review-drawer>
      <aside class="profile-drawer task-detail-drawer" data-drawer-panel>
        <div class="drawer-head">
          <div>
            <h2>${task.title}</h2>
            <span>${task.id} · 更新于 ${task.updatedAt}</span>
          </div>
          <button class="small-btn" data-close-review-drawer>关闭</button>
        </div>
        <section class="task-detail-status">
          <span class="status-pill" data-status="${task.status}">${task.status}</span>
          <strong>${task.status === "已审核" ? "审核完成" : "人工审核中"}</strong>
          <em>${Math.round((task.stage / 4) * 100)}%</em>
          <div class="linear-progress" style="--progress:${Math.round((task.stage / 4) * 100)}%"></div>
        </section>
        <section class="task-detail-section">
          <h3>审核图片</h3>
          <div class="task-detail-gallery">
            ${taskImages.map((product, index) => `
              <figure>
                <img src="${product.image}" alt="${product.name}" />
                <figcaption>${index < task.pass ? "已通过" : index < task.pass + task.reject ? "未通过" : "待审核"}</figcaption>
              </figure>
            `).join("")}
          </div>
        </section>
        <section class="task-detail-section">
          <h3>审核进度</h3>
          <div class="review-stepper compact">
            ${steps.map((step, index) => `
              <span class="${index < task.stage ? "done" : ""}">${step}</span>
            `).join("")}
          </div>
        </section>
        <section class="task-detail-section compact-info-list">
          ${meta("生成数", task.total)}
          ${meta("待审", task.pending)}
          ${meta("通过", task.pass)}
          ${meta("驳回", task.reject)}
        </section>
      </aside>
    </div>`;
}

function reviewCard(item) {
  const approved = item.status === "已通过" || state.approvedCount > 1;
  return `
    <article class="review-card">
      <img src="${item.image}" alt="${item.product}" />
      <div>
        <span class="status-pill" data-status="${approved ? "已通过" : item.status}">${approved ? "已通过" : item.status}</span>
        <h2>${item.product}</h2>
        <p>${item.type} · ${item.ratio} · Prompt 可追溯</p>
      </div>
      <div class="card-actions">
        <button class="small-btn">局部微调</button>
        <button class="small-btn">驳回</button>
        <button class="small-btn active">通过</button>
      </div>
    </article>`;
}

function renderExportPanel() {
  return `
    <div class="section-head">
      <div>
        <p class="eyebrow">Task result</p>
        <h1>结果包下载</h1>
        <p>审核完成的任务可以下载结果包，不单独设置素材包模块。</p>
      </div>
      <button class="primary-btn" data-export-package>${state.exportReady ? "结果包已生成" : "生成结果包"}</button>
    </div>
    <section class="panel export-panel">
      <div class="package-box">
        <h2>春夏新品详情图结果包</h2>
        <div class="package-stats">
          ${stat("款式", "24")}
          ${stat("图片", state.exportReady ? "186" : "待生成")}
          ${stat("审核通过", state.exportReady ? "168" : "34")}
          ${stat("导出格式", "ZIP + CSV")}
        </div>
      </div>
      <div class="export-list">
        <span>图片文件</span>
        <span>商品基础信息</span>
        <span>生成类型</span>
        <span>图片比例 / 清晰度</span>
        <span>Prompt 摘要</span>
        <span>优化文案 / 图片说明</span>
      </div>
    </section>`;
}

function renderDesigner() {
  const product = productById(state.selectedDesignerProductId);
  const steps = ["选择款式", "Logo与工艺", "模特与场景", "预览结果"];
  const fullStep = state.designerStep === 1 || state.designerStep === 3;
  return `
    <section class="designer-page standalone-designer">
      <div class="designer-topbar">
        <button class="side-brand-mark" data-view="home">${brandLogo("brand-logo-inner")}</button>
        <div class="designer-title">
          <div class="designer-title-line">
            <h1>B端团定设计工具</h1>
            <div class="account-menu-wrap">
              <button class="designer-switch-btn" data-lang-switch="en">EN</button>
              <button class="designer-switch-btn" data-account-menu>切换系统</button>
              ${state.accountMenuOpen ? renderAccountMenu() : ""}
            </div>
          </div>
        </div>
        <div class="segmented">
          <button class="${state.designerMode === "guided" ? "active" : ""}" data-designer-mode="guided">固定位置</button>
          <button class="${state.designerMode === "free" ? "active" : ""}" data-designer-mode="free">自由编辑</button>
        </div>
      </div>
      <nav class="designer-stepper">
        ${steps.map((step, index) => `
          <button class="${state.designerStep === index + 1 ? "active" : ""} ${state.designerStep > index + 1 ? "done" : ""}" data-designer-step="${index + 1}">
            <span>${index + 1}</span>
            <strong>${step}</strong>
          </button>
        `).join("")}
      </nav>
      ${state.designerStep === 4 ? `
        <section class="panel designer-result-panel">
          ${renderDesignerStep()}
          ${renderDesignerActions()}
        </section>
      ` : fullStep ? `
        <section class="panel designer-flow-panel">
          ${renderDesignerStep()}
          ${renderDesignerActions()}
        </section>
      ` : `
        <div class="designer-grid designer-logo-step">
          ${renderDesignerPreview(product)}
          <section class="panel designer-config-panel">
            ${renderDesignerStep()}
            ${renderDesignerActions()}
          </section>
        </div>
      `}
    </section>`;
}

function renderDesignerPreview(product) {
  const showLogo = state.designerStep >= 2;
  return `
    <section class="panel garment-panel">
      <div class="garment-canvas ${showLogo ? "with-logo" : "plain"}">
        <img class="garment-image" src="${product.image}" alt="${product.name}" />
        ${showLogo ? `<img class="logo-mark ${state.designerMode} ${craftClass()}" src="${assets.uniqloLogo}" alt="UNIQLO logo" style="${logoStyle()}" />` : ""}
      </div>
      <div class="designer-preview-meta">
        <strong>${product.name}</strong>
        <span>${showLogo ? `${state.selectedCraft} · ${state.designerMode === "guided" ? state.logoPosition : "自由位置"}` : "基础款式"}</span>
      </div>
    </section>`;
}

function renderDesignerActions() {
  return `
    <div class="designer-step-actions">
      <button class="small-btn" ${state.designerStep === 1 ? "disabled" : ""} data-designer-prev>${state.designerStep === 4 ? "重新编辑" : "上一步"}</button>
      <button class="primary-btn" data-designer-next>${state.designerStep === 4 ? "确认导出" : state.designerStep === 3 ? "生成结果" : "下一步"}</button>
    </div>`;
}

function renderDesignerStep() {
  if (state.designerStep === 1) return renderDesignerProductStep();
  if (state.designerStep === 2) return renderDesignerLogoStep();
  if (state.designerStep === 3) return renderDesignerSceneStep();
  return renderDesignerResultStep();
}

function renderDesignerProductStep() {
  return `
    <div class="designer-step-head">
      <h2>选择款式</h2>
    </div>
    <div class="designer-product-grid">
      ${products.slice(0, 5).map((product) => `
        <button class="designer-product-card ${state.selectedDesignerProductId === product.id ? "active" : ""}" data-designer-product="${product.id}">
          <img src="${product.image}" alt="${product.name}" />
          <span>${product.name}</span>
        </button>
      `).join("")}
    </div>`;
}

function renderDesignerLogoStep() {
  return `
    <div class="designer-step-head">
      <h2>Logo与工艺</h2>
    </div>
    <div class="form-stack">
      <div class="logo-upload-card">
        <img src="${assets.uniqloLogo}" alt="UNIQLO logo" />
        <div>
          <strong>logo.png</strong>
          <span>已上传</span>
        </div>
        <button class="small-btn">更换Logo</button>
      </div>
      ${state.designerMode === "guided" ? renderFixedLogoControls() : renderFreeLogoControls()}
      <div>
        <span class="field-label">工艺</span>
        <div class="craft-grid">
          ${craftOptions().map((craft) => `
            <button class="craft-card ${state.selectedCraft === craft.name ? "active" : ""}" data-craft="${craft.name}">
              <img src="${craft.image}" alt="${craft.name}" />
              <strong>${craft.name}</strong>
              <span>${craft.desc}</span>
            </button>
          `).join("")}
        </div>
      </div>
    </div>`;
}

function renderFixedLogoControls() {
  return `
    <label class="range-row">
      <span>Logo 尺寸</span>
      <input type="range" min="12" max="34" value="${state.logoSize}" data-logo-size />
    </label>
    <div>
      <span class="field-label">Logo 位置</span>
      <div class="pill-grid">
        ${["左胸", "右胸", "胸前居中", "后背居中", "下摆"].map((item) => `
          <button class="choice-pill ${state.logoPosition === item ? "active" : ""}" data-logo-position="${item}">${item}</button>
        `).join("")}
      </div>
    </div>`;
}

function renderFreeLogoControls() {
  return `
    <label class="range-row">
      <span>横向位置</span>
      <input type="range" min="20" max="78" value="${state.freeLogo.x}" data-free-x />
    </label>
    <label class="range-row">
      <span>纵向位置</span>
      <input type="range" min="18" max="68" value="${state.freeLogo.y}" data-free-y />
    </label>
    <label class="range-row">
      <span>Logo 大小</span>
      <input type="range" min="12" max="34" value="${state.freeLogo.size}" data-free-size />
    </label>`;
}

function renderDesignerSceneStep() {
  return `
    <div class="designer-step-head">
      <h2>模特与场景</h2>
    </div>
    <div class="form-stack">
      <div>
        <span class="field-label">模特</span>
        <div class="designer-option-grid">
          ${designerModels().map((item) => `
            <button class="designer-option-card ${state.selectedModel === item.name ? "active" : ""}" data-designer-model="${item.name}">
              <img src="${item.image}" alt="${item.name}" />
              <span>${item.name}</span>
            </button>
          `).join("")}
        </div>
      </div>
      <div>
        <span class="field-label">场景</span>
        <div class="designer-option-grid">
          ${designerScenes().map((item) => `
            <button class="designer-option-card ${state.selectedScene === item.name ? "active" : ""}" data-designer-scene="${item.name}">
              <img src="${item.image}" alt="${item.name}" />
              <span>${item.name}</span>
            </button>
          `).join("")}
        </div>
      </div>
    </div>`;
}

function renderDesignerResultStep() {
  const results = [
    { title: "标准白底效果图", image: productById(state.selectedDesignerProductId).image },
    { title: "AI 模特上身效果图", image: selectedModelImage() },
    { title: "生活场景展示图", image: selectedSceneImage() },
    { title: "多角度细节展示图", image: assets.tanTee },
  ];
  return `
    <div class="designer-step-head">
      <h2>预览结果图</h2>
    </div>
    <div class="designer-result-grid">
      ${results.map((item) => `
        <article class="designer-result-card">
          <div>
            <img src="${item.image}" alt="${item.title}" />
            <img class="result-logo-overlay ${craftClass()}" src="${assets.uniqloLogo}" alt="" />
          </div>
          <strong>${item.title}</strong>
        </article>
      `).join("")}
    </div>`;
}

function craftOptions() {
  return [
    { name: "刺绣", image: assets.uniqloLogo, desc: "立体感强，适合多种面料" },
    { name: "热转印", image: assets.orangeTee, desc: "色彩细腻，适合复杂图案" },
    { name: "丝网印", image: assets.orangeStoreLook, desc: "色牢度高，适合批量" },
    { name: "贴布绣", image: assets.uniqloLogo, desc: "厚实醒目，品牌感强" },
    { name: "高频TPU", image: assets.blackPants, desc: "热压成型，耐磨防水" },
    { name: "织标", image: assets.toteBag, desc: "质感稳定，适合小标" },
    { name: "硅胶", image: assets.greenPolo, desc: "柔韧立体，触感明显" },
    { name: "厚板印刷", image: assets.redStripedTee, desc: "多层厚版，立体突出" },
  ];
}

function designerModels() {
  return [
    { name: "门店模特", image: assets.orangeStoreLook },
    { name: "真人模特", image: assets.pajamaModel },
    { name: "尺码模特", image: assets.sizeTanModels },
  ];
}

function designerScenes() {
  return [
    { name: "标准白底", image: assets.tanTee },
    { name: "门店场景", image: assets.orangeStoreLook },
    { name: "生活场景", image: assets.pajamaLifestyle },
    { name: "户外场景", image: assets.outdoorLook },
  ];
}

function selectedModelImage() {
  const model = designerModels().find((item) => item.name === state.selectedModel);
  return (model || designerModels()[0]).image;
}

function selectedSceneImage() {
  const scene = designerScenes().find((item) => item.name === state.selectedScene);
  return (scene || designerScenes()[0]).image;
}

function selectLike(label, value) {
  return `<div class="select-like"><span>${label}</span><strong>${value}</strong></div>`;
}

function logoStyle() {
  if (state.designerMode === "free") {
    return `left:${state.freeLogo.x}%; top:${state.freeLogo.y}%; width:${state.freeLogo.size * 1.25}px;`;
  }
  const positions = {
    左胸: "left:42%; top:36%;",
    右胸: "left:59%; top:36%;",
    胸前居中: "left:50%; top:43%;",
    后背居中: "left:50%; top:34%;",
    下摆: "left:50%; top:72%;",
  };
  return `${positions[state.logoPosition] || positions.左胸} width:${state.logoSize * 1.25}px;`;
}

function craftClass() {
  const map = {
    刺绣: "craft-embroider",
    热转印: "craft-transfer",
    丝网印: "craft-screen",
    贴布绣: "craft-patch",
    高频TPU: "craft-tpu",
    织标: "craft-label",
    硅胶: "craft-silicone",
    厚板印刷: "craft-thick",
  };
  return map[state.selectedCraft] || "craft-embroider";
}

function renderAdmin() {
  return `
    <section class="workbench admin-workbench">
      ${renderSideNav("admin", "AI运营后台", "审核与管理", [
        ["adminTab", "review", "审核中心", "review"],
        ["adminTab", "employees", "员工管理", "roles"],
        ["adminTab", "roles", "角色管理", "settings"],
        ["adminTab", "prompt", "Prompt 管理", "prompt"],
      ])}
      <section class="work-area">
        ${state.adminTab === "review" ? renderAdminReview() : ""}
        ${state.adminTab === "employees" ? renderEmployeeAdmin() : ""}
        ${state.adminTab === "prompt" ? renderPromptAdmin() : ""}
        ${state.adminTab === "roles" ? renderRoleAdmin() : ""}
      </section>
    </section>`;
}

function renderAdminReview() {
  return `
    <div class="section-head admin-page-head">
      <div>
        <h1>审核中心</h1>
      </div>
    </div>
    <section class="task-filter-bar admin-toolbar">
      ${["全部", "待审核", "审核通过", "审核驳回"].map((filter, index) => `
        <button class="filter-chip ${index === 0 ? "active" : ""}">${filter}</button>
      `).join("")}
      <label class="search-field">
        <span>搜索</span>
        <input value="" placeholder="图片编号 / 任务编号 / 类型" />
      </label>
    </section>
    <section class="audit-image-grid admin-audit-grid">
      ${imageAuditItems().slice(0, 6).map((item) => auditImageCard(item, { mode: "admin" })).join("")}
    </section>
    ${state.reviewDrawerId ? renderImageAuditDrawer() : ""}`;
}

function renderPromptAdmin() {
  return `
    <div class="section-head admin-page-head">
      <div>
        <h1>Prompt 管理</h1>
      </div>
    </div>
    <section class="prompt-demo-grid">
      ${promptDemoCard("Prompt 优化", "将运营输入的提示词补全为稳定的生成指令。", ["商品主体", "画面比例", "合规表达"], "进入优化")}
      ${promptDemoCard("标准词库", "通勤、白底棚拍、柔和光线、材质近景", ["通勤", "柔和光线", "材质近景"], "管理词条")}
      ${promptDemoCard("禁用词库", "夸大功效、绝对化描述、不合规品牌词", ["夸大功效", "绝对化描述", "品牌敏感词"], "管理词条")}
    </section>`;
}

function renderRoleAdmin() {
  return `
    <div class="section-head admin-page-head">
      <div>
        <h1>角色管理</h1>
      </div>
      <button class="primary-btn">新建角色</button>
    </div>
    <section class="admin-table-card">
      <div class="admin-table">
        <div class="admin-table-head role-table-head">
          <span>角色名称</span>
          <span>权限范围</span>
          <span>成员数</span>
          <span>操作</span>
        </div>
        ${roleRow("运营", "AI工具、任务列表、提交审核", "12 人")}
        ${roleRow("审核员", "单图通过、驳回", "6 人")}
        ${roleRow("Prompt 管理员", "Prompt 优化、词库管理", "3 人")}
        ${roleRow("管理员", "全部权限", "2 人")}
      </div>
    </section>`;
}

function renderEmployeeAdmin() {
  const employees = [
    ["EMP-001", "佐藤 美咲", "运营", "东京运营组", "启用"],
    ["EMP-002", "田中 裕介", "审核员", "内容审核组", "启用"],
    ["EMP-003", "王 运营", "Prompt 管理员", "AI运营组", "启用"],
    ["EMP-004", "李 管理", "管理员", "平台管理组", "停用"],
  ];
  return `
    <div class="section-head admin-page-head">
      <div>
        <h1>员工管理</h1>
      </div>
      <button class="primary-btn">新增员工</button>
    </div>
    <section class="task-filter-bar admin-toolbar">
      ${["全部", "启用", "停用"].map((filter, index) => `
        <button class="filter-chip ${index === 0 ? "active" : ""}">${filter}</button>
      `).join("")}
      <label class="search-field">
        <span>搜索</span>
        <input value="" placeholder="员工编号 / 姓名 / 角色" />
      </label>
    </section>
    <section class="admin-table-card">
      <div class="admin-table admin-employee-table">
        ${employees.map(([id, name, role, team, status]) => `
          <article class="admin-row">
            <strong>${name}</strong>
            <span>${id}</span>
            <span>${role}</span>
            <span>${team}</span>
            <span class="status-pill" data-status="${status}">${status}</span>
            <button class="small-btn">编辑</button>
          </article>
        `).join("")}
      </div>
    </section>`;
}

function meta(label, value) {
  return `<div class="meta"><span>${label}</span><strong>${value}</strong></div>`;
}

function compactMeta(label, value) {
  return `<div class="compact-meta"><span>${label}</span><strong>${value}</strong></div>`;
}

function stat(label, value) {
  return `<div class="stat"><span>${label}</span><strong>${value}</strong></div>`;
}

function metric(label, value, hint) {
  return `<article class="metric-card"><span>${label}</span><strong>${value}</strong><em>${hint}</em></article>`;
}

function wordCard(title, words) {
  return `<article class="panel word-card"><h2>${title}</h2><div>${words.map((word) => `<span>${word}</span>`).join("")}</div></article>`;
}

function promptDemoCard(title, desc, tags, action) {
  return `
    <article class="prompt-demo-card">
      <div>
        <h2>${title}</h2>
        <p>${desc}</p>
      </div>
      <div class="prompt-tag-row">
        ${tags.map((tag) => `<span>${tag}</span>`).join("")}
      </div>
      <button class="small-btn">${action}</button>
    </article>`;
}

function roleRow(role, permissions, members) {
  return `<article class="admin-row role-row"><strong>${role}</strong><span>${permissions}</span><span>${members}</span><button class="small-btn">编辑权限</button></article>`;
}

function selectedProduct() {
  return productById(state.selectedProductId);
}

function productById(id) {
  return products.find((product) => product.id === id) || products[0];
}

function referenceById(id) {
  return references.find((reference) => reference.id === id) || references[0];
}

function taskAlbumProducts(id, fallbackIndex = 0) {
  const seed = [...id].reduce((sum, char) => sum + char.charCodeAt(0), fallbackIndex);
  return Array.from({ length: 6 }, (_, offset) => products[(seed + offset) % products.length]);
}

function toggleItem(list, id) {
  if (list.includes(id)) return list.filter((item) => item !== id);
  return [...list, id];
}

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function bindEvents() {
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      state.view = button.dataset.view;
      state.accountMenuOpen = false;
      state.aiCreateDrawerOpen = false;
      state.sizeAdjustOpen = false;
      state.profileDrawerOpen = false;
      state.previewAssetId = "";
      state.taskDrawerId = "";
      state.reviewDrawerId = "";
      state.selectedAuditIds = [];
      render();
    });
  });

  document.querySelectorAll("[data-account-menu]").forEach((button) => {
    button.addEventListener("click", () => {
      state.accountMenuOpen = !state.accountMenuOpen;
      render();
    });
  });

  document.querySelectorAll("[data-lang-switch]").forEach((button) => {
    button.addEventListener("click", () => {
      window.location.href = "index.html?lang=en";
    });
  });

  document.querySelectorAll("[data-state-key]").forEach((button) => {
    button.addEventListener("click", () => {
      state[button.dataset.stateKey] = button.dataset.stateValue;
      if (button.dataset.stateKey === "operatorTab") {
        if (button.dataset.stateValue === "styles") state.stylePage = "list";
        if (button.dataset.stateValue === "tools") state.aiToolPage = "list";
      }
      state.taskDrawerId = "";
      state.reviewDrawerId = "";
      state.selectedAuditIds = [];
      state.sizeAdjustOpen = false;
      render();
    });
  });

  document.querySelectorAll("[data-operator-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.operatorTab = button.dataset.operatorTab;
      if (state.operatorTab === "styles") state.stylePage = "list";
      if (state.operatorTab === "tools") state.aiToolPage = "list";
      state.taskDrawerId = "";
      state.reviewDrawerId = "";
      state.selectedAuditIds = [];
      state.sizeAdjustOpen = false;
      render();
    });
  });

  document.querySelectorAll("[data-style-view]").forEach((button) => {
    button.addEventListener("click", () => {
      state.styleViewMode = button.dataset.styleView;
      render();
    });
  });

  document.querySelectorAll("[data-style-category]").forEach((select) => {
    select.addEventListener("change", () => {
      state.styleCategoryFilter = select.value;
      render();
    });
  });

  document.querySelectorAll("[data-style-content]").forEach((select) => {
    select.addEventListener("change", () => {
      state.styleContentFilter = select.value;
      render();
    });
  });

  document.querySelectorAll("[data-select-product]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedProductId = button.dataset.selectProduct;
      render();
    });
  });

  document.querySelectorAll("[data-open-style]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedProductId = button.dataset.openStyle;
      state.stylePage = "content";
      state.selectedAssetIds = [];
      state.profileDrawerOpen = false;
      state.profileDrawerEditing = false;
      state.aiCreateDrawerOpen = false;
      render();
    });
  });

  document.querySelectorAll("[data-style-page]").forEach((button) => {
    button.addEventListener("click", () => {
      state.stylePage = button.dataset.stylePage;
      state.profileDrawerOpen = false;
      state.profileDrawerEditing = false;
      state.aiCreateDrawerOpen = false;
      render();
    });
  });

  document.querySelectorAll("[data-profile-drawer]").forEach((button) => {
    button.addEventListener("click", () => {
      state.profileDrawerOpen = true;
      state.profileDrawerEditing = false;
      render();
    });
  });

  document.querySelectorAll("[data-close-profile-drawer]").forEach((button) => {
    button.addEventListener("click", () => {
      state.profileDrawerOpen = false;
      state.profileDrawerEditing = false;
      render();
    });
  });

  document.querySelectorAll("[data-drawer-panel]").forEach((panel) => {
    panel.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  });

  document.querySelectorAll("[data-profile-edit]").forEach((button) => {
    button.addEventListener("click", () => {
      state.profileDrawerEditing = true;
      render();
    });
  });

  document.querySelectorAll("[data-profile-view]").forEach((button) => {
    button.addEventListener("click", () => {
      state.profileDrawerEditing = false;
      render();
    });
  });

  document.querySelectorAll("[data-ai-create]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.aiCreate) state.aiCreateType = button.dataset.aiCreate;
      state.aiCreateSource = button.dataset.aiSource || "style";
      state.aiCreateDrawerOpen = true;
      state.previewAssetId = "";
      render();
    });
  });

  document.querySelectorAll("[data-open-ai-workbench]").forEach((button) => {
    button.addEventListener("click", () => {
      state.aiToolPage = "workbench";
      state.aiWorkbenchAbility = button.dataset.openAiWorkbench;
      state.aiCreateType = button.dataset.openAiWorkbench;
      state.sizeAdjustOpen = false;
      render();
    });
  });

  document.querySelectorAll("[data-ai-tool-list]").forEach((button) => {
    button.addEventListener("click", () => {
      state.aiToolPage = "list";
      state.sizeAdjustOpen = false;
      render();
    });
  });

  document.querySelectorAll("[data-ai-workbench-select]").forEach((select) => {
    select.addEventListener("change", () => {
      state.aiWorkbenchAbility = select.value;
      state.aiCreateType = select.value;
      state.sizeAdjustOpen = false;
      render();
    });
  });

  document.querySelectorAll("[data-ai-workbench-task]").forEach((button) => {
    button.addEventListener("click", () => {
      state.aiWorkbenchTaskId = button.dataset.aiWorkbenchTask;
      state.sizeAdjustOpen = false;
      render();
    });
  });

  document.querySelectorAll("[data-ai-param-label]").forEach((button) => {
    button.addEventListener("click", () => {
      const label = button.dataset.aiParamLabel;
      const value = button.dataset.aiParamValue;
      const key = aiParamKey(label);
      if (button.dataset.aiParamMultiple === "true") {
        const current = Array.isArray(state.aiParamValues[key])
          ? state.aiParamValues[key]
          : Array.from(button.parentElement.querySelectorAll(".ai-chip.active")).map((item) => item.dataset.aiParamValue);
        state.aiParamValues[key] = current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value];
      } else {
        state.aiParamValues[key] = value;
      }
      render();
    });
  });

  document.querySelectorAll("[data-open-size-adjust]").forEach((button) => {
    button.addEventListener("click", () => {
      state.sizeAdjustOpen = true;
      render();
    });
  });

  document.querySelectorAll("[data-close-size-adjust]").forEach((button) => {
    button.addEventListener("click", () => {
      state.sizeAdjustOpen = false;
      render();
    });
  });

  document.querySelectorAll("[data-close-ai-create]").forEach((button) => {
    button.addEventListener("click", () => {
      state.aiCreateDrawerOpen = false;
      render();
    });
  });

  document.querySelectorAll("[data-ai-create-type]").forEach((button) => {
    button.addEventListener("click", () => {
      state.aiCreateType = button.dataset.aiCreateType;
      render();
    });
  });

  document.querySelectorAll("[data-asset-type]").forEach((button) => {
    button.addEventListener("click", () => {
      state.assetTypeFilter = button.dataset.assetType;
      state.selectedAssetIds = [];
      render();
    });
  });

  document.querySelectorAll("[data-asset-color]").forEach((button) => {
    button.addEventListener("click", () => {
      state.assetColorFilter = button.dataset.assetColor;
      state.selectedAssetIds = [];
      render();
    });
  });

  document.querySelectorAll("[data-toggle-asset]").forEach((input) => {
    input.addEventListener("click", (event) => {
      event.stopPropagation();
    });
    input.addEventListener("change", (event) => {
      event.stopPropagation();
      state.selectedAssetIds = toggleItem(state.selectedAssetIds, input.dataset.toggleAsset);
      render();
    });
  });

  document.querySelectorAll("[data-preview-asset]").forEach((button) => {
    button.addEventListener("click", () => {
      state.previewAssetId = button.dataset.previewAsset;
      render();
    });
  });

  document.querySelectorAll("[data-close-preview]").forEach((button) => {
    button.addEventListener("click", () => {
      state.previewAssetId = "";
      render();
    });
  });

  document.querySelectorAll("[data-task-detail]").forEach((card) => {
    card.addEventListener("click", () => {
      state.taskDrawerId = card.dataset.taskDetail;
      render();
    });
  });

  document.querySelectorAll("[data-close-task-drawer]").forEach((button) => {
    button.addEventListener("click", () => {
      state.taskDrawerId = "";
      render();
    });
  });

  document.querySelectorAll("[data-review-detail]").forEach((card) => {
    card.addEventListener("click", () => {
      state.reviewDrawerId = card.dataset.reviewDetail;
      render();
    });
  });

  document.querySelectorAll("[data-image-audit-detail]").forEach((card) => {
    card.addEventListener("click", () => {
      state.reviewDrawerId = card.dataset.imageAuditDetail;
      render();
    });
  });

  document.querySelectorAll("[data-audit-status]").forEach((button) => {
    button.addEventListener("click", () => {
      state.auditStatusFilter = button.dataset.auditStatus;
      state.selectedAuditIds = [];
      state.reviewDrawerId = "";
      render();
    });
  });

  document.querySelectorAll("[data-toggle-audit]").forEach((input) => {
    input.addEventListener("click", (event) => {
      event.stopPropagation();
    });
    input.addEventListener("change", (event) => {
      event.stopPropagation();
      state.selectedAuditIds = toggleItem(state.selectedAuditIds, input.dataset.toggleAudit);
      render();
    });
  });

  document.querySelectorAll("[data-task-type-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.taskTypeFilter = button.dataset.taskTypeFilter;
      state.taskDrawerId = "";
      render();
    });
  });

  document.querySelectorAll("[data-close-review-drawer]").forEach((button) => {
    button.addEventListener("click", () => {
      state.reviewDrawerId = "";
      render();
    });
  });

  document.querySelectorAll("[data-upload-asset]").forEach((button) => {
    button.addEventListener("click", () => {
      state.uploadedAssetCount += 1;
      render();
    });
  });

  document.querySelectorAll("[data-delete-assets]").forEach((button) => {
    button.addEventListener("click", () => {
      state.deletedAssetIds = [...new Set([...state.deletedAssetIds, ...state.selectedAssetIds])];
      state.selectedAssetIds = [];
      render();
    });
  });

  document.querySelectorAll("[data-delete-one]").forEach((button) => {
    button.addEventListener("click", () => {
      state.deletedAssetIds = [...new Set([...state.deletedAssetIds, button.dataset.deleteOne])];
      state.selectedAssetIds = state.selectedAssetIds.filter((id) => id !== button.dataset.deleteOne);
      if (state.previewAssetId === button.dataset.deleteOne) {
        state.previewAssetId = "";
      }
      render();
    });
  });

  document.querySelectorAll("[data-submit-assets]").forEach((button) => {
    button.addEventListener("click", () => {
      state.submittedAssetIds = [...new Set([...state.submittedAssetIds, ...state.selectedAssetIds])];
      state.selectedAssetIds = [];
      render();
    });
  });

  document.querySelectorAll("[data-clear-assets]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedAssetIds = [];
      render();
    });
  });

  document.querySelectorAll("[data-save-profile]").forEach((button) => {
    button.addEventListener("click", () => {
      state.profileSaved = true;
      state.stylePage = "content";
      state.profileDrawerEditing = false;
      render();
    });
  });

  document.querySelectorAll("[data-toggle-main]").forEach((button) => {
    button.addEventListener("click", () => {
      state.mainBasket = toggleItem(state.mainBasket, button.dataset.toggleMain);
      render();
    });
  });

  document.querySelectorAll("[data-toggle-reference]").forEach((button) => {
    button.addEventListener("click", () => {
      state.referenceBasket = toggleItem(state.referenceBasket, button.dataset.toggleReference);
      render();
    });
  });

  document.querySelectorAll("[data-create-task]").forEach((button) => {
    button.addEventListener("click", () => {
      state.taskCreated = true;
      state.aiCreateDrawerOpen = false;
      state.sizeAdjustOpen = false;
      state.operatorTab = "task";
      render();
    });
  });

  document.querySelectorAll("[data-approve-all]").forEach((button) => {
    button.addEventListener("click", () => {
      state.approvedCount = generatedResults.length;
      render();
    });
  });

  document.querySelectorAll("[data-export-package]").forEach((button) => {
    button.addEventListener("click", () => {
      state.exportReady = true;
      render();
    });
  });

  document.querySelectorAll("[data-designer-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      state.designerMode = button.dataset.designerMode;
      state.designerStep = 1;
      render();
    });
  });

  document.querySelectorAll("[data-designer-step]").forEach((button) => {
    button.addEventListener("click", () => {
      state.designerStep = Number(button.dataset.designerStep);
      render();
    });
  });

  document.querySelectorAll("[data-designer-prev]").forEach((button) => {
    button.addEventListener("click", () => {
      state.designerStep = button.textContent.trim() === "重新编辑" ? 3 : Math.max(1, state.designerStep - 1);
      render();
    });
  });

  document.querySelectorAll("[data-designer-next]").forEach((button) => {
    button.addEventListener("click", () => {
      state.designerStep = Math.min(4, state.designerStep + 1);
      render();
    });
  });

  document.querySelectorAll("[data-designer-product]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedDesignerProductId = button.dataset.designerProduct;
      render();
    });
  });

  document.querySelectorAll("[data-craft]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedCraft = button.dataset.craft;
      render();
    });
  });

  document.querySelectorAll("[data-designer-model]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedModel = button.dataset.designerModel;
      render();
    });
  });

  document.querySelectorAll("[data-designer-scene]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedScene = button.dataset.designerScene;
      render();
    });
  });

  document.querySelectorAll("[data-logo-position]").forEach((button) => {
    button.addEventListener("click", () => {
      state.logoPosition = button.dataset.logoPosition;
      render();
    });
  });

  document.querySelectorAll("[data-logo-size]").forEach((input) => {
    input.addEventListener("input", () => {
      state.logoSize = Number(input.value);
      render();
    });
  });

  document.querySelectorAll("[data-free-x]").forEach((input) => {
    input.addEventListener("input", () => {
      state.freeLogo.x = Number(input.value);
      render();
    });
  });

  document.querySelectorAll("[data-free-y]").forEach((input) => {
    input.addEventListener("input", () => {
      state.freeLogo.y = Number(input.value);
      render();
    });
  });

  document.querySelectorAll("[data-free-size]").forEach((input) => {
    input.addEventListener("input", () => {
      state.freeLogo.size = Number(input.value);
      render();
    });
  });
}

render();
