import { Box, Divider, Typography } from "@mui/material";
import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded";

import { useUrl } from "@/forum/hooks/url";
import { usePostById, usePosts } from "@/forum/hooks/post";
import { ExpandedLoadingPost, ExpandedPost } from "../postElement/ExpandedPost";
import { FullPost, LoadingFullPost } from "../postElement/FullPost";
import { Comments } from "./Comments";

const FallbackPosts = () => {
  const { data: posts, isFetching } = usePosts({ limit: 2, orderBy: "likeCount", order: "desc" });

  if (isFetching || !posts) {
    return (
      <Box>
        <ExpandedLoadingPost />
        <ExpandedLoadingPost />
      </Box>
    );
  }

  return (
    <Box>
      {posts.map((postId) => (
        <ExpandedPost key={postId} postId={postId} />
      ))}
    </Box>
  );
};

const PostBlock = () => {
  const { searchParams } = useUrl();
  const param = searchParams.get("postId");
  const postId = param && /^\d+$/.test(param) && Number(param) > 0 ? Number(param) : -1;
  const { data: post, isFetching: postIsFetching } = usePostById({ postId, incrementViewCount: true });

  if (postIsFetching && !post) {
    return <LoadingFullPost />;
  }

  if (!post) {
    return (
      <Box sx={{ pt: 1.5 }}>
        <Divider />

        <Box sx={{ py: 6, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <SentimentDissatisfiedRoundedIcon sx={{ fontSize: "6rem", color: "action.disabled" }} />
          <Typography variant="body1" component="p" sx={{ color: "text.secondary", textAlign: "center" }}>
            貼文不存在或已被刪除
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ position: "relative" }}>
          <Box sx={{ position: "absolute", inset: 0, bgcolor: "divider", opacity: 0.35 }} />
          <Typography variant="h6" sx={{ p: 2 }}>
            我們找不到這篇貼文...但你可能會喜歡這些！
          </Typography>
        </Box>

        <Divider />

        <FallbackPosts />
      </Box>
    );
  }

  return (
    <>
      <FullPost post={post} />
      <Comments totalComments={post.commentCount} />
    </>
  );
};

export { PostBlock };
