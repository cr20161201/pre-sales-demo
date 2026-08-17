const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const assert = require("node:assert/strict");
const vm = require("node:vm");

const projectRoot = path.resolve(__dirname, "..");

function createAppContext() {
  const appElement = {
    html: "",
    get innerHTML() { return this.html; },
    set innerHTML(value) { this.html = value; },
    insertAdjacentHTML() {}
  };
  const document = {
    documentElement: { style: { setProperty() {} } },
    querySelector(selector) { return selector === "#app" ? appElement : null; },
    querySelectorAll() { return []; }
  };
  const window = {
    innerWidth: 1215,
    innerHeight: 2160,
    visualViewport: { addEventListener() {} },
    addEventListener() {},
    setTimeout(callback) { callback(); }
  };
  const context = vm.createContext({ window, document });
  vm.runInContext(fs.readFileSync(path.join(projectRoot, "sumeida-config.js"), "utf8"), context);
  vm.runInContext(fs.readFileSync(path.join(projectRoot, "app.js"), "utf8"), context);
  return context;
}

function setActiveCombination(context, options = {}) {
  const { photo = false, flowSource = "studio" } = options;
  vm.runInContext(`
    const testCombo = config.combinations[0];
    state.flowSource = "${flowSource}";
    state.styleId = testCombo.styleId;
    state.fabricId = testCombo.fabricId;
    state.comboId = testCombo.id;
    state.photo = ${photo};
  `, context);
}

test("studio image try-on shows design actions instead of report recommendations", () => {
  const context = createAppContext();
  setActiveCombination(context, { photo: true });
  const html = vm.runInContext(`
    createImageResult(state.comboId, state.backgroundId);
    imageTryonView();
  `, context);

  assert.match(html, /data-continue-design>继续设计/);
  assert.match(html, /data-schemes>选择已完成方案/);
  assert.doesNotMatch(html, /换其他推荐款/);
});

test("recommendation image try-on keeps recommendation actions", () => {
  const context = createAppContext();
  setActiveCombination(context, { photo: true, flowSource: "recommendation" });
  const html = vm.runInContext(`
    createImageResult(state.comboId, state.backgroundId);
    imageTryonView();
  `, context);

  assert.match(html, /data-other-recommendation>换其他推荐款/);
  assert.match(html, /data-schemes>其他方案/);
});

test("first studio image try-on takes a photo and opens the result directly", () => {
  const context = createAppContext();
  setActiveCombination(context);

  const afterStart = vm.runInContext(`
    startImageTryOn();
    ({ view: state.view, photo: state.photo });
  `, context);
  assert.deepEqual({ ...afterStart }, { view: "tryonMode", photo: false });

  const afterMode = vm.runInContext(`
    chooseTryOnMode("single");
    ({ view: state.view, captureTarget: state.captureTarget, results: state.tryOnHistory.length });
  `, context);
  assert.deepEqual(
    { ...afterMode },
    { view: "camera", captureTarget: "imageTryon", results: 0 }
  );

  const afterCapture = vm.runInContext(`
    completeCapture();
    ({ view: state.view, photo: state.photo, results: state.tryOnHistory.length });
  `, context);
  assert.deepEqual(
    { ...afterCapture },
    { view: "imageTryon", photo: true, results: 1 }
  );
});

test("try-on mode offers only single and manual choices", () => {
  const context = createAppContext();
  setActiveCombination(context, { photo: true });
  const html = vm.runInContext(`startImageTryOn(); tryonModeView();`, context);
  assert.match(html, /data-tryon-choice="single"/);
  assert.match(html, /data-tryon-choice="manual"/);
  assert.doesNotMatch(html, /data-tryon-choice="auto"|自动搭配/);
  assert.match(html, /tryon-mode-grid two-options/);
});

test("manual pairing selects a compatible pairing item before continuing", () => {
  const context = createAppContext();
  setActiveCombination(context, { photo: true });

  const result = vm.runInContext(`
    startImageTryOn();
    chooseTryOnMode("manual");
    const selectionView = state.view;
    state.pairingStyleId = "pairing-001";
    continueTryOn();
    ({ selectionView, finalView: state.view, pairingStyleId: state.pairingStyleId });
  `, context);

  assert.deepEqual(
    { ...result },
    { selectionView: "manualPairing", finalView: "imageTryon", pairingStyleId: "pairing-001" }
  );
});

test("manual pairing page shows the full pairing style library without the current look panel", () => {
  const context = createAppContext();
  setActiveCombination(context);
  const html = vm.runInContext(`manualPairingView();`, context);
  assert.equal((html.match(/data-pairing-style=/g) || []).length, 2);
  assert.match(html, /选择搭配款式/);
  assert.doesNotMatch(html, /pairing-current|当前主款/);
});

test("realtime try-on also passes through mode selection", () => {
  const context = createAppContext();
  setActiveCombination(context);

  const result = vm.runInContext(`
    startRealtimeTryOn();
    const selectionView = state.view;
    chooseTryOnMode("single");
    ({ selectionView, finalView: state.view, tryonMode: state.tryonMode });
  `, context);

  assert.deepEqual(
    { ...result },
    { selectionView: "tryonMode", finalView: "realtime", tryonMode: "realtime" }
  );
});

test("an existing session photo opens image try-on without a background step", () => {
  const context = createAppContext();
  setActiveCombination(context, { photo: true });

  const result = vm.runInContext(`
    startImageTryOn();
    chooseTryOnMode("single");
    ({ view: state.view, results: state.tryOnHistory.length });
  `, context);

  assert.deepEqual({ ...result }, { view: "imageTryon", results: 1 });
});

test("continue design returns to the correct source flow", () => {
  const context = createAppContext();
  const destinations = vm.runInContext(`
    state.flowSource = "studio";
    continueDesign();
    const studioDestination = state.view;
    state.flowSource = "recommendation";
    continueDesign();
    ({ studioDestination, recommendationDestination: state.view });
  `, context);

  assert.deepEqual(
    { ...destinations },
    { studioDestination: "studio", recommendationDestination: "detail" }
  );
});

test("realtime navigation stays inside the schemes panel", () => {
  const context = createAppContext();
  setActiveCombination(context);
  const html = vm.runInContext(`
    ensureRealtimeResult(getActiveCombo());
    realtimeView();
  `, context);

  assert.match(html, /<aside class="realtime-panel">[\s\S]*<div class="realtime-panel-actions">/);
  assert.match(html, /data-return-flow>返回创款/);
  assert.match(html, /data-home>返回首页/);
  assert.doesNotMatch(html, /class="realtime-actions"/);
});

test("both studio libraries retain scanning and expose local upload", () => {
  const context = createAppContext();
  const styleHtml = vm.runInContext(`state.view = "studio"; state.libraryTab = "styles"; studioView();`, context);
  const fabricHtml = vm.runInContext(`state.libraryTab = "fabrics"; studioView();`, context);

  assert.match(styleHtml, /class="library-tool-btn scan-icon-btn" data-open-scan="style" aria-label="扫码选款"/);
  assert.match(fabricHtml, /class="library-tool-btn scan-icon-btn" data-open-scan="fabric" aria-label="扫码选料"/);
  assert.match(styleHtml, /data-open-upload="style"/);
  assert.match(styleHtml, /data-upload-input="style"/);
  assert.match(fabricHtml, /data-open-upload="fabric"/);
  assert.match(fabricHtml, /data-upload-input="fabric"/);
  assert.doesNotMatch(styleHtml, />▣ 扫码选款</);
  assert.doesNotMatch(fabricHtml, />▣ 扫码选料</);
});

test("report expands to the recommendation list and has no scan entry", () => {
  const context = createAppContext();
  const html = vm.runInContext(`reportView();`, context);
  assert.match(html, /data-go="recommendationList"/);
  assert.doesNotMatch(html, /data-scan|扫码选款/);
});

test("image try-on result supports takeaway and no background adjustment", () => {
  const context = createAppContext();
  setActiveCombination(context, { photo: true });
  const html = vm.runInContext(`generateImageTryOn(); imageTryonView();`, context);
  assert.match(html, /data-takeaway/);
  assert.doesNotMatch(html, /data-change-background|换背景/);
});

test("a base style never borrows try-on media from another style", () => {
  const context = createAppContext();
  const result = vm.runInContext(`
    const combo = getCombination("base-style-002");
    ({ styleId: combo.styleId, media: combo.tryonByBackground[state.backgroundId] || null });
  `, context);
  assert.equal(result.styleId, "style-002");
  const expected = vm.runInContext(`config.combinations.find(item => item.styleId === "style-002")?.tryonByBackground[state.backgroundId] || null`, context);
  assert.equal(result.media, expected);
});

test("uploaded fabric can generate a local combination and enter try-on", () => {
  const context = createAppContext();
  const result = vm.runInContext(`
    state.styleId = "style-001";
    state.uploadedFabrics.push({ id: "local-fabric-test", artNo: "LOCAL-F-001", name: "测试面料", image: "local-image.png", local: true });
    state.fabricId = "local-fabric-test";
    combine();
    ({ comboId: state.comboId, generating: state.generating, designCount: state.designHistory.length });
  `, context);
  assert.match(result.comboId, /^local-combo-style-001-local-fabric-test$/);
  assert.equal(result.designCount, 1);
});

test("uploaded style can be added as a base look", () => {
  const context = createAppContext();
  const result = vm.runInContext(`
    state.uploadedStyles.push({ id: "local-style-test", sampleNo: "LOCAL-S-001", name: "测试款式", image: "local-style.png", local: true });
    addBaseStyle("local-style-test");
    ({ comboId: state.comboId, styleId: state.styleId, designCount: state.designHistory.length });
  `, context);
  assert.deepEqual({ ...result }, { comboId: "base-local-style-test", styleId: "local-style-test", designCount: 1 });
});

test("scanning a style preserves the selected fabric and creates its combination", () => {
  const context = createAppContext();
  const result = vm.runInContext(`
    state.view = "studio";
    state.fabricId = "fabric-006";
    applyScannedItem("style", "style-003", "SM-26003");
    ({ styleId: state.styleId, fabricId: state.fabricId, comboId: state.comboId });
  `, context);

  assert.deepEqual(
    { ...result },
    { styleId: "style-003", fabricId: "fabric-006", comboId: "combo-style-003-fabric-006" }
  );
});

test("scanning a fabric preserves the selected style and creates its combination", () => {
  const context = createAppContext();
  const result = vm.runInContext(`
    state.view = "studio";
    state.styleId = "style-003";
    applyScannedItem("fabric", "fabric-006", "SU260801-06");
    ({ styleId: state.styleId, fabricId: state.fabricId, comboId: state.comboId });
  `, context);

  assert.deepEqual(
    { ...result },
    { styleId: "style-003", fabricId: "fabric-006", comboId: "combo-style-003-fabric-006" }
  );
});

test("recommendation-only mode skips the report and opens the dedicated list", () => {
  const context = createAppContext();
  const result = vm.runInContext(`
    state.recommendationMode = "recommendations";
    state.captureTarget = "diagnosis";
    completeCapture();
    ({ view: state.view, reportReady: state.reportReady, html: recommendationListView() });
  `, context);

  assert.equal(result.view, "recommendationList");
  assert.equal(result.reportReady, true);
  assert.match(result.html, /为你匹配的推荐方案/);
  assert.equal((result.html.match(/data-detail-style=/g) || []).length, 6);
});

test("adding another fabric preserves the previous design", () => {
  const context = createAppContext();
  const result = vm.runInContext(`
    state.styleId = "style-002";
    state.fabricId = "fabric-003";
    combine();
    const firstCombo = state.comboId;
    state.fabricId = "fabric-001";
    combine();
    ({ firstCombo, activeCombo: state.comboId, designs: [...state.designHistory] });
  `, context);

  assert.equal(result.firstCombo, "combo-style-002-fabric-003");
  assert.equal(result.activeCombo, "combo-style-002-fabric-001");
  assert.deepEqual(Array.from(result.designs).sort(), [
    "combo-style-002-fabric-001",
    "combo-style-002-fabric-003"
  ]);
});

test("configured fabrics are ordered before unavailable fabrics for the active style", () => {
  const context = createAppContext();
  const result = vm.runInContext(`({
    style1: getOrderedFabrics("style-001").map(item => item.id),
    style2: getOrderedFabrics("style-002").map(item => item.id),
    style3: getOrderedFabrics("style-003").map(item => item.id)
  })`, context);

  assert.equal(result.style1[0], "fabric-002");
  assert.deepEqual(Array.from(result.style2.slice(0, 2)), ["fabric-001", "fabric-003"]);
  assert.deepEqual(Array.from(result.style3.slice(0, 2)), ["fabric-006", "fabric-007"]);
});
