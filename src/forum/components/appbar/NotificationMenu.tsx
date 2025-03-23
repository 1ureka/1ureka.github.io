import { Badge, BottomNavigationAction, List, ListItem, ListItemIcon, ListItemText, styled } from "@mui/material";
import { Box, Divider, SwipeableDrawer, IconButton, Typography, Popover, Tooltip } from "@mui/material";
import type { ListProps } from "@mui/material";

import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { Fragment, useState } from "react";
import { useNotifications } from "@/forum/hooks/notification";

const NotificationList = (props: ListProps) => {
  const { data } = useNotifications();
  const notifications = data ?? [];

  return (
    <List dense {...props}>
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
  );
};

const NotificationMenuDesktop = () => {
  const { data, isFetching } = useNotifications();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClose = () => setAnchorEl(null);
  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(anchorEl ? null : e.currentTarget);

  return (
    <>
      <Tooltip title="通知" arrow>
        <span>
          <IconButton onClick={handleOpen} loading={isFetching || !data}>
            <Badge badgeContent={data?.length} color="primary">
              <NotificationsRoundedIcon fontSize="small" />
            </Badge>
          </IconButton>
        </span>
      </Tooltip>

      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
      >
        <NotificationList sx={{ maxWidth: 320 }} />
      </Popover>
    </>
  );
};

const Puller = styled("div")(({ theme }) => ({
  height: 30,
  width: 6,
  backgroundColor: theme.palette.divider,
  borderRadius: 3,
  position: "absolute",
  right: 8,
  top: "calc(50% - 15px)",
  ...theme.applyStyles("dark", {
    backgroundColor: theme.palette.divider,
  }),
}));

const NotificationMenuMobile = () => {
  const { data, isFetching } = useNotifications();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      <BottomNavigationAction
        showLabel
        label="通知"
        onClick={handleOpen}
        disabled={isFetching || !data}
        icon={
          <Badge badgeContent={data?.length || 0} color="primary">
            <NotificationsRoundedIcon />
          </Badge>
        }
      />

      <SwipeableDrawer anchor="left" open={open} onClose={handleClose} onOpen={handleOpen}>
        <Puller />

        <Box sx={{ p: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="h6">通知</Typography>
          <IconButton onClick={handleClose}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        <NotificationList />
      </SwipeableDrawer>
    </>
  );
};

export { NotificationMenuDesktop, NotificationMenuMobile };
