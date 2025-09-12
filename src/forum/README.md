# Forum - 社群討論平台

Forum 是一個功能完整的社群討論平台演示，提供使用者註冊、登入、發文、留言、互動等完整的論壇功能。

## 🎯 主要用途

- **社群討論**: 使用者可以發表文章、回覆留言，參與討論
- **內容管理**: 支援文章分類、標籤、搜尋等內容組織功能
- **使用者互動**: 提供按讚、追蹤、通知等社交互動功能
- **內容審核**: 包含使用者權限管理與內容審核機制

## ✨ 核心功能

### 👤 使用者系統
- **註冊與登入**: 完整的使用者認證系統
- **個人檔案**: 使用者資料管理與設定
- **權限管理**: 不同使用者角色與權限控制
- **社交功能**: 追蹤其他使用者、查看活動

### 📝 內容管理
- **發表文章**: 豐富的文章編輯功能
- **留言系統**: 階層式留言與回覆
- **標籤分類**: 靈活的內容分類與標籤系統
- **內容搜尋**: 全文搜尋與進階篩選

### 💬 互動功能
- **按讚系統**: 文章與留言按讚功能
- **通知中心**: 即時通知與訊息提醒
- **追蹤功能**: 追蹤使用者與主題
- **書籤收藏**: 收藏感興趣的內容

### 🔍 內容發現
- **熱門排序**: 依照互動度排序內容
- **時間排序**: 最新發表與更新內容
- **分類瀏覽**: 依照主題分類瀏覽
- **個人化推薦**: 基於使用者興趣推薦內容

## 🏗️ 技術架構

### 資料層 (`data/`)
```typescript
client.ts              // SQLite 資料庫客戶端
session.ts            // 使用者會話管理
user.ts               // 使用者資料操作
post.ts               // 文章資料操作
comment.ts            // 留言資料操作
postInteraction.ts    // 文章互動功能
commentInteraction.ts // 留言互動功能
notification.ts       // 通知系統
tag.ts                // 標籤系統
postSearch.ts         // 文章搜尋功能
userInteraction.ts    // 使用者互動功能
```

### 查詢層 (`hooks/`)
- React Query hooks 包裝所有資料操作
- 統一的快取策略與狀態管理
- 自動重新整理與錯誤重試

### 元件層 (`components/`)
```
components/
├── AppWrapper.tsx       # 應用程式包裝器
├── appbar/             # 導航列組件
├── home/               # 首頁組件
├── postElement/        # 文章相關組件
├── commentElement/     # 留言相關組件
├── userElement/        # 使用者相關組件
├── search/             # 搜尋功能組件
└── shared/             # 共用組件
```

### 頁面層 (`pages/`)
```
pages/
├── App.tsx             # 主應用程式
├── login/              # 登入頁面
├── register/           # 註冊頁面
├── posts/              # 文章列表頁面
├── post/               # 單一文章頁面
├── edit/               # 文章編輯頁面
├── users/              # 使用者列表頁面
├── search/             # 搜尋結果頁面
└── verify/             # 帳號驗證頁面
```

## 🗄️ 資料庫設計

Forum 使用 SQLite 儲存所有論壇資料：

```typescript
// 資料庫連接設定
import DB_PATH from "@/assets/db/forum.db?url";
import { SQLiteClient } from "@/utils/SQLiteClient";

export const sqlite = new SQLiteClient({
  dbPath: DB_PATH,
  storageKey: "sqlite-db-forum",
});
```

### 主要資料表
- **users**: 使用者資料與認證資訊
- **posts**: 文章內容與元資料
- **comments**: 留言與回覆
- **post_interactions**: 文章互動記錄
- **comment_interactions**: 留言互動記錄
- **notifications**: 通知與訊息
- **tags**: 標籤與分類
- **user_follows**: 使用者追蹤關係

## 🎨 使用者介面

### 主題設計
- 採用橘色/藍色主題 (#FF772E, #2f5d6f)
- 現代化的卡片式設計
- 響應式布局適配各種裝置

### 使用者體驗
- 即時更新與通知
- 流暢的頁面轉換
- 直觀的操作介面
- 無障礙設計考量

## 🔐 安全性功能

### 認證系統
- 安全的密碼雜湊
- 會話管理與逾時
- 防範常見攻擊

### 內容安全
- SQL 注入防護
- XSS 攻擊防護
- 輸入驗證與過濾

## 🚀 快速開始

1. **啟動開發伺服器**
   ```bash
   npm run dev
   ```

2. **存取論壇**
   開啟瀏覽器並前往論壇頁面

3. **開始使用**
   - 註冊新帳號或登入
   - 瀏覽現有文章
   - 發表新文章
   - 參與討論互動

## 📱 功能特色

### 響應式設計
- 桌面版與行動版最佳化
- 觸控友善的操作介面
- 自適應版面配置

### 即時互動
- 即時通知更新
- 動態內容載入
- 流暢的使用者體驗

### 社交功能
- 使用者檔案與追蹤
- 社群活動追蹤
- 個人化內容推薦

## 🛠️ 開發指南

### 表單處理
```typescript
// 使用 TanStack Form 與 Zod 驗證
const formElementsSchema = {
  title: z.string().min(1, "標題不能為空"),
  content: z.string().min(10, "內容至少需要 10 個字元"),
};

const formSchema = z.object(formElementsSchema);
```

### 資料查詢
```typescript
// 使用 React Query hooks
const { data: posts, isLoading } = usePosts(filters);
const createPostMutation = useCreatePost();

// 發表新文章
const handleSubmit = async (postData) => {
  const result = await createPostMutation.mutateAsync(postData);
  if (result.error) {
    console.error("發表文章失敗", result.error);
    return;
  }
  console.log("文章發表成功");
};
```

### URL 狀態管理
```typescript
// URL 參數與 UI 狀態同步
const { searchParams, updateSearchParams } = useUrl();
const currentTopic = searchParams.get("topic");
const orderBy = searchParams.get("orderBy") ?? "created_at";

// 更新篩選條件
const handleTopicChange = (topic: string) => {
  updateSearchParams({ topic });
};
```

## 📝 開發注意事項

- 遵循專案的統一錯誤處理模式
- 使用 `console.log()` 進行使用者通知
- 確保所有表單都有適當的驗證
- 保持 URL 狀態與 UI 狀態的同步
- 實作適當的載入狀態與錯誤處理

## 🔄 狀態管理

### React Query 設定
- 5 分鐘的 staleTime 設定
- 自動背景重新整理
- 樂觀更新與錯誤回滾

### 快取策略
- 智慧型快取失效
- 相關資料自動更新
- 離線狀態處理

---

Forum 展示了如何建構一個功能完整的社群討論平台，包含使用者管理、內容管理、社交互動等現代論壇的所有核心功能。