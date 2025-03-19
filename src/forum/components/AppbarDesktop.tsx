import { useState } from "react";
import { Badge, Box, ButtonBase, Container, IconButton, type ToolbarProps } from "@mui/material";
import { Toolbar, Tooltip, Typography } from "@mui/material";

import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";

import { ThemeMenuWithButton } from "./ThemeMenu";
import { AccountMenu } from "./AccountMenu";
import { SearchBar } from "./SearchBar";
import { NotificationMenu } from "./NotificationMenu";
import { notifications } from "../utils/test";

const Title = () => (
  <Tooltip title="返回首頁" arrow>
    <ButtonBase
      href="/"
      sx={{
        display: "flex",
        gap: 1.5,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 1,
        p: 1,
        "&:hover": { bgcolor: "divider" },
        "&:active": { scale: "0.95" },
        transition: "all 0.2s ease-in-out",
      }}
    >
      <ForumRoundedIcon fontSize="large" color="primary" />
      <Typography variant="h4" component="h1">
        論壇樣板
      </Typography>
    </ButtonBase>
  </Tooltip>
);

const DesktopSx = {
  position: "sticky",
  top: 0,
  zIndex: "appBar",
  bgcolor: "secondary.main",
  borderBottom: "solid 1px #fff2",
  boxShadow: 3,
  ".top &": { boxShadow: "none" },
  transition: "all 0.2s ease-in-out",
} as const;

const AppbarDesktop = ({ sx, ...props }: ToolbarProps) => {
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
  const handleNotificationClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setNotificationAnchorEl(notificationAnchorEl ? null : event.currentTarget);
  };
  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  return (
    <Toolbar className="mode-dark" disableGutters sx={{ ...DesktopSx, ...sx }} {...props}>
      <Container sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.primary" }} maxWidth="xl">
        <Box sx={{ display: "flex", justifyContent: "flex-start", flex: { xs: undefined, md: 1 } }}>
          <Title />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1 }}>
          <SearchBar />
        </Box>

        <Box sx={{ display: "flex", gap: 1, alignItems: "center", justifyContent: "flex-end", flex: 1 }}>
          <ThemeMenuWithButton />
          <Tooltip title="收藏與追蹤" arrow>
            <IconButton>
              <FavoriteRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="訊息" arrow>
            <IconButton>
              <Badge badgeContent={1} color="primary">
                <ChatRoundedIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="通知" arrow>
            <IconButton onClick={handleNotificationClick}>
              <Badge badgeContent={3} color="primary">
                <NotificationsRoundedIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>
          <NotificationMenu
            notifications={notifications}
            anchorEl={notificationAnchorEl}
            onClose={handleNotificationClose}
          />

          <AccountMenu />
        </Box>
      </Container>
    </Toolbar>
  );
};

export { AppbarDesktop };
