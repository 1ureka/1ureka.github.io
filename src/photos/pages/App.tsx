import { Box, ButtonBase, Divider, IconButton, Stack, Typography, useColorScheme } from "@mui/material";
import CameraRoundedIcon from "@mui/icons-material/CameraRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import DragHandleRoundedIcon from "@mui/icons-material/DragHandleRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

import { useResponsiveFontSize } from "../utils/theme";
import { AppWrapper } from "@/photos/components/AppWrapper";
import { SearchBar } from "../components/appbar/SearchBar";
import { BoxM } from "@/components/Motion";
import { useEffect, useRef, useState } from "react";
import { useSpring } from "motion/react";

const ThemeSwitch = () => {
  const { mode, setMode, systemMode } = useColorScheme();
  const isLight = mode === "light" || systemMode === "light";
  const isDark = mode === "dark" || systemMode === "dark";

  return (
    <Box
      sx={{
        position: "relative",
        p: 0.5,
        gap: 0.5,
        bgcolor: "action.hover",
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
      }}
    >
      <BoxM
        layout
        sx={{
          position: "absolute",
          left: isLight ? 0 : undefined,
          ml: isLight ? 0.5 : undefined,
          right: isDark ? 0 : undefined,
          mr: isDark ? 0.5 : undefined,
          p: 1,
          width: "1.25rem",
          height: "1.25rem",
          boxSizing: "content-box",
          bgcolor: "primary.light",
          borderRadius: 1.5,
        }}
      />

      <IconButton
        onClick={() => setMode("light")}
        centerRipple={false}
        sx={{
          position: "relative",
          borderRadius: 1.5,
          overflow: "hidden",
          color: isLight ? "background.paper" : undefined,
          transition: "0.25s all ease",
        }}
      >
        <LightModeRoundedIcon fontSize="small" />
      </IconButton>
      <IconButton
        onClick={() => setMode("dark")}
        centerRipple={false}
        sx={{
          position: "relative",
          borderRadius: 1.5,
          overflow: "hidden",
          color: isDark ? "background.paper" : undefined,
          transition: "0.25s all ease",
        }}
      >
        <DarkModeRoundedIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

const appbarHeight = 72;

const Content = () => {
  const expandedWidthRef = useRef(320);
  const collapsedWidthRef = useRef(56);
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
    document.body.style.userSelect = "none";
  };

  const stopDragging = () => {
    setDragging(false);
    document.body.style.cursor = "default";
    document.body.style.userSelect = "";
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging || !sidebarRef.current) return;
    const newWidth = e.clientX - sidebarRef.current.getBoundingClientRect().left;
    if (newWidth >= 200 && newWidth <= 800) {
      expandedWidthRef.current = newWidth;
      width.set(newWidth);
    }
  };

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
      <BoxM ref={sidebarRef} sx={{ height: 1 }} style={{ width }}>
        <Stack sx={{ gap: 0.5, p: 1, alignItems: "flex-start" }}>
          <IconButton
            onClick={toggle}
            centerRipple={false}
            sx={{ borderRadius: 2, "& svg": { transition: "scale 0.15s ease" }, "&:active svg": { scale: "0.5 1" } }}
          >
            <MenuRoundedIcon />
          </IconButton>
        </Stack>
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

          <ButtonBase
            sx={{
              display: "flex",
              alignItems: "center",
              p: 0.5,
              pr: 0,
              borderRadius: 2,
              textAlign: "left",
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            <Box
              sx={{
                width: "2.3rem",
                aspectRatio: 1,
                borderRadius: 1.5,
                bgcolor: "primary.light",
                display: "grid",
                placeItems: "center",
                mr: 1,
              }}
            >
              <Typography variant="h6" component="span" sx={{ color: "primary.contrastText" }}>
                1
              </Typography>
            </Box>

            <Typography variant="subtitle1" component="h6">
              1ureka
            </Typography>

            <Box sx={{ color: "text.secondary" }}>
              <ArrowDropDownRoundedIcon color="inherit" />
            </Box>
          </ButtonBase>
        </Box>
      </Box>

      <Content />
    </AppWrapper>
  );
}

export default App;
