import { Stack } from "@mui/material";
import { CollapsedPost } from "../post/CollapsedPost";
import { usePosts } from "@/forum/hooks/post";
import { CollapsedLoadingPost } from "../post/LoadingPost";

const PostList = () => {
  const { data, isFetching } = usePosts({ limit: 5 });

  if (isFetching || !data) {
    return (
      <Stack sx={{ alignItems: "stretch", mb: 1.5 }}>
        {[...Array(5)].map((_, i) => (
          <CollapsedLoadingPost key={i} />
        ))}
      </Stack>
    );
  }

  return (
    <Stack sx={{ alignItems: "stretch", mb: 1.5 }}>
      {data.map((postId) => (
        <CollapsedPost key={postId} postId={postId} />
      ))}
    </Stack>
  );
};

export { PostList };
