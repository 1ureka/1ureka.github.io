import { useState } from "react";
import { IconButton, MenuItem, MenuList, Popover, Tooltip, useColorScheme } from "@mui/material";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";

const ThemeMenuWithButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const { mode, setMode } = useColorScheme();

  const createHandler = (mode: "light" | "dark" | "system") => () => {
    setMode(mode);
    handleClose();
  };

  return (
    <>
      <Tooltip title="切換主題" arrow>
        <IconButton onClick={handleClick}>
          <DarkModeRoundedIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        open={open}
        onClose={handleClose}
      >
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
    </>
  );
};

const ThemeMenu = ({ anchorEl, onClose }: { anchorEl: HTMLElement | null; onClose: () => void }) => {
  const { mode, setMode } = useColorScheme();
  const open = Boolean(anchorEl);

  const createHandler = (mode: "light" | "dark" | "system") => () => {
    setMode(mode);
    onClose();
  };

  return (
    <Popover anchorEl={anchorEl} anchorOrigin={{ horizontal: "right", vertical: "top" }} open={open} onClose={onClose}>
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

export { ThemeMenuWithButton, ThemeMenu };
