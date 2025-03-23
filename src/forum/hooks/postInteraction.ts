import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "./session";
import { posts } from "../utils/data";

// ----------------------------------------
// 假資料與模擬 API
// ----------------------------------------

const fakeInteractionMap = new Map<string, boolean>();

// 獲取一個文章的互動數據
const fakeFetchInteractionsByPostId = async (postId: number) => {
  await new Promise<void>((resolve) => {
    setTimeout(() => resolve(), Math.random() * 1000);
  });

  const baseLikes = posts.find((post) => post.id === postId)?.likeCount || 0;
  const key = `${postId}:1`;
  const likes = fakeInteractionMap.has(key) ? baseLikes + (fakeInteractionMap.get(key)! ? 1 : 0) : baseLikes;

  return likes;
};

// 獲取一個互動數據本身
const fakeFetchInteractions = async (postId: number, userId: number) => {
  await new Promise<void>((resolve) => {
    setTimeout(() => resolve(), Math.random() * 1000);
  });

  // 從 Map 中取得使用者的互動狀態
  const key = `${postId}:${userId}`;
  const liked = fakeInteractionMap.has(key) ? fakeInteractionMap.get(key)! : Math.random() < 0.5;

  // 如果是第一次查詢，儲存隨機生成的狀態
  if (!fakeInteractionMap.has(key)) {
    fakeInteractionMap.set(key, liked);
  }

  return liked;
};

// 追蹤每個貼文與用戶組合的最新請求 ID
const latestRequestIds = new Map<string, number>();
const fakePostInteraction = async (postId: number, userId: number, liked: boolean) => {
  const key = `${postId}:${userId}`;
  const requestId = Date.now();
  latestRequestIds.set(key, requestId);

  await new Promise<void>((resolve) => {
    setTimeout(() => resolve(), Math.random() * 1000);
  });

  // 只有當這是最新請求時才更新互動狀態
  if (latestRequestIds.get(key) === requestId) {
    fakeInteractionMap.set(key, liked);
  }
};

// ----------------------------------------
// 實際 Hook
// ----------------------------------------

const staleTime = 0;

const useLikeCounts = (postId: number) => {
  const { data, isLoading } = useQuery({
    queryKey: ["postLikeCounts", postId],
    queryFn: () => fakeFetchInteractionsByPostId(postId),
    staleTime,
  });

  const likeCount = data ?? 0;
  return { likeCount, isLoading };
};

const useIsLiked = (postId: number) => {
  const { user, authenticated, loading: isLoadingSession } = useSession();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userIsLiked", postId, user?.id],
    queryFn: () => {
      if (!user?.id) throw new Error("使用者未登入");
      return fakeFetchInteractions(postId, user.id);
    },
    enabled: !isLoadingSession && authenticated && !!user?.id,
    staleTime,
  });

  const isLiked = data ?? false;
  return { isLiked, isLoading: isLoading || isLoadingSession || isError };
};

const useLikeMutation = (postId: number) => {
  const queryClient = useQueryClient();
  const { user, authenticated, loading: isLoadingSession } = useSession();

  const isReady = authenticated && !!user?.id && !isLoadingSession;

  const { mutate } = useMutation({
    mutationFn: async ({ postId }: { postId: number }) => {
      if (!user?.id) throw new Error("使用者未登入");
      // 這時的 optimisticLiked 是已由 onMutate 更新過的狀態，因此是目標值
      const optimisticLiked = queryClient.getQueryData(["userIsLiked", postId, user?.id]);
      return fakePostInteraction(postId, user.id, Boolean(optimisticLiked));
    },
    onMutate: async ({ postId }) => {
      // 取消相關查詢，避免競態條件
      await queryClient.cancelQueries({ queryKey: ["userIsLiked", postId, user?.id] });
      await queryClient.cancelQueries({ queryKey: ["postLikeCounts", postId] });

      // 儲存舊的狀態以便回滾
      const previousLiked = queryClient.getQueryData(["userIsLiked", postId, user?.id]);
      const previousCount = queryClient.getQueryData(["postLikeCounts", postId]) as number;

      // Optimistic 更新
      queryClient.setQueryData(["userIsLiked", postId, user?.id], (previousLiked: boolean) => {
        queryClient.setQueryData(["postLikeCounts", postId], (previousCount: number) => {
          return previousLiked ? previousCount - 1 : previousCount + 1;
        });
        return !previousLiked;
      });

      return { previousLiked, previousCount };
    },
    onError: (_, { postId }, context) => {
      // 發生錯誤時回滾到先前的狀態
      if (context) {
        queryClient.setQueryData(["userIsLiked", postId, user?.id], context.previousLiked);
        queryClient.setQueryData(["postLikeCounts", postId], context.previousCount);
      }
    },
    onSettled: (_, __, { postId }) => {
      // 請求完成後，使相關查詢失效以獲取最新資料
      queryClient.invalidateQueries({ queryKey: ["userIsLiked", postId, user?.id] });
      queryClient.invalidateQueries({ queryKey: ["postLikeCounts", postId] });
    },
  });

  const handleLike = () => {
    if (!isReady) return;
    mutate({ postId });
  };

  return { handleLike, isReady };
};

const usePostLike = (postId: number) => {
  const { likeCount, isLoading: isFetchingCounts } = useLikeCounts(postId);
  const { isLiked, isLoading: isLoadingLiked } = useIsLiked(postId);
  const { handleLike, isReady } = useLikeMutation(postId);

  const disabled = !isReady;
  const isLoading = isFetchingCounts || isLoadingLiked;

  return { likeCount, isLiked, handleLike, isLoading, disabled };
};

export { usePostLike };
