import { Box, Divider, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import CameraRoundedIcon from "@mui/icons-material/CameraRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import DragHandleRoundedIcon from "@mui/icons-material/DragHandleRounded";
import CollectionsRoundedIcon from "@mui/icons-material/CollectionsRounded";
import CreateNewFolderRoundedIcon from "@mui/icons-material/CreateNewFolderRounded";
import BookmarksRoundedIcon from "@mui/icons-material/BookmarksRounded";
import CloudRoundedIcon from "@mui/icons-material/CloudRounded";
import FolderOpenRoundedIcon from "@mui/icons-material/FolderOpenRounded";

import { useResponsiveFontSize } from "../utils/theme";
import { AppWrapper } from "@/photos/components/AppWrapper";
import { SearchBar } from "../components/appbar/SearchBar";
import { BoxM } from "@/components/Motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSpring } from "motion/react";

import { ThemeSwitch } from "../components/appbar/ThemeSwitch";
import { AccountMenu } from "../components/appbar/AccountMenu";
import { MenuButton } from "../components/sidebar/MenuButton";
import { SidebarButton } from "../components/sidebar/SidebarButton";

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

  const [selected, setSelected] = useState(0);

  return (
    <Box sx={{ display: "flex", height: `calc(100dvh - ${appbarHeight}px)`, position: "relative" }}>
      <BoxM
        ref={sidebarRef}
        sx={{ height: 1, overflowY: "auto", overflowX: "hidden", scrollbarGutter: "stable" }}
        style={{ width }}
      >
        <Stack sx={{ gap: 0.5, p: 1, alignItems: "flex-start" }}>
          <MenuButton onClick={toggle} />

          {!expanded && (
            <BoxM layoutId={"add-folder"}>
              <Tooltip title={<Typography variant="body2">新增資料夾</Typography>} arrow placement="right">
                <IconButton
                  centerRipple={false}
                  sx={{ borderRadius: 2, width: "2.5rem", height: "2.5rem" }}
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                >
                  <CreateNewFolderRoundedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </BoxM>
          )}

          <SidebarButton
            expanded={expanded}
            active={selected === 0}
            icon={<CollectionsRoundedIcon fontSize="small" color="inherit" />}
            title="圖庫"
            action={
              <BoxM layoutId={"add-folder"}>
                <Tooltip title={<Typography variant="body2">新增資料夾</Typography>} arrow placement="right">
                  <IconButton
                    centerRipple={false}
                    sx={{ borderRadius: 2 }}
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                    component="span"
                  >
                    <CreateNewFolderRoundedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </BoxM>
            }
            onClick={() => setSelected(0)}
          />

          <SidebarButton
            expanded={expanded}
            active={selected === 1}
            icon={<BookmarksRoundedIcon fontSize="small" color="inherit" />}
            title="我的最愛"
            onClick={() => setSelected(1)}
          />

          <Divider flexItem />

          <SidebarButton
            expanded={expanded}
            active={selected === 2}
            icon={<CloudRoundedIcon fontSize="small" color="inherit" />}
            title="個人相簿"
            onClick={() => setSelected(2)}
            children={[...Array(5)].map((_, i) => ({
              active: selected === i + 3,
              icon: <FolderOpenRoundedIcon fontSize="small" color="inherit" />,
              title: `資料夾${i + 1}`,
              onClick: () => setSelected(i + 3),
              children:
                i === 3
                  ? [...Array(2)].map((_, j) => ({
                      active: selected === j + 8,
                      icon: <FolderOpenRoundedIcon fontSize="small" color="inherit" />,
                      title: `子資料夾${j + 1}`,
                      onClick: () => setSelected(j + 8),
                    }))
                  : [],
            }))}
          />
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

          <AccountMenu />
        </Box>
      </Box>

      <Content />
    </AppWrapper>
  );
}

export default App;
