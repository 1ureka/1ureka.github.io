import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import DataExplorationRoundedIcon from "@mui/icons-material/DataExplorationRounded";
import CameraRoundedIcon from "@mui/icons-material/CameraRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

import { z } from "zod";
import { routes } from "@/routes";
import { sortObjectArray } from "@/utils/array";
import type { ProjectCardProps } from "@/home/components/list/ProjectCard";
import type { IconProps } from "@mui/material";

import { useFilterState, useOrderState, filterSchema } from "@/home/hooks/useControl";
import { useSearch, type Highlight } from "@/hooks/fuse";
import { useUrl } from "@/hooks/url";
import { useMemo } from "react";

type Project = Omit<ProjectCardProps, "title" | "description" | "icon"> & {
  id: string;
  title: string;
  description: string;
  icon: React.FC<{ sx: IconProps["sx"] }>;
  time: number;
  type: z.infer<typeof filterSchema>;
};

const projectsArray: Project[] = [
  {
    id: "datahub",
    title: "資料樣板",
    description: "探索資料結構、互動體驗與儀表板 UX 的設計樣板，結合可視化與開發工具的一站式後台模組",
    color: "#66cccc",
    icon: DataExplorationRoundedIcon,
    actionHref: routes.datahub_home,
    progress: 39,
    time: 1743264000000,
    type: "desktop",
  },
  {
    id: "forum",
    title: "論壇樣板",
    description: "模擬真實社群互動平台，展示從發文、留言到通知的完整 UI/UX 流程與資料驅動的體驗",
    color: "#ff9d69",
    icon: ForumRoundedIcon,
    actionHref: routes.forum_home,
    progress: 85,
    time: 1741968000000,
    type: "rwd",
  },
  {
    id: "photos",
    title: "相簿樣板",
    description: "探索相簿的 UI/UX 設計樣板，嘗試在瀏覽器中實現 windows 的相簿體驗",
    color: "#d077a1",
    icon: CameraRoundedIcon,
    actionHref: routes.photos_home,
    progress: 2,
    time: 1744579200000,
    type: "desktop",
  },
  {
    id: "assistant",
    title: "對話樣板",
    description: "最近流行的大語言模型對話樣板，模擬即時對話與AI回應體驗 (目前需要本地端有部屬 API 才能使用)",
    color: "#8179d2",
    icon: AutoAwesomeRoundedIcon,
    actionHref: routes.assistant_home,
    progress: 1,
    time: 1745915983183,
    type: "rwd",
  },
];

const projectsArrayForSearch = projectsArray.map((project) => ({
  title: project.title,
  description: project.description,
}));

type SearchResult = (Project & { highlights: Record<"title" | "description", Highlight[]> })[];

const useProjects = () => {
  const { searchParams } = useUrl();
  const search = useSearch(projectsArrayForSearch, ["title", "description"]);

  const { orderState } = useOrderState();
  const result = useMemo<SearchResult>(() => {
    const q = searchParams.get("q") ?? "";
    const isSearch = q.trim().length > 0;

    if (isSearch) {
      const searchResult = search(q);
      const formatted = searchResult.map((result) => {
        const project = projectsArray.find((project) => project.title === result.item.title);
        if (!project) return null;
        return { ...project, highlights: result.highlights };
      });

      return formatted.filter((project) => project !== null);
    }

    return sortObjectArray(projectsArray, (project) => project[orderState.orderBy], orderState.order).map(
      (project) => ({
        ...project,
        highlights: {
          title: [{ text: project.title, highlight: false }],
          description: [{ text: project.description, highlight: false }],
        },
      })
    );
  }, [searchParams, orderState, search]);

  const { filter } = useFilterState();
  const filtered = useMemo<SearchResult>(() => {
    if (filter === "all") return result;
    return result.filter((project) => project.type === filter);
  }, [result, filter]);

  return { projects: filtered };
};

export { useProjects, projectsArray };
