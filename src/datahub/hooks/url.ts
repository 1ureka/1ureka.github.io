import { useEffect, useState, useCallback, useMemo, useRef } from "react";

// -------------------------------------------------------
// 使 route 實現所必須的功能
// -------------------------------------------------------
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

const ensureLeadingSlash = (path: string) => (path.startsWith("/") ? path : "/" + path);

function withTransition(callback: () => void) {
  if (document.startViewTransition) {
    document.startViewTransition(callback);
  } else callback();
}

// -------------------------------------------------------
// 定義 useUrl 鉤子
// -------------------------------------------------------

type SearchParamsUpdate = Record<string, string | null>;
const hashKey = "__preserved__hash__key__";

export function useUrl() {
  // 初始化狀態
  const [searchParams, setSearchParams] = useState(new URLSearchParams(window.location.search));
  const [hash, setHash] = useState(window.location.hash);

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

  // 代理 hash，使其具有 get 方法
  const proxyHash = useMemo(() => {
    return {
      get: (optinos?: { raw?: boolean }) => {
        accessedKeysRef.current.add(hashKey);
        return optinos?.raw ? hash : hash.replace(/^#/, "");
      },
      getParts: (): string[] => {
        accessedKeysRef.current.add(hashKey);
        return hash.replace(/^#/, "").split("/").filter(Boolean);
      },
    };
  }, [hash]);

  // 用於更新查詢參數的函數 (會保留之前的 searchParams 與 hash)
  const updateSearchParams = useCallback((updates: SearchParamsUpdate) => {
    const url = new URL(window.location.href);

    // 更新或刪除參數
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) url.searchParams.delete(key);
      else url.searchParams.set(key, value);
    });

    url.hash = window.location.hash; // 保留 hash 部分
    withTransition(() => window.history.pushState({}, "", url));
  }, []);

  // 用於更新 hash 的函數
  const updateHash = useCallback((newHash: string) => {
    const url = new URL(window.location.href);

    url.hash = ensureLeadingSlash(newHash); // 確保 hash 是乾淨的
    withTransition(() => window.history.pushState({}, "", url));
  }, []);

  // 監聽 URL 變化
  useEffect(() => {
    const handleUrlChange = () => {
      const newParams = new URLSearchParams(window.location.search);
      const newHash = window.location.hash;
      let shouldUpdate = false;

      // 檢查是否有被訂閱的參數發生變化
      accessedKeysRef.current.forEach((key) => {
        if (key === hashKey && hash !== newHash) {
          shouldUpdate = true;
        } else if (searchParams.get(key) !== newParams.get(key)) {
          shouldUpdate = true;
        }
      });

      if (shouldUpdate) {
        setSearchParams(newParams);
        setHash(newHash);
      }
    };

    window.addEventListener("popstate", handleUrlChange);
    window.addEventListener("locationchange", handleUrlChange);

    return () => {
      window.removeEventListener("popstate", handleUrlChange);
      window.removeEventListener("locationchange", handleUrlChange);
    };
  }, [searchParams, accessedKeysRef, hash]);
  // 路由後需要讓 effect 中的 searchParams, hash 更新才能知道 diff，而 accessedKeysRef 則是因為 lint

  return { searchParams: proxySearchParams, updateSearchParams, hash: proxyHash, updateHash };
}
