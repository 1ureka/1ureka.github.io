import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchUserByName, fetchUserCount, fetchUsers, fetchUserStats } from "../data/user";
import type { FetchUsersParams } from "../data/user";

const staleTime = 1 * 60 * 1000;

const useUserCounts = () => {
  return useQuery({
    queryKey: ["userCounts"],
    queryFn: fetchUserCount,
    staleTime,
  });
};

const useUsers = ({ page = 0, limit, isAuthor = true, isUnfollowed, orderBy, order }: FetchUsersParams = {}) => {
  return useInfiniteQuery({
    queryKey: ["users", page, limit, isAuthor, isUnfollowed, orderBy, order],
    queryFn: async ({ pageParam: page }) => fetchUsers({ page, limit, isAuthor, isUnfollowed, orderBy, order }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime,
  });
};

const useUser = (name?: string | null) => {
  return useQuery({
    queryKey: ["user", name],
    queryFn: () => {
      if (name === null || name === undefined) return null;
      return fetchUserByName({ name });
    },
    staleTime,
  });
};

const useUserStats = (userId: number) => {
  return useQuery({
    queryKey: ["userStats", userId],
    queryFn: () => fetchUserStats({ userId }),
    staleTime,
  });
};

export { useUsers, useUser, useUserStats, useUserCounts };
