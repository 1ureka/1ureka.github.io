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
type UpdateOptions = { skipTransition?: boolean; clearSearchParams?: boolean };
const pathKey = "__preserved__path__key__";

export function useUrl() {
  // 初始化狀態
  const [searchParams, setSearchParams] = useState(new URLSearchParams(window.location.search));
  const [pathname, setPath] = useState(window.location.pathname);

  // 創建訪問過的參數集合，避免重新渲染時重置
  const accessedKeysRef = useRef(new Set<string>());

  // -----------------------------------------------------
  // 狀態
  // -----------------------------------------------------

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

  // -----------------------------------------------------
  // 更新函數
  // -----------------------------------------------------

  const update = useCallback((path: string | null, params: SearchParamsUpdate | null, options?: UpdateOptions) => {
    const { skipTransition = false, clearSearchParams = false } = options || {};
    const url = new URL(window.location.href);

    if (typeof path === "string") {
      url.pathname = ensureLeadingSlash(path);
    }

    if (params === null) {
      url.search = "";
      params = {};
    }

    if (clearSearchParams) {
      url.search = "";
    }

    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === undefined) url.searchParams.delete(key);
      else url.searchParams.set(key, value);
    });

    withTransition(() => window.history.pushState({}, "", url), skipTransition);
  }, []);

  const updateSearchParams = useCallback(
    (params: SearchParamsUpdate | null, options?: UpdateOptions) => {
      update(null, params, options);
    },
    [update]
  );

  const updatePath = useCallback(
    (path: string, options?: UpdateOptions) => {
      update(path, {}, options);
    },
    [update]
  );

  // -----------------------------------------------------
  // 監聽 URL 變化，根據 accessedKeysRef 更新狀態
  // -----------------------------------------------------

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
    /**
     * 更新 URL pathname 與 searchParams；path 為 null 表示保留，params 為 null 表示清空、{} 表示不變更。
     */
    update,
    /**
     * 僅更新 searchParams，支援 null/{} 分別表示清空與不變更。
     */
    updatePath,
    /**
     * 僅更新 pathname，searchParams 不變；可搭配 clearSearchParams 清空。
     */
    updateSearchParams,
  };
}
