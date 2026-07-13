const LANG_KEY = "ramatex-demo-lang";
const BASKET_KEY = "ramatex-demo-basket";
const ORDERS_KEY = "ramatex-demo-orders";
const LOGIN_KEY = "ramatex-demo-brand-access";
const image = (id, width = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;
const asset = (path) => encodeURI(`./assets/${path}`);

const LOCAL = {
  banner: {
    brandOne: asset("banner/brand/REF_A_Ramatex_banners_site_desk_1_1200x540_acf_cropped.png"),
    brandTwo: asset("banner/brand/REF_A_Ramatex_banners_site_desk_2_1200x540_acf_cropped.png"),
    brandThree: asset("banner/brand/REF_A_Ramatex_banners_site_desk_3_1200x540_acf_cropped.png"),
    brandFour: asset("banner/brand/REF_A_Ramatex_banners_site_desk_4_1200x540_acf_cropped.png"),
    nikeOne: asset("banner/nike/Weixin Image_20260630104818_7_2.png"),
    nikeTwo: asset("banner/nike/Weixin Image_20260630104835_8_2.png"),
    nikeThree: asset("banner/nike/Weixin Image_20260630104855_9_2.png"),
    uniqloOne: asset("banner/uniqlo/res455fc49accd03fb5141839c3aaec4458fr.jpg"),
  },
  style: {
    brandOne: asset("style/brand/REF_24_0310-copiar-scaled-e1762539234462.jpg"),
    brandTwo: asset("style/brand/REF_33_0601-copiar-scaled-e1762540034804.jpg"),
    brandThree: asset("style/brand/REF_19_0055-copiar-scaled-e1762527744909.jpg"),
    brandFour: asset("style/brand/M3_7869-e1762440928751.png"),
    brandFive: asset("style/brand/REF_16_0132-copiar-scaled.jpg"),
    brandSix: asset("style/brand/REF_31_0517-copiar-scaled-e1762527347998.jpg"),
    brandSeven: asset("style/brand/REF_32_0571-copiar-scaled-e1762527419753.jpg"),
    brandEight: asset("style/brand/REF_23_0264-copiar-scaled-e1762440527382.jpg"),
    nikeOne: asset("style/nike/AS+M+NSW+MANFEN+SS+TEE.avif"),
    nikeTwo: asset("style/nike/AS+KB+M+NK+DF+TEE+M90+SSNL2+SS.avif"),
    nikeThree: asset("style/nike/AS+M+ACG+DF+TEE+LSE+CAMP+MEADO.avif"),
    nikeFour: asset("style/nike/AS+U+NSW+RETRO+FLAIR+TEE.avif"),
    nikeFive: asset("style/nike/AS+LJ+M+NK+TEE+M90+DN.avif"),
    nikeSix: asset("style/nike/AS+U+NSW+TEE+LSE+REFLECTIVE+SH.avif"),
    uniqloOne: asset("style/uniqlo/usgoods_18_482195_3x4.avif"),
    uniqloTwo: asset("style/uniqlo/usgoods_02_482839_3x4.avif"),
    uniqloThree: asset("style/uniqlo/usgoods_40_424873_3x4.avif"),
  },
  fabric: {
    hawaii: asset("fabric/HAWAII2.jpg"),
    white: asset("fabric/blanc.jpg"),
    whiteAlt: asset("fabric/blanc (1).jpg"),
    compress: asset("fabric/compress.jpg"),
    italia: asset("fabric/italia-light.jpg"),
    lightness: asset("fabric/lightness2.jpg"),
    mesh: asset("fabric/WhatsApp-Image-2022-08-29-at-10.32.17-1.jpeg"),
    interlock: asset("fabric/WhatsApp-Image-2023-03-01-at-09.05.15-1.jpg"),
    knit: asset("fabric/WhatsApp-Image-2023-03-03-at-17.13.57.jpeg"),
  },
  video: {
    aiWomen: asset("video/女装AI视频.mp4"),
    motionOne: asset("video/视频1.mp4"),
    motionTwo: asset("video/视频2.mp4"),
    motionThree: asset("video/视频3.mp4"),
    motionFour: asset("video/视频4.mp4"),
    studio: asset("video/媒体2.mp4"),
  },
  poster: {
    aiWomen: asset("video/posters/video-ai-women.jpg"),
    motionOne: asset("video/posters/video-1.jpg"),
    motionTwo: asset("video/posters/video-2.jpg"),
    motionThree: asset("video/posters/video-3.jpg"),
    motionFour: asset("video/posters/video-4.jpg"),
    studio: asset("video/posters/video-studio.jpg"),
  },
};

const ASSETS = {
  hero: image("photo-1515886657613-9f3515b0c78f", 1700),
  rack: image("photo-1523398002811-999ca8dec234", 1400),
  apparel: image("photo-1558769132-cb1aea458c5e", 1400),
  fabric: LOCAL.fabric.mesh,
  studio: image("photo-1529139574466-a303027c1d8b", 1400),
  model: image("photo-1483985988355-763728e1935b", 1400),
  detail: LOCAL.fabric.compress,
  production: image("photo-1532453288672-3a27e9be9efd", 1400),
  client: image("photo-1515886657613-9f3515b0c78f", 1600),
  training: image("photo-1515886657613-9f3515b0c78f", 1400),
};

const IS_BRAND_SPACE = window.location.pathname.endsWith("brand-space.html");
const urlLang = new URLSearchParams(window.location.search).get("lang");
let lang = urlLang === "en" || urlLang === "zh" ? urlLang : localStorage.getItem(LANG_KEY) === "en" ? "en" : "zh";
localStorage.setItem(LANG_KEY, lang);

const dual = (zh, en) => ({ zh, en });
const l = (value) => (typeof value === "string" ? value : value[lang]);

const C = {
  menu: dual("菜单", "Menu"),
  langSwitch: dual("EN", "中文"),
  brandSpace: dual("品牌空间", "Brand Space"),
  enterBrandSpace: dual("品牌空间", "Brand Space"),
  enterProject: dual("进入", "Enter"),
  orderCenter: dual("订单中心", "Orders"),
  selectionBasket: dual("选品篮", "Selection Basket"),
  addToBasket: dual("加入选品篮", "Add to Basket"),
  checkout: dual("提交订单", "Submit Order"),
  service: dual("客服", "Service"),
  backTop: dual("返回顶部", "Top"),
  styles: dual("款式", "Styles"),
  videos: dual("视频", "Videos"),
  materials: dual("面料", "Materials"),
  privateStyles: dual("款式", "Styles"),
  privateVideos: dual("视频", "Videos"),
  privateMaterials: dual("面料", "Materials"),
  viewStyles: dual("查看款式", "View Styles"),
  viewVideos: dual("查看视频", "View Videos"),
  viewDetails: dual("查看详情", "View Details"),
  viewAll: dual("显示更多", "View more"),
  watch: dual("观看", "Watch"),
  playTryOn: dual("查看动态效果", "View Motion"),
  back: dual("返回", "Back"),
  backToCollections: dual("返回", "Back"),
  backToClient: dual("返回", "Back"),
  startCustom: dual("开始定制", "Start Customizing"),
  startB2B: dual("进入定制", "Start Customization"),
  submitCustomization: dual("加入选品篮", "Add to Basket"),
  previewTryOn: dual("预览上身效果", "Preview Try-on"),
  front: dual("正面", "Front"),
  backView: dual("背面", "Back"),
  aiView: dual("AI 上身", "AI View"),
  close: dual("关闭", "Close"),
  selected: dual("已选择", "selected"),
  submitted: dual("已加入选品篮。", "Added to selection basket."),
};

const publicSlides = [
  {
    title: dual("TRAINING ESSENTIALS", "TRAINING ESSENTIALS"),
    eyebrow: dual("2026 春季", "Spring 2026"),
    text: dual("轻量训练系列", "Lightweight training series"),
    image: LOCAL.banner.brandOne,
    action: C.viewStyles,
    section: "styles",
  },
  {
    title: dual("STUDIO COLORWAYS", "STUDIO COLORWAYS"),
    eyebrow: dual("新配色", "New Colorways"),
    text: dual("同款延展", "Style extensions"),
    image: LOCAL.banner.brandTwo,
    action: C.viewStyles,
    section: "styles",
  },
  {
    title: dual("RUNWAY READY", "RUNWAY READY"),
    eyebrow: dual("造型系列", "Styled Looks"),
    text: dual("廓形与搭配", "Silhouette & styling"),
    image: LOCAL.banner.brandThree,
    action: C.viewStyles,
    section: "styles",
  },
  {
    title: dual("ON BODY MOTION", "ON BODY MOTION"),
    eyebrow: dual("动态造型", "Motion Looks"),
    text: dual("上身、走秀、细节", "Fit, runway, detail"),
    image: LOCAL.banner.brandFour,
    action: C.viewVideos,
    section: "videos",
  },
];

const clientSlides = [
  {
    title: dual("BRAND TRAINING 2026", "BRAND TRAINING 2026"),
    eyebrow: dual("春季训练", "Spring Training"),
    text: dual("黑红主场系列", "Black and red home collection"),
    image: LOCAL.banner.nikeOne,
    action: C.privateStyles,
    section: "private-styles",
  },
  {
    title: dual("SAMPLE IN MOTION", "SAMPLE IN MOTION"),
    eyebrow: dual("视频", "Videos"),
    text: dual("训练动作与外套开合", "Training motion and jacket fit"),
    image: LOCAL.banner.nikeTwo,
    action: C.privateVideos,
    section: "private-videos",
  },
  {
    title: dual("MATERIAL SET", "MATERIAL SET"),
    eyebrow: dual("面料", "Materials"),
    text: dual("网眼、梭织、针织", "Mesh, woven, knit"),
    image: LOCAL.banner.nikeThree,
    action: C.privateMaterials,
    section: "private-materials",
  },
  {
    title: dual("PROJECT READY", "PROJECT READY"),
    eyebrow: dual("项目", "Project"),
    text: dual("样衣、面料、视频已准备", "Samples, materials and motion ready"),
    image: LOCAL.banner.uniqloOne,
    action: C.privateStyles,
    section: "private-styles",
  },
];

const publicProducts = [
  {
    id: "running-tee",
    name: dual("疾速训练 T 恤", "Velocity Running Tee"),
    category: dual("高性能针织", "Performance knit"),
    price: dual("参考价 ¥299", "$42.00"),
    code: "RMX-RT2601",
    image: LOCAL.style.brandOne,
    gallery: [LOCAL.style.brandOne, LOCAL.style.brandFive, LOCAL.fabric.mesh, LOCAL.banner.brandOne],
    tags: [
      { label: dual("可定制", "Customizable"), tone: "" },
      { label: dual("动态预览", "Motion preview"), tone: "green" },
    ],
    desc: dual("透气训练 T 恤，适合团队项目、品牌胶囊系列和快速打样。", "A breathable training tee for team programs, brand capsules and fast sampling."),
    colors: ["#101820", "#f8f8f4", "#d9272e", "#1f8f63"],
    fabric: dual("再生 interlock 网眼面料", "Recycled interlock mesh"),
    use: dual("训练、团体活动、自有品牌", "Training, team events and private label"),
  },
  {
    id: "training-jacket",
    name: dual("轻量训练夹克", "Lightweight Training Jacket"),
    category: dual("外套层", "Outer layer"),
    price: dual("参考价 ¥629", "$88.00"),
    code: "RMX-JK2604",
    image: LOCAL.style.brandTwo,
    gallery: [LOCAL.style.brandTwo, LOCAL.style.brandSix, LOCAL.fabric.compress, LOCAL.banner.brandTwo],
    tags: [{ label: dual("当季新品", "New Season"), tone: "" }],
    desc: dual("轻量热身外套，可调整拼片、辅料和 Logo 位置。", "A lightweight warm-up layer with configurable panels, trims and logo placement."),
    colors: ["#050505", "#e7e1d5", "#315f72", "#d9272e"],
    fabric: dual("弹力梭织外壳", "Stretch woven shell"),
    use: dual("热身、出行、团队装备", "Warm-up, travel and teamwear"),
  },
  {
    id: "knit-hoodie",
    name: dual("日常针织连帽衫", "Everyday Knit Hoodie"),
    category: dual("柔软针织", "Soft knit"),
    price: dual("参考价 ¥459", "$64.00"),
    code: "RMX-HD2518",
    image: LOCAL.style.brandThree,
    gallery: [LOCAL.style.brandThree, LOCAL.style.brandSeven, LOCAL.fabric.lightness, LOCAL.banner.brandThree],
    tags: [{ label: dual("热销款", "Best Seller"), tone: "" }],
    desc: dual("柔软针织连帽衫，适合零售上新、校园项目和团队礼赠。", "A soft knit hoodie for retail drops, campus programs and team gifting."),
    colors: ["#272727", "#c9c2b7", "#6f7d6d", "#f2f2ef"],
    fabric: dual("柔软棉混纺针织", "Soft-touch cotton blend"),
    use: dual("日常休闲、恢复、礼赠", "Everyday, recovery and gifting"),
  },
  {
    id: "court-polo",
    name: dual("训练 Polo 衫", "Court Training Polo"),
    category: dual("团队经典款", "Team classic"),
    price: dual("参考价 ¥349", "$48.00"),
    code: "RMX-PL2509",
    image: LOCAL.style.brandFour,
    gallery: [LOCAL.style.brandFour, LOCAL.style.brandEight, LOCAL.fabric.italia, LOCAL.banner.brandFour],
    tags: [{ label: dual("快速打样", "Quick Sample"), tone: "" }],
    desc: dual("干净利落的 Polo 衫，支持面料、颜色、图案和胸前标识定制。", "A crisp polo with configurable fabric, color, artwork and chest branding options."),
    colors: ["#ffffff", "#111315", "#1e4f8a", "#d9272e"],
    fabric: dual("高性能珠地面料", "Performance pique"),
    use: dual("团队出行、门店制服、活动装备", "Team travel, retail uniform and event kit"),
  },
];

const clientProducts = [
  {
    id: "brand-tee",
    name: dual("训练 T 恤", "Training Tee"),
    category: dual("2026 春季训练系列", "Spring Training 2026"),
    price: dual("按项目报价", "Quote based"),
    code: "BP-RMX-2601",
    image: LOCAL.style.nikeOne,
    gallery: [LOCAL.style.nikeOne, LOCAL.style.nikeFive, LOCAL.fabric.mesh, LOCAL.banner.nikeOne],
    tags: [
      { label: dual("品牌专属", "Private"), tone: "red" },
      { label: dual("可打样", "Sample ready"), tone: "green" },
    ],
    desc: dual("已按品牌黑红配色和训练场景准备，可进入定制确认 Logo 与尺码组。", "Prepared around brand black/red training colorways, ready for logo and size-run confirmation."),
    colors: ["#101820", "#d9272e", "#f7f8f6", "#1f8f63"],
    fabric: dual("获批网眼 interlock 面料", "Approved mesh interlock"),
    moq: dual("300 件", "300 units"),
    lead: dual("样衣确认后 28-35 天", "28-35 days after sample approval"),
    status: dual("可定制", "Customization ready"),
  },
  {
    id: "brand-jacket",
    name: dual("热身夹克", "Warm-up Jacket"),
    category: dual("团队出行系列", "Team Travel Essentials"),
    price: dual("按项目报价", "Quote based"),
    code: "BP-RMX-2607",
    image: LOCAL.style.nikeTwo,
    gallery: [LOCAL.style.nikeTwo, LOCAL.style.nikeSix, LOCAL.fabric.compress, LOCAL.banner.nikeTwo],
    tags: [{ label: dual("品牌专属", "Private"), tone: "red" }],
    desc: dual("轻量外层夹克，适合赛前热身和团队出行，面料范围已确认。", "A lightweight outer layer for warm-up and travel, with approved material direction."),
    colors: ["#111315", "#d9272e", "#e7e1d5", "#315f72"],
    fabric: dual("弹力梭织外壳", "Stretch woven shell"),
    moq: dual("240 件", "240 units"),
    lead: dual("样衣确认后 35-45 天", "35-45 days after sample approval"),
    status: dual("待确认图案", "Graphic review"),
  },
  {
    id: "brand-polo",
    name: dual("出行 Polo", "Travel Polo"),
    category: dual("团队出行系列", "Team Travel Essentials"),
    price: dual("按项目报价", "Quote based"),
    code: "BP-RMX-2514",
    image: LOCAL.style.nikeThree,
    gallery: [LOCAL.style.nikeThree, LOCAL.style.nikeFour, LOCAL.fabric.italia, LOCAL.banner.nikeThree],
    tags: [
      { label: dual("品牌专属", "Private"), tone: "red" },
      { label: dual("快速打样", "Quick Sample"), tone: "" },
    ],
    desc: dual("适合团队出行和商务活动的专属 Polo，胸前标识、配色和尺码拆分可继续确认。", "A private polo for travel and team events, with chest branding, colorway and size split ready for review."),
    colors: ["#ffffff", "#101820", "#d9272e", "#6f7d6d"],
    fabric: dual("高性能珠地面料", "Performance pique"),
    moq: dual("360 件", "360 units"),
    lead: dual("样衣确认后 30-40 天", "30-40 days after sample approval"),
    status: dual("面料已获批", "Fabric approved"),
  },
  {
    id: "brand-hoodie",
    name: dual("针织连帽衫", "Knit Hoodie"),
    category: dual("恢复与休闲系列", "Recovery & Lounge"),
    price: dual("按项目报价", "Quote based"),
    code: "BP-RMX-2522",
    image: LOCAL.style.nikeFour,
    gallery: [LOCAL.style.nikeFour, LOCAL.style.nikeFive, LOCAL.fabric.knit, LOCAL.banner.nikeOne],
    tags: [{ label: dual("品牌专属", "Private"), tone: "red" }],
    desc: dual("柔软针织连帽衫，适合恢复、出行和礼赠场景，当前推荐低饱和配色。", "A soft knit hoodie for recovery, travel and gifting, currently recommended in muted colorways."),
    colors: ["#272727", "#d9272e", "#c9c2b7", "#f8f8f4"],
    fabric: dual("柔软棉混纺针织", "Soft-touch cotton blend"),
    moq: dual("300 件", "300 units"),
    lead: dual("样衣确认后 35-45 天", "35-45 days after sample approval"),
    status: dual("推荐款", "Recommended"),
  },
];

const videos = [
  {
    title: dual("训练系列短片", "Training Series Film"),
    text: dual("T 恤、夹克和针织单品的运动状态。", "Training tops, jackets and knits in motion."),
    image: LOCAL.poster.motionOne,
    src: LOCAL.video.motionOne,
  },
  {
    title: dual("秀场造型", "Runway Styling"),
    text: dual("更完整的廓形、配色和搭配参考。", "A fuller read on silhouette, color and styling."),
    image: LOCAL.poster.aiWomen,
    src: LOCAL.video.aiWomen,
  },
  {
    title: dual("细节近景", "Detail Close-up"),
    text: dual("纹理、辅料和 Logo 区域的近景。", "Texture, trims and logo placement up close."),
    image: LOCAL.poster.studio,
    src: LOCAL.video.studio,
  },
];

const clientVideos = [
  {
    title: dual("训练 T 恤", "Training Tee"),
    text: dual("黑红主场配色的训练动作。", "Black/red home colorway in training motion."),
    image: LOCAL.poster.motionTwo,
    src: LOCAL.video.motionTwo,
  },
  {
    title: dual("热身夹克", "Warm-up Jacket"),
    text: dual("外套开合、袖片和胸前标识。", "Jacket opening, sleeve panels and chest branding."),
    image: LOCAL.poster.motionThree,
    src: LOCAL.video.motionThree,
  },
  {
    title: dual("出行系列", "Travel Capsule"),
    text: dual("Polo、夹克和针织款的组合效果。", "Polo, jacket and knit pieces styled together."),
    image: LOCAL.poster.motionFour,
    src: LOCAL.video.motionFour,
  },
];

const materials = [
  {
    id: "breath-mesh",
    name: dual("Breath Mesh", "Breath Mesh"),
    text: dual("开放针织结构，适合训练上衣和高运动量团队服。", "Open-knit structure for training tops and high-movement teamwear."),
    image: LOCAL.fabric.mesh,
    gallery: [LOCAL.fabric.mesh, LOCAL.fabric.interlock, LOCAL.fabric.white],
    code: "RMX-M001",
    tag: dual("训练上衣", "Training tops"),
    chips: [dual("透气", "Breathable"), dual("轻量", "Lightweight"), dual("训练", "Training")],
    composition: dual("92% Polyester / 8% Spandex", "92% Polyester / 8% Spandex"),
    weight: dual("145 gsm", "145 gsm"),
    width: dual("155 cm", "155 cm"),
    stretch: dual("四面弹", "4-way stretch"),
    usage: dual("训练 T 恤、比赛热身、跑步背心", "Training tees, warm-up tops, running vests"),
    colors: [
      { name: dual("Classic Green", "Classic Green"), value: "#1f8f63" },
      { name: dual("Core Black", "Core Black"), value: "#101820" },
      { name: dual("Fresh White", "Fresh White"), value: "#f7f7f2" },
    ],
  },
  {
    id: "italia-light",
    name: dual("Italia Light", "Italia Light"),
    text: dual("手感顺滑、回弹稳定，适合自有品牌胶囊系列。", "Smooth handfeel with durable recovery for private label capsules."),
    image: LOCAL.fabric.italia,
    gallery: [LOCAL.fabric.italia, LOCAL.fabric.lightness, LOCAL.fabric.whiteAlt],
    code: "RMX-M014",
    tag: dual("胶囊系列", "Capsules"),
    chips: [dual("再生", "Recycled"), dual("回弹", "Recovery"), dual("顺滑", "Smooth")],
    composition: dual("88% Recycled Polyester / 12% Spandex", "88% Recycled Polyester / 12% Spandex"),
    weight: dual("165 gsm", "165 gsm"),
    width: dual("150 cm", "150 cm"),
    stretch: dual("稳定回弹", "Stable recovery"),
    usage: dual("Polo、训练上衣、轻量套装", "Polo shirts, training tops, lightweight sets"),
    colors: [
      { name: dual("Fresh White", "Fresh White"), value: "#f7f7f2" },
      { name: dual("Travel Sand", "Travel Sand"), value: "#c9c2b7" },
      { name: dual("Deep Navy", "Deep Navy"), value: "#17233c" },
    ],
  },
  {
    id: "compress",
    name: dual("Compress", "Compress"),
    text: dual("适合热身夹克和轻外套的轻量外层面料。", "Lightweight outer layer material for warm-up jackets and shells."),
    image: LOCAL.fabric.compress,
    gallery: [LOCAL.fabric.compress, LOCAL.fabric.hawaii, LOCAL.fabric.interlock],
    code: "RMX-M021",
    tag: dual("外套层", "Outer layer"),
    chips: [dual("弹力", "Stretch"), dual("外套", "Outerwear"), dual("耐穿", "Durable")],
    composition: dual("90% Nylon / 10% Spandex", "90% Nylon / 10% Spandex"),
    weight: dual("118 gsm", "118 gsm"),
    width: dual("148 cm", "148 cm"),
    stretch: dual("微弹", "Light stretch"),
    usage: dual("热身夹克、轻外套、防风层", "Warm-up jackets, light shells, wind layers"),
    colors: [
      { name: dual("Core Black", "Core Black"), value: "#101820" },
      { name: dual("Team Red", "Team Red"), value: "#d9272e" },
      { name: dual("Deep Navy", "Deep Navy"), value: "#17233c" },
    ],
  },
  {
    id: "lightness",
    name: dual("Lightness", "Lightness"),
    text: dual("适合恢复、休闲和礼赠场景的舒适面料。", "Comfort fabric for recovery, lounge and gifting programs."),
    image: LOCAL.fabric.lightness,
    gallery: [LOCAL.fabric.lightness, LOCAL.fabric.knit, LOCAL.fabric.white],
    code: "RMX-M032",
    tag: dual("休闲针织", "Soft knit"),
    chips: [dual("柔软", "Soft Touch"), dual("休闲", "Lounge"), dual("礼赠", "Gifting")],
    composition: dual("80% Cotton / 20% Polyester", "80% Cotton / 20% Polyester"),
    weight: dual("220 gsm", "220 gsm"),
    width: dual("170 cm", "170 cm"),
    stretch: dual("自然弹", "Natural stretch"),
    usage: dual("恢复系列、日常卫衣、品牌礼赠", "Recovery lines, everyday sweatshirts, branded gifts"),
    colors: [
      { name: dual("Fresh White", "Fresh White"), value: "#f7f7f2" },
      { name: dual("Travel Sand", "Travel Sand"), value: "#c9c2b7" },
      { name: dual("Core Black", "Core Black"), value: "#101820" },
    ],
  },
];

const clientMaterials = [
  { ...materials[0], id: "approved-breath-mesh", code: "NIKE-M001", tag: dual("已获批", "Approved") },
  { ...materials[1], id: "white-performance", name: dual("White Performance", "White Performance"), image: LOCAL.fabric.white, gallery: [LOCAL.fabric.white, LOCAL.fabric.whiteAlt, LOCAL.fabric.italia], code: "NIKE-M014", tag: dual("已获批", "Approved"), colors: [{ name: dual("Fresh White", "Fresh White"), value: "#f7f7f2" }, { name: dual("Travel Sand", "Travel Sand"), value: "#c9c2b7" }, { name: dual("Light Grey", "Light Grey"), value: "#d8d7d1" }] },
  { ...materials[2], id: "hawaii-print", name: dual("Hawaii Print", "Hawaii Print"), image: LOCAL.fabric.hawaii, gallery: [LOCAL.fabric.hawaii, LOCAL.fabric.compress, LOCAL.fabric.mesh], code: "NIKE-P008", tag: dual("推荐印花", "Print option"), colors: [{ name: dual("Palm Green", "Palm Green"), value: "#236d56" }, { name: dual("Night Blue", "Night Blue"), value: "#17304f" }, { name: dual("Team Red", "Team Red"), value: "#d9272e" }] },
  { ...materials[3], id: "soft-knit", name: dual("Soft Knit", "Soft Knit"), image: LOCAL.fabric.knit, gallery: [LOCAL.fabric.knit, LOCAL.fabric.lightness, LOCAL.fabric.interlock], code: "NIKE-M032", tag: dual("推荐用于恢复系列", "Recovery program"), colors: [{ name: dual("Core Black", "Core Black"), value: "#101820" }, { name: dual("Fresh White", "Fresh White"), value: "#f7f7f2" }, { name: dual("Travel Sand", "Travel Sand"), value: "#c9c2b7" }] },
];

let state = {
  mediaIndex: 0,
  customStep: "color",
  customTab: "fabric",
  selectedZone: "body",
  fabricPages: { body: 0, sleeves: 0, side: 0, collar: 0 },
  colorPages: { body: 0, sleeves: 0, side: 0, collar: 0 },
  patternPages: {},
  activeArtwork: -1,
  publicSlide: 0,
  clientSlide: 0,
  publicVideo: 0,
  clientVideo: 0,
  toastTimer: null,
  bannerTimer: null,
  detailFrom: "",
};

const zoneLabels = {
  body: dual("衣身区域", "Body zone"),
  sleeves: dual("袖片区域", "Sleeve zone"),
  side: dual("侧片区域", "Side panel zone"),
  collar: dual("领口区域", "Collar zone"),
};

const zoneKeys = Object.keys(zoneLabels);
const RESOURCES_PER_PAGE = 9;
const COLORS_PER_PAGE = 6;

const fabricPalette = [
  { name: dual("Classic Green", "Classic Green"), value: "#1f8f63" },
  { name: dual("Core Black", "Core Black"), value: "#101820" },
  { name: dual("Fresh White", "Fresh White"), value: "#f7f7f2" },
  { name: dual("Team Red", "Team Red"), value: "#d9272e" },
  { name: dual("Travel Sand", "Travel Sand"), value: "#c9c2b7" },
  { name: dual("Deep Navy", "Deep Navy"), value: "#17233c" },
];

const fabricZoneOptions = {
  body: [
    { name: dual("Breath Mesh", "Breath Mesh"), image: LOCAL.fabric.mesh, colors: [fabricPalette[0], fabricPalette[1], fabricPalette[2]] },
    { name: dual("Italia Light", "Italia Light"), image: LOCAL.fabric.italia, colors: [fabricPalette[2], fabricPalette[4], fabricPalette[5]] },
    { name: dual("Interlock Pro", "Interlock Pro"), image: LOCAL.fabric.interlock, colors: [fabricPalette[1], fabricPalette[2], fabricPalette[5]] },
    { name: dual("Lightness Air", "Lightness Air"), image: LOCAL.fabric.lightness, colors: [fabricPalette[2], fabricPalette[4], fabricPalette[0]] },
    { name: dual("Soft Knit", "Soft Knit"), image: LOCAL.fabric.knit, colors: [fabricPalette[1], fabricPalette[2], fabricPalette[3]] },
    { name: dual("White Performance", "White Performance"), image: LOCAL.fabric.white, colors: [fabricPalette[2], fabricPalette[4], fabricPalette[5]] },
    { name: dual("Compress Lite", "Compress Lite"), image: LOCAL.fabric.compress, colors: [fabricPalette[1], fabricPalette[3], fabricPalette[5]] },
    { name: dual("Print Mesh", "Print Mesh"), image: LOCAL.fabric.hawaii, colors: [fabricPalette[0], fabricPalette[1], fabricPalette[3]] },
    { name: dual("Recovery Knit", "Recovery Knit"), image: LOCAL.fabric.knit, colors: [fabricPalette[1], fabricPalette[2], fabricPalette[4]] },
    { name: dual("Cooling Interlock", "Cooling Interlock"), image: LOCAL.fabric.interlock, colors: [fabricPalette[0], fabricPalette[2], fabricPalette[5]] },
  ],
  sleeves: [
    { name: dual("Compress", "Compress"), image: LOCAL.fabric.compress, colors: [fabricPalette[1], fabricPalette[3], fabricPalette[5]] },
    { name: dual("White Performance", "White Performance"), image: LOCAL.fabric.white, colors: [fabricPalette[2], fabricPalette[4], fabricPalette[0]] },
    { name: dual("Breath Mesh", "Breath Mesh"), image: LOCAL.fabric.mesh, colors: [fabricPalette[0], fabricPalette[1], fabricPalette[2]] },
    { name: dual("Stretch Interlock", "Stretch Interlock"), image: LOCAL.fabric.interlock, colors: [fabricPalette[1], fabricPalette[3], fabricPalette[4]] },
    { name: dual("Light Shell", "Light Shell"), image: LOCAL.fabric.lightness, colors: [fabricPalette[2], fabricPalette[5], fabricPalette[0]] },
    { name: dual("Italia Light", "Italia Light"), image: LOCAL.fabric.italia, colors: [fabricPalette[2], fabricPalette[4], fabricPalette[5]] },
    { name: dual("Soft Knit", "Soft Knit"), image: LOCAL.fabric.knit, colors: [fabricPalette[1], fabricPalette[2], fabricPalette[3]] },
    { name: dual("Print Mesh", "Print Mesh"), image: LOCAL.fabric.hawaii, colors: [fabricPalette[0], fabricPalette[1], fabricPalette[3]] },
    { name: dual("Lightness Air", "Lightness Air"), image: LOCAL.fabric.lightness, colors: [fabricPalette[2], fabricPalette[4], fabricPalette[0]] },
    { name: dual("Interlock Pro", "Interlock Pro"), image: LOCAL.fabric.interlock, colors: [fabricPalette[1], fabricPalette[2], fabricPalette[5]] },
  ],
  side: [
    { name: dual("Hawaii Print", "Hawaii Print"), image: LOCAL.fabric.hawaii, colors: [fabricPalette[0], fabricPalette[1], fabricPalette[3]] },
    { name: dual("Lightness", "Lightness"), image: LOCAL.fabric.lightness, colors: [fabricPalette[2], fabricPalette[4], fabricPalette[5]] },
    { name: dual("Compress", "Compress"), image: LOCAL.fabric.compress, colors: [fabricPalette[1], fabricPalette[3], fabricPalette[5]] },
    { name: dual("Breath Mesh", "Breath Mesh"), image: LOCAL.fabric.mesh, colors: [fabricPalette[0], fabricPalette[2], fabricPalette[5]] },
    { name: dual("Italia Light", "Italia Light"), image: LOCAL.fabric.italia, colors: [fabricPalette[2], fabricPalette[4], fabricPalette[3]] },
    { name: dual("Soft Knit", "Soft Knit"), image: LOCAL.fabric.knit, colors: [fabricPalette[1], fabricPalette[2], fabricPalette[3]] },
    { name: dual("White Performance", "White Performance"), image: LOCAL.fabric.white, colors: [fabricPalette[2], fabricPalette[4], fabricPalette[0]] },
    { name: dual("Interlock Pro", "Interlock Pro"), image: LOCAL.fabric.interlock, colors: [fabricPalette[1], fabricPalette[2], fabricPalette[5]] },
    { name: dual("Print Mesh", "Print Mesh"), image: LOCAL.fabric.hawaii, colors: [fabricPalette[0], fabricPalette[1], fabricPalette[3]] },
    { name: dual("Recovery Knit", "Recovery Knit"), image: LOCAL.fabric.knit, colors: [fabricPalette[1], fabricPalette[2], fabricPalette[4]] },
  ],
  collar: [
    { name: dual("Soft Knit", "Soft Knit"), image: LOCAL.fabric.knit, colors: [fabricPalette[1], fabricPalette[2], fabricPalette[3]] },
    { name: dual("Interlock", "Interlock"), image: LOCAL.fabric.interlock, colors: [fabricPalette[0], fabricPalette[4], fabricPalette[5]] },
    { name: dual("Rib Knit", "Rib Knit"), image: LOCAL.fabric.knit, colors: [fabricPalette[1], fabricPalette[2], fabricPalette[4]] },
    { name: dual("White Performance", "White Performance"), image: LOCAL.fabric.white, colors: [fabricPalette[2], fabricPalette[4], fabricPalette[0]] },
    { name: dual("Soft Touch", "Soft Touch"), image: LOCAL.fabric.lightness, colors: [fabricPalette[2], fabricPalette[5], fabricPalette[3]] },
    { name: dual("Breath Mesh", "Breath Mesh"), image: LOCAL.fabric.mesh, colors: [fabricPalette[0], fabricPalette[1], fabricPalette[2]] },
    { name: dual("Italia Light", "Italia Light"), image: LOCAL.fabric.italia, colors: [fabricPalette[2], fabricPalette[4], fabricPalette[5]] },
    { name: dual("Compress Lite", "Compress Lite"), image: LOCAL.fabric.compress, colors: [fabricPalette[1], fabricPalette[3], fabricPalette[5]] },
    { name: dual("Cooling Interlock", "Cooling Interlock"), image: LOCAL.fabric.interlock, colors: [fabricPalette[0], fabricPalette[2], fabricPalette[5]] },
    { name: dual("Travel Knit", "Travel Knit"), image: LOCAL.fabric.knit, colors: [fabricPalette[2], fabricPalette[4], fabricPalette[5]] },
  ],
};

let fabricSelections = {
  body: { fabric: 0, color: 0 },
  sleeves: { fabric: 0, color: 1 },
  side: { fabric: 0, color: 0 },
  collar: { fabric: 0, color: 2 },
};

let artworkObjects = [];

function readStoredList(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null");
    return Array.isArray(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

function writeStoredList(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function isBrandAuthenticated() {
  return localStorage.getItem(LOGIN_KEY) === "1";
}

const app = document.querySelector("#app");
let lastRoutedHash = null;
if ("scrollRestoration" in history) history.scrollRestoration = "manual";

function scrollPageTop() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  if (document.scrollingElement) document.scrollingElement.scrollTop = 0;
}

function renderRoutePage(renderPage, shouldScrollTop) {
  renderPage();
  if (!shouldScrollTop) return;
  scrollPageTop();
  requestAnimationFrame(() => {
    scrollPageTop();
    requestAnimationFrame(scrollPageTop);
  });
  setTimeout(scrollPageTop, 80);
}

function route() {
  clearInterval(state.bannerTimer);
  state.bannerTimer = null;
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  const hash = window.location.hash || "#/";
  const [path, query] = hash.replace("#", "").split("?");
  const params = new URLSearchParams(query || "");
  const shouldScrollTop = hash !== lastRoutedHash;
  lastRoutedHash = hash;
  state.mediaIndex = 0;

  if (IS_BRAND_SPACE) {
    if (!isBrandAuthenticated() && path !== "/" && path !== "") return renderRoutePage(renderBrandEntry, shouldScrollTop);
    if (path === "/space" || path === "/client") return renderRoutePage(renderClientHome, shouldScrollTop);
    if (path === "/styles") return renderRoutePage(() => renderCollectionPage("styles", true), shouldScrollTop);
    if (path === "/materials") return renderRoutePage(() => renderCollectionPage("materials", true), shouldScrollTop);
    if (path === "/videos") return renderRoutePage(renderClientHome, shouldScrollTop);
    if (path === "/material") return renderRoutePage(() => renderMaterialDetail(params.get("id"), true, params.get("from")), shouldScrollTop);
    if (path === "/basket") return renderRoutePage(renderBasketPage, shouldScrollTop);
    if (path === "/orders") return renderRoutePage(renderOrdersPage, shouldScrollTop);
    if (path === "/product") return renderRoutePage(() => renderProduct(params.get("id") || clientProducts[0].id, true, params.get("from")), shouldScrollTop);
    if (path === "/customize") return renderRoutePage(() => renderCustomizer(params.get("id") || clientProducts[0].id, true), shouldScrollTop);
    return renderRoutePage(renderBrandEntry, shouldScrollTop);
  }

  if (path === "/styles") return renderRoutePage(() => renderCollectionPage("styles", false), shouldScrollTop);
  if (path === "/materials") return renderRoutePage(() => renderCollectionPage("materials", false), shouldScrollTop);
  if (path === "/videos") return renderRoutePage(renderHome, shouldScrollTop);
  if (path === "/material") return renderRoutePage(() => renderMaterialDetail(params.get("id"), false, params.get("from")), shouldScrollTop);
  if (path === "/product") return renderRoutePage(() => renderProduct(params.get("id") || publicProducts[0].id, false, params.get("from")), shouldScrollTop);
  if (path === "/customize") {
    window.location.href = `./brand-space.html?lang=${lang}`;
    return renderRoutePage(renderHome, shouldScrollTop);
  }
  if (path === "/login" || path === "/client") {
    window.open(`./brand-space.html?lang=${lang}`, "_blank", "noopener");
    return renderRoutePage(renderHome, shouldScrollTop);
  }
  return renderRoutePage(renderHome, shouldScrollTop);
}

function getProduct(id, isClient) {
  const list = isClient ? clientProducts : publicProducts;
  return list.find((item) => item.id === id) || list[0];
}

function getMaterial(id, isClient) {
  const list = isClient ? clientMaterials : materials;
  return list.find((item) => item.id === id) || list[0];
}

function sourceBackHref(from, fallbackType, isClient) {
  if (from === "styles") return "#/styles";
  if (from === "materials") return "#/materials";
  if (from === "space") return "#/space";
  if (from === "home") return "#/";
  if (fallbackType === "styles") return isClient ? "#/space" : "#/";
  if (fallbackType === "materials") return isClient ? "#/space" : "#/";
  return isClient ? "#/space" : "#/";
}

function langButton() {
  return `<button class="btn secondary lang-btn" onclick="toggleLang()">${l(C.langSwitch)}</button>`;
}

function layout(content, mode = "public") {
  const brand = mode === "client";
  const brandUrl = `./brand-space.html?lang=${lang}`;
  const basketUrl = brand ? "#/basket" : `./brand-space.html?lang=${lang}#/basket`;
  const actions = brand
    ? `${langButton()}<a class="btn secondary" href="#/orders">${l(C.orderCenter)}</a>`
    : `${langButton()}<a class="btn secondary brand-space-link" href="${brandUrl}" target="_blank" rel="noopener">${l(C.brandSpace)}</a>`;

  app.innerHTML = `
    <div class="site">
      <header class="topbar" id="topbar">
        <div class="shell topbar-inner">
          <a class="brand" href="${brand ? "#/space" : "#/"}">
            <span class="brand-mark">R</span>
            <span>${brand ? "BRAND SPACE" : "RAMATEX"}</span>
          </a>
          <div class="actions">${actions}</div>
        </div>
      </header>
      ${content}
      ${renderFooter()}
      ${renderFloatingTools(basketUrl)}
    </div>
    ${renderModal()}
    <div class="toast" id="toast"></div>
  `;
  initTextColorPickers();
}

function renderFloatingTools(basketUrl) {
  return `
    <div class="floating-tools" aria-label="${l(dual("快捷操作", "Quick actions"))}">
      <button onclick="window.scrollTo({top: 0, behavior: 'smooth'})"><span>⌃</span><small>${l(C.backTop)}</small></button>
      <a href="${basketUrl}"><span>▰</span><small>${l(C.selectionBasket)}</small></a>
      <button onclick="toast('${l(dual("客服已为您保留入口。", "Service channel opened."))}')"><span>◎</span><small>${l(C.service)}</small></button>
    </div>
  `;
}

function renderFooter() {
  return `
    <footer class="footer">
      <div class="shell footer-main">
        <div class="footer-brand">
          <div class="brand"><span class="brand-mark">R</span><span>RAMATEX</span></div>
          <p>${l(dual("面向品牌、团队和零售项目的可定制服装开发伙伴。", "Custom apparel development for brands, teams and retail programs."))}</p>
        </div>
        <div class="footer-columns">
          <div class="footer-col">
            <strong>${l(dual("产品", "Products"))}</strong>
            <span>${l(dual("定制服装", "Custom Apparel"))}</span>
            <span>${l(dual("面辅料", "Materials & Trims"))}</span>
            <span>${l(dual("AI 上身预览", "AI Style Preview"))}</span>
          </div>
          <div class="footer-col">
            <strong>${l(dual("公司", "Company"))}</strong>
            <span>${l(dual("关于 Ramatex", "About Ramatex"))}</span>
            <span>${l(dual("开发能力", "Capabilities"))}</span>
            <span>${l(dual("可持续材料", "Sustainability"))}</span>
          </div>
          <div class="footer-col">
            <strong>${l(dual("联系", "Contact"))}</strong>
            <span>hello@ramatex.com</span>
            <span>+86 400 000 0000</span>
            <span>${l(dual("中国 · 上海", "Shanghai, China"))}</span>
          </div>
        </div>
      </div>
      <div class="shell footer-bottom">
        <span>© 2026 Ramatex</span>
      </div>
    </footer>
  `;
}

function renderHome() {
  const slide = publicSlides[state.publicSlide];
  layout(`
    <main class="home-main">
      ${renderBanner(slide, publicSlides, state.publicSlide, "public")}

      <section class="section white" id="styles">
        <div class="shell">
          <div class="section-head">
            <div>
              <h2>${l(dual("款式", "Styles"))}</h2>
            </div>
            ${sectionMore("#/styles")}
          </div>
          <div class="product-grid">${publicProducts.map((item) => renderProductCard(item, false, "home")).join("")}</div>
        </div>
      </section>

      <section class="section tone" id="videos">
        <div class="shell">
          <div class="section-head">
            <div>
              <h2>${l(dual("视频", "Videos"))}</h2>
            </div>
          </div>
          ${renderVideoShowcase(videos, state.publicVideo, "public")}
        </div>
      </section>

      <section class="section warm" id="materials">
        <div class="shell">
          <div class="section-head">
            <div>
              <h2>${l(dual("面料", "Materials"))}</h2>
            </div>
            ${sectionMore("#/materials")}
          </div>
          <div class="material-grid">${materials.map((item) => renderMaterial(item, "home")).join("")}</div>
        </div>
      </section>
    </main>
  `);
  startBannerAuto("public");
}

function renderClientHome() {
  const slide = clientSlides[state.clientSlide];
  layout(`
    <main class="home-main">
      ${renderBanner(slide, clientSlides, state.clientSlide, "client")}

      <section class="section white" id="private-styles">
        <div class="shell">
          <div class="section-head">
            <div>
              <h2>${l(dual("款式", "Styles"))}</h2>
            </div>
            ${sectionMore("#/styles")}
          </div>
          <div class="product-grid">${clientProducts.map((item) => renderProductCard(item, true, "space")).join("")}</div>
        </div>
      </section>

      <section class="section tone" id="private-videos">
        <div class="shell">
          <div class="section-head">
            <div>
              <h2>${l(dual("视频", "Videos"))}</h2>
            </div>
          </div>
          ${renderVideoShowcase(clientVideos, state.clientVideo, "client")}
        </div>
      </section>

      <section class="section warm" id="private-materials">
        <div class="shell">
          <div class="section-head">
            <div>
              <h2>${l(dual("面料", "Materials"))}</h2>
            </div>
            ${sectionMore("#/materials")}
          </div>
          <div class="material-grid">${clientMaterials.map((item) => renderMaterial(item, "space")).join("")}</div>
        </div>
      </section>
    </main>
  `, "client");
  startBannerAuto("client");
}

function sectionMore(href) {
  return `<a class="section-more" href="${href}">${l(C.viewAll)}<span aria-hidden="true">›</span></a>`;
}

function renderCollectionPage(type, isClient) {
  const config = {
    styles: {
      title: dual("款式", "Styles"),
      items: isClient ? clientProducts : publicProducts,
      body: (items) => `<div class="product-grid collection-grid">${items.map((item) => renderProductCard(item, isClient, "styles")).join("")}</div>`,
    },
    materials: {
      title: dual("面料", "Materials"),
      items: isClient ? clientMaterials : materials,
      body: (items) => `<div class="material-grid collection-grid material-collection-grid">${items.map((item) => renderMaterial(item, "materials")).join("")}</div>`,
    },
  }[type] || {};
  const title = config.title || dual("款式", "Styles");
  const backHref = isClient ? "#/space" : "#/";

  layout(`
    <main class="home-main collection-page">
      <section class="section white">
        <div class="shell">
          <div class="collection-top">
            <a class="section-more back-more" href="${backHref}"><span aria-hidden="true">‹</span>${l(C.back)}</a>
            <h1>${l(title)}</h1>
          </div>
          ${config.body(config.items)}
        </div>
      </section>
    </main>
  `, isClient ? "client" : "public");
}

function defaultOrders() {
  return [
    {
      id: "RMX-260630-01",
      name: l(clientProducts[0].name),
      quantity: "300",
      status: l(dual("待确认", "Pending")),
      date: "2026-06-30",
      summary: l(dual("训练 T 恤定制方案", "Training tee customization")),
    },
    {
      id: "RMX-260628-02",
      name: l(clientProducts[1].name),
      quantity: "240",
      status: l(dual("已下单", "Submitted")),
      date: "2026-06-28",
      summary: l(dual("热身夹克定制方案", "Warm-up jacket customization")),
    },
  ];
}

function renderBasketPage() {
  const basket = readStoredList(BASKET_KEY, []);
  layout(`
    <main class="workspace-page">
      <section class="shell workspace-shell">
        <div class="workspace-top">
          <a class="section-more back-more" href="#/space"><span aria-hidden="true">‹</span>${l(C.back)}</a>
          <div>
            <h1>${l(C.selectionBasket)}</h1>
            <p>${l(dual("确认本次定制方案后统一提交订单。", "Review selected customization plans before submitting one order."))}</p>
          </div>
        </div>
        <div class="basket-layout">
          <div class="basket-list">
            ${basket.length ? basket.map((item) => `
              <article class="basket-item">
                <img src="${item.image}" alt="${item.name}" />
                <div>
                  <h3>${item.name}</h3>
                  <p>${item.summary}</p>
                  <span>${l(dual("数量", "Quantity"))}: ${item.quantity}</span>
                </div>
                <button onclick="removeBasketItem('${item.id}')">${l(dual("移除", "Remove"))}</button>
              </article>
            `).join("") : `
              <div class="empty-state">
                <h3>${l(dual("选品篮暂无方案", "No plans in basket"))}</h3>
                <p>${l(dual("从品牌空间款式进入定制器后，可将方案加入选品篮。", "Customize styles in Brand Space and add plans here."))}</p>
                <a class="btn" href="#/space">${l(dual("返回品牌空间", "Back to Brand Space"))}</a>
              </div>
            `}
          </div>
          <aside class="basket-summary">
            <span>${l(dual("本次提交", "Current Submission"))}</span>
            <strong>${basket.length}</strong>
            <p>${l(dual("个定制方案", "customization plans"))}</p>
            <button class="btn" ${basket.length ? "" : "disabled"} onclick="submitBasketOrder()">${l(C.checkout)}</button>
          </aside>
        </div>
      </section>
    </main>
  `, "client");
}

function renderOrdersPage() {
  const orders = readStoredList(ORDERS_KEY, defaultOrders());
  layout(`
    <main class="workspace-page">
      <section class="shell workspace-shell">
        <div class="workspace-top">
          <a class="section-more back-more" href="#/space"><span aria-hidden="true">‹</span>${l(C.back)}</a>
          <div>
            <h1>${l(C.orderCenter)}</h1>
            <p>${l(dual("查看已提交的选品订单和当前状态。", "Review submitted selection orders and status."))}</p>
          </div>
        </div>
        <div class="order-table">
          <div class="order-row order-head">
            <span>${l(dual("订单号", "Order"))}</span>
            <span>${l(dual("款式", "Style"))}</span>
            <span>${l(dual("数量", "Qty"))}</span>
            <span>${l(dual("状态", "Status"))}</span>
            <span>${l(dual("日期", "Date"))}</span>
          </div>
          ${orders.map((item) => `
            <article class="order-row">
              <strong>${item.id}</strong>
              <span>${item.name}<small>${item.summary}</small></span>
              <span>${item.quantity}</span>
              <mark>${item.status}</mark>
              <span>${item.date}</span>
            </article>
          `).join("")}
        </div>
      </section>
    </main>
  `, "client");
}

function renderBanner(slide, slides, index, mode) {
  const client = mode === "client";
  return `
    <section class="banner ${client ? "client-banner" : ""}" style="--banner-image:url('${slide.image}')" onclick="scrollSection('${slide.section}', ${client})" aria-label="${l(slide.title)}">
      <div class="banner-image" aria-hidden="true"></div>
      <div class="shell banner-inner">
        <div class="banner-controls" onclick="event.stopPropagation()">
          ${slides.map((item, itemIndex) => `
            <button class="${itemIndex === index ? "active" : ""}" onclick="setSlide('${mode}', ${itemIndex})" aria-label="${l(item.eyebrow)}"></button>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderProductCard(product, isClient = false, from = "") {
  const href = `#/product?id=${product.id}${from ? `&from=${from}` : ""}`;
  return `
    <a href="${href}" class="product-card">
      <span class="product-image">
        <img src="${product.image}" alt="${l(product.name)}" />
        <span class="card-hover-name">${l(product.name)}</span>
      </span>
      <div class="product-body">
        <h3>${l(product.name)}</h3>
      </div>
    </a>
  `;
}

function renderVideoShowcase(items, activeIndex, mode) {
  const active = items[activeIndex] || items[0];
  return `
    <div class="video-showcase" data-video-mode="${mode}">
      <div class="inline-player">
        <video class="main-video" src="${active.src}" poster="${active.image}" controls autoplay muted loop playsinline preload="metadata" aria-label="${l(active.title)}"></video>
        <span class="video-current-name">${l(active.title)}</span>
      </div>
      <div class="video-list">
        ${items.map((item, index) => `
          <button class="video-select ${index === activeIndex ? "active" : ""}" data-video-index="${index}" onclick="setVideo('${mode}', ${index})" aria-label="${l(item.title)}">
            <img src="${item.image}" alt="" />
            <span aria-hidden="true">▶</span>
          </button>
        `).join("")}
      </div>
    </div>
  `;
}

function renderVideoCard(video) {
  return `
    <article class="video-card">
      <button class="video-thumb" onclick="openVideo('${video.src}', '${video.image}', '${l(video.title)}')" aria-label="${l(video.title)}">
        <img src="${video.image}" alt="${l(video.title)}" />
        <span>${l(C.watch)}</span>
      </button>
    </article>
  `;
}

function renderMaterial(item, from = "") {
  return `
    <a class="material-card" href="#/material?id=${item.id}${from ? `&from=${from}` : ""}">
      <span class="material-image">
        <img src="${item.image}" alt="${l(item.name)}" />
        <span class="card-hover-name">${l(item.name)}</span>
      </span>
      <div>
        <h3>${l(item.name)}</h3>
      </div>
    </a>
  `;
}

function renderMaterialDetail(id, isClient, from = "") {
  const material = getMaterial(id, isClient);
  const backHref = sourceBackHref(from, "materials", isClient);
  const gallery = material.gallery && material.gallery.length ? material.gallery : [material.image];
  const current = gallery[state.mediaIndex] || gallery[0];
  const attrs = [
    [dual("面料编号", "Material Code"), material.code],
    [dual("成分", "Composition"), material.composition],
    [dual("克重", "Weight"), material.weight],
    [dual("幅宽", "Width"), material.width],
    [dual("弹力", "Stretch"), material.stretch],
    [dual("适用", "Use"), material.usage],
  ];

  layout(`
    <main class="detail material-detail-page">
      <div class="shell">
        <a class="pdp-page-back" href="${backHref}">${l(C.back)}</a>
        <section class="material-detail-layout material-pdp-layout">
          <aside class="pdp-side material-pdp-side">
            <button class="pdp-arrow" onclick="selectMaterialMedia(${Math.max(0, state.mediaIndex - 1)}, '${material.id}', ${isClient}, '${from || ""}')">⌃</button>
            <div class="pdp-thumbs">
              ${gallery.slice(0, 4).map((src, index) => `
                <button class="pdp-thumb ${index === state.mediaIndex ? "active" : ""}" onclick="selectMaterialMedia(${index}, '${material.id}', ${isClient}, '${from || ""}')">
                  <img src="${src}" alt="${l(material.name)} ${index + 1}" />
                </button>
              `).join("")}
            </div>
            <button class="pdp-arrow" onclick="selectMaterialMedia(${Math.min(gallery.length - 1, state.mediaIndex + 1)}, '${material.id}', ${isClient}, '${from || ""}')">⌄</button>
          </aside>
          <section class="material-detail-gallery">
            <figure class="material-main-media">
              <img src="${current}" alt="${l(material.name)}" />
            </figure>
          </section>
          <aside class="material-info">
            <span class="meta">${l(material.tag)}</span>
            <h1>${l(material.name)}</h1>
            <p>${l(material.text)}</p>
            <dl class="material-attrs">
              ${attrs.map(([label, value]) => `
                <div>
                  <dt>${l(label)}</dt>
                  <dd>${l(value)}</dd>
                </div>
              `).join("")}
            </dl>
            <div class="material-colors">
              <strong>${l(dual("可选颜色", "Available Colors"))}</strong>
              <ul class="material-color-list">
                ${material.colors.map((color) => `
                  <li style="background:${color.value}" title="${l(color.name)}" aria-label="${l(color.name)}"></li>
                `).join("")}
              </ul>
            </div>
          </aside>
        </section>
        <section class="material-rich">
          <div class="product-rich-title">
            <span></span>
            <h2>${l(dual("面料细节", "Material Details"))}<small>MATERIAL DETAILS</small></h2>
          </div>
          <article>
            <img src="${gallery[1] || gallery[0]}" alt="${l(material.name)}" />
            <div>
              <h2>${l(dual("质感与应用", "Texture and Application"))}</h2>
              <p>${l(material.text)}</p>
              <p>${l(dual("适用于品牌训练、团队服和零售胶囊系列，颜色与批量交付可按项目确认。", "Suitable for brand training, teamwear and retail capsules, with colors and bulk delivery confirmed by project."))}</p>
            </div>
          </article>
        </section>
      </div>
    </main>
  `, isClient ? "client" : "public");
}

function renderProduct(id, isClient, from = "") {
  const product = getProduct(id, isClient);
  const current = product.gallery[state.mediaIndex] || product.image;
  const customizeUrl = isClient ? `#/customize?id=${product.id}` : `./brand-space.html?lang=${lang}`;
  const backHref = sourceBackHref(from || state.detailFrom, "styles", isClient);
  const sizes = ["XS", "S", "M", "L", "XL", "2XL"];
  state.detailFrom = from || state.detailFrom || "";
  layout(`
    <main class="detail">
      <div class="shell">
        <a class="pdp-page-back" href="${backHref}">${l(C.back)}</a>
        <div class="pdp-layout">
          <aside class="pdp-side">
            <button class="pdp-arrow" onclick="selectMedia(${Math.max(0, state.mediaIndex - 1)}, '${product.id}', ${isClient})">⌃</button>
            <div class="pdp-thumbs">
              ${product.gallery.map((src, index) => `
                <button class="pdp-thumb ${index === state.mediaIndex ? "active" : ""}" onclick="selectMedia(${index}, '${product.id}', ${isClient})">
                  <img src="${src}" alt="${l(product.name)} ${index + 1}" />
                </button>
              `).join("")}
            </div>
            <button class="pdp-arrow" onclick="selectMedia(${Math.min(product.gallery.length - 1, state.mediaIndex + 1)}, '${product.id}', ${isClient})">⌄</button>
          </aside>

          <section class="pdp-media">
            <div class="pdp-main-image">
              <img src="${current}" alt="${l(product.name)}" />
            </div>
          </section>

          <aside class="pdp-info">
            <span class="meta">${l(product.category)}</span>
            <h1>${l(product.name)}</h1>
            <div class="pdp-code">${l(dual("款号：", "Style: "))}${product.code}</div>
            <div class="pdp-quick-info">
              <div class="pdp-info-block">
                <span>${l(dual("参考价", "Reference Price"))}</span>
                <p>${l(product.price)}</p>
              </div>
              <div class="pdp-info-block">
                <span>${l(dual("可选尺码", "Available Sizes"))}</span>
                <div class="size-chip-row">${sizes.map((size) => `<b>${size}</b>`).join("")}</div>
              </div>
              <div class="pdp-info-block">
                <span>${l(dual("可定制内容", "Customizable"))}</span>
                <p>${l(dual("面料 / 颜色 / 图案 / 文字", "Fabrics / Colors / Artwork / Text"))}</p>
              </div>
            </div>
            <div class="panel-actions">
              <a class="btn" href="${customizeUrl}">${isClient ? l(C.startB2B) : l(C.startCustom)}</a>
            </div>
          </aside>
        </div>
        ${renderProductSpecs(product, isClient)}
      </div>
    </main>
  `, isClient ? "client" : "public");
}

function renderProductSpecs(product, isClient) {
  const delivery = isClient ? l(product.lead) : l(dual("样衣确认后 25-35 天", "25-35 days after sample approval"));
  const moq = isClient ? l(product.moq) : l(dual("100 件起", "From 100 units"));
  const sizeRows = [
    ["XS", "64", "92", "42", "19"],
    ["S", "66", "96", "44", "20"],
    ["M", "68", "100", "46", "21"],
    ["L", "70", "104", "48", "22"],
    ["XL", "72", "108", "50", "23"],
    ["2XL", "74", "112", "52", "24"],
  ];
  return `
    <section class="product-rich">
      <div class="product-rich-title">
        <span></span>
        <h2>${l(dual("商品细节", "Product Details"))}<small>PRODUCT DETAILS</small></h2>
      </div>
      <article class="rich-hero">
        <img src="${product.gallery[3] || product.image}" alt="${l(product.name)}" />
      </article>
      <article class="rich-split">
        <img src="${product.gallery[0]}" alt="${l(product.name)}" />
        <div>
          <h3>${l(dual("版型与穿着", "Fit and wear"))}</h3>
          <p>${l(product.desc)}</p>
          <dl>
            <div><dt>MOQ</dt><dd>${moq}</dd></div>
            <div><dt>${l(dual("交付", "Delivery"))}</dt><dd>${delivery}</dd></div>
          </dl>
        </div>
      </article>
      <article class="rich-size-chart">
        <div>
          <h3>${l(dual("尺码表", "Size Chart"))}</h3>
          <p>${l(dual("单位：cm。具体尺码可在打样阶段按项目确认。", "Unit: cm. Final measurements can be confirmed during sampling."))}</p>
        </div>
        <div class="size-table-wrap">
          <table class="size-chart-table">
            <thead>
              <tr>
                <th>${l(dual("尺码", "Size"))}</th>
                <th>${l(dual("衣长", "Length"))}</th>
                <th>${l(dual("胸围", "Chest"))}</th>
                <th>${l(dual("肩宽", "Shoulder"))}</th>
                <th>${l(dual("袖长", "Sleeve"))}</th>
              </tr>
            </thead>
            <tbody>
              ${sizeRows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}
            </tbody>
          </table>
        </div>
      </article>
      <article class="rich-split reverse">
        <img src="${product.gallery[2] || ASSETS.fabric}" alt="${l(product.fabric)}" />
        <div>
          <h3>${l(dual("定制与细节", "Customization details"))}</h3>
          <p>${l(dual("支持在定制器中将不同面料、颜色、图案和文字应用到指定服装区域。", "Fabrics, colors, artwork and text can be applied to designated garment zones in the customizer."))}</p>
          <p>${l(dual("样衣确认后进入批量生产，尺码组、包装和辅料按项目确认。", "After sample approval, production proceeds with size run, packaging and trims confirmed by project."))}</p>
        </div>
      </article>
    </section>
  `;
}

function renderLogin() {
  renderBrandEntry();
}

function renderBrandEntry() {
  app.innerHTML = `
    <div class="access-site">
      <div class="access-tools">${langButton()}</div>
      <main class="access-wrap">
        <section class="access-card">
          <div class="access-hero" aria-hidden="true">
            <img src="${LOCAL.banner.nikeOne}" alt="" />
            <div>
              <img src="${LOCAL.style.nikeOne}" alt="" />
              <img src="${LOCAL.fabric.mesh}" alt="" />
            </div>
          </div>
          <form class="access-form" onsubmit="enterBrandSpaceCredential(event)">
            <h1>${l(C.brandSpace)}</h1>
            <p>${l(dual("输入访问凭证查看专属款式、视频和面料。", "Enter an access code to view private styles, videos and materials."))}</p>
            <label>
              <span>${l(dual("访问凭证", "Access Code"))}</span>
              <input id="brandAccessCode" autocomplete="off" />
            </label>
            <button class="btn" type="submit">${l(C.enterProject)}</button>
          </form>
        </section>
      </main>
    </div>
    <div class="toast" id="toast"></div>
  `;
}

function stepsFor(isClient) {
  return isClient
    ? [
        ["colorways", dual("配色", "Colorways")],
        ["approved-fabrics", dual("项目面料", "Project fabrics")],
        ["logo", dual("Logo 位置", "Logo placement")],
        ["size-run", dual("尺码与数量", "Size and quantity")],
        ["ai-try-on", dual("AI 上身", "AI Try-on")],
      ]
    : [
        ["color", dual("颜色", "Color")],
        ["fabric", dual("面料", "Fabric")],
        ["pattern", dual("图案", "Pattern")],
        ["text", dual("文字", "Text")],
        ["ai-try-on", dual("AI 上身", "AI Try-on")],
      ];
}

function renderCustomizer(id, isClient) {
  const product = getProduct(id, isClient);
  const patterns = patternResources(product, isClient);
  const zoneOptions = fabricZoneOptions[state.selectedZone] || fabricZoneOptions.body;
  const zoneSelection = fabricSelections[state.selectedZone] || { fabric: 0, color: 0 };
  const activeFabric = zoneOptions[zoneSelection.fabric] || zoneOptions[0];
  const activeColor = activeFabric.colors[zoneSelection.color] || activeFabric.colors[0];
  const activeArtwork = artworkObjects[state.activeArtwork];

  app.innerHTML = `
    <div class="customizer">
      <header class="custom-top">
        <div class="custom-title">
          <a class="tool-icon" href="#/product?id=${product.id}" aria-label="${l(C.back)}">←</a>
          <strong>${l(product.name)}</strong>
          <span>${product.code}</span>
        </div>
        <div class="actions" style="display:flex">
          ${langButton()}
        </div>
      </header>
      <main class="custom-workspace">
        <section class="custom-canvas">
          <div class="viewer-stage">
            <img src="${product.image}" alt="${l(product.name)}" />
            <div class="canvas-edit-badge">
              <span>${l(state.customTab === "fabric" ? dual("当前编辑", "Editing") : dual("当前图案", "Artwork"))}</span>
              <strong>${state.customTab === "fabric" ? `${l(zoneLabels[state.selectedZone])} · ${l(activeFabric.name)} / ${l(activeColor.name)}` : activeArtwork ? l(activeArtwork.name) : l(dual("未添加图案", "No artwork added"))}</strong>
            </div>
          </div>
        </section>
        <aside class="custom-config-panel">
          <div class="custom-config-main">
            <div class="custom-config-scroll">
              ${state.customTab === "fabric" ? renderFabricResources(product, isClient) : renderPatternResources(patterns, product, isClient)}
            </div>
            <div class="custom-config-footer">
              <button class="btn selection-submit" onclick="addCurrentToBasket('${product.id}', ${isClient})">${l(C.addToBasket)}</button>
            </div>
          </div>
          <nav class="custom-tab-rail" aria-label="${l(dual("定制模块", "Customization modules"))}">
            <button class="${state.customTab === "fabric" ? "active" : ""}" onclick="setCustomTab('fabric', '${product.id}', ${isClient})"><strong>${l(dual("面料", "Fabric"))}</strong></button>
            <button class="${state.customTab === "pattern" ? "active" : ""}" onclick="setCustomTab('pattern', '${product.id}', ${isClient})"><strong>${l(dual("图案", "Artwork"))}</strong></button>
          </nav>
        </aside>
      </main>
    </div>
    ${renderModal()}
    <div class="toast" id="toast"></div>
  `;
}

function patternResources(product, isClient) {
  return [
    { name: dual("图案 01", "Artwork 01"), source: dual("图案库", "Artwork Library"), image: product.gallery[1] || product.image },
    { name: dual("图案 02", "Artwork 02"), source: dual("图案库", "Artwork Library"), image: LOCAL.banner.brandTwo },
    { name: dual("图案 03", "Artwork 03"), source: dual("图案库", "Artwork Library"), image: isClient ? LOCAL.banner.nikeTwo : LOCAL.banner.brandThree },
    { name: dual("图案 04", "Artwork 04"), source: dual("图案库", "Artwork Library"), image: LOCAL.poster.studio },
    { name: dual("图案 05", "Artwork 05"), source: dual("图案库", "Artwork Library"), image: LOCAL.poster.motionOne },
    { name: dual("图案 06", "Artwork 06"), source: dual("图案库", "Artwork Library"), image: LOCAL.banner.nikeOne },
    { name: dual("图案 07", "Artwork 07"), source: dual("图案库", "Artwork Library"), image: LOCAL.banner.nikeThree },
    { name: dual("图案 08", "Artwork 08"), source: dual("图案库", "Artwork Library"), image: LOCAL.banner.brandOne },
    { name: dual("图案 09", "Artwork 09"), source: dual("图案库", "Artwork Library"), image: LOCAL.banner.brandThree },
    { name: dual("图案 10", "Artwork 10"), source: dual("图案库", "Artwork Library"), image: LOCAL.poster.studio },
    { name: dual("图案 11", "Artwork 11"), source: dual("图案库", "Artwork Library"), image: LOCAL.poster.motionOne },
    { name: dual("图案 12", "Artwork 12"), source: dual("图案库", "Artwork Library"), image: LOCAL.banner.nikeTwo },
  ];
}

function fabricCardMeta(item) {
  const name = l(item.name).toLowerCase();
  if (name.includes("mesh") || name.includes("网")) {
    return [dual("高透气", "Breathable"), dual("轻量 / 快干", "Light / Quick dry")];
  }
  if (name.includes("knit") || name.includes("针织")) {
    return [dual("柔软针织", "Soft knit"), dual("舒适 / 自然弹", "Comfort / Natural stretch")];
  }
  if (name.includes("compress") || name.includes("interlock")) {
    return [dual("稳定支撑", "Stable support"), dual("弹力 / 训练", "Stretch / Training")];
  }
  if (name.includes("print") || name.includes("hawaii")) {
    return [dual("印花面料", "Print fabric"), dual("轻量 / 图案友好", "Light / Print ready")];
  }
  return [dual("项目面料", "Program fabric"), dual("运动 / 日常", "Active / Daily")];
}

function renderFabricResources(product, isClient) {
  return `
    <div class="custom-panel-head">
      <h3>${l(dual("面料", "Fabric"))}</h3>
    </div>
    <div class="resource-group drawer-stack">
      ${zoneKeys.map((key) => {
        const options = fabricZoneOptions[key] || [];
        const selection = fabricSelections[key] || { fabric: 0, color: 0 };
        const activeFabric = options[selection.fabric] || options[0];
        const activeColor = activeFabric.colors[selection.color] || activeFabric.colors[0];
        const totalPages = Math.max(1, Math.ceil(options.length / RESOURCES_PER_PAGE));
        const page = getFabricPage(key, options);
        const pageStart = page * RESOURCES_PER_PAGE;
        const visibleOptions = options.slice(pageStart, pageStart + RESOURCES_PER_PAGE);
        const colorTotalPages = Math.max(1, Math.ceil(activeFabric.colors.length / COLORS_PER_PAGE));
        const colorPage = getColorPage(key, activeFabric);
        const colorStart = colorPage * COLORS_PER_PAGE;
        const visibleColors = activeFabric.colors.slice(colorStart, colorStart + COLORS_PER_PAGE);
        return `
          <details class="fabric-drawer" ${state.selectedZone === key ? "open" : ""}>
            <summary onclick="setCustomZone('${key}', '${product.id}', ${isClient})">
              <span>${l(zoneLabels[key])}</span>
              <strong>${l(activeFabric.name)} / ${l(activeColor.name)}</strong>
            </summary>
            <div class="drawer-body">
              <div class="fabric-section-head">
                <span>${l(dual("选择面料", "Fabric"))}</span>
                ${totalPages > 1 ? `<strong>${page + 1} / ${totalPages}</strong>` : ""}
              </div>
              <div class="resource-list compact-resource-list">
                ${visibleOptions.map((item, index) => {
                  const optionIndex = pageStart + index;
                  const meta = fabricCardMeta(item);
                  return `
                  <button class="resource-card fabric-card ${optionIndex === selection.fabric ? "active" : ""}" draggable="true" onclick="selectZoneFabric('${key}', ${optionIndex}, '${product.id}', ${isClient})">
                    <img src="${item.image}" alt="${l(item.name)}" />
                    <span>${l(item.name)}</span>
                    <em class="resource-hover-info">
                      <strong>${l(item.name)}</strong>
                      <small>${l(meta[0])}</small>
                      <small>${l(meta[1])}</small>
                    </em>
                  </button>
                `;
                }).join("")}
              </div>
              ${totalPages > 1 ? `
                <div class="fabric-pager">
                  <button ${page === 0 ? "disabled" : ""} onclick="setFabricPage('${key}', ${page - 1}, '${product.id}', ${isClient})">‹</button>
                  <span>${page + 1} / ${totalPages}</span>
                  <button ${page >= totalPages - 1 ? "disabled" : ""} onclick="setFabricPage('${key}', ${page + 1}, '${product.id}', ${isClient})">›</button>
                </div>
              ` : ""}
              <div class="fabric-section-head">
                <span>${l(dual("选择颜色", "Color"))}</span>
                <strong>${l(activeColor.name)}</strong>
              </div>
              <div class="fabric-color-swatches">
                ${visibleColors.map((color, index) => {
                  const colorIndex = colorStart + index;
                  return `
                  <button class="${colorIndex === selection.color ? "active" : ""}" title="${l(color.name)}" aria-label="${l(color.name)}" onclick="selectZoneFabricColor('${key}', ${colorIndex}, '${product.id}', ${isClient})">
                    <i style="background:${color.value}"></i>
                  </button>
                `;
                }).join("")}
              </div>
              ${colorTotalPages > 1 ? `
                <div class="fabric-pager color-pager">
                  <button ${colorPage === 0 ? "disabled" : ""} onclick="setColorPage('${key}', ${colorPage - 1}, '${product.id}', ${isClient})">‹</button>
                  <span>${colorPage + 1} / ${colorTotalPages}</span>
                  <button ${colorPage >= colorTotalPages - 1 ? "disabled" : ""} onclick="setColorPage('${key}', ${colorPage + 1}, '${product.id}', ${isClient})">›</button>
                </div>
              ` : ""}
            </div>
          </details>
        `;
      }).join("")}
    </div>
  `;
}

function renderPatternResources(patterns, product, isClient) {
  return `
    <div class="custom-panel-head artwork-panel-head">
      <h3>${l(dual("图案", "Artwork"))}</h3>
      <button class="btn secondary" onclick="addArtworkObject('${product.id}', ${isClient})">${l(dual("新增图案", "Add Artwork"))}</button>
    </div>
    <div class="artwork-object-list">
      ${artworkObjects.length ? artworkObjects.map((item, index) => renderArtworkObjectEditor(item, index, patterns, product, isClient)).join("") : `
        <div class="empty-artwork-state">
          <strong>${l(dual("还没有图案", "No artwork yet"))}</strong>
          <span>${l(dual("点击“新增图案”添加一个可移动的图案对象。", "Click Add Artwork to create a movable artwork object."))}</span>
        </div>
      `}
    </div>
  `;
}

function artworkSources() {
  return [
    { key: "library", label: dual("图案库", "Library") },
    { key: "upload", label: dual("上传图片", "Upload") },
    { key: "text", label: dual("输入文字", "Text") },
    { key: "ai", label: dual("AI 生成", "AI") },
  ];
}

function techniqueOptions() {
  return [
    { key: "heat", label: dual("热转印", "Heat Transfer") },
    { key: "embroidery", label: dual("刺绣", "Embroidery") },
    { key: "patch", label: dual("硅胶章", "Silicone Patch") },
  ];
}

function aiArtworkOptions() {
  return [
    { name: dual("AI Speed Mark", "AI Speed Mark"), image: LOCAL.banner.brandTwo },
    { name: dual("AI Team Wave", "AI Team Wave"), image: LOCAL.banner.brandThree },
    { name: dual("AI Track Line", "AI Track Line"), image: LOCAL.poster.motionOne },
    { name: dual("AI Motion Badge", "AI Motion Badge"), image: LOCAL.poster.studio },
  ];
}

function textFontOptions() {
  return [
    { key: "athletic", label: dual("Athletic Sans", "Athletic Sans") },
    { key: "modern", label: dual("Modern Sans", "Modern Sans") },
    { key: "serif", label: dual("Serif", "Serif") },
    { key: "condensed", label: dual("Condensed", "Condensed") },
    { key: "script", label: dual("Script", "Script") },
  ];
}

function textColorPresets() {
  return ["#111111", "#ffffff", "#d9272e", "#17233c", "#1f8f63", "#f5d75e", "#5645d4", "#c9c2b7"];
}

function artworkObjectSummary(item) {
  const source = artworkSources().find((option) => option.key === item.source) || artworkSources()[0];
  const technique = techniqueOptions().find((option) => option.key === item.technique) || techniqueOptions()[0];
  return dual(`${source.label.zh} / ${technique.label.zh}`, `${source.label.en} / ${technique.label.en}`);
}

function renderArtworkObjectEditor(item, index, patterns, product, isClient) {
  const active = state.activeArtwork === index;
  const summary = artworkObjectSummary(item);
  return `
    <article class="artwork-editor ${active ? "active" : ""}">
      <header class="artwork-editor-head" onclick="selectArtworkObject(${index}, '${product.id}', ${isClient})">
        <div>
          <strong>${l(item.name)}</strong>
          <span>${l(summary)}</span>
        </div>
        <button onclick="event.stopPropagation(); deleteArtworkObject(${index}, '${product.id}', ${isClient})">${l(dual("删除", "Delete"))}</button>
      </header>
      ${active ? `
        <div class="artwork-editor-body">
          <div class="mini-label">${l(dual("来源", "Source"))}</div>
          <div class="artwork-source-grid">
            ${artworkSources().map((source) => `
              <button class="source-card ${item.source === source.key ? "active" : ""}" onclick="selectArtworkSource(${index}, '${source.key}', '${product.id}', ${isClient})">${l(source.label)}</button>
            `).join("")}
          </div>
          ${renderArtworkContentPicker(item, index, patterns, product, isClient)}
          <div class="mini-label">${l(dual("工艺", "Technique"))}</div>
          <div class="technique-grid">
            ${techniqueOptions().map((technique) => `
              <button class="technique-card ${item.technique === technique.key ? "active" : ""}" onclick="selectArtworkTechnique(${index}, '${technique.key}', '${product.id}', ${isClient})">
                <i class="technique-visual ${technique.key}"></i>
                <span>${l(technique.label)}</span>
              </button>
            `).join("")}
          </div>
        </div>
      ` : ""}
    </article>
  `;
}

function renderArtworkContentPicker(item, index, patterns, product, isClient) {
  if (item.source === "upload") {
    return `
      <div class="mini-label">${l(dual("图案内容", "Artwork"))}</div>
      <button class="upload-tile active" onclick="selectArtworkResource(${index}, 0, '${product.id}', ${isClient})">
        <span>＋</span>
        <strong>${l(dual("上传图片", "Upload image"))}</strong>
      </button>
    `;
  }

  if (item.source === "text") {
    const selectedColor = item.textColor || textColorPresets()[0];
    const selectedFont = item.textFont || "athletic";
    return `
      <div class="mini-label">${l(dual("文字内容", "Text"))}</div>
      <div class="text-artwork-box">
        <input class="text-content-input" value="${l(dual("TEAM NAME", "TEAM NAME"))}" aria-label="${l(dual("输入文字", "Input text"))}" />
        <div class="mini-label">${l(dual("字体", "Font"))}</div>
        <select class="text-font-select" aria-label="${l(dual("选择字体", "Choose font"))}" onchange="selectTextArtworkFont(${index}, this.value, '${product.id}', ${isClient})">
          ${textFontOptions().map((font) => `<option value="${font.key}" ${selectedFont === font.key ? "selected" : ""}>${l(font.label)}</option>`).join("")}
        </select>
        <div class="mini-label">${l(dual("颜色", "Color"))}</div>
        <div class="text-color-presets">
          ${textColorPresets().map((color) => `
            <button class="${selectedColor.toLowerCase() === color.toLowerCase() ? "active" : ""}" title="${color.toUpperCase()}" aria-label="${color.toUpperCase()}" onclick="selectTextArtworkColor(${index}, '${color}', '${product.id}', ${isClient})">
              <i style="background:${color}"></i>
            </button>
          `).join("")}
        </div>
        <div class="text-custom-color">
          <span>${l(dual("自定义色", "Custom"))}</span>
          <input class="text-color-picker" data-coloris value="${selectedColor.toUpperCase()}" onchange="selectTextArtworkColor(${index}, this.value, '${product.id}', ${isClient})" />
        </div>
      </div>
    `;
  }

  if (item.source === "ai") {
    const aiItems = aiArtworkOptions();
    return `
      <div class="mini-label">${l(dual("AI 描述", "AI Prompt"))}</div>
      <div class="ai-prompt">
        <textarea rows="3" placeholder="${l(dual("输入图案方向，例如：速度感、团队徽章、黑红配色", "Describe the artwork direction"))}"></textarea>
        <button class="btn secondary" onclick="generateAiArtwork(${index}, '${product.id}', ${isClient})">${l(dual("生成", "Generate"))}</button>
      </div>
      ${item.aiGenerated ? `
        <div class="resource-list pattern-list ai-result-list">
          ${aiItems.map((option, resourceIndex) => `
            <button class="resource-card artwork-image-card ${item.resource === resourceIndex ? "active" : ""}" title="${l(option.name)}" aria-label="${l(option.name)}" onclick="selectArtworkResource(${index}, ${resourceIndex}, '${product.id}', ${isClient})">
              <img src="${option.image}" alt="${l(option.name)}" />
            </button>
          `).join("")}
        </div>
      ` : `
        <div class="ai-empty-state">
          <span>${l(dual("输入方向后生成 4 个图案结果。", "Enter a direction to generate 4 artwork results."))}</span>
        </div>
      `}
    `;
  }

  const totalPages = Math.max(1, Math.ceil(patterns.length / RESOURCES_PER_PAGE));
  const page = getPatternPage(item, patterns);
  const pageStart = page * RESOURCES_PER_PAGE;
  const visiblePatterns = patterns.slice(pageStart, pageStart + RESOURCES_PER_PAGE);
  return `
    <div class="mini-label">${l(dual("图案内容", "Artwork"))}</div>
    <div class="resource-list pattern-list">
      ${visiblePatterns.map((option, resourceIndex) => {
        const optionIndex = pageStart + resourceIndex;
        return `
        <button class="resource-card artwork-image-card ${item.resource === optionIndex ? "active" : ""}" draggable="true" title="${l(option.name)}" aria-label="${l(option.name)}" onclick="selectArtworkResource(${index}, ${optionIndex}, '${product.id}', ${isClient})">
          <img src="${option.image}" alt="${l(option.name)}" />
        </button>
      `;
      }).join("")}
    </div>
    ${totalPages > 1 ? `
      <div class="fabric-pager resource-pager">
        <button ${page === 0 ? "disabled" : ""} onclick="setPatternPage(${index}, ${page - 1}, '${product.id}', ${isClient})">‹</button>
        <span>${page + 1} / ${totalPages}</span>
        <button ${page >= totalPages - 1 ? "disabled" : ""} onclick="setPatternPage(${index}, ${page + 1}, '${product.id}', ${isClient})">›</button>
      </div>
    ` : ""}
  `;
}

function renderConfigOptions(step, product, isClient) {
  if (step === "color" || step === "colorways") {
    const colors = ["#e8edf0", "#111318", "#303030", "#707376", "#b6bdc1", "#3f442b", "#3b201b", "#164b1c", "#287028", "#0d6faf", "#076975", "#082137", "#0b86a3", "#7299dc", "#075394", "#6b3a8a", "#8a0000", "#ca6aca", "#d70000", "#4b1205", "#d6dc00", "#d89a00", "#bbaa8e", "#9a6100", "#d25a00"];
    return `
      <div class="color-grid">
        ${colors.map((color, index) => `<button class="${index === 8 ? "active" : ""}" style="background:${color}" onclick="toast('${l(dual("颜色已选择", "Color selected"))}')"></button>`).join("")}
      </div>
      <p class="config-note">${l(dual("当前颜色：Classic Green / #287028", "Current color: Classic Green / #287028"))}</p>
    `;
  }

  if (step === "logo" || step === "text") {
    return `
      <div class="logo-options">
        <button class="active"><strong>RAMATEX</strong><span>${l(dual("图案对象", "Artwork object"))}</span></button>
        <button><strong>24</strong><span>${l(dual("文字对象", "Text object"))}</span></button>
        <button><strong>TEAM</strong><span>${l(dual("队名", "Team name"))}</span></button>
      </div>
      <div class="field"><label>Logo</label><input value="RAMATEX" /></div>
      <div class="field"><label>${l(dual("号码", "Number"))}</label><input value="24" /></div>
    `;
  }

  if (step === "size-run") {
    return `
      <table class="roster-table">
        <thead><tr><th>${l(dual("姓名", "Name"))}</th><th>${l(dual("号码", "No."))}</th><th>${l(dual("尺码", "Size"))}</th></tr></thead>
        <tbody>
          <tr><td>Chen</td><td>08</td><td>M</td></tr>
          <tr><td>Wang</td><td>24</td><td>L</td></tr>
          <tr><td>Li</td><td>31</td><td>XL</td></tr>
        </tbody>
      </table>
      <button class="btn secondary" onclick="toast('${l(dual("名单已更新。", "Roster updated."))}')">${l(dual("添加名单", "Add roster"))}</button>
    `;
  }

  if (step === "fabric" || step === "approved-fabrics") {
    const fabrics = isClient ? clientMaterials : materials;
    return `<div class="fabric-choice">${fabrics.map((item, index) => `<button class="${index === 0 ? "active" : ""}" onclick="toast('${l(item.name)} ${l(C.selected)}')"><img src="${item.image}" alt="${l(item.name)}" /><span>${l(item.name)}</span></button>`).join("")}</div>`;
  }

  return renderOptions(step);
}

function renderOptions(step) {
  const map = {
    color: [
      [dual("核心黑", "Core black"), dual("主体颜色，适合清晰的团队视觉。", "A clear base color for team identity.")],
      [dual("团队红", "Team red"), dual("用于袖片、辅料和图案元素的强调色。", "Accent color for sleeves, trims and graphics.")],
      [dual("清爽白", "Fresh white"), dual("适合明亮训练系列的基础色。", "A bright base for training capsules.")],
    ],
    colorways: [
      [dual("项目黑/红", "Project black/red"), dual("已确认的项目配色。", "Confirmed project colorway.")],
      [dual("出行米白", "Travel off-white"), dual("适合出行胶囊系列的暖中性色。", "Warm neutral for travel capsule.")],
      [dual("训练绿", "Training green"), dual("训练套装的辅助配色。", "Secondary colorway for practice kits.")],
    ],
    fabric: [
      [dual("透气网眼", "Breathable mesh"), dual("轻量开放针织高性能面料。", "Lightweight open-knit performance fabric.")],
      [dual("柔软针织", "Soft-touch knit"), dual("适合日常产品的舒适 jersey。", "Comfort jersey for everyday products.")],
      [dual("弹力梭织", "Stretch woven"), dual("适合外套层的壳层面料。", "Outer layer shell material.")],
    ],
    "approved-fabrics": [
      [dual("项目网眼 interlock", "Project mesh interlock"), dual("已锁定用于项目训练上衣。", "Approved for project training tops.")],
      [dual("弹力梭织外壳", "Stretch woven shell"), dual("已获批用于出行夹克。", "Approved for travel jackets.")],
      [dual("柔软抓绒", "Soft-touch fleece"), dual("已获批用于恢复系列。", "Approved for recovery pieces.")],
    ],
    pattern: [
      [dual("干净拼片", "Clean panels"), dual("极简运动拼片系统。", "Minimal athletic panel system.")],
      [dual("速度图案", "Speed graphic"), dual("适合跑步款的方向性图案。", "Directional graphic for running styles.")],
      [dual("俱乐部条纹", "Club stripe"), dual("简单团队服条纹系统。", "Simple teamwear stripe system.")],
    ],
    logo: [
      [dual("图案对象", "Artwork object"), dual("添加后可在画布中移动、缩放和旋转。", "Move, scale and rotate after adding to canvas.")],
      [dual("文字对象", "Text object"), dual("添加队名、编号或短句。", "Add team name, number or short text.")],
      [dual("AI 图案", "AI artwork"), dual("生成新的图案对象。", "Generate a new artwork object.")],
    ],
    text: [
      [dual("名称文字", "Name line"), dual("在标识下方添加一行小字。", "Add a small text line under the mark.")],
      [dual("项目年份", "Program year"), dual("添加季度或活动年份。", "Add season or event year.")],
      [dual("不加文字", "No text"), dual("保持款式干净。", "Keep garment clean.")],
    ],
    "size-run": [
      [dual("XS-3XL", "XS-3XL"), dual("核心成人尺码范围。", "Core adult size range.")],
      [dual("增加儿童码", "Youth add-on"), dual("在尺码组中加入儿童码。", "Add youth sizes to the run.")],
      [dual("数量拆分", "Quantity split"), dual("准备样衣和报价用数量拆分。", "Prepare quantity split for sample and quote.")],
    ],
    "ai-try-on": [
      [dual("训练动作", "Training pose"), dual("预览运动状态和版型方向。", "Preview movement and fit direction.")],
      [dual("Campaign 模特", "Campaign model"), dual("以 campaign 造型预览服装。", "Preview the garment in campaign styling.")],
      [dual("细节裁切", "Detail crop"), dual("预览面料、辅料和 Logo 区域。", "Preview fabric, trim and logo area.")],
    ],
  };

  return (map[step] || map.color).map((item, index) => `
    <button class="option-card ${index === 0 ? "active" : ""}" onclick="toast('${l(item[0])} ${l(C.selected)}')">
      <strong>${l(item[0])}</strong>
      <span>${l(item[1])}</span>
    </button>
  `).join("");
}

function renderModal() {
  return `
    <div class="modal" id="videoModal" onclick="closeVideo(event)">
      <div class="modal-card" onclick="event.stopPropagation()">
        <div class="modal-media">
          <video id="modalVideo" src="" poster="${ASSETS.model}" controls playsinline preload="metadata"></video>
          <div class="modal-copy">
            <h2 id="modalTitle">${l(dual("动态预览", "Motion preview"))}</h2>
          </div>
        </div>
        <div class="modal-bar">
          <span class="meta">${l(dual("款式上身预览", "Style try-on preview"))}</span>
          <button class="close" onclick="closeVideo()">${l(C.close)}</button>
        </div>
      </div>
    </div>
  `;
}

function toggleMenu() {
  document.querySelector("#topbar")?.classList.toggle("open");
}

function toggleLang() {
  lang = lang === "zh" ? "en" : "zh";
  localStorage.setItem(LANG_KEY, lang);
  route();
}

function scrollSection(section, isClient) {
  const target = isClient ? "#/space" : "#/";
  const currentPath = (window.location.hash || "#/").replace("#", "").split("?")[0];
  const targetPath = target.replace("#", "");
  const scroll = () => document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
  if (currentPath !== targetPath) {
    window.location.hash = target;
    setTimeout(scroll, 80);
    return;
  }
  scroll();
}

function setSlide(mode, index) {
  clearInterval(state.bannerTimer);
  if (mode === "client") {
    state.clientSlide = index;
    renderClientHome();
    return;
  }
  state.publicSlide = index;
  renderHome();
}

function startBannerAuto(mode) {
  clearInterval(state.bannerTimer);
  const slides = mode === "client" ? clientSlides : publicSlides;
  state.bannerTimer = setInterval(() => {
    if (mode === "client") {
      state.clientSlide = (state.clientSlide + 1) % slides.length;
      renderClientHome();
      return;
    }
    state.publicSlide = (state.publicSlide + 1) % slides.length;
    renderHome();
  }, 4000);
}

function setVideo(mode, index) {
  const items = mode === "client" ? clientVideos : videos;
  const item = items[index] || items[0];
  if (!item) return;

  if (mode === "client") state.clientVideo = index;
  else state.publicVideo = index;

  const section = document.getElementById(mode === "client" ? "private-videos" : "videos");
  const player = section?.querySelector(".main-video");
  if (!player) return;

  player.pause();
  player.src = item.src;
  player.poster = item.image;
  player.setAttribute("aria-label", l(item.title));
  player.load();
  player.play().catch(() => {});

  section.querySelectorAll(".video-select").forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.videoIndex) === index);
  });
  section.querySelector(".video-current-name")?.replaceChildren(document.createTextNode(l(item.title)));
}

function selectMedia(index, id, isClient) {
  state.mediaIndex = index;
  renderProduct(id, isClient, state.detailFrom);
}

function selectMaterialMedia(index, id, isClient, from = "") {
  state.mediaIndex = index;
  renderMaterialDetail(id, isClient, from);
}

function setStep(step, id, isClient) {
  state.customStep = step;
  renderCustomizer(id, isClient);
}

function setCustomTab(tab, id, isClient) {
  state.customTab = tab;
  renderCustomizer(id, isClient);
}

function enterBrandSpaceCredential(event) {
  event?.preventDefault();
  localStorage.setItem(LOGIN_KEY, "1");
  window.location.hash = "#/space";
}

function setCustomZone(zone, id, isClient) {
  state.selectedZone = zone;
  renderCustomizer(id, isClient);
}

function getFabricPage(zone, options) {
  const totalPages = Math.max(1, Math.ceil((options?.length || 0) / RESOURCES_PER_PAGE));
  const page = state.fabricPages?.[zone] || 0;
  return Math.max(0, Math.min(page, totalPages - 1));
}

function setFabricPage(zone, page, id, isClient) {
  const options = fabricZoneOptions[zone] || [];
  const totalPages = Math.max(1, Math.ceil(options.length / RESOURCES_PER_PAGE));
  state.selectedZone = zone;
  state.fabricPages = {
    ...state.fabricPages,
    [zone]: Math.max(0, Math.min(page, totalPages - 1)),
  };
  renderCustomizer(id, isClient);
}

function getColorPage(zone, fabric) {
  const totalPages = Math.max(1, Math.ceil((fabric?.colors?.length || 0) / COLORS_PER_PAGE));
  const page = state.colorPages?.[zone] || 0;
  return Math.max(0, Math.min(page, totalPages - 1));
}

function setColorPage(zone, page, id, isClient) {
  const current = fabricSelections[zone] || { fabric: 0, color: 0 };
  const fabric = fabricZoneOptions[zone]?.[current.fabric] || fabricZoneOptions[zone]?.[0];
  const totalPages = Math.max(1, Math.ceil((fabric?.colors?.length || 0) / COLORS_PER_PAGE));
  state.selectedZone = zone;
  state.colorPages = {
    ...state.colorPages,
    [zone]: Math.max(0, Math.min(page, totalPages - 1)),
  };
  renderCustomizer(id, isClient);
}

function selectZoneFabric(zone, index, id, isClient) {
  state.selectedZone = zone;
  state.fabricPages = {
    ...state.fabricPages,
    [zone]: Math.floor(index / RESOURCES_PER_PAGE),
  };
  state.colorPages = {
    ...state.colorPages,
    [zone]: 0,
  };
  fabricSelections[zone] = { fabric: index, color: 0 };
  renderCustomizer(id, isClient);
}

function selectZoneFabricColor(zone, index, id, isClient) {
  state.selectedZone = zone;
  state.colorPages = {
    ...state.colorPages,
    [zone]: Math.floor(index / COLORS_PER_PAGE),
  };
  const current = fabricSelections[zone] || { fabric: 0, color: 0 };
  fabricSelections[zone] = { ...current, color: index };
  renderCustomizer(id, isClient);
}

function selectFabric(index, id, isClient) {
  fabricSelections[state.selectedZone] = { fabric: index, color: 0 };
  renderCustomizer(id, isClient);
}

function selectFabricColor(index, id, isClient) {
  const current = fabricSelections[state.selectedZone] || { fabric: 0, color: 0 };
  fabricSelections[state.selectedZone] = { ...current, color: index };
  renderCustomizer(id, isClient);
}

function createArtworkObject(index) {
  return {
    id: `artwork-${Date.now()}-${index}`,
    name: dual(`图案 ${index + 1}`, `Artwork ${index + 1}`),
    source: "library",
    resource: 0,
    technique: "heat",
    aiGenerated: false,
    textFont: "athletic",
    textColor: "#111111",
  };
}

function addArtworkObject(id, isClient) {
  artworkObjects.push(createArtworkObject(artworkObjects.length));
  state.activeArtwork = artworkObjects.length - 1;
  state.customTab = "pattern";
  renderCustomizer(id, isClient);
}

function deleteArtworkObject(index, id, isClient) {
  artworkObjects.splice(index, 1);
  state.activeArtwork = artworkObjects.length ? Math.max(0, Math.min(index, artworkObjects.length - 1)) : -1;
  renderCustomizer(id, isClient);
}

function selectArtworkObject(index, id, isClient) {
  state.activeArtwork = index;
  state.customTab = "pattern";
  renderCustomizer(id, isClient);
}

function selectArtworkSource(index, source, id, isClient) {
  if (!artworkObjects[index]) return;
  artworkObjects[index] = {
    ...artworkObjects[index],
    source,
    resource: source === "ai" ? -1 : 0,
    aiGenerated: source === "ai" ? false : artworkObjects[index].aiGenerated,
    textFont: artworkObjects[index].textFont || "athletic",
    textColor: artworkObjects[index].textColor || "#111111",
  };
  state.activeArtwork = index;
  renderCustomizer(id, isClient);
}

function selectArtworkResource(index, resource, id, isClient) {
  if (!artworkObjects[index]) return;
  artworkObjects[index] = { ...artworkObjects[index], resource };
  state.activeArtwork = index;
  renderCustomizer(id, isClient);
}

function selectArtworkTechnique(index, technique, id, isClient) {
  if (!artworkObjects[index]) return;
  artworkObjects[index] = { ...artworkObjects[index], technique };
  state.activeArtwork = index;
  renderCustomizer(id, isClient);
}

function selectTextArtworkFont(index, font, id, isClient) {
  if (!artworkObjects[index]) return;
  artworkObjects[index] = { ...artworkObjects[index], textFont: font };
  state.activeArtwork = index;
  renderCustomizer(id, isClient);
}

function selectTextArtworkColor(index, color, id, isClient) {
  if (!artworkObjects[index]) return;
  const normalized = /^#[0-9a-f]{6}$/i.test(color) ? color.toUpperCase() : "#111111";
  artworkObjects[index] = { ...artworkObjects[index], textColor: normalized };
  state.activeArtwork = index;
  renderCustomizer(id, isClient);
}

function initTextColorPickers() {
  if (typeof Coloris !== "function") return;
  Coloris({
    el: ".text-color-picker",
    alpha: false,
    format: "hex",
    theme: "default",
    themeMode: "light",
    swatches: textColorPresets(),
  });
}

function getPatternPage(item, patterns) {
  const totalPages = Math.max(1, Math.ceil((patterns?.length || 0) / RESOURCES_PER_PAGE));
  const page = item.patternPage || 0;
  return Math.max(0, Math.min(page, totalPages - 1));
}

function setPatternPage(index, page, id, isClient) {
  if (!artworkObjects[index]) return;
  const patterns = patternResources(getProduct(id, isClient), isClient);
  const totalPages = Math.max(1, Math.ceil(patterns.length / RESOURCES_PER_PAGE));
  artworkObjects[index] = {
    ...artworkObjects[index],
    patternPage: Math.max(0, Math.min(page, totalPages - 1)),
  };
  state.activeArtwork = index;
  renderCustomizer(id, isClient);
}

function generateAiArtwork(index, id, isClient) {
  if (!artworkObjects[index]) return;
  artworkObjects[index] = {
    ...artworkObjects[index],
    aiGenerated: true,
    resource: -1,
  };
  state.activeArtwork = index;
  renderCustomizer(id, isClient);
}

function basketSummary() {
  const body = fabricSelections.body;
  const bodyFabric = fabricZoneOptions.body[body.fabric] || fabricZoneOptions.body[0];
  const bodyColor = bodyFabric.colors[body.color] || bodyFabric.colors[0];
  return `${l(bodyFabric.name)} / ${l(bodyColor.name)} · ${artworkObjects.length} ${l(dual("个图案", "artworks"))}`;
}

function addCurrentToBasket(id, isClient) {
  const product = getProduct(id, isClient);
  const basket = readStoredList(BASKET_KEY, []);
  basket.push({
    id: `SB-${Date.now()}`,
    productId: product.id,
    name: l(product.name),
    image: product.image,
    quantity: isClient ? "300" : "100",
    summary: basketSummary(),
    createdAt: new Date().toISOString().slice(0, 10),
  });
  writeStoredList(BASKET_KEY, basket);
  toast(l(C.submitted));
  setTimeout(() => {
    if (IS_BRAND_SPACE) window.location.hash = "#/basket";
    else window.location.href = `./brand-space.html?lang=${lang}#/basket`;
  }, 520);
}

function removeBasketItem(id) {
  const basket = readStoredList(BASKET_KEY, []).filter((item) => item.id !== id);
  writeStoredList(BASKET_KEY, basket);
  renderBasketPage();
}

function submitBasketOrder() {
  const basket = readStoredList(BASKET_KEY, []);
  if (!basket.length) return;
  const orders = readStoredList(ORDERS_KEY, defaultOrders());
  const order = {
    id: `RMX-${new Date().toISOString().slice(2, 10).replaceAll("-", "")}-${String(orders.length + 1).padStart(2, "0")}`,
    name: basket.map((item) => item.name).join(" / "),
    quantity: basket.reduce((sum, item) => sum + Number(item.quantity || 0), 0).toString(),
    status: l(dual("待确认", "Pending")),
    date: new Date().toISOString().slice(0, 10),
    summary: `${basket.length} ${l(dual("个定制方案", "customization plans"))}`,
  };
  writeStoredList(ORDERS_KEY, [order, ...orders]);
  writeStoredList(BASKET_KEY, []);
  window.location.hash = "#/orders";
}

function openVideo(src, poster, title) {
  const modal = document.querySelector("#videoModal");
  const video = document.querySelector("#modalVideo");
  video.src = src;
  video.poster = poster;
  video.load();
  video.play().catch(() => {});
  document.querySelector("#modalTitle").textContent = title;
  modal.classList.add("open");
}

function closeVideo(event) {
  if (event && event.target.id !== "videoModal") return;
  const video = document.querySelector("#modalVideo");
  if (video) {
    video.pause();
    video.removeAttribute("src");
    video.load();
  }
  document.querySelector("#videoModal")?.classList.remove("open");
}

function toast(message) {
  const el = document.querySelector("#toast");
  if (!el) return;
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
}

window.addEventListener("hashchange", route);
window.addEventListener("DOMContentLoaded", route);
