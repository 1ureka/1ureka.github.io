# Assistant - AI 智能助手

Assistant 是一個 AI 驅動的智能助手演示，專門設計用於文件查詢與問答。本模組展示了如何整合 RAG (Retrieval-Augmented Generation) 技術，提供準確且相關的 AI 回應。

## 🎯 主要用途

- **文件查詢**: 透過自然語言查詢大型文件庫
- **AI 問答**: 基於 RAG 技術的智能問答系統
- **多語言支援**: 支援繁體中文查詢與回應
- **即時對話**: 流式回應與即時互動體驗

## ✨ 核心功能

### 🤖 AI 對話介面
- **自然語言查詢**: 支援繁體中文問題輸入
- **流式回應**: 即時顯示 AI 回應內容
- **對話歷史**: 保存與管理對話記錄
- **上下文理解**: 維持對話上下文的連貫性

### 🔍 智能檢索
- **語意搜尋**: 基於向量化的語意理解
- **相關性排序**: 智能排序最相關的文件片段
- **多模態檢索**: 支援文字、代碼等多種內容類型
- **精確定位**: 快速定位相關資訊源

### ⚙️ API 整合
- **外部 API 連接**: 彈性的 API 端點設定
- **狀態監控**: 即時監控 API 服務狀態
- **錯誤處理**: 完善的錯誤處理與重試機制
- **效能優化**: 請求快取與批次處理

### 🎛️ 使用者設定
- **API 設定**: 自訂 API 端點與參數
- **介面偏好**: 個人化介面設定
- **對話管理**: 對話記錄的匯入匯出
- **效能調整**: 回應速度與品質平衡

## 🏗️ 技術架構

### 資料層 (`data/`)
```typescript
api.ts                // API 通訊與資料處理
```

### 查詢層 (`hooks/`)
- API 狀態管理 hooks
- 對話狀態管理
- 設定同步 hooks
- 錯誤處理 hooks

### 元件層 (`components/`)
```
components/
├── AppWrapper.tsx      # 應用程式包裝器
├── content/           # 主要內容組件
│   ├── Background.tsx  # 背景與視覺效果
│   ├── Header.tsx     # 頁面標頭
│   ├── Main.tsx       # 主要對話介面
│   └── Settings.tsx   # 設定面板
└── shared/            # 共用組件
```

### 頁面層 (`pages/`)
```
pages/
├── App.tsx            # 主應用程式
├── index.html         # HTML 入口點
└── main.tsx          # React 根組件
```

## 🔌 API 整合

Assistant 設計為與外部 AI 服務整合：

```typescript
// API 連接設定
interface ApiInfo {
  service: string;
  version: string;
  status: "idle" | "loading" | "error" | "ok";
  endpoints: ApiEndpoint[];
}

// 查詢 API
const queryBlenderRAG = (question: string, options: QueryOptions) => {
  // Server-Sent Events (SSE) 流式回應
  const eventSource = new EventSource(`${apiUrl}/query?question=${encodedQuestion}`);
  
  eventSource.onmessage = (event) => {
    const text = event.data;
    onMessage(text);
  };
};
```

### 支援的 API 特性
- **Server-Sent Events**: 流式資料傳輸
- **狀態監控**: API 健康檢查
- **錯誤重試**: 自動重試機制
- **快取策略**: 智能快取管理

## 🎨 使用者介面

### 主題設計
- 採用紫色主題 (#8179d2)
- 現代化的對話介面設計
- 優雅的動畫與轉場效果

### 對話體驗
- **流暢互動**: 即時打字效果
- **視覺回饋**: 載入指示與狀態提示
- **響應式設計**: 適配各種螢幕尺寸
- **無障礙支援**: 鍵盤導航與螢幕閱讀器

## 🚀 快速開始

1. **啟動開發伺服器**
   ```bash
   npm run dev
   ```

2. **存取 Assistant**
   開啟瀏覽器並前往 AI 助手頁面

3. **設定 API**
   - 點擊設定按鈕
   - 輸入 API 端點 URL
   - 測試連接狀態

4. **開始對話**
   - 輸入您的問題
   - 等待 AI 回應
   - 檢視對話歷史

## 📋 使用範例

### 基本查詢
```typescript
// 發送查詢問題
const question = "如何在 Blender 中建立材質？";
const response = await queryAPI(question);

// 處理流式回應
queryBlenderRAG(question, {
  onMessage: (text) => {
    // 即時顯示回應文字
    setResponse(prev => prev + text);
  },
  onComplete: () => {
    // 回應完成處理
    console.log("查詢完成");
  },
  onError: (error) => {
    console.error("查詢失敗", error);
  }
});
```

### API 狀態檢查
```typescript
// 檢查 API 服務狀態
const apiInfo = await getApiInfo(apiUrl);
if (apiInfo?.status === "ok") {
  console.log("API 服務正常");
} else {
  console.error("API 服務異常");
}
```

## 🔧 設定選項

### API 設定
- **端點 URL**: 自訂 API 服務地址
- **超時設定**: 請求超時時間
- **重試次數**: 失敗重試設定
- **快取策略**: 回應快取設定

### 介面設定
- **主題模式**: 明亮/深色模式
- **字體大小**: 可調整文字大小
- **動畫效果**: 啟用/停用動畫
- **音效提示**: 聲音回饋設定

## 🛠️ 開發指南

### 新增 API 功能
```typescript
// 實作新的 API 功能
const newApiFunction = async (params: ApiParams) => {
  const { data, error } = await tryCatch(fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  }));
  
  if (error) {
    console.error("API 請求失敗", error);
    return null;
  }
  
  return data;
};
```

### 狀態管理
```typescript
// 使用 zustand 進行狀態管理
const useMetadataStore = create<MetadataState>((set) => ({
  apiUrl: "http://localhost:7860",
  setApiUrl: (url) => set({ apiUrl: url }),
  // ... 其他狀態
}));
```

### 錯誤處理
```typescript
// 統一的錯誤處理模式
const handleApiError = (error: Error) => {
  console.error(`API 操作失敗: ${error.message}`);
  // 顯示使用者友善的錯誤訊息
};
```

## 🌟 進階功能

### RAG 整合
- **向量檢索**: 語意相似度搜尋
- **文件分段**: 智能文本分割
- **上下文組合**: 動態提示詞組合
- **回應生成**: LLM 驅動的回答生成

### 效能優化
- **請求快取**: 智能快取策略
- **批次處理**: 批量請求優化
- **懶載入**: 按需載入資源
- **記憶體管理**: 高效的狀態管理

## 📚 參考資源

本 Assistant 模組基於 [1ureka.blender.docs.rag](https://github.com/1ureka/1ureka.blender.docs.rag) 專案的前端實作，該專案提供：

- **完整的 RAG 後端服務**: 文件處理與向量檢索
- **Blender 文件支援**: 專門針對 Blender 官方文件優化
- **Docker 部署方案**: 容器化的部署解決方案
- **多語言支援**: 繁體中文查詢與回應

## 📝 開發注意事項

- 確保 API 端點的正確設定
- 處理網路延遲與連接錯誤
- 實作適當的載入狀態指示
- 遵循專案的錯誤處理模式
- 保持對話狀態的持久化

---

Assistant 展示了如何建構現代化的 AI 助手介面，整合 RAG 技術提供智能文件查詢功能，為使用者提供準確且有用的資訊檢索體驗。