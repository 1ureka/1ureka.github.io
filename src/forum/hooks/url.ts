import { useEffect, useState, useCallback } from "react";

const customEvent = new Event("locationchange");

const originalPushState = window.history.pushState;
const originalReplaceState = window.history.replaceState;

window.history.pushState = function (...args) {
  originalPushState.apply(this, args);
  window.dispatchEvent(customEvent);
};

window.history.replaceState = function (...args) {
  originalReplaceState.apply(this, args);
  window.dispatchEvent(customEvent);
};

type SearchParamsUpdate = Record<string, string | null>;

export function useUrl() {
  // 初始化 searchParams 狀態，假設完全不使用 SSR
  const [searchParams, setSearchParams] = useState(new URLSearchParams(window.location.search));

  // 用於更新 URL 搜索參數的函數
  const updateSearchParams = useCallback((updates: SearchParamsUpdate) => {
    const url = new URL(window.location.href);
    const params = url.searchParams;

    // 更新或刪除參數
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    // 更新 URL 但不重新加載頁面
    window.history.pushState({}, "", url);
  }, []);

  // 監聽瀏覽器的 popstate 事件（當使用者點擊瀏覽器的前進/後退按鈕時觸發）
  useEffect(() => {
    const handlePopState = () => {
      setSearchParams(new URLSearchParams(window.location.search));
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("locationchange", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("locationchange", handlePopState);
    };
  }, []);

  return { searchParams, updateSearchParams };
}
