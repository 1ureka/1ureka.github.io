// ----------------------------------------
// 假資料與模擬 API
// ----------------------------------------

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { posts } from "../utils/data";
import { useEffect } from "react";

const sortObjectArray = <T extends object>(array: T[], orderBy: keyof T, order: "asc" | "desc" = "asc"): T[] => {
  return [...array].sort((a, b) => {
    const valueA = a[orderBy];
    const valueB = b[orderBy];

    if (valueA === valueB) return 0;

    // 升序或降序排列
    const comparison = valueA < valueB ? -1 : 1;
    return order === "asc" ? comparison : -comparison;
  });
};

const fakeFetchPosts = async ({
  pageParam = 0, // 頁面參數
  limit = 10, // 默認每頁 10 條
  topic,
  orderBy,
  order = "asc",
}: QueryPostsOptions & { pageParam?: number } = {}) => {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));

  // 如果提供了 topic，按標籤篩選
  let filteredPosts = posts;
  if (topic) filteredPosts = posts.filter((post) => post.tags.includes(topic));

  // 如果提供了排序條件，進行排序
  if (orderBy && Object.keys(posts[0]).includes(orderBy)) {
    filteredPosts = sortObjectArray(filteredPosts, orderBy as keyof (typeof posts)[0], order);
  }

  const postIds = filteredPosts.map(({ id }) => id);

  // 計算當前頁面的資料
  const startIndex = pageParam * limit;
  const endIndex = startIndex + limit;
  const paginatedIds = postIds.slice(startIndex, endIndex);

  // 返回需要的資料結構
  return {
    items: paginatedIds,
    nextPage: endIndex < postIds.length ? pageParam + 1 : null, // 如果還有下一頁，返回下一頁的頁碼
    totalItems: postIds.length,
    totalPages: Math.ceil(postIds.length / limit),
  };
};

const fakeFetchPostById = async (postId: number) => {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
  return posts.find((post) => post.id === postId) ?? null;
};

const fakeFetchTags = async () => {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
  return [...new Set(posts.flatMap((post) => post.tags))];
};

// ----------------------------------------
// 實際 Hook
// ----------------------------------------

type QueryPostsOptions = {
  limit?: number;
  topic?: string;
  orderBy?: string;
  order?: "asc" | "desc";
};

const staleTime = 1 * 60 * 1000;

const usePosts = ({ limit, topic, orderBy, order }: QueryPostsOptions = {}) => {
  return useQuery({
    queryKey: ["posts", limit, topic, orderBy, order],
    queryFn: async () => {
      const result = await fakeFetchPosts({ pageParam: 0, limit, topic, orderBy, order });
      return result.items;
    },
    staleTime,
  });
};

const usePostCounts = ({ topic }: { topic?: string } = {}) => {
  return useQuery({
    queryKey: ["postCounts", topic],
    queryFn: async () => {
      const result = await fakeFetchPosts({ pageParam: 0, topic, limit: 1 });
      return result.totalItems;
    },
    staleTime,
  });
};

const useInfinitePosts = ({ limit = 6, topic, orderBy, order }: QueryPostsOptions = {}) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["infinitePosts", limit, topic, orderBy, order],
    queryFn: ({ pageParam }) => fakeFetchPosts({ pageParam, limit, topic, orderBy, order }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime,
  });

  useEffect(() => {
    const scrollContainer = document.getElementById("scroll-area");
    if (!scrollContainer) return;

    const scrollHandler = () => {
      const scrollHeight = scrollContainer.scrollHeight;
      const scrollTop = scrollContainer.scrollTop;
      const clientHeight = scrollContainer.clientHeight;
      const margin = 100;

      if (scrollTop + clientHeight >= scrollHeight - margin && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    scrollContainer.addEventListener("scroll", scrollHandler);
    return () => scrollContainer.removeEventListener("scroll", scrollHandler);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return { data, isLoading, isFetchingNextPage };
};

const useTags = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: fakeFetchTags,
    staleTime,
  });
};

const usePostById = (postId: number | undefined) => {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => {
      if (postId === undefined || Number.isNaN(postId)) return null;
      return fakeFetchPostById(postId);
    },
    enabled: postId !== undefined && !Number.isNaN(postId) && postId >= 0, // 確保有效的 postId
    staleTime,
  });
};

export { usePosts, usePostCounts, useInfinitePosts, useTags, usePostById };
