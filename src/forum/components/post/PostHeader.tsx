import type { Post } from "@/forum/utils/test";
import { Avatar, Box, BoxProps, Typography } from "@mui/material";

const PostHeader = ({ post, sx, ...props }: { post: Post } & BoxProps) => (
  <Box sx={{ display: "flex", gap: 1.5, mb: 2, alignItems: "center", ...sx }} {...props}>
    <Avatar sx={{ bgcolor: "primary.main", width: "2rem", height: "2rem" }}>
      {post.author.slice(0, 1).toUpperCase()}
    </Avatar>
    <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
      by {post.author}
    </Typography>
    <Box sx={{ flex: 1 }} />
    <Typography variant="body2" sx={{ color: "text.secondary", opacity: 0.9 }}>
      {post.createdAt.toLocaleString()}
    </Typography>
  </Box>
);

export { PostHeader };
