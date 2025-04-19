import { Box, Button, Stack, IconButton, Typography, Popover } from "@mui/material";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import MarkChatReadRoundedIcon from "@mui/icons-material/MarkChatReadRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";

import { useState } from "react";
import { useSession } from "@/forum/hooks/session";
import { formatRelativeTime } from "@/utils/formatters";
import { ellipsisSx } from "@/utils/commonSx";
import { routes } from "@/routes";

import type { Notification } from "@/forum/data/notification";
import { useDeleteNotification, useMarkNotification } from "@/forum/hooks/notification";

const MoreActionMenu = ({ type, sourceId }: Notification) => {
  const { authenticated, loading: isLoading } = useSession();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const { mutateAsync: mark, isPending: isPendingMark } = useMarkNotification();
  const { mutateAsync: del, isPending: isPendingDelete } = useDeleteNotification();
  const isPending = isPendingMark || isPendingDelete;

  const handleMark = async () => {
    await mark({ type, sourceId });
    handleClose();
  };
  const handleDelete = async () => {
    await del({ type, sourceId });
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleOpen} disabled={!authenticated} loading={isLoading}>
        <MoreHorizRoundedIcon fontSize="small" />
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
            標記為已讀
          </Button>
          <Button color="error" startIcon={<DeleteOutlineRoundedIcon />} onClick={handleDelete} loading={isPending}>
            刪除該通知
          </Button>
        </Stack>
      </Popover>
    </>
  );
};

const UnreadDot = ({ forAlign = false }: { forAlign?: boolean }) => (
  <Box sx={{ width: "0.7rem", aspectRatio: "1/1", display: "grid", placeItems: "center", position: "relative" }}>
    {!forAlign && <Box sx={{ position: "absolute", inset: 1, borderRadius: "50%", bgcolor: "primary.main" }} />}
  </Box>
);

const NotificationListItem = (notification: Notification) => {
  const { title, message, isRead, createdAt, actorName, extraData, type, sourceId } = notification;
  const { mutateAsync: mark, isPending } = useMarkNotification();

  const handleMark = async () => {
    if (!isRead) await mark({ type, sourceId });
    if (type === "follow_user") window.location.href = `${routes.forum_users}?user=${actorName}`;
    else window.location.href = `${routes.forum_post}?postId=${extraData?.postId}`;
  };

  return (
    <Stack sx={{ position: "relative", gap: 0.25 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, position: "relative" }}>
        {!isRead && <UnreadDot />}
        <Typography variant="subtitle1">{title}</Typography>
        <Box sx={{ flex: 1 }} />
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {formatRelativeTime(createdAt)}
        </Typography>
        <MoreActionMenu {...notification} />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {!isRead && <UnreadDot forAlign />}
        <Typography variant="body1" sx={{ color: "text.secondary", ...ellipsisSx }}>
          {message}
        </Typography>
        <Box sx={{ flex: 1 }} />
        <Button
          variant="text"
          size="small"
          onClick={handleMark}
          startIcon={<ArrowOutwardRoundedIcon />}
          loading={isPending}
        >
          前往
        </Button>
      </Box>
    </Stack>
  );
};

export { NotificationListItem };
