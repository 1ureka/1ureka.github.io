import { useEffect, useState, useCallback, useMemo, useRef } from "react";

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
  // 初始化 searchParams 狀態
  const [searchParams, setSearchParams] = useState(new URLSearchParams(window.location.search));

  // 創建訪問過的參數集合，避免重新渲染時重置
  const accessedKeysRef = useRef(new Set<string>());

  // 代理 searchParams，使其具有 get、getAll、has 方法
  const proxySearchParams = useMemo(() => {
    return {
      get: (key: string) => {
        accessedKeysRef.current.add(key);
        return searchParams.get(key);
      },
      getAll: (key: string) => {
        accessedKeysRef.current.add(key);
        return searchParams.getAll(key);
      },
      has: (key: string) => {
        accessedKeysRef.current.add(key);
        return searchParams.has(key);
      },
    };
  }, [searchParams]);

  // 用於更新 URL 參數的函數
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

  // 監聽 URL 變化
  useEffect(() => {
    const handleUrlChange = () => {
      const newParams = new URLSearchParams(window.location.search);
      let shouldUpdate = false;

      // 檢查是否有被訂閱的參數發生變化
      accessedKeysRef.current.forEach((key) => {
        if (searchParams.get(key) !== newParams.get(key)) {
          shouldUpdate = true;
        }
      });

      if (shouldUpdate) setSearchParams(newParams);
    };

    window.addEventListener("popstate", handleUrlChange);
    window.addEventListener("locationchange", handleUrlChange);

    return () => {
      window.removeEventListener("popstate", handleUrlChange);
      window.removeEventListener("locationchange", handleUrlChange);
    };
  }, [searchParams, accessedKeysRef]);

  return { searchParams: proxySearchParams, updateSearchParams };
}
