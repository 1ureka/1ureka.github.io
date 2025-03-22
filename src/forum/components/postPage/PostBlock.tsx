import { usePostById } from "@/forum/hooks/post";
import { useUrl } from "@/forum/hooks/url";
import { FullPost, LoadingFullPost } from "../postElement/FullPost";
import { Box, Divider, Typography } from "@mui/material";
import { Comments } from "./Comments";

const PostBlock = () => {
  const { searchParams } = useUrl();
  const param = searchParams.get("postId");
  const postId = param && /^\d+$/.test(param) && Number(param) > 0 ? Number(param) : -1;
  const { data: post, isFetching: postIsFetching } = usePostById(postId);

  if (postIsFetching && !post) {
    return <LoadingFullPost />;
  }

  if (!post) {
    return (
      <Box sx={{ pt: 1.5 }}>
        <Divider />
        <Typography variant="body1" component="p" sx={{ color: "text.secondary", textAlign: "center", mt: 6 }}>
          找不到該貼文
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <FullPost post={post} />
      <Comments />
    </>
  );
};

export { PostBlock };
