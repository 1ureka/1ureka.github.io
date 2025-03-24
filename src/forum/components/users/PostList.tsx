import { useInfinitePosts } from "@/forum/hooks/post";
import { Stack, Typography } from "@mui/material";
import { ExpandedLoadingPost, ExpandedPost } from "../postElement/ExpandedPost";

const PostList = ({ author }: { author: string }) => {
  const { data, isLoading, isFetchingNextPage } = useInfinitePosts({
    author,
    orderBy: "createdAt",
    order: "desc",
  });

  if (isLoading || !data) {
    return (
      <Stack sx={{ alignItems: "stretch" }}>
        {[...Array(3)].map((_, i) => (
          <ExpandedLoadingPost key={i} />
        ))}
      </Stack>
    );
  }

  if (data.pages[0].items.length === 0) {
    return (
      <Typography sx={{ textAlign: "center", mt: 9, mb: 6, color: "text.secondary" }}>
        他/她還沒有發布過任何文章
      </Typography>
    );
  }

  return (
    <Stack sx={{ alignItems: "stretch" }}>
      {data.pages.map((page) => page.items.map((postId) => <ExpandedPost key={postId} postId={postId} />))}
      {isFetchingNextPage && (
        <Stack sx={{ alignItems: "stretch", mt: 1.5 }}>
          {[...Array(3)].map((_, i) => (
            <ExpandedLoadingPost key={i} />
          ))}
        </Stack>
      )}
    </Stack>
  );
};

const PostListWrapper = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const author = urlParams.get("user");

  if (!author) {
    window.location.replace("/404");
    return null;
  }

  return <PostList author={author} />;
};

export { PostListWrapper as PostList };
