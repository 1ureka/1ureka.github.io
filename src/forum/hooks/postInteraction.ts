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

  return { likes, success: true };
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

  return { liked, success: true };
};

// 模擬按讚/取消按讚的 API 請求
const fakePostInteraction = async (postId: number, userId: number, liked: boolean) => {
  await new Promise<void>((resolve) => {
    setTimeout(() => resolve(), Math.random() * 1000);
  });

  // 更新互動狀態
  const key = `${postId}:${userId}`;
  fakeInteractionMap.set(key, liked);

  return { success: true };
};

// ----------------------------------------
// 實際 Hook
// ----------------------------------------

const usePostLike = (postId: number) => {
  const { user, authenticated, loading } = useSession();
  const queryClient = useQueryClient();

  // 獲取文章互動數據
  const { data: postData, isFetching: isPostFetching } = useQuery({
    queryKey: ["postInteractions", postId],
    queryFn: () => fakeFetchInteractionsByPostId(postId),
    enabled: !loading, // 只有在 session 載入完成後才開始查詢
    retry: 3,
  });

  // 獲取用戶與文章的互動狀態
  const {
    data: userData,
    isFetching: isUserFetching,
    isSuccess,
  } = useQuery({
    queryKey: ["userInteraction", postId, user?.id],
    queryFn: () => {
      if (!user?.id) throw new Error("使用者未登入");
      return fakeFetchInteractions(postId, user.id);
    },
    enabled: !loading && authenticated && !!user?.id,
    retry: 3,
  });

  const isLiked = userData?.success ? userData.liked : false;

  // 按讚/取消按讚的 mutation
  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      if (!user?.id) throw new Error("使用者未登入");
      return fakePostInteraction(postId, user.id, !isLiked);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postInteractions", postId] });
      queryClient.invalidateQueries({ queryKey: ["userInteraction", postId, user?.id] });
    },
  });

  const handleLike = () => {
    if (!authenticated || loading) return;
    mutate();
  };

  const liked = postData?.success ? postData.likes : 0;
  const disabled = !authenticated;
  const isLoading = !authenticated
    ? isPending || isPostFetching
    : isPending || isPostFetching || isUserFetching || !isSuccess;

  return { liked, handleLike, isLiked, isLoading, disabled };
};

export { usePostLike };
