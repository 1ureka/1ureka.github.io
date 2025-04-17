import { Box, Button, Stack, IconButton, Typography, Popover } from "@mui/material";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import MarkChatReadRoundedIcon from "@mui/icons-material/MarkChatReadRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

import { useState } from "react";
import { useSession } from "@/forum/hooks/session";
import { formatRelativeTime } from "@/utils/formatters";
import { ellipsisSx } from "@/utils/commonSx";
import type { Notification } from "@/forum/data/notification";

const MoreActionMenu = () => {
  const { authenticated, loading } = useSession();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton onClick={handleOpen} disabled={!authenticated} loading={loading}>
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
          <Button color="inherit" startIcon={<MarkChatReadRoundedIcon />}>
            標記為已讀
          </Button>
          <Button color="error" startIcon={<DeleteOutlineRoundedIcon />}>
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

const NotificationListItem = ({ title, message, isRead, createdAt }: Notification) => (
  <Stack sx={{ gap: 0.25 }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, position: "relative" }}>
      {!isRead && <UnreadDot />}
      <Typography variant="subtitle1">{title}</Typography>
      <Box sx={{ flex: 1 }} />
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {formatRelativeTime(createdAt)}
      </Typography>
      <MoreActionMenu />
    </Box>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {!isRead && <UnreadDot forAlign />}
      <Typography variant="body1" sx={{ color: "text.secondary", ...ellipsisSx }}>
        {message}
      </Typography>
    </Box>
  </Stack>
);

export { NotificationListItem };
