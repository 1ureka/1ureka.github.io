type Post = {
  id: number;
  title: string;
  author: string; // 作者名稱(英文)
  content: string;
  tags: string[]; // 盡量超過 3 個
  viewCount: number;
  likeCount: number;
  replyCount: number;
  createdAt: Date;
};

const posts: Post[] = [
  {
    id: 1,
    title: "React 18 的並發模式值得升級嗎？",
    author: "Alice Johnson",
    content: "React 18 帶來了並發模式，能讓 UI 更新更流暢，這對開發者來說是一個重要的改變。",
    tags: ["React", "並發模式", "效能優化", "前端開發"],
    viewCount: 1024,
    likeCount: 250,
    replyCount: 30,
    createdAt: new Date("2024-03-01"),
  },
  {
    id: 2,
    title: "Tailwind CSS vs. MUI：哪個適合你的專案？",
    author: "Bob Smith",
    content: "這篇文章將比較 Tailwind CSS 和 MUI，分析它們的優缺點，幫助你選擇適合的前端 UI 框架。",
    tags: ["CSS", "MUI", "Tailwind", "前端設計"],
    viewCount: 1987,
    likeCount: 410,
    replyCount: 75,
    createdAt: new Date("2024-03-05"),
  },
  {
    id: 3,
    title: "Vite 為何比 Webpack 更快？",
    author: "Charlie Brown",
    content: "Vite 採用了原生 ES 模組和即時編譯技術，大幅提升開發速度，讓前端開發更高效。",
    tags: ["Vite", "Webpack", "效能", "前端工具"],
    viewCount: 2356,
    likeCount: 590,
    replyCount: 88,
    createdAt: new Date("2024-03-10"),
  },
  {
    id: 4,
    title: "Next.js 14 有哪些新特性值得關注？",
    author: "David Lee",
    content: "Next.js 14 帶來了新的 Server Actions、App Router 及更好的效能提升。",
    tags: ["Next.js", "SSR", "前端框架", "效能提升"],
    viewCount: 3120,
    likeCount: 720,
    replyCount: 120,
    createdAt: new Date("2024-03-15"),
  },
  {
    id: 5,
    title: "前端開發中的 JWT 與 Session 安全性探討",
    author: "Eve Walker",
    content: "JWT 與 Session 各有優缺點，如何確保應用程式的安全性？",
    tags: ["JWT", "Session", "身份驗證", "安全性"],
    viewCount: 1780,
    likeCount: 460,
    replyCount: 95,
    createdAt: new Date("2024-03-20"),
  },
  {
    id: 6,
    title: "如何使用 Zustand 管理 React 狀態？",
    author: "Frank Harris",
    content: "Zustand 是一個輕量級的狀態管理工具，比 Redux 更簡單，適合小型專案。",
    tags: ["React", "Zustand", "狀態管理", "前端開發"],
    viewCount: 1250,
    likeCount: 310,
    replyCount: 60,
    createdAt: new Date("2024-03-25"),
  },
  {
    id: 7,
    title: "為什麼你應該考慮使用 shadcn/ui？",
    author: "Grace Miller",
    content: "shadcn/ui 提供了可擴展的 UI 元件，適合喜歡 Tailwind CSS 的開發者。",
    tags: ["shadcn/ui", "Tailwind", "React", "UI 元件"],
    viewCount: 890,
    likeCount: 190,
    replyCount: 45,
    createdAt: new Date("2024-03-30"),
  },
  {
    id: 8,
    title: "Server Components 是未來嗎？",
    author: "Henry Wilson",
    content: "React Server Components 讓開發者可以更有效率地處理伺服器端渲染。",
    tags: ["React", "Server Components", "SSR", "效能優化"],
    viewCount: 2600,
    likeCount: 680,
    replyCount: 110,
    createdAt: new Date("2024-04-02"),
  },
  {
    id: 9,
    title: "如何使用 Supabase 建立完整的後端？",
    author: "Isabella Carter",
    content: "Supabase 提供即時資料庫與身份驗證，讓前端開發者更容易建立後端功能。",
    tags: ["Supabase", "後端", "資料庫", "身份驗證"],
    viewCount: 1450,
    likeCount: 350,
    replyCount: 65,
    createdAt: new Date("2024-04-07"),
  },
  {
    id: 10,
    title: "React Query vs. SWR：哪個資料請求庫更好？",
    author: "Jack Anderson",
    content: "React Query 和 SWR 都是處理 API 資料請求的強大工具，各有優勢。",
    tags: ["React", "React Query", "SWR", "API 處理"],
    viewCount: 1875,
    likeCount: 500,
    replyCount: 85,
    createdAt: new Date("2024-04-12"),
  },
  {
    id: 11,
    title: "如何讓你的 Web 應用跑得更快？",
    author: "Karen Martinez",
    content: "透過代碼分割、預載資源和使用 CDN，可以讓 Web 應用加速。",
    tags: ["效能優化", "Web 開發", "CDN", "前端最佳化"],
    viewCount: 2240,
    likeCount: 610,
    replyCount: 130,
    createdAt: new Date("2024-04-18"),
  },
  {
    id: 12,
    title: "為什麼 Bun 可能會取代 Node.js？",
    author: "Liam Rodriguez",
    content: "Bun 具備更快的運行速度、更好的原生支援，成為 Node.js 的強勁對手。",
    tags: ["Bun", "Node.js", "JavaScript", "後端開發"],
    viewCount: 2025,
    likeCount: 490,
    replyCount: 95,
    createdAt: new Date("2024-04-25"),
  },
  {
    id: 13,
    title: "WebAssembly (WASM) 能提升前端效能嗎？",
    author: "Mia Thompson",
    content: "WASM 可以執行高效能程式碼，讓 Web 應用運行更快。",
    tags: ["WASM", "效能", "Web 開發", "JavaScript"],
    viewCount: 1350,
    likeCount: 290,
    replyCount: 50,
    createdAt: new Date("2024-04-28"),
  },
  {
    id: 14,
    title: "2025 年前端趨勢：你應該學哪些技術？",
    author: "Noah White",
    content: "探索 2025 年最值得學習的前端技術，包括 React Server Components、Edge Functions 等。",
    tags: ["前端趨勢", "新技術", "Web 開發", "React"],
    viewCount: 3105,
    likeCount: 840,
    replyCount: 170,
    createdAt: new Date("2024-05-01"),
  },
  {
    id: 15,
    title: "如何使用 Turbopack 加速你的前端專案？",
    author: "Olivia Lewis",
    content: "Turbopack 作為 Webpack 的接班人，能讓前端開發更快速。",
    tags: ["Turbopack", "Webpack", "前端工具", "效能提升"],
    viewCount: 1640,
    likeCount: 420,
    replyCount: 78,
    createdAt: new Date("2024-05-05"),
  },
];

type Author = {
  name: string;
  description: string;
};

// 根據 posts 寫出 authors
const authors: Author[] = [
  {
    name: "Alice Johnson",
    description: "前端開發者和 React 愛好者。",
  },
  {
    name: "Bob Smith",
    description: "UI/UX 設計師和 CSS 愛好者。",
  },
  {
    name: "Charlie Brown",
    description: "網頁效能工程師和 Vite 粉絲。",
  },
  {
    name: "David Lee",
    description: "全端開發者和 Next.js 專家。",
  },
  {
    name: "Eve Walker",
    description: "安全研究員和身份驗證專家。",
  },
  {
    name: "Frank Harris",
    description: "React 開發者和 Zustand 使用者。",
  },
  {
    name: "Grace Miller",
    description: "UI 設計師和 shadcn/ui 貢獻者。",
  },
  {
    name: "Henry Wilson",
    description: "React 開發者和 Server Components 倡導者。",
  },
  {
    name: "Isabella Carter",
    description: "後端開發者和 Supabase 使用者。",
  },
  {
    name: "Jack Anderson",
    description: "前端開發者和 React Query/SWR 使用者。",
  },
  {
    name: "Karen Martinez",
    description: "網頁效能專家和優化愛好者。",
  },
  {
    name: "Liam Rodriguez",
    description: "後端開發者和 Bun 愛好者。",
  },
  {
    name: "Mia Thompson",
    description: "WebAssembly 愛好者和效能專家。",
  },
  {
    name: "Noah White",
    description: "前端開發者和技術趨勢追隨者。",
  },
  {
    name: "Olivia Lewis",
    description: "前端開發者和 Turbopack 使用者。",
  },
];

type Notification = {
  id: number;
  title: string;
  content: string;
};

const notifications: Notification[] = [
  {
    id: 1,
    title: "歡迎加入 論壇樣板！",
    content: "感謝您加入論壇樣板，希望您在這裡能找到有趣的討論。",
  },
  {
    id: 2,
    title: "預計維護公告",
    content: "論壇樣板將於下週四的 10:00 AM 進行系統維護，預計需 2 小時。",
  },
  {
    id: 3,
    title: "新留言通知",
    content: "您的貼文 'React 18 的並發模式值得升級嗎？' 有新留言。",
  },
];

export { posts, authors, notifications };
export type { Post, Author, Notification };
