import { Badge, Box, Container, Divider, IconButton, ListItemIcon, type ToolbarProps } from "@mui/material";
import { Toolbar, Typography, MenuItem, MenuList, Popover } from "@mui/material";

import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

import { useState } from "react";
import { ThemeMenu } from "../ThemeMenu";
import { AccountMenu } from "./AccountMenu";
import { SearchBar } from "./SearchBar";
import { NotificationMenu } from "./NotificationMenu";
import { useNotifications } from "@/forum/hooks/notification";

const NotificationMenuItem = () => {
  const { data, isFetching } = useNotifications();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleNotificationClick = (event: React.MouseEvent<HTMLLIElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <MenuItem onClick={handleNotificationClick} disabled={isFetching || !data}>
        <ListItemIcon>
          <NotificationsRoundedIcon fontSize="small" />
        </ListItemIcon>
        <Badge badgeContent={data?.length} color="primary" anchorOrigin={{ vertical: "top", horizontal: "left" }}>
          通知
        </Badge>
      </MenuItem>
      <NotificationMenu
        anchorEl={anchorEl}
        onClose={handleNotificationClose}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
      />
    </>
  );
};

const TopSx = {
  position: "sticky",
  top: 0,
  zIndex: "appBar",
  bgcolor: "secondary.main",
  borderBottom: "solid 1px #fff2",
  boxShadow: 3,
  ".top &": { boxShadow: "none" },
  transition: "all 0.2s ease-in-out",
} as const;

const BottomSx = {
  position: "fixed",
  inset: "auto 0 0 0",
  zIndex: "appBar",
  bgcolor: "secondary.main",
  borderTop: "solid 1px #fff2",
  boxShadow: 3,
};

const AppbarMobile = ({ sx, ...props }: ToolbarProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const onClose = () => setAnchorEl(null);

  const [themeAnchorEl, setThemeAnchorEl] = useState<HTMLElement | null>(null);
  const handleThemeOpen = (event: React.MouseEvent<HTMLElement>) => setThemeAnchorEl(event.currentTarget);
  const handleThemeClose = () => setThemeAnchorEl(null);

  return (
    <>
      <Toolbar className="mode-dark" disableGutters sx={{ ...TopSx, ...sx }} {...props}>
        <Container sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.primary" }} maxWidth="xl">
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Typography variant="h4" component="h1" sx={{ mr: 1 }}>
              論壇樣板
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1, alignItems: "center", justifyContent: "center", flex: 1 }}>
            <SearchBar />
          </Box>
        </Container>
      </Toolbar>

      <Toolbar className="mode-dark" disableGutters sx={BottomSx}>
        <Container sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.primary" }} maxWidth="xl">
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <IconButton edge="start" onClick={handleClick} size="small">
              <MenuRoundedIcon fontSize="medium" />
            </IconButton>

            <Popover
              anchorEl={anchorEl}
              anchorOrigin={{ horizontal: "right", vertical: "top" }}
              open={open}
              onClose={onClose}
            >
              <MenuList dense>
                <MenuItem href="/" component="a">
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

                <NotificationMenuItem />

                <Divider />

                <MenuItem onClick={handleThemeOpen}>
                  <ListItemIcon>
                    <DarkModeRoundedIcon fontSize="small" />
                  </ListItemIcon>
                  切換主題
                </MenuItem>
                <ThemeMenu open={Boolean(themeAnchorEl)} anchorEl={themeAnchorEl} onClose={handleThemeClose} />
              </MenuList>
            </Popover>
          </Box>

          <Box sx={{ display: "flex", gap: 1, alignItems: "center", justifyContent: "flex-end", flex: 1 }}>
            <AccountMenu
              mobile
              slotsProps={{
                popover: {
                  anchorOrigin: { horizontal: "right", vertical: "top" },
                  transformOrigin: { horizontal: "right", vertical: "bottom" },
                },
              }}
            />
          </Box>
        </Container>
      </Toolbar>
    </>
  );
};

export { AppbarMobile };
