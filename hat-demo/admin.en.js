const data = window.HAT_DATA;
const adminApp = document.querySelector("#adminApp");

const state = {
  view: routeView(),
  selectedOrderId: data.orders[0].id,
  configTab: "materials",
};

function routeView() {
  return (location.hash || "#/orders").replace("#/", "") || "orders";
}

function navigate(view) {
  location.hash = `#/${view}`;
}

function selectedOrder() {
  return data.orders.find((order) => order.id === state.selectedOrderId) || data.orders[0];
}

function render() {
  state.view = routeView();
  adminApp.innerHTML = `
    <section class="admin-shell">
      ${renderSideNav()}
      <main class="admin-main">${renderAdminView()}</main>
    </section>`;
  bindAdminEvents();
}

function renderSideNav() {
  const items = [
    ["dashboard", "Dashboard"],
    ["orders", "Orders"],
    ["products", "Products"],
    ["assets", "Customization Config"],
    ["reviews", "Reviews"],
  ];
  return `
    <aside class="admin-side">
      <button class="brand" data-admin-nav="dashboard">yescaps.shop</button>
      <nav>${items.map(([id, label]) => `<button class="${state.view === id ? "active" : ""}" data-admin-nav="${id}">${label}</button>`).join("")}</nav>
      <div class="admin-side-actions">
        <button class="admin-lang-toggle" data-lang-switch="zh">CN</button>
        <a class="ghost-link" href="./index.html?lang=en">Switch System</a>
      </div>
    </aside>`;
}

function renderAdminView() {
  if (state.view === "dashboard") return renderDashboard();
  if (state.view === "order-detail") return renderOrderDetailPage();
  if (state.view === "products") return renderProductsAdmin();
  if (state.view === "assets") return renderAssets();
  if (state.view === "reviews") return renderReviewsAdmin();
  return renderOrders();
}

function renderDashboard() {
  const statusRows = [
    ["Pending Payment", 6, 30],
    ["Payment Under Review", 4, 20],
    ["Artwork Confirmation Pending", 9, 45],
    ["In Production", 27, 88],
    ["Shipped", 16, 58],
  ];
  const trendRows = [
    ["06/09", 26],
    ["06/10", 38],
    ["06/11", 32],
    ["06/12", 54],
    ["06/13", 48],
    ["06/14", 72],
    ["06/15", 62],
  ];
  const funnelRows = [
    ["Product Views", "12,800", 100],
    ["Start Customizing", "3,420", 72],
    ["Added to Cart", "1,180", 48],
    ["Orders Submitted", "420", 28],
    ["Payment Complete", "360", 22],
  ];
  return `
    <section class="admin-section">
      <div class="admin-head"><h1>Dashboard</h1></div>
      <div class="metric-grid">
        ${metric("Today's Orders", "18")}
        ${metric("Today's GMV", "¥42,680")}
        ${metric("Pending Payment", "6")}
        ${metric("Payment Under Review", "4")}
        ${metric("In Production", "27")}
        ${metric("Monthly GMV", "¥486,200")}
      </div>
      <div class="dashboard-grid">
        <section class="chart-panel">
          <h2>7-Day Sales Trend</h2>
          <div class="bar-chart">
            ${trendRows.map(([label, height]) => `<div><span style="height:${height}%"></span><em>${label}</em></div>`).join("")}
          </div>
        </section>
        <section class="chart-panel">
          <h2>Order Status Distribution</h2>
          <div class="progress-chart">
            ${statusRows.map(([label, value, width]) => chartRow(label, `${value} orders`, width)).join("")}
          </div>
        </section>
        <section class="chart-panel">
          <h2>Best-selling Products</h2>
          <div class="progress-chart">
            ${data.products.slice(0, 5).map((item, index) => chartRow(`${index + 1}. ${item.name}`, `${item.sold.toLocaleString()} pcs`, Math.max(28, 96 - index * 13))).join("")}
          </div>
        </section>
        <section class="chart-panel">
          <h2>Purchase Conversion Funnel</h2>
          <div class="funnel-chart">
            ${funnelRows.map(([label, value, width]) => `<div style="--funnel-width:${width}%"><span>${label}</span><strong>${value}</strong></div>`).join("")}
          </div>
        </section>
      </div>
    </section>`;
}

function chartRow(label, value, width) {
  return `<div class="chart-row"><span>${label}</span><strong>${value}</strong><em><i style="width:${width}%"></i></em></div>`;
}

function metric(label, value) {
  return `<article class="metric-card"><span>${label}</span><strong>${value}</strong></article>`;
}

function simpleList(title, rows) {
  return `<section class="panel"><h2>${title}</h2><div class="simple-list">${rows.map((row) => `<p>${row}</p>`).join("")}</div></section>`;
}

function adminToolbar({ search = "Search", filters = [], actions = [] }) {
  return `
    <div class="admin-toolbar">
      <div class="toolbar-filters">
        <input value="" placeholder="${search}" />
        ${filters.map((filter) => `
          <select>
            ${filter.options.map((option) => `<option>${option}</option>`).join("")}
          </select>`).join("")}
      </div>
      <div class="toolbar-actions">
        ${actions.map((action, index) => `<button class="${index === actions.length - 1 ? "primary-btn" : "secondary-btn"}">${action}</button>`).join("")}
      </div>
    </div>`;
}

function renderOrders() {
  return `
    <section class="admin-section">
      <div class="admin-head"><h1>Orders</h1></div>
      ${adminToolbar({
        search: "Search order ID / customer company",
        filters: [
          { options: ["Payment Method", "Online Payment", "Voucher Payment"] },
          { options: ["Order Status", "Pending Payment", "Payment Under Review", "Artwork Confirmation Pending", "In Production", "Shipped"] },
          { options: ["Order Time", "Today", "Last 7 Days", "This Month"] },
        ],
        actions: ["Export Orders"],
      })}
      <div class="admin-table">
        <div class="admin-row table-head order-head"><span>Order ID</span><span>Customer Company</span><span>Product</span><span>Amount</span><span>Payment</span><span>Status</span></div>
        ${data.orders.map((item) => `
          <button class="admin-row order-head" data-order-detail="${item.id}">
            <span>${item.id}</span>
            <span>${item.company}</span>
            <span>${item.product} · ${item.quantity} pcs</span>
            <span>¥${item.amount.toLocaleString()}</span>
            <span>${item.paymentMethod} · ${item.paymentStatus}</span>
            <span>${item.orderStatus}</span>
          </button>`).join("")}
      </div>
    </section>`;
}

function renderOrderDetailPage() {
  const order = selectedOrder();
  return `
    <section class="admin-section order-detail-page">
      <div class="admin-head">
        <div>
          <button class="text-btn" data-admin-nav="orders">Back to Orders</button>
          <h1>${order.id}</h1>
        </div>
        <button class="secondary-btn">Download Production Files</button>
      </div>
      <div class="meta-grid">
        ${meta("Customer Company", order.company)}
        ${meta("Product", order.product)}
        ${meta("Total Quantity", `${order.quantity} pcs`)}
        ${meta("Payment Method", order.paymentMethod)}
        ${meta("Payment Status", order.paymentStatus)}
        ${meta("Order Status", order.orderStatus)}
        ${meta("Bulk Lead Time", order.leadTime)}
        ${meta("Order Amount", `¥${order.amount.toLocaleString()}`)}
      </div>
      <div class="detail-two-col">
        <section class="panel">
          ${renderVoucherReview(order)}
          ${renderOrderPlanSummary(order)}
        </section>
        <section class="panel">
          <h2>Order Progress</h2>
          <div class="status-flow">
            ${["Pending Payment", "Payment Under Review", "Artwork Confirmation Pending", "In Production", "Shipped"].map((status) => `<span class="${status === order.orderStatus || status === order.paymentStatus ? "active" : ""}">${status}</span>`).join("")}
          </div>
        </section>
      </div>
    </section>`;
}

function renderVoucherReview(order) {
  if (order.paymentMethod !== "Voucher Payment" || order.paymentStatus !== "Payment Under Review") return "";
  return `
    <section class="drawer-section first">
      <h3>Payment Voucher</h3>
      <div class="voucher-box">Payment voucher</div>
      <div class="inline-actions">
        <button class="secondary-btn">Reject</button>
        <button class="primary-btn">Approve</button>
      </div>
    </section>`;
}

function renderOrderPlanSummary(order) {
  const rows = order.quantity > 300
    ? [["Plan 1", "White / Cotton Twill", "1 Logo", 160], ["Plan 2", "Navy / Mesh", "1 Logo", 200]]
    : [["Plan 1", "White / Washed Cotton", "1 Logo", order.quantity]];
  return `
    <section class="drawer-section">
      <h3>Customization Plans</h3>
      <div class="plan-summary-list">
        ${rows.map(([name, config, logo, qty]) => `<div><strong>${name}</strong><span>${config}</span><span>${logo}</span><em>${qty} pcs</em></div>`).join("")}
      </div>
    </section>`;
}

function renderProductsAdmin() {
  return `
    <section class="admin-section">
      <div class="admin-head"><h1>Products</h1></div>
      ${adminToolbar({
        search: "Search product name",
        filters: [
          { options: ["Product Type", "Baseball Cap", "Bucket Hat", "Sun Visor", "Wide Brim Hat"] },
          { options: ["Status", "Published", "Unpublished"] },
        ],
        actions: ["Batch Import", "New Product"],
      })}
      <div class="admin-table">
        <div class="admin-row product-head"><span>Product</span><span>Category</span><span>MOQ</span><span>Base Price</span><span>Custom Options</span><span>Status</span><span>Action</span></div>
        ${data.products.map((item) => `
          <article class="admin-row product-head">
            <span class="product-cell"><img src="${item.image}" alt="${item.name}" /><strong>${item.name}</strong></span>
            <span>${item.type}</span>
            <span>${item.moq} pcs</span>
            <span>¥${item.basePrice} base</span>
            <span>${productSpecCount(item)} items</span>
            <span>Published</span>
            <span class="row-actions"><button>View</button><button>Edit</button><button>Unpublished</button></span>
          </article>`).join("")}
      </div>
    </section>`;
}

function renderAssets() {
  const tabs = [
    ["materials", "Fabric Library"],
    ["crafts", "Craft Library"],
    ["fonts", "Font Library"],
    ["fees", "Fee Config"],
  ];
  const rows = configRows();
  return `
    <section class="admin-section">
      <div class="admin-head"><h1>Customization Config</h1></div>
      <div class="account-tabs">${tabs.map(([id, label]) => `<button class="${state.configTab === id ? "active" : ""}" data-config-admin-tab="${id}">${label}</button>`).join("")}</div>
      ${adminToolbar({
        search: "Search name",
        filters: [{ options: ["Status", "Enabled", "Disabled"] }],
        actions: ["New Config"],
      })}
      <div class="admin-table">
        <div class="admin-row config-head">${configHead().map((item) => `<span>${item}</span>`).join("")}</div>
        ${rows.map((row) => `<article class="admin-row config-head">${row.map((item) => `<span>${item}</span>`).join("")}<span class="row-actions"><button>Edit</button><button>Disabled</button></span></article>`).join("")}
      </div>
    </section>`;
}

function productSpecCount(item) {
  const specs = [item.attributes.structure, item.attributes.brim, item.attributes.closure, item.attributes.back].filter(Boolean);
  return specs.length;
}

function renderReviewsAdmin() {
  return `
    <section class="admin-section">
      <div class="admin-head"><h1>Reviews</h1></div>
      ${adminToolbar({
        search: "Search product / customer",
        filters: [
          { options: ["Rating", "5 Stars", "4 Stars"] },
          { options: ["Status", "Featured", "Standard", "Hidden"] },
        ],
        actions: ["Feature Review"],
      })}
      <div class="admin-table">
        <div class="admin-row review-head"><span>Product</span><span>Customer</span><span>Rating</span><span>Review Content</span><span>Status</span><span>Action</span></div>
        ${data.reviews.map((item, index) => `
          <article class="admin-row review-head">
            <span>${data.products[index]?.name || data.products[0].name}</span>
            <span>${item.company}</span>
            <span>${item.rating}.0</span>
            <span>${item.text}</span>
            <span>${index === 2 ? "Standard" : "Featured"}</span>
            <span class="row-actions"><button>Featured</button><button>Hidden</button></span>
          </article>`).join("")}
      </div>
    </section>`;
}

function configHead() {
  if (state.configTab === "crafts") return ["Name", "Surcharge", "Logo Type", "Status", "Action"];
  if (state.configTab === "fonts") return ["Font", "Language", "Status", "Notes", "Action"];
  if (state.configTab === "fees") return ["Fee Item", "Amount", "Billing Method", "Status", "Action"];
  return ["Name", "Applicable Area", "Status", "Notes", "Action"];
}

function configRows() {
  if (state.configTab === "crafts") {
    return [
      ["Flat Embroidery", "+¥3", "Image Logo / Text Logo", "Enabled"],
      ["3D Embroidery", "+¥5", "Image Logo / Text Logo", "Enabled"],
      ["Rubber Print", "+¥2", "Image Logo", "Enabled"],
      ["Woven Label", "+¥4", "Image Logo", "Enabled"],
    ];
  }
  if (state.configTab === "fonts") {
    return [
      ["Sans", "English / Numbers", "Enabled", "Default font"],
      ["Serif", "English / Numbers", "Enabled", "Vintage style"],
      ["Bold", "English / Numbers", "Enabled", "High recognition"],
    ];
  }
  if (state.configTab === "fees") {
    return [
      ["Production Setup Fee", "¥380", "Per order", "Enabled"],
      ["Leather Patch Craft", "+¥6", "Per piece", "Enabled"],
      ["Metal Badge Craft", "+¥8", "Per piece", "Enabled"],
    ];
  }
  return [
    ["Cotton Twill", "Crown / Brim", "Enabled", "Standard fabric"],
    ["Nylon", "Crown / Back Panel", "Enabled", "Lightweight water-resistant"],
    ["Washed Cotton", "Crown / Brim", "Enabled", "Soft hand feel"],
    ["Corduroy", "Crown", "Enabled", "Seasonal fabric"],
  ];
}

function meta(label, value) {
  return `<div class="meta-item"><span>${label}</span><strong>${value}</strong></div>`;
}

function bindAdminEvents() {
  document.querySelectorAll("[data-admin-nav]").forEach((button) => {
    button.addEventListener("click", () => navigate(button.dataset.adminNav));
  });
  document.querySelectorAll("[data-lang-switch]").forEach((button) => {
    button.addEventListener("click", () => {
      location.href = `./admin.html?lang=zh-CN${location.hash || "#/orders"}`;
    });
  });
  document.querySelectorAll("[data-order]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedOrderId = button.dataset.order;
      render();
    });
  });
  document.querySelectorAll("[data-order-detail]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedOrderId = button.dataset.orderDetail;
      navigate("order-detail");
    });
  });
  document.querySelectorAll("[data-config-admin-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.configTab = button.dataset.configAdminTab;
      render();
    });
  });
}

window.addEventListener("hashchange", render);
render();
