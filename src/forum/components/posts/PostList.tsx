import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded";
import { useInfinitePosts, usePostCounts } from "@/forum/hooks/post";
import { ExpandedPost, ExpandedLoadingPost } from "../postElement/ExpandedPost";
import { useUrl } from "@/forum/hooks/url";
import type { FetchPostsParams } from "@/forum/data/post";

type OrderBy = NonNullable<FetchPostsParams["orderBy"]>;
const orders: OrderBy[] = ["title", "createdAt", "updatedAt", "commentCount", "viewCount", "likeCount"];
const isOrder = (value: string): value is OrderBy => orders.includes(value as OrderBy);

const PostList = () => {
  const { searchParams } = useUrl();
  const topic = searchParams.get("topic") ?? undefined;
  const orderBy = searchParams.get("orderBy") ?? "title";
  const orderDesc = searchParams.get("orderDesc") === "true";
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfinitePosts({
    topic,
    orderBy: isOrder(orderBy) ? orderBy : "createdAt",
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

  if (data.pages[0].posts.length === 0) {
    return (
      <Box sx={{ py: 6, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <SentimentDissatisfiedRoundedIcon sx={{ fontSize: "6rem", color: "action.disabled" }} />
        <Typography variant="body1" component="p" sx={{ color: "text.secondary", textAlign: "center" }}>
          沒有符合條件的貼文
        </Typography>
      </Box>
    );
  }

  return (
    <Stack sx={{ alignItems: "stretch", mb: 1.5 }}>
      {data.pages.map((page) => page.posts.map((postId) => <ExpandedPost key={postId} postId={postId} />))}
      {isFetchingNextPage && (
        <Stack sx={{ alignItems: "stretch", mt: 1.5 }}>
          {[...Array(3)].map((_, i) => (
            <ExpandedLoadingPost key={i} />
          ))}
        </Stack>
      )}
      {!hasNextPage ? (
        <Typography sx={{ color: "text.secondary", textAlign: "center", mt: 3 }}>已經到底了</Typography>
      ) : isFetchingNextPage ? (
        <Typography sx={{ color: "text.secondary", textAlign: "center", mt: 3 }}>載入中...</Typography>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 3, gap: 1 }}>
          <Typography sx={{ color: "text.secondary" }}>滾動以載入更多，或點擊</Typography>
          <Button onClick={() => fetchNextPage()}>載入更多</Button>
        </Box>
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
