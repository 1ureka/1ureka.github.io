import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "./session";
import { posts } from "../utils/data";
import { useRef } from "react";

// ----------------------------------------
// 假資料與模擬 API
// ----------------------------------------

type InteractionType = "like" | "favorite";

interface FetchInteractionParams {
  type?: InteractionType;
  postId: number;
}

interface UpdateInteractionParams {
  type: InteractionType;
  postId: number;
  value: boolean;
}

const fakeInteractionMap = new Map<string, boolean>();
const latestRequestIds = new Map<string, number>();

// 建立互動鍵值的輔助函數
const createInteractionKey = (postId: number, userId: number, type: InteractionType) => `${postId}:${userId}:${type}`;

// 獲取互動數量
const fakeFetchInteractions = async ({ postId, type = "like" }: FetchInteractionParams) => {
  await new Promise<void>((res) => setTimeout(res, Math.random() * 1000));

  // 使用假定的用戶 ID 1 作為預設 (之後應該用 cookie 或 session)
  const key = createInteractionKey(postId, 1, type);

  const baseLikes = posts.find((post) => post.id === postId)?.likeCount || 0;
  const count = fakeInteractionMap.has(key) ? baseLikes + (fakeInteractionMap.get(key)! ? 1 : 0) : baseLikes;

  return count;
};

// 獲取單個互動狀態
const fakeFetchInteractionStatus = async ({ postId, type = "like" }: FetchInteractionParams) => {
  await new Promise<void>((res) => setTimeout(res, Math.random() * 1000));

  // 使用假定的用戶 ID 1 作為預設 (之後應該用 cookie 或 session)
  const key = createInteractionKey(postId, 1, type);
  const state = fakeInteractionMap.has(key) ? fakeInteractionMap.get(key)! : Math.random() < 0.5;

  if (!fakeInteractionMap.has(key)) fakeInteractionMap.set(key, state);

  return state;
};

// 更新互動狀態
const fakeUpdateInteraction = async ({ postId, type, value }: UpdateInteractionParams) => {
  await new Promise<void>((res) => setTimeout(res, Math.random() * 1000));

  // 使用假定的用戶 ID 1 作為預設 (之後應該用 cookie 或 session)
  const key = createInteractionKey(postId, 1, type);
  const requestId = Date.now();
  latestRequestIds.set(key, requestId);

  // 只有當這是最新請求時才更新互動狀態
  if (latestRequestIds.get(key) === requestId) fakeInteractionMap.set(key, value);
};

// ----------------------------------------
// 實際 Hook
// ----------------------------------------

const staleTime = 0;

const useLikeStatus = (postId: number) => {
  const { user, authenticated, loading: isLoadingSession } = useSession();
  const fallback = { isLiked: false, likeCount: 0 };

  const { data, isLoading, isError } = useQuery({
    staleTime,
    queryKey: ["likeStatus", postId, user?.id],
    enabled: !isLoadingSession,
    queryFn: async () => {
      const result: { isLiked: boolean; likeCount: number } = fallback;
      result.likeCount = await fakeFetchInteractions({ postId, type: "like" });
      if (authenticated) result.isLiked = await fakeFetchInteractionStatus({ postId, type: "like" });
      return result;
    },
  });

  const { isLiked, likeCount } = data ?? fallback;
  return { isLiked, likeCount, isLoading: isLoading || isLoadingSession || isError };
};

const usePostLikeButton = (postId: number) => {
  const queryClient = useQueryClient();
  const { user, authenticated, loading: isLoadingSession } = useSession();
  const { isLiked, likeCount, isLoading: loading } = useLikeStatus(postId);

  // 是否已經準備好發送互動請求
  const disabled = !authenticated || isLoadingSession || loading || user?.id === undefined;

  // 使用 useMutation 處理點讚操作
  const lastCalled = useRef(0);
  const { mutate } = useMutation({
    mutationFn: async (isLiked: boolean) => fakeUpdateInteraction({ postId, type: "like", value: isLiked }),
    onMutate: () => {
      lastCalled.current++;
      return lastCalled.current;
    },
    onSettled: (_, __, ___, context) => {
      if (context === lastCalled.current) queryClient.invalidateQueries({ queryKey: ["likeStatus", postId, user?.id] });
    },
  });

  const handleLike = disabled
    ? () => {}
    : async () => {
        // 取消相關查詢，避免競態條件
        await queryClient.cancelQueries({ queryKey: ["likeStatus", postId, user?.id] });

        // 樂觀更新 + 發送請求
        queryClient.setQueryData(
          ["likeStatus", postId, user?.id],
          (prevStatus: { isLiked: boolean; likeCount: number }) => {
            const isLiked = !prevStatus.isLiked;
            mutate(isLiked);
            return { isLiked, likeCount: prevStatus.likeCount + (isLiked ? 1 : -1) };
          }
        );
      };

  return { isLiked, likeCount, handleLike, loading, disabled };
};

const usePostFavButton = (postId: number) => {
  const queryClient = useQueryClient();
  const { user, authenticated, loading: isLoadingSession } = useSession();
  const { data, isLoading, isError } = useQuery({
    staleTime,
    queryKey: ["favoriteStatus", postId, user?.id],
    enabled: !isLoadingSession && authenticated,
    queryFn: async () => fakeFetchInteractionStatus({ postId, type: "favorite" }),
  });

  const isFavorited = data ?? false;
  const loading = isLoading || isLoadingSession || isError;
  const disabled = !authenticated || loading || user?.id === undefined;

  // 使用 useMutation 處理收藏操作
  const lastCalled = useRef(0);
  const { mutate } = useMutation({
    mutationFn: async (isFavorited: boolean) => fakeUpdateInteraction({ postId, type: "favorite", value: isFavorited }),
    onMutate: () => {
      lastCalled.current++;
      return lastCalled.current;
    },
    onSettled: (_, __, ___, context) => {
      if (context === lastCalled.current)
        queryClient.invalidateQueries({ queryKey: ["favoriteStatus", postId, user?.id] });
    },
  });

  const handleFavorite = disabled
    ? () => {}
    : async () => {
        // 取消相關查詢，避免競態條件
        await queryClient.cancelQueries({ queryKey: ["favoriteStatus", postId, user?.id] });

        // 樂觀更新 + 發送請求
        queryClient.setQueryData(["favoriteStatus", postId, user?.id], (prev: boolean) => {
          const isFavorited = !prev;
          mutate(isFavorited);
          return isFavorited;
        });
      };

  return { isFavorited, handleFavorite, loading, disabled };
};

export { usePostLikeButton, usePostFavButton };
