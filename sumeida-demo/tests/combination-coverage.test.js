const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const assert = require("node:assert/strict");
const vm = require("node:vm");

const projectRoot = path.resolve(__dirname, "..");
const configSource = fs.readFileSync(path.join(projectRoot, "sumeida-config.js"), "utf8");
const context = { window: {} };
vm.runInNewContext(configSource, context);
const config = context.window.SUMEIDA_CONFIG;

test("configured style and fabric relationships are explicit and unique", () => {
  const configuredPairs = new Set(config.combinations.map(item => `${item.styleId}:${item.fabricId}`));

  assert.equal(config.combinations.length, 5);
  assert.equal(configuredPairs.size, config.combinations.length);

  for (const combination of config.combinations) {
    assert.ok(config.styles.some(item => item.id === combination.styleId), `Unknown style ${combination.styleId}`);
    assert.ok(config.fabrics.some(item => item.id === combination.fabricId), `Unknown fabric ${combination.fabricId}`);
  }
});

test("every configured relationship references existing media", () => {
  for (const combination of config.combinations) {
    const mediaPaths = [
      combination.image,
      combination.video,
      combination.realtime,
      ...Object.values(combination.tryonByBackground)
    ];

    for (const mediaPath of mediaPaths) {
      assert.ok(fs.existsSync(path.join(projectRoot, mediaPath)), `Missing asset ${mediaPath} for ${combination.id}`);
    }
  }
});

test("only evidenced outfit relationships expose image try-on results", () => {
  const tryOnReady = config.combinations.filter(item => Object.keys(item.tryonByBackground).length);
  assert.deepEqual(Array.from(tryOnReady, item => item.id), [
    "combo-style-001-fabric-002",
    "combo-style-003-fabric-006"
  ]);
  assert.ok(tryOnReady.every(item => item.pairingItemId));
});
