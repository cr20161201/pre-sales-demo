const assets = {
  model: "./picture/model/女模特.png",
  look1: "./picture/looks/7d04b9d6bb5a78082b38a6fa7ee18766.jpg",
  look2: "./picture/looks/fb097af89503674f5cc8d8fc7a4cb7e5.jpg",
  look3: "./picture/looks/3a3ad2ecb504d7c99a00bde791d5f6a8.jpg",
  look4: "./picture/looks/0abfa184b7cabfbdd6c7a783b75093d5.jpg",
  styleTop1: "./picture/styles/上1.jpg",
  styleTop2: "./picture/styles/上2.jpg",
  styleBottom1: "./picture/styles/下1.jpg",
  styleBottom2: "./picture/styles/下2.jpg",
};

const models = [
  {
    id: "model-default",
    name: "Alex's AI Twin",
    image: assets.model,
  },
];

const products = [
  {
    id: "item-coat",
    name: "Black Tailored Coat",
    designer: "Studio Lin",
    category: "Outerwear",
    price: 680,
    size: "M",
    color: "Black",
    status: "listed",
    image: assets.styleTop1,
  },
  {
    id: "item-dress",
    name: "Pink Asymmetric Dress",
    designer: "Maison Yu",
    category: "Dress",
    price: 420,
    size: "S",
    color: "Pink",
    status: "listed",
    image: assets.styleTop2,
  },
  {
    id: "item-trouser",
    name: "Washed Grey Denim",
    designer: "North Archive",
    category: "Bottom",
    price: 260,
    size: "M",
    color: "Grey",
    status: "listed",
    image: assets.styleBottom1,
  },
  {
    id: "item-jacket-new",
    name: "Ivory Cropped Jacket",
    designer: "Atelier Nova",
    category: "Jacket",
    price: 520,
    size: "M",
    color: "Ivory",
    status: "ready_to_list",
    image: assets.styleBottom2,
  },
  {
    id: "item-knit-review",
    name: "Soft Ribbed Knit",
    designer: "Studio Lin",
    category: "Top",
    price: 310,
    size: "S",
    color: "Cream",
    status: "pending_review",
    image: assets.styleTop1,
  },
];

const recommendedTops = [products[0], products[1], products[0], products[1]];
const recommendedBottoms = [products[2], products[3], products[2], products[3]];

const looks = [
  {
    id: "look-01",
    name: "Soft minimal look",
    price: 940,
    items: ["Black Tailored Coat", "Washed Grey Denim"],
    image: assets.look1,
  },
  {
    id: "look-02",
    name: "Gallery dinner look",
    price: 420,
    items: ["Pink Asymmetric Dress"],
    image: assets.look2,
  },
  {
    id: "look-03",
    name: "Weekend black look",
    price: 680,
    items: ["Black Tailored Coat"],
    image: assets.look3,
  },
  {
    id: "look-04",
    name: "Neutral denim look",
    price: 260,
    items: ["Washed Grey Denim"],
    image: assets.look4,
  },
];

const state = {
  appTab: "looks",
  screen: "auth",
  isOnboarded: false,
  selectedCategory: "All",
  cart: [],
  orders: [],
  lastDetail: null,
  role: "designer",
  adminPage: "list",
  adminModule: "styles",
  adminStyleTab: "listed",
  selectedMemberId: null,
  selectedStyleId: "item-jacket-new",
  tryContext: {
    type: "look",
    id: "look-01",
  },
  selectedModelId: "model-default",
  selectedTopId: null,
  selectedBottomId: null,
  tryResultIndex: 0,
};

const statusLabels = {
  draft: "Draft",
  pending_review: "Pending review",
  ready_to_list: "Ready to list",
  changes_requested: "Changes requested",
  rejected: "Rejected",
  listed: "Listed",
  unlisted: "Unlisted",
};

const adminStatusOrder = {
  listed: 1,
  ready_to_list: 2,
  pending_review: 3,
  changes_requested: 4,
  draft: 5,
  rejected: 6,
  unlisted: 7,
};

const merchantStyleTabs = [
  { id: "listed", label: "Listed" },
  { id: "ready_to_list", label: "Ready to list" },
  { id: "pending_review", label: "Pending review" },
];

const adminModules = {
  designer: [
    { id: "styles", label: "Styles" },
  ],
  merchant: [
    { id: "review", label: "Review" },
    { id: "styles", label: "Styles" },
    { id: "orders", label: "Orders" },
    { id: "users", label: "Users" },
    { id: "analytics", label: "Analytics" },
    { id: "looks", label: "Looks" },
    { id: "designers", label: "Designers" },
    { id: "settings", label: "Settings" },
  ],
};

const merchantOrders = [
  { id: "ORD-1042", member: "Alex Chen", total: 940, status: "Paid", items: "2 items" },
  { id: "ORD-1041", member: "Mia Wong", total: 420, status: "Processing", items: "1 item" },
  { id: "ORD-1040", member: "Nora Li", total: 680, status: "Shipped", items: "1 item" },
];

const members = [
  {
    id: "member-alex",
    name: "Alex Chen",
    email: "alex@example.com",
    tier: "Gold",
    age: 28,
    gender: "Female",
    location: "Shanghai",
    fit: "AI Twin ready",
    height: "172 cm",
    weight: "56 kg",
    sizes: "S / M",
    wardrobe: 12,
    tryOns: 34,
    avgTryOn: "2m 18s",
    orders: 3,
    spend: 1840,
    preferences: ["Minimal", "Tailored", "Black", "Neutral", "Studio Lin"],
    fitFeedback: ["True to size", "Prefers structured shoulders"],
    history: [
      ["Black Tailored Coat", "Tried on", "May 28"],
      ["Washed Grey Denim", "Added to wardrobe", "May 27"],
      ["Gallery dinner look", "Purchased", "May 21"],
    ],
  },
  {
    id: "member-mia",
    name: "Mia Wong",
    email: "mia@example.com",
    tier: "Silver",
    age: 31,
    gender: "Female",
    location: "Singapore",
    fit: "Profile complete",
    height: "168 cm",
    weight: "54 kg",
    sizes: "S",
    wardrobe: 8,
    tryOns: 19,
    avgTryOn: "1m 46s",
    orders: 1,
    spend: 420,
    preferences: ["Soft", "Pink", "Dress", "Maison Yu"],
    fitFeedback: ["Runs long", "Prefers relaxed waist"],
    history: [
      ["Pink Asymmetric Dress", "Purchased", "May 26"],
      ["Soft Ribbed Knit", "Tried on", "May 25"],
      ["Neutral denim look", "Added to wardrobe", "May 20"],
    ],
  },
  {
    id: "member-nora",
    name: "Nora Li",
    email: "nora@example.com",
    tier: "Gold",
    age: 35,
    gender: "Female",
    location: "Hong Kong",
    fit: "Size feedback added",
    height: "165 cm",
    weight: "52 kg",
    sizes: "XS / S",
    wardrobe: 15,
    tryOns: 41,
    avgTryOn: "2m 42s",
    orders: 4,
    spend: 2260,
    preferences: ["Formal", "Outerwear", "Grey", "Black", "North Archive"],
    fitFeedback: ["Sleeves run long", "Prefers cropped jackets"],
    history: [
      ["Ivory Cropped Jacket", "Tried on", "May 28"],
      ["Black Tailored Coat", "Purchased", "May 22"],
      ["Washed Grey Denim", "Added to wardrobe", "May 18"],
    ],
  },
];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function formatPrice(value) {
  return `$${value}`;
}

function visibleProducts() {
  return products.filter((item) => item.status === "listed");
}

function categoryOptions() {
  return ["All", ...new Set(visibleProducts().map((item) => item.category))];
}

function renderAppGrid() {
  const grid = $("#appGrid");
  const items = state.selectedCategory === "All"
    ? visibleProducts()
    : visibleProducts().filter((item) => item.category === state.selectedCategory);
  const data = state.appTab === "looks" ? looks : items;
  grid.innerHTML = data
    .map((entry) => {
      const type = state.appTab === "looks" ? "look" : "item";
      const meta = type === "look" ? "" : formatPrice(entry.price);
      return `
        <button class="${type}-card" data-detail-type="${type}" data-detail-id="${entry.id}" type="button">
          <img src="${entry.image}" alt="${entry.name}" />
          <p class="card-title">${entry.name}</p>
          ${meta ? `<span class="card-meta">${meta}</span>` : ""}
        </button>
      `;
    })
    .join("");
}

function renderAppMenu() {
  const menu = $("#appMenu");
  const options = state.appTab === "items" ? categoryOptions() : ["All"];
  menu.innerHTML = `
    <p class="menu-title">Menu</p>
    <div class="menu-options">
      <button data-open-screen="wardrobe" type="button">Wardrobe</button>
    </div>
    <p class="menu-title">Category</p>
    <div class="menu-options">
      ${options.map((category) => `
        <button class="${category === state.selectedCategory ? "active" : ""}" data-category="${category}" type="button">
          ${category}
        </button>
      `).join("")}
    </div>
  `;
}

function closeAppMenu() {
  $("#appMenu").classList.add("hidden");
}

function openScreen(screen) {
  if (screen === "profile" && !state.isOnboarded) {
    screen = "auth";
  }
  state.screen = screen;
  $$(".app-screen").forEach((panel) => panel.classList.remove("active"));
  $(`#screen-${screen}`).classList.add("active");
  const isAuthFlow = screen === "auth" || screen.startsWith("onboarding-");
  $(".app-bottom").classList.toggle("hidden", isAuthFlow);
  $$(".app-bottom button").forEach((button) => button.classList.toggle("active", button.dataset.openScreen === screen || (screen === "home" && button.dataset.openScreen === "home")));
  if (screen === "bag") renderBag();
  if (screen === "checkout") renderCheckout();
  if (screen === "wardrobe") renderWardrobe();
  if (screen === "orders") renderOrders();
}

function completeOnboarding() {
  state.isOnboarded = true;
  openScreen("home");
}

function setTryContext(type, id) {
  state.tryContext = { type, id };
  renderTrySetup();
  openScreen("try");
}

function getTryEntry() {
  if (state.tryContext.type === "recommend") {
    return {
      id: "recommended-look",
      name: "AI recommended look",
      image: defaultRecommendedTop().image,
    };
  }
  if (state.tryContext.type === "item") {
    return products.find((item) => item.id === state.tryContext.id) || visibleProducts()[0];
  }
  return looks.find((look) => look.id === state.tryContext.id) || looks[0];
}

function tryOptions() {
  if (state.tryContext.type === "recommend") {
    return [{ id: "result-1" }, { id: "result-2" }, { id: "result-3" }];
  }
  return state.tryContext.type === "item" ? visibleProducts() : looks;
}

function switchTryContext(id) {
  state.tryContext = { ...state.tryContext, id };
  state.tryResultIndex = 0;
  renderTrySetup();
}

function nextTryContext() {
  const options = tryOptions();
  const currentIndex = options.findIndex((entry) => entry.id === state.tryContext.id);
  const next = options[(currentIndex + 1 + options.length) % options.length];
  if (!next) return;
  state.tryContext = { ...state.tryContext, id: next.id };
  state.tryResultIndex = 0;
}

function selectedModel() {
  return models.find((model) => model.id === state.selectedModelId) || models[0];
}

function startStylingAnalysis() {
  openScreen("analysis");
  setTimeout(() => {
    renderRecommendations();
    openScreen("recommend");
  }, 900);
}

function defaultRecommendedTop() {
  return products.find((item) => item.id === state.selectedTopId) || recommendedTops[0];
}

function defaultRecommendedBottom() {
  return products.find((item) => item.id === state.selectedBottomId) || recommendedBottoms[0];
}

function toggleRecommendation(kind, id) {
  const key = kind === "top" ? "selectedTopId" : "selectedBottomId";
  state[key] = state[key] === id ? null : id;
  renderRecommendations();
}

function renderRecommendationRail(title, kind, items) {
  const selectedId = kind === "top" ? state.selectedTopId : state.selectedBottomId;
  return `
    <section class="recommend-section">
      <div class="try-source-head">
        <h3>${title}</h3>
      </div>
      <div class="recommend-rail">
        ${items.map((item, index) => `
          <button class="recommend-card ${selectedId === item.id ? "active" : ""}" data-select-recommend="${kind}" data-recommend-id="${item.id}" type="button">
            <img src="${item.image}" alt="${item.name}" />
            <span>${kind === "top" ? `Top ${index % 2 + 1}` : `Bottom ${index % 2 + 1}`}</span>
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function renderRecommendations() {
  const model = selectedModel();
  $("#recommendContent").innerHTML = `
    <section class="recommend-page">
      <div class="recommend-hero">
        <p class="eyebrow">Styling you</p>
        <div class="single-model-avatar">
          <img src="${model.image}" alt="${model.name}" />
        </div>
      </div>
      ${renderRecommendationRail("Tops", "top", recommendedTops)}
      ${renderRecommendationRail("Bottoms", "bottom", recommendedBottoms)}
      <button class="primary wide" id="tryRecommendedStyle" type="button">Try on styling</button>
    </section>
  `;
}

function startRecommendedTryOn() {
  state.tryContext = { type: "recommend", id: "recommended-look" };
  state.tryResultIndex = 0;
  renderTryResult();
  openScreen("try-result");
}

function renderTrySetup() {
  const isItem = state.tryContext.type === "item";
  const model = selectedModel();
  $("#trySetup").innerHTML = `
    <section class="try-setup">
      <div>
        <p class="eyebrow">AI try-on</p>
        <h2>Confirm fitting model</h2>
        <p class="muted">${isItem ? "This AI Twin will try the item and complete the styling." : "This AI Twin will try the selected full look."}</p>
      </div>

      <article class="try-model-card">
        <img src="${model.image}" alt="${model.name}" />
        <div>
          <p class="card-title">${model.name}</p>
          <button class="ghost-link" data-switch-model="${model.id}" type="button">Change model</button>
        </div>
      </article>

      <button class="primary wide" id="startTryOn" type="button">Start AI try-on</button>
    </section>
  `;
}

function startTryOn() {
  $("#startTryOn").disabled = true;
  $("#startTryOn").textContent = "Rendering try-on";
  setTimeout(() => {
    state.tryResultIndex = 0;
    renderTryResult();
    openScreen("try-result");
  }, 850);
}

function tryResultImages() {
  const entry = getTryEntry();
  if (state.tryContext.type === "recommend") {
    return [assets.look2, assets.look3, assets.look4];
  }
  if (state.tryContext.type === "item" && entry.id === "item-jacket-new") {
    return [
      assets.styleBottom2,
      assets.styleBottom1,
    ];
  }
  return [
    entry.image,
    assets.styleTop2,
    assets.styleBottom1,
  ];
}

function renderTryResult() {
  const entry = getTryEntry();
  const images = tryResultImages();
  const image = images[state.tryResultIndex % images.length];
  const top = defaultRecommendedTop();
  const bottom = defaultRecommendedBottom();
  const chips = state.tryContext.type === "recommend"
    ? [top, bottom]
    : state.tryContext.type === "item" ? [entry] : visibleProducts().slice(0, 3);
  const count = `${state.tryResultIndex + 1}/${images.length}`;
  $("#tryResult").innerHTML = `
    <section class="try-result">
      <div class="try-result-top">
        <button class="back-icon" data-open-screen="${state.tryContext.type === "recommend" ? "recommend" : "try"}" type="button" aria-label="Back">←</button>
      </div>
      <img src="${image}" alt="AI try-on result" />
      <div class="try-result-actions">
        <button class="round-action" data-save-wardrobe type="button" aria-label="Save to wardrobe">♡</button>
        <button class="round-action" type="button" aria-label="Share">↗</button>
      </div>
      <div class="try-result-cta">
        <div class="try-wearing">
          <span>${state.tryContext.type === "item" ? "Styled item" : "Wearing look"}</span>
          <strong>${entry.name}</strong>
          ${state.tryContext.type === "recommend" ? `<p>Top: ${top.name}</p><p>Bottom: ${bottom.name}</p>` : ""}
          <div class="try-result-items">
            ${chips.map((item) => `<span class="try-chip"><img src="${item.image}" alt="${item.name}" /></span>`).join("")}
          </div>
          ${state.tryContext.type === "recommend" ? `
            <div class="look-switch">
              <button id="previousTryResult" type="button">←</button>
              <strong>${count}</strong>
              <button id="nextTryResult" type="button">→</button>
            </div>
          ` : ""}
        </div>
      </div>
    </section>
  `;
}

function currentTrySaveEntry() {
  const entry = getTryEntry();
  return {
    id: `${state.tryContext.type}-${entry.id}`,
    type: state.tryContext.type,
    name: entry.name,
    image: entry.image,
    meta: state.tryContext.type === "item" ? "Saved item" : "Saved look",
  };
}

function saveToWardrobe(entry = currentTrySaveEntry()) {
  if (!entry) return;
}

function renderWardrobe() {
  const list = $("#wardrobeGrid");
  if (!list) return;
  const wardrobeItems = products.map((item) => ({
    id: item.id,
    type: "item",
    name: item.name,
    image: item.image,
    meta: item.category,
  }));
  list.innerHTML = wardrobeItems
    .map((item) => `
      <article class="wardrobe-card">
        <img src="${item.image}" alt="${item.name}" />
        <div>
          <p>${item.name}</p>
          <span>${item.meta}</span>
          <div class="wardrobe-actions">
            <button data-detail-type="${item.type}" data-detail-id="${item.id}" type="button">View</button>
            <button data-add-cart="${item.id}" type="button">Add to bag</button>
          </div>
        </div>
      </article>
    `)
    .join("");
}

function openDetail(type, id) {
  const entry = type === "look" ? looks.find((item) => item.id === id) : products.find((item) => item.id === id);
  const isLook = type === "look";
  state.lastDetail = {
    id: `${type}-${entry.id}`,
    type,
    name: entry.name,
    image: entry.image,
    meta: isLook ? "Saved look" : "Saved item",
  };
  $("#detailContent").innerHTML = `
    <article class="detail-hero ${isLook ? "look-detail" : ""}">
      <div class="detail-gallery">
        <img src="${entry.image}" alt="${entry.name}" />
      </div>
      <div>
        ${isLook ? "" : `<p class="eyebrow">${entry.category}</p>`}
        <h2>${entry.name}</h2>
        ${isLook ? "" : `<p class="muted">${entry.designer} · ${entry.color}</p>`}
      </div>
      ${isLook ? "" : `
        <div>
          <p class="card-title">Size</p>
          <div class="size-row">
            <button type="button">S</button>
            <button class="active" type="button">${entry.size}</button>
            <button type="button">L</button>
          </div>
        </div>
      `}
      <div class="detail-actions">
        <button class="primary" data-try-type="${type}" data-try-id="${entry.id}" type="button">AI try on</button>
        <button class="secondary" data-save-wardrobe type="button">Add to wardrobe</button>
      </div>
    </article>
  `;
  openScreen("detail");
}

function addToCart(id) {
  const product = products.find((item) => item.id === id) || products.find((item) => item.status === "listed");
  state.cart.push({ ...product, cartId: `${product.id}-${Date.now()}`, selected: true, quantity: 1 });
  updateBagCount();
}

function updateBagCount() {
  const bagCount = $("#bagCount");
  if (bagCount) bagCount.textContent = String(state.cart.length);
}

function renderBag() {
  const list = $("#bagList");
  if (!state.cart.length) {
    list.innerHTML = `<p class="muted">Bag is empty.</p>`;
  } else {
    list.innerHTML = state.cart
      .map((item) => `
        <article class="bag-item">
          <label class="bag-check">
            <input ${item.selected ? "checked" : ""} data-toggle-cart="${item.cartId}" type="checkbox" />
          </label>
          <img src="${item.image}" alt="${item.name}" />
          <div>
            <h3>${item.name}</h3>
            <p class="muted">${item.designer}</p>
            <p class="muted">Size ${item.size} / ${item.color}</p>
            <div class="bag-row">
              <span>Qty ${item.quantity}</span>
              <strong>${formatPrice(item.price * item.quantity)}</strong>
            </div>
            <button class="text-button" data-remove-cart="${item.cartId}" type="button">Remove</button>
          </div>
        </article>
      `)
      .join("");
  }
  const subtotal = selectedCartItems().reduce((sum, item) => sum + item.price * item.quantity, 0);
  $("#subtotal").textContent = formatPrice(subtotal);
  $("#bagTotalLabel").textContent = formatPrice(subtotal);
  $("#checkoutButton").disabled = selectedCartItems().length === 0;
}

function selectedCartItems() {
  return state.cart.filter((item) => item.selected);
}

function renderCheckout() {
  const items = selectedCartItems();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  $("#checkoutContent").innerHTML = `
    <section class="checkout-section">
      <div class="section-head">
        <h3>Shipping address</h3>
        <button class="ghost-link" type="button">Change</button>
      </div>
      <article class="checkout-card">
        <strong>Alex Chen</strong>
        <span>88 Showroom Road, Shanghai</span>
        <span>+86 138 0000 2026</span>
      </article>
    </section>

    <section class="checkout-section">
      <div class="section-head">
        <h3>Items</h3>
        <span>${items.length} item${items.length === 1 ? "" : "s"}</span>
      </div>
      <div class="checkout-items">
        ${items.map((item) => `
          <article class="checkout-item">
            <img src="${item.image}" alt="${item.name}" />
            <div>
              <h4>${item.name}</h4>
              <p>${item.size} / ${item.color}</p>
              <div class="bag-row">
                <span>Qty ${item.quantity}</span>
                <strong>${formatPrice(item.price * item.quantity)}</strong>
              </div>
            </div>
          </article>
        `).join("")}
      </div>
    </section>

    <section class="checkout-section">
      <div class="section-head">
        <h3>Payment method</h3>
        <button class="ghost-link" type="button">Change</button>
      </div>
      <article class="checkout-card">
        <strong>Card ending 2026</strong>
        <span>Visa</span>
      </article>
    </section>
  `;
  $("#checkoutSubtotal").textContent = formatPrice(subtotal);
  $("#checkoutTotal").textContent = formatPrice(subtotal);
}

function placeOrder() {
  const selectedItems = selectedCartItems();
  if (!selectedItems.length) return;
  const total = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const order = {
    id: `ORD-${String(1000 + state.orders.length + 1)}`,
    items: [...selectedItems],
    total,
    status: "paid",
    createdAt: "2026-05-28",
  };
  state.orders.unshift(order);
  state.cart = state.cart.filter((item) => !item.selected);
  updateBagCount();
  $("#successText").textContent = `${order.id} · ${formatPrice(total)} · Paid`;
  openScreen("success");
}

function renderOrders() {
  const list = $("#ordersList");
  const count = $("#orderCountLabel");
  if (count) count.textContent = `${state.orders.length} orders`;
  if (!state.orders.length) {
    list.innerHTML = `<article class="order-card"><p class="muted">No orders yet.</p></article>`;
    return;
  }
  list.innerHTML = state.orders
    .map((order) => `
      <article class="order-card">
        <div class="order-row">
          <strong>${order.id}</strong>
          <span class="status">${order.status}</span>
        </div>
        <p class="muted">${order.items.length} item(s) · ${formatPrice(order.total)}</p>
      </article>
    `)
    .join("");
}

function renderAdmin() {
  const isDesigner = state.role === "designer";
  if (!isDesigner && state.adminModule === "styles") {
    const currentTabItems = products.filter((item) => item.status === state.adminStyleTab);
    const existing = currentTabItems.find((item) => item.id === state.selectedStyleId);
    state.selectedStyleId = existing ? existing.id : currentTabItems[0]?.id;
  }
  renderAdminMenu();
  $("#adminRoleLabel").textContent = isDesigner ? "Designer" : "Merchant operator";
  $("#adminAccountRole").textContent = isDesigner ? "Designer" : "Merchant";
  $("#adminTitle").textContent = state.adminPage === "detail" ? "Style detail" : adminModuleTitle();
  $("#leftPanelTitle").textContent = state.adminModule === "review" ? "Review queue" : "Style list";
  $("#backToAdminList").style.display = state.adminPage === "detail" ? "inline-flex" : "none";
  $("#submitStyleList").style.display = isDesigner && state.adminModule === "styles" ? "inline-flex" : "none";
  renderAdminStatusTabs();
  $("#adminListPage").classList.toggle("active", state.adminPage === "list" && (state.adminModule === "styles" || state.adminModule === "review"));
  $("#adminModulePage").classList.toggle("active", state.adminPage === "list" && !["styles", "review"].includes(state.adminModule));
  $("#adminDetailPage").classList.toggle("active", state.adminPage === "detail");
  if (state.adminModule === "styles" || state.adminModule === "review") renderStyleList();
  if (!["styles", "review"].includes(state.adminModule)) renderAdminModule();
  if (state.adminPage === "detail") renderStylePreview();
}

function adminModuleTitle() {
  if (state.role === "designer") return "My styles";
  const current = adminModules.merchant.find((module) => module.id === state.adminModule);
  return current ? current.label : "Styles";
}

function renderAdminStatusTabs() {
  const tabs = $("#adminStatusTabs");
  if (state.role === "designer" || state.adminModule === "review" || state.adminModule !== "styles") {
    tabs.innerHTML = "";
    tabs.style.display = "none";
    return;
  }

  tabs.style.display = "flex";
  tabs.innerHTML = merchantStyleTabs
    .map((tab) => {
      const count = products.filter((item) => item.status === tab.id).length;
      return `<button class="${state.adminStyleTab === tab.id ? "active" : ""}" data-admin-style-tab="${tab.id}" type="button">${tab.label} <span>${count}</span></button>`;
    })
    .join("");
}

function renderAdminMenu() {
  const menus = adminModules[state.role];
  $("#adminMenu").innerHTML = menus
    .map((module) => `<button class="${state.adminModule === module.id ? "active" : ""}" data-admin-module="${module.id}" type="button">${module.label}</button>`)
    .join("");
}

function renderStyleList() {
  const source = state.adminModule === "review"
    ? products.filter((item) => item.status === "pending_review")
    : state.role === "designer"
    ? [...products].sort((a, b) => (adminStatusOrder[a.status] || 99) - (adminStatusOrder[b.status] || 99))
    : products.filter((item) => item.status === state.adminStyleTab);
  $("#pendingBadge").textContent = `${products.filter((item) => item.status === "pending_review").length} pending`;
  if (!source.length) {
    $("#styleList").innerHTML = `<p class="muted">No styles yet.</p>`;
    return;
  }
  $("#styleList").innerHTML = source
    .map((item) => `
      <button class="style-row ${item.id === state.selectedStyleId ? "active" : ""}" data-select-style="${item.id}" type="button">
        <img src="${item.image}" alt="${item.name}" />
        <div class="style-info">
          <h4>${item.name}</h4>
          <p class="muted">${item.designer} · ${item.category}</p>
        </div>
        <span>${item.category}</span>
        <span class="status-dot ${item.status}">${statusLabels[item.status]}</span>
        <span class="row-date">May 28</span>
      </button>
    `)
    .join("");
}

function renderStylePreview() {
  const item = products.find((entry) => entry.id === state.selectedStyleId) || products[0];
  $("#stylePreview").innerHTML = `
    <img src="${item.image}" alt="${item.name}" />
    <div class="meta-list">
      <div><span>Name</span><strong>${item.name}</strong></div>
      <div><span>Designer</span><strong>${item.designer}</strong></div>
      <div><span>Category</span><strong>${item.category}</strong></div>
      <div><span>Price</span><strong>${formatPrice(item.price)}</strong></div>
      <div><span>Color</span><strong>${item.color}</strong></div>
      <div><span>Size</span><strong>${item.size}</strong></div>
      <div><span>Status</span><strong>${statusLabels[item.status]}</strong></div>
    </div>
	  `;

  const canList = item.status === "ready_to_list";
  const canReview = item.status === "pending_review" || item.status === "changes_requested";
  const canMerchandise = item.status === "listed";
  if (state.role === "designer") {
    $("#adminActions").innerHTML = `
      <p class="eyebrow">Designer actions</p>
      <h3>${item.name}</h3>
      <p class="muted">Draft or review submission</p>
      <div class="admin-actions-row">
        <button class="secondary" type="button">Save draft</button>
        <button class="primary" id="submitSelected" type="button">Submit review</button>
      </div>
    `;
  } else if (canMerchandise) {
    $("#adminActions").innerHTML = `
      <p class="eyebrow">Merchandising</p>
      <h3>${item.name}</h3>
      <p class="muted">Listed</p>
      <div class="admin-actions-row">
        <button class="primary" type="button">Update price</button>
        <button class="secondary" data-unlist="${item.id}" type="button">Unlist style</button>
      </div>
    `;
  } else if (canList) {
    $("#adminActions").innerHTML = `
      <p class="eyebrow">Listing</p>
      <h3>${item.name}</h3>
      <p class="muted">Ready to list</p>
      <div class="admin-actions-row">
        <button class="primary" data-approve="${item.id}" type="button">List style</button>
      </div>
    `;
  } else if (canReview) {
    $("#adminActions").innerHTML = `
      <p class="eyebrow">Review</p>
      <h3>${item.name}</h3>
      <p class="muted">Pending review</p>
      <div class="admin-actions-row">
        <button class="primary" data-approve="${item.id}" type="button">Approve and list</button>
        <button class="secondary" data-request-change="${item.id}" type="button">Request changes</button>
        <button class="danger" data-reject="${item.id}" type="button">Reject</button>
      </div>
    `;
  } else {
    $("#adminActions").innerHTML = `
      <p class="eyebrow">Status</p>
      <h3>${statusLabels[item.status]}</h3>
      <p class="muted">No action</p>
    `;
  }
}

function renderAdminModule() {
  const content = $("#adminModuleContent");
  if (state.adminModule === "orders") {
    content.innerHTML = `
      <div class="panel-head">
        <h3>Orders</h3>
        <span>${merchantOrders.length} orders</span>
      </div>
      <div class="admin-table">
        ${merchantOrders.map((order) => `
          <div class="admin-table-row">
            <strong>${order.id}</strong>
            <span>${order.member}</span>
            <span>${order.items}</span>
            <span>${formatPrice(order.total)}</span>
            <span class="status">${order.status}</span>
          </div>
        `).join("")}
      </div>
    `;
    return;
  }

  if (state.adminModule === "users") {
    content.innerHTML = `
      <div class="panel-head">
        <h3>Users</h3>
        <span>${members.length} members</span>
      </div>
      <div class="admin-table users-table">
        ${members.map((member) => `
          <button class="admin-table-row user-row" data-member-id="${member.id}" type="button">
            <strong>${member.name}</strong>
            <span>${member.tier}</span>
            <span>${member.tryOns} try-ons</span>
            <span>${member.wardrobe} wardrobe</span>
            <span>${formatPrice(member.spend)}</span>
          </button>
        `).join("")}
      </div>
    `;
    return;
  }

  if (state.adminModule === "analytics") {
    content.innerHTML = `
      <div class="panel-head">
        <h3>Analytics</h3>
        <span>May 2026</span>
      </div>
      <div class="metric-grid">
        <article><span>Try-on rate</span><strong>42%</strong></article>
        <article><span>Bag adds</span><strong>186</strong></article>
        <article><span>Checkout starts</span><strong>74</strong></article>
        <article><span>Orders</span><strong>38</strong></article>
      </div>
      <div class="chart-grid">
        ${renderBarPanel("Conversion funnel", [["Try-on", 100], ["Wardrobe", 68], ["Bag", 44], ["Checkout", 28], ["Order", 18]])}
        ${renderBarPanel("Top styles", [["Black Tailored Coat", 92], ["Pink Asymmetric Dress", 76], ["Washed Grey Denim", 61]])}
        ${renderBarPanel("Member segments", [["Minimal", 46], ["Formal", 32], ["Streetwear", 22]])}
      </div>
    `;
    return;
  }

  if (state.adminModule === "looks") {
    content.innerHTML = `
      <div class="panel-head">
        <h3>Looks</h3>
        <span>${looks.length} looks</span>
      </div>
      <div class="admin-card-grid">
        ${looks.map((look) => `
          <article class="admin-card image-card">
            <img src="${look.image}" alt="${look.name}" />
            <strong>${look.name}</strong>
            <span>Published</span>
          </article>
        `).join("")}
      </div>
    `;
    return;
  }

  if (state.adminModule === "designers") {
    content.innerHTML = `
      <div class="panel-head">
        <h3>Designers</h3>
        <span>3 partners</span>
      </div>
      <div class="admin-table">
        ${[
          ["Studio Lin", "12 styles", "Active"],
          ["Maison Yu", "8 styles", "Active"],
          ["Atelier Nova", "3 styles", "Reviewing"],
        ].map((row) => `
          <div class="admin-table-row">
            <strong>${row[0]}</strong>
            <span>${row[1]}</span>
            <span class="status">${row[2]}</span>
          </div>
        `).join("")}
      </div>
    `;
    return;
  }

  content.innerHTML = `
    <div class="panel-head">
      <h3>Settings</h3>
      <span>Workspace</span>
    </div>
    <div class="admin-card-grid">
      <article class="admin-card"><strong>Catalog</strong><span>Active</span></article>
      <article class="admin-card"><strong>Notifications</strong><span>Active</span></article>
      <article class="admin-card"><strong>Payments</strong><span>Active</span></article>
    </div>
  `;
}

function renderBarPanel(title, rows) {
  return `
    <article class="chart-panel">
      <h4>${title}</h4>
      ${rows.map(([label, value]) => `
        <div class="bar-row"><span>${label}</span><i style="--w:${value}%"></i><strong>${value}${title === "Top styles" ? "" : "%"}</strong></div>
      `).join("")}
    </article>
  `;
}

function renderMemberDetail(id) {
  const member = members.find((entry) => entry.id === id) || members[0];
  $("#adminTitle").textContent = "User detail";
  $("#adminListPage").classList.remove("active");
  $("#adminModulePage").classList.add("active");
  $("#adminDetailPage").classList.remove("active");
  $("#backToAdminList").style.display = "inline-flex";
  $("#adminModuleContent").innerHTML = `
    <div class="panel-head">
      <h3>${member.name}</h3>
      <span>${member.tier}</span>
    </div>
    <div class="member-detail-grid">
      <section class="admin-card">
        <strong>Basic information</strong>
        <div class="meta-list compact">
          <div><span>Email</span><strong>${member.email}</strong></div>
          <div><span>Age</span><strong>${member.age}</strong></div>
          <div><span>Gender</span><strong>${member.gender}</strong></div>
          <div><span>Location</span><strong>${member.location}</strong></div>
          <div><span>Height</span><strong>${member.height}</strong></div>
          <div><span>Weight</span><strong>${member.weight}</strong></div>
          <div><span>Size</span><strong>${member.sizes}</strong></div>
        </div>
      </section>
      <section class="admin-card">
        <strong>Activity</strong>
        <div class="metric-pair"><span>Try-ons</span><strong>${member.tryOns}</strong></div>
        <div class="metric-pair"><span>Average session</span><strong>${member.avgTryOn}</strong></div>
        <div class="metric-pair"><span>Wardrobe</span><strong>${member.wardrobe}</strong></div>
        <div class="metric-pair"><span>Orders</span><strong>${member.orders}</strong></div>
        <div class="metric-pair"><span>Total spend</span><strong>${formatPrice(member.spend)}</strong></div>
      </section>
      <section class="admin-card">
        <strong>Preferences</strong>
        <div class="tag-list">${member.preferences.map((tag) => `<span>${tag}</span>`).join("")}</div>
      </section>
      <section class="admin-card">
        <strong>Fit feedback</strong>
        <div class="tag-list">${member.fitFeedback.map((tag) => `<span>${tag}</span>`).join("")}</div>
      </section>
    </div>
    <section class="admin-card member-history">
      <strong>Recent activity</strong>
      <div class="admin-table">
        ${member.history.map((row) => `
          <div class="admin-table-row">
            <strong>${row[0]}</strong>
            <span>${row[1]}</span>
            <span>${row[2]}</span>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function submitNewStyle() {
  const item = products.find((entry) => entry.id === "item-jacket-new");
  item.status = "pending_review";
  state.selectedStyleId = item.id;
  state.adminPage = "detail";
  renderAdmin();
}

function updateStyleStatus(id, status) {
  const item = products.find((entry) => entry.id === id);
  if (!item) return;
  item.status = status;
  state.selectedStyleId = id;
  renderAdmin();
  renderAppGrid();
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("button");
  if (!target) return;

  if (target.dataset.view) {
    $$(".mode-switch button").forEach((button) => button.classList.toggle("active", button === target));
    $$(".view").forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === target.dataset.view));
  }

  if (target.dataset.appTab) {
    state.appTab = target.dataset.appTab;
    state.selectedCategory = "All";
    $$(".app-tabs button").forEach((button) => button.classList.toggle("active", button === target));
    renderAppGrid();
    renderAppMenu();
    closeAppMenu();
  }

  if (target.classList.contains("menu-icon")) {
    renderAppMenu();
    $("#appMenu").classList.toggle("hidden");
  }

  if (target.dataset.category) {
    state.selectedCategory = target.dataset.category;
    renderAppGrid();
    renderAppMenu();
    closeAppMenu();
  }

  if (target.dataset.openScreen) openScreen(target.dataset.openScreen);
  if (target.dataset.onboardingNext) openScreen(`onboarding-${target.dataset.onboardingNext}`);
  if (target.id === "finishOnboarding") completeOnboarding();
  if (target.classList.contains("back-home")) openScreen("home");
  if (target.dataset.detailId) openDetail(target.dataset.detailType, target.dataset.detailId);
  if (target.dataset.tryType) setTryContext(target.dataset.tryType, target.dataset.tryId);
  if (target.dataset.switchTry) switchTryContext(target.dataset.switchTry);
  if (target.dataset.switchModel) {
    state.selectedModelId = target.dataset.switchModel;
    renderTrySetup();
  }
  if (target.dataset.addCart) {
    addToCart(target.dataset.addCart);
  }
  if (target.dataset.removeCart) {
    state.cart = state.cart.filter((item) => item.cartId !== target.dataset.removeCart);
    updateBagCount();
    renderBag();
  }
  if (target.dataset.saveWardrobe !== undefined) {
    saveToWardrobe(state.lastDetail || currentTrySaveEntry());
    openScreen("wardrobe");
  }
  if (target.id === "checkoutButton" && selectedCartItems().length) openScreen("checkout");
  if (target.id === "placeOrder") placeOrder();
  if (target.id === "startTryOn") startTryOn();
  if (target.id === "startStyling") startStylingAnalysis();
  if (target.dataset.selectRecommend) toggleRecommendation(target.dataset.selectRecommend, target.dataset.recommendId);
  if (target.id === "tryRecommendedStyle") startRecommendedTryOn();
  if (target.id === "previousTryResult") {
    const total = tryResultImages().length;
    state.tryResultIndex = (state.tryResultIndex - 1 + total) % total;
    renderTryResult();
  }
  if (target.id === "nextTryResult") {
    const total = tryResultImages().length;
    state.tryResultIndex = (state.tryResultIndex + 1) % total;
    renderTryResult();
  }

  if (target.dataset.role) {
    state.role = target.dataset.role;
    state.adminPage = "list";
    state.adminModule = "styles";
    if (state.role === "merchant") {
      state.adminStyleTab = "listed";
      state.selectedStyleId = products.find((item) => item.status === state.adminStyleTab)?.id;
    } else {
      state.selectedStyleId = "item-jacket-new";
    }
    $$(".admin-role-switch button").forEach((button) => button.classList.toggle("active", button === target));
    renderAdmin();
  }

  if (target.dataset.adminModule) {
    state.adminModule = target.dataset.adminModule;
    state.adminPage = "list";
    state.selectedMemberId = null;
    if (state.adminModule === "styles") {
      state.adminStyleTab = "listed";
      state.selectedStyleId = products.find((item) => item.status === state.adminStyleTab)?.id;
    }
    if (state.adminModule === "review") {
      state.selectedStyleId = products.find((item) => item.status === "pending_review")?.id;
    }
    renderAdmin();
  }

  if (target.dataset.memberId) {
    state.selectedMemberId = target.dataset.memberId;
    state.adminPage = "member-detail";
    renderMemberDetail(target.dataset.memberId);
  }

  if (target.dataset.adminStyleTab) {
    state.adminStyleTab = target.dataset.adminStyleTab;
    state.adminPage = "list";
    state.selectedStyleId = products.find((item) => item.status === state.adminStyleTab)?.id;
    renderAdmin();
  }

  if (target.dataset.selectStyle) {
    state.selectedStyleId = target.dataset.selectStyle;
    state.adminPage = "detail";
    renderAdmin();
  }

  if (target.id === "backToAdminList") {
    state.adminPage = "list";
    state.selectedMemberId = null;
    renderAdmin();
  }
  if (target.id === "submitStyleList" || target.id === "submitSelected") submitNewStyle();
  if (target.dataset.approve) updateStyleStatus(target.dataset.approve, "listed");
  if (target.dataset.unlist) updateStyleStatus(target.dataset.unlist, "unlisted");
  if (target.dataset.requestChange) updateStyleStatus(target.dataset.requestChange, "changes_requested");
  if (target.dataset.reject) updateStyleStatus(target.dataset.reject, "rejected");
});

document.addEventListener("change", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) return;
  if (target.dataset.toggleCart) {
    const item = state.cart.find((entry) => entry.cartId === target.dataset.toggleCart);
    if (!item) return;
    item.selected = target.checked;
    renderBag();
  }
});

renderAppGrid();
updateBagCount();
renderAppMenu();
renderAdmin();
openScreen("home");
