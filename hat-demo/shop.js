const data = window.HAT_DATA;
const shopApp = document.querySelector("#shopApp");

const state = {
  view: routeView(),
  productId: "cap-classic-6p",
  customizeStep: 1,
  selected: {
    productId: "cap-classic-6p",
    color: "白色",
    material: "棉斜纹",
    structure: "硬挺",
    crownDepth: "标准",
    brim: "弯檐",
    closure: "金属扣",
  },
  detailPlanId: "plan-1",
  detailPlans: [
    {
      id: "plan-1",
      name: "方案 1",
      fabrics: { crown: "棉斜纹", brim: "棉斜纹", back: "同帽身" },
      colors: { crown: "白色", brim: "白色", back: "白色", accents: "白色" },
      logos: [
        { id: "logo-1", type: "image", text: "NORTH TRAIL", font: "Sans", craft: "平面刺绣" },
      ],
      quantities: { "均码": 120, "S-M": 0, "L-XL": 40, "儿童": 0 },
    },
    {
      id: "plan-2",
      name: "方案 2",
      fabrics: { crown: "棉斜纹", brim: "尼龙", back: "网布" },
      colors: { crown: "海军蓝", brim: "白色", back: "海军蓝", accents: "白色" },
      logos: [
        { id: "logo-2", type: "text", text: "NT", font: "Serif", craft: "立体刺绣" },
      ],
      quantities: { "均码": 80, "S-M": 0, "L-XL": 20, "儿童": 0 },
    },
  ],
  cart: [],
  orderSubmitted: false,
  paymentMethod: "在线支付",
  accountTab: "orders",
  detailTab: "intro",
  detailConfigTab: "fabric",
};

function routeView() {
  return (location.hash || "#/home").replace("#/", "") || "home";
}

function navigate(view) {
  location.hash = `#/${view}`;
}

function productById(id) {
  return data.products.find((item) => item.id === id) || data.products[0];
}

function currentProduct() {
  return productById(state.selected.productId || state.productId);
}

function tierFor(qty) {
  return data.tiers.find((tier) => qty >= tier.min && qty <= tier.max) || data.tiers[0];
}

function craftPrice() {
  const craftMap = new Map(data.options.crafts.map((item) => [item.name, item.price]));
  return state.detailPlans.reduce((sum, plan) => {
    const planQty = planTotal(plan);
    if (!planQty) return sum;
    const logoPrice = plan.logos.reduce((logoSum, logo) => logoSum + (craftMap.get(logo.craft) || 0), 0);
    return sum + logoPrice;
  }, 0);
}

function totalQuantity() {
  return state.detailPlans.reduce((sum, plan) => sum + planTotal(plan), 0);
}

function unitPrice(product = currentProduct()) {
  const tier = tierFor(totalQuantity());
  return Math.round((product.basePrice + craftPrice()) * tier.discount);
}

function orderTotal(product = currentProduct()) {
  return unitPrice(product) * totalQuantity() + 380;
}

function activePlan() {
  return state.detailPlans.find((plan) => plan.id === state.detailPlanId) || state.detailPlans[0];
}

function planTotal(plan) {
  return Object.values(plan.quantities).reduce((sum, qty) => sum + Number(qty || 0), 0);
}

function render() {
  state.view = routeView();
  shopApp.innerHTML = `
    <div class="shop-shell">
      ${renderShopHeader()}
      <main class="shop-main">${renderShopView()}</main>
    </div>`;
  bindShopEvents();
}

function renderShopHeader() {
  const items = [
    ["popular", "新品&热销"],
    ["products", "棒球帽"],
    ["products", "渔夫帽"],
    ["products", "遮阳帽"],
  ];
  return `
    <header class="shop-header">
      <button class="brand" data-nav="home">yescaps.shop</button>
      <nav>
        ${items.map(([view, label], index) => {
          const active = state.view === view && (view !== "products" || index === 1);
          return `<button class="${active ? "active" : ""}" data-nav="${view}">${label}</button>`;
        }).join("")}
      </nav>
      <div class="header-actions">
        <button class="search-pill" data-nav="products">搜索</button>
        <button class="icon-link" aria-label="收藏">♡</button>
        <button class="icon-link bag-icon" data-nav="cart" aria-label="采购单">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 8h11l.8 12H5.7L6.5 8Z"></path><path d="M9 8a3 3 0 0 1 6 0"></path></svg>
        </button>
        <button class="lang-toggle" data-lang-switch="en">EN</button>
        <div class="user-menu">
          <button class="avatar-button" aria-label="个人中心">NT</button>
          <div class="user-popover">
            <strong>North Trail Outdoor</strong>
            <span>采购账号</span>
            <button data-nav="account">我的订单</button>
            <button data-nav="account">我的账号</button>
            <button type="button">退出</button>
            <a href="./index.html">返回 Demo 首页</a>
          </div>
        </div>
      </div>
    </header>`;
}

function renderShopView() {
  if (state.view === "popular") return renderPopular();
  if (state.view === "products") return renderProducts();
  if (state.view === "product") return renderProductDetail();
  if (state.view === "customizer") return renderCustomizer();
  if (state.view === "cart") return renderCart();
  if (state.view === "order") return renderOrder();
  if (state.view === "account") return renderAccount();
  return renderHome();
}

function renderHome() {
  const product = currentProduct();
  return `
    <section class="home-banner">
      <div class="banner-copy">
        <span>Custom bulk caps</span>
        <h1>企业帽子定制批发</h1>
        <p>从帽型选择、Logo 工艺到大货下单一次完成。</p>
        <div class="hero-actions">
          <button class="primary-btn" data-start-custom="${product.id}">开始定制</button>
          <button class="secondary-btn" data-nav="products">查看帽型目录</button>
        </div>
      </div>
      <div class="banner-visual">
        <img class="banner-main-img" src="./hat-assets/banner-white-cap-unsplash.jpg" alt="白色棒球帽" />
        <img class="banner-float one" src="./hat-assets/cap-baseball-black-hero.jpg" alt="黑色棒球帽" />
        <img class="banner-float two" src="./hat-assets/hat-bucket-outdoor-olive.jpg" alt="户外渔夫帽" />
      </div>
    </section>
    <section class="section-block home-hot">
      <div class="section-title">
        <h2>热销款式</h2>
        <button class="text-btn" data-nav="popular">查看全部</button>
      </div>
      <div class="product-grid compact">
        ${data.products.slice(0, 4).map(renderProductCard).join("")}
      </div>
    </section>
    <footer class="shop-footer">© 2026 yescaps.shop</footer>`;
}

function infoPanel(title, rows) {
  return `<article class="info-panel"><h3>${title}</h3>${rows.map((row) => `<p>${row}</p>`).join("")}</article>`;
}

function renderPopular() {
  return `
    <section class="page-headline">
      <h1>热销款式</h1>
    </section>
    <section class="sort-toolbar">
      ${fakeSelect("全部帽型", ["全部帽型", "棒球帽", "渔夫帽", "遮阳帽"])}
      ${fakeSelect("企业团购", ["企业团购", "活动礼品", "户外团队", "品牌周边"])}
      ${fakeSelect("MOQ", ["MOQ", "100 件起", "300 件起", "1000 件起"])}
      ${fakeSelect("工艺", ["工艺", "刺绣", "胶印", "织标"])}
      <label>排序 ${fakeSelect("本月销量", ["本月销量", "采购评价", "最新上架"])}</label>
    </section>
    <div class="product-grid">${[...data.products].sort((a, b) => b.sold - a.sold).map(renderProductCard).join("")}</div>`;
}

function fakeSelect(label, options) {
  return `<select aria-label="${label}">${options.map((item) => `<option>${item}</option>`).join("")}</select>`;
}

function renderProducts() {
  return `
    <section class="catalog-layout">
      <aside class="filter-panel">
        <h2>帽型筛选</h2>
        ${filterGroup("帽型", ["棒球帽", "渔夫帽", "遮阳帽", "宽檐帽"])}
        ${filterGroup("帽檐", ["弯檐", "平檐", "宽檐", "软檐"])}
        ${filterGroup("后扣", ["金属扣", "魔术贴", "塑料扣", "弹力封闭"])}
        ${filterGroup("结构", ["硬挺", "软顶", "网布后片"])}
        ${filterGroup("MOQ", ["50+", "100+", "300+", "1000+"])}
      </aside>
      <section>
        <div class="section-title">
          <h1>帽型目录</h1>
          <span>${data.products.length} 个可定制帽型</span>
        </div>
        <div class="product-grid">${data.products.map(renderProductCard).join("")}</div>
      </section>
    </section>`;
}

function filterGroup(title, items) {
  return `<div class="filter-group"><strong>${title}</strong>${items.map((item, index) => `<button class="${index === 0 ? "active" : ""}">${item}</button>`).join("")}</div>`;
}

function renderProductCard(product) {
  return `
    <article class="product-card">
      <button class="image-button" data-open-product="${product.id}">
        <img src="${product.image}" alt="${product.cnName}" />
      </button>
      <div class="product-meta">
        <button class="product-title" data-open-product="${product.id}">${product.cnName}</button>
        <p>¥${product.basePrice} 起 / 件 · ${product.moq} 件起订</p>
        <span class="card-lead-time">${product.leadTime}</span>
        <div class="tag-row compact-tag"><em>${product.tags[0]}</em></div>
        <div class="card-actions">
          <button class="primary-btn" data-start-custom="${product.id}">开始定制</button>
          <button class="favorite-btn" aria-label="加入收藏">♡</button>
        </div>
      </div>
    </article>`;
}

function renderProductDetail() {
  const product = productById(state.productId);
  return `
    <section class="product-detail-page">
      <section class="product-detail-top">
        <div class="detail-gallery">
          <img class="detail-main-img" src="${product.image}" alt="${product.cnName}" />
          <div class="thumb-row">${product.gallery.map((img) => `<img src="${img}" alt="" />`).join("")}</div>
        </div>
        <aside class="buy-panel">
          <span class="eyebrow">${product.name}</span>
          <h1>${product.cnName}</h1>
          <p>${product.type} · ${product.attributes.brim} · ${product.attributes.closure} · ${product.attributes.structure}</p>
          <div class="detail-rating">采购评价 ${product.rating} / 5 · ${product.reviews} 条</div>
          <section class="tier-summary">
            <h2>阶梯价</h2>
            <div>${data.tiers.map((tier) => `<span><em>${tier.label}</em><strong>¥${Math.round(product.basePrice * tier.discount)}</strong></span>`).join("")}</div>
          </section>
          <div class="detail-brief">
            <span>大货周期</span><strong>${product.leadTime}</strong>
            <span>可用工艺</span><strong>${product.crafts.slice(0, 4).join(" / ")}</strong>
          </div>
          <div class="stack-actions">
            <button class="primary-btn wide" data-start-custom="${product.id}">开始定制</button>
            <button class="secondary-btn wide">♡ 加入收藏</button>
            <button class="ghost-btn wide">联系客服</button>
          </div>
        </aside>
      </section>
      ${renderDetailTabs(product)}
    </section>`;
}

function renderDetailTabs(product) {
  const tabs = [
    ["intro", "产品介绍"],
    ["custom", "定制说明"],
    ["reviews", "采购评价"],
  ];
  return `
    <section class="detail-tabs">
      <div class="detail-tab-list">
        ${tabs.map(([id, label]) => `<button class="${state.detailTab === id ? "active" : ""}" data-detail-tab="${id}">${label}</button>`).join("")}
      </div>
      <div class="detail-tab-panel">${renderDetailTabContent(product)}</div>
    </section>`;
}

function renderDetailTabContent(product) {
  if (state.detailTab === "custom") {
    return renderCustomizationInfo(product);
  }
  if (state.detailTab === "reviews") {
    return renderReviewDetail();
  }
  return renderProductIntro(product);
}

function renderProductIntro(product) {
  return `
    <section class="detail-flow">
      <article class="flow-section">
        <h2>${product.cnName}</h2>
        <p>经典帽身结构，帽型稳定，适合企业团购、品牌周边和活动批量采购。支持在同一帽型规格下创建多套细节方案，分别设置面料、配色和 Logo。</p>
        <div class="feature-strip">
          ${["六片帽身", product.attributes.brim, product.attributes.closure, product.attributes.structure, "多 Logo", "多细节方案"].map((item) => `<span>${item}</span>`).join("")}
        </div>
      </article>
      <article class="flow-section">
        <h2>可定制部位</h2>
        <div class="custom-parts-list">
          ${["帽身", "帽檐", "后片", "纽扣 / 气眼", "Logo"].map((item) => `<span>${item}</span>`).join("")}
        </div>
      </article>
    </section>`;
}

function renderCustomizationInfo(product) {
  const steps = [
    ["1", "帽型规格", "帽身结构、帽身高度、帽檐、后扣"],
    ["2", "细节方案", "同一帽型规格可创建多个细节方案"],
    ["3", "DIY 配色", "帽身、帽檐、后片、纽扣气眼分别配色"],
    ["4", "Logo", "上传图片 Logo 或文字 Logo，可添加多个 Logo"],
    ["5", "数量报价", "按细节方案和尺码填写数量"],
  ];
  return `
    <section class="detail-flow">
      <article class="flow-section">
        <h2>定制流程</h2>
        <div class="process-flow">
          ${steps.map(([num, title, text]) => `<div><span>${num}</span><strong>${title}</strong><p>${text}</p></div>`).join("")}
        </div>
      </article>
      <article class="flow-section">
        <h2>起订与报价</h2>
        <div class="rule-list">
        ${ruleRow("整单起订", `${product.moq} 件起`)}
        ${ruleRow("单方案建议", `${product.colorMoq} 件起`)}
        ${ruleRow("阶梯价", "按订单总数量计算")}
        ${ruleRow("生产准备费", "按订单收取")}
        </div>
      </article>
    </section>`;
}

function ruleRow(label, value) {
  return `<div class="rule-row"><span>${label}</span><strong>${value}</strong></div>`;
}

function renderReviewDetail() {
  return `
    <section class="detail-flow">
      <article class="flow-section rating-section">
        <div class="rating-summary">
          <strong>4.8</strong>
          <span>126 条采购评价</span>
        </div>
        <div class="rating-bars">
        ${ratingBar("5 星", 78)}
        ${ratingBar("4 星", 15)}
        ${ratingBar("3 星", 5)}
        </div>
        <div class="review-keywords">
          ${["交期稳定", "刺绣清晰", "多方案拆单", "确认流程顺畅"].map((item) => `<span>${item}</span>`).join("")}
        </div>
      </article>
      <article class="flow-section">
        <h2>评价列表</h2>
        <div class="review-list">
          ${data.reviews.map((item, index) => `<article><strong>${item.company} · ${index === 0 ? "360" : index === 1 ? "520" : "180"} 件</strong><span>${item.rating}.0 / 5</span><p>${item.text}</p></article>`).join("")}
        </div>
      </article>
    </section>`;
}

function ratingBar(label, value) {
  return `<div class="rating-bar"><span>${label}</span><div><em style="width:${value}%"></em></div><strong>${value}%</strong></div>`;
}

function renderCustomizer() {
  const product = currentProduct();
  const steps = ["帽型规格", "细节定制", "数量报价", "订单确认"];
  return `
    <section class="customizer-page">
      <div class="stepper">${steps.map((label, index) => `<button class="${state.customizeStep === index + 1 ? "active" : ""}" data-step="${index + 1}"><span>${index + 1}</span>${label}</button>`).join("")}</div>
      ${state.customizeStep === 1 ? renderHatStep() : ""}
      ${state.customizeStep === 2 ? renderDetailStep(product) : ""}
      ${state.customizeStep === 3 ? renderQuantityStep(product) : ""}
      ${state.customizeStep === 4 ? renderOrder() : ""}
    </section>`;
}

function renderHatStep() {
  const product = currentProduct();
  return `
    <section class="spec-step">
      <div class="current-style-card">
        <img src="${product.image}" alt="${product.cnName}" />
        <div>
          <span>当前款式</span>
          <strong>${product.cnName}</strong>
          <p>${product.type}</p>
        </div>
      </div>
      <div class="spec-panel">
        <h1>帽型规格</h1>
        ${specGroup("帽身结构", "structure", ["硬挺", "软顶"])}
        ${specGroup("帽身高度", "crownDepth", ["标准", "加深"])}
        ${specGroup("帽檐", "brim", ["弯檐", "平檐"])}
        ${specGroup("后扣", "closure", ["金属扣", "魔术贴", "塑料扣", "弹力封闭"])}
      </div>
      <div class="bottom-actions"><button class="primary-btn" data-step="2">下一步：细节定制</button></div>
    </section>`;
}

function specGroup(title, key, options) {
  return `
    <section class="spec-group">
      <h2>${title}</h2>
      <div class="chip-row">
        ${options.map((item) => `<button class="${state.selected[key] === item ? "active" : ""}" data-spec="${key}" data-value="${item}">${item}</button>`).join("")}
      </div>
    </section>`;
}

function renderDetailStep(product) {
  const plan = activePlan();
  return `
    <section class="designer-layout">
      <div class="preview-workspace">
        ${renderPlanPreviewList(product)}
        <div class="preview-stage">
          <img src="${product.image}" alt="${product.cnName}" />
          ${plan.logos.map((logo, index) => renderPreviewLogo(logo, index)).join("")}
        </div>
      </div>
      <aside class="config-panel">
        <h1>细节定制</h1>
        ${renderDetailConfigTabs()}
        <div class="config-tab-panel">${renderDetailConfigPanel(plan)}</div>
        <div class="bottom-actions">
          <button class="secondary-btn" data-step="1">上一步</button>
          <button class="primary-btn" data-step="3">下一步：数量报价</button>
        </div>
      </aside>
    </section>`;
}

function renderPlanPreviewList(product) {
  return `
    <aside class="plan-preview-list">
      ${state.detailPlans.map((plan) => `
        <button class="plan-preview-card ${state.detailPlanId === plan.id ? "active" : ""}" data-plan="${plan.id}">
          <span class="plan-thumb">
            <img src="${product.image}" alt="${plan.name}" />
            <span class="plan-logo-mark">${plan.logos.length} Logo</span>
          </span>
          <span class="plan-card-meta">
            <strong>${plan.name}</strong>
            <small>${planPreviewSummary(plan)}</small>
          </span>
          <span class="plan-swatches">${planColorSwatches(plan).map((color) => `<i style="background:${color}"></i>`).join("")}</span>
        </button>`).join("")}
      <button class="add-plan-card" data-add-plan>+ 新增方案</button>
    </aside>`;
}

function planPreviewSummary(plan) {
  return `${plan.colors.crown} · ${plan.fabrics.crown}`;
}

function planColorSwatches(plan) {
  const colors = {
    白色: "#f8f8f4",
    黑色: "#1b1f21",
    海军蓝: "#16395c",
    卡其: "#c2ad82",
    金属色: "#9ca3af",
    自定义: "#6f8f7d",
    同帽身: plan.colors.crown,
  };
  return [plan.colors.crown, plan.colors.brim, plan.colors.back].map((color) => colors[color] || colors.自定义);
}

function renderPreviewLogo(logo, index) {
  const classes = ["front", "side", "brim"];
  if (logo.type === "text") {
    return `<span class="preview-logo text ${classes[index % classes.length]}">${logo.text}</span>`;
  }
  return `<span class="preview-logo image ${classes[index % classes.length]}"><img src="./hat-assets/logo-uniqlo.png" alt="Logo" /></span>`;
}

function renderDetailConfigTabs() {
  const tabs = [
    ["fabric", "面料"],
    ["color", "配色"],
    ["logo", "Logo / 工艺"],
  ];
  return `
    <nav class="config-tabs">
      ${tabs.map(([id, label]) => `<button class="${state.detailConfigTab === id ? "active" : ""}" data-config-tab="${id}">${label}</button>`).join("")}
    </nav>`;
}

function renderDetailConfigPanel(plan) {
  if (state.detailConfigTab === "color") {
    return partOptionGroup("DIY 配色", "colors", [
      ["crown", "帽身颜色", ["白色", "黑色", "海军蓝", "卡其", "自定义"]],
      ["brim", "帽檐颜色", ["同帽身", "白色", "黑色", "卡其", "自定义"]],
      ["back", "后片颜色", ["同帽身", "白色", "海军蓝", "黑色", "自定义"]],
      ["accents", "纽扣 / 气眼", ["同帽身", "白色", "黑色", "金属色", "自定义"]],
    ]);
  }
  if (state.detailConfigTab === "logo") {
    return renderLogoManager(plan);
  }
  return partOptionGroup("面料", "fabrics", [
    ["crown", "帽身面料", ["棉斜纹", "水洗棉", "尼龙", "灯芯绒"]],
    ["brim", "帽檐面料", ["棉斜纹", "尼龙", "仿麂皮"]],
    ["back", "后片面料", ["同帽身", "网布", "尼龙"]],
  ]);
}

function partOptionGroup(title, group, rows) {
  const plan = activePlan();
  return `
    <section class="custom-section">
      <h2>${title}</h2>
      ${rows.map(([key, label, options]) => `
        <div class="part-row">
          <span>${label}</span>
          <div class="chip-row">
            ${options.map((item) => `<button class="${plan[group][key] === item ? "active" : ""}" data-plan-option="${group}" data-part="${key}" data-value="${item}">${item}</button>`).join("")}
          </div>
        </div>`).join("")}
    </section>`;
}

function renderLogoManager(plan) {
  return `
    <section class="custom-section">
      <div class="section-line-title">
        <h2>Logo</h2>
        <button data-add-logo>+ 新增 Logo</button>
      </div>
      <div class="logo-list">
        ${plan.logos.map((logo, index) => renderLogoCard(logo, index)).join("")}
      </div>
    </section>`;
}

function renderLogoCard(logo, index) {
  return `
    <article class="logo-config-card">
      <div class="logo-card-head">
        <strong>Logo ${index + 1}</strong>
        ${index > 0 ? `<button data-delete-logo="${logo.id}">删除</button>` : ""}
      </div>
      <div class="segmented-row">
        ${["image", "text"].map((type) => `<button class="${logo.type === type ? "active" : ""}" data-logo-type="${logo.id}" data-value="${type}">${type === "image" ? "上传图片" : "文字 Logo"}</button>`).join("")}
      </div>
      ${logo.type === "image" ? `
        <div class="logo-upload-card mini">
          <img src="./hat-assets/logo-uniqlo.png" alt="Logo" />
          <span>logo.png</span>
        </div>` : `
        <label class="logo-field">文字<input value="${logo.text}" data-logo-text="${logo.id}" /></label>
        <div class="segmented-row">${["Sans", "Serif", "Bold"].map((font) => `<button class="${logo.font === font ? "active" : ""}" data-logo-font="${logo.id}" data-value="${font}">${font}</button>`).join("")}</div>`}
      <div class="chip-row craft-row">
        ${["平面刺绣", "立体刺绣", "胶印", "织标"].map((craft) => `<button class="${logo.craft === craft ? "active" : ""}" data-logo-craft="${logo.id}" data-value="${craft}">${craft}</button>`).join("")}
      </div>
    </article>`;
}

function renderQuantityStep(product) {
  return `
    <section class="quote-layout">
      <div class="quantity-panel">
        <h1>数量报价</h1>
        ${planQuantityTable(true)}
      </div>
      ${renderQuoteSummary(product, true)}
    </section>`;
}

function planQuantityTable(editable = false, plans = state.detailPlans) {
  const sizes = ["均码", "S-M", "L-XL", "儿童"];
  return `
    <table class="quantity-table plan-quantity-table">
      <thead><tr><th>细节方案</th>${sizes.map((size) => `<th>${size}</th>`).join("")}<th>小计</th></tr></thead>
      <tbody>
        ${plans.map((plan) => `
          <tr>
            <td>${plan.name}</td>
            ${sizes.map((size) => `<td>${editable ? `<input value="${plan.quantities[size] || 0}" data-plan-qty="${plan.id}" data-size="${size}" />` : plan.quantities[size] || 0}</td>`).join("")}
            <td><strong>${planTotal(plan)}</strong></td>
          </tr>`).join("")}
      </tbody>
    </table>`;
}

function renderQuoteSummary(product, withActions = false) {
  return `
    <aside class="quote-summary">
      <h2>报价摘要</h2>
      ${summaryRow("总数量", `${totalQuantity()} 件`)}
      ${summaryRow("当前阶梯", tierFor(totalQuantity()).label)}
      ${summaryRow("单件估价", `¥${unitPrice(product)}`)}
      ${summaryRow("生产准备费", "¥380")}
      ${summaryRow("预计总价", `¥${orderTotal(product).toLocaleString()}`)}
      ${summaryRow("大货周期", product.leadTime)}
      ${withActions ? `
        <div class="quote-actions">
          <button class="secondary-btn" data-add-cart="${product.id}">加入采购单</button>
          <button class="primary-btn" data-step="4">立即下单</button>
        </div>
      ` : ""}
    </aside>`;
}

function summaryRow(label, value) {
  return `<div class="summary-row"><span>${label}</span><strong>${value}</strong></div>`;
}

function renderCart() {
  const product = currentProduct();
  const items = state.cart.length ? state.cart : [cartItemFromState(product)];
  const amount = items.reduce((sum, item) => sum + item.total, 0);
  const qty = items.reduce((sum, item) => sum + item.quantity, 0);
  return `
    <section class="cart-layout">
      <div>
        <div class="section-title"><h1>采购单</h1><span>${items.length} 个定制方案</span></div>
        <div class="cart-list">${items.map(renderCartItem).join("")}</div>
      </div>
      <aside class="quote-summary">
        <h2>采购单汇总</h2>
        ${summaryRow("方案数量", `${items.length} 个`)}
        ${summaryRow("总数量", `${qty} 件`)}
        ${summaryRow("预计总价", `¥${amount.toLocaleString()}`)}
        <button class="secondary-btn wide" data-nav="products">继续选款</button>
        <button class="primary-btn wide" data-nav="order">进入订单确认</button>
      </aside>
    </section>`;
}

function cartItemFromState(product) {
  const plans = state.detailPlans.map((plan) => ({
    ...plan,
    fabrics: { ...plan.fabrics },
    colors: { ...plan.colors },
    quantities: { ...plan.quantities },
    logos: plan.logos.map((logo) => ({ ...logo })),
  }));
  const quantity = plans.reduce((sum, plan) => sum + planTotal(plan), 0);
  const tier = tierFor(quantity);
  const itemUnitPrice = Math.round((product.basePrice + craftPrice()) * tier.discount);
  return {
    id: `${product.id}-${Date.now()}`,
    product,
    plans,
    quantity,
    unitPrice: itemUnitPrice,
    total: itemUnitPrice * quantity + 380,
    specSummary: `${state.selected.structure} · ${state.selected.crownDepth}帽身 · ${state.selected.brim} · ${state.selected.closure}`,
  };
}

function renderCartItem(item) {
  return `
    <article class="cart-item">
      <img src="${item.product.image}" alt="${item.product.cnName}" />
      <div>
        <h3>${item.product.cnName}</h3>
        <p>${item.specSummary}</p>
        ${planQuantityTable(false, item.plans)}
      </div>
      <strong>¥${item.total.toLocaleString()}</strong>
    </article>`;
}

function renderOrder() {
  const items = state.cart.length ? state.cart : [cartItemFromState(currentProduct())];
  const firstItem = items[0];
  const amount = items.reduce((sum, item) => sum + item.total, 0);
  const qty = items.reduce((sum, item) => sum + item.quantity, 0);
  return `
    <section class="order-layout">
      <div class="order-form">
        <h1>订单确认</h1>
        <div class="form-grid">
          <label>公司名称<input value="North Trail Outdoor" /></label>
          <label>联系人<input value="Chen Wang" /></label>
          <label>邮箱<input value="purchase@example.com" /></label>
          <label>电话<input value="+86 138 0000 0000" /></label>
        </div>
        <label class="full-field">收货地址<input value="上海市静安区南京西路 888 号" /></label>
        <div class="option-group">
          <h3>支付方式</h3>
          <div class="chip-row">
            ${["在线支付", "凭证支付"].map((item) => `<button class="${state.paymentMethod === item ? "active" : ""}" data-payment="${item}">${item}</button>`).join("")}
          </div>
        </div>
      </div>
      <aside class="quote-summary">
        <h2>订单摘要</h2>
        <img class="summary-image" src="${firstItem.product.image}" alt="${firstItem.product.cnName}" />
        ${summaryRow("定制方案", `${items.length} 个`)}
        ${summaryRow("代表帽型", firstItem.product.cnName)}
        ${summaryRow("总数量", `${qty} 件`)}
        ${summaryRow("支付方式", state.paymentMethod)}
        ${summaryRow("预计总价", `¥${amount.toLocaleString()}`)}
        <button class="primary-btn wide" data-submit-order>${state.paymentMethod === "在线支付" ? "确认并支付" : "提交订单"}</button>
      </aside>
    </section>`;
}

function renderAccount() {
  const tabs = [["profile", "账号信息"], ["address", "地址管理"], ["orders", "我的订单"]];
  return `
    <section class="account-page">
      <div class="account-tabs">${tabs.map(([id, label]) => `<button class="${state.accountTab === id ? "active" : ""}" data-account-tab="${id}">${label}</button>`).join("")}</div>
      ${state.accountTab === "profile" ? renderProfileTab() : ""}
      ${state.accountTab === "address" ? renderAddressTab() : ""}
      ${state.accountTab === "orders" ? renderOrdersTab() : ""}
    </section>`;
}

function renderProfileTab() {
  return `<section class="panel"><h1>账号信息</h1><div class="meta-grid">${meta("公司名称", "North Trail Outdoor")}${meta("联系人", "Chen Wang")}${meta("邮箱", "purchase@example.com")}${meta("电话", "+86 138 0000 0000")}</div></section>`;
}

function renderAddressTab() {
  return `<section class="panel"><h1>地址管理</h1><article class="address-card"><strong>默认收货地址</strong><p>上海市静安区南京西路 888 号 · Chen Wang · +86 138 0000 0000</p><button class="secondary-btn">编辑地址</button></article></section>`;
}

function renderOrdersTab() {
  return `
    <section class="panel">
      <h1>我的订单</h1>
      <div class="order-list">
        ${data.orders.map((order) => `
          <article class="order-row">
            <div><strong>${order.id}</strong><span>${order.product} · ${order.quantity} 件</span></div>
            <span>${order.paymentMethod}</span>
            <span class="status">${order.paymentStatus}</span>
            <span class="status">${order.orderStatus}</span>
            ${order.paymentMethod === "凭证支付" && order.paymentStatus !== "已支付" ? `<button class="secondary-btn">上传支付凭证</button>` : `<button class="ghost-btn">查看详情</button>`}
          </article>`).join("")}
      </div>
    </section>`;
}

function meta(label, value) {
  return `<div class="meta-item"><span>${label}</span><strong>${value}</strong></div>`;
}

function bindShopEvents() {
  document.querySelectorAll("[data-nav]").forEach((button) => {
    button.addEventListener("click", () => navigate(button.dataset.nav));
  });
  document.querySelectorAll("[data-lang-switch]").forEach((button) => {
    button.addEventListener("click", () => {
      location.href = `./shop.html?lang=en${location.hash || "#/home"}`;
    });
  });
  document.querySelectorAll("[data-open-product]").forEach((button) => {
    button.addEventListener("click", () => {
      state.productId = button.dataset.openProduct;
      state.selected.productId = state.productId;
      state.detailTab = "intro";
      navigate("product");
    });
  });
  document.querySelectorAll("[data-start-custom]").forEach((button) => {
    button.addEventListener("click", () => {
      state.productId = button.dataset.startCustom;
      state.selected.productId = state.productId;
      state.customizeStep = 1;
      navigate("customizer");
    });
  });
  document.querySelectorAll("[data-step]").forEach((button) => {
    button.addEventListener("click", () => {
      state.customizeStep = Number(button.dataset.step);
      render();
    });
  });
  document.querySelectorAll("[data-spec]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selected[button.dataset.spec] = button.dataset.value;
      render();
    });
  });
  document.querySelectorAll("[data-plan]").forEach((button) => {
    button.addEventListener("click", () => {
      state.detailPlanId = button.dataset.plan;
      render();
    });
  });
  document.querySelectorAll("[data-config-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.detailConfigTab = button.dataset.configTab;
      render();
    });
  });
  document.querySelectorAll("[data-add-plan]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = `plan-${state.detailPlans.length + 1}`;
      state.detailPlans.push({
        id,
        name: `方案 ${state.detailPlans.length + 1}`,
        fabrics: { crown: "棉斜纹", brim: "棉斜纹", back: "同帽身" },
        colors: { crown: "自定义", brim: "同帽身", back: "同帽身", accents: "同帽身" },
        logos: [{ id: `logo-${Date.now()}`, type: "image", text: "NORTH TRAIL", font: "Sans", craft: "平面刺绣" }],
        quantities: { "均码": 60, "S-M": 0, "L-XL": 0, "儿童": 0 },
      });
      state.detailPlanId = id;
      render();
    });
  });
  document.querySelectorAll("[data-plan-option]").forEach((button) => {
    button.addEventListener("click", () => {
      const plan = activePlan();
      plan[button.dataset.planOption][button.dataset.part] = button.dataset.value;
      render();
    });
  });
  document.querySelectorAll("[data-add-logo]").forEach((button) => {
    button.addEventListener("click", () => {
      activePlan().logos.push({ id: `logo-${Date.now()}`, type: "text", text: "NT", font: "Sans", craft: "平面刺绣" });
      render();
    });
  });
  document.querySelectorAll("[data-delete-logo]").forEach((button) => {
    button.addEventListener("click", () => {
      const plan = activePlan();
      plan.logos = plan.logos.filter((logo) => logo.id !== button.dataset.deleteLogo);
      render();
    });
  });
  document.querySelectorAll("[data-logo-type], [data-logo-font], [data-logo-craft]").forEach((button) => {
    button.addEventListener("click", () => {
      const attr = button.dataset.logoType ? "type" : button.dataset.logoFont ? "font" : "craft";
      const id = button.dataset.logoType || button.dataset.logoFont || button.dataset.logoCraft;
      const logo = activePlan().logos.find((item) => item.id === id);
      if (logo) logo[attr] = button.dataset.value;
      render();
    });
  });
  document.querySelectorAll("[data-logo-text]").forEach((input) => {
    input.addEventListener("change", () => {
      const logo = activePlan().logos.find((item) => item.id === input.dataset.logoText);
      if (logo) logo.text = input.value;
      render();
    });
  });
  document.querySelectorAll("[data-plan-qty]").forEach((input) => {
    input.addEventListener("change", () => {
      const plan = state.detailPlans.find((item) => item.id === input.dataset.planQty);
      if (plan) plan.quantities[input.dataset.size] = Number(input.value) || 0;
      render();
    });
  });
  document.querySelectorAll("[data-add-cart]").forEach((button) => {
    button.addEventListener("click", () => {
      const product = productById(button.dataset.addCart || state.selected.productId);
      state.cart = [...state.cart, cartItemFromState(product)];
      navigate("cart");
    });
  });
  document.querySelectorAll("[data-payment]").forEach((button) => {
    button.addEventListener("click", () => {
      state.paymentMethod = button.dataset.payment;
      render();
    });
  });
  document.querySelectorAll("[data-submit-order]").forEach((button) => {
    button.addEventListener("click", () => {
      state.orderSubmitted = true;
      navigate("account");
    });
  });
  document.querySelectorAll("[data-account-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.accountTab = button.dataset.accountTab;
      render();
    });
  });
  document.querySelectorAll("[data-detail-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.detailTab = button.dataset.detailTab;
      render();
    });
  });
}

window.addEventListener("hashchange", render);
render();
