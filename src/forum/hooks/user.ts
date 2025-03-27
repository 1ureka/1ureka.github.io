// ----------------------------------------
// 假資料與模擬 API
// ----------------------------------------

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { users } from "../utils/data";
import { fetchUsers, fetchUserStats } from "../data/user";
import type { FetchUsersParams } from "../data/user";

const fakeFetchUserByName = async (userName: string) => {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
  return users.find((author) => author.name === userName) || null;
};

// ----------------------------------------
// 實際 Hook
// ----------------------------------------

const staleTime = 1 * 60 * 1000;

/**
 * 獲取所有使用者
 */
const useUsers = ({ page = 0, limit, isAuthor = true, orderBy, order }: FetchUsersParams = {}) => {
  return useInfiniteQuery({
    queryKey: ["users", page, limit, isAuthor, orderBy, order],
    queryFn: async ({ pageParam: page }) => fetchUsers({ page, limit, isAuthor, orderBy, order }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime,
  });
};

/**
 * 根據使用者名稱獲取使用者
 */
const useUser = (name?: string | null) => {
  return useQuery({
    queryKey: ["user", name],
    queryFn: () => {
      if (name === null || name === undefined) return null;
      return fakeFetchUserByName(name);
    },
    staleTime,
  });
};

/**
 * 根據使用者 ID 獲取使用者統計
 */
const useUserStats = (userId: number) => {
  return useQuery({
    queryKey: ["userStats", userId],
    queryFn: () => fetchUserStats({ userId }),
    staleTime,
  });
};

export { useUsers, useUser, useUserStats };
