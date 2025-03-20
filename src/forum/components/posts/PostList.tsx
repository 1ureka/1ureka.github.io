import { Skeleton, Stack, Typography } from "@mui/material";
import { usePosts } from "@/forum/hooks/post";
import { ExpandedPost } from "../post/ExpandedPost";
import { ExpandedLoadingPost } from "../post/LoadingPost";

const PostList = ({ topic }: { topic?: string }) => {
  const { data, isFetching } = usePosts({ topic });

  if (isFetching || !data) {
    return (
      <Stack sx={{ alignItems: "stretch", mb: 1.5 }}>
        {[...Array(3)].map((_, i) => (
          <ExpandedLoadingPost key={i} />
        ))}
      </Stack>
    );
  }

  if (data.length === 0) {
    return (
      <Typography variant="body1" component="p" sx={{ color: "text.secondary", textAlign: "center", mt: 3 }}>
        沒有符合條件的貼文
      </Typography>
    );
  }

  return (
    <Stack sx={{ alignItems: "stretch", mb: 1.5 }}>
      {data.map((postId) => (
        <ExpandedPost key={postId} postId={postId} />
      ))}
    </Stack>
  );
};

const PostCounts = ({ topic }: { topic?: string }) => {
  const { data } = usePosts({ topic });

  if (!data) {
    return (
      <Skeleton variant="rounded" animation="wave">
        <Typography variant="body2" component="span" sx={{ color: "text.secondary" }}>
          共 0 篇
        </Typography>
      </Skeleton>
    );
  }

  return (
    <Typography variant="body2" component="span" sx={{ color: "text.secondary" }}>
      共 {data.length} 篇
    </Typography>
  );
};

export { PostList, PostCounts };
