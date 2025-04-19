import { Button, Chip, CircularProgress, Stack } from "@mui/material";
import { Box, Divider, IconButton, Typography, Popover } from "@mui/material";
import type { StackProps } from "@mui/material";

import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import MarkChatReadRoundedIcon from "@mui/icons-material/MarkChatReadRounded";
import ClearAllRoundedIcon from "@mui/icons-material/ClearAllRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";

import { useState } from "react";
import { useNotifications } from "@/forum/hooks/notification";
import { useSession } from "@/forum/hooks/session";
import { NotificationListItem } from "./NotificationListItem";
import { useDeleteAllNotifications, useMarkAllNotification } from "@/forum/hooks/notification";

const MoreActionMenu = () => {
  const { authenticated, loading } = useSession();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const { mutateAsync: mark, isPending: isPendingMark } = useMarkAllNotification();
  const { mutateAsync: del, isPending: isPendingDelete } = useDeleteAllNotifications();
  const isPending = isPendingMark || isPendingDelete;

  const handleMark = async () => {
    await mark();
    handleClose();
  };
  const handleDelete = async () => {
    await del();
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleOpen} size="small" disabled={!authenticated} loading={loading}>
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
          <Button color="inherit" startIcon={<MarkChatReadRoundedIcon />} onClick={handleMark} loading={isPending}>
            已讀所有
          </Button>
          <Button color="error" startIcon={<ClearAllRoundedIcon />} onClick={handleDelete} loading={isPending}>
            清除所有
          </Button>
        </Stack>
      </Popover>
    </>
  );
};

const options = ["all", "unread", "comment", "follow"] as const;
const optionsLabel = { all: "所有", unread: "未讀", comment: "來自留言", follow: "來自關注" } as const;

const ListContent = ({ filter }: { filter: (typeof options)[number] }) => {
  let filterBy: ("reply_post" | "reply_comment" | "follow_user")[] | undefined = undefined;
  if (filter === "unread" || filter === "all") filterBy = undefined;
  if (filter === "comment") filterBy = ["reply_post", "reply_comment"];
  if (filter === "follow") filterBy = ["follow_user"];

  const isRead = filter === "unread" ? false : undefined;
  const { data, isFetching } = useNotifications({ limit: 30, filterBy, isRead });

  if (isFetching || data === undefined) {
    return (
      <Box sx={{ p: 6 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  const { notifications } = data;

  if (notifications.length <= 0) {
    return (
      <Box sx={{ p: 6 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          目前沒有通知
        </Typography>
      </Box>
    );
  }

  return (
    <Stack sx={{ width: 1, gap: 1.5 }}>
      {notifications.map((notification) => (
        <NotificationListItem key={notification.id} {...notification} />
      ))}
    </Stack>
  );
};

const NotificationList = ({ sx, ...props }: StackProps) => {
  const { authenticated } = useSession();
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
        {authenticated ? (
          <ListContent filter={filter} />
        ) : (
          <Box sx={{ p: 6 }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              請先登入以查看通知
            </Typography>
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export { NotificationList };
