const data = window.HAT_DATA;
const shopApp = document.querySelector("#shopApp");

const state = {
  view: routeView(),
  productId: "cap-classic-6p",
  customizeStep: 1,
  selected: {
    productId: "cap-classic-6p",
    color: "White",
    material: "Cotton Twill",
    structure: "Structured",
    crownDepth: "Standard",
    brim: "Curved Brim",
    closure: "Metal Buckle",
  },
  detailPlanId: "plan-1",
  detailPlans: [
    {
      id: "plan-1",
      name: "Plan 1",
      fabrics: { crown: "Cotton Twill", brim: "Cotton Twill", back: "Same as Crown" },
      colors: { crown: "White", brim: "White", back: "White", accents: "White" },
      logos: [
        { id: "logo-1", type: "image", text: "NORTH TRAIL", font: "Sans", craft: "Flat Embroidery" },
      ],
      quantities: { "One Size": 120, "S-M": 0, "L-XL": 40, "Kids": 0 },
    },
    {
      id: "plan-2",
      name: "Plan 2",
      fabrics: { crown: "Cotton Twill", brim: "Nylon", back: "Mesh" },
      colors: { crown: "Navy", brim: "White", back: "Navy", accents: "White" },
      logos: [
        { id: "logo-2", type: "text", text: "NT", font: "Serif", craft: "3D Embroidery" },
      ],
      quantities: { "One Size": 80, "S-M": 0, "L-XL": 20, "Kids": 0 },
    },
  ],
  cart: [],
  orderSubmitted: false,
  paymentMethod: "Online Payment",
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
    ["popular", "New & Best Sellers"],
    ["products", "Baseball Caps"],
    ["products", "Bucket Hats"],
    ["products", "Visors"],
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
        <button class="search-pill" data-nav="products">Search</button>
        <button class="icon-link" aria-label="Favorites">♡</button>
        <button class="icon-link bag-icon" data-nav="cart" aria-label="Purchase Cart">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 8h11l.8 12H5.7L6.5 8Z"></path><path d="M9 8a3 3 0 0 1 6 0"></path></svg>
        </button>
        <button class="lang-toggle" data-lang-switch="zh">CN</button>
        <div class="user-menu">
          <button class="avatar-button" aria-label="Account">NT</button>
          <div class="user-popover">
            <strong>North Trail Outdoor</strong>
            <span>Buyer Account</span>
            <button data-nav="account">My Orders</button>
            <button data-nav="account">My Account</button>
            <button type="button">Sign Out</button>
            <a href="./index.html">Back to Demo Home</a>
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
        <h1>Custom Bulk Caps for Teams</h1>
        <p>Choose cap styles, configure logo crafts, and place bulk orders in one flow.</p>
        <div class="hero-actions">
          <button class="primary-btn" data-start-custom="${product.id}">Start Customizing</button>
          <button class="secondary-btn" data-nav="products">Browse Cap Catalog</button>
        </div>
      </div>
      <div class="banner-visual">
        <img class="banner-main-img" src="./hat-assets/banner-white-cap-unsplash.jpg" alt="White baseball cap" />
        <img class="banner-float one" src="./hat-assets/cap-baseball-black-hero.jpg" alt="Black baseball cap" />
        <img class="banner-float two" src="./hat-assets/hat-bucket-outdoor-olive.jpg" alt="Outdoor bucket hat" />
      </div>
    </section>
    <section class="section-block home-hot">
      <div class="section-title">
        <h2>Best Sellers</h2>
        <button class="text-btn" data-nav="popular">View All</button>
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
      <h1>Best Sellers</h1>
    </section>
    <section class="sort-toolbar">
      ${fakeSelect("All Cap Types", ["All Cap Types", "Baseball Cap", "Bucket Hat", "Sun Visor"])}
      ${fakeSelect("Corporate Bulk", ["Corporate Bulk", "Event Gifts", "Outdoor Teams", "Brand Merch"])}
      ${fakeSelect("MOQ", ["MOQ", "100+ pcs", "300+ pcs", "1000+ pcs"])}
      ${fakeSelect("Craft", ["Craft", "Embroidery", "Rubber Print", "Woven Label"])}
      <label>Sort ${fakeSelect("Monthly Sales", ["Monthly Sales", "Buyer Reviews", "Newest"])}</label>
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
        <h2>Cap Filters</h2>
        ${filterGroup("Cap Type", ["Baseball Cap", "Bucket Hat", "Sun Visor", "Wide Brim Hat"])}
        ${filterGroup("Brim", ["Curved Brim", "Flat Brim", "Wide Brim", "Soft Brim"])}
        ${filterGroup("Closure", ["Metal Buckle", "Hook-and-loop", "Plastic Buckle", "Stretch Closure"])}
        ${filterGroup("Structure", ["Structured", "Soft Crown", "Mesh Back Panel"])}
        ${filterGroup("MOQ", ["50+", "100+", "300+", "1000+"])}
      </aside>
      <section>
        <div class="section-title">
          <h1>Cap Catalog</h1>
          <span>${data.products.length} customizable cap styles</span>
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
        <img src="${product.image}" alt="${product.name}" />
      </button>
      <div class="product-meta">
        <button class="product-title" data-open-product="${product.id}">${product.name}</button>
        <p>¥${product.basePrice} / pc from ${product.moq} pcs</p>
        <span class="card-lead-time">${product.leadTime}</span>
        <div class="tag-row compact-tag"><em>${product.tags[0]}</em></div>
        <div class="card-actions">
          <button class="primary-btn" data-start-custom="${product.id}">Start Customizing</button>
          <button class="favorite-btn" aria-label="Add to Favorites">♡</button>
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
          <img class="detail-main-img" src="${product.image}" alt="${product.name}" />
          <div class="thumb-row">${product.gallery.map((img) => `<img src="${img}" alt="" />`).join("")}</div>
        </div>
        <aside class="buy-panel">
          <span class="eyebrow">${product.name}</span>
          <h1>${product.name}</h1>
          <p>${product.type} · ${product.attributes.brim} · ${product.attributes.closure} · ${product.attributes.structure}</p>
          <div class="detail-rating">Buyer Reviews ${product.rating} / 5 · ${product.reviews} reviews</div>
          <section class="tier-summary">
            <h2>Tiered Pricing</h2>
            <div>${data.tiers.map((tier) => `<span><em>${tier.label}</em><strong>¥${Math.round(product.basePrice * tier.discount)}</strong></span>`).join("")}</div>
          </section>
          <div class="detail-brief">
            <span>Bulk Lead Time</span><strong>${product.leadTime}</strong>
            <span>Available Crafts</span><strong>${product.crafts.slice(0, 4).join(" / ")}</strong>
          </div>
          <div class="stack-actions">
            <button class="primary-btn wide" data-start-custom="${product.id}">Start Customizing</button>
            <button class="secondary-btn wide">♡ Add to Favorites</button>
            <button class="ghost-btn wide">Contact Sales</button>
          </div>
        </aside>
      </section>
      ${renderDetailTabs(product)}
    </section>`;
}

function renderDetailTabs(product) {
  const tabs = [
    ["intro", "Overview"],
    ["custom", "Customization"],
    ["reviews", "Buyer Reviews"],
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
        <h2>${product.name}</h2>
        <p>A stable classic cap structure for corporate bulk buying, brand merch, and event orders. Create multiple detail plans under one cap spec, each with its own fabric, colors, and logo setup.</p>
        <div class="feature-strip">
          ${["6-panel crown", product.attributes.brim, product.attributes.closure, product.attributes.structure, "Multiple logos", "Multiple detail plans"].map((item) => `<span>${item}</span>`).join("")}
        </div>
      </article>
      <article class="flow-section">
        <h2>Customizable Areas</h2>
        <div class="custom-parts-list">
          ${["Crown", "Brim", "Back Panel", "Button / Eyelets", "Logo"].map((item) => `<span>${item}</span>`).join("")}
        </div>
      </article>
    </section>`;
}

function renderCustomizationInfo(product) {
  const steps = [
    ["1", "Cap Specs", "Crown structure, crown depth, brim, and closure"],
    ["2", "Detail Plans", "Create multiple detail plans under one cap spec"],
    ["3", "DIY Colors", "Set colors separately for crown, brim, back panel, buttons, and eyelets"],
    ["4", "Logo", "Upload image logos or text logos; add multiple logos"],
    ["5", "Quantity & Quote", "Enter quantities by detail plan and size"],
  ];
  return `
    <section class="detail-flow">
      <article class="flow-section">
        <h2>Customization Flow</h2>
        <div class="process-flow">
          ${steps.map(([num, title, text]) => `<div><span>${num}</span><strong>${title}</strong><p>${text}</p></div>`).join("")}
        </div>
      </article>
      <article class="flow-section">
        <h2>MOQ & Quote</h2>
        <div class="rule-list">
        ${ruleRow("Order MOQ", `${product.moq} pcs minimum`)}
        ${ruleRow("Suggested Per Plan", `${product.colorMoq} pcs recommended`)}
        ${ruleRow("Tiered Pricing", "Calculated by total order quantity")}
        ${ruleRow("Production Setup Fee", "Charged per order")}
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
          <span>126 Buyer Reviews</span>
        </div>
        <div class="rating-bars">
        ${ratingBar("5 Stars", 78)}
        ${ratingBar("4 Stars", 15)}
        ${ratingBar("3 Stars", 5)}
        </div>
        <div class="review-keywords">
          ${["Stable Lead Time", "Crisp Embroidery", "Multi-plan Orders", "Smooth Confirmation"].map((item) => `<span>${item}</span>`).join("")}
        </div>
      </article>
      <article class="flow-section">
        <h2>Review List</h2>
        <div class="review-list">
          ${data.reviews.map((item, index) => `<article><strong>${item.company} · ${index === 0 ? "360" : index === 1 ? "520" : "180"} pcs</strong><span>${item.rating}.0 / 5</span><p>${item.text}</p></article>`).join("")}
        </div>
      </article>
    </section>`;
}

function ratingBar(label, value) {
  return `<div class="rating-bar"><span>${label}</span><div><em style="width:${value}%"></em></div><strong>${value}%</strong></div>`;
}

function renderCustomizer() {
  const product = currentProduct();
  const steps = ["Cap Specs", "Detail Customization", "Quantity & Quote", "Order Confirmation"];
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
        <img src="${product.image}" alt="${product.name}" />
        <div>
          <span>Current Style</span>
          <strong>${product.name}</strong>
          <p>${product.type}</p>
        </div>
      </div>
      <div class="spec-panel">
        <h1>Cap Specs</h1>
        ${specGroup("CrownStructure", "structure", ["Structured", "Soft Crown"])}
        ${specGroup("Crown Depth", "crownDepth", ["Standard", "Deep"])}
        ${specGroup("Brim", "brim", ["Curved Brim", "Flat Brim"])}
        ${specGroup("Closure", "closure", ["Metal Buckle", "Hook-and-loop", "Plastic Buckle", "Stretch Closure"])}
      </div>
      <div class="bottom-actions"><button class="primary-btn" data-step="2">Next: Detail Customization</button></div>
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
          <img src="${product.image}" alt="${product.name}" />
          ${plan.logos.map((logo, index) => renderPreviewLogo(logo, index)).join("")}
        </div>
      </div>
      <aside class="config-panel">
        <h1>Detail Customization</h1>
        ${renderDetailConfigTabs()}
        <div class="config-tab-panel">${renderDetailConfigPanel(plan)}</div>
        <div class="bottom-actions">
          <button class="secondary-btn" data-step="1">Previous</button>
          <button class="primary-btn" data-step="3">Next: Quantity & Quote</button>
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
      <button class="add-plan-card" data-add-plan>+ Add Plan</button>
    </aside>`;
}

function planPreviewSummary(plan) {
  return `${plan.colors.crown} · ${plan.fabrics.crown}`;
}

function planColorSwatches(plan) {
  const colors = {
    "White": "#f8f8f4",
    "Black": "#1b1f21",
    "Navy": "#16395c",
    "Khaki": "#c2ad82",
    "Metallic": "#9ca3af",
    "Custom": "#6f8f7d",
    "Same as Crown": plan.colors.crown,
  };
  return [plan.colors.crown, plan.colors.brim, plan.colors.back].map((color) => colors[color] || colors.Custom);
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
    ["fabric", "Fabric"],
    ["color", "Colors"],
    ["logo", "Logo / Craft"],
  ];
  return `
    <nav class="config-tabs">
      ${tabs.map(([id, label]) => `<button class="${state.detailConfigTab === id ? "active" : ""}" data-config-tab="${id}">${label}</button>`).join("")}
    </nav>`;
}

function renderDetailConfigPanel(plan) {
  if (state.detailConfigTab === "color") {
    return partOptionGroup("DIY Colors", "colors", [
      ["crown", "Crown Color", ["White", "Black", "Navy", "Khaki", "Custom"]],
      ["brim", "Brim Color", ["Same as Crown", "White", "Black", "Khaki", "Custom"]],
      ["back", "Back Panel Color", ["Same as Crown", "White", "Navy", "Black", "Custom"]],
      ["accents", "Button / Eyelets", ["Same as Crown", "White", "Black", "Metallic", "Custom"]],
    ]);
  }
  if (state.detailConfigTab === "logo") {
    return renderLogoManager(plan);
  }
  return partOptionGroup("Fabric", "fabrics", [
    ["crown", "Crown Fabric", ["Cotton Twill", "Washed Cotton", "Nylon", "Corduroy"]],
    ["brim", "Brim Fabric", ["Cotton Twill", "Nylon", "Suede-like Fabric"]],
    ["back", "Back Panel Fabric", ["Same as Crown", "Mesh", "Nylon"]],
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
        <button data-add-logo>+ Add Logo</button>
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
        ${index > 0 ? `<button data-delete-logo="${logo.id}">Delete</button>` : ""}
      </div>
      <div class="segmented-row">
        ${["image", "text"].map((type) => `<button class="${logo.type === type ? "active" : ""}" data-logo-type="${logo.id}" data-value="${type}">${type === "image" ? "Upload Image" : "Text Logo"}</button>`).join("")}
      </div>
      ${logo.type === "image" ? `
        <div class="logo-upload-card mini">
          <img src="./hat-assets/logo-uniqlo.png" alt="Logo" />
          <span>logo.png</span>
        </div>` : `
        <label class="logo-field">Text<input value="${logo.text}" data-logo-text="${logo.id}" /></label>
        <div class="segmented-row">${["Sans", "Serif", "Bold"].map((font) => `<button class="${logo.font === font ? "active" : ""}" data-logo-font="${logo.id}" data-value="${font}">${font}</button>`).join("")}</div>`}
      <div class="chip-row craft-row">
        ${["Flat Embroidery", "3D Embroidery", "Rubber Print", "Woven Label"].map((craft) => `<button class="${logo.craft === craft ? "active" : ""}" data-logo-craft="${logo.id}" data-value="${craft}">${craft}</button>`).join("")}
      </div>
    </article>`;
}

function renderQuantityStep(product) {
  return `
    <section class="quote-layout">
      <div class="quantity-panel">
        <h1>Quantity & Quote</h1>
        ${planQuantityTable(true)}
      </div>
      ${renderQuoteSummary(product, true)}
    </section>`;
}

function planQuantityTable(editable = false, plans = state.detailPlans) {
  const sizes = ["One Size", "S-M", "L-XL", "Kids"];
  return `
    <table class="quantity-table plan-quantity-table">
      <thead><tr><th>Detail Plans</th>${sizes.map((size) => `<th>${size}</th>`).join("")}<th>Subtotal</th></tr></thead>
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
      <h2>Quote Summary</h2>
      ${summaryRow("Total Quantity", `${totalQuantity()} pcs`)}
      ${summaryRow("Current Tier", tierFor(totalQuantity()).label)}
      ${summaryRow("Estimated Unit Price", `¥${unitPrice(product)}`)}
      ${summaryRow("Production Setup Fee", "¥380")}
      ${summaryRow("Estimated Total", `¥${orderTotal(product).toLocaleString()}`)}
      ${summaryRow("Bulk Lead Time", product.leadTime)}
      ${withActions ? `
        <div class="quote-actions">
          <button class="secondary-btn" data-add-cart="${product.id}">Add to Cart</button>
          <button class="primary-btn" data-step="4">Order Now</button>
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
        <div class="section-title"><h1>Purchase Cart</h1><span>${items.length} custom plans</span></div>
        <div class="cart-list">${items.map(renderCartItem).join("")}</div>
      </div>
      <aside class="quote-summary">
        <h2>Cart Summary</h2>
        ${summaryRow("Plans", `${items.length}`)}
        ${summaryRow("Total Quantity", `${qty} pcs`)}
        ${summaryRow("Estimated Total", `¥${amount.toLocaleString()}`)}
        <button class="secondary-btn wide" data-nav="products">Continue Browsing</button>
        <button class="primary-btn wide" data-nav="order">Go to Order Confirmation</button>
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
    specSummary: `${state.selected.structure} · ${state.selected.crownDepth}Crown · ${state.selected.brim} · ${state.selected.closure}`,
  };
}

function renderCartItem(item) {
  return `
    <article class="cart-item">
      <img src="${item.product.image}" alt="${item.product.name}" />
      <div>
        <h3>${item.product.name}</h3>
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
        <h1>Order Confirmation</h1>
        <div class="form-grid">
          <label>Company Name<input value="North Trail Outdoor" /></label>
          <label>Contact<input value="Chen Wang" /></label>
          <label>Email<input value="purchase@example.com" /></label>
          <label>Phone<input value="+86 138 0000 0000" /></label>
        </div>
        <label class="full-field">Shipping Address<input value="888 Nanjing West Road, Jing’an District, Shanghai" /></label>
        <div class="option-group">
          <h3>Payment Method</h3>
          <div class="chip-row">
            ${["Online Payment", "Voucher Payment"].map((item) => `<button class="${state.paymentMethod === item ? "active" : ""}" data-payment="${item}">${item}</button>`).join("")}
          </div>
        </div>
      </div>
      <aside class="quote-summary">
        <h2>Order Summary</h2>
        <img class="summary-image" src="${firstItem.product.image}" alt="${firstItem.product.name}" />
        ${summaryRow("Custom Plans", `${items.length}`)}
        ${summaryRow("Representative Style", firstItem.product.name)}
        ${summaryRow("Total Quantity", `${qty} pcs`)}
        ${summaryRow("Payment Method", state.paymentMethod)}
        ${summaryRow("Estimated Total", `¥${amount.toLocaleString()}`)}
        <button class="primary-btn wide" data-submit-order>${state.paymentMethod === "Online Payment" ? "Confirm & Pay" : "Submit Order"}</button>
      </aside>
    </section>`;
}

function renderAccount() {
  const tabs = [["profile", "Account Info"], ["address", "Address Book"], ["orders", "My Orders"]];
  return `
    <section class="account-page">
      <div class="account-tabs">${tabs.map(([id, label]) => `<button class="${state.accountTab === id ? "active" : ""}" data-account-tab="${id}">${label}</button>`).join("")}</div>
      ${state.accountTab === "profile" ? renderProfileTab() : ""}
      ${state.accountTab === "address" ? renderAddressTab() : ""}
      ${state.accountTab === "orders" ? renderOrdersTab() : ""}
    </section>`;
}

function renderProfileTab() {
  return `<section class="panel"><h1>Account Info</h1><div class="meta-grid">${meta("Company Name", "North Trail Outdoor")}${meta("Contact", "Chen Wang")}${meta("Email", "purchase@example.com")}${meta("Phone", "+86 138 0000 0000")}</div></section>`;
}

function renderAddressTab() {
  return `<section class="panel"><h1>Address Book</h1><article class="address-card"><strong>Default Shipping Address</strong><p>888 Nanjing West Road, Jing’an District, Shanghai · Chen Wang · +86 138 0000 0000</p><button class="secondary-btn">Edit Address</button></article></section>`;
}

function renderOrdersTab() {
  return `
    <section class="panel">
      <h1>My Orders</h1>
      <div class="order-list">
        ${data.orders.map((order) => `
          <article class="order-row">
            <div><strong>${order.id}</strong><span>${order.product} · ${order.quantity} pcs</span></div>
            <span>${order.paymentMethod}</span>
            <span class="status">${order.paymentStatus}</span>
            <span class="status">${order.orderStatus}</span>
            ${order.paymentMethod === "Voucher Payment" && order.paymentStatus !== "Paid" ? `<button class="secondary-btn">Upload Payment Voucher</button>` : `<button class="ghost-btn">View Details</button>`}
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
      location.href = `./shop.html?lang=zh-CN${location.hash || "#/home"}`;
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
        name: `Plan ${state.detailPlans.length + 1}`,
        fabrics: { crown: "Cotton Twill", brim: "Cotton Twill", back: "Same as Crown" },
        colors: { crown: "Custom", brim: "Same as Crown", back: "Same as Crown", accents: "Same as Crown" },
        logos: [{ id: `logo-${Date.now()}`, type: "image", text: "NORTH TRAIL", font: "Sans", craft: "Flat Embroidery" }],
        quantities: { "One Size": 60, "S-M": 0, "L-XL": 0, "Kids": 0 },
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
      activePlan().logos.push({ id: `logo-${Date.now()}`, type: "text", text: "NT", font: "Sans", craft: "Flat Embroidery" });
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
