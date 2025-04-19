import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded";
import { ExpandedPost, ExpandedLoadingPost } from "../postElement/ExpandedPost";

import dayjs from "dayjs";
import { useUrl } from "@/hooks/url";
import { useSearchPosts } from "@/forum/hooks/postSearch";
import type { SearchPostsParams } from "@/forum/data/postSearch";
import type { FormField } from "./SearchForm";

type OrderBy = NonNullable<SearchPostsParams["orderBy"]>;
const orders: OrderBy[] = ["title", "createdAt", "updatedAt", "commentCount", "viewCount", "likeCount"];
const isOrder = (value: string): value is OrderBy => orders.includes(value as OrderBy);

const usePostList = () => {
  const { searchParams } = useUrl();
  const orderBy = searchParams.get("orderBy") ?? "title";
  const orderDesc = searchParams.get("orderDesc") === "true";

  const getDate = (type: "startDate" | "endDate") => {
    const date = searchParams.get(type);
    const dateObj = date ? dayjs(date) : null;
    return dateObj && dateObj.isValid() ? dateObj : null;
  };

  const search: Partial<FormField> = {
    all: searchParams.get("all") || undefined,
    title: searchParams.get("title") || undefined,
    content: searchParams.get("content") || undefined,
    author: searchParams.get("author") || undefined,
    likeCounts: Number(searchParams.get("likeCounts")) || 0,
    viewCounts: Number(searchParams.get("viewCounts")) || 0,
    startDate: getDate("startDate"),
    endDate: getDate("endDate"),
  };

  return useSearchPosts({
    orderBy: isOrder(orderBy) ? orderBy : "createdAt",
    order: orderDesc ? "desc" : "asc",
    ...search,
  });
};

const PostList = () => {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = usePostList();

  if (isLoading || !data) {
    return (
      <Stack sx={{ alignItems: "stretch", mb: 1.5 }}>
        {[...Array(2)].map((_, i) => (
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
  const { data } = usePostList();

  if (!data || data.pages.length === 0) {
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
      共 {data.pages[0].totalCount} 篇
    </Typography>
  );
};

export { PostList, PostCounts };
