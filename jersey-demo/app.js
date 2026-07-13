const POSITIONS = [
  ["left-chest", "左胸"],
  ["right-chest", "右胸"],
  ["front-center", "胸前中部"],
  ["back-upper", "背部上方"],
  ["back-center", "背部中部"],
  ["left-sleeve", "左袖"],
  ["right-sleeve", "右袖"],
  ["shoulder", "肩部"],
];

const COLORS = ["#2563eb", "#111827", "#ef4444", "#22c55e", "#f59e0b", "#ffffff"];
const JERSEY_IMAGE = "./jersey.png";

const jerseys = [
  {
    id: "replica-miami",
    name: "迈阿密主场球员版球衣",
    productType: "replica",
    sport: "football",
    teamId: "miami",
    basePrice: 159,
    fit: "regular",
    material: "比赛级速干面料",
    imageUrl: JERSEY_IMAGE,
    imageSource: "jersey-demo/jersey.png",
    colors: { primary: "#ffffff", secondary: "#f9a8d4", collar: "#111827", sleeve: "#f8fafc" },
    availablePrintPositions: [],
    tags: ["球队球衣", "球员姓名号码", "常规商品"],
  },
  {
    id: "replica-paris",
    name: "巴黎客场球员版球衣",
    productType: "replica",
    sport: "football",
    teamId: "paris",
    basePrice: 179,
    fit: "slim",
    material: "轻量比赛针织",
    imageUrl: JERSEY_IMAGE,
    imageSource: "jersey-demo/jersey.png",
    colors: { primary: "#e5e7eb", secondary: "#111827", collar: "#111827", sleeve: "#f8fafc" },
    availablePrintPositions: [],
    tags: ["球队球衣", "预设球员", "正常下单"],
  },
  {
    id: "finish-blue",
    name: "极速蓝主场成品球衣",
    productType: "finished",
    sport: "football",
    basePrice: 169,
    fit: "regular",
    material: "轻量速干针织",
    imageUrl: JERSEY_IMAGE,
    imageSource: "jersey-demo/jersey.png",
    fixedDesign: { colorName: "主场蓝", patternName: "肩部撞色" },
    colors: { primary: "#2563eb", secondary: "#22c55e", collar: "#111827", sleeve: "#1d4ed8" },
    availablePrintPositions: ["left-chest", "front-center", "back-upper", "back-center", "right-sleeve"],
    tags: ["成品球衣", "固定配色", "多位置加印"],
  },
  {
    id: "finish-red",
    name: "烈焰红客场成品球衣",
    productType: "finished",
    sport: "basketball",
    basePrice: 189,
    fit: "slim",
    material: "弹力比赛面料",
    imageUrl: JERSEY_IMAGE,
    imageSource: "jersey-demo/jersey.png",
    fixedDesign: { colorName: "客场红", patternName: "侧边拼色" },
    colors: { primary: "#ef4444", secondary: "#111827", collar: "#111827", sleeve: "#dc2626" },
    availablePrintPositions: ["front-center", "back-upper", "back-center", "left-sleeve"],
    tags: ["成品球衣", "号码背印", "队名加印"],
  },
  {
    id: "blank-pro",
    name: "Pro 白板比赛球衣",
    productType: "blank",
    sport: "football",
    basePrice: 129,
    fit: "regular",
    material: "可选速干/网眼/弹力",
    imageUrl: JERSEY_IMAGE,
    imageSource: "jersey-demo/jersey.png",
    colors: { primary: "#ffffff", secondary: "#2563eb", collar: "#111827", sleeve: "#e5e7eb" },
    blankOptions: {
      fabrics: ["quick-dry", "mesh", "stretch", "training"],
      patterns: ["solid", "stripe", "gradient", "shoulder-block"],
      colors: COLORS,
    },
    availablePrintPositions: ["left-chest", "right-chest", "front-center", "back-upper", "back-center", "left-sleeve", "right-sleeve"],
    tags: ["白板球衣", "可选面料", "可配色"],
  },
  {
    id: "blank-training",
    name: "训练款白板球衣",
    productType: "blank",
    sport: "training",
    basePrice: 99,
    fit: "loose",
    material: "训练网眼面料",
    imageUrl: JERSEY_IMAGE,
    imageSource: "jersey-demo/jersey.png",
    colors: { primary: "#f8fafc", secondary: "#22c55e", collar: "#2563eb", sleeve: "#e5e7eb" },
    blankOptions: {
      fabrics: ["mesh", "training"],
      patterns: ["solid", "stripe", "shoulder-block"],
      colors: COLORS,
    },
    availablePrintPositions: ["left-chest", "front-center", "back-center", "right-sleeve"],
    tags: ["白板球衣", "训练款", "团定友好"],
  },
  {
    id: "finish-black",
    name: "黑曜守门员成品球衣",
    productType: "finished",
    sport: "football",
    basePrice: 209,
    fit: "regular",
    material: "厚实耐磨面料",
    imageUrl: JERSEY_IMAGE,
    imageSource: "jersey-demo/jersey.png",
    fixedDesign: { colorName: "黑曜黑", patternName: "暗纹渐变" },
    colors: { primary: "#111827", secondary: "#f59e0b", collar: "#f59e0b", sleeve: "#1f2937" },
    availablePrintPositions: ["front-center", "back-upper", "back-center"],
    tags: ["成品球衣", "守门员", "固定暗纹"],
  },
  {
    id: "blank-youth",
    name: "青训白板套装上衣",
    productType: "blank",
    sport: "training",
    basePrice: 89,
    fit: "regular",
    material: "亲肤速干面料",
    imageUrl: JERSEY_IMAGE,
    imageSource: "jersey-demo/jersey.png",
    colors: { primary: "#ffffff", secondary: "#f59e0b", collar: "#2563eb", sleeve: "#f8fafc" },
    blankOptions: {
      fabrics: ["quick-dry", "training"],
      patterns: ["solid", "stripe", "gradient"],
      colors: COLORS,
    },
    availablePrintPositions: ["left-chest", "front-center", "back-upper", "back-center", "left-sleeve", "right-sleeve"],
    tags: ["白板球衣", "青训", "低起订"],
  },
];

const state = {
  selectedJerseyId: "blank-pro",
  selectedPlayerByJersey: {},
  design: null,
  checkoutItems: [
    { id: crypto.randomUUID(), playerName: "王一", playerNumber: "7", size: "M", quantity: 1 },
    { id: crypto.randomUUID(), playerName: "李二", playerNumber: "10", size: "L", quantity: 1 },
    { id: crypto.randomUUID(), playerName: "陈三", playerNumber: "23", size: "XL", quantity: 1 },
  ],
  contact: { contactName: "张教练", phone: "13800000000", address: "上海市浦东新区训练基地", remark: "" },
  orders: [],
  adminRuleJerseyId: "finish-blue",
  adminCustomerId: "club-a",
};

const teams = [
  {
    id: "miami",
    name: "迈阿密",
    players: [
      { id: "messi", displayName: "Lionel Messi", printName: "MESSI", number: "10" },
      { id: "suarez", displayName: "Luis Suarez", printName: "SUAREZ", number: "9" },
      { id: "alba", displayName: "Jordi Alba", printName: "ALBA", number: "18" },
    ],
  },
  {
    id: "paris",
    name: "巴黎",
    players: [
      { id: "mbappe", displayName: "Kylian Mbappe", printName: "MBAPPE", number: "7" },
      { id: "dembele", displayName: "Ousmane Dembele", printName: "DEMBELE", number: "10" },
      { id: "hakimi", displayName: "Achraf Hakimi", printName: "HAKIMI", number: "2" },
    ],
  },
];

const customers = [
  { id: "club-a", name: "蓝鲸足球俱乐部", type: "club", contactName: "张教练", phone: "13800000000", status: "active" },
  { id: "school-b", name: "启明中学", type: "school", contactName: "刘老师", phone: "13900000000", status: "active" },
  { id: "corp-c", name: "星河科技", type: "company", contactName: "陈经理", phone: "13700000000", status: "inactive" },
];

let customizationRules = jerseys.map((jersey) => ({
  jerseyId: jersey.id,
  productType: jersey.productType,
  enabledFabrics: jersey.blankOptions?.fabrics || [],
  enabledPatterns: jersey.blankOptions?.patterns || [],
  enabledColors: jersey.blankOptions?.colors || [],
  printRules: jersey.availablePrintPositions.map((position, index) => ({
    position,
    allowedTypes: index % 2 === 0 ? ["image", "text", "number"] : ["text", "number"],
    price: index % 2 === 0 ? 15 : 10,
    note: "DEMO 配置，可影响前台可选项",
  })),
  updatedAt: "2026-05-18",
}));

let customerProducts = customers.flatMap((customer, customerIndex) =>
  jerseys.map((jersey, jerseyIndex) => ({
    customerId: customer.id,
    jerseyId: jersey.id,
    visible: customerIndex === 0 || jerseyIndex % 2 === customerIndex % 2,
    exclusivePrice: jersey.basePrice - customerIndex * 6,
    minOrderQuantity: customerIndex === 1 ? 15 : 10,
    defaultTeamName: customer.name.replace("有限公司", ""),
    defaultLogo: "队徽",
    defaultColors: [jersey.colors.primary, jersey.colors.secondary],
    allowedProductTypes: [jersey.productType],
  })),
);

function getJersey(id = state.selectedJerseyId) {
  return jerseys.find((item) => item.id === id) || jerseys[0];
}

function getRule(jerseyId) {
  return customizationRules.find((item) => item.jerseyId === jerseyId);
}

function getTeam(id) {
  return teams.find((team) => team.id === id) || teams[0];
}

function getSelectedPlayer(jersey) {
  const team = getTeam(jersey.teamId);
  const playerId = state.selectedPlayerByJersey[jersey.id] || team.players[0].id;
  return team.players.find((player) => player.id === playerId) || team.players[0];
}

function defaultDesign(jersey) {
  const firstTextPosition = jersey.availablePrintPositions.includes("front-center") ? "front-center" : jersey.availablePrintPositions[0];
  const firstNumberPosition = jersey.availablePrintPositions.includes("back-center") ? "back-center" : jersey.availablePrintPositions[0];
  return {
    jerseyId: jersey.id,
    productType: jersey.productType,
    baseDesign:
      jersey.productType === "blank"
        ? {
            fabric: "quick-dry",
            pattern: "stripe",
            primaryColor: jersey.colors.primary,
            secondaryColor: jersey.colors.secondary,
            collarColor: jersey.colors.collar,
            sleeveColor: jersey.colors.sleeve,
          }
        : null,
    teamName: "TEAM",
    printItems: [
      { id: crypto.randomUUID(), position: firstTextPosition, type: "text", content: "TEAM", color: "#ffffff", size: "medium" },
      { id: crypto.randomUUID(), position: firstNumberPosition, type: "number", content: "10", color: "#ffffff", size: "large" },
    ],
  };
}

function ensureDesign(jerseyId = state.selectedJerseyId) {
  const jersey = getJersey(jerseyId);
  if (!state.design || state.design.jerseyId !== jersey.id) {
    state.selectedJerseyId = jersey.id;
    state.design = defaultDesign(jersey);
  }
  return state.design;
}

function money(value) {
  return `¥${Number(value).toFixed(0)}`;
}

function productTypeLabel(type) {
  if (type === "replica") return "球队球衣";
  return type === "finished" ? "成品定制" : "DIY 定制";
}

function positionLabel(position) {
  return POSITIONS.find(([value]) => value === position)?.[1] || position;
}

function fabricLabel(value) {
  return { "quick-dry": "速干", mesh: "网眼", stretch: "弹力", training: "训练面料" }[value] || value;
}

function patternLabel(value) {
  return { solid: "纯色", stripe: "条纹", gradient: "渐变", "shoulder-block": "肩部拼色" }[value] || value;
}

function printTypeLabel(value) {
  return { image: "图案", text: "文字", number: "号码" }[value] || value;
}

function patternStyle(pattern, primary, secondary) {
  if (pattern === "stripe") return `repeating-linear-gradient(90deg, transparent 0 18px, ${secondary} 18px 28px)`;
  if (pattern === "gradient") return `linear-gradient(145deg, ${primary}, ${secondary})`;
  if (pattern === "shoulder-block") return `linear-gradient(180deg, ${secondary} 0 28%, transparent 28%)`;
  return "none";
}

function currentColors(jersey, design = state.design) {
  if (jersey.productType === "finished" || !design?.baseDesign) return jersey.colors;
  return {
    primary: design.baseDesign.primaryColor,
    secondary: design.baseDesign.secondaryColor,
    collar: design.baseDesign.collarColor,
    sleeve: design.baseDesign.sleeveColor,
  };
}

function designUnitExtra(design = state.design) {
  if (!design) return 0;
  let extra = 0;
  design.printItems.forEach((item) => {
    extra += item.type === "image" ? 15 : 10;
  });
  if (design.productType === "blank") {
    if (design.baseDesign?.fabric === "stretch") extra += 15;
    if (["gradient", "shoulder-block"].includes(design.baseDesign?.pattern)) extra += 20;
  }
  return extra;
}

function unitPrice() {
  const jersey = getJersey(state.design?.jerseyId);
  return jersey.basePrice + designUnitExtra(state.design);
}

function totalQuantity() {
  return state.checkoutItems.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
}

function totalPrice() {
  return unitPrice() * totalQuantity();
}

function jerseyVisual(jersey, design = null, options = {}) {
  const size = options.small ? "small" : "";
  const prints = design?.printItems || [];
  return `
    <div class="real-jersey ${size}">
      <img src="${JERSEY_IMAGE}" alt="${escapeHtml(jersey.name)}" />
      <div class="print-layer">
        ${prints
          .map(
            (item) => `
          <div class="print ${item.type} ${item.size || "medium"} ${item.position}" style="color:${item.color || "#fff"}">
            ${item.type === "image" ? "★ " : ""}${escapeHtml(item.content || printTypeLabel(item.type))}
          </div>`,
          )
          .join("")}
      </div>
    </div>`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function layout(content) {
  const route = location.hash || "#/home";
  const isCustomRoute = route.includes("type=replica") || route.includes("type=finished") || route.includes("type=diy") || route.startsWith("#/designer") || route.startsWith("#/replica");
  document.querySelector("#app").innerHTML = `
    <div class="shell">
      <header class="site-header">
        <div class="utility-bar">
          <span class="utility-brand">TK Studio</span>
          <nav class="utility-nav">
            <a href="#/merchant">商家入口</a>
            <a href="#/home">帮助</a>
            <a href="#/home">加入我们</a>
            <a href="#/home">登录</a>
          </nav>
        </div>
        <div class="topbar">
          <a class="brand" href="#/home">
            <span class="brand-mark">TK</span>
            <span>TeamKit Studio</span>
          </a>
          <nav class="nav">
            ${navLink("#/home", "新品", route.startsWith("#/home") || route === "")}
            <div class="custom-menu-wrap">
              <a class="custom-nav ${isCustomRoute ? "active" : ""}" href="#/jerseys">专属定制</a>
              ${customMegaMenu()}
            </div>
          </nav>
          <div class="header-actions">
            <label class="search-pill" aria-label="搜索"><span>⌕</span><input placeholder="搜索" /></label>
            <a class="icon-link" href="#/jerseys" title="收藏">♡</a>
            <a class="icon-link" href="#/order-type" title="购物袋">▢</a>
            <a class="language-link" href="./index-en.html${route}">English</a>
          </div>
        </div>
      </header>
      <main class="container">${content}</main>
    </div>`;
}

function navLink(href, label, active) {
  return `<a class="${active ? "active" : ""}" href="${href}">${label}</a>`;
}

function customMegaMenu() {
  return `<div class="mega-menu">
    ${megaColumn("球队球服", "#/jerseys?type=replica", ["俱乐部球衣", "国家队球衣", "球员版球衣"])}
    ${megaColumn("成品定制", "#/jerseys?type=finished", ["男子成品定制", "女子成品定制", "儿童成品定制"])}
    ${megaColumn("DIY 定制", "#/jerseys?type=diy", ["比赛球服", "训练球服", "守门员球服"])}
  </div>`;
}

function megaColumn(title, href, items) {
  return `<div class="mega-column">
    <a class="mega-title" href="${href}">${title}</a>
    <div class="mega-links">
      ${items.map((item) => `<a href="${href}">${item}</a>`).join("")}
    </div>
  </div>`;
}

function pageHeader(eyebrow, title, sub, action = "") {
  return `
    <div class="page-head">
      <div>
        <p class="eyebrow">${eyebrow}</p>
        <h1>${title}</h1>
        ${sub ? `<p class="sub">${sub}</p>` : ""}
      </div>
      ${action}
    </div>`;
}

function renderHome() {
  layout(`
    <section class="promo-strip">
      <strong>球服定制工作室</strong>
      <span>选择球员款、成品定制，或从零开始 DIY 设计。</span>
    </section>
    <section class="marketing-hero">
      <div class="hero-copy">
        <p class="eyebrow">CUSTOM KIT STUDIO</p>
        <h1>打造你的比赛日球服</h1>
        <p>为个人、俱乐部或团队创建专属比赛装备。先选择商品类型，再决定普通下单或团队下单。</p>
        <div class="actions hero-actions">
          <a class="btn primary" href="#/jerseys">浏览球服</a>
          <a class="btn" href="#/jerseys?type=diy">开始 DIY 定制</a>
        </div>
      </div>
      <div class="hero-photo">${productPhoto(jerseys[2], true)}</div>
    </section>
    <section class="category-tiles">
      ${homeTile("球队球衣", "选择球队和球员，自动带出球员姓名与号码。", "#/jerseys?type=replica", jerseys[0])}
      ${homeTile("成品定制", "基于已有成品款式，选择齐色并添加图案、文字和号码。", "#/jerseys?type=finished", jerseys.find((item) => item.productType === "finished"))}
      ${homeTile("DIY 定制", "选择面料、图形版式和颜色，再添加图案、文字和号码。", "#/jerseys?type=diy", jerseys.find((item) => item.productType === "blank"))}
    </section>
    <section class="split-feature">
      <div>
        <p class="eyebrow">ORDER OPTIONS</p>
        <h2>定制完成后，再选择下单模式</h2>
        <p class="sub">普通下单适合个人购买；团队下单适合同一商品或同一设计下录入多名队员的尺码、姓名、号码和数量。</p>
      </div>
      <div class="actions">
        <a class="btn primary" href="#/order-type">选择下单模式</a>
        <a class="btn" href="#/merchant">商家入口</a>
      </div>
    </section>`);
}

function homeTile(title, text, href, jersey) {
  return `<a class="category-tile" href="${href}">
    <div class="tile-image">${productPhoto(jersey)}</div>
    <h2>${title}</h2>
    <p>${text}</p>
    <span>查看</span>
  </a>`;
}

function renderList() {
  const params = new URLSearchParams(location.hash.split("?")[1] || "");
  const keyword = params.get("q") || "";
  const type = params.get("type") || "all";
  const dataType = type === "diy" ? "blank" : type;
  const sport = params.get("sport") || "all";
  const sort = params.get("sort") || "recommend";
  let data = jerseys.filter((item) => {
    const matchKeyword = !keyword || item.name.includes(keyword);
    const matchType = dataType === "all" || item.productType === dataType;
    const matchSport = sport === "all" || item.sport === sport;
    return matchKeyword && matchType && matchSport;
  });
  if (sort === "price-asc") data.sort((a, b) => a.basePrice - b.basePrice);
  if (sort === "price-desc") data.sort((a, b) => b.basePrice - a.basePrice);

  layout(`
    ${pageHeader("JERSEY CATALOG", "选择球服商品", "球队球衣、成品定制和 DIY 定制分开浏览；定制完成后再选择普通下单或团队下单。")}
    <section class="filters panel">
      <div class="field">
        <label>搜索</label>
        <input class="input" id="search" value="${escapeHtml(keyword)}" placeholder="搜索球衣名称" />
      </div>
      <div class="field">
        <label>产品类型</label>
        <select class="select" id="typeFilter">
          <option value="all">全部</option>
          <option value="replica" ${type === "replica" ? "selected" : ""}>球队球衣</option>
          <option value="finished" ${type === "finished" ? "selected" : ""}>成品定制</option>
          <option value="diy" ${type === "diy" ? "selected" : ""}>DIY 定制</option>
        </select>
      </div>
      <div class="field">
        <label>运动类型</label>
        <select class="select" id="sportFilter">
          <option value="all">全部</option>
          <option value="football" ${sport === "football" ? "selected" : ""}>足球</option>
          <option value="basketball" ${sport === "basketball" ? "selected" : ""}>篮球</option>
          <option value="training" ${sport === "training" ? "selected" : ""}>训练</option>
        </select>
      </div>
      <div class="field">
        <label>排序</label>
        <select class="select" id="sortFilter">
          <option value="recommend">推荐</option>
          <option value="price-asc" ${sort === "price-asc" ? "selected" : ""}>价格从低到高</option>
          <option value="price-desc" ${sort === "price-desc" ? "selected" : ""}>价格从高到低</option>
        </select>
      </div>
      <div class="field">
        <label>操作</label>
        <button class="btn primary" id="applyFilters">筛选</button>
      </div>
    </section>
    <section class="grid">
      ${data
        .map(
          (item) => `
        <article class="card">
          <div class="card-visual">${productPhoto(item)}</div>
          <div class="card-body stack product-card-body">
            <div class="row product-card-meta">
              <span class="badge ${item.productType === "blank" ? "green" : "blue"}">${productTypeLabel(item.productType)}</span>
              <strong class="price">${money(item.basePrice)}</strong>
            </div>
            <div class="product-card-copy">
              <h3>${item.name}</h3>
              <p class="sub">${item.material} · ${item.tags.join(" / ")}</p>
            </div>
            <div class="actions product-card-actions">
              <a class="btn" href="${item.productType === "replica" ? `#/replica/${item.id}` : `#/jerseys/${item.id}`}">查看详情</a>
              <a class="btn primary" href="${item.productType === "replica" ? `#/replica/${item.id}` : `#/designer/${item.id}`}">${item.productType === "replica" ? "选择球员" : "开始定制"}</a>
            </div>
          </div>
        </article>`,
        )
        .join("")}
    </section>`);

  document.querySelector("#applyFilters").addEventListener("click", () => {
    const q = document.querySelector("#search").value.trim();
    const next = new URLSearchParams({
      q,
      type: document.querySelector("#typeFilter").value,
      sport: document.querySelector("#sportFilter").value,
      sort: document.querySelector("#sortFilter").value,
    });
    location.hash = `#/jerseys?${next.toString()}`;
  });
}

function renderDetail(id) {
  const jersey = getJersey(id);
  if (jersey.productType === "replica") return renderReplicaDetail(id);
  state.selectedJerseyId = jersey.id;
  const rule = getRule(jersey.id);
  layout(`
    ${pageHeader("PRODUCT DETAIL", jersey.name, "查看商品属性、可定制边界和购买入口。", `<a class="btn" href="#/jerseys">返回列表</a>`)}
    <section class="detail-layout">
      <div class="hero-visual"><div class="stack" style="justify-items:center">${productPhoto(jersey, true)}<span class="photo-credit">统一球服图 · jersey-demo/jersey.png</span></div></div>
      <aside class="info-panel panel stack">
        <div class="row">
          <span class="badge ${jersey.productType === "blank" ? "green" : "blue"}">${productTypeLabel(jersey.productType)}</span>
          <strong class="price">${money(jersey.basePrice)}</strong>
        </div>
        <p class="sub">${jersey.productType === "finished" ? "成品款式和齐色方案固定，只能在指定位置加印。" : "DIY 定制可先配置面料、图形版式和配色，再进行多位置加印。"}</p>
        <div class="spec-list">
          ${spec("运动类型", jersey.sport)}
          ${spec("版型", jersey.fit)}
          ${spec("面料", jersey.material)}
          ${spec("尺码", "S / M / L / XL / XXL，下单页按队员录入")}
          ${spec("可加印位置", rule.printRules.map((item) => positionLabel(item.position)).join("、"))}
          ${spec("可选内容", "图案、手动文字、手动号码")}
        </div>
        <div class="actions">
          <a class="btn primary" href="#/designer/${jersey.id}">开始定制</a>
          <a class="btn" href="#/order-type">选择下单模式</a>
        </div>
      </aside>
    </section>`);
}

function renderReplicaDetail(id) {
  const jersey = getJersey(id);
  const team = getTeam(jersey.teamId);
  const player = getSelectedPlayer(jersey);
  layout(`
    ${pageHeader("REPLICA JERSEY", jersey.name, "常规商品球服：选择球队球员，系统自动带出姓名和号码。", `<a class="btn" href="#/jerseys?type=replica">返回球队球衣</a>`)}
    <section class="detail-layout">
      <div class="hero-visual replica-preview">
        <div class="stack" style="justify-items:center">
          ${productPhoto(jersey, true)}
          <div class="player-print-preview">
            <strong>${player.printName}</strong>
            <span>${player.number}</span>
          </div>
        </div>
      </div>
      <aside class="info-panel panel stack">
        <div class="row">
          <span class="badge">${productTypeLabel(jersey.productType)}</span>
          <strong class="price">${money(jersey.basePrice)}</strong>
        </div>
        <div class="spec-list">
          ${spec("球队", team.name)}
          ${spec("球员", `${player.displayName} / ${player.printName} ${player.number}`)}
          ${spec("面料", jersey.material)}
          ${spec("版型", jersey.fit)}
        </div>
        <div class="field">
          <label>选择球员</label>
          <select class="select" id="playerSelect">
            ${team.players.map((item) => `<option value="${item.id}" ${item.id === player.id ? "selected" : ""}>${item.displayName} · ${item.printName} ${item.number}</option>`).join("")}
          </select>
        </div>
        <div class="two-col">
          <div class="field">
            <label>尺码</label>
            <select class="select">${["S", "M", "L", "XL", "XXL"].map((size) => `<option>${size}</option>`).join("")}</select>
          </div>
          <div class="field">
            <label>数量</label>
            <input class="input" type="number" min="1" value="1" />
          </div>
        </div>
        <div class="actions">
          <a class="btn primary" href="#/checkout-standard">加入购物袋</a>
          <a class="btn" href="#/jerseys?type=replica">继续浏览</a>
        </div>
      </aside>
    </section>`);
  document.querySelector("#playerSelect").addEventListener("change", (event) => {
    state.selectedPlayerByJersey[jersey.id] = event.target.value;
    renderReplicaDetail(jersey.id);
  });
}

function spec(label, value) {
  return `<div class="spec"><span>${label}</span><strong>${value}</strong></div>`;
}

function productPhoto(jersey, large = false) {
  return `<img class="product-photo ${large ? "large" : ""}" src="${JERSEY_IMAGE}" alt="${escapeHtml(jersey.name)}" loading="lazy" />`;
}

function renderDesigner(id) {
  const jersey = getJersey(id);
  const design = ensureDesign(jersey.id);
  const designerTab = sessionStorage.getItem("designerTab") || (jersey.productType === "blank" ? "colors" : "text");
  const infoTab = sessionStorage.getItem("infoTab") || "details";
  const rule = getRule(jersey.id);
  const colors = currentColors(jersey, design);
  layout(`
    ${pageHeader("DESIGNER", `${productTypeLabel(jersey.productType)}设计`, "参考专业定制器结构：左侧工具、中间大预览、右侧详情和价格。", `<a class="btn" href="#/jerseys/${jersey.id}">商品详情</a>`)}
    <section class="designer-layout">
      <aside class="tool-panel">
        <div class="designer-tools">
          <button class="icon-btn" title="重置" id="resetDesign">↶</button>
          <a class="icon-btn" title="返回详情" href="#/jerseys/${jersey.id}">‹</a>
          <span class="step-count">${jersey.productType === "blank" ? "1/3" : "2/3"}</span>
          <button class="icon-btn" title="下一步" id="toolNext">›</button>
          <button class="icon-btn" title="菜单">☰</button>
        </div>
        <div class="tool-tabs">
          ${toolTabButton("colors", "颜色", designerTab)}
          ${toolTabButton("text", "文字", designerTab)}
          ${toolTabButton("artwork", "图案", designerTab)}
        </div>
        <div class="tool-content">
          ${designerToolContent(designerTab, jersey, design, rule, colors)}
        </div>
      </aside>
      <div class="preview-stage">
        <div class="preview-inner">
          ${jerseyVisual(jersey, design)}
        </div>
      </div>
      <aside class="product-panel">
        <h2 class="product-title">${jersey.name}</h2>
        <div class="right-tabs">
          ${infoTabButton("details", "详情", infoTab)}
          ${infoTabButton("summary", "摘要", infoTab)}
          ${infoTabButton("pricing", "价格", infoTab)}
        </div>
        <div class="right-content">${designerRightContent(infoTab, jersey, design)}</div>
        <div class="price-block">
          <span class="muted">单件预估</span>
          <strong class="price">${money(unitPrice())}</strong>
          <p class="sub">基础价 ${money(jersey.basePrice)} + 设计项 ${money(designUnitExtra(design))}</p>
        </div>
        <div class="panel-icons">
          <button class="icon-btn" title="打印">⌘</button>
          <button class="icon-btn" title="保存">▣</button>
          <button class="icon-btn" title="分享">↗</button>
        </div>
        <a class="btn designer-cta" href="#/order-type">下一步下单</a>
      </aside>
    </section>`);

  document.querySelectorAll("[data-designer-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      sessionStorage.setItem("designerTab", button.dataset.designerTab);
      renderDesigner(jersey.id);
    });
  });
  document.querySelectorAll("[data-info-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      sessionStorage.setItem("infoTab", button.dataset.infoTab);
      renderDesigner(jersey.id);
    });
  });
  document.querySelectorAll("[data-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!design.baseDesign) return;
      design.baseDesign[button.dataset.choice] = button.dataset.value;
      renderDesigner(jersey.id);
    });
  });
  document.querySelectorAll("[data-color]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!design.baseDesign) return;
      design.baseDesign[button.dataset.color] = button.dataset.value;
      renderDesigner(jersey.id);
    });
  });
  document.querySelectorAll("[data-add-print-type]").forEach((button) => {
    button.addEventListener("click", () => {
      const type = button.dataset.addPrintType;
      const position = type === "number" && jersey.availablePrintPositions.includes("back-center") ? "back-center" : jersey.availablePrintPositions[0];
      const content = type === "image" ? "队徽" : type === "number" ? "10" : "输入文字";
      design.printItems.push({
        id: crypto.randomUUID(),
        position,
        type,
        content,
        color: "#ffffff",
        size: type === "number" ? "large" : "medium",
      });
      renderDesigner(jersey.id);
    });
  });
  document.querySelector("#resetDesign")?.addEventListener("click", () => {
    state.design = defaultDesign(jersey);
    renderDesigner(jersey.id);
  });
  document.querySelector("#toolNext")?.addEventListener("click", () => {
    const next = designerTab === "colors" ? "text" : designerTab === "text" ? "artwork" : "colors";
    sessionStorage.setItem("designerTab", next);
    renderDesigner(jersey.id);
  });
  document.querySelector("#addPrint")?.addEventListener("click", () => {
    design.printItems.push({
      id: crypto.randomUUID(),
      position: jersey.availablePrintPositions[0],
      type: "text",
      content: "输入文字",
      color: "#ffffff",
      size: "medium",
    });
    renderDesigner(jersey.id);
  });
  document.querySelectorAll("[data-print-field]").forEach((input) => {
    input.addEventListener("change", () => {
      const item = design.printItems.find((print) => print.id === input.dataset.printId);
      item[input.dataset.printField] = input.value;
      renderDesigner(jersey.id);
    });
  });
  document.querySelectorAll("[data-remove-print]").forEach((button) => {
    button.addEventListener("click", () => {
      design.printItems = design.printItems.filter((print) => print.id !== button.dataset.removePrint);
      renderDesigner(jersey.id);
    });
  });
}

function toolTabButton(value, label, active) {
  return `<button class="${active === value ? "active" : ""}" data-designer-tab="${value}">${label}</button>`;
}

function infoTabButton(value, label, active) {
  return `<button class="${active === value ? "active" : ""}" data-info-tab="${value}">${label}</button>`;
}

function designerToolContent(tab, jersey, design, rule, colors) {
  if (tab === "colors") {
    if (jersey.productType === "finished") {
      return `
        <div class="pill-title"><span class="dot"></span>成品款式锁定</div>
        <p class="sub">当前成品球衣为 ${jersey.fixedDesign.colorName} / ${jersey.fixedDesign.patternName}。整体颜色、面料和花纹不可改，只能到“文字”和“图案”里配置指定位置加印。</p>
        <div class="color-parts">
          ${lockedPart("Body", jersey.colors.primary)}
          ${lockedPart("Sleeves And Cuffs", jersey.colors.sleeve)}
          ${lockedPart("Side Panels", jersey.colors.secondary)}
        </div>`;
    }
    return `
      <div class="pill-title"><span class="dot"></span>Graphic Style</div>
      ${choiceGroup("面料", "fabric", jersey.blankOptions.fabrics, fabricLabel, design.baseDesign.fabric)}
      <div class="field">
        <label>花纹</label>
        <div class="pattern-grid">
          ${jersey.blankOptions.patterns
            .map(
              (pattern) => `
            <button class="pattern-card ${design.baseDesign.pattern === pattern ? "active" : ""}" data-choice="pattern" data-value="${pattern}">
              <span class="pattern-thumb" style="background:${patternPreview(pattern)}"></span>
              <span>${patternLabel(pattern)}</span>
            </button>`,
            )
            .join("")}
        </div>
      </div>
      <div class="color-parts">
        ${colorPart("Body", "primaryColor", colors.primary)}
        ${colorPart("Side Panels", "secondaryColor", colors.secondary)}
        ${colorPart("Sleeves And Cuffs", "sleeveColor", colors.sleeve)}
        ${colorPart("Collar", "collarColor", colors.collar)}
      </div>`;
  }

  if (tab === "text") {
    const textItems = design.printItems.filter((item) => item.type === "text" || item.type === "number");
    return `
      <div class="pill-title"><span class="dot"></span>手动文字与号码</div>
      <div class="actions">
        <button class="btn primary small" data-add-print-type="text">新增文字</button>
        <button class="btn small" data-add-print-type="number">新增号码</button>
      </div>
      <div class="print-list">
        ${(textItems.length ? textItems : design.printItems).filter((item) => item.type !== "image").map((item) => printEditor(item, rule)).join("") || `<p class="sub">还没有文字或号码，点击上方按钮添加。</p>`}
      </div>`;
  }

  const artworkItems = design.printItems.filter((item) => item.type === "image");
  return `
    <div class="pill-title"><span class="dot"></span>图案与队徽</div>
    <p class="sub">DEMO 阶段用图案名称模拟上传，不做真实图片上传和抠图。</p>
    <button class="btn primary" data-add-print-type="image">新增图案</button>
    <div class="print-list">
      ${artworkItems.map((item) => printEditor(item, rule)).join("") || `<p class="sub">还没有图案，点击上方按钮添加。</p>`}
    </div>`;
}

function designerRightContent(tab, jersey, design) {
  if (tab === "summary") {
    return `
      ${spec("产品类型", productTypeLabel(jersey.productType))}
      ${spec("设计模式", jersey.productType === "blank" ? "面料 / 花纹 / 配色 / 加印" : "固定款式 / 多位置加印")}
      ${spec("加印数量", `${design.printItems.length} 个位置`)}
      <p class="sub">${design.printItems.map((item) => `${positionLabel(item.position)}：${printTypeLabel(item.type)}「${item.content}」`).join("；") || "暂无加印内容"}</p>`;
  }
  if (tab === "pricing") {
    return `
      ${spec("基础价", money(jersey.basePrice))}
      ${spec("设计项", money(designUnitExtra(design)))}
      ${spec("单件预估", `<span class="price">${money(unitPrice())}</span>`)}
      <p class="sub">团定总价会在下单页根据队员数量、尺码和数量统一计算。</p>`;
  }
  return `
    ${spec("Style #", jersey.id.toUpperCase())}
    ${spec("类型", productTypeLabel(jersey.productType))}
    ${spec("面料", jersey.material)}
    ${spec("可加印位置", jersey.availablePrintPositions.map(positionLabel).join("、"))}
    <p class="sub">${jersey.productType === "finished" ? "成品球衣不开放整体颜色和花纹修改。" : "白板球衣可以选择面料、花纹和配色。"}</p>`;
}

function lockedPart(label, color) {
  return `<div class="part-row"><div class="part-name"><span class="part-dot" style="background:${color}"></span>${label}</div><span class="muted">已锁定</span></div>`;
}

function colorPart(label, key, active) {
  return `<div class="part-row"><div class="part-name"><span class="part-dot" style="background:${active}"></span>${label}</div>${swatches(key, active)}</div>`;
}

function patternPreview(pattern) {
  if (pattern === "stripe") return "repeating-linear-gradient(90deg, #111827 0 8px, #e5e7eb 8px 16px)";
  if (pattern === "gradient") return "linear-gradient(135deg, #111827, #cbd5e1)";
  if (pattern === "shoulder-block") return "linear-gradient(180deg, #111827 0 35%, #e5e7eb 35%)";
  return "#3f3f46";
}

function choiceGroup(label, key, values, labeler, active) {
  return `<div class="field"><label>${label}</label><div class="segmented">
    ${values.map((value) => `<button class="${active === value ? "active" : ""}" data-choice="${key}" data-value="${value}">${labeler(value)}</button>`).join("")}
  </div></div>`;
}

function swatches(key, active) {
  return `<div class="swatches">${COLORS.map((color) => `<button class="swatch ${active === color ? "active" : ""}" title="${color}" data-color="${key}" data-value="${color}" style="background:${color}"></button>`).join("")}</div>`;
}

function printEditor(item, rule) {
  const allowedPositions = rule.printRules.map((printRule) => printRule.position);
  return `
    <div class="print-item">
      <div class="two-col">
        <div class="field">
          <label>位置</label>
          <select class="select" data-print-id="${item.id}" data-print-field="position">
            ${allowedPositions.map((value) => `<option value="${value}" ${item.position === value ? "selected" : ""}>${positionLabel(value)}</option>`).join("")}
          </select>
        </div>
        <div class="field">
          <label>类型</label>
          <select class="select" data-print-id="${item.id}" data-print-field="type">
            ${["image", "text", "number"].map((value) => `<option value="${value}" ${item.type === value ? "selected" : ""}>${printTypeLabel(value)}</option>`).join("")}
          </select>
        </div>
      </div>
      <div class="field">
        <label>${item.type === "image" ? "图案名称" : item.type === "number" ? "手动输入号码" : "手动输入文字"}</label>
        <input class="input" value="${escapeHtml(item.content)}" data-print-id="${item.id}" data-print-field="content" />
      </div>
      <div class="two-col">
        <div class="field">
          <label>颜色</label>
          <input class="input" type="color" value="${item.color || "#ffffff"}" data-print-id="${item.id}" data-print-field="color" />
        </div>
        <div class="field">
          <label>大小</label>
          <select class="select" data-print-id="${item.id}" data-print-field="size">
            ${["small", "medium", "large"].map((value) => `<option value="${value}" ${item.size === value ? "selected" : ""}>${{ small: "小", medium: "中", large: "大" }[value]}</option>`).join("")}
          </select>
        </div>
      </div>
      <button class="btn danger small" data-remove-print="${item.id}">删除该加印</button>
    </div>`;
}

function renderCheckout() {
  ensureDesign();
  const jersey = getJersey(state.design.jerseyId);
  layout(`
    ${pageHeader("TEAM ORDER", "团定下单", "同一款式和统一设计下，按队员录入尺码、姓名、号码和数量。")}
    <section class="checkout-layout">
      <div class="stack">
        <div class="panel info-panel">
          <div class="row">
            <div>
              <span class="badge ${jersey.productType === "blank" ? "green" : "blue"}">${productTypeLabel(jersey.productType)}</span>
              <h2 style="margin-top:12px">${jersey.name}</h2>
              <p class="sub">加印位置：${state.design.printItems.map((item) => `${positionLabel(item.position)}-${printTypeLabel(item.type)}`).join("、")}</p>
            </div>
            ${jerseyVisual(jersey, state.design, { small: true, view: "front" })}
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>队员姓名</th><th>号码</th><th>尺码</th><th>数量</th><th>小计</th><th>操作</th></tr>
            </thead>
            <tbody>
              ${state.checkoutItems.map((item) => checkoutRow(item)).join("")}
            </tbody>
          </table>
        </div>
        <div class="actions">
          <button class="btn primary" id="addPlayer">新增队员</button>
          <button class="btn" id="copyPlayer">复制上一行</button>
          <button class="btn" id="generateNumbers">批量生成号码</button>
        </div>
      </div>
      <aside class="stack">
        <div class="metric">
          <h2>价格汇总</h2>
          ${spec("单件价格", money(unitPrice()))}
          ${spec("总件数", totalQuantity())}
          ${spec("订单总价", `<span class="price">${money(totalPrice())}</span>`)}
        </div>
        <div class="metric stack">
          <h2>收货信息</h2>
          ${contactInput("contactName", "联系人")}
          ${contactInput("phone", "手机号")}
          ${contactInput("address", "收货地址")}
          <div class="field"><label>备注</label><textarea class="textarea" data-contact="remark">${state.contact.remark}</textarea></div>
          <button class="btn primary" id="submitOrder">提交模拟订单</button>
        </div>
      </aside>
    </section>`);

  document.querySelectorAll("[data-team-field]").forEach((input) => {
    input.addEventListener("change", () => {
      const item = state.checkoutItems.find((row) => row.id === input.dataset.teamId);
      item[input.dataset.teamField] = input.value;
      renderCheckout();
    });
  });
  document.querySelectorAll("[data-remove-player]").forEach((button) => {
    button.addEventListener("click", () => {
      state.checkoutItems = state.checkoutItems.filter((row) => row.id !== button.dataset.removePlayer);
      renderCheckout();
    });
  });
  document.querySelectorAll("[data-contact]").forEach((input) => {
    input.addEventListener("change", () => {
      state.contact[input.dataset.contact] = input.value;
    });
  });
  document.querySelector("#addPlayer").addEventListener("click", () => {
    state.checkoutItems.push({ id: crypto.randomUUID(), playerName: "", playerNumber: "", size: "M", quantity: 1 });
    renderCheckout();
  });
  document.querySelector("#copyPlayer").addEventListener("click", () => {
    const last = state.checkoutItems.at(-1) || { playerName: "", playerNumber: "0", size: "M", quantity: 1 };
    state.checkoutItems.push({ ...last, id: crypto.randomUUID(), playerNumber: String(Number(last.playerNumber || 0) + 1) });
    renderCheckout();
  });
  document.querySelector("#generateNumbers").addEventListener("click", () => {
    state.checkoutItems = state.checkoutItems.map((item, index) => ({ ...item, playerNumber: String(index + 1) }));
    renderCheckout();
  });
  document.querySelector("#submitOrder").addEventListener("click", () => {
    const order = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      design: structuredClone(state.design),
      items: structuredClone(state.checkoutItems),
      ...state.contact,
      totalQuantity: totalQuantity(),
      totalPrice: totalPrice(),
      createdAt: new Date().toISOString().slice(0, 10),
      customerId: "club-a",
      productionStatus: "pending",
      productionNotes: "DEMO 订单，可下载生产明细。",
    };
    state.orders.unshift(order);
    location.hash = "#/order-success";
  });
}

function renderOrderType() {
  ensureDesign();
  const jersey = getJersey(state.design.jerseyId);
  layout(`
    ${pageHeader("ORDER OPTIONS", "选择下单模式", "定制商品可以普通下单，也可以按团队名单批量下单。")}
    <section class="order-type-grid">
      <a class="order-option" href="#/checkout-standard">
        <span class="badge">Standard Order</span>
        <h2>普通下单</h2>
        <p>适合个人购买或少量购买，确认商品、尺码、数量和收货信息即可提交模拟订单。</p>
        ${jerseyVisual(jersey, state.design, { small: true })}
      </a>
      <a class="order-option" href="#/checkout-team">
        <span class="badge">Team Order</span>
        <h2>团队下单</h2>
        <p>适合同一设计下录入多名队员的姓名、号码、尺码和数量。</p>
        ${jerseyVisual(jersey, state.design, { small: true })}
      </a>
    </section>`);
}

function renderStandardCheckout() {
  ensureDesign();
  const jersey = getJersey(state.design.jerseyId);
  layout(`
    ${pageHeader("STANDARD ORDER", "普通下单", "确认单件或少量商品的尺码、数量和收货信息。")}
    <section class="checkout-layout">
      <div class="panel info-panel">
        <div class="row">
          <div>
            <span class="badge ${jersey.productType === "blank" ? "green" : "blue"}">${productTypeLabel(jersey.productType)}</span>
            <h2 style="margin-top:12px">${jersey.name}</h2>
            <p class="sub">${state.design.printItems.map((item) => `${positionLabel(item.position)}-${printTypeLabel(item.type)}`).join("、")}</p>
          </div>
          ${jerseyVisual(jersey, state.design, { small: true })}
        </div>
        <div class="two-col" style="margin-top:18px">
          <div class="field">
            <label>尺码</label>
            <select class="select">${["S", "M", "L", "XL", "XXL"].map((size) => `<option>${size}</option>`).join("")}</select>
          </div>
          <div class="field">
            <label>数量</label>
            <input class="input" type="number" min="1" value="1" />
          </div>
        </div>
      </div>
      <aside class="stack">
        <div class="metric">
          <h2>价格汇总</h2>
          ${spec("单件价格", money(unitPrice()))}
          ${spec("数量", 1)}
          ${spec("订单总价", `<span class="price">${money(unitPrice())}</span>`)}
        </div>
        <div class="metric stack">
          <h2>收货信息</h2>
          ${contactInput("contactName", "联系人")}
          ${contactInput("phone", "手机号")}
          ${contactInput("address", "收货地址")}
          <button class="btn primary" id="submitStandardOrder">提交模拟订单</button>
        </div>
      </aside>
    </section>`);
  document.querySelectorAll("[data-contact]").forEach((input) => {
    input.addEventListener("change", () => {
      state.contact[input.dataset.contact] = input.value;
    });
  });
  document.querySelector("#submitStandardOrder").addEventListener("click", () => {
    state.orders.unshift({
      id: `ORD-${Date.now().toString().slice(-6)}`,
      design: structuredClone(state.design),
      items: [{ id: crypto.randomUUID(), playerName: state.design.teamName, playerNumber: "10", size: "M", quantity: 1 }],
      ...state.contact,
      totalQuantity: 1,
      totalPrice: unitPrice(),
      createdAt: new Date().toISOString().slice(0, 10),
      customerId: "club-a",
      productionStatus: "pending",
      productionNotes: "普通下单 DEMO。",
    });
    location.hash = "#/order-success";
  });
}

function checkoutRow(item) {
  return `
    <tr>
      <td><input class="input" value="${escapeHtml(item.playerName)}" data-team-id="${item.id}" data-team-field="playerName" /></td>
      <td><input class="input" value="${escapeHtml(item.playerNumber)}" data-team-id="${item.id}" data-team-field="playerNumber" /></td>
      <td>
        <select class="select" data-team-id="${item.id}" data-team-field="size">
          ${["S", "M", "L", "XL", "XXL"].map((size) => `<option ${item.size === size ? "selected" : ""}>${size}</option>`).join("")}
        </select>
      </td>
      <td><input class="input" type="number" min="1" value="${item.quantity}" data-team-id="${item.id}" data-team-field="quantity" /></td>
      <td><strong>${money(unitPrice() * Number(item.quantity || 0))}</strong></td>
      <td><button class="btn danger small" data-remove-player="${item.id}">删除</button></td>
    </tr>`;
}

function contactInput(key, label) {
  return `<div class="field"><label>${label}</label><input class="input" value="${escapeHtml(state.contact[key])}" data-contact="${key}" /></div>`;
}

function renderSuccess() {
  const order = state.orders[0];
  layout(`
    <section class="empty">
      <div class="stack" style="text-align:center;max-width:520px">
        <span class="badge green">提交成功</span>
        <h1>模拟订单已生成</h1>
        <p class="sub">订单号 ${order?.id || "ORD-DEMO"}，共 ${order?.totalQuantity || totalQuantity()} 件。可以去管理端查看生产信息并下载明细。</p>
        <div class="actions" style="justify-content:center">
          <a class="btn primary" href="#/admin/orders">查看生产订单</a>
          <a class="btn" href="#/jerseys">返回列表</a>
        </div>
      </div>
    </section>`);
}

function renderMerchant() {
  layout(`
    ${pageHeader("MERCHANT PORTAL", "商家入口", "管理定制规则、客户专属产品和生产订单。", `<a class="btn" href="#/home">返回首页</a>`)}
    <section class="merchant-hero panel">
      <div>
        <p class="eyebrow">BUSINESS TOOLS</p>
        <h1>进入商家后台 DEMO</h1>
        <p class="sub">后台能力从消费者前台分离，通过商家入口进入，便于演示配置、客户产品和订单生产信息。</p>
      </div>
      <a class="btn primary" href="#/admin/customization-rules">Enter Demo Admin</a>
    </section>
    <section class="category-tiles">
      ${adminEntry("定制规则", "配置成品定制和 DIY 定制分别开放哪些能力。", "#/admin/customization-rules")}
      ${adminEntry("客户产品", "为不同客户配置可见商品、专属价格和默认设置。", "#/admin/customer-products")}
      ${adminEntry("生产订单", "查看订单并下载 CSV、JSON 等生产资料。", "#/admin/orders")}
    </section>`);
}

function adminEntry(title, text, href) {
  return `<a class="category-tile admin-entry" href="${href}">
    <h2>${title}</h2>
    <p>${text}</p>
    <span>进入</span>
  </a>`;
}

function adminTabs(active) {
  return `<nav class="admin-nav">
    <a class="${active === "rules" ? "active" : ""}" href="#/admin/customization-rules">可定制范围</a>
    <a class="${active === "customers" ? "active" : ""}" href="#/admin/customer-products">客户产品</a>
    <a class="${active === "orders" ? "active" : ""}" href="#/admin/orders">生产订单</a>
  </nav>`;
}

function renderAdminRules() {
  const jersey = getJersey(state.adminRuleJerseyId);
  const rule = getRule(jersey.id);
  layout(`
    ${pageHeader("ADMIN", "球衣可定制范围配置", "配置每款球衣实际开放给客户的设计能力。")}
    ${adminTabs("rules")}
    <section class="admin-layout">
      <div class="stack">
        <div class="panel info-panel stack">
          <div class="field">
            <label>选择球衣</label>
            <select class="select" id="ruleJersey">${jerseys.map((item) => `<option value="${item.id}" ${item.id === jersey.id ? "selected" : ""}>${item.name}</option>`).join("")}</select>
          </div>
          <div class="row">
            <span class="badge ${jersey.productType === "blank" ? "green" : "blue"}">${productTypeLabel(jersey.productType)}</span>
            <span class="muted">${jersey.productType === "finished" ? "固定底图，不开放整体配色" : "可配置面料、花纹、配色"}</span>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>位置</th><th>允许类型</th><th>价格</th><th>备注</th><th>启用</th></tr></thead>
            <tbody>
              ${rule.printRules
                .map(
                  (item) => `<tr>
                <td>${positionLabel(item.position)}</td>
                <td>${item.allowedTypes.map(printTypeLabel).join(" / ")}</td>
                <td>${money(item.price)}</td>
                <td>${item.note}</td>
                <td><input type="checkbox" checked /></td>
              </tr>`,
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>
      <aside class="metric stack">
        <h2>前台能力预览</h2>
        ${jerseyVisual(jersey, defaultDesign(jersey), { small: true })}
        <p class="sub">保存后，该配置会影响前台设计页可选位置和内容类型。</p>
        <button class="btn primary" id="saveRule">保存配置</button>
        <a class="btn" href="#/designer/${jersey.id}">预览前台效果</a>
      </aside>
    </section>`);
  document.querySelector("#ruleJersey").addEventListener("change", (event) => {
    state.adminRuleJerseyId = event.target.value;
    renderAdminRules();
  });
  document.querySelector("#saveRule").addEventListener("click", () => alert("已模拟保存可定制范围配置"));
}

function renderAdminCustomers() {
  const customer = customers.find((item) => item.id === state.adminCustomerId) || customers[0];
  const configs = customerProducts.filter((item) => item.customerId === customer.id);
  layout(`
    ${pageHeader("ADMIN", "多客户专属产品配置", "给不同客户配置可见产品、专属价格、起订量和默认设计。")}
    ${adminTabs("customers")}
    <section class="admin-layout">
      <div class="stack">
        <div class="panel info-panel">
          <div class="field">
            <label>客户</label>
            <select class="select" id="customerSelect">${customers.map((item) => `<option value="${item.id}" ${item.id === customer.id ? "selected" : ""}>${item.name}</option>`).join("")}</select>
          </div>
          <p class="sub">联系人：${customer.contactName} · ${customer.phone} · 状态：${customer.status === "active" ? "启用" : "停用"}</p>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>产品</th><th>类型</th><th>可见</th><th>专属价</th><th>起订量</th><th>默认配置</th></tr></thead>
            <tbody>
              ${configs
                .map((config) => {
                  const jersey = getJersey(config.jerseyId);
                  return `<tr>
                    <td>${jersey.name}</td>
                    <td>${productTypeLabel(jersey.productType)}</td>
                    <td><input type="checkbox" ${config.visible ? "checked" : ""} /></td>
                    <td>${money(config.exclusivePrice)}</td>
                    <td>${config.minOrderQuantity} 件</td>
                    <td>${config.defaultTeamName} / ${config.defaultLogo}</td>
                  </tr>`;
                })
                .join("")}
            </tbody>
          </table>
        </div>
      </div>
      <aside class="metric stack">
        <h2>客户前台预览</h2>
        <p class="sub">当前客户可见 ${configs.filter((item) => item.visible).length} 个产品。DEMO 中不做真实客户登录，只模拟配置结果。</p>
        <button class="btn primary" id="saveCustomerConfig">保存客户配置</button>
        <a class="btn" href="#/jerseys">预览客户前台</a>
      </aside>
    </section>`);
  document.querySelector("#customerSelect").addEventListener("change", (event) => {
    state.adminCustomerId = event.target.value;
    renderAdminCustomers();
  });
  document.querySelector("#saveCustomerConfig").addEventListener("click", () => alert("已模拟保存客户专属产品配置"));
}

function renderAdminOrders() {
  const demoOrders =
    state.orders.length > 0
      ? state.orders
      : [
          {
            id: "ORD-052001",
            design: ensureDesign("finish-blue"),
            items: state.checkoutItems,
            contactName: "张教练",
            phone: "13800000000",
            address: "上海市浦东新区训练基地",
            remark: "背号请核对清楚",
            totalQuantity: totalQuantity(),
            totalPrice: totalPrice(),
            createdAt: "2026-05-18",
            customerId: "club-a",
            productionStatus: "confirmed",
            productionNotes: "成品球衣加印，确认印位后生产。",
          },
        ];
  layout(`
    ${pageHeader("ADMIN", "用户订单生产信息", "查看团定订单，下载生产明细 CSV、订单 JSON 和预览图占位。")}
    ${adminTabs("orders")}
    <div class="table-wrap">
      <table>
        <thead><tr><th>订单号</th><th>客户</th><th>产品</th><th>类型</th><th>总件数</th><th>金额</th><th>状态</th><th>操作</th></tr></thead>
        <tbody>
          ${demoOrders
            .map((order) => {
              const jersey = getJersey(order.design.jerseyId);
              const customer = customers.find((item) => item.id === order.customerId);
              return `<tr>
                <td><strong>${order.id}</strong></td>
                <td>${customer?.name || "散客"}</td>
                <td>${jersey.name}</td>
                <td>${productTypeLabel(jersey.productType)}</td>
                <td>${order.totalQuantity}</td>
                <td>${money(order.totalPrice)}</td>
                <td><span class="badge green">${statusLabel(order.productionStatus)}</span></td>
                <td class="actions">
                  <button class="btn small" data-detail="${order.id}">查看</button>
                  <button class="btn small primary" data-csv="${order.id}">CSV</button>
                  <button class="btn small" data-json="${order.id}">JSON</button>
                </td>
              </tr>`;
            })
            .join("")}
        </tbody>
      </table>
    </div>
    <section id="orderDetail" style="margin-top:18px"></section>`);
  document.querySelectorAll("[data-detail]").forEach((button) => {
    button.addEventListener("click", () => {
      const order = demoOrders.find((item) => item.id === button.dataset.detail);
      document.querySelector("#orderDetail").innerHTML = orderDetail(order);
    });
  });
  document.querySelectorAll("[data-csv]").forEach((button) => {
    button.addEventListener("click", () => {
      const order = demoOrders.find((item) => item.id === button.dataset.csv);
      downloadText(`${order.id}-production.csv`, orderCsv(order));
    });
  });
  document.querySelectorAll("[data-json]").forEach((button) => {
    button.addEventListener("click", () => {
      const order = demoOrders.find((item) => item.id === button.dataset.json);
      downloadText(`${order.id}.json`, JSON.stringify(order, null, 2));
    });
  });
}

function statusLabel(value) {
  return { pending: "待确认", confirmed: "待生产", "in-production": "生产中", completed: "已完成" }[value] || value;
}

function orderDetail(order) {
  const jersey = getJersey(order.design.jerseyId);
  return `<section class="admin-layout">
    <div class="panel info-panel stack">
      <h2>${order.id} 生产详情</h2>
      <p class="sub">${jersey.name} · ${productTypeLabel(jersey.productType)} · ${order.productionNotes || ""}</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>姓名</th><th>号码</th><th>尺码</th><th>数量</th></tr></thead>
          <tbody>${order.items.map((item) => `<tr><td>${item.playerName}</td><td>${item.playerNumber}</td><td>${item.size}</td><td>${item.quantity}</td></tr>`).join("")}</tbody>
        </table>
      </div>
      <h3>加印明细</h3>
      <p class="sub">${order.design.printItems.map((item) => `${positionLabel(item.position)}：${printTypeLabel(item.type)}「${item.content}」`).join("；")}</p>
    </div>
    <aside class="metric stack">
      ${jerseyVisual(jersey, order.design, { small: true })}
      ${spec("联系人", order.contactName)}
      ${spec("手机号", order.phone)}
      ${spec("地址", order.address)}
    </aside>
  </section>`;
}

function orderCsv(order) {
  const header = ["订单号", "球衣ID", "位置/加印", "队员姓名", "号码", "尺码", "数量"];
  const prints = order.design.printItems.map((item) => `${positionLabel(item.position)}-${printTypeLabel(item.type)}-${item.content}`).join(" | ");
  const rows = order.items.map((item) => [order.id, order.design.jerseyId, prints, item.playerName, item.playerNumber, item.size, item.quantity]);
  return [header, ...rows].map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
}

function downloadText(filename, content) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function route() {
  const hash = location.hash || "#/home";
  const [path] = hash.split("?");
  if (path === "#/home") return renderHome();
  if (path === "#/jerseys") return renderList();
  if (path.startsWith("#/replica/")) return renderReplicaDetail(path.split("/")[2]);
  if (path.startsWith("#/jerseys/")) return renderDetail(path.split("/")[2]);
  if (path.startsWith("#/designer/")) return renderDesigner(path.split("/")[2]);
  if (path === "#/order-type") return renderOrderType();
  if (path === "#/checkout" || path === "#/checkout-team") return renderCheckout();
  if (path === "#/checkout-standard") return renderStandardCheckout();
  if (path === "#/order-success") return renderSuccess();
  if (path === "#/merchant") return renderMerchant();
  if (path === "#/admin/customization-rules") return renderAdminRules();
  if (path === "#/admin/customer-products") return renderAdminCustomers();
  if (path === "#/admin/orders") return renderAdminOrders();
  location.hash = "#/home";
}

window.addEventListener("hashchange", route);
route();
