# 路由管理指南：新增與刪除路由

本文件說明此專案的路由架構，以及如何刪除既有路由或新增新路由。

---

## 專案路由架構概覽

本專案採用 **Vite 多頁式應用 (MPA)** 架構，每個路由對應一個獨立的 HTML 入口檔。路由系統由以下幾個核心檔案組成：

| 檔案                                | 用途                                                                         |
| ----------------------------------- | ---------------------------------------------------------------------------- |
| `src/routes.json`                   | 定義所有路由的 dev/prod 路徑對應                                             |
| `src/routes.ts`                     | 根據環境變數（dev/prod）匯出當前可用路由物件                                 |
| `vite.config.ts`                    | 讀取 `routes.json`，將所有 dev 路徑作為 Vite 的 `rollupOptions.input`        |
| `src/build.js`                      | 建置後腳本，將 dev 路徑的 HTML 檔搬移至 prod 路徑結構（`dist/` → `deploy/`） |
| `src/home/hooks/useProjectPages.ts` | 首頁的頁面列表，包含每個路由的中文標題 `titleMap`                            |
| `src/home/hooks/useProjects.ts`     | 首頁的專案列表，包含每個專案模組的入口連結                                   |

### 路由分為兩種層級

1. **模組首頁路由**（如 `forum_home`、`photos_home`）
   - 有自己的 `pages/index.html` + `pages/main.tsx` + `pages/App.tsx`

2. **模組子頁路由**（如 `forum_login`、`datahub_schema`）
   - 子頁面有兩種模式：
     - **獨立入口**（forum 模式）：子頁面有自己的 `index.html` + `main.tsx` + `App.tsx`
     - **共用入口**（datahub 模式）：子頁面只有 `index.html`（指向父層的 `main.tsx`），透過 `Page.tsx` 根據 URL 動態切換內容

---

## 一、如何刪除一個路由

以刪除 `forum_login` 路由為範例：

### 步驟 1：從 `src/routes.json` 移除路由定義

開啟 `src/routes.json`，刪除對應的 key-value：

```diff
- "forum_login": {
-   "dev": "/src/forum/pages/login/index.html",
-   "prod": "/forum/login"
- },
```

> 這一步會同時影響 `routes.ts`（匯出的路由物件）、`vite.config.ts`（建置入口）、`build.js`（部署搬移），因為它們都讀取 `routes.json`。

### 步驟 2：刪除對應的頁面檔案

刪除該路由對應的整個頁面目錄：

```
刪除 src/forum/pages/login/
  ├── index.html
  ├── main.tsx
  └── App.tsx
```

如果是 datahub 共用入口模式，只需刪除子目錄中的 `index.html`，並移除 `Page.tsx` 裡對應的 `elementsMap` 條目。

### 步驟 3：移除首頁中的路由標題對應

開啟 `src/home/hooks/useProjectPages.ts`，從 `titleMap` 中移除該路由：

```diff
  const titleMap: Record<keyof typeof routes, string> = {
    // ...
-   forum_login: "論壇樣板 | 登入頁面",
    // ...
  };
```

> 因為 `titleMap` 的型別是 `Record<keyof typeof routes, string>`，所以移除 `routes.json` 中的 key 後，TypeScript 會提示你必須同步刪除此處的 key，否則會編譯報錯。

### 步驟 4：搜尋並移除所有引用該路由的程式碼

在專案中搜尋 `routes.forum_login`（或對應的路由 key），移除或替換所有引用：

```
常見出現位置：
- 其他頁面中的 <Button href={routes.forum_login}> 連結
- 導航列元件中的連結
- 條件判斷中使用的路由比較
```

### 步驟 5（若刪除整個模組）：額外清理

如果要刪除的是整個模組（例如刪除整個 `photos` 模組），還需要：

1. 刪除模組的整個目錄（如 `src/photos/`）
2. 從 `routes.json` 中移除所有以該模組為前綴的路由（如 `photos_home`）
3. 從 `src/home/hooks/useProjects.ts` 的 `projectsArray` 中移除對應的專案物件
4. 搜尋並移除所有引用該模組路由的程式碼

### 驗證

```bash
npm run build:type    # 確認 TypeScript 編譯通過（titleMap 型別會檢查完整性）
npm run dev           # 確認開發伺服器正常運作
npm run build:deploy  # 確認建置流程正常
```

---

## 二、如何新增一個路由

以新增 `forum_settings`（論壇設定頁面）為範例：

### 步驟 1：在 `src/routes.json` 新增路由定義

```diff
  "forum_edit": {
    "dev": "/src/forum/pages/edit/index.html",
    "prod": "/forum/edit"
  },
+ "forum_settings": {
+   "dev": "/src/forum/pages/settings/index.html",
+   "prod": "/forum/settings"
+ },
```

**命名規則**：`{模組名}_{頁面名}`，dev 路徑指向 `src/{模組}/pages/{頁面}/index.html`，prod 路徑為 `/{模組}/{頁面}`。

### 步驟 2：建立頁面檔案

建立目錄 `src/forum/pages/settings/`，並建立三個檔案：

#### `index.html`

```html
<!DOCTYPE html>
<html lang="zh-TW">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="../../../assets/icon/forum.svg" />
    <title>論壇樣板 | 設定</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./main.tsx"></script>
  </body>
</html>
```

> **注意 icon 路徑**：需要根據頁面深度使用正確的相對路徑到 `src/assets/icon/`。從 `src/forum/pages/settings/` 到 `src/assets/` 需要往上三層：`../../../assets/icon/forum.svg`。

#### `main.tsx`

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

#### `App.tsx`

```tsx
import { Container } from "@mui/material";
import { AppWrapper } from "@/forum/components/AppWrapper";
import { ScrollArea } from "@/forum/components/ScrollArea";

function App() {
  return (
    <AppWrapper>
      <ScrollArea>
        <Container maxWidth="md" sx={{ my: 10 }}>
          {/* 在此放入頁面內容 */}
          <h1>設定頁面</h1>
        </Container>
      </ScrollArea>
    </AppWrapper>
  );
}

export default App;
```

> **關鍵**：`App.tsx` 最外層必須使用該模組的 `AppWrapper` 元件，它提供了 `ThemeProvider`、`CssBaseline`、`QueryClientProvider`、`ErrorBoundary` 等基礎設施。每個模組都有自己的 `AppWrapper`。

### 步驟 3：在首頁的 `titleMap` 中新增標題

開啟 `src/home/hooks/useProjectPages.ts`，在 `titleMap` 中新增：

```diff
  const titleMap: Record<keyof typeof routes, string> = {
    // ... 既有路由 ...
    forum_edit: "論壇樣板 | 編輯文章",
+   forum_settings: "論壇樣板 | 設定頁面",
    // ...
  };
```

> 此步驟為**必要**，因為 `titleMap` 的型別要求包含 `routes` 物件的所有 key。新增路由後如果沒有對應的 `titleMap` 條目，TypeScript 會報錯。

### 步驟 4（若新增整個模組）：額外設定

如果要新增的是全新的模組（例如 `blog`），除了上述步驟外，還需要：

1. 建立模組目錄結構：

   ```
   src/blog/
   ├── components/     # 模組專屬元件
   │   └── AppWrapper.tsx  # 必要：提供 Theme、QueryClient 等
   ├── data/           # 資料層（模擬後端 API）
   ├── hooks/          # React Query hooks
   ├── pages/          # 頁面入口
   │   ├── index.html
   │   ├── main.tsx
   │   └── App.tsx
   └── utils/          # 模組工具
       └── theme.ts    # 模組主題設定
   ```

2. 建立 `AppWrapper.tsx`（參考既有模組的實作）：

   ```tsx
   import { CssBaseline, ThemeProvider } from "@mui/material";
   import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
   import { ErrorBoundary } from "react-error-boundary";
   import { theme } from "../utils/theme";
   import { Toaster } from "@/components/Toast";

   const queryClient = new QueryClient();

   function AppWrapper({ children }: { children: React.ReactNode }) {
     return (
       <ThemeProvider theme={theme}>
         <CssBaseline />
         <Toaster />
         <QueryClientProvider client={queryClient}>
           <ErrorBoundary fallback={<div>Error</div>}>{children}</ErrorBoundary>
         </QueryClientProvider>
       </ThemeProvider>
     );
   }

   export { AppWrapper };
   ```

3. 在 `src/home/hooks/useProjects.ts` 的 `projectsArray` 中新增專案卡片：
   ```tsx
   {
     id: "blog",
     title: "部落格樣板",
     description: "展示文章撰寫與閱讀體驗的樣板",
     color: "#4caf50",
     icon: ArticleRoundedIcon,
     actionHref: routes.blog_home,
     progress: 0,
     time: Date.now(),
     type: "rwd",
   },
   ```

### 關於 datahub 的共用入口模式

如果是要在 datahub 這類使用共用 `main.tsx` 的模組中新增子頁（例如 `datahub_charts`），步驟略有不同：

1. 在 `src/routes.json` 新增路由定義
2. 只需在 `src/datahub/pages/charts/` 建立 `index.html`，script 指向父層的 `main.tsx`：
   ```html
   <script type="module" src="../main.tsx"></script>
   ```
3. 在 `src/datahub/pages/Page.tsx` 的 `elementsMap` 中新增對應條目：
   ```tsx
   const elementsMap: Record<string, () => React.ReactNode | null> = {
     // ... 既有路由 ...
     [routes.datahub_charts]: () => (
       <Paper sx={{ ...paperSx, p: mdSpace }}>
         <title>資料樣板 | 圖表</title>
         <Charts />
       </Paper>
     ),
   };
   ```

### 驗證

```bash
npm run build:type    # 確認 TypeScript 編譯通過
npm run dev           # 開發伺服器啟動後，訪問 http://localhost:3000/src/forum/pages/settings/index.html
npm run build:deploy  # 確認建置與部署流程正常
```

---

## 附錄：路由系統運作流程圖

```
routes.json (定義 dev/prod 路徑)
    │
    ├──→ vite.config.ts        讀取 dev 路徑 → 作為 rollup 多入口 input
    ├──→ src/routes.ts         根據環境匯出 routes 物件 → 元件中 import { routes } 使用
    └──→ src/build.js          建置後讀取 dev/prod 對應 → 搬移 HTML 至正確的 prod 路徑
```

## 附錄：核心檔案速查

| 操作                         | 必須修改的檔案                                    |
| ---------------------------- | ------------------------------------------------- |
| 新增/刪除路由                | `src/routes.json`                                 |
| 新增/刪除頁面模板            | `src/{模組}/pages/{頁面}/` 目錄                   |
| 更新首頁標題對應             | `src/home/hooks/useProjectPages.ts` → `titleMap`  |
| 更新首頁專案卡（僅限新模組） | `src/home/hooks/useProjects.ts` → `projectsArray` |
| 清理路由引用                 | 全域搜尋 `routes.{路由key}` 並移除/替換           |
