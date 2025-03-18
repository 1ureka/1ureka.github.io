import { Badge, IconButton, Tooltip } from "@mui/material";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import { ThemeMenuWithButton } from "./ThemeMenu";

const DesktopMenu = () => (
  <>
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
      <IconButton>
        <Badge badgeContent={3} color="primary">
          <NotificationsRoundedIcon fontSize="small" />
        </Badge>
      </IconButton>
    </Tooltip>
  </>
);

export { DesktopMenu };
