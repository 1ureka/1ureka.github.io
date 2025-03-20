import { Box, Button, Divider, Typography } from "@mui/material";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

import type { Post } from "@/forum/utils/test";
import { LikeButton } from "./LikeButton";
import { TopicTags } from "./TopicTags";
import { PostHeader } from "./PostHeader";

const CollapsedPost = ({ post }: { post: Post }) => {
  return (
    <>
      <Box sx={{ p: 1.5, cursor: "pointer", "&:hover": { bgcolor: "action.hover" } }}>
        <PostHeader post={post} />

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
            whiteSpace: "pre-line",
          }}
        >
          {post.content}
        </Typography>

        <Box sx={{ display: "flex", gap: 1.5, mt: 2 }}>
          <TopicTags post={post} displayCount={3} />
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

        <LikeButton postId={post.id} />

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
