const SUMEIDA_ASSET_ROOT = "assets/苏美达素材(1)";

const SUMEIDA_STYLE_ASSETS = {
  "style-001": `${SUMEIDA_ASSET_ROOT}/款式1.jpg`,
  "style-002": `${SUMEIDA_ASSET_ROOT}/款式2.jpg`,
  "style-003": `${SUMEIDA_ASSET_ROOT}/款式3.jpg`
};

const SUMEIDA_TRYON_RESULTS = {
  "tryon-look-001": `${SUMEIDA_ASSET_ROOT}/款1 服装上身.jpg`,
  "tryon-look-003": `${SUMEIDA_ASSET_ROOT}/款3 服装上身.jpg`
};

const SUMEIDA_BACKGROUND_IDS = [
  "bg-sunlit-gallery",
  "bg-mountain",
  "bg-old-town",
  "bg-arched-hall",
  "bg-white-curtain",
  "bg-warm-living"
];

const SUMEIDA_COMBINATIONS = [
  {
    id: "combo-style-001-fabric-002",
    styleId: "style-001",
    fabricId: "fabric-002",
    image: `${SUMEIDA_ASSET_ROOT}/款1 面料上身.png`,
    pairingItemId: "pairing-001",
    tryon: SUMEIDA_TRYON_RESULTS["tryon-look-001"]
  },
  {
    id: "combo-style-002-fabric-003",
    styleId: "style-002",
    fabricId: "fabric-003",
    image: `${SUMEIDA_ASSET_ROOT}/款2 面料上身.png`
  },
  {
    id: "combo-style-002-fabric-001",
    styleId: "style-002",
    fabricId: "fabric-001",
    image: `${SUMEIDA_ASSET_ROOT}/款2 面料上身-2.png`
  },
  {
    id: "combo-style-003-fabric-007",
    styleId: "style-003",
    fabricId: "fabric-007",
    image: `${SUMEIDA_ASSET_ROOT}/款3 面料上身.png`
  },
  {
    id: "combo-style-003-fabric-006",
    styleId: "style-003",
    fabricId: "fabric-006",
    image: `${SUMEIDA_ASSET_ROOT}/款3 面料上身-2.png`,
    pairingItemId: "pairing-003",
    tryon: SUMEIDA_TRYON_RESULTS["tryon-look-003"]
  }
].map(item => ({
  ...item,
  presentation: { scale: 1, x: 0, y: 0 },
  tryonByBackground: item.tryon
    ? Object.fromEntries(SUMEIDA_BACKGROUND_IDS.map(backgroundId => [backgroundId, item.tryon]))
    : {},
  video: "assets/realtime/realtime-001.mp4",
  realtime: "assets/realtime/realtime-001.mp4"
}));

window.SUMEIDA_CONFIG = {
  brand: { name: "SUMEIDA", cn: "苏美达", subtitle: "面料与服装智能创新体验" },
  styles: [
    { id: "style-001", sampleNo: "SM-26001", name: "蓝白条纹拉链外套", color: "蓝白条纹", size: "M", department: "服装研发部", country: "中国", image: SUMEIDA_STYLE_ASSETS["style-001"], thumbnail: "assets/thumbnails/style-001-card.jpg" },
    { id: "style-002", sampleNo: "SM-26002", name: "修身长袖上衣", color: "棕色", size: "M", department: "服装研发部", country: "中国", image: SUMEIDA_STYLE_ASSETS["style-002"] },
    { id: "style-003", sampleNo: "SM-26003", name: "经典长袖衬衫", color: "深灰", size: "M", department: "服装研发部", country: "中国", image: SUMEIDA_STYLE_ASSETS["style-003"] }
  ],
  fabrics: [
    { id: "fabric-001", artNo: "SU260801-01", name: "粉紫花格", remark: "已有上身效果", image: `${SUMEIDA_ASSET_ROOT}/iwEcAqNwbmcDAQTRAQAF0QEABrBdXpr9y-dOuApHRl8H4pUBB9IEnrJcCAAJomltCgAL0XVE.png` },
    { id: "fabric-002", artNo: "SU260801-02", name: "浅蓝颗粒肌理", remark: "已有上身效果", image: `${SUMEIDA_ASSET_ROOT}/iwEcAqNwbmcDAQTRAQAF0QEABrCVbcA8f9yLLgpHRdHNikMAB9IEnrJcCAAJomltCgAL0gAApxw.png` },
    { id: "fabric-003", artNo: "SU260801-03", name: "浅绿细织纹", remark: "已有上身效果", image: `${SUMEIDA_ASSET_ROOT}/iwEcAqNwbmcDAQTRAQAF0QEABrDalncgeAtWdwpHRdHcATIAB9IEnrJcCAAJomltCgAL0gAAthE.png` },
    { id: "fabric-004", artNo: "SU260801-04", name: "灰色竖条", remark: "待生成效果", image: `${SUMEIDA_ASSET_ROOT}/iwEdAqNwbmcDAQTRAQAF0QEABrCQPVL62tPWMQpHRedrKO4AB9IEnrJcCAAJomltCgAL0gAAnuc.png` },
    { id: "fabric-005", artNo: "SU260801-05", name: "浅蓝细竖纹", remark: "待生成效果", image: `${SUMEIDA_ASSET_ROOT}/iwEdAqNwbmcDAQTRAQAF0QEABrCschADTJztyQpHReguJUQAB9IEnrJcCAAJomltCgAL0WjY.png` },
    { id: "fabric-006", artNo: "SU260801-06", name: "米白蓝棕格", remark: "已有上身效果", image: `${SUMEIDA_ASSET_ROOT}/iwEdAqNwbmcDAQTRAQAF0QEABrDvGFoqk-J9ZQpHRl4PMwIBB9IEnrJcCAAJomltCgAL0VZD.png` },
    { id: "fabric-007", artNo: "SU260801-07", name: "蓝白横条", remark: "已有上身效果", image: `${SUMEIDA_ASSET_ROOT}/iwEeAqNwbmcDAQTRAQAF0QEABrDXcFr5E0nLmgpHRdHcsOoAB9IEnrJcCAAJomltCgAL0gAAlgw.png` }
  ],
  combinations: SUMEIDA_COMBINATIONS,
  pairingItems: [
    { id: "pairing-001", sampleNo: "MT-26001", name: "蓝白条纹配套长裤", image: `${SUMEIDA_ASSET_ROOT}/款1 生成.png`, styleIds: ["style-001"] },
    { id: "pairing-003", sampleNo: "MT-26003", name: "深灰配套长裤", image: `${SUMEIDA_ASSET_ROOT}/款3生成.png`, styleIds: ["style-003"] }
  ],
  modelImage: `${SUMEIDA_ASSET_ROOT}/模特图.png`,
  homeImages: [
    `${SUMEIDA_ASSET_ROOT}/模特图.png`,
    `${SUMEIDA_ASSET_ROOT}/款3 服装上身.jpg`
  ],
  backgrounds: [
    { id: "bg-sunlit-gallery", name: "日光展厅", description: "明亮克制的室内光影", image: "assets/backgrounds/background-sunlit-gallery.jpg" },
    { id: "bg-mountain", name: "山谷远景", description: "开阔清新的户外环境", image: "assets/backgrounds/background-mountain.jpg" },
    { id: "bg-old-town", name: "老城街巷", description: "具有纵深感的城市街景", image: "assets/backgrounds/background-old-town.jpg" },
    { id: "bg-arched-hall", name: "静谧拱廊", description: "温和低干扰的建筑空间", image: "assets/backgrounds/background-arched-hall.jpg" },
    { id: "bg-white-curtain", name: "白纱空间", description: "轻盈通透的自然空间", image: "assets/backgrounds/background-white-curtain.jpg" },
    { id: "bg-warm-living", name: "暖调客厅", description: "柔和自然光室内场景", image: "assets/backgrounds/background-warm-living.jpg" }
  ],
  sampleCodes: { "SM-26001": "style-001", "SM-26002": "style-002", "SM-26003": "style-003" },
  report: {
    basicTraits: {
      traits: [
        { title: "体型：X 型沙漏曲线", image: "assets/report/body/x_shape.png", visualMode: "crop", points: ["肩宽与胯宽比例协调，腰部线条明显。", "适合收腰设计、高腰下装和垂坠面料。", "避免完全无腰线的宽松廓形。"] },
        { title: "脸型：圆形脸温柔款", image: "assets/report/face/round_face.png", visualMode: "contain", points: ["面部轮廓圆润，下颌线柔和。", "优先 V 领、U 领、方领，拉长颈部和脸部比例。", "避免高领、紧圆领带来的压缩感。"] }
      ],
      skinToneTitle: "肤色：春季型肤色",
      featureRows: [{ label: "毛发", value: "棕色系" }, { label: "眼睛", value: "眼珠呈棕色，眼白略带湖蓝色" }, { label: "皮肤", value: "肤色偏白皙，脸颊带有珊瑚粉色红晕" }],
      colorRows: [{ label: "明度", value: "中高" }, { label: "纯度", value: "中高" }, { label: "冷暖", value: "暖色调" }],
      paletteRows: [{ label: "外套", colors: ["#dce7e2", "#76978a", "#174f3d"] }, { label: "内搭", colors: ["#f4f6f4", "#cadbd3", "#b8ced4"] }, { label: "配饰", colors: ["#b99558", "#dfcda8", "#5f7169"] }]
    },
    stylePositioning: {
      intro: "你的核心风格", title: "都市休闲风", tags: ["利落廓形", "日常通勤", "清爽纹理"],
      coreElements: [{ label: "色彩", value: "深灰、雾蓝、米白等克制中性色。" }, { label: "版型", value: "上装保留适度松量，以直线条强化利落感。" }, { label: "面料", value: "细织纹、条纹与轻薄挺括混纺。" }, { label: "场景", value: "日常通勤、城市休闲与轻商务会面。" }],
      colors: [{ name: "浅灰", color: "#d9dfdc" }, { name: "墨绿", color: "#174f3d" }, { name: "雾蓝", color: "#b8ced4" }, { name: "米白", color: "#f4f1e8" }]
    },
    recommendedLooks: [
      { styleId: "style-001", name: "LOOK 1", title: "蓝白条纹休闲套装", description: "清晰条纹与拉链结构强化年轻、轻运动的城市感。" },
      { styleId: "style-002", name: "LOOK 2", title: "修身肌理上衣", description: "简洁轮廓适合快速切换不同面料纹理与色彩。" },
      { styleId: "style-003", name: "LOOK 3", title: "经典长袖衬衫", description: "直线型衬衫轮廓兼顾通勤与日常搭配。" }
    ],
    stylingAdvice: {
      refine: [{ title: "强化腰线", description: "选择收腰剪裁或短上衣叠穿，保留 X 型比例优势。" }, { title: "拉长领口", description: "用 V 领、U 领和项链纵向线条减轻圆脸压缩感。" }],
      avoid: [{ title: "厚重高领", description: "会压缩颈部和面部比例，让脸部显得更圆。" }, { title: "大面积深冷色", description: "容易削弱春季型肤色的清透感。" }]
    }
  },
  diagnosis: {
    title: "优雅自然型 · 柔和低饱和",
    summary: "轮廓线条柔和，肩腰比例均衡，适合强调纵向结构与轻盈肌理的针织款式。",
    features: ["柔和椭圆脸型", "肩腰比例均衡", "中等量感五官"],
    suggestions: ["优先 V 领、方领与简洁圆领", "选择有垂感或细腻肌理的面料", "全身颜色控制在三种以内"],
    recommendedStyleIds: ["style-001", "style-002", "style-003"]
  }
};
