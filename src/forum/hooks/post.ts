import { useEffect } from "react";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPostCounts, fetchPosts, fetchPostById } from "@/forum/data/post";
import { createPost, updatePost, deletePost } from "@/forum/data/post";
import { fetchTags, fetchUserTags } from "@/forum/data/tag";
import type { FetchPostsParams, FetchPostCountsParams, FetchPostByIdParams } from "@/forum/data/post";

const staleTime = 1 * 60 * 1000;

const usePosts = ({ limit, topic, userId, orderBy, order, prioritizeFollowers }: FetchPostsParams = {}) => {
  return useQuery({
    queryKey: ["posts", limit, topic, userId, orderBy, order, prioritizeFollowers],
    queryFn: async () => {
      const result = await fetchPosts({ page: 0, limit, topic, userId, orderBy, order, prioritizeFollowers });
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

const useInfinitePosts = ({ limit = 6, topic, userId, orderBy, order, prioritizeFollowers }: FetchPostsParams = {}) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["infinitePosts", limit, topic, userId, orderBy, order, prioritizeFollowers],
    queryFn: ({ pageParam: page }) => fetchPosts({ page, limit, topic, userId, orderBy, order, prioritizeFollowers }),
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

const useUserTags = () => {
  return useQuery({
    queryKey: ["userTags"],
    queryFn: fetchUserTags,
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

const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["infinitePosts"] });
      queryClient.invalidateQueries({ queryKey: ["postCounts"] });
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      queryClient.invalidateQueries({ queryKey: ["userTags"] });
    },
  });
};

const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePost,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["infinitePosts"] });
      queryClient.invalidateQueries({ queryKey: ["postCounts"] });
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      queryClient.invalidateQueries({ queryKey: ["userTags"] });
    },
  });
};

const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["infinitePosts"] });
      queryClient.invalidateQueries({ queryKey: ["postCounts"] });
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      queryClient.invalidateQueries({ queryKey: ["userTags"] });
    },
  });
};

export { usePosts, usePostCounts, useInfinitePosts, useTags, useUserTags, usePostById };
export { useCreatePost, useUpdatePost, useDeletePost };
