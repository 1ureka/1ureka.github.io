// ----------------------------------------
// 假資料與模擬 API
// ----------------------------------------

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { posts } from "../utils/data";
import { useEffect } from "react";
import type { FetchPostsParams } from "@/forum/data/post";
import { fetchPostCounts, fetchPosts } from "@/forum/data/post";

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

const staleTime = 1 * 60 * 1000;

const usePosts = ({ limit, topic, userId, orderBy, order }: FetchPostsParams = {}) => {
  return useQuery({
    queryKey: ["posts", limit, topic, userId, orderBy, order],
    queryFn: async () => {
      const result = await fetchPosts({ page: 0, limit, topic, userId, orderBy, order });
      return result.posts;
    },
    staleTime,
  });
};

const usePostCounts = ({ topic }: { topic?: string } = {}) => {
  return useQuery({
    queryKey: ["postCounts", topic],
    queryFn: () => fetchPostCounts({ topic }),
    staleTime,
  });
};

const useInfinitePosts = ({ limit = 6, topic, userId, orderBy, order }: FetchPostsParams = {}) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["infinitePosts", limit, topic, userId, orderBy, order],
    queryFn: ({ pageParam: page }) => fetchPosts({ page, limit, topic, userId, orderBy, order }),
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
      const margin = 200;

      if (scrollTop + clientHeight >= scrollHeight - margin && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    scrollContainer.addEventListener("scroll", scrollHandler);
    return () => scrollContainer.removeEventListener("scroll", scrollHandler);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage };
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
