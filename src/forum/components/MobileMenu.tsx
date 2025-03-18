import { useState } from "react";
import { Badge, Divider, IconButton, ListItemIcon, MenuItem, MenuList, Popover } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import { ThemeMenu } from "./ThemeMenu";

const MobileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const onClose = () => setAnchorEl(null);

  const [themeAnchorEl, setThemeAnchorEl] = useState<HTMLElement | null>(null);
  const handleThemeOpen = (event: React.MouseEvent<HTMLElement>) => setThemeAnchorEl(event.currentTarget);
  const handleThemeClose = () => setThemeAnchorEl(null);

  return (
    <>
      <IconButton edge="start" onClick={handleClick}>
        <MenuRoundedIcon />
      </IconButton>

      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        open={open}
        onClose={onClose}
      >
        <MenuList dense>
          <MenuItem>
            <ListItemIcon>
              <HomeRoundedIcon fontSize="small" />
            </ListItemIcon>
            首頁
          </MenuItem>

          <Divider />

          <MenuItem>
            <ListItemIcon>
              <FavoriteRoundedIcon fontSize="small" />
            </ListItemIcon>
            收藏與追蹤
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ChatRoundedIcon fontSize="small" />
            </ListItemIcon>
            <Badge badgeContent={1} color="primary" anchorOrigin={{ vertical: "top", horizontal: "left" }}>
              訊息
            </Badge>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <NotificationsRoundedIcon fontSize="small" />
            </ListItemIcon>
            <Badge badgeContent={3} color="primary" anchorOrigin={{ vertical: "top", horizontal: "left" }}>
              通知
            </Badge>
          </MenuItem>

          <Divider />

          <MenuItem onClick={handleThemeOpen}>
            <ListItemIcon>
              <DarkModeRoundedIcon fontSize="small" />
            </ListItemIcon>
            切換主題
          </MenuItem>
          <ThemeMenu anchorEl={themeAnchorEl} onClose={handleThemeClose} />
        </MenuList>
      </Popover>
    </>
  );
};

export { MobileMenu };
