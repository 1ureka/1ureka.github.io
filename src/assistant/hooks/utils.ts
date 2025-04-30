import { useEffect, useState } from "react";

const useThinkingMessage = (enabled: boolean) => {
  const thinkingMessages = [
    "正在查找答案...",
    "我想一下喔...",
    "搜尋資料中...",
    "整理句子中...",
    "快好了，再等一下...",
  ];

  const [thinkingText, setThinkingText] = useState(() => {
    const i = Math.floor(Math.random() * thinkingMessages.length);
    return thinkingMessages[i];
  });

  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      setThinkingText((prev) => {
        let newText;
        do {
          newText = thinkingMessages[Math.floor(Math.random() * thinkingMessages.length)];
        } while (newText === prev);
        return newText;
      });
    }, 3000); // 每 3 秒換一次

    return () => clearInterval(interval);
  }, [enabled]);

  return thinkingText;
};

export { useThinkingMessage };
