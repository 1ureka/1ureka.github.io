import type { Post } from "@/forum/utils/test";
import { PostHeader } from "./PostHeader";
import { Box } from "@mui/material";

const FullPost = ({ post }: { post: Post }) => {
  return (
    <Box sx={{ p: 1.5 }}>
      <PostHeader post={post} />
    </Box>
  );
};

const Comment = ({ postId }: { postId: number }) => {
  return (
    <div>
      <h2>Comments</h2>
    </div>
  );
};

export { FullPost as Post, Comment };
