import { readFileSync, readdirSync, existsSync } from "fs";
import { join, extname, dirname } from "path";
import { fileURLToPath } from "url";

// src 目錄的相對路徑
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const srcDir = join(__dirname, "src");

// 允許的文件副檔名白名單（只統計這些類型的文件）
const allowedExtensions = [
  ".js",
  ".jsx",
  ".ts",
  ".tsx", // JavaScript/TypeScript
  ".html",
  ".htm",
  ".css",
  ".scss",
  ".sass",
  ".less", // 網頁相關
  ".json",
  ".xml",
  ".md",
  ".txt", // 文件格式
  ".vue",
  ".svelte", // 框架相關
  ".py",
  ".rb",
  ".php",
  ".java",
  ".c",
  ".cpp",
  ".h",
  ".cs", // 其他程式語言
];

// 檢查文件是否為允許的類型
function isAllowedFile(filePath) {
  const ext = extname(filePath).toLowerCase();
  return allowedExtensions.includes(ext);
}

// 計算文件行數的函數
function countLinesInFile(filePath) {
  try {
    const content = readFileSync(filePath, "utf8");
    // 計算換行符數量
    const lines = content.split("\n").length;
    return lines;
  } catch (error) {
    console.error(`讀取檔案 ${filePath} 出錯:`, error.message);
    return 0;
  }
}

// 遞歸統計目錄中所有文件的行數
function countLinesInDirectory(dir) {
  let totalLines = 0;
  let fileCount = 0;
  let skippedCount = 0;

  try {
    const entries = readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);

      if (entry.isDirectory()) {
        // 如果是目錄，則遞歸處理
        const { lines, files, skipped } = countLinesInDirectory(fullPath);
        totalLines += lines;
        fileCount += files;
        skippedCount += skipped;
      } else if (entry.isFile()) {
        // 如果是文件，檢查是否在白名單中
        if (isAllowedFile(fullPath)) {
          const lines = countLinesInFile(fullPath);
          console.log(`${fullPath}: ${lines} 行`);
          totalLines += lines;
          fileCount += 1;
        } else {
          skippedCount += 1;
        }
      }
    }
  } catch (error) {
    console.error(`讀取目錄 ${dir} 出錯:`, error.message);
  }

  return { lines: totalLines, files: fileCount, skipped: skippedCount };
}

// 檢查 src 目錄是否存在
if (!existsSync(srcDir)) {
  console.error(`錯誤: src 目錄不存在 (${srcDir})`);
  process.exit(1);
}

console.log(`開始統計行數（僅包含以下副檔名：${allowedExtensions.join(", ")}）`);

// 執行統計
const result = countLinesInDirectory(srcDir);
console.log(`\n總計: ${result.files} 個檔案, ${result.lines} 行程式碼`);
console.log(`跳過: ${result.skipped} 個不在白名單中的檔案`);
