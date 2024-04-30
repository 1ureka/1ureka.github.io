import * as React from "react";
import { useRecoilState } from "recoil";
import { Backdrop, Paper, ThemeProvider } from "@mui/material";

import { darkTheme } from "../../utils/theme";
import { SIDEBAR_OPEN } from "../../utils/store";

import SidebarLeft from "./Left";
import SidebarRight from "./Right";
import { SettingPanel } from "./Setting";

export default function Sidebar() {
  const [open, setOpen] = useRecoilState(SIDEBAR_OPEN);

  const containerSx = {
    position: "relative",
    height: "100%",
    py: 3.5,
    px: 1.5,
    borderRadius: 0,
    zIndex: darkTheme.zIndex.drawer,
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Backdrop
        open={open}
        onClick={() => setOpen(false)}
        sx={{ zIndex: darkTheme.zIndex.drawer, backdropFilter: "blur(5px)" }}
      ></Backdrop>
      <Paper sx={containerSx}>
        <SettingPanel />
        <SidebarLeft />
        <SidebarRight />
      </Paper>
    </ThemeProvider>
  );
}
