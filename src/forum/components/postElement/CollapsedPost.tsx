import { Box, Button, Chip, Divider, Skeleton, Typography } from "@mui/material";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";

import { usePostById } from "@/forum/hooks/post";
import { LikeButton } from "./shared/LikeButton";
import { TopicTags } from "./shared/TopicTags";
import { LoadingPostHeader, PostHeader } from "./shared/PostHeader";
import { routes } from "@/routes";

const CollapsedLoadingPost = () => {
  return (
    <>
      <Box sx={{ p: 1.5, cursor: "pointer", "&:hover": { bgcolor: "action.hover" } }}>
        <LoadingPostHeader />

        <Skeleton variant="rounded" animation="wave">
          <Typography variant="h6" component="h3" sx={{ textAlign: "start" }}>
            正在載入標題...
          </Typography>
        </Skeleton>

        <Typography variant="body2" component="p" sx={{ textAlign: "start", opacity: 0 }}>
          正在載入內容...
        </Typography>

        <Box sx={{ display: "flex", gap: 1.5, mt: 2 }}>
          {new Array(3).fill(null).map((_, i) => (
            <Skeleton key={i} variant="rounded" animation="wave">
              <Chip label="loading..." size="small" />
            </Skeleton>
          ))}
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

        <Button color="inherit" startIcon={<ThumbUpRoundedIcon />} size="small" loading={true}>
          <Typography variant="caption" component="span">
            100 個讚
          </Typography>
        </Button>

        <Button color="inherit" startIcon={<CommentRoundedIcon />} size="small" loading={true}>
          <Typography variant="caption" component="span">
            100 則回覆
          </Typography>
        </Button>

        <Button color="inherit" startIcon={<VisibilityRoundedIcon />} size="small" loading={true}>
          <Typography variant="caption" component="span">
            1000 次瀏覽
          </Typography>
        </Button>
      </Box>

      <Divider flexItem />
    </>
  );
};

const CollapsedPost = ({ postId }: { postId: number }) => {
  const { data: post, isFetching } = usePostById({ postId });

  if (isFetching || !post) {
    return <CollapsedLoadingPost />;
  }

  const handleNavigateToPost = () => {
    window.location.href = `${routes.forum_post}?postId=${post.id}`;
  };

  return (
    <>
      <Box sx={{ p: 1.5, cursor: "pointer", "&:hover": { bgcolor: "action.hover" } }} onClick={handleNavigateToPost}>
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

        <LikeButton postId={post.id} likeCount={post.likeCount} />

        <Button
          color="inherit"
          startIcon={<CommentRoundedIcon />}
          size="small"
          href={`${routes.forum_post}?postId=${post.id}`}
        >
          <Typography variant="caption" component="span">
            {post.commentCount} 則回覆
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

export { CollapsedPost, CollapsedLoadingPost };
