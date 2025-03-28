import type { Notification } from "./dataType";

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

export { notifications };
