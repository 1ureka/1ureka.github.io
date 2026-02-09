import fs from "fs";
import path from "path";

/**
 * 簡單的日誌工具，提供不同顏色的輸出
 */
const Log = {
  success: (msg) => console.log(`\x1b[32m[DONE]\x1b[0m ${msg}`),
  info: (msg) => console.log(`\x1b[34m[INFO]\x1b[0m ${msg}`),
  warn: (msg) => console.log(`\x1b[33m[WARN]\x1b[0m ${msg}`),
  step: (msg) => console.log(`\x1b[36m > \x1b[0m${msg}`),
  header: (msg) => console.log(`\n\x1b[1m\x1b[35m── ${msg} ──\x1b[0m`),
};

// --------------------------------------------------------------------------------------

// 載入 routes.json
const routesJsonPath = path.resolve("src/routes.json");
const routesJson = JSON.parse(fs.readFileSync(routesJsonPath, "utf8"));

const entries = Object.entries(routesJson);
const dev = Object.fromEntries(entries.map(([key, value]) => [key, value.dev]));
const prod = Object.fromEntries(entries.map(([key, value]) => [key, value.prod]));
const distRoot = path.resolve("dist");

/**
 * 移除路徑前的 "/" 符號
 * @param {string} p
 * @returns {string}
 */
function stripLeadingSlash(p) {
  return p.startsWith("/") ? p.slice(1) : p;
}

/**
 * 移動 HTML 檔案
 * @param {string} fromRelative
 * @param {string} toRelative
 */
function moveHtml(fromRelative, toRelative) {
  const fromPath = path.join(distRoot, stripLeadingSlash(fromRelative));
  const toPath = path.join(distRoot, stripLeadingSlash(toRelative), "index.html");

  if (!fs.existsSync(fromPath)) {
    Log.warn(`File missing: ${fromPath}`);
    return;
  }

  const toDir = path.dirname(toPath);
  fs.mkdirSync(toDir, { recursive: true });
  fs.renameSync(fromPath, toPath);

  const relativeFromPath = fromPath.replace(distRoot, "dist");
  const relativeToPath = toPath.replace(distRoot, "dist");
  Log.success(`Moved: ${relativeFromPath} ➜ ${relativeToPath}`);
}

// --------------------------------------------------------------------------------------

// 對每個路徑 key 做對應搬移
Object.keys(prod).forEach((key) => {
  moveHtml(dev[key], prod[key]);
});

// 移除搬移後殘留的 /dist/src 資料夾
const srcDir = path.join(distRoot, "src");
if (fs.existsSync(srcDir)) {
  fs.rmSync(srcDir, { recursive: true, force: true });
  Log.success("Cleared: /dist/src");
}

Log.header("Build Success");
Log.info(`Final artifacts are ready in: \x1b[1m${distRoot}\x1b[0m`);
