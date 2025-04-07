import { Badge, Box, IconButton, Tooltip, Typography, useMediaQuery } from "@mui/material";
import type { BoxProps } from "@mui/material";
import DataExplorationRoundedIcon from "@mui/icons-material/DataExplorationRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";

import { SrearchTopic } from "./SearchTopic";
import { SearchBar } from "./SearchBar";
import { ThemeMenuWithButton } from "../ThemeMenu";
import { AccountMenu } from "./AccountMenu";
import { APPBAR_HEIGHT } from "./appbarSx";

const flexRowSx: BoxProps["sx"] = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};

const Appbar = () => {
  const isMd = useMediaQuery((theme) => theme.breakpoints.up("md"));

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
        <Box sx={{ gap: 1, ...flexRowSx }}>
          <DataExplorationRoundedIcon sx={{ fontSize: "3em", color: "primary.main" }} />
          {isMd && (
            <Typography variant="h4" component="h1" sx={{ fontFamily: `"timemachine-wa"`, color: "secondary.dark" }}>
              資料樣板
            </Typography>
          )}
        </Box>

        <Box sx={{ gap: 0.5, ...flexRowSx }}>
          <SrearchTopic />
          <SearchBar />
        </Box>
      </Box>

      <Box sx={{ gap: 2, ...flexRowSx }}>
        <ThemeMenuWithButton />

        <Tooltip title="通知" arrow>
          <IconButton>
            <Badge variant="dot" badgeContent={1} color="error">
              <NotificationsRoundedIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        <AccountMenu />
      </Box>
    </Box>
  );
};

export { Appbar };
