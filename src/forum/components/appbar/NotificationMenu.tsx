import { Badge, BottomNavigationAction, Button, Chip, Stack, styled } from "@mui/material";
import { Box, Divider, SwipeableDrawer, IconButton, Typography, Popover, Tooltip } from "@mui/material";
import type { StackProps } from "@mui/material";

import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import MarkChatReadRoundedIcon from "@mui/icons-material/MarkChatReadRounded";
import ClearAllRoundedIcon from "@mui/icons-material/ClearAllRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { useState } from "react";
import { useNotifications } from "@/forum/hooks/notification";

const MoreActionMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton onClick={handleOpen} size="small">
        <MoreHorizRoundedIcon />
      </IconButton>

      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        elevation={3}
      >
        <Stack
          sx={{ gap: 0.5, p: 0.5, color: "color-mix(in srgb, transparent 30%, var(--mui-palette-text-primary) 70%)" }}
        >
          <Button color="inherit" startIcon={<MarkChatReadRoundedIcon />}>
            已讀所有
          </Button>
          <Button color="error" startIcon={<ClearAllRoundedIcon />}>
            清除所有
          </Button>
        </Stack>
      </Popover>
    </>
  );
};

const options = ["all", "unread", "comment", "follow"] as const;
const optionsLabel = { all: "所有", unread: "未讀", comment: "來自留言", follow: "來自關注" } as const;

const NotificationList = ({ sx, ...props }: StackProps) => {
  // TODO: useNotifications
  const [filter, setFilter] = useState<(typeof options)[number]>("all");

  return (
    <Stack sx={sx} {...props}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2, pb: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <NotificationsRoundedIcon
            className="mode-light"
            sx={{ fontSize: "2rem", bgcolor: "primary.main", borderRadius: 1, color: "background.default", p: 1 }}
          />
          <Typography variant="h6">通知</Typography>
        </Box>
        <MoreActionMenu />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap", p: 2, pt: 0 }}>
        {options.map((option) => (
          <Chip
            key={option}
            color={filter === option ? "primary" : "default"}
            variant={filter === option ? "filled" : "outlined"}
            onClick={() => setFilter(option)}
            label={optionsLabel[option]}
          />
        ))}
      </Box>

      <Divider />

      <Box sx={{ display: "grid", placeItems: "center", maxHeight: 350, overflowY: "auto", overflowX: "hidden", p: 2 }}>
        <Box sx={{ p: 6 }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            目前沒有通知
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
};

const NotificationMenuDesktop = () => {
  const { data, isFetching } = useNotifications(); // TODO: 改成 useNotificationCounts
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
  const { data, isFetching } = useNotifications(); // TODO: 改成 useNotificationCounts
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
