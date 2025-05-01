export const markdownContent = `
# 專案介紹

這是一個簡單的 Markdown 渲染測試文件，用於驗證我們的元件對應是否正確。

## 功能摘要

- 支援各種標題
- 自訂連結樣式
- 支援 **粗體**、_斜體_、~~刪除線~~
- 顯示程式碼區塊與 inline \`code\`
- 正確處理表格、區塊引用與清單

---

### 使用方式

請依照下列步驟操作：

1. 開啟專案
2. 安裝依賴
3. 執行以下程式碼：

\`\`\`ts
const hello = () => {
  console.log("Hello, world!");
};
\`\`\`

---

#### 技術說明

我們使用以下技術：

- React
- Material UI
- TypeScript
- Markdown Parser

> 此專案設計目標是使 Markdown 在 UI 上具有一致且美觀的樣式。

##### 注意事項

請勿在 production 使用 \`console.log\` 除錯。

###### 最後提醒

確保你已設定 \`.env\` 並重新啟動伺服器。

---

### 表格展示

| 名稱       | 類型     | 是否必填 |
|------------|----------|----------|
| username   | string   | 是       |
| age        | number   | 否       |
| isAdmin    | boolean  | 否       |

---

### 有序清單

1. 安裝 Node.js
2. 安裝 yarn
3. 執行 \`yarn dev\`

---

### 無序清單

- 前端
- 後端
- DevOps

---

### 區塊引用測試

> 「專案能否成功，不在於規模，而在於執行力。」

---

### 行內程式碼測試

請使用 \`yarn install\` 安裝套件。

---

### HTML code block (不會渲染，但測試原始 HTML 注入)

<div class="raw-html-test">這是測試 HTML 注入的區塊</div>
`;
