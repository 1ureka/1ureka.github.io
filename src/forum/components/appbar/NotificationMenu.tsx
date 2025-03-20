import { Fragment } from "react";
import { Divider, List, ListItem, ListItemIcon, ListItemText, Popover } from "@mui/material";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import type { PopoverProps } from "@mui/material";
import type { Notification } from "@/forum/utils/test";

type NotificationMenuProps = {
  notifications: Notification[];
  anchorEl: null | HTMLElement;
  onClose: () => void;
} & Omit<PopoverProps, "children" | "open" | "onClose">;

const NotificationMenu = ({ notifications, anchorEl, onClose, ...props }: NotificationMenuProps) => {
  return (
    <Popover
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      transformOrigin={{ horizontal: "center", vertical: "top" }}
      {...props}
    >
      <List sx={{ maxWidth: 320 }} dense>
        {notifications.map((notification, i) => (
          <Fragment key={notification.id}>
            <ListItem key={notification.id} alignItems="flex-start">
              <ListItemIcon>
                <CampaignRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={notification.title} secondary={notification.content} />
            </ListItem>
            {i < notifications.length - 1 && <Divider component="li" />}
          </Fragment>
        ))}
      </List>
    </Popover>
  );
};

export { NotificationMenu };
