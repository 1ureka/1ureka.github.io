import { Skeleton, Stack, Typography } from "@mui/material";
import { useInfinitePosts, usePostCounts } from "@/forum/hooks/post";
import { ExpandedPost, ExpandedLoadingPost } from "../postElement/ExpandedPost";
import { useUrl } from "@/forum/hooks/url";

const PostList = () => {
  const { searchParams } = useUrl();
  const topic = searchParams.get("topic") ?? undefined;
  const orderBy = searchParams.get("orderBy") ?? "createdAt";
  const orderDesc = searchParams.get("orderDesc") === "true";
  const { data, isLoading, isFetchingNextPage } = useInfinitePosts({
    topic,
    orderBy,
    order: orderDesc ? "desc" : "asc",
  });

  if (isLoading || !data) {
    return (
      <Stack sx={{ alignItems: "stretch", mb: 1.5 }}>
        {[...Array(3)].map((_, i) => (
          <ExpandedLoadingPost key={i} />
        ))}
      </Stack>
    );
  }

  if (data.pages[0].items.length === 0) {
    return (
      <Typography variant="body1" component="p" sx={{ color: "text.secondary", textAlign: "center", mt: 3 }}>
        沒有符合條件的貼文
      </Typography>
    );
  }

  return (
    <Stack sx={{ alignItems: "stretch", mb: 1.5 }}>
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

const PostCounts = () => {
  const { searchParams } = useUrl();
  const topic = searchParams.get("topic") ?? undefined;
  const { data } = usePostCounts({ topic });

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
      共 {data} 篇
    </Typography>
  );
};

const PageTitle = () => {
  const { searchParams } = useUrl();
  const topic = searchParams.get("topic") ?? "全部";

  return <title>{`論壇樣板 | 貼文 #${topic}`}</title>;
};

export { PostList, PostCounts, PageTitle };
