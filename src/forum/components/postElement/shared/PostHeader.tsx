import type { FetchPostByIdResult } from "@/forum/data/post";
import { routes } from "@/routes";
import { Box, BoxProps, Skeleton, Tooltip, Typography, useMediaQuery } from "@mui/material";
import { UserAvatar } from "../../userElement/UserAvatar";
import { underlineSx } from "@/utils/commonSx";
import { formatRelativeTime } from "@/utils/formatters";

const PostHeader = ({ post, sx, ...props }: { post: FetchPostByIdResult } & BoxProps) => {
  const isMd = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const isUpdated = Math.abs(post.updatedAt.getTime() - post.createdAt.getTime()) > 1000;
  return (
    <Box sx={{ display: "flex", gap: 1.5, mb: 2, alignItems: "center", ...sx }} {...props}>
      <UserAvatar name={post.userName} />
      <Typography
        variant="subtitle1"
        component="a"
        href={`${routes.forum_users}?user=${post.userName}`}
        sx={{
          color: "text.secondary",
          textDecoration: "none",
          "&:hover": { textDecoration: "underline", color: "text.primary" },
        }}
      >
        by {post.userName}
      </Typography>
      <Box sx={{ flex: 1 }} />
      {isUpdated ? (
        <Tooltip title={`上次編輯於 ${post.updatedAt.toLocaleString()}`} arrow>
          <Typography variant="body2" sx={{ color: "text.secondary", opacity: 0.9, ...underlineSx }}>
            {isMd ? post.createdAt.toLocaleString() : formatRelativeTime(post.createdAt)} (已編輯)
          </Typography>
        </Tooltip>
      ) : (
        <Typography variant="body2" sx={{ color: "text.secondary", opacity: 0.9 }}>
          {isMd ? post.createdAt.toLocaleString() : formatRelativeTime(post.createdAt)}
        </Typography>
      )}
    </Box>
  );
};

const LoadingPostHeader = ({ sx, ...props }: BoxProps) => (
  <Box sx={{ display: "flex", gap: 1.5, mb: 2, alignItems: "center", ...sx }} {...props}>
    <Skeleton variant="circular" sx={{ width: "2rem", height: "2rem" }} animation="wave" />

    <Skeleton variant="rounded" animation="wave">
      <Typography variant="subtitle1">by loading...</Typography>
    </Skeleton>

    <Box sx={{ flex: 1 }} />

    <Skeleton variant="rounded" animation="wave">
      <Typography variant="body2">0000-00-00 00:00</Typography>
    </Skeleton>
  </Box>
);

export { PostHeader, LoadingPostHeader };
