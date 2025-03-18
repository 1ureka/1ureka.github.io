import { Avatar, Box, Button, Chip, Divider, Tooltip, Typography } from "@mui/material";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import type { Post } from "../test";

const CollapsedPost = ({ post, like, onLike }: { post: Post; like: boolean; onLike: () => void }) => {
  return (
    <>
      <Box sx={{ p: 1.5, cursor: "pointer", "&:hover": { bgcolor: "action.hover" } }}>
        <Box sx={{ display: "flex", gap: 1.5, mb: 2, alignItems: "center" }}>
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

        <Typography
          variant="h6"
          component="h3"
          sx={{
            textAlign: "start",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {post.title}
        </Typography>

        <Typography
          variant="body2"
          component="p"
          sx={{
            color: "text.secondary",
            textAlign: "start",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {post.content}
        </Typography>

        <Box sx={{ display: "flex", gap: 1.5, mt: 2 }}>
          {post.tags.map((tag, i) => i < 3 && <Chip key={tag} label={tag} clickable size="small" />)}
          {post.tags.length > 3 && (
            <Chip label={`+${post.tags.length - 3}`} clickable size="small" variant="outlined" />
          )}
        </Box>
      </Box>

      <Divider flexItem />

      <Box
        sx={{
          p: 1.5,
          py: 1,
          display: "flex",
          gap: 1.5,
          alignItems: "center",
          position: "relative",
          color: "text.secondary",
        }}
      >
        <Box sx={{ position: "absolute", inset: 0, bgcolor: "divider", opacity: 0.35 }} />

        <Tooltip title={like ? "取消喜歡" : "喜歡"} arrow placement="left">
          <Button startIcon={<ThumbUpRoundedIcon />} size="small" color={like ? "primary" : "inherit"} onClick={onLike}>
            <Typography variant="caption" component="span">
              {post.likeCount} 個讚
            </Typography>
          </Button>
        </Tooltip>

        <Button color="inherit" startIcon={<CommentRoundedIcon />} size="small">
          <Typography variant="caption" component="span">
            {post.replyCount} 則回覆
          </Typography>
        </Button>

        <Button
          startIcon={<VisibilityRoundedIcon />}
          disabled
          size="small"
          sx={{ "button&.Mui-disabled": { color: "text.secondary", opacity: 0.8 } }}
        >
          <Typography variant="caption" component="span">
            {post.viewCount} 次瀏覽
          </Typography>
        </Button>
      </Box>

      <Divider flexItem />
    </>
  );
};

export { CollapsedPost };
