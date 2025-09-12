# DataHub - 資料管理中心

DataHub 是一個功能完整的資料管理與分析平台演示，提供直觀的介面來管理 SQLite 資料庫、執行查詢、檢視資料分析與視覺化圖表。

## 🎯 主要用途

- **資料庫管理**: 瀏覽、查詢、下載 SQLite 資料庫
- **資料分析**: 提供資料庫統計資訊與度量分析
- **資料視覺化**: 圖表展示與資料呈現
- **資料探索**: 互動式資料瀏覽與搜尋功能

## ✨ 核心功能

### 📊 資料庫概覽
- 查看資料庫大小與基本資訊
- 列出所有資料表、檢視、索引與觸發器
- 統計各表的資料筆數
- 資料庫結構分析

### 🔍 資料查詢與瀏覽
- 互動式 SQL 查詢執行
- 表格資料分頁瀏覽
- 進階篩選與排序功能
- 資料搜尋與條件篩選

### 📈 資料分析與視覺化
- 自動產生統計圖表
- 資料分佈分析
- 趨勢圖與統計報表
- 可自訂的視覺化組件

### 💾 資料匯出
- 下載完整資料庫檔案
- 匯出查詢結果
- 支援多種格式輸出

## 🏗️ 技術架構

### 資料層 (`data/`)
```typescript
// SQLite 資料庫操作
client.ts     // SQLite 客戶端設定
read.ts       // 資料讀取與查詢功能
select.ts     // 資料選擇與篩選
update.ts     // 資料更新操作
```

### 查詢層 (`hooks/`)
- React Query 包裝的資料存取 hooks
- 快取管理與狀態同步
- 錯誤處理與載入狀態

### 元件層 (`components/`)
```
components/
├── AppWrapper.tsx      # 應用程式包裝器
├── appbar/            # 頂部導航列
├── aside/             # 側邊欄組件
├── content/           # 主要內容區域
├── table/             # 表格組件
└── chart/             # 圖表組件
```

### 頁面層 (`pages/`)
- 主要應用頁面組件
- 路由設定與導航
- 頁面布局與結構

## 🗄️ 資料庫整合

DataHub 使用 SQLite.js 進行前端資料庫操作：

```typescript
// 資料庫連接設定
import DB_PATH from "@/assets/db/datahub.db?url";
import { SQLiteClient } from "@/utils/SQLiteClient";

export const sqlite = new SQLiteClient({
  dbPath: DB_PATH,
  storageKey: "sqlite-db-datahub",
});
```

### 主要特色
- **IndexedDB 快取**: 自動快取資料庫以提升效能
- **網路模擬**: 500ms 延遲模擬真實 API 體驗
- **型別安全**: 完整的 TypeScript 型別定義
- **錯誤處理**: 統一的錯誤處理機制

## 🎨 使用者介面

### 響應式設計
- 支援桌面與行動裝置
- 自適應字體大小
- 流暢的使用者體驗

### 主題設計
- 採用 Teal 主題配色 (#66cccc)
- Material-UI 組件系統
- 一致的視覺風格

### 互動功能
- 即時資料更新
- 流暢的頁面轉換
- 直觀的操作介面

## 🚀 快速開始

1. **啟動開發伺服器**
   ```bash
   npm run dev
   ```

2. **存取 DataHub**
   開啟瀏覽器並前往資料管理頁面

3. **開始探索資料**
   - 瀏覽資料庫概覽
   - 執行 SQL 查詢
   - 檢視分析圖表
   - 下載資料

## 🔧 技術細節

### 依賴套件
- **React**: 使用者介面框架
- **Material-UI**: UI 組件庫
- **React Query**: 資料狀態管理
- **SQLite.js**: 前端資料庫引擎
- **TypeScript**: 型別安全

### 效能優化
- 資料查詢快取
- 懶載入與分頁
- 虛擬化長列表
- 記憶化昂貴運算

## 🛠️ 開發指南

### 新增功能
1. 在 `data/` 資料夾建立純函數
2. 在 `hooks/` 建立 React Query 包裝器
3. 在 `components/` 建立 UI 組件
4. 遵循專案的程式碼規範

### 資料庫操作
```typescript
// 使用參數化查詢確保安全性
const result = await sqlite.exec(
  "SELECT * FROM table_name WHERE id = $id",
  { $id: userId }
);

// 啟用外鍵約束
await sqlite.exec("PRAGMA foreign_keys = ON;");
```

### 錯誤處理
```typescript
import { tryCatch } from "@/utils/tryCatch";

const { data, error } = await tryCatch(databaseOperation());
if (error) {
  console.error("資料庫操作失敗", error);
  return;
}
```

## 📝 注意事項

- 遵循專案統一的錯誤處理模式
- 使用 `console.log()` 而非直接呼叫 toast 通知
- 保持 URL 狀態與 UI 狀態同步
- 確保所有資料庫操作都有適當的錯誤處理

---

DataHub 展示了如何在前端環境中建構功能完整的資料管理應用程式，同時保持良好的使用者體驗與程式碼品質。