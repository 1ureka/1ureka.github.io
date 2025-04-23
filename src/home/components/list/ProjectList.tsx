import { Box, type IconProps, Typography } from "@mui/material";
import WebStoriesRoundedIcon from "@mui/icons-material/WebStoriesRounded";
import WebAssetRoundedIcon from "@mui/icons-material/WebAssetRounded";
import { AnimatePresence } from "motion/react";
import { BoxM } from "@/components/Motion";

import { ProjectCard } from "./ProjectCard";
import { useProjects } from "@/home/hooks/useProjects";

const GroupName = ({ Icon, title }: { Icon: React.FC<{ sx: IconProps["sx"] }>; title: string }) => {
  return (
    <BoxM
      layout
      sx={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: 2.5, my: 1, mt: 2.5 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
    >
      <Icon
        sx={{ fontSize: "3.5rem", bgcolor: "action.active", borderRadius: 1.5, color: "background.default", p: 1 }}
      />
      <Typography variant="h4" component="h3" sx={{ fontFamily: "timemachine-wa" }}>
        {title}
      </Typography>
    </BoxM>
  );
};

const ProjectList = () => {
  const { projects } = useProjects();

  return (
    <Box
      sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(auto-fill, minmax(500px, 1fr))" }, gap: 2 }}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {projects.length > 0 && <GroupName key="收錄的專案" Icon={WebStoriesRoundedIcon} title="收錄的專案" />}
        {projects.map(({ time, title, description, highlights, ...project }) => (
          <ProjectCard key={`${time}${title}${description}`} {...project} {...highlights} />
        ))}
        <GroupName key="收錄的頁面" Icon={WebAssetRoundedIcon} title="收錄的頁面" />
      </AnimatePresence>
    </Box>
  );
};

export { ProjectList };
