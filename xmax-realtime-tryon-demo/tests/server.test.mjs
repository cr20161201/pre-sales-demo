import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { configuredApiKey, listGarments, temporaryKeyRequest } from "../server.mjs";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("listGarments ignores non-images and maps metadata", () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "xmax-garments-"));
  fs.writeFileSync(path.join(directory, "look-02.png"), "image");
  fs.writeFileSync(path.join(directory, "look-01.JPG"), "image");
  fs.writeFileSync(path.join(directory, "notes.txt"), "ignore");
  fs.writeFileSync(path.join(directory, "garments.json"), JSON.stringify({
    "look-01.JPG": { id: "first-look", name: "第一套", prompt: "第一套提示词" }
  }));

  const garments = listGarments(directory);
  assert.equal(garments.length, 2);
  assert.deepEqual(garments[0], {
    id: "first-look",
    name: "第一套",
    image: "/assets/garments/look-01.JPG",
    file: "look-01.JPG",
    prompt: "第一套提示词"
  });
  assert.equal(garments[1].name, "look-02");
  assert.equal(garments[1].prompt, null);
});

test("temporaryKeyRequest uses defaults and environment overrides", () => {
  assert.deepEqual(temporaryKeyRequest({}), { expireSeconds: 1800, pointsLimit: 3000 });
  assert.deepEqual(temporaryKeyRequest({ XMAX_KEY_EXPIRE_SECONDS: "600", XMAX_KEY_POINTS_LIMIT: "800" }), { expireSeconds: 600, pointsLimit: 800 });
});

test("configuredApiKey rejects empty and placeholder values", () => {
  assert.equal(configuredApiKey({}), "");
  assert.equal(configuredApiKey({ XMAX_API_KEY: "uk_replace_with_your_key" }), "");
  assert.equal(configuredApiKey({ XMAX_API_KEY: "  uk-real-key  " }), "uk-real-key");
});

test("secret and realtime integration boundaries remain explicit", () => {
  const ignore = fs.readFileSync(path.join(projectRoot, ".gitignore"), "utf8");
  const server = fs.readFileSync(path.join(projectRoot, "server.mjs"), "utf8");
  const client = fs.readFileSync(path.join(projectRoot, "src", "main.js"), "utf8");

  assert.match(ignore, /^\.env$/m);
  assert.match(server, /process\.env/);
  assert.doesNotMatch(client, /uk[-_][A-Za-z0-9]/);
  assert.match(client, /uploadAndCheckImage/);
  assert.match(client, /session\.set/);
  assert.match(client, /session\?\.disconnect|session\.disconnect/);
  assert.match(client, /screen: "entry"/);
  assert.match(client, /screen = "realtime"/);
});
