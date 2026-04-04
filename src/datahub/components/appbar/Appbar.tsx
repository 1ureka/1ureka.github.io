import { Box } from "@mui/material";
import type { BoxProps } from "@mui/material";
import DataExplorationRoundedIcon from "@mui/icons-material/DataExplorationRounded";

import { SearchTopicFilter } from "./search/SearchTopic.tsx";
import { SearchBarButton } from "./search/SearchBarButton";
import { ThemeMenuWithButton } from "../ThemeMenu";
import { APPBAR_HEIGHT } from "./appbarSx";

const flexRowSx: BoxProps["sx"] = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};

const Appbar = () => {
  return (
    <Box
      component="header"
      sx={{
        position: "relative",
        gap: 3,
        justifyContent: "space-between",
        px: 3.5,
        bgcolor: "background.paper",
        height: APPBAR_HEIGHT,
        ...flexRowSx,
      }}
    >
      <Box sx={{ position: "absolute", inset: 0, bgcolor: "primary.main", opacity: 0.1, pointerEvents: "none" }} />

      <Box sx={{ gap: 6, ...flexRowSx }}>
        <DataExplorationRoundedIcon sx={{ fontSize: "2.5rem", color: "primary.main" }} />

        <Box sx={{ gap: 0.5, ...flexRowSx }}>
          <SearchTopicFilter />
          <SearchBarButton />
        </Box>
      </Box>

      <ThemeMenuWithButton />
    </Box>
  );
};

export { Appbar };
