import { useState } from "react";
import { Popover, Tooltip, Typography, useColorScheme } from "@mui/material";
import { Box, Drawer, IconButton, MenuItem, MenuList } from "@mui/material";
import type { DrawerProps, PopoverProps } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";

const ThemeMenuWithButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Tooltip title="切換主題" arrow>
        <IconButton onClick={handleClick}>
          <DarkModeRoundedIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <ThemeMenu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
      />
    </>
  );
};

const ThemeMenu = ({ onClose, ...props }: PopoverProps & { onClose: () => void }) => {
  const { mode, setMode } = useColorScheme();

  const createHandler = (mode: "light" | "dark" | "system") => () => {
    setMode(mode);
    onClose();
  };

  return (
    <Popover anchorOrigin={{ horizontal: "right", vertical: "top" }} onClose={onClose} {...props}>
      <MenuList dense>
        <MenuItem onClick={createHandler("light")} selected={mode === "light"}>
          淺色
        </MenuItem>
        <MenuItem onClick={createHandler("dark")} selected={mode === "dark"}>
          暗色
        </MenuItem>
        <MenuItem onClick={createHandler("system")} selected={mode === "system"}>
          跟隨系統
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

const ThemeDrawer = ({ onClose, ...props }: DrawerProps & { onClose: () => void }) => {
  const { mode, setMode } = useColorScheme();

  const createHandler = (mode: "light" | "dark" | "system") => () => {
    setMode(mode);
    onClose();
  };

  return (
    <Drawer anchor="top" onClose={onClose} {...props}>
      <Box sx={{ p: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h6">切換主題</Typography>
        <IconButton onClick={onClose}>
          <CloseRoundedIcon />
        </IconButton>
      </Box>

      <MenuList dense>
        <MenuItem onClick={createHandler("light")} selected={mode === "light"}>
          淺色
        </MenuItem>
        <MenuItem onClick={createHandler("dark")} selected={mode === "dark"}>
          暗色
        </MenuItem>
        <MenuItem onClick={createHandler("system")} selected={mode === "system"}>
          跟隨系統
        </MenuItem>
      </MenuList>
    </Drawer>
  );
};

export { ThemeMenuWithButton, ThemeMenu, ThemeDrawer };
