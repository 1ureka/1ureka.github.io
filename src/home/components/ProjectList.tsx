import { Box } from "@mui/material";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import DataExplorationRoundedIcon from "@mui/icons-material/DataExplorationRounded";
import CameraRoundedIcon from "@mui/icons-material/CameraRounded";

import { AnimatePresence } from "motion/react";
import { ProjectCard, type ProjectCardProps } from "@/home/components/ProjectCard";

import { sortObjectArray } from "@/utils/array";
import { routes } from "@/routes";
import { useUrl } from "@/hooks/url";
import { useSearch, type Highlight } from "@/hooks/fuse";
import { useMemo } from "react";
import { useOrderState, useFilterState, filterSchema } from "../hooks/useControl";
import { z } from "zod";

type Project = ProjectCardProps & {
  time: number;
  type: z.infer<typeof filterSchema>;
};

const projectsArray: Project[] = [
  {
    title: "資料樣板",
    description: "探索資料結構、互動體驗與儀表板 UX 的設計樣板，結合可視化與開發工具的一站式後台模組",
    color: "#66cccc",
    icon: <DataExplorationRoundedIcon sx={{ fontSize: "4em", color: "#66cccc" }} />,
    actionHref: routes.datahub_home,
    progress: 39,
    time: 1743264000000,
    type: "desktop",
  },
  {
    title: "論壇樣板",
    description: "模擬真實社群互動平台，展示從發文、留言到通知的完整 UI/UX 流程與資料驅動的體驗",
    color: "#ff9d69",
    icon: <ForumRoundedIcon sx={{ fontSize: "4em", color: "#ff9d69" }} />,
    actionHref: routes.forum_home,
    progress: 85,
    time: 1741968000000,
    type: "rwd",
  },
  {
    title: "相簿樣板",
    description: "探索相簿的 UI/UX 設計樣板，嘗試在瀏覽器中實現 windows 的相簿體驗",
    color: "#d077a1",
    icon: <CameraRoundedIcon sx={{ fontSize: "4em", color: "#d077a1" }} />,
    actionHref: routes.photos_home,
    progress: 2,
    time: 1744579200000,
    type: "desktop",
  },
];

const projectsArrayForSearch = projectsArray.map((project) => ({
  title: project.title,
  description: project.description,
}));

type SearchResult = (Project & { highlights: Record<"title" | "description", Highlight[]> })[];

const ProjectList = () => {
  const { searchParams } = useUrl();
  const search = useSearch(projectsArrayForSearch, ["title", "description"]);

  const { orderState } = useOrderState();
  const { filter } = useFilterState();

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

  const filtered = useMemo<SearchResult>(() => {
    if (filter === "all") return result;
    return result.filter((project) => project.type === filter);
  }, [result, filter]);

  return (
    <Box
      sx={{
        mt: 5,
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(auto-fill, minmax(500px, 1fr))" },
        gap: 2,
        pb: 5,
      }}
    >
      <AnimatePresence initial={false}>
        {filtered.map(({ time, highlights, ...project }) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </AnimatePresence>
    </Box>
  );
};

export { ProjectList };
