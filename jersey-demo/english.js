const EN_POSITIONS = {
  "left-chest": "Left Chest",
  "right-chest": "Right Chest",
  "front-center": "Front Center",
  "back-upper": "Upper Back",
  "back-center": "Back Center",
  "left-sleeve": "Left Sleeve",
  "right-sleeve": "Right Sleeve",
  shoulder: "Shoulder",
};

const EN_JERSEYS = {
  "replica-miami": {
    name: "Inter Miami Home Player Jersey",
    material: "Match-grade quick-dry fabric",
    tags: ["Replica jersey", "Player name and number", "Standard product"],
  },
  "replica-paris": {
    name: "Paris Away Player Jersey",
    material: "Lightweight match knit",
    tags: ["Replica jersey", "Preset players", "Standard order"],
  },
  "finish-blue": {
    name: "Velocity Blue Home Finished Jersey",
    material: "Lightweight quick-dry knit",
    fixedDesign: { colorName: "Home Blue", patternName: "Contrast shoulder block" },
    tags: ["Finished jersey", "Fixed colors", "Multi-position printing"],
  },
  "finish-red": {
    name: "Flame Red Away Finished Jersey",
    material: "Stretch match fabric",
    fixedDesign: { colorName: "Away Red", patternName: "Side panel contrast" },
    tags: ["Finished jersey", "Back number", "Team name print"],
  },
  "blank-pro": {
    name: "Pro Blank Match Jersey",
    material: "Quick-dry / mesh / stretch options",
    tags: ["Blank jersey", "Fabric options", "Colorable"],
  },
  "blank-training": {
    name: "Training Blank Jersey",
    material: "Training mesh fabric",
    tags: ["Blank jersey", "Training fit", "Team-order ready"],
  },
  "finish-black": {
    name: "Obsidian Finished Goalkeeper Jersey",
    material: "Durable heavyweight fabric",
    fixedDesign: { colorName: "Obsidian Black", patternName: "Tonal gradient" },
    tags: ["Finished jersey", "Goalkeeper", "Fixed tonal pattern"],
  },
  "blank-youth": {
    name: "Youth Academy Blank Jersey",
    material: "Soft quick-dry fabric",
    tags: ["Blank jersey", "Youth academy", "Low MOQ"],
  },
};

const TEXT_MAP = {
  球服定制工作室: "Custom Kit Studio",
  "选择球员款、成品定制，或从零开始 DIY 设计。": "Choose a player jersey, personalize a finished kit, or build your own design.",
  打造你的比赛日球服: "Create Your Matchday Kit",
  "为个人、俱乐部或团队创建专属比赛装备。先选择商品类型，再决定普通下单或团队下单。": "Create matchday gear for yourself, a club, or a team. Choose a product type first, then pick standard or team ordering.",
  浏览球服: "Shop Jerseys",
  "开始 DIY 定制": "Start DIY Custom",
  球队球衣: "Replica Jerseys",
  "选择球队和球员，自动带出球员姓名与号码。": "Choose a team and player; the name and number are applied automatically.",
  成品定制: "Finished Custom",
  "基于已有成品款式，选择齐色并添加图案、文字和号码。": "Start from a finished style, choose a colorway, then add artwork, text, and numbers.",
  "DIY 定制": "DIY Custom",
  "选择面料、图形版式和颜色，再添加图案、文字和号码。": "Choose fabric, graphic layout, and colors, then add artwork, text, and numbers.",
  "定制完成后，再选择下单模式": "Choose an order mode after customization",
  "普通下单适合个人购买；团队下单适合同一商品或同一设计下录入多名队员的尺码、姓名、号码和数量。": "Standard order is for individual purchases; team order captures size, name, number, and quantity for multiple players under one product or design.",
  选择下单模式: "Choose Order Mode",
  商家入口: "Merchant Portal",
  帮助: "Help",
  加入我们: "Join Us",
  登录: "Sign In",
  新品与活动: "New & Featured",
  新品: "New",
  球服: "Jerseys",
  专属定制: "Custom",
  运动分类: "Sports",
  收藏: "Favorites",
  购物袋: "Bag",
  选择球服商品: "Choose Jersey Products",
  "常规商品球服，选择球队和球员，自动带出姓名与号码。": "Standard replica jerseys. Choose a team and player, and the name and number are applied automatically.",
  "基于成品款式做有限定制，选择齐色并添加图案、文字和号码。": "Start from a finished style, choose a colorway, then add artwork, text, and numbers.",
  "从底板开始完整设计，选择面料、图形版式和颜色。": "Build from a base product by choosing fabric, graphic layout, and colors.",
  选择球队: "Choose Team",
  选择球员: "Choose Player",
  俱乐部球衣: "Club Jerseys",
  国家队球衣: "National Team Jerseys",
  球员版球衣: "Player Jerseys",
  男子成品定制: "Men's Finished Custom",
  女子成品定制: "Women's Finished Custom",
  儿童成品定制: "Kids' Finished Custom",
  比赛球服: "Match Jerseys",
  训练球服: "Training Jerseys",
  守门员球服: "Goalkeeper Jerseys",
  选择成品款: "Choose Finished Style",
  选择齐色: "Choose Colorway",
  添加图案: "Add Artwork",
  添加文字: "Add Text",
  添加号码: "Add Number",
  选择面料: "Choose Fabric",
  选择颜色: "Choose Colors",
  添加文字与号码: "Add Text and Number",
  "球队球衣、成品定制和 DIY 定制分开浏览；定制完成后再选择普通下单或团队下单。": "Browse replica jerseys, finished custom products, and DIY custom products separately. Choose standard or team ordering after customization.",
  选择球员: "Select Player",
  查看商品属性: "Review product details",
  常规商品: "Standard Product",
  常规商品球服: "Replica Jersey",
  "常规商品球服：选择球队球员，系统自动带出姓名和号码。": "Replica jersey: choose a team player and the system applies the name and number automatically.",
  返回球队球衣: "Back to Replica Jerseys",
  球队: "Team",
  球员: "Player",
  版型: "Fit",
  加入购物袋: "Add to Bag",
  继续浏览: "Keep Browsing",
  ORDER_OPTIONS: "ORDER OPTIONS",
  普通下单: "Standard Order",
  团队下单: "Team Order",
  "定制商品可以普通下单，也可以按团队名单批量下单。": "Custom products can be ordered as a standard purchase or in bulk with a team roster.",
  "适合个人购买或少量购买，确认商品、尺码、数量和收货信息即可提交模拟订单。": "For individual or small purchases. Confirm product, size, quantity, and shipping information to submit a demo order.",
  "适合同一设计下录入多名队员的姓名、号码、尺码和数量。": "For entering player names, numbers, sizes, and quantities under one design.",
  "确认单件或少量商品的尺码、数量和收货信息。": "Confirm size, quantity, and shipping information for one or a few items.",
  提交模拟订单: "Submit Demo Order",
  "管理定制规则、客户专属产品和生产订单。": "Manage customization rules, customer products, and production orders.",
  "进入商家后台 DEMO": "Enter the Merchant Demo Admin",
  "后台能力从消费者前台分离，通过商家入口进入，便于演示配置、客户产品和订单生产信息。": "Admin capabilities are separated from the storefront and entered through the Merchant Portal for rules, customer products, and production orders.",
  定制规则: "Customization Rules",
  "配置成品定制和 DIY 定制分别开放哪些能力。": "Configure which capabilities are available for Finished Custom and DIY Custom.",
  "为不同客户配置可见商品、专属价格和默认设置。": "Configure visible products, exclusive prices, and defaults for each customer.",
  "查看订单并下载 CSV、JSON 等生产资料。": "Review orders and download CSV, JSON, and production files.",
  进入: "Enter",
  返回首页: "Back to Home",
  球衣可定制范围配置: "Customization Rules",
  多客户专属产品配置: "Customer Products",
  用户订单生产信息: "Production Orders",
  已模拟保存可定制范围配置: "Customization rules saved for the demo.",
  已模拟保存客户专属产品配置: "Customer product configuration saved for the demo.",
  张教练: "Coach Zhang",
  "上海市浦东新区训练基地": "Pudong Training Base, Shanghai",
  背号请核对清楚: "Please double-check jersey numbers",
  搜索球衣名称: "Search jersey name",
  球服列表: "Jerseys",
  团定下单: "Team Order",
  可定制范围: "Customization Rules",
  客户产品: "Customer Products",
  生产订单: "Production Orders",
  搜索: "Search",
  产品类型: "Product Type",
  全部: "All",
  成品球衣: "Finished Jersey",
  白板球衣: "Blank Jersey",
  运动类型: "Sport",
  足球: "Football",
  篮球: "Basketball",
  训练: "Training",
  排序: "Sort",
  推荐: "Recommended",
  价格从低到高: "Price Low to High",
  价格从高到低: "Price High to Low",
  操作: "Actions",
  筛选: "Apply Filters",
  查看详情: "View Details",
  开始设计: "Start Design",
  返回列表: "Back to List",
  商品详情: "Product Detail",
  "开始 3D 定制": "Start 3D Customizer",
  查看团定下单: "View Team Order",
  颜色: "Colors",
  文字: "Text",
  图案: "Artwork",
  详情: "Details",
  摘要: "Summary",
  价格: "Pricing",
  单件预估: "Estimated Unit Price",
  打印: "Print",
  保存: "Save",
  分享: "Share",
  下一步下单: "Next: Order",
  重置: "Reset",
  返回详情: "Back to Details",
  下一步: "Next",
  菜单: "Menu",
  面料: "Fabric",
  花纹: "Pattern",
  速干: "Quick Dry",
  网眼: "Mesh",
  弹力: "Stretch",
  训练面料: "Training Fabric",
  纯色: "Solid",
  条纹: "Stripe",
  渐变: "Gradient",
  肩部拼色: "Shoulder Block",
  手动文字与号码: "Manual Text and Numbers",
  新增文字: "Add Text",
  新增号码: "Add Number",
  图案与队徽: "Artwork and Crest",
  新增图案: "Add Artwork",
  位置: "Position",
  类型: "Type",
  图案名称: "Artwork Name",
  手动输入号码: "Manual Number",
  手动输入文字: "Manual Text",
  大小: "Size",
  小: "Small",
  中: "Medium",
  大: "Large",
  删除该加印: "Remove Print",
  设计模式: "Design Mode",
  加印数量: "Print Items",
  基础价: "Base Price",
  设计项: "Design Extras",
  面料: "Fabric",
  可加印位置: "Print Positions",
  已锁定: "Locked",
  队员姓名: "Player Name",
  号码: "Number",
  尺码: "Size",
  数量: "Qty",
  小计: "Subtotal",
  新增队员: "Add Player",
  复制上一行: "Copy Last Row",
  批量生成号码: "Generate Numbers",
  价格汇总: "Price Summary",
  单件价格: "Unit Price",
  总件数: "Total Units",
  订单总价: "Order Total",
  收货信息: "Shipping Info",
  联系人: "Contact",
  手机号: "Phone",
  收货地址: "Shipping Address",
  地址: "Address",
  备注: "Notes",
  提交模拟订单: "Submit Demo Order",
  删除: "Delete",
  提交成功: "Submitted",
  模拟订单已生成: "Demo Order Created",
  查看生产订单: "View Production Orders",
  选择球衣: "Select Jersey",
  允许类型: "Allowed Types",
  启用: "Enabled",
  前台能力预览: "Storefront Capability Preview",
  保存配置: "Save Configuration",
  预览前台效果: "Preview Storefront",
  客户: "Customer",
  客户前台预览: "Customer Storefront Preview",
  保存客户配置: "Save Customer Configuration",
  预览客户前台: "Preview Customer Storefront",
  可见: "Visible",
  专属价: "Exclusive Price",
  起订量: "MOQ",
  默认配置: "Default Setup",
  订单号: "Order ID",
  产品: "Product",
  总件数: "Total Units",
  金额: "Amount",
  状态: "Status",
  查看: "View",
  姓名: "Name",
  加印明细: "Print Details",
  散客: "Guest",
  待确认: "Pending",
  待生产: "Ready for Production",
  生产中: "In Production",
  已完成: "Completed",
  可选内容: "Available Content",
  Style: "Style",
};

const PLACEHOLDER_MAP = {
  搜索球衣名称: "Search jersey name",
};

const FALLBACK_TERMS = [
  ["球衣可定制范围", "Customization Rules"],
  ["可定制范围", "Customization Rules"],
  ["多客户专属产品", "Customer Products"],
  ["用户订单生产信息", "Production Orders"],
  ["专属产品", "Products"],
  ["生产订单", "Production Orders"],
  ["生产信息", "Production Info"],
  ["成品球衣", "Finished Jersey"],
  ["白板球衣", "Blank Jersey"],
  ["球队球衣", "Replica Jerseys"],
  ["成品定制", "Finished Custom"],
  ["DIY 定制", "DIY Custom"],
  ["商家入口", "Merchant Portal"],
  ["普通下单", "Standard Order"],
  ["团队下单", "Team Order"],
  ["图形版式", "Graphic Layout"],
  ["齐色", "Colorway"],
  ["球员", "Player"],
  ["球队", "Team"],
  ["购物袋", "Bag"],
  ["收藏", "Favorites"],
  ["帮助", "Help"],
  ["加入我们", "Join Us"],
  ["登录", "Sign In"],
  ["新品与活动", "New & Featured"],
  ["运动分类", "Sports"],
  ["球服列表", "Jerseys"],
  ["团定下单", "Team Order"],
  ["开始定制", "Start Design"],
  ["开始设计", "Start Design"],
  ["开始", "Start"],
  ["商品", "Product"],
  ["球衣", "Jersey"],
  ["球服", "Jersey"],
  ["客户", "Customer"],
  ["产品", "Product"],
  ["专属", "Exclusive"],
  ["订单", "Order"],
  ["名称", "Name"],
  ["生产", "Production"],
  ["配置", "Configuration"],
  ["设计", "Design"],
  ["加印", "Print"],
  ["前台", "Storefront"],
  ["能力", "Capability"],
  ["预览", "Preview"],
  ["保存", "Save"],
  ["查看", "View"],
  ["返回", "Back"],
  ["列表", "List"],
  ["详情", "Details"],
  ["下单", "Order"],
  ["团定", "Team Order"],
  ["范围", "Rules"],
  ["用户", "User"],
  ["管理端", "Admin"],
  ["选择", "Select"],
  ["启用", "Active"],
  ["停用", "Inactive"],
  ["已模拟", "Demo"],
  ["件", "units"],
  ["多", "Multi"],
];

const SUBSTITUTIONS = [
  ["选择球衣，开始团定", "Choose a jersey and start a team order"],
  ["成品球衣适合快速加印，白板球衣适合从面料、花纹和配色开始设计。", "Finished jerseys are ideal for fast printing; blank jerseys start from fabric, pattern, and color choices."],
  ["查看球衣属性、可定制边界和团定入口。", "Review jersey specs, customization limits, and team-order entry points."],
  ["统一球服图 · jersey-demo/jersey.png", "Shared jersey image - jersey-demo/jersey.png"],
  ["成品款式和整体配色固定，只能在指定位置加印。", "The finished design and overall colors are fixed; printing is limited to approved positions."],
  ["白板款可先配置面料、花纹和配色，再进行多位置加印。", "Blank jerseys let you configure fabric, pattern, and colors before adding prints."],
  ["S / M / L / XL / XXL，下单页按队员录入", "S / M / L / XL / XXL, entered per player on the order page"],
  ["图案、手动文字、手动号码", "Artwork, manual text, manual numbers"],
  ["参考专业定制器结构：左侧工具、中间大预览、右侧详情和价格。", "A professional customizer layout: tools on the left, large preview in the center, details and pricing on the right."],
  ["成品底图固定，只叠加指定位置内容。", "The finished base image is fixed; only approved print layers are added."],
  ["统一使用指定球服图演示，配置项以流程为准。", "This demo uses the shared jersey image; the workflow controls show the configuration logic."],
  ["基础价 ", "Base "],
  [" + 设计项 ", " + design extras "],
  ["成品款式锁定", "Finished Style Locked"],
  ["整体颜色、面料和花纹不可改，只能到“文字”和“图案”里配置指定位置加印。", "Overall colors, fabric, and pattern are locked. Use Text and Artwork to configure approved print positions."],
  ["Graphic Style", "Graphic Style"],
  ["还没有文字或号码，点击上方按钮添加。", "No text or numbers yet. Use the buttons above to add one."],
  ["DEMO 阶段用图案名称模拟上传，不做真实图片上传和抠图。", "This demo simulates uploads with artwork names; no real image upload or cutout processing is included."],
  ["还没有图案，点击上方按钮添加。", "No artwork yet. Use the button above to add one."],
  ["面料 / 花纹 / 配色 / 加印", "Fabric / Pattern / Colors / Printing"],
  ["固定款式 / 多位置加印", "Fixed Style / Multi-position Printing"],
  [" 个位置", " positions"],
  ["暂无加印内容", "No print items yet"],
  ["团定总价会在下单页根据队员数量、尺码和数量统一计算。", "The team-order total is calculated on the order page from player rows, sizes, and quantities."],
  ["成品球衣不开放整体颜色和花纹修改。", "Finished jerseys do not allow overall color or pattern edits."],
  ["白板球衣可以选择面料、花纹和配色。", "Blank jerseys allow fabric, pattern, and color choices."],
  ["同一款式和统一设计下，按队员录入尺码、姓名、号码和数量。", "Enter size, name, number, and quantity for each player under one shared design."],
  ["加印位置：", "Print positions: "],
  ["DEMO 订单，可下载生产明细。", "Demo order with downloadable production details."],
  ["订单号 ", "Order "],
  ["，共 ", ", "],
  [" 件。可以去管理端查看生产信息并下载明细。", " units. Open the admin area to view production details and download files."],
  ["配置每款球衣实际开放给客户的设计能力。", "Configure which design capabilities are available for each jersey."],
  ["固定底图，不开放整体配色", "Fixed base image; overall colors are locked"],
  ["可配置面料、花纹、配色", "Fabric, pattern, and colors configurable"],
  ["保存后，该配置会影响前台设计页可选位置和内容类型。", "After saving, this configuration affects available positions and content types in the storefront designer."],
  ["给不同客户配置可见产品、专属价格、起订量和默认设计。", "Configure visible products, exclusive prices, MOQs, and defaults for each customer."],
  ["联系人：", "Contact: "],
  ["状态：", "Status: "],
  ["启用", "Active"],
  ["停用", "Inactive"],
  ["当前客户可见 ", "This customer can see "],
  [" 个产品。DEMO 中不做真实客户登录，只模拟配置结果。", " products. The demo simulates customer-specific visibility without real login."],
  [" 件", " units"],
  ["查看团定订单，下载生产明细 CSV、订单 JSON 和预览图占位。", "Review team orders and download production CSV, order JSON, and preview placeholders."],
  ["生产详情", "Production Detail"],
  ["背号请核对清楚", "Please double-check jersey numbers"],
  ["成品球衣加印，确认印位后生产。", "Finished jersey printing. Confirm print placement before production."],
  ["DEMO 配置，可影响前台可选项", "Demo rule; affects storefront options"],
  ["队徽", "Crest"],
  ["输入文字", "Enter Text"],
];

function applyEnglishData() {
  POSITIONS.forEach((position) => {
    position[1] = EN_POSITIONS[position[0]] || position[1];
  });

  jerseys.forEach((jersey) => {
    Object.assign(jersey, EN_JERSEYS[jersey.id] || {});
    jersey.imageSource = "jersey-demo/jersey.png";
  });

  state.checkoutItems = [
    { id: crypto.randomUUID(), playerName: "Alex", playerNumber: "7", size: "M", quantity: 1 },
    { id: crypto.randomUUID(), playerName: "Jordan", playerNumber: "10", size: "L", quantity: 1 },
    { id: crypto.randomUUID(), playerName: "Casey", playerNumber: "23", size: "XL", quantity: 1 },
  ];
  state.contact = { contactName: "Coach Zhang", phone: "+86 138 0000 0000", address: "Pudong Training Base, Shanghai", remark: "" };

  teams[0].name = "Inter Miami";
  teams[1].name = "Paris";

  customers[0] = { id: "club-a", name: "Blue Whale FC", type: "club", contactName: "Coach Zhang", phone: "+86 138 0000 0000", status: "active" };
  customers[1] = { id: "school-b", name: "Qiming High School", type: "school", contactName: "Ms. Liu", phone: "+86 139 0000 0000", status: "active" };
  customers[2] = { id: "corp-c", name: "Galaxy Tech", type: "company", contactName: "Manager Chen", phone: "+86 137 0000 0000", status: "inactive" };

  customizationRules.forEach((rule) => {
    rule.note = "Demo rule; affects storefront options";
  });
  customerProducts.forEach((config) => {
    const customer = customers.find((item) => item.id === config.customerId);
    config.defaultTeamName = customer?.name || "Team";
    config.defaultLogo = "Crest";
  });

  if (state.design) state.design = defaultDesign(getJersey(state.design.jerseyId));
}

function translateValue(value) {
  let next = TEXT_MAP[value] || value;
  SUBSTITUTIONS.forEach(([from, to]) => {
    next = next.replaceAll(from, to);
  });
  Object.entries(TEXT_MAP).forEach(([from, to]) => {
    if (next.includes(from)) next = next.replaceAll(from, to);
  });
  FALLBACK_TERMS.forEach(([from, to]) => {
    if (next.includes(from)) next = next.replaceAll(from, to);
  });
  return next.replaceAll("：", ": ").replaceAll("；", "; ").replaceAll("、", ", ");
}

function translateTextNodes(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    const original = node.nodeValue;
    const trimmed = original.trim();
    if (!trimmed) return;
    const translated = translateValue(trimmed);
    if (translated === trimmed) return;
    node.nodeValue = original.replace(trimmed, translated);
  });
}

function translateAttributes(root) {
  root.querySelectorAll("[placeholder], [title], [alt], [aria-label]").forEach((element) => {
    ["placeholder", "title", "alt", "aria-label"].forEach((attr) => {
      const value = element.getAttribute(attr);
      if (value) element.setAttribute(attr, translateValue(value));
    });
  });
  root.querySelectorAll("option").forEach((option) => {
    option.textContent = translateValue(option.textContent.trim());
  });
  root.querySelectorAll("input[value]").forEach((input) => {
    const translated = translateValue(input.value);
    if (translated !== input.value) input.value = translated;
  });
  Object.entries(PLACEHOLDER_MAP).forEach(([from, to]) => {
    root.querySelectorAll(`[placeholder="${from}"]`).forEach((input) => {
      input.placeholder = to;
    });
  });
}

function normalizeEnglishLinks(root) {
  root.querySelectorAll('a[href*="type=blank"]').forEach((link) => {
    link.href = link.getAttribute("href").replace("type=blank", "type=diy");
  });
}

function translateLanguageLink() {
  const link = document.querySelector(".language-link");
  if (!link) return;
  link.textContent = "Chinese";
  link.href = `./index.html${location.hash || "#/jerseys"}`;
}

let translating = false;
function translatePage() {
  if (translating) return;
  translating = true;
  const app = document.querySelector("#app");
  if (app) {
    translateTextNodes(app);
    translateAttributes(app);
    normalizeEnglishLinks(app);
    translateLanguageLink();
  }
  translating = false;
}

function translateAlert(message) {
  window.originalAlert(translateValue(message));
}

const originalPageHeader = pageHeader;
pageHeader = function pageHeaderEn(eyebrow, title, sub, action = "") {
  return originalPageHeader(eyebrow, translateValue(title), translateValue(sub || ""), action ? translateValue(action) : "");
};

const originalSpec = spec;
spec = function specEn(label, value) {
  return originalSpec(translateValue(label), typeof value === "string" ? translateValue(value) : value);
};

adminTabs = function adminTabsEn(active) {
  return `<nav class="admin-nav">
    <a class="${active === "rules" ? "active" : ""}" href="#/admin/customization-rules">Customization Rules</a>
    <a class="${active === "customers" ? "active" : ""}" href="#/admin/customer-products">Customer Products</a>
    <a class="${active === "orders" ? "active" : ""}" href="#/admin/orders">Production Orders</a>
  </nav>`;
};

const originalMoney = money;
money = function moneyEn(value) {
  return `$${Number(value).toFixed(0)}`;
};
productTypeLabel = function productTypeLabelEn(type) {
  if (type === "replica") return "Replica Jersey";
  return type === "finished" ? "Finished Custom" : "DIY Custom";
};
fabricLabel = function fabricLabelEn(value) {
  return { "quick-dry": "Quick Dry", mesh: "Mesh", stretch: "Stretch", training: "Training Fabric" }[value] || value;
};
patternLabel = function patternLabelEn(value) {
  return { solid: "Solid", stripe: "Stripe", gradient: "Gradient", "shoulder-block": "Shoulder Block" }[value] || value;
};
printTypeLabel = function printTypeLabelEn(value) {
  return { image: "Artwork", text: "Text", number: "Number" }[value] || value;
};
statusLabel = function statusLabelEn(value) {
  return { pending: "Pending", confirmed: "Ready for Production", "in-production": "In Production", completed: "Completed" }[value] || value;
};
window.originalAlert = window.alert.bind(window);
window.alert = translateAlert;

const originalOrderCsv = orderCsv;
orderCsv = function orderCsvEn(order) {
  const csv = originalOrderCsv(order);
  return translateValue(csv)
    .replaceAll("球衣ID", "Jersey ID")
    .replaceAll("位置/加印", "Position / Print")
    .replaceAll("队员姓名", "Player Name");
};

applyEnglishData();
route();
translatePage();

const observer = new MutationObserver(() => {
  window.requestAnimationFrame(translatePage);
});
observer.observe(document.querySelector("#app"), { childList: true, subtree: true, characterData: true });
