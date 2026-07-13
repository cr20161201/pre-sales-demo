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
    name: "DRY-EX Polo Shirt",
    category: "Polo",
    color: "Light Blue",
    material: "Quick-dry Mesh Fabric",
    image: assets.bluePolo,
    sourceImages: [
      { label: "Main Image", image: assets.bluePolo },
      { label: "Store Reference", image: assets.navyPoloShortsLook },
      { label: "Material Reference", image: assets.greenPolo },
    ],
    aiImages: [
      { label: "Assigned Model Image", status: "In Review", image: assets.navyPoloShortsLook },
      { label: "Product Comparison Image", status: "Passed", image: assets.greenPoloShortsLook },
      { label: "Material Detail Image", status: "Failed Review", image: assets.greenPolo },
    ],
  },
  {
    id: "uq-102",
    name: "Striped Crew Neck T-Shirt",
    category: "Tops",
    color: "Gray/White Stripes",
    material: "Cotton Blend",
    image: assets.stripedTee,
    sourceImages: [
      { label: "Main Image", image: assets.stripedTee },
      { label: "Styling Reference", image: assets.denimPants },
      { label: "Store Reference", image: assets.stripedDenimLook },
    ],
    aiImages: [
      { label: "Size Display Image", status: "In Review", image: assets.sizeMonoModels },
      { label: "Product Comparison Image", status: "Generating", image: assets.redStripedTee },
    ],
  },
  {
    id: "uq-103",
    name: "Men's Polo Shirt",
    category: "Polo",
    color: "Navy",
    material: "Cotton Pique",
    image: assets.darkPolo,
    sourceImages: [
      { label: "Main Image", image: assets.darkPolo },
      { label: "Comparison Product", image: assets.greenPolo },
      { label: "Scene Reference", image: assets.navyPoloShortsLook },
    ],
    aiImages: [
      { label: "Material Detail Image", status: "Failed Review", image: assets.navyPolo },
      { label: "Product Comparison Image", status: "In Review", image: assets.greenPoloShortsLook },
      { label: "Assigned Model Image", status: "In Review", image: assets.navyPoloShortsLook },
    ],
  },
  {
    id: "uq-104",
    name: "UT Graphic T-Shirt",
    category: "T-Shirt",
    color: "Orange",
    material: "Cotton Jersey",
    image: assets.orangeTee,
    sourceImages: [
      { label: "Main Image", image: assets.orangeTee },
      { label: "Styling Reference", image: assets.blackPants },
      { label: "Custom Order Base", image: assets.tanTee },
    ],
    aiImages: [
      { label: "Size Display Image", status: "Passed", image: assets.sizeTanModels },
      { label: "Assigned Model Image", status: "Passed", image: assets.orangeStoreLook },
    ],
  },
  {
    id: "uq-105",
    name: "Women's Pajama Set",
    category: "Loungewear",
    color: "Light Blue Stripes",
    material: "Soft Cotton",
    image: assets.pajamaModel,
    sourceImages: [
      { label: "Main Image", image: assets.pajamaModel },
      { label: "Lifestyle", image: assets.pajamaLifestyle },
      { label: "Scene Reference", image: assets.outdoorLook },
    ],
    aiImages: [
      { label: "Assigned Model Image", status: "Passed", image: assets.pajamaLifestyle },
      { label: "Product Detail Image", status: "In Review", image: assets.pajamaModel },
    ],
  },
];

const references = [
  { id: "ref-01", name: "Wide-Leg Jeans", type: "Styling Item", tone: "Casual", image: assets.denimPants },
  { id: "ref-02", name: "Store Display Scene", type: "Scene Reference", tone: "Store", image: assets.stripedDenimLook },
  { id: "ref-03", name: "Polo Material Reference", type: "Material Reference", tone: "Quick-dry", image: assets.greenPolo },
  { id: "ref-04", name: "Size Model Reference", type: "Size Reference", tone: "Height Comparison", image: assets.sizeTanModels },
  { id: "ref-05", name: "Portable Umbrella", type: "Accessory Reference", tone: "Functional Accessory", image: assets.umbrella },
  { id: "ref-06", name: "Striped Tee Comparison Style", type: "Comparison Product", tone: "Stripes", image: assets.redStripedTee },
];

const generatedResults = [
  { id: "img-01", product: "DRY-EX Polo Shirt", type: "Assigned Model Image", status: "Pending Review", ratio: "4:5", image: assets.navyPoloShortsLook },
  { id: "img-02", product: "Striped Crew Neck T-Shirt", type: "Size Display Image", status: "Pending Review", ratio: "1:1", image: assets.sizeMonoModels },
  { id: "img-03", product: "Men's Polo Shirt", type: "Material Detail Image", status: "Needs Retouch", ratio: "3:4", image: assets.greenPolo },
  { id: "img-04", product: "Women's Pajama Set", type: "Assigned Model Image", status: "Passed", ratio: "4:5", image: assets.pajamaLifestyle },
];

const productionTasks = [
  {
    id: "TASK-2406",
    title: "Spring/Summer Assigned Model Images",
    type: "Assigned Model Image",
    products: 18,
    images: 72,
    owner: "Wang Operator",
    createdAt: "Today 10:24",
    status: "Generating",
    progress: 64,
    stage: "AI Generation",
    source: "Batch-created from Style Library",
  },
  {
    id: "TASK-2405",
    title: "Knitwear Material Detail Images",
    type: "Material Detail Image",
    products: 12,
    images: 36,
    owner: "Li Operator",
    createdAt: "Yesterday 18:12",
    status: "Completed",
    progress: 100,
    stage: "Generation Complete",
    source: "Created from AI Tools",
  },
  {
    id: "TASK-2404",
    title: "Outerwear Product Comparison Images",
    type: "Product Comparison",
    products: 10,
    images: 30,
    owner: "Zhao Operator",
    createdAt: "Yesterday 15:46",
    status: "Failed",
    progress: 48,
    stage: "Missing Reference Image",
    source: "Reference Group Task",
  },
  {
    id: "TASK-2403",
    title: "Polo Size Display Images",
    type: "Size Display Image",
    products: 8,
    images: 24,
    owner: "Wang Operator",
    createdAt: "06-11 14:20",
    status: "Completed",
    progress: 100,
    stage: "Ready to Download",
    source: "Automated Batch",
  },
];

const reviewTasks = [
  { id: "TASK-2405", title: "Knitwear Material Detail Images", type: "Material Detail Image", total: 36, pass: 22, reject: 2, pending: 12, status: "In Review", stage: 3, updatedAt: "12 min ago" },
  { id: "TASK-2404", title: "Outerwear Product Comparison Images", type: "Product Comparison Image", total: 30, pass: 20, reject: 2, pending: 8, status: "In Review", stage: 3, updatedAt: "28 min ago" },
  { id: "TASK-2403", title: "Polo Size Comparison Images", type: "Size Comparison Image", total: 24, pass: 24, reject: 0, pending: 0, status: "Reviewed", stage: 4, updatedAt: "Yesterday 16:08" },
  { id: "TASK-2401", title: "Fall/Winter Outerwear Assigned Model Images", type: "Assigned Model Image", total: 48, pass: 45, reject: 3, pending: 0, status: "Reviewed", stage: 4, updatedAt: "06-10 09:32" },
];

const state = {
  view: "home",
  operatorTab: "tools",
  stylePage: "list",
  styleViewMode: "grid",
  styleCategoryFilter: "All",
  styleContentFilter: "All",
  accountMenuOpen: false,
  assetTypeFilter: "All",
  assetColorFilter: "All",
  selectedAssetIds: [],
  submittedAssetIds: [],
  deletedAssetIds: [],
  uploadedAssetCount: 0,
  previewAssetId: "",
  taskDrawerId: "",
  reviewDrawerId: "",
  auditStatusFilter: "Pending Review",
  selectedAuditIds: [],
  sizeAdjustOpen: false,
  aiToolPage: "list",
  aiWorkbenchAbility: "Size Display Image",
  aiWorkbenchTaskId: "ai-sample-01",
  profileDrawerOpen: false,
  profileDrawerEditing: false,
  aiCreateDrawerOpen: false,
  aiCreateType: "Virtual Model Wearing Image",
  aiCreateSource: "style",
  taskTypeFilter: "Assigned Model Image",
  profileSaved: false,
  adminTab: "review",
  designerMode: "guided",
  designerStep: 1,
  selectedDesignerProductId: "uq-104",
  selectedCraft: "Embroidery",
  selectedModel: "Store Model",
  selectedScene: "Standard White Background",
  selectedProductId: products[0].id,
  mainBasket: [products[0].id, products[1].id],
  referenceBasket: [references[0].id, references[2].id],
  taskCreated: false,
  approvedCount: 1,
  exportReady: false,
  logoSize: 20,
  logoPosition: "Left Chest",
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
      <button class="brand" data-view="home" aria-label="Back to Home">
        ${brandLogo("brand-mark")}
        <span>
          <strong>UNIQLO Content Studio</strong>
          <em>Product Content Studio</em>
        </span>
      </button>
      <div class="user-area">
        <button class="top-icon-btn lang-switch" data-lang-switch="zh" aria-label="Switch to Chinese">CN</button>
        <button class="top-icon-btn" aria-label="Search">Search</button>
        <button class="top-icon-btn" aria-label="Notifications">Notifications</button>
        <button class="top-icon-btn" aria-label="Help">Help</button>
        <div class="account-menu-wrap">
          <button class="account-button" data-account-menu>
            <span class="avatar">OP</span>
            <span>Operator Account</span>
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
        <h1>AI Product Visual Content Platform</h1>
      </div>
      <section class="entry-grid">
        ${entryCard("operator", "Operator AI Workspace", "AI tools, task lists, and generated assets.", "Open Operator Workspace")}
        ${entryCard("designer", "Custom Order Design Tool", "Garment + Logo workflows with guided generation and 2D free editing.", "Open Design Tool")}
        ${entryCard("admin", "AI Operations Admin", "Review, staff roles, prompt optimization, and vocabulary management.", "Open Admin")}
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
      ${renderSideNav("operator", "Product Content Production", "Operator Workspace", [
        ["operatorTab", "tools", "AI Tools", "spark"],
        ["operatorTab", "task", "Tasks", "tasks"],
        ["operatorTab", "audit", "Generated Assets", "review"],
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
          <button class="side-tool-btn" aria-label="System tools">${navIcon("settings")}</button>
          <button class="side-tool-btn" aria-label="Notifications">${navIcon("bell")}</button>
        </div>
        <div class="account-menu-wrap side-account-wrap">
          <button class="side-account" data-account-menu>
            <span class="avatar">${scope === "admin" ? "AD" : "OP"}</span>
            <span>
              <strong>${scope === "admin" ? "Administrator" : "Operator Account"}</strong>
              <em>${scope === "admin" ? "Administrator" : "Operator Account"}</em>
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
      <span class="menu-label">Switch System</span>
      <button class="${state.view === "operator" ? "active" : ""}" data-view="operator">Operator AI Workspace</button>
      <button class="${state.view === "designer" ? "active" : ""}" data-view="designer">Custom Order Design</button>
      <button class="${state.view === "admin" ? "active" : ""}" data-view="admin">AI Ops Admin</button>
      <span class="menu-label">Account</span>
      <button>Profile Settings</button>
      <button>Log Out</button>
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
      <h1>Style Library</h1>
    </div>
    <section class="library-control-bar">
      <label class="library-search">
        ${navIcon("search")}
        <input value="" placeholder="Search style name / SKU / category" />
      </label>
      <div class="library-filters">
        <select data-style-category>
          ${["All", ...unique(products.map((product) => product.category))].map((item) => `
            <option value="${item}" ${state.styleCategoryFilter === item ? "selected" : ""}>${item}</option>
          `).join("")}
        </select>
        <select data-style-content>
          ${["All", "Has Assets in Review", "Has Draft Assets", "Complete Assets"].map((item) => `
            <option value="${item}" ${state.styleContentFilter === item ? "selected" : ""}>${item}</option>
          `).join("")}
        </select>
        <div class="view-toggle" aria-label="Switch style library view">
          <button class="icon-btn ${state.styleViewMode === "grid" ? "active" : ""}" title="Grid View" aria-label="Grid View" data-style-view="grid">${navIcon("grid")}</button>
          <button class="icon-btn ${state.styleViewMode === "list" ? "active" : ""}" title="List View" aria-label="List View" data-style-view="list">${navIcon("list")}</button>
        </div>
        <button class="ghost-btn">Batch Import</button>
        <button class="primary-btn">New Style Profile</button>
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
      <strong>No matching styles</strong>
      <span>Adjust category or asset filters and try again.</span>
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
        <div class="asset-overview" aria-label="Asset overview">
          <div class="asset-overview-bar">
            <i class="approved" style="--w:${summary.approvedRatio}%"></i>
            <i class="reviewing" style="--w:${summary.reviewingRatio}%"></i>
            <i class="draft" style="--w:${summary.draftRatio}%"></i>
          </div>
          <em>${summary.total} assets · reviewed ${summary.approved} · In Review ${summary.reviewing} · draft ${summary.draft}</em>
        </div>
      </div>
    </article>`;
}

function filteredProducts() {
  return products.filter((product) => {
    const categoryMatch = state.styleCategoryFilter === "All" || product.category === state.styleCategoryFilter;
    const summary = assetSummary(product);
    const contentMatch =
      state.styleContentFilter === "All" ||
      (state.styleContentFilter === "Has Assets in Review" && summary.reviewing > 0) ||
      (state.styleContentFilter === "Has Draft Assets" && summary.draft > 0) ||
      (state.styleContentFilter === "Complete Assets" && summary.draft === 0 && summary.reviewing === 0);
    return categoryMatch && contentMatch;
  });
}

function assetSummary(product) {
  const assets = [
    ...product.sourceImages.map(() => ({ status: "Draft" })),
    ...product.aiImages,
  ];
  const total = assets.length;
  const approved = assets.filter((asset) => asset.status === "Passed").length;
  const reviewing = assets.filter((asset) => ["In Review", "Generating"].includes(asset.status)).length;
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
  const typeOptions = ["All", "Product Image", "Size Comparison Image", "Material Detail Image", "Product Comparison Image", "Styling Detail Image", "Assigned Model Image"];
  const colorOptions = unique(["All", selected.color, "All Colors", "Off-white", "Black"]);
  return `
    <div class="compact-return-row">
      <button class="text-link back-link" data-style-page="list">← Back to Style Library</button>
    </div>
    <section class="style-content-layout">
      <aside class="content-subnav">
        <section class="style-summary-card">
          <span>Current Style</span>
          <strong>${selected.name}</strong>
          <small>${selected.category}</small>
          <p>Office / Texture / Fall Outerwear</p>
          <p>Long wool-blend outerwear for fall office looks.</p>
          <button class="text-link" data-profile-drawer>View Details</button>
        </section>
        <section class="subnav-section">
          <h2>Content Type</h2>
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
          <h2>Color Variant</h2>
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
            <h2>${selectedCount ? `Selected ${selectedCount} images` : "Image Content"}</h2>
            <span>${selectedCount ? "Drafts can be submitted for review." : `${state.assetTypeFilter} · ${state.assetColorFilter} · ${assets.length} images`}</span>
          </div>
          <div class="head-actions">
            ${selectedCount ? `
              <button class="small-btn active" data-submit-assets>Submit for Review</button>
              <button class="small-btn" data-clear-assets>Clear Selection</button>
              <button class="danger-link" data-delete-assets>Delete</button>
            ` : `
              <button class="ghost-btn" data-upload-asset>Upload Image</button>
              <button class="primary-btn" data-ai-create data-ai-source="style">Create with AI</button>
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
            <h2>Create with AI</h2>
            <span>${currentTool.name} · ${selected.name}</span>
          </div>
          <button class="small-btn" data-close-ai-create>Close</button>
        </div>
        <div class="ai-create-body">
          ${renderAiTargetBlock(selected, fromStyle)}
          ${renderAiTypeSelect(tools, currentTool)}
          ${renderAiCreateFields(currentTool, selected)}
          <button class="primary-btn wide" data-create-task>Start Generation</button>
        </div>
      </aside>
    </div>`;
}

function renderAiTargetBlock(selected, fromStyle) {
  return `
    <section class="ai-field-block">
      <label class="ai-field-label">Target Content</label>
      <div class="ai-target-card">
        <img src="${selected.image}" alt="${selected.name}" />
        <div>
          <strong>${selected.name}</strong>
          <span>${selected.color} / M / Main Image</span>
          <em>${fromStyle ? "Switch SKU within the current style" : "Default target; choose from the library or upload"}</em>
        </div>
        <button class="small-btn">${fromStyle ? "Switch SKU" : "Switch Target"}</button>
      </div>
      ${fromStyle ? "" : `
        <div class="inline-actions">
          <button class="small-btn">Choose from Style Library</button>
          <button class="small-btn">Upload Image</button>
        </div>
      `}
    </section>`;
}

function renderAiTypeSelect(tools, currentTool) {
  return `
    <section class="ai-field-block">
      <label class="ai-field-label">Generation Type</label>
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
  if (field.type === "action") return renderAiActionField(field.label, field.action || "Open Settings");
  if (field.type === "common") return renderAiCommonParams(field);
  if (field.type === "placement") {
    return `
      <button class="placement-card" data-open-size-adjust>
        <span>${field.label}</span>
        <strong>Open Position Panel</strong>
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
      <label class="ai-field-label">${label}${multiple ? "<span>Multiple</span>" : ""}</label>
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
        <label><span>Width</span><input class="ai-input" value="${width}" /></label>
        <label><span>Height</span><input class="ai-input" value="${height}" /></label>
      </div>
    </div>`;
}

function renderAiColorField(label, options, defaultValue = []) {
  const selectedValues = Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  return `
    <div class="ai-field-block">
      <label class="ai-field-label">${label}<span>Multiple</span></label>
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
      ${renderAiChoiceField("Aspect Ratio", ["1:1", "3:4", "4:5", "9:16", "16:9"], field.ratio || "4:5")}
      ${renderAiChoiceField("Resolution", ["1K", "2K", "4K"], field.quality || "2K")}
      ${renderAiChoiceField("Output Count", ["1 images", "2 images", "4 images", "6 images"], field.count || "4 images")}
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
            <h2>Style Details</h2>
            <span>${selected.id}</span>
          </div>
          <button class="small-btn" data-close-profile-drawer>Close</button>
        </div>
        ${state.profileDrawerEditing ? `
          <div class="drawer-form">
            ${editField("Style Name", selected.name)}
            ${editField("Category", selected.category)}
            ${editField("Selling Points", "Office / Texture / Fall Outerwear")}
            ${editField("Description", "Long wool-blend outerwear for fall office looks.")}
            ${editField("Color", selected.color)}
            ${editField("Material", selected.material)}
            <div class="drawer-actions">
              <button class="ghost-btn" data-profile-view>Cancel</button>
              <button class="primary-btn" data-save-profile>Save</button>
            </div>
          </div>` : `
          <div class="drawer-detail">
            ${meta("Style Name", selected.name)}
            ${meta("Category", selected.category)}
            ${meta("Selling Points", "Office / Texture / Fall Outerwear")}
            ${meta("Description", "Long wool-blend outerwear for fall office looks.")}
            ${meta("Color", selected.color)}
            ${meta("Material", selected.material)}
          </div>
          <button class="primary-btn wide" data-profile-edit>Edit Profile</button>`}
      </aside>
    </div>`;
}

function assetCountBy(kind, value) {
  return allContentAssets().filter((item) => {
    if (kind === "type") return value === "All" || item.type === value;
    if (kind === "color") return value === "All" || item.color === value;
    return true;
  }).length;
}

function renderProfileEditPage() {
  const selected = selectedProduct();
  return `
    <div class="toolbar-head">
      <button class="text-link back-link" data-style-page="content">← Back to Content Home</button>
    </div>
    <div class="form-action-row">
      <h1>Edit Profile</h1>
      <button class="primary-btn" data-save-profile>${state.profileSaved ? "Saved" : "Save and Return"}</button>
    </div>
    <section class="panel profile-edit">
      ${editField("Product Name", selected.name)}
      ${editField("Category", selected.category)}
      ${editField("Available Colors", `${selected.color} / Off-white / Black`)}
      ${editField("Material", selected.material)}
      ${editField("Product Highlights", "Structured silhouette, office scenarios, fall outerwear")}
      ${editField("Styling Suggestions", "Light inner layer, straight pants, ankle boots")}
      ${editField("Restricted Claims", "Avoid absolute performance claims")}
      ${editField("Size Information", "S / M / L / XL")}
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
            <h2>Image Preview</h2>
            <span>${product.name} · ${asset.type} · ${asset.color} · ${asset.status}</span>
          </div>
          <button class="small-btn" data-close-preview>Close</button>
        </div>
        <div class="preview-drawer-body">
          <div class="preview-image-stage">
            <button class="preview-arrow prev" ${prev ? `data-preview-asset="${prev.id}"` : "disabled"} aria-label="Previous">‹</button>
            <img src="${asset.image}" alt="${asset.type}" />
            <button class="preview-arrow next" ${next ? `data-preview-asset="${next.id}"` : "disabled"} aria-label="Next">›</button>
            <strong class="preview-count">${index + 1} / ${assets.length}</strong>
          </div>
          <div class="preview-meta-line">
            <span>${asset.tags.join(" / ")} · ${asset.source}</span>
            <span>${asset.type} · ${asset.color}</span>
          </div>
          <div class="preview-action-row">
            <button class="primary-btn" data-ai-create data-ai-source="style">Create with AI</button>
            <button class="small-btn" data-delete-one="${asset.id}">Delete</button>
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
        <span>${summary.total} assets · reviewed ${summary.approved} · In Review ${summary.reviewing} · draft ${summary.draft}</span>
      </div>
      <button class="small-btn" data-open-style="${product.id}">Open Home</button>
    </article>`;
}

function allContentAssets() {
  const product = selectedProduct();
  const base = [
    ...product.sourceImages.map((item, index) => ({
      id: `${product.id}-source-${index}`,
      productId: product.id,
      type: item.label === "Main Image" || item.label === "White Background Image" ? "Product Image" : item.label,
      color: index === 2 ? "All Colors" : product.color,
      status: state.submittedAssetIds.includes(`${product.id}-source-${index}`) ? "In Review" : "Draft",
      tags: [item.label, index === 0 ? "Front" : "Reference"],
      source: "Operator Upload",
      image: item.image,
    })),
    ...product.aiImages.map((item, index) => ({
      id: `${product.id}-ai-${index}`,
      productId: product.id,
      type: item.label,
      color: item.label === "Size Comparison Image" || item.label === "Product Comparison Image" ? "All Colors" : product.color,
      status: state.submittedAssetIds.includes(`${product.id}-ai-${index}`) ? "In Review" : item.status,
      tags: item.label.includes("Model") ? ["Studio Shoot", "Front"] : ["AI Generated"],
      source: "AI Generated",
      image: item.image,
    })),
  ];

  const uploaded = Array.from({ length: state.uploadedAssetCount }, (_, index) => ({
    id: `${product.id}-uploaded-${index}`,
    productId: product.id,
    type: "Product Image",
    color: product.color,
    status: state.submittedAssetIds.includes(`${product.id}-uploaded-${index}`) ? "In Review" : "Draft",
    tags: ["Operator Upload", "Supplemental Image"],
    source: "Operator Upload",
    image: product.image,
  }));

  return [...base, ...uploaded].filter((item) => !state.deletedAssetIds.includes(item.id));
}

function filteredAssets() {
  return allContentAssets().filter((item) => {
    const typeMatch = state.assetTypeFilter === "All" || item.type === state.assetTypeFilter;
    const colorMatch = state.assetColorFilter === "All" || item.color === state.assetColorFilter;
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
          <h1>AI Tools</h1>
        </div>
        <div class="ai-tool-sections">
          ${toolGroups.map((group) => `
            <section class="ai-tool-section">
              <div class="ai-tool-section-head">
                <h2>${group.title}</h2>
                <span>${group.tools.length} tools</span>
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
      <aside class="ai-task-rail" aria-label="Tasks">
        <button class="ai-task-new">New</button>
        ${tasks.map((task) => `
          <button class="ai-task-thumb ${currentTask.id === task.id ? "active" : ""}" data-ai-workbench-task="${task.id}">
            <img src="${task.productImage}" alt="" />
          </button>
        `).join("")}
      </aside>
      <section class="ai-params-panel">
        <div class="ai-params-scroll">
          <button class="text-link ai-tool-back" data-ai-tool-list>← AI Tools</button>
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
          <button class="primary-btn wide" data-create-task>Generate Now</button>
        </div>
      </section>
      <section class="ai-result-panel">
        <div class="ai-result-head">
          <div>
            <h2>Results</h2>
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
            <h2>Adjust Reference Image Position</h2>
            <span>Use the product image as the background and the reference image to mark placement.</span>
          </div>
          <button class="small-btn" data-close-size-adjust>Close</button>
        </div>
        <div class="size-adjust-canvas">
          <img class="size-bg" src="${task.productImage}" alt="" />
          <img class="size-ref" src="${task.referenceImage}" alt="" />
        </div>
        <div class="drawer-actions">
          <button class="ghost-btn" data-close-size-adjust>Cancel</button>
          <button class="primary-btn" data-close-size-adjust>Confirm Position</button>
        </div>
      </aside>
    </div>`;
}

function aiToolItems() {
  return [
    {
      title: "Product Detail Extensions",
      tools: [
        aiTool("Size Display Image", "Generate clothing size or bag dimension display images.", "Product category / Product image / Comparison image / Display mode", assets.sizeTanModels, "4:5", [
          { type: "chips", label: "Product Category", options: ["Apparel", "Bags"], defaultValue: "Apparel" },
          { type: "upload", label: "Product Image", defaultImage: assets.tanTee },
          { type: "upload", label: "Comparison Image", defaultImage: assets.sizeTanModels },
          { type: "upload", label: "Reference Image", defaultImage: assets.sizeMonoModels },
          { type: "chips", label: "Display Mode", options: ["Side-by-side", "Overlay", "Table Comparison"], defaultValue: "Side-by-side" },
          { type: "input", label: "Clothing Size Info", defaultValue: "S / M / L / XL", showWhen: { "Product Category": "Apparel" } },
          { type: "size", label: "Bag Dimensions", width: "42 cm", height: "30 cm", showWhen: { "Product Category": "Bags" } },
          { type: "placement", label: "Adjust Reference Image Position" },
          { type: "common", ratio: "4:5" },
        ], "Keep product colors accurate; system labels size and height information."),
        aiTool("Material Detail Image", "Generate fabric texture and material explanation images.", "Product image / Material reference / Fabric composition / Hand feel", assets.greenPolo, "4:5", [
          { type: "upload", label: "Product Image", defaultImage: assets.greenPolo },
          { type: "upload", label: "Material Reference", defaultImage: assets.darkPolo },
          { type: "chips", label: "Display Template", options: ["Close-up Zoom", "Texture Collage", "Worn Close-up", "Material Explanation Layout"], defaultValue: "Close-up Zoom" },
          { type: "input", label: "Fabric Composition", defaultValue: "Cotton 73% / Polyester 27%" },
          { type: "chips", label: "Hand Feel", options: ["Soft", "Lightweight", "Structured", "Skin-friendly", "Stretch", "Dry Touch"], defaultValue: ["Soft", "Skin-friendly"], multiple: true },
          { type: "textarea", label: "Prompt", defaultValue: "Highlight fabric texture, thickness, and sheen while preserving silhouette and color." },
          { type: "common", ratio: "4:5" },
        ]),
        aiTool("Product Comparison", "Generate comparison images across gender, color, or other product dimensions.", "Product image / Comparison dimension / Display template", assets.greenPoloShortsLook, "16:9", [
          { type: "upload", label: "Product Image", defaultImage: assets.darkPolo },
          { type: "chips", label: "Comparison Dimension", options: ["Compare Men/Women", "Compare Colors", "Compare Other Products"], defaultValue: "Compare Colors" },
          { type: "images", label: "Model Reference Image", items: [{ name: "Male Model", image: assets.sizeMonoModels }, { name: "Female Model", image: assets.sizeTanModels }], showWhen: { "Comparison Dimension": "Compare Men/Women" } },
          { type: "colors", label: "Compare Colors", options: aiColorOptions(), defaultValue: ["White", "Black", "Green"], showWhen: { "Comparison Dimension": "Compare Colors" } },
          { type: "upload", label: "Comparison Product Image", defaultImage: assets.greenPoloShortsLook, showWhen: { "Comparison Dimension": "Compare Other Products" } },
          { type: "chips", label: "Display Template", options: ["Left-right Comparison", "Three-column Comparison", "Specs Table + Image", "Image Above, Table Below"], defaultValue: "Left-right Comparison" },
          { type: "textarea", label: "Prompt", defaultValue: "Generate color comparisons for the same product with consistent angle, lighting, and scale." },
          { type: "common", ratio: "16:9" },
        ]),
        aiTool("Product Detail Image", "Generate local detail, craftsmanship, and selling-point images.", "Product image / Detail reference / Detail type", assets.pajamaModel, "4:5", [
          { type: "upload", label: "Product Image", defaultImage: assets.pajamaModel },
          { type: "upload", label: "Detail Reference", defaultImage: assets.pajamaLifestyle },
          { type: "chips", label: "Detail Type", options: ["Collar", "Cuff", "Hem", "Pocket", "Zipper", "Button", "Stitching", "Fabric Texture", "Logo / Mark", "Fit & Cutting"], defaultValue: ["Collar", "Fabric Texture"], multiple: true },
          { type: "chips", label: "Display Template", options: ["Detail Close-up", "Annotated Layout", "Multi-tile Details", "Scene Close-up"], defaultValue: "Detail Close-up" },
          { type: "textarea", label: "Prompt", defaultValue: "Generate product detail images highlighting structure, seams, and material texture." },
          { type: "common", ratio: "4:5" },
        ]),
      ],
    },
    {
      title: "Flat-lay Compositions",
      tools: [
        aiTool("Flat-lay Composition", "Generate flat-lay compositions from multiple products.", "Product set / Flat-lay template / Arrangement", assets.stripedDenimLook, "1:1", [
          { type: "images", label: "Product Set", items: [{ name: "Polo", image: assets.bluePolo }, { name: "Shorts", image: assets.easyShorts }, { name: "Jeans", image: assets.denimPants }] },
          { type: "chips", label: "Flat-lay Template", options: ["White Background Flat-lay", "Soft-shadow Flat-lay", "Category Grouping", "Outfit Set", "Promotion Display"], defaultValue: "White Background Flat-lay" },
          { type: "chips", label: "Arrangement", options: ["Horizontal", "Vertical", "Grid", "Staggered", "Radial"], defaultValue: "Grid" },
          { type: "chips", label: "Quantity", options: ["2 items", "3 items", "4 items", "6 items"], defaultValue: "4 items" },
          { type: "textarea", label: "Prompt", defaultValue: "Generate a clean flat-lay with even spacing and natural shadows." },
          { type: "common", ratio: "1:1" },
        ]),
        aiTool("Flat-lay Scene Image", "Place product combinations into a selected scene background.", "Product set / Scene reference / Background", assets.orangeStoreLook, "4:5", [
          { type: "images", label: "Product Set", items: [{ name: "T-Shirt", image: assets.orangeTee }, { name: "Pants", image: assets.blackPants }, { name: "Bag", image: assets.toteBag }] },
          { type: "upload", label: "Scene Reference", defaultImage: assets.orangeStoreLook },
          { type: "chips", label: "Background", options: ["White Background", "Store", "Lifestyle Scene", "Outdoor", "Holiday Campaign", "Custom Upload"], defaultValue: "Store" },
          { type: "textarea", label: "Prompt", defaultValue: "Place flat-lay products in a scene while preserving scale and display relationships." },
          { type: "common", ratio: "4:5" },
        ]),
        aiTool("Product Logo Preview", "Generate garment preview images with a specified product and logo.", "Product image / Logo / Placement mode / Craft", assets.outdoorLook, "4:5", [
          { type: "upload", label: "Product Image", defaultImage: assets.outdoorLook },
          { type: "upload", label: "Logo", defaultImage: assets.uniqloLogo },
          { type: "chips", label: "Placement Mode", options: ["Preset Position", "Free Position"], defaultValue: "Preset Position" },
          { type: "chips", label: "Placement Preset", options: ["Left Chest", "Right Chest", "Center Chest", "Center Back", "Cuff", "Hem"], defaultValue: "Left Chest", showWhen: { "Placement Mode": "Preset Position" } },
          { type: "chips", label: "Logo Size", options: ["Small", "Medium", "Large"], defaultValue: "Medium" },
          { type: "action", label: "Free Placement", action: "Open Placement Reference", showWhen: { "Placement Mode": "Free Position" } },
          { type: "chips", label: "Craft", options: ["Embroidery", "Heat Transfer", "Screen Print", "Patch Embroidery", "High-frequency TPU", "Woven Label", "Silicone", "Thick Print"], defaultValue: "Embroidery" },
          { type: "textarea", label: "Prompt", defaultValue: "Keep logo edges crisp and aligned with garment folds and craft texture." },
          { type: "common", ratio: "4:5" },
        ]),
      ],
    },
    {
      title: "Model Display",
      tools: [
        aiTool("Virtual Model Wearing Image", "Generate DP model single-item wearing images.", "Product image / Gender / Age group / Scene", assets.sizeTanModels, "4:5", [
          { type: "upload", label: "Product Image", defaultImage: assets.tanTee },
          { type: "chips", label: "Gender", options: ["Male", "Female"], defaultValue: "Female" },
          { type: "chips", label: "Age Group", options: ["Adult", "Kids"], defaultValue: "Adult" },
          { type: "chips", label: "Scene", options: ["White Background", "Store", "Lifestyle", "Outdoor"], defaultValue: "White Background" },
          { type: "textarea", label: "Prompt", defaultValue: "Generate standard model wearing images while preserving color, length, and silhouette." },
          { type: "common", ratio: "4:5" },
        ]),
        aiTool("Multi-item Outfit Image", "Combine multiple products on one model.", "Product set / Model source / Styling method / Scene", assets.greenPoloShortsLook, "4:5", [
          { type: "images", label: "Product Set", items: [{ name: "Top", image: assets.greenPolo }, { name: "Bottom", image: assets.easyShorts }, { name: "Accessory", image: assets.toteBag }] },
          { type: "chips", label: "Model Source", options: ["Upload/Choose Reference", "Generate Model"], defaultValue: "Generate Model" },
          { type: "images", label: "Model Reference Image", items: [{ name: "Store Model", image: assets.orangeStoreLook }, { name: "Real Model", image: assets.pajamaModel }], showWhen: { "Model Source": "Upload/Choose Reference" } },
          { type: "chips", label: "Model Parameters", options: ["Female", "Young Adult", "East Asian", "Standard Build"], defaultValue: ["Female", "Young Adult", "East Asian"], multiple: true, showWhen: { "Model Source": "Generate Model" } },
          { type: "chips", label: "Styling Method", options: ["Current Product Only", "Current Product + Recommended Styling", "Full Outfit"], defaultValue: "Full Outfit" },
          { type: "chips", label: "Scene", options: ["White Background", "Store", "Lifestyle", "Outdoor"], defaultValue: "Lifestyle" },
          { type: "textarea", label: "Prompt", defaultValue: "Generate multi-item outfit images with realistic scale and layering." },
          { type: "common", ratio: "4:5" },
        ]),
        aiTool("Pose & Scene Composite", "Generate composites from model, pose, and scene inputs.", "Product image / Model source / Pose source / Scene source", assets.pajamaLifestyle, "4:5", [
          { type: "upload", label: "Product Image", defaultImage: assets.pajamaModel },
          { type: "chips", label: "Model Source", options: ["Upload Image", "Generate from Parameters"], defaultValue: "Generate from Parameters" },
          { type: "images", label: "Model Image", items: [{ name: "Store Model", image: assets.orangeStoreLook }, { name: "Real Model", image: assets.pajamaModel }], showWhen: { "Model Source": "Upload Image" } },
          { type: "chips", label: "Model Parameters", options: ["Female", "Young Adult", "East Asian", "Standard Build"], defaultValue: ["Female", "Young Adult", "East Asian"], multiple: true, showWhen: { "Model Source": "Generate from Parameters" } },
          { type: "chips", label: "Pose Source", options: ["Upload Image", "Generate from Parameters"], defaultValue: "Generate from Parameters" },
          { type: "upload", label: "Pose Image", defaultImage: assets.sizeTanModels, showWhen: { "Pose Source": "Upload Image" } },
          { type: "chips", label: "Pose Parameters", options: ["Front", "45 Degrees", "Full Body", "Standing", "Walking", "Natural Expression"], defaultValue: ["Front", "Full Body", "Standing"], multiple: true, showWhen: { "Pose Source": "Generate from Parameters" } },
          { type: "chips", label: "Scene Source", options: ["Upload Image", "Generate from Parameters"], defaultValue: "Generate from Parameters" },
          { type: "upload", label: "Scene Image", defaultImage: assets.orangeStoreLook, showWhen: { "Scene Source": "Upload Image" } },
          { type: "chips", label: "Scene Parameters", options: ["White Background", "Store", "Street", "Home", "Natural Light", "Japanese Style"], defaultValue: ["Store", "Natural Light"], multiple: true, showWhen: { "Scene Source": "Generate from Parameters" } },
          { type: "textarea", label: "Prompt", defaultValue: "Composite model, pose, and scene while keeping the product clear with consistent lighting and perspective." },
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
    if (field.label.includes("Product")) {
      return { ...field, defaultImage: field.defaultImage || task.productImage };
    }
    if (field.label.includes("Reference") || field.label.includes("Comparison")) {
      return { ...field, defaultImage: field.defaultImage || task.referenceImage };
    }
    return field;
  });
}

function aiColorOptions() {
  return [
    { name: "White", color: "#f8fafc" },
    { name: "Black", color: "#16181c" },
    { name: "Green", color: "#83a98f" },
    { name: "Blue", color: "#567ca6" },
    { name: "Red", color: "#c54d4a" },
    { name: "Beige", color: "#d7c6aa" },
  ];
}

function renderTaskBasket() {
  return `
    <div class="section-head">
      <div>
        <p class="eyebrow">Task basket</p>
        <h1>Main Product Basket / Reference Basket</h1>
        <p>For styling, material, and comparison tasks, choose references first, then preview combinations.</p>
      </div>
      <button class="primary-btn" data-operator-tab="task">Create AI Task</button>
    </div>
    <div class="basket-grid">
      ${basketPanel("Main Product Basket", "Products that need generated content", products, state.mainBasket, "main")}
      ${basketPanel("Reference Basket", "Styling products, material references, scene references, comparison products", references, state.referenceBasket, "reference")}
    </div>
    <section class="panel">
      <h2>Combination Preview</h2>
      <div class="match-list">
        ${renderCombination("uq-101", "ref-01", "Outfit Set Image", "White BackgroundStudio Shoot")}
        ${renderCombination("uq-102", "ref-03", "Material Detail Image", "Texture Close-up")}
        ${renderCombination("uq-103", "ref-04", "Product Comparison Image", "Fit Comparison")}
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
        <em>${type} · ${scene} · enters review after submission</em>
      </div>
      <button class="ghost-btn">Replace Reference</button>
    </article>`;
}

function renderGenerationTask() {
  return `
    <section class="task-page">
      <div class="toolbar-head task-toolbar">
        <h1>Tasks</h1>
      </div>
      <section class="task-filter-bar">
        ${["All", "Generating", "Completed", "Failed"].map((filter, index) => `
          <button class="filter-chip ${index === 0 ? "active" : ""}">${filter}</button>
        `).join("")}
        <label class="search-field">
          <span>Search</span>
          <input value="" placeholder="Task ID / Type" />
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
          <span>${task.images} images</span>
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
          <button class="small-btn" data-close-task-drawer>Close</button>
        </div>
        <section class="task-detail-status">
          <span class="status-pill" data-status="${task.status}">${task.status}</span>
          <strong>${task.stage}</strong>
        </section>
        <section class="task-detail-section">
          <h3>Production Images</h3>
          <div class="task-detail-gallery">
            ${taskImages.map((product) => `<img src="${product.image}" alt="${product.name}" />`).join("")}
          </div>
        </section>
        <section class="task-detail-section compact-info-list">
          ${meta("Generation Type", task.type)}
          ${meta("Image Count", `${task.images} Images`)}
          ${meta("Creation Source", task.source)}
          ${meta("Submitter", task.owner)}
        </section>
      </aside>
    </div>`;
}

function renderReviewPool() {
  return `
    <div class="section-head">
      <div>
        <p class="eyebrow">Review required</p>
        <h1>Review Center</h1>
        <p>Handle approval, rejection, local retouching, and regeneration for AI results.</p>
      </div>
      <button class="primary-btn" data-approve-all>Approve Pending in Batch</button>
    </div>
    <section class="review-grid">
      ${generatedResults.map((item) => reviewCard(item)).join("")}
    </section>`;
}

function renderReviewProgress() {
  return `
    <section class="task-page">
      <div class="toolbar-head task-toolbar">
        <h1>Review Progress</h1>
      </div>
      <section class="task-filter-bar">
        ${["All", "In Review", "Reviewed"].map((filter, index) => `
          <button class="filter-chip ${index === 0 ? "active" : ""}">${filter}</button>
        `).join("")}
        <label class="search-field">
          <span>Search</span>
          <input value="" placeholder="Task ID / Style / Type" />
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
    { id: "AUD-10031", taskId: "TASK-2406", type: "Size Display Image", submitter: "Wang Operator", status: "Pending Review", createdAt: "Today 11:02", image: assets.sizeTanModels },
    { id: "AUD-10032", taskId: "TASK-2406", type: "Material Detail Image", submitter: "Li Operator", status: "Pending Review", createdAt: "Today 11:01", image: assets.greenPolo },
    { id: "AUD-10033", taskId: "TASK-2405", type: "Product Comparison", submitter: "Zhao Operator", status: "Approved", createdAt: "Yesterday 18:42", image: assets.greenPoloShortsLook },
    { id: "AUD-10034", taskId: "TASK-2405", type: "Product Detail Image", submitter: "Wang Operator", status: "Rejected", createdAt: "Yesterday 18:40", image: assets.pajamaModel },
    { id: "AUD-10035", taskId: "TASK-2404", type: "Assigned Model Image", submitter: "Li Operator", status: "Pending Review", createdAt: "Yesterday 16:10", image: assets.orangeStoreLook },
    { id: "AUD-10036", taskId: "TASK-2403", type: "Size Display Image", submitter: "Wang Operator", status: "Approved", createdAt: "06-11 15:30", image: assets.sizeMonoModels },
    { id: "AUD-10037", taskId: "TASK-2403", type: "Product Comparison", submitter: "Zhao Operator", status: "Pending Review", createdAt: "06-11 15:28", image: assets.stripedDenimLook },
    { id: "AUD-10038", taskId: "TASK-2402", type: "Material Detail Image", submitter: "Li Operator", status: "Approved", createdAt: "06-10 09:12", image: assets.darkPolo },
  ];
}

function renderImageAudit() {
  const items = imageAuditItems().filter((item) => item.status === state.auditStatusFilter);
  const batchLabel = state.auditStatusFilter === "Pending Review" ? "Submit Selected for Review" : state.auditStatusFilter === "Approved" ? "Batch Download" : "";
  return `
    <section class="task-page image-audit-page">
      <div class="toolbar-head task-toolbar">
        <h1>Generated Assets</h1>
        ${batchLabel ? `<button class="primary-btn">${batchLabel}</button>` : ""}
      </div>
      <section class="task-filter-bar">
        ${["Pending Review", "Approved", "Rejected"].map((filter) => `
          <button class="filter-chip ${state.auditStatusFilter === filter ? "active" : ""}" data-audit-status="${filter}">${filter}</button>
        `).join("")}
        <label class="search-field">
          <span>Search</span>
          <input value="" placeholder="Image ID / Task ID / Type" />
        </label>
      </section>
      <section class="audit-image-grid">
        ${items.map((item) => auditImageCard(item, { showCheckbox: state.auditStatusFilter !== "Rejected", mode: "operator" })).join("")}
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
          <button class="small-btn" data-close-review-drawer>Close</button>
        </div>
        <div class="audit-preview-stage">
          <img src="${item.image}" alt="${item.type}" />
        </div>
        <section class="audit-meta-grid">
          ${compactMeta("Review Status", item.status)}
          ${compactMeta("Created At", item.createdAt)}
          ${compactMeta("Task ID", item.taskId)}
          ${compactMeta("Image Type", item.type)}
          ${compactMeta("Submitter", item.submitter)}
        </section>
        <div class="drawer-actions">
          <button class="small-btn">Reject</button>
          <button class="primary-btn">Approve</button>
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
          <span>ID ${task.id}</span>
          <span>Updated ${task.updatedAt}</span>
          <span>${task.total} images</span>
        </div>
      </div>
    </article>`;
}

function renderTypeTabs(tabs, active, key) {
  return `
    <nav class="task-type-tabs" aria-label="AI Type">
      ${tabs.map((tab) => `
        <button class="${active === tab ? "active" : ""}" data-${key}="${tab}">${tab}</button>
      `).join("")}
    </nav>`;
}

function renderReviewDrawer() {
  const task = reviewTasks.find((item) => item.id === state.reviewDrawerId) || reviewTasks[0];
  const steps = ["Submitted", "Machine QA", "Manual Review", task.status === "Reviewed" ? "Completed" : "Processing"];
  const taskImages = taskAlbumProducts(task.id).slice(0, 6);
  return `
    <div class="drawer-backdrop" data-close-review-drawer>
      <aside class="profile-drawer task-detail-drawer" data-drawer-panel>
        <div class="drawer-head">
          <div>
            <h2>${task.title}</h2>
            <span>${task.id} · Updated ${task.updatedAt}</span>
          </div>
          <button class="small-btn" data-close-review-drawer>Close</button>
        </div>
        <section class="task-detail-status">
          <span class="status-pill" data-status="${task.status}">${task.status}</span>
          <strong>${task.status === "Reviewed" ? "Review Complete" : "Manual Review in Progress"}</strong>
          <em>${Math.round((task.stage / 4) * 100)}%</em>
          <div class="linear-progress" style="--progress:${Math.round((task.stage / 4) * 100)}%"></div>
        </section>
        <section class="task-detail-section">
          <h3>Review Images</h3>
          <div class="task-detail-gallery">
            ${taskImages.map((product, index) => `
              <figure>
                <img src="${product.image}" alt="${product.name}" />
                <figcaption>${index < task.pass ? "Passed" : index < task.pass + task.reject ? "Failed Review" : "Pending Review"}</figcaption>
              </figure>
            `).join("")}
          </div>
        </section>
        <section class="task-detail-section">
          <h3>Review Progress</h3>
          <div class="review-stepper compact">
            ${steps.map((step, index) => `
              <span class="${index < task.stage ? "done" : ""}">${step}</span>
            `).join("")}
          </div>
        </section>
        <section class="task-detail-section compact-info-list">
          ${meta("Generated", task.total)}
          ${meta("Pending", task.pending)}
          ${meta("Approve", task.pass)}
          ${meta("Reject", task.reject)}
        </section>
      </aside>
    </div>`;
}

function reviewCard(item) {
  const approved = item.status === "Passed" || state.approvedCount > 1;
  return `
    <article class="review-card">
      <img src="${item.image}" alt="${item.product}" />
      <div>
        <span class="status-pill" data-status="${approved ? "Passed" : item.status}">${approved ? "Passed" : item.status}</span>
        <h2>${item.product}</h2>
        <p>${item.type} · ${item.ratio} · Prompt traceable</p>
      </div>
      <div class="card-actions">
        <button class="small-btn">Local Retouch</button>
        <button class="small-btn">Reject</button>
        <button class="small-btn active">Approve</button>
      </div>
    </article>`;
}

function renderExportPanel() {
  return `
    <div class="section-head">
      <div>
        <p class="eyebrow">Task result</p>
        <h1>Result Package Download</h1>
        <p>Completed review tasks can be downloaded as result packages; no separate asset package module is needed.</p>
      </div>
      <button class="primary-btn" data-export-package>${state.exportReady ? "Result Package Ready" : "Generate Result Package"}</button>
    </div>
    <section class="panel export-panel">
      <div class="package-box">
        <h2>Spring/Summer Detail Image Result Package</h2>
        <div class="package-stats">
          ${stat("Styles", "24")}
          ${stat("Images", state.exportReady ? "186" : "Pending")}
          ${stat("Approved", state.exportReady ? "168" : "34")}
          ${stat("Export Format", "ZIP + CSV")}
        </div>
      </div>
      <div class="export-list">
        <span>Image Files</span>
        <span>Product Basic Info</span>
        <span>Generation Type</span>
        <span>Aspect Ratio / Resolution</span>
        <span>Prompt Summary</span>
        <span>Optimized Copy / Image Notes</span>
      </div>
    </section>`;
}

function renderDesigner() {
  const product = productById(state.selectedDesignerProductId);
  const steps = ["Select Style", "Logo & Craft", "Model & Scene", "Preview Results"];
  const fullStep = state.designerStep === 1 || state.designerStep === 3;
  return `
    <section class="designer-page standalone-designer">
      <div class="designer-topbar">
        <button class="side-brand-mark" data-view="home">${brandLogo("brand-logo-inner")}</button>
        <div class="designer-title">
          <div class="designer-title-line">
            <h1>Custom Order Design Tool</h1>
            <div class="account-menu-wrap">
              <button class="designer-switch-btn" data-lang-switch="zh">CN</button>
              <button class="designer-switch-btn" data-account-menu>Switch System</button>
              ${state.accountMenuOpen ? renderAccountMenu() : ""}
            </div>
          </div>
        </div>
        <div class="segmented">
          <button class="${state.designerMode === "guided" ? "active" : ""}" data-designer-mode="guided">Preset Position</button>
          <button class="${state.designerMode === "free" ? "active" : ""}" data-designer-mode="free">Free Edit</button>
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
        <span>${showLogo ? `${state.selectedCraft} · ${state.designerMode === "guided" ? state.logoPosition : "Free Position"}` : "Base Style"}</span>
      </div>
    </section>`;
}

function renderDesignerActions() {
  return `
    <div class="designer-step-actions">
      <button class="small-btn" ${state.designerStep === 1 ? "disabled" : ""} data-designer-prev>${state.designerStep === 4 ? "Edit Again" : "Previous"}</button>
      <button class="primary-btn" data-designer-next>${state.designerStep === 4 ? "Confirm Export" : state.designerStep === 3 ? "Generate Results" : "Next"}</button>
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
      <h2>Select Style</h2>
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
      <h2>Logo & Craft</h2>
    </div>
    <div class="form-stack">
      <div class="logo-upload-card">
        <img src="${assets.uniqloLogo}" alt="UNIQLO logo" />
        <div>
          <strong>logo.png</strong>
          <span>Uploaded</span>
        </div>
        <button class="small-btn">Change Logo</button>
      </div>
      ${state.designerMode === "guided" ? renderFixedLogoControls() : renderFreeLogoControls()}
      <div>
        <span class="field-label">Craft</span>
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
      <span>Logo Size</span>
      <input type="range" min="12" max="34" value="${state.logoSize}" data-logo-size />
    </label>
    <div>
      <span class="field-label">Logo Position</span>
      <div class="pill-grid">
        ${["Left Chest", "Right Chest", "Center Chest", "Center Back", "Hem"].map((item) => `
          <button class="choice-pill ${state.logoPosition === item ? "active" : ""}" data-logo-position="${item}">${item}</button>
        `).join("")}
      </div>
    </div>`;
}

function renderFreeLogoControls() {
  return `
    <label class="range-row">
      <span>Horizontal Position</span>
      <input type="range" min="20" max="78" value="${state.freeLogo.x}" data-free-x />
    </label>
    <label class="range-row">
      <span>Vertical Position</span>
      <input type="range" min="18" max="68" value="${state.freeLogo.y}" data-free-y />
    </label>
    <label class="range-row">
      <span>Logo Size</span>
      <input type="range" min="12" max="34" value="${state.freeLogo.size}" data-free-size />
    </label>`;
}

function renderDesignerSceneStep() {
  return `
    <div class="designer-step-head">
      <h2>Model & Scene</h2>
    </div>
    <div class="form-stack">
      <div>
        <span class="field-label">Model</span>
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
        <span class="field-label">Scene</span>
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
    { title: "Standard White Background Preview", image: productById(state.selectedDesignerProductId).image },
    { title: "AI Model Wearing Preview", image: selectedModelImage() },
    { title: "Lifestyle Scene Preview", image: selectedSceneImage() },
    { title: "Multi-angle Detail Preview", image: assets.tanTee },
  ];
  return `
    <div class="designer-step-head">
      <h2>Preview Result Images</h2>
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
    { name: "Embroidery", image: assets.uniqloLogo, desc: "Dimensional texture for many fabrics" },
    { name: "Heat Transfer", image: assets.orangeTee, desc: "Fine color for complex graphics" },
    { name: "Screen Print", image: assets.orangeStoreLook, desc: "High color fastness for batch orders" },
    { name: "Patch Embroidery", image: assets.uniqloLogo, desc: "Bold raised texture with strong branding" },
    { name: "High-frequency TPU", image: assets.blackPants, desc: "Heat-pressed, abrasion-resistant, water-resistant" },
    { name: "Woven Label", image: assets.toteBag, desc: "Stable texture for small labels" },
    { name: "Silicone", image: assets.greenPolo, desc: "Flexible raised feel with tactile finish" },
    { name: "Thick Print", image: assets.redStripedTee, desc: "Layered thick print with raised effect" },
  ];
}

function designerModels() {
  return [
    { name: "Store Model", image: assets.orangeStoreLook },
    { name: "Real Model", image: assets.pajamaModel },
    { name: "Size Model", image: assets.sizeTanModels },
  ];
}

function designerScenes() {
  return [
    { name: "Standard White Background", image: assets.tanTee },
    { name: "Store Scene", image: assets.orangeStoreLook },
    { name: "Lifestyle Scene", image: assets.pajamaLifestyle },
    { name: "Outdoor Scene", image: assets.outdoorLook },
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
    "Left Chest": "left:42%; top:36%;",
    "Right Chest": "left:59%; top:36%;",
    "Center Chest": "left:50%; top:43%;",
    "Center Back": "left:50%; top:34%;",
    "Hem": "left:50%; top:72%;",
  };
  return `${positions[state.logoPosition] || positions["Left Chest"]} width:${state.logoSize * 1.25}px;`;
}

function craftClass() {
  const map = {
    "Embroidery": "craft-embroider",
    "Heat Transfer": "craft-transfer",
    "Screen Print": "craft-screen",
    "Patch Embroidery": "craft-patch",
    "High-frequency TPU": "craft-tpu",
    "Woven Label": "craft-label",
    "Silicone": "craft-silicone",
    "Thick Print": "craft-thick",
  };
  return map[state.selectedCraft] || "craft-embroider";
}

function renderAdmin() {
  return `
    <section class="workbench admin-workbench">
      ${renderSideNav("admin", "AI Operations Admin", "Review & Management", [
        ["adminTab", "review", "Review Center", "review"],
        ["adminTab", "employees", "Staff Management", "roles"],
        ["adminTab", "roles", "Role Management", "settings"],
        ["adminTab", "prompt", "Prompt Management", "prompt"],
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
        <h1>Review Center</h1>
      </div>
    </div>
    <section class="task-filter-bar admin-toolbar">
      ${["All", "Pending Review", "Approved", "Rejected"].map((filter, index) => `
        <button class="filter-chip ${index === 0 ? "active" : ""}">${filter}</button>
      `).join("")}
      <label class="search-field">
        <span>Search</span>
        <input value="" placeholder="Image ID / Task ID / Type" />
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
        <h1>Prompt Management</h1>
      </div>
    </div>
    <section class="prompt-demo-grid">
      ${promptDemoCard("Prompt Optimization", "Turn operator prompts into stable generation instructions.", ["Product Subject", "Canvas Ratio", "Compliant Expression"], "Open Optimizer")}
      ${promptDemoCard("Standard Vocabulary", "Office, white-background studio, soft light, material close-up", ["Office", "Soft Light", "Material Close-up"], "Manage Terms")}
      ${promptDemoCard("Restricted Vocabulary", "Exaggerated effects, absolute claims, non-compliant brand terms", ["Exaggerated Effects", "Absolute Claims", "Brand-sensitive Terms"], "Manage Terms")}
    </section>`;
}

function renderRoleAdmin() {
  return `
    <div class="section-head admin-page-head">
      <div>
        <h1>Role Management</h1>
      </div>
      <button class="primary-btn">New Role</button>
    </div>
    <section class="admin-table-card">
      <div class="admin-table">
        <div class="admin-table-head role-table-head">
          <span>Role Name</span>
          <span>Permission Scope</span>
          <span>Members</span>
          <span>Action</span>
        </div>
        ${roleRow("Operator", "AI Tools, tasks, review submission", "12 people")}
        ${roleRow("Reviewer", "Single-image approval and rejection", "6 people")}
        ${roleRow("Prompt Manager", "Prompt optimization and vocabulary management", "3 people")}
        ${roleRow("Administrator", "Full Access", "2 people")}
      </div>
    </section>`;
}

function renderEmployeeAdmin() {
  const employees = [
    ["EMP-001", "Misaki Sato", "Operator", "Tokyo Operations Team", "Active"],
    ["EMP-002", "Yusuke Tanaka", "Reviewer", "Content Review Team", "Active"],
    ["EMP-003", "Wang Operator", "Prompt Manager", "AI Operations Team", "Active"],
    ["EMP-004", "Li Admin", "Administrator", "Platform Admin Team", "Disabled"],
  ];
  return `
    <div class="section-head admin-page-head">
      <div>
        <h1>Staff Management</h1>
      </div>
      <button class="primary-btn">New Staff</button>
    </div>
    <section class="task-filter-bar admin-toolbar">
      ${["All", "Active", "Disabled"].map((filter, index) => `
        <button class="filter-chip ${index === 0 ? "active" : ""}">${filter}</button>
      `).join("")}
      <label class="search-field">
        <span>Search</span>
        <input value="" placeholder="Staff ID / Name / Role" />
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
            <button class="small-btn">Edit</button>
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
  return `<article class="admin-row role-row"><strong>${role}</strong><span>${permissions}</span><span>${members}</span><button class="small-btn">Edit Permissions</button></article>`;
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
      window.location.href = "index.html?lang=zh";
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
      state.designerStep = button.textContent.trim() === "Edit Again" ? 3 : Math.max(1, state.designerStep - 1);
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
