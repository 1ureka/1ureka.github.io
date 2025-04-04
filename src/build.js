import fs from "fs";
import path from "path";

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
    console.warn(`⚠️ 檔案不存在：${fromPath}`);
    return;
  }

  const toDir = path.dirname(toPath);
  fs.mkdirSync(toDir, { recursive: true });
  fs.renameSync(fromPath, toPath);

  const relativeFromPath = fromPath.replace(distRoot, "dist");
  const relativeToPath = toPath.replace(distRoot, "dist");
  console.log(`✅ 移動: ${relativeFromPath} ➜ ${relativeToPath}`);
}

// 對每個路徑 key 做對應搬移
Object.keys(prod).forEach((key) => {
  moveHtml(dev[key], prod[key]);
});

// 移除 /dist/src 資料夾
const srcDir = path.join(distRoot, "src");
if (fs.existsSync(srcDir)) {
  fs.rmSync(srcDir, { recursive: true, force: true });
  console.log("🧹 清除: /dist/src");
}

// 清空 /deploy 資料夾
const deployDir = path.resolve("deploy");
if (fs.existsSync(deployDir)) {
  // 讀取 deploy 目錄中除了 .git 之外的所有檔案和資料夾
  const items = fs.readdirSync(deployDir);

  // 刪除每個非 .git 的項目
  for (const item of items) {
    if (item !== ".git") {
      const itemPath = path.join(deployDir, item);
      fs.rmSync(itemPath, { recursive: true, force: true });
      console.log(`🧹 清除: /deploy/${item}`);
    }
  }
} else {
  fs.mkdirSync(deployDir, { recursive: true });
  console.log(`📁 創建: /deploy 資料夾`);
}

// 移動 /dist 資料夾內容到 /deploy 資料夾
fs.mkdirSync(deployDir, { recursive: true });
if (fs.existsSync(distRoot)) {
  // 複製所有檔案到 deploy 資料夾
  fs.cpSync(distRoot, deployDir, { recursive: true });
  console.log(`📦 複製: /dist ➜ /deploy`);
}
