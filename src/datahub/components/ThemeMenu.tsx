import { useState } from "react";
import { IconButton, MenuItem, MenuList, Popover, Tooltip, useColorScheme } from "@mui/material";
import type { PopoverProps } from "@mui/material";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";

const ThemeMenuWithButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Tooltip title="切換主題" arrow>
        <IconButton onClick={handleClick}>
          <DarkModeRoundedIcon />
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

export { ThemeMenuWithButton, ThemeMenu };
