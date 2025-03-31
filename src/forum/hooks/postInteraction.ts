import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "./session";
import { useRef } from "react";

import { fetchPostInteractionFav, fetchPostInteractionLike, fetchUserFavPosts } from "../data/postInteraction";
import { updatePostInteraction } from "../data/postInteraction";

const staleTime = 0;

const usePostInteractionMutation = (postId: number, userId: number | undefined, type: "like" | "favorite") => {
  const queryClient = useQueryClient();
  const lastCalled = useRef(0);

  return useMutation({
    mutationFn: (value: boolean) => {
      if (userId === undefined) throw new Error("未登錄");
      return updatePostInteraction({ postId, userId, type, value });
    },
    onMutate: () => {
      lastCalled.current++;
      return lastCalled.current;
    },
    onSettled: (_, __, ___, context) => {
      if (context === lastCalled.current) {
        const queryKey = type === "like" ? ["likeStatus", postId, userId] : ["favoriteStatus", postId, userId];
        queryClient.invalidateQueries({ queryKey });
      }
    },
    onError: () => {
      console.error(`${type === "like" ? "按讚" : "收藏"}操作失敗`);
    },
  });
};

const usePostLikeButton = (postId: number) => {
  const queryClient = useQueryClient();
  const { user, authenticated, loading: isLoadingSession } = useSession();
  const { data } = useQuery({
    staleTime,
    queryKey: ["likeStatus", postId, user?.id],
    enabled: !isLoadingSession && authenticated && user?.id !== undefined,
    queryFn: async () => fetchPostInteractionLike({ postId, userId: user!.id }),
  });

  // 整理狀態
  const disabled = !authenticated || isLoadingSession || data === undefined || data === null;
  const liked = data?.liked ?? false;
  const likeCount = data?.likeCount ?? null;

  // 樂觀更新 + 發送請求
  const { mutate } = usePostInteractionMutation(postId, user?.id, "like");
  const handleLike = async () => {
    if (disabled) return;
    await queryClient.cancelQueries({ queryKey: ["likeStatus", postId, user.id] });
    queryClient.setQueryData(["likeStatus", postId, user.id], (prev: { liked: boolean; likeCount: number }) => {
      const isLiked = !prev.liked;
      mutate(isLiked);
      return { liked: isLiked, likeCount: prev.likeCount + (isLiked ? 1 : -1) };
    });
  };

  return { liked, likeCount, handleLike, disabled };
};

const usePostFavButton = (postId: number) => {
  const queryClient = useQueryClient();
  const { user, authenticated, loading: isLoadingSession } = useSession();
  const { data, isLoading } = useQuery({
    staleTime,
    queryKey: ["favoriteStatus", postId, user?.id],
    enabled: !isLoadingSession && authenticated && user?.id !== undefined,
    queryFn: async () => fetchPostInteractionFav({ postId, userId: user!.id }),
  });

  // 整理狀態
  const loading = isLoadingSession || isLoading;
  const disabled = !authenticated || isLoadingSession || data === undefined || data === null;
  const isFavorited = data?.fav ?? false;

  // 樂觀更新 + 發送請求
  const { mutate } = usePostInteractionMutation(postId, user?.id, "favorite");
  const handleFavorite = async () => {
    if (disabled) return;
    await queryClient.cancelQueries({ queryKey: ["favoriteStatus", postId, user.id] });
    queryClient.setQueryData(["favoriteStatus", postId, user.id], (prev: { fav: boolean }) => {
      const isFavorited = !prev.fav;
      mutate(isFavorited);
      return { fav: isFavorited };
    });
  };

  return { isFavorited, handleFavorite, disabled, loading };
};

const useUserFavPosts = () => {
  const { user, authenticated, loading: isLoadingSession } = useSession();
  const { data, isFetching } = useQuery({
    staleTime,
    queryKey: ["favoritePosts", user?.id],
    queryFn: () => fetchUserFavPosts({ userId: user!.id }),
    enabled: !isLoadingSession && authenticated && user?.id !== undefined,
  });

  const loading = isLoadingSession || isFetching || data === undefined;
  return { data, loading };
};

export { usePostLikeButton, usePostFavButton, useUserFavPosts };
