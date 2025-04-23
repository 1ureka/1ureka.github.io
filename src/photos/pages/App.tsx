import { Box, Divider, IconButton, Typography } from "@mui/material";
import CameraRoundedIcon from "@mui/icons-material/CameraRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import DragHandleRoundedIcon from "@mui/icons-material/DragHandleRounded";

import { useResponsiveFontSize } from "../utils/theme";
import { AppWrapper } from "@/photos/components/AppWrapper";
import { SearchBar } from "../components/appbar/SearchBar";
import { BoxM } from "@/components/Motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSpring } from "motion/react";

import { ThemeSwitch } from "../components/appbar/ThemeSwitch";
import { AccountMenu } from "../components/appbar/AccountMenu";
import { Sidebar } from "../components/sidebar/Sidebar";

const appbarHeight = 72;

const Content = () => {
  const expandedWidthRef = useRef(320);
  const collapsedWidthRef = useRef(64);
  const width = useSpring(expandedWidthRef.current, { bounce: 0.3 });
  const [dragging, setDragging] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    setExpanded((prev) => {
      if (prev) width.set(collapsedWidthRef.current);
      else width.set(expandedWidthRef.current);
      return !prev;
    });
  };

  const startDragging = () => {
    setDragging(true);
    document.body.style.cursor = "ew-resize";
    document.getElementById("root")!.style.pointerEvents = "none";
  };

  const stopDragging = useCallback(() => {
    setDragging(false);
    document.body.style.cursor = "default";
    document.getElementById("root")!.style.pointerEvents = "";
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragging || !sidebarRef.current) return;
      const newWidth = e.clientX - sidebarRef.current.getBoundingClientRect().left;
      if (newWidth >= 200 && newWidth <= 800) {
        expandedWidthRef.current = newWidth;
        width.set(newWidth);
      }
    },
    [dragging, width]
  );

  // 綁定事件
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopDragging);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopDragging);
    };
  }, [handleMouseMove, stopDragging]);

  return (
    <Box sx={{ display: "flex", height: `calc(100dvh - ${appbarHeight}px)`, position: "relative" }}>
      <BoxM
        ref={sidebarRef}
        sx={{ height: 1, overflowY: "auto", overflowX: "hidden", scrollbarGutter: "stable" }}
        style={{ width }}
      >
        <Sidebar expanded={expanded} onMenuClick={toggle} />
      </BoxM>

      <Box
        sx={{
          position: "relative",
          height: 1,
          flex: 1,
          overflow: "hidden",
          bgcolor: "background.paper",
          borderRadius: (theme) => `${theme.shape.borderRadius * 6}px 0 0 0`,
          border: 1,
          borderColor: "border.main",
        }}
      >
        <Box sx={{ height: 1, overflow: "auto", scrollbarGutter: "stable" }}>
          <Box sx={{ height: 1500 }} />
        </Box>

        <Box
          onMouseDown={startDragging}
          sx={{
            position: "absolute",
            inset: "0 auto 0 0",
            cursor: "ew-resize",
            "&:hover": { bgcolor: "action.hover" },
            display: "grid",
            pointerEvents: dragging || !expanded ? "none" : "auto",
            opacity: expanded ? 1 : 0,
            bgcolor: dragging ? "divider" : "transparent",
            scale: dragging ? "0.7 1" : "1 1",
            transformOrigin: "left",
            transition: "all 0.2s ease",
            placeItems: "center",
          }}
        >
          <DragHandleRoundedIcon
            sx={{ fontSize: "1.2rem", color: "text.secondary", rotate: "90deg", scale: "1.5 1" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

function App() {
  useResponsiveFontSize();

  return (
    <AppWrapper>
      <Box
        component="header"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 1.5,
          px: { xs: 1.5, sm: 3.5 },
          height: appbarHeight,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CameraRoundedIcon sx={{ fontSize: "3em", color: "primary.main" }} />
            <Typography variant="h4" component="h1" sx={{ fontFamily: `"timemachine-wa"`, color: "text.colored" }}>
              相簿樣板
            </Typography>
          </Box>

          <SearchBar />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            sx={{ borderRadius: 2, overflow: "hidden", "&:hover > p": { ml: 1, width: "2rem", opacity: 1 } }}
            centerRipple={false}
          >
            <SettingsRoundedIcon />
            <Typography
              variant="body1"
              sx={{ ml: 0, textWrap: "nowrap", width: 0, opacity: 0, transition: "0.2s all ease" }}
            >
              設定
            </Typography>
          </IconButton>

          <ThemeSwitch />

          <Divider flexItem orientation="vertical" />

          <AccountMenu />
        </Box>
      </Box>

      <Content />
    </AppWrapper>
  );
}

export default App;
