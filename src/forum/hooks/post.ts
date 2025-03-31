import { useEffect } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchPostCounts, fetchPosts, fetchPostById, fetchTags } from "@/forum/data/post";
import type { FetchPostsParams, FetchPostCountsParams, FetchPostByIdParams } from "@/forum/data/post";

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

const usePostCounts = ({ topic }: FetchPostCountsParams = {}) => {
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
      const margin = 350;

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
    queryFn: fetchTags,
    staleTime,
  });
};

const usePostById = ({ postId, incrementViewCount }: FetchPostByIdParams) => {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => {
      if (postId === undefined || Number.isNaN(postId)) return null;
      return fetchPostById({ postId, incrementViewCount });
    },
    enabled: postId !== undefined && !Number.isNaN(postId) && postId >= 0, // 確保有效的 postId
    staleTime,
  });
};

export { usePosts, usePostCounts, useInfinitePosts, useTags, usePostById };
