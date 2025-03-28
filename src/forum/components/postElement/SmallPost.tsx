import { Box, Skeleton, Typography } from "@mui/material";
import { usePostById } from "@/forum/hooks/post";
import { routes } from "@/routes";

const SmallLoadingPost = () => (
  <Box sx={{ p: 1.5, outline: "1px solid", outlineColor: "divider", borderRadius: 1 }}>
    <Box sx={{ display: "flex", gap: 1.5, mb: 2, alignItems: "center" }}>
      <Skeleton variant="rounded" animation="wave">
        <Typography variant="body2">by loading...</Typography>
      </Skeleton>
    </Box>

    <Skeleton variant="rounded" animation="wave">
      <Typography variant="subtitle1" component="h6" sx={{ textAlign: "start" }}>
        正在載入標題...
      </Typography>
    </Skeleton>
  </Box>
);

const SmallPost = ({ postId }: { postId: number }) => {
  const { data: post, isFetching } = usePostById({ postId });

  if (isFetching || !post) {
    return <SmallLoadingPost />;
  }

  const handleNavigateToPost = () => {
    window.location.href = `${routes.forum_post}?postId=${post.id}`;
  };

  return (
    <Box
      sx={{
        p: 1.5,
        outline: "1px solid",
        outlineColor: "divider",
        borderRadius: 1,
        cursor: "pointer",
        "&:hover": { bgcolor: "action.hover" },
      }}
      onClick={handleNavigateToPost}
    >
      <Box sx={{ display: "flex", gap: 1.5, mb: 2, alignItems: "center" }}>
        <Typography
          variant="body2"
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
      </Box>

      <Typography
        variant="subtitle1"
        component="h6"
        sx={{
          textAlign: "start",
          display: "-webkit-box",
          WebkitLineClamp: 1,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          width: 0.7,
        }}
      >
        {post.title}
      </Typography>
    </Box>
  );
};

export { SmallPost, SmallLoadingPost };
