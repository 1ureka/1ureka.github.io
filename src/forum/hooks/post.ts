// ----------------------------------------
// 假資料與模擬 API
// ----------------------------------------

import { useQuery } from "@tanstack/react-query";
import { posts } from "../utils/test";

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

const fakeFetchPosts = async ({ limit, topic, orderBy, order = "asc" }: QueryPostsOptions = {}) => {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));

  // 如果提供了 topic，按標籤篩選
  let filteredPosts = posts;
  if (topic) filteredPosts = posts.filter((post) => post.tags.includes(topic));

  // 如果提供了排序條件，進行排序
  if (orderBy && Object.keys(posts[0]).includes(orderBy)) {
    filteredPosts = sortObjectArray(filteredPosts, orderBy as keyof (typeof posts)[0], order);
  }

  const postIds = filteredPosts.map(({ id }) => id);

  // 如果提供了 limit，限制回傳數量
  if (limit && limit > 0) return postIds.slice(0, limit);
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
  limit?: number;
  topic?: string;
  orderBy?: string;
  order?: "asc" | "desc";
};

const staleTime = 1 * 60 * 1000;

const usePosts = ({ limit, topic, orderBy, order }: QueryPostsOptions = {}) => {
  return useQuery({
    queryKey: ["posts", limit, topic, orderBy, order],
    queryFn: () => fakeFetchPosts({ limit, topic, orderBy, order }),
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
