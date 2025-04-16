import { Badge, BottomNavigationAction, styled } from "@mui/material";
import { Box, SwipeableDrawer, IconButton, Popover, Tooltip } from "@mui/material";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { useState } from "react";
import { useNotificationCount } from "@/forum/hooks/notification";
import { NotificationList } from "./NotificationList";

const NotificationMenuDesktop = () => {
  const { data: count, isFetching } = useNotificationCount();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClose = () => setAnchorEl(null);
  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(anchorEl ? null : e.currentTarget);

  return (
    <>
      <Tooltip title="通知" arrow>
        <span>
          <IconButton onClick={handleOpen} loading={isFetching}>
            <Badge badgeContent={count ?? 0} color="primary">
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
        elevation={3}
        slotProps={{ paper: { sx: { borderRadius: 2 } } }}
      >
        <NotificationList sx={{ width: 360 }} />
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
  const { data: count, isFetching } = useNotificationCount();

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      <BottomNavigationAction
        showLabel
        label="通知"
        onClick={handleOpen}
        disabled={isFetching}
        icon={
          <Badge badgeContent={count ?? 0} color="primary">
            <NotificationsRoundedIcon />
          </Badge>
        }
      />

      <SwipeableDrawer anchor="left" open={open} onClose={handleClose} onOpen={handleOpen}>
        <Puller />

        <Box sx={{ pt: 3, pr: 3, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
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
