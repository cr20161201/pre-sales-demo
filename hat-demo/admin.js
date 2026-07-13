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
    ["dashboard", "数据看板"],
    ["orders", "订单管理"],
    ["products", "商品管理"],
    ["assets", "定制配置"],
    ["reviews", "评价管理"],
  ];
  return `
    <aside class="admin-side">
      <button class="brand" data-admin-nav="dashboard">yescaps.shop</button>
      <nav>${items.map(([id, label]) => `<button class="${state.view === id ? "active" : ""}" data-admin-nav="${id}">${label}</button>`).join("")}</nav>
      <div class="admin-side-actions">
        <button class="admin-lang-toggle" data-lang-switch="en">EN</button>
        <a class="ghost-link" href="./index.html">切换系统</a>
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
    ["待支付", 6, 30],
    ["支付审核中", 4, 20],
    ["待确认设计稿", 9, 45],
    ["生产中", 27, 88],
    ["已发货", 16, 58],
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
    ["商品浏览", "12,800", 100],
    ["开始定制", "3,420", 72],
    ["加入采购单", "1,180", 48],
    ["提交订单", "420", 28],
    ["支付完成", "360", 22],
  ];
  return `
    <section class="admin-section">
      <div class="admin-head"><h1>数据看板</h1></div>
      <div class="metric-grid">
        ${metric("今日订单", "18")}
        ${metric("今日成交额", "¥42,680")}
        ${metric("待支付", "6")}
        ${metric("支付审核中", "4")}
        ${metric("生产中", "27")}
        ${metric("本月成交额", "¥486,200")}
      </div>
      <div class="dashboard-grid">
        <section class="chart-panel">
          <h2>近 7 日成交趋势</h2>
          <div class="bar-chart">
            ${trendRows.map(([label, height]) => `<div><span style="height:${height}%"></span><em>${label}</em></div>`).join("")}
          </div>
        </section>
        <section class="chart-panel">
          <h2>订单状态分布</h2>
          <div class="progress-chart">
            ${statusRows.map(([label, value, width]) => chartRow(label, `${value} 单`, width)).join("")}
          </div>
        </section>
        <section class="chart-panel">
          <h2>热销商品排行</h2>
          <div class="progress-chart">
            ${data.products.slice(0, 5).map((item, index) => chartRow(`${index + 1}. ${item.cnName}`, `${item.sold.toLocaleString()} 件`, Math.max(28, 96 - index * 13))).join("")}
          </div>
        </section>
        <section class="chart-panel">
          <h2>采购转化漏斗</h2>
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

function adminToolbar({ search = "搜索", filters = [], actions = [] }) {
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
      <div class="admin-head"><h1>订单管理</h1></div>
      ${adminToolbar({
        search: "搜索订单编号 / 客户公司",
        filters: [
          { options: ["支付方式", "在线支付", "凭证支付"] },
          { options: ["订单状态", "待支付", "支付审核中", "待确认设计稿", "生产中", "已发货"] },
          { options: ["下单时间", "今日", "近 7 日", "本月"] },
        ],
        actions: ["导出订单"],
      })}
      <div class="admin-table">
        <div class="admin-row table-head order-head"><span>订单编号</span><span>客户公司</span><span>商品</span><span>金额</span><span>支付</span><span>状态</span></div>
        ${data.orders.map((item) => `
          <button class="admin-row order-head" data-order-detail="${item.id}">
            <span>${item.id}</span>
            <span>${item.company}</span>
            <span>${item.product} · ${item.quantity} 件</span>
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
          <button class="text-btn" data-admin-nav="orders">返回订单列表</button>
          <h1>${order.id}</h1>
        </div>
        <button class="secondary-btn">下载生产资料</button>
      </div>
      <div class="meta-grid">
        ${meta("客户公司", order.company)}
        ${meta("商品", order.product)}
        ${meta("总数量", `${order.quantity} 件`)}
        ${meta("支付方式", order.paymentMethod)}
        ${meta("支付状态", order.paymentStatus)}
        ${meta("订单状态", order.orderStatus)}
        ${meta("大货周期", order.leadTime)}
        ${meta("订单金额", `¥${order.amount.toLocaleString()}`)}
      </div>
      <div class="detail-two-col">
        <section class="panel">
          ${renderVoucherReview(order)}
          ${renderOrderPlanSummary(order)}
        </section>
        <section class="panel">
          <h2>订单进度</h2>
          <div class="status-flow">
            ${["待支付", "支付审核中", "待确认设计稿", "生产中", "已发货"].map((status) => `<span class="${status === order.orderStatus || status === order.paymentStatus ? "active" : ""}">${status}</span>`).join("")}
          </div>
        </section>
      </div>
    </section>`;
}

function renderVoucherReview(order) {
  if (order.paymentMethod !== "凭证支付" || order.paymentStatus !== "支付审核中") return "";
  return `
    <section class="drawer-section first">
      <h3>支付凭证</h3>
      <div class="voucher-box">付款凭证</div>
      <div class="inline-actions">
        <button class="secondary-btn">驳回</button>
        <button class="primary-btn">通过</button>
      </div>
    </section>`;
}

function renderOrderPlanSummary(order) {
  const rows = order.quantity > 300
    ? [["方案 1", "白色 / 棉斜纹", "1 Logo", 160], ["方案 2", "海军蓝 / 网布", "1 Logo", 200]]
    : [["方案 1", "白色 / 水洗棉", "1 Logo", order.quantity]];
  return `
    <section class="drawer-section">
      <h3>定制方案</h3>
      <div class="plan-summary-list">
        ${rows.map(([name, config, logo, qty]) => `<div><strong>${name}</strong><span>${config}</span><span>${logo}</span><em>${qty} 件</em></div>`).join("")}
      </div>
    </section>`;
}

function renderProductsAdmin() {
  return `
    <section class="admin-section">
      <div class="admin-head"><h1>商品管理</h1></div>
      ${adminToolbar({
        search: "搜索商品名称",
        filters: [
          { options: ["商品类型", "棒球帽", "渔夫帽", "遮阳帽", "宽檐帽"] },
          { options: ["状态", "上架", "下架"] },
        ],
        actions: ["批量导入", "新建商品"],
      })}
      <div class="admin-table">
        <div class="admin-row product-head"><span>商品</span><span>品类</span><span>起订</span><span>起始价</span><span>可定制项</span><span>状态</span><span>操作</span></div>
        ${data.products.map((item) => `
          <article class="admin-row product-head">
            <span class="product-cell"><img src="${item.image}" alt="${item.cnName}" /><strong>${item.cnName}</strong></span>
            <span>${item.type}</span>
            <span>${item.moq} 件</span>
            <span>¥${item.basePrice} 起</span>
            <span>${productSpecCount(item)} 项</span>
            <span>上架</span>
            <span class="row-actions"><button>查看</button><button>编辑</button><button>下架</button></span>
          </article>`).join("")}
      </div>
    </section>`;
}

function renderAssets() {
  const tabs = [
    ["materials", "面料库"],
    ["crafts", "工艺库"],
    ["fonts", "字体库"],
    ["fees", "费用配置"],
  ];
  const rows = configRows();
  return `
    <section class="admin-section">
      <div class="admin-head"><h1>定制配置</h1></div>
      <div class="account-tabs">${tabs.map(([id, label]) => `<button class="${state.configTab === id ? "active" : ""}" data-config-admin-tab="${id}">${label}</button>`).join("")}</div>
      ${adminToolbar({
        search: "搜索名称",
        filters: [{ options: ["状态", "启用", "停用"] }],
        actions: ["新增配置"],
      })}
      <div class="admin-table">
        <div class="admin-row config-head">${configHead().map((item) => `<span>${item}</span>`).join("")}</div>
        ${rows.map((row) => `<article class="admin-row config-head">${row.map((item) => `<span>${item}</span>`).join("")}<span class="row-actions"><button>编辑</button><button>停用</button></span></article>`).join("")}
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
      <div class="admin-head"><h1>评价管理</h1></div>
      ${adminToolbar({
        search: "搜索商品 / 客户",
        filters: [
          { options: ["评分", "5 星", "4 星"] },
          { options: ["状态", "精选", "普通", "隐藏"] },
        ],
        actions: ["精选评价"],
      })}
      <div class="admin-table">
        <div class="admin-row review-head"><span>商品</span><span>客户</span><span>评分</span><span>评价内容</span><span>状态</span><span>操作</span></div>
        ${data.reviews.map((item, index) => `
          <article class="admin-row review-head">
            <span>${data.products[index]?.cnName || data.products[0].cnName}</span>
            <span>${item.company}</span>
            <span>${item.rating}.0</span>
            <span>${item.text}</span>
            <span>${index === 2 ? "普通" : "精选"}</span>
            <span class="row-actions"><button>精选</button><button>隐藏</button></span>
          </article>`).join("")}
      </div>
    </section>`;
}

function configHead() {
  if (state.configTab === "crafts") return ["名称", "加价", "适用 Logo", "状态", "操作"];
  if (state.configTab === "fonts") return ["字体", "适用语言", "状态", "备注", "操作"];
  if (state.configTab === "fees") return ["费用项", "金额", "计费方式", "状态", "操作"];
  return ["名称", "适用部位", "状态", "备注", "操作"];
}

function configRows() {
  if (state.configTab === "crafts") {
    return [
      ["平面刺绣", "+¥3", "图片 Logo / 文字 Logo", "启用"],
      ["立体刺绣", "+¥5", "图片 Logo / 文字 Logo", "启用"],
      ["胶印", "+¥2", "图片 Logo", "启用"],
      ["织标", "+¥4", "图片 Logo", "启用"],
    ];
  }
  if (state.configTab === "fonts") {
    return [
      ["Sans", "英文 / 数字", "启用", "默认字体"],
      ["Serif", "英文 / 数字", "启用", "复古风格"],
      ["Bold", "英文 / 数字", "启用", "高识别度"],
    ];
  }
  if (state.configTab === "fees") {
    return [
      ["生产准备费", "¥380", "每单", "启用"],
      ["皮标工艺", "+¥6", "每件", "启用"],
      ["金属标工艺", "+¥8", "每件", "启用"],
    ];
  }
  return [
    ["棉斜纹", "帽身 / 帽檐", "启用", "常规面料"],
    ["尼龙", "帽身 / 后片", "启用", "轻量防泼"],
    ["水洗棉", "帽身 / 帽檐", "启用", "柔软手感"],
    ["灯芯绒", "帽身", "启用", "季节面料"],
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
      location.href = `./admin.html?lang=en${location.hash || "#/orders"}`;
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
