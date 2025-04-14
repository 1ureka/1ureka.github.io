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

function withTransition(callback: () => void, skip: boolean = false) {
  if (document.startViewTransition && !skip) {
    document.startViewTransition(callback);
  } else callback();
}

// -------------------------------------------------------
// 定義 useUrl 鉤子
// -------------------------------------------------------

type SearchParamsUpdate = Record<string, string | null>;
const pathKey = "__preserved__path__key__";

export function useUrl() {
  // 初始化狀態
  const [searchParams, setSearchParams] = useState(new URLSearchParams(window.location.search));
  const [pathname, setPath] = useState(window.location.pathname);

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

  // 代理 pathname get 方法
  const proxyPath = useMemo(() => {
    return {
      get: () => {
        accessedKeysRef.current.add(pathKey);
        return pathname.replace(/\/$/, "");
      },
      getParts: (): string[] => {
        accessedKeysRef.current.add(pathKey);
        return pathname
          .replace(/^\/|\/$/g, "")
          .split("/")
          .filter((part) => part !== "");
      },
    };
  }, [pathname]);

  // 用於更新查詢參數的函數 (會保留之前的 searchParams)
  const updateSearchParams = useCallback((searchParams: SearchParamsUpdate, skipTransition: boolean = false) => {
    const url = new URL(window.location.href);

    // 更新或刪除參數
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value === null) url.searchParams.delete(key);
      else url.searchParams.set(key, value);
    });

    withTransition(() => window.history.pushState({}, "", url), skipTransition);
  }, []);

  // 用於更新 pathname 的函數
  const updatePath = useCallback((newPath: string, skipTransition: boolean = false) => {
    const url = new URL(window.location.href);
    url.pathname = ensureLeadingSlash(newPath);
    withTransition(() => window.history.pushState({}, "", url), skipTransition);
  }, []);

  // 用於更新 pathname + searchParams 的函數
  const updatePathAndSearchParams = useCallback(
    (newPath: string, searchParams: SearchParamsUpdate, skipTransition: boolean = false) => {
      const url = new URL(window.location.href);
      url.pathname = ensureLeadingSlash(newPath);

      // 更新或刪除參數
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value === null) url.searchParams.delete(key);
        else url.searchParams.set(key, value);
      });

      withTransition(() => window.history.pushState({}, "", url), skipTransition);
    },
    []
  );

  // 監聽 URL 變化
  useEffect(() => {
    const handleUrlChange = () => {
      const newParams = new URLSearchParams(window.location.search);
      const newPath = window.location.pathname;
      let shouldUpdate = false;

      // 檢查是否有被訂閱的參數發生變化
      accessedKeysRef.current.forEach((key) => {
        if (key === pathKey && pathname !== newPath) {
          shouldUpdate = true;
        } else if (searchParams.get(key) !== newParams.get(key)) {
          shouldUpdate = true;
        }
      });

      if (shouldUpdate) {
        setSearchParams(newParams);
        setPath(newPath);
      }
    };

    window.addEventListener("popstate", handleUrlChange);
    window.addEventListener("locationchange", handleUrlChange);

    return () => {
      window.removeEventListener("popstate", handleUrlChange);
      window.removeEventListener("locationchange", handleUrlChange);
    };
  }, [searchParams, accessedKeysRef, pathname]);
  // 路由後需要讓 effect 中的 searchParams, pathname 更新才能知道 diff，而 accessedKeysRef 則是因為 lint

  return {
    pathname: proxyPath,
    searchParams: proxySearchParams,
    updatePath,
    updateSearchParams,
    updatePathAndSearchParams,
  };
}
