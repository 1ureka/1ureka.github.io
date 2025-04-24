import { Box } from "@mui/material";
import { AnimatePresence } from "motion/react";

import { ProjectCard } from "./ProjectCard";
import { PageCard } from "./PageCard";
import { useProjects } from "@/home/hooks/useProjects";
import { useProjectPages } from "@/home/hooks/useProjectPages";

const ProjectList = () => {
  const { projects } = useProjects();
  const { projectPages } = useProjectPages();

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(auto-fill, minmax(300px, 1fr))",
          md: "repeat(auto-fill, minmax(400px, 1fr))",
        },
        gap: 2,
      }}
    >
      <AnimatePresence initial={false} mode="popLayout">
        <Box key={"divider1"} sx={{ gridColumn: "1 / -1" }} />
        {projects.map(({ time, title, description, highlights, ...project }) => (
          <ProjectCard key={`${time}${title}${description}`} {...project} {...highlights} />
        ))}
        <Box key={"divider2"} sx={{ gridColumn: "1 / -1", p: 1.25 }} />
        {projectPages.map(({ href, Icon, color, highlights }) => (
          <PageCard key={href} href={href} Icon={Icon} color={color} title={highlights.title} />
        ))}
      </AnimatePresence>
    </Box>
  );
};

export { ProjectList };
