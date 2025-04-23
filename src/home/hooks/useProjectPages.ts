import WebStoriesRoundedIcon from "@mui/icons-material/WebStoriesRounded";
import WebAssetRoundedIcon from "@mui/icons-material/WebAssetRounded";

import { z } from "zod";
import { routes } from "@/routes";
import { sortObjectArray } from "@/utils/array";
import { toEntries } from "@/utils/typedBuiltins";
import { projectsArray } from "./useProjects";
import type { IconProps } from "@mui/material";

import { useFilterState, useOrderState, filterSchema } from "@/home/hooks/useControl";
import { useSearch, type Highlight } from "@/hooks/fuse";
import { useUrl } from "@/hooks/url";
import { useMemo } from "react";

type Page = {
  title: string; // 論壇樣板 | 所有貼文
  href: string;
  icon: React.FC<{ sx: IconProps["sx"] }>;
  time: number;
  type: z.infer<typeof filterSchema>;
  progress: number;
};

const titleMap: Record<keyof typeof routes, string> = {
  home: "作品集首頁 (當前頁面)",
  datahub_home: "資料樣板 | 儀表板",
  datahub_schema: "資料樣板 | 結構圖",
  datahub_tables: "資料樣板 | 表格檢視",
  forum_edit: "論壇樣板 | 編輯文章",
  forum_home: "論壇樣板 | 首頁",
  forum_login: "論壇樣板 | 登入頁面",
  forum_post: "論壇樣板 | 單篇文章",
  forum_posts: "論壇樣板 | 所有貼文",
  forum_register: "論壇樣板 | 註冊頁面",
  forum_search: "論壇樣板 | 搜尋頁面",
  forum_verify: "論壇樣板 | 驗證頁面",
  forum_users: "論壇樣板 | 使用者檔案",
  photos_home: "相簿樣板 | 首頁",
};

const getIcon = (key: keyof typeof routes) => {
  const isHome = key === "home";
  if (isHome) return WebStoriesRoundedIcon;
  const prefix = key.split("_")[0];
  const result = projectsArray.find((project) => project.id.toLowerCase().includes(prefix));
  if (!result) return WebAssetRoundedIcon;
  return result.icon;
};

const getType = (key: keyof typeof routes) => {
  const isHome = key === "home";
  if (isHome) return "rwd";
  const prefix = key.split("_")[0];
  const result = projectsArray.find((project) => project.id.toLowerCase().includes(prefix));
  if (!result) return "desktop";
  return result.type;
};

const getTime = (key: keyof typeof routes) => {
  const isHome = key === "home";
  if (isHome) return Date.now();
  const prefix = key.split("_")[0];
  const result = projectsArray.find((project) => project.id.toLowerCase().includes(prefix));
  if (!result) return Date.now();
  return result.time;
};

const getProgress = (key: keyof typeof routes) => {
  const isHome = key === "home";
  if (isHome) return 100;
  const prefix = key.split("_")[0];
  const result = projectsArray.find((project) => project.id.toLowerCase().includes(prefix));
  if (!result) return 100;
  return result.progress ?? 100;
};

const pagesArray: Page[] = toEntries(routes).map(([key, value]) => ({
  title: titleMap[key],
  href: value,
  icon: getIcon(key),
  time: getTime(key),
  type: getType(key),
  progress: getProgress(key),
}));

const pagesArrayForSearch = pagesArray.map((project) => ({ title: project.title }));

type SearchResult = (Page & { highlights: Record<"title", Highlight[]> })[];

const useProjectPages = () => {
  const { searchParams } = useUrl();
  const search = useSearch(pagesArrayForSearch, ["title"]);

  const { orderState } = useOrderState();
  const result = useMemo<SearchResult>(() => {
    const q = searchParams.get("q") ?? "";
    const isSearch = q.trim().length > 0;

    if (isSearch) {
      const searchResult = search(q);
      const formatted = searchResult.map((result) => {
        const page = pagesArray.find((page) => page.title === result.item.title);
        if (!page) return null;
        return { ...page, highlights: result.highlights };
      });

      return formatted.filter((page) => page !== null);
    }

    const { orderBy, order } = orderState;

    return sortObjectArray(pagesArray, (page) => page[orderBy], order).map((page) => ({
      ...page,
      highlights: { title: [{ text: page.title, highlight: false }] },
    }));
  }, [searchParams, orderState, search]);

  const { filter } = useFilterState();
  const filtered = useMemo<SearchResult>(() => {
    if (filter === "all") return result.filter((page) => page.href !== routes.home);
    return result.filter((page) => page.type === filter && page.href !== routes.home);
  }, [result, filter]);

  return { projectPages: filtered };
};

export { useProjectPages };
