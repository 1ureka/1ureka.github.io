// ----------------------------------------
// 假資料與模擬 API
// ----------------------------------------

import { useQuery } from "@tanstack/react-query";
import { posts } from "../utils/test";

const fakeFetchPostIds = async ({ length, topic }: QueryPostsOptions = {}) => {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));

  // 如果提供了 topic，按標籤篩選
  let filteredPosts = posts;
  if (topic) filteredPosts = posts.filter((post) => post.tags.includes(topic));
  const postIds = filteredPosts.map(({ id }) => id);

  // 如果提供了 length，限制回傳數量
  if (length && length > 0) return postIds.slice(0, length);
  return postIds;
};

const fakeFetchPostById = async (postId: number) => {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
  return posts.find((post) => post.id === postId);
};

const fakeFetchTags = async () => {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
  return [...new Set(posts.flatMap((post) => post.tags))];
};

// ----------------------------------------
// 實際 Hook
// ----------------------------------------

type QueryPostsOptions = {
  length?: number;
  topic?: string;
};

const staleTime = 1 * 60 * 1000;

const usePosts = ({ length, topic }: QueryPostsOptions = {}) => {
  return useQuery({
    queryKey: ["posts", length, topic],
    queryFn: () => fakeFetchPostIds({ length, topic }),
    staleTime,
  });
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
      if (postId === undefined || Number.isNaN(postId)) {
        throw new Error("Invalid post ID");
      }
      return fakeFetchPostById(postId);
    },
    enabled: postId !== undefined && !Number.isNaN(postId) && postId >= 0, // 確保有效的 postId
    staleTime,
  });
};

export { usePosts, useTags, usePostById };
