import type { Post } from "@/forum/utils/dataType";
import { Avatar, Box, BoxProps, Skeleton, Tooltip, Typography } from "@mui/material";

const PostHeader = ({ post, sx, ...props }: { post: Post } & BoxProps) => {
  const isUpdated = Math.abs(post.updatedAt.getTime() - post.createdAt.getTime()) > 1000;
  return (
    <Box sx={{ display: "flex", gap: 1.5, mb: 2, alignItems: "center", ...sx }} {...props}>
      <Avatar sx={{ bgcolor: "primary.main", width: "2rem", height: "2rem" }}>
        <Typography sx={{ translate: "0px 5%" }}>{post.author.slice(0, 1).toUpperCase()}</Typography>
      </Avatar>
      <Typography
        variant="subtitle1"
        component="a"
        href={`/src/forum/pages/users/index.html?user=${post.author}`}
        sx={{
          color: "text.secondary",
          textDecoration: "none",
          "&:hover": { textDecoration: "underline", color: "text.primary" },
        }}
      >
        by {post.author}
      </Typography>
      <Box sx={{ flex: 1 }} />
      {isUpdated ? (
        <Tooltip title={`上次編輯於 ${post.updatedAt.toLocaleString()}`} arrow>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              opacity: 0.9,
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            *{post.createdAt.toLocaleString()}
          </Typography>
        </Tooltip>
      ) : (
        <Typography variant="body2" sx={{ color: "text.secondary", opacity: 0.9 }}>
          {post.createdAt.toLocaleString()}
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
