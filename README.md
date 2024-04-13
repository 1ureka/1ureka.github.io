## 3D CG 作品集展示平台

此網站用於展示 3D CG 作品集，採用 React 開發，擁有完全響應式設計，能夠在各種螢幕尺寸下無縫適應。利用 React Router 實現單頁應用（SPA）的效果，使得瀏覽時無需重新加載頁面。

### 主要功能

- **響應式設計**：確保在各種設備上都能獲得最佳的視覺體驗。
- **主題支援**：用戶可以輕鬆切換系統主題或手動選擇亮/暗模式。
- **Material Design**：採用 Material Design 原則，使用戶界面更加時尚和直觀。
- **懶加載**：絕大部份的圖片都使用了異步加載，通過部分解碼優化記憶體使用效率。
- **圖片解碼**：完全重寫了圖片解碼的過程，完全覆蓋瀏覽器預設行為，即使在呈現大型圖片時，仍能夠保持滑動的順暢度。
- **訪客模式**：允許訪客瀏覽首頁，利用 Snap scroll 功能將其分為不同部分，每個部分都有獨特的動畫設計。
- **管理員模式**：登錄後進入管理員模式，用戶可以探索兩個不同主題的作品集，並執行文件管理任務，如新增、刪除和驗證完整性。
- **互動畫廊**：在作品集中，用戶可以拖動圖片進行縮放，提供圖片顯示控制，比如調整曝光、飽和度等參數。

### 使用的技術

- **React**: 構建整個前端應用
- **Vite**: 用於項目構建
- **React Router**: 實現路由功能
- **Recoil**: 管理狀態
- **Material-UI**: 提供 UI 組件
- **Material Icons**: 應用圖標集
- **Octokit**: 整合 GitHub API
- **GSAP（GreenSock Animation Platform）**: 用於動畫效果

## 安裝

要在本地運行此項目，請按照以下步驟操作：

1. 克隆存儲庫。
2. 切換到項目目錄。
3. 使用 `npm install` 安裝依賴項。
4. 使用 `npm run dev` 啟動開發服務器。

---

## 3D CG Portfolio Showcase

This website serves as a showcase platform for exhibiting 3D CG portfolios. Built using React, it boasts a fully responsive design that adapts seamlessly to various screen sizes. Leveraging React Router, it operates as a Single Page Application (SPA), ensuring smooth navigation without page reloads.

### Key Features

- **Responsive Design**: Ensures optimal viewing experience across devices.
- **Theme Support**: Users can seamlessly switch between system theme and manual selection of light/dark mode.
- **Material Design**: Incorporates Material Design principles for a sleek and intuitive user interface.
- **Lazy Loading**: Images are loaded asynchronously, optimizing memory usage, with partial decoding for enhanced efficiency.
- **Image Decoding**: Completely rewritten the image decoding process, overriding browser default behavior. Even when displaying large images, smooth scrolling is maintained.
- **Visitor Mode**: Allows visitors to browse the landing page, divided into distinct sections with Snap Scroll feature and unique animated designs.
- **Admin Mode**: Upon logging in, users access the administrator mode. Here, they can explore two different themed portfolios and perform file management tasks such as addition, deletion, and integrity verification.
- **Interactive Gallery**: Within portfolios, users can drag to zoom images and adjust parameters like exposure and saturation for enhanced viewing experience.

### Technologies Used

- **React**: Building the entire frontend application.
- **Vite**: Project build tool.
- **React Router**: Implementing routing functionality.
- **Recoil**: State management.
- **Material-UI**: Providing UI components.
- **Material Icons**: Application icon set.
- **Octokit**: GitHub API integration.
- **GSAP (GreenSock Animation Platform)**: Used for animation effects.

## Installation

To run this project locally, follow these steps:

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Start the development server with `npm run dev`.
