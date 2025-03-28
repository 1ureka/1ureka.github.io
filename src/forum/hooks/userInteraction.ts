import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "./session";
import { useRef } from "react";
import { fetchUserFollowers, fetchUserFollowing } from "../data/userInteraction";
import { checkUserInteraction, updateUserInteraction } from "../data/userInteraction";

const staleTime = 0;

const useUserInteractionMutation = (targetId: number, userId?: number) => {
  const queryClient = useQueryClient();
  const lastCalled = useRef(0);

  return useMutation({
    mutationFn: (value: boolean) => {
      if (userId === undefined) throw new Error("未登錄");
      return updateUserInteraction({ followerId: userId, followeeId: targetId, value });
    },
    onMutate: () => {
      lastCalled.current++;
      return lastCalled.current;
    },
    onSettled: (_, __, ___, context) => {
      if (context === lastCalled.current) {
        const queryKey = ["userFollow", targetId, userId];
        queryClient.invalidateQueries({ queryKey });
      }
    },
    onError: () => {
      console.error("追蹤操作失敗");
    },
  });
};

const useUserFollowButton = (targetId: number) => {
  const queryClient = useQueryClient();
  const { user, authenticated, loading: isLoadingSession } = useSession();
  const { data, isFetching } = useQuery({
    staleTime,
    queryKey: ["userFollow", targetId, user?.id],
    enabled: !isLoadingSession && authenticated && user?.id !== undefined,
    queryFn: async () => checkUserInteraction({ targetId, userId: user!.id }),
  });

  // 整理狀態
  const loading = isLoadingSession || isFetching;
  const disabled = !authenticated || data === undefined || targetId === user?.id;
  const isFollowed = data?.follow ?? false;

  // 樂觀更新 + 發送請求
  const { mutate } = useUserInteractionMutation(targetId, user?.id);
  const handleFollow = async () => {
    if (disabled) return;
    await queryClient.cancelQueries({ queryKey: ["userFollow", targetId, user.id] });
    queryClient.setQueryData(["userFollow", targetId, user.id], (prev: { follow: boolean }) => {
      const isFollowed = !prev.follow;
      mutate(isFollowed);
      return { follow: isFollowed };
    });
  };

  return { isFollowed, handleFollow, disabled, loading };
};

const useFollowers = ({ userId }: { userId: number }) => {
  return useQuery({
    queryKey: ["userFollowers", userId],
    queryFn: () => fetchUserFollowers({ userId }),
    staleTime,
  });
};

const useFollowing = ({ userId }: { userId: number }) => {
  return useQuery({
    queryKey: ["userFollowing", userId],
    queryFn: () => fetchUserFollowing({ userId }),
    staleTime,
  });
};

export { useUserFollowButton, useFollowers, useFollowing };
