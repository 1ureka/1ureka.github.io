# 全端模擬架構指南：靜態網站的互動式體驗

本文件說明此專案如何在 **純靜態部署**（GitHub Pages）的前提下，完整模擬全端 Web 應用的互動體驗，以及開發時需注意的事項。

---

## 核心概念

本專案是一個 **作品集展示網站**，透過以下技術在瀏覽器端模擬出真實後端的行為：

| 傳統全端應用                       | 本專案的模擬方式                      |
| ---------------------------------- | ------------------------------------- |
| 後端資料庫（PostgreSQL、MySQL 等） | 瀏覽器端 SQLite（sql.js WebAssembly） |
| 後端 API 伺服器                    | `data/` 層的純異步函數                |
| 網路請求延遲                       | 人工延遲 500ms（`TEST_DELAY`）        |
| Session / Cookie 認證              | `localStorage` 儲存 Session           |
| API 快取與狀態管理                 | `@tanstack/react-query`               |
| 資料持久化                         | IndexedDB（`idb-keyval`）             |
| 跨分頁資料同步                     | `localStorage` 時間戳機制             |
| URL 路由                           | 自訂 `useUrl()` hook + Vite MPA       |

---

## 架構分層

每個模組都嚴格遵循三層架構，模擬真實的前後端分離：

```
元件層 (components/)          ← UI 呈現，調用 hooks
    ↓ 使用
Hooks 層 (hooks/)             ← React Query 包裝，管理快取與狀態
    ↓ 調用
資料層 (data/)                ← 模擬後端 API，直接操作 SQLite
    ↓ 操作
SQLiteClient                  ← 瀏覽器端資料庫引擎
    ↓ 持久化
IndexedDB + localStorage      ← 瀏覽器端儲存
```

### 為什麼要分層？

即使前後端都在瀏覽器內執行，嚴格分層有兩個目的：

1. **展示架構能力**：作品集的目標是展示「如果這是真的全端應用，結構會長什麼樣」
2. **可替換性**：`data/` 層可以被替換為真正的 fetch API 呼叫，不需改動上層程式碼

---

## 一、資料層（data/）— 模擬後端 API

### SQLiteClient 核心機制

`src/utils/SQLiteClient.ts` 是整個模擬系統的基礎：

```typescript
// 每個模組建立自己的資料庫客戶端
// src/forum/data/client.ts
import DB_PATH from "@/assets/db/forum.db?url";
import { SQLiteClient } from "@/utils/SQLiteClient";

export const sqlite = new SQLiteClient({
  dbPath: DB_PATH, // Vite 將 .db 檔打包為靜態資源 URL
  storageKey: "sqlite-db-forum", // IndexedDB 快取 key
});
```

**運作流程**：

1. 首次訪問：從靜態資源 `fetch` 下載 `.db` 檔 → 載入到 sql.js 引擎 → 存入 IndexedDB
2. 後續訪問：直接從 IndexedDB 讀取（跳過網路請求）
3. 每次寫入：執行 SQL → 將整個資料庫快照存回 IndexedDB
4. 跨分頁同步：寫入時更新 `localStorage.__db_timestamp__`，其他分頁偵測到變化後重新載入

### 開發注意事項

#### ⚠ data/ 層禁止引入 React

`data/` 資料夾中的函數必須是 **純異步函數**，不可引入任何 React 相關模組：

```typescript
// ✔ 正確：純函數，只依賴 SQLiteClient
import { sqlite } from "./client";
export const fetchPosts = async (params) => {
  const result = await sqlite.exec("SELECT ...", { ... });
  return result;
};

// ✘ 錯誤：在 data/ 層使用 React hooks
import { useState } from "react";  // 禁止！
```

#### ⚠ 務必使用參數化查詢

雖然是瀏覽器端資料庫，仍應遵循安全的 SQL 寫法，展示正確的開發習慣：

```typescript
// ✔ 正確：參數化查詢
const result = await sqlite.exec("SELECT * FROM users WHERE id = $userId", { $userId: userId });

// ✘ 錯誤：字串拼接（即使在前端也不應這樣寫）
const result = await sqlite.exec(`SELECT * FROM users WHERE id = ${userId}`);
```

#### ⚠ 啟用外鍵約束

`SQLiteClient.exec()` 在每次執行前會自動執行 `PRAGMA foreign_keys = ON`，確保資料完整性。開發者不需手動處理，但設計資料表時應善用外鍵約束。

#### ⚠ 人工延遲的用途

`TEST_DELAY`（500ms）是刻意設計的：

- 確保 loading skeleton、spinner、進度條等 UX 元素能被真實看到
- 模擬實際網路環境，驗證非同步 UI 狀態處理是否正確
- 使用 `noDelay` 參數可跳過延遲（用於 server-side 模擬場景，如 `getSession({ server: true })`）

---

## 二、Hooks 層（hooks/）— React Query 快取

### 標準查詢模式

```typescript
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/forum/data/post";

const staleTime = 1000 * 60 * 5; // 5 分鐘

export const usePosts = (params: FetchPostsParams) => {
  return useQuery({
    queryKey: ["posts", params],
    queryFn: () => fetchPosts(params),
    staleTime,
  });
};
```

### 標準 Mutation 模式

```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/forum/data/post";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSettled: () => {
      // 寫入後失效所有相關快取
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["postCounts"] });
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
};
```

### 無限捲動模式

```typescript
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfinitePosts = (params) => {
  const query = useInfiniteQuery({
    queryKey: ["infinitePosts", params],
    queryFn: ({ pageParam: page }) => fetchPosts({ page, ...params }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime,
  });

  // 監聽捲動事件，距離底部 350px 時自動載入下一頁
  useEffect(() => {
    const el = document.getElementById("scroll-area");
    const onScroll = () => {
      if (el.scrollHeight - el.scrollTop - el.clientHeight < 350) {
        query.fetchNextPage();
      }
    };
    el?.addEventListener("scroll", onScroll);
    return () => el?.removeEventListener("scroll", onScroll);
  }, [query.fetchNextPage, query.hasNextPage, query.isFetchingNextPage]);

  return query;
};
```

### 開發注意事項

#### ⚠ Query Key 命名規則

- 使用單數實體名：`["post", id]`，不是 `["getPost", id]`
- 過濾條件作為第二個元素：`["posts", { topic, page }]`
- Mutation 成功後必須 `invalidateQueries` 所有受影響的 key

#### ⚠ staleTime 統一為 5 分鐘

所有 query 的 `staleTime` 統一使用 `1000 * 60 * 5`（5 分鐘）或 `1 * 60 * 1000`（1 分鐘），避免時間不一致造成混亂。

#### ⚠ hooks/ 層只包裝 data/ 層

hooks 不應包含複雜的資料處理邏輯，它的職責僅是：

- 為 `data/` 函數加上 React Query 快取管理
- 定義 query key
- 處理 mutation 後的快取失效

---

## 三、Session / 認證模擬

### 實作方式

Session 完全在瀏覽器端模擬，使用 `localStorage` 儲存：

```typescript
// 登入流程
const login = async ({ username, password }) => {
  // 1. 以 SHA-256 雜湊密碼
  const hashedPassword = await hashPassword(password);
  // 2. 與資料庫中的雜湊比對
  const result = await sqlite.exec(sql, { $username, $hashedPassword });
  // 3. 成功則將 session 存入 localStorage（含時間戳）
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ ...session, timestamp: Date.now() }));
};

// 驗證流程
const getSession = async () => {
  // 1. 從 localStorage 讀取 session
  // 2. 檢查是否過期（預設 1 小時）
  // 3. 回查資料庫確認使用者仍存在
  // 4. 更新時間戳延長 session
};
```

### 開發注意事項

#### ⚠ 權限檢查在 data/ 層完成

所有需要認證的操作（新增文章、編輯個人檔案等），必須在 `data/` 層呼叫 `getSession()` 驗證，模擬真實後端的中介軟體行為：

```typescript
const createPost = async (params) => {
  const session = await getSession({ server: true }); // server: true 跳過延遲
  if (!session.authenticated) return { error: "未登入" };
  // 繼續執行 INSERT ...
};
```

#### ⚠ 密碼雜湊

使用瀏覽器原生的 `crypto.subtle.digest("SHA-256", data)` 進行密碼雜湊。雖然在真實應用中應使用 bcrypt/PBKDF2，但在純前端環境中 SHA-256 已足夠用於展示。

---

## 四、URL 狀態管理 — 無框架路由

### useUrl() hook

本專案沒有使用 React Router 之類的路由框架，而是自訂了 `useUrl()` hook（`src/hooks/url.ts`）：

```typescript
import { useUrl } from "@/hooks/url";

function MyComponent() {
  const { pathname, searchParams, update, updateSearchParams } = useUrl();

  const currentPath = pathname.get(); // 如 "/forum/posts"
  const topic = searchParams.get("topic"); // 如 "tech"

  // 更新 URL（支援 View Transition API）
  const handleNavigate = () => {
    update("/forum/post", { postId: "42" });
  };
}
```

**核心原理**：

- 攔截 `window.history.pushState` 和 `replaceState`，派發自訂 `locationchange` 事件
- hook 內部追蹤元件實際讀取了哪些 URL 參數（`accessedKeysRef`）
- 只有被訂閱的參數變化時才觸發 re-render，避免無關的重繪
- 整合 View Transition API（`document.startViewTransition`）實現頁面轉場動畫

### 開發注意事項

#### ⚠ MPA 架構 vs SPA 路由

本專案是 **多頁式應用（MPA）**，每個路由是獨立的 HTML 入口。`useUrl()` 用於**同一頁面內的狀態管理**（如 datahub 的分頁切換），而非跨頁面的路由切換。

跨頁面導航使用標準的 `<a href>` 或 `window.location.href`：

```typescript
// 同頁面內的狀態變更 → useUrl()
const { updateSearchParams } = useUrl();
updateSearchParams({ tab: "settings" });

// 跨頁面導航 → 標準連結
<Button href={routes.forum_login}>登入</Button>
```

#### ⚠ datahub 的「偽 SPA」模式

datahub 模組的多個子路由共用同一個 `main.tsx`，透過 `Page.tsx` 根據 `pathname` 動態渲染內容。這是唯一類似 SPA 的模式：

```typescript
// src/datahub/pages/Page.tsx
const elementsMap = {
  [routes.datahub_home]: () => <Dashboard />,
  [routes.datahub_schema]: () => <SchemaView />,
  [routes.datahub_tables]: () => <TablesView />,
};

const Page = () => {
  const { pathname } = useUrl();
  const elements = elementsMap[pathname.get()];
  return <Suspense fallback={<Loading />}>{elements()}</Suspense>;
};
```

---

## 五、AppWrapper — 應用基礎設施

每個模組的根元件必須被 `AppWrapper` 包裹，它提供：

```typescript
function AppWrapper({ children }) {
  return (
    <ThemeProvider theme={theme}>      {/* 模組主題 */}
      <CssBaseline />                  {/* CSS 重置 */}
      <Toaster />                      {/* Toast 通知 */}
      <QueryClientProvider client={queryClient}>  {/* React Query */}
        <ErrorBoundary fallback={<ErrorPage />}>  {/* 錯誤邊界 */}
          {children}
        </ErrorBoundary>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
```

### 開發注意事項

#### ⚠ 每個模組有獨立的 QueryClient

模組之間的 React Query 快取是**完全隔離**的。跨模組導航（如從 home 到 forum）會重新建立整個 React 樹，快取不會保留。

#### ⚠ 桌面版模組必須加寬度限制

如果新增的模組不支援響應式（僅限桌面端），請在 `AppWrapper` 中加入 `WidthNotSupport` 元件：

```typescript
import { WidthNotSupport } from "@/components/WidthNotSupport";

function AppWrapper({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <WidthNotSupport minWidth={700} />
      {/* ... */}
    </ThemeProvider>
  );
}
```

---

## 六、資料庫管理

### .db 檔案放置位置

```
src/assets/db/
└── forum.db       ← SQLite 資料庫檔案
```

資料庫檔案透過 Vite 的 `?url` 後綴作為靜態資源引入：

```typescript
import DB_PATH from "@/assets/db/forum.db?url";
```

### 資料庫重置

`SQLiteClient` 提供 `reset()` 方法，會清除 IndexedDB 中的快取，下次訪問時重新從靜態資源載入初始資料庫。這讓使用者可以「重置」所有修改回到初始狀態。

### 開發注意事項

#### ⚠ 資料庫變更流程

1. 使用外部工具（如 DB Browser for SQLite）修改 `.db` 檔案
2. 將修改後的 `.db` 檔放回 `src/assets/db/`
3. 重啟 dev server（Vite 會重新處理靜態資源）
4. 在瀏覽器中呼叫 `sqlite.reset()` 或清除 IndexedDB，載入新版資料庫

#### ⚠ 資料庫大小

整個 `.db` 檔會作為靜態資源被下載，應控制大小（建議不超過數 MB）。避免存放二進位大檔案（如圖片），改用 URL 參考。
