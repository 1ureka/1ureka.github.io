import { Box, Typography } from "@mui/material";
import TableViewRoundedIcon from "@mui/icons-material/TableViewRounded";
import TreeView from "./TreeView";
import { useEffect, useRef, useState } from "react";
import { ellipsisSx } from "@/utils/commonSx";

const Sidebar = () => {
  const [width, setWidth] = useState(350);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const startDragging = () => {
    isDraggingRef.current = true;
    document.body.style.cursor = "ew-resize";
    document.body.style.userSelect = "none";
  };

  const stopDragging = () => {
    isDraggingRef.current = false;
    document.body.style.cursor = "default";
    document.body.style.userSelect = "";
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDraggingRef.current || !sidebarRef.current) return;
    const newWidth = e.clientX - sidebarRef.current.getBoundingClientRect().left;
    if (newWidth >= 200 && newWidth <= 800) {
      setWidth(newWidth);
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
  }, []);

  return (
    <Box
      ref={sidebarRef}
      sx={{
        width,
        borderRight: 1,
        minHeight: 650,
        borderColor: "divider",
        position: "relative",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
        <TableViewRoundedIcon
          className="mode-light"
          sx={{
            fontSize: "3rem",
            mr: 1.5,
            bgcolor: "primary.main",
            borderRadius: 1,
            borderTopLeftRadius: "calc(var(--mui-shape-borderRadius) * 2.5)",
            color: "background.default",
            p: 1,
            opacity: 0.8,
          }}
        />
        <Typography variant="h6" sx={ellipsisSx}>
          資料表 & 檢視表
        </Typography>
      </Box>

      <Box
        sx={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "1rem",
          translate: "90% 0",
          cursor: "ew-resize",
          zIndex: 10,
          "&:hover": { bgcolor: "action.hover" },
          "&:active": { bgcolor: "action.selected" },
        }}
        onMouseDown={startDragging}
      />
      <TreeView />
    </Box>
  );
};

export default Sidebar;
