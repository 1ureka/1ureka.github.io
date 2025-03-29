import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "./session";
import { useRef } from "react";

import { fetchCommentInteractionLike, updateCommentInteraction } from "../data/commentInteraction";

const staleTime = 0;

const useCommentInteractionMutation = (commentId: number, userId: number | undefined, type: "like") => {
  const queryClient = useQueryClient();
  const lastCalled = useRef(0);

  return useMutation({
    mutationFn: (value: boolean) => {
      if (userId === undefined) throw new Error("未登入");
      return updateCommentInteraction({ commentId, userId, type, value });
    },
    onMutate: () => {
      lastCalled.current++;
      return lastCalled.current;
    },
    onSettled: (_, __, ___, context) => {
      if (context === lastCalled.current) {
        const queryKey = ["commentLikeStatus", commentId, userId];
        queryClient.invalidateQueries({ queryKey });
      }
    },
    onError: () => {
      console.error("評論按讚操作失敗");
    },
  });
};

const useCommentLikeButton = (commentId: number) => {
  const queryClient = useQueryClient();
  const { user, authenticated, loading: isLoadingSession } = useSession();
  const { data, isLoading } = useQuery({
    staleTime,
    queryKey: ["commentLikeStatus", commentId, user?.id],
    enabled: !isLoadingSession && authenticated && user?.id !== undefined,
    queryFn: async () => fetchCommentInteractionLike({ commentId, userId: user!.id }),
  });

  // 整理狀態
  const loading = isLoadingSession || isLoading;
  const disabled = !authenticated || loading || data === undefined || data === null;
  const liked = data?.liked ?? false;
  const likeCount = data?.likeCount ?? null;

  // 樂觀更新 + 發送請求
  const { mutate } = useCommentInteractionMutation(commentId, user?.id, "like");
  const handleLike = async () => {
    if (disabled) return;
    await queryClient.cancelQueries({ queryKey: ["commentLikeStatus", commentId, user.id] });
    queryClient.setQueryData(
      ["commentLikeStatus", commentId, user.id],
      (prev: { liked: boolean; likeCount: number }) => {
        const isLiked = !prev.liked;
        mutate(isLiked);
        return { liked: isLiked, likeCount: prev.likeCount + (isLiked ? 1 : -1) };
      }
    );
  };

  return { liked, likeCount, handleLike, disabled, loading };
};

export { useCommentLikeButton };
