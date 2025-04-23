import { Box, Divider, type IconProps, Typography } from "@mui/material";
import WebStoriesRoundedIcon from "@mui/icons-material/WebStoriesRounded";
import WebAssetRoundedIcon from "@mui/icons-material/WebAssetRounded";
import { AnimatePresence } from "motion/react";
import { BoxM } from "@/components/Motion";

import { ProjectCard } from "./ProjectCard";
import { useProjects } from "@/home/hooks/useProjects";
import { useProjectPages } from "@/home/hooks/useProjectPages";

const GroupName = ({ Icon, title }: { Icon: React.FC<{ sx: IconProps["sx"] }>; title: string }) => {
  return (
    <BoxM
      layout
      sx={{
        gridColumn: "1 / -1",
        mt: 2.5,
        display: "grid",
        gridTemplateColumns: "auto auto 0.97fr",
        alignItems: "center",
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
    >
      <Divider>
        <Icon sx={{ fontSize: "2rem", color: "action.active", display: "block" }} />
      </Divider>
      <Divider>
        <Typography variant="h6" component="h6" sx={{ color: "action.active" }}>
          {title}
        </Typography>
      </Divider>
      <Divider />
    </BoxM>
  );
};

const ProjectList = () => {
  const { projects } = useProjects();
  const { projectPages } = useProjectPages();

  return (
    <Box
      sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(auto-fill, minmax(500px, 1fr))" }, gap: 2 }}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {projects.length > 0 && <GroupName key="收錄的專案" Icon={WebStoriesRoundedIcon} title="收錄的專案" />}
        {projects.map(({ time, title, description, highlights, ...project }) => (
          <ProjectCard key={`${time}${title}${description}`} {...project} {...highlights} />
        ))}
        {projectPages.length > 0 && <GroupName key="收錄的頁面" Icon={WebAssetRoundedIcon} title="收錄的頁面" />}
      </AnimatePresence>
    </Box>
  );
};

export { ProjectList };
