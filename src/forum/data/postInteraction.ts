import { sqlite } from "./client";

// ----------------------------
// 查詢貼文互動
// ----------------------------

type FetchPostInteractionLikeParams = {
  postId: number;
  userId: number;
};

type FetchPostInteractionLikeResult = {
  liked: boolean; // 若有紀錄，則為有按讚
  likeCount: number;
};

type FetchPostInteractionLike = (
  params: FetchPostInteractionLikeParams
) => Promise<FetchPostInteractionLikeResult | null>;

const fetchPostInteractionLike: FetchPostInteractionLike = async ({ postId, userId }) => {
  // 查詢使用者是否已對此貼文按讚
  const likeStatusSql = `
      SELECT 1 as liked
      FROM post_interactions
      WHERE postId = $postId
        AND userId = $userId
        AND type = 'like'
      LIMIT 1
    `;

  // 查詢貼文總按讚數
  const likeCountSql = `
      SELECT COALESCE(likeCount, 0) as likeCount
      FROM post_interaction_counts
      WHERE postId = $postId
    `;

  // 執行查詢
  const likeStatusResult = await sqlite.exec(likeStatusSql, {
    $postId: postId,
    $userId: userId,
  });

  const likeCountResult = await sqlite.exec(likeCountSql, {
    $postId: postId,
  });

  // 處理結果
  const liked = likeStatusResult.length > 0;
  if (!likeCountResult[0] || !Number.isInteger(likeCountResult[0].likeCount)) return null;
  return { liked, likeCount: likeCountResult[0].likeCount as number };
};

// ----------------------------
// 查詢貼文互動 (收藏)
// ----------------------------

type FetchPostInteractionFavParams = {
  postId: number;
  userId: number;
};

type FetchPostInteractionFavResult = {
  fav: boolean; // 若有紀錄，則為已收藏
};

type FetchPostInteractionFav = (params: FetchPostInteractionFavParams) => Promise<FetchPostInteractionFavResult>;

const fetchPostInteractionFav: FetchPostInteractionFav = async ({ postId, userId }) => {
  // 查詢使用者是否已收藏此貼文
  const favStatusSql = `
      SELECT 1 as fav
      FROM post_interactions
      WHERE postId = $postId
        AND userId = $userId
        AND type = 'favorite'
      LIMIT 1
    `;

  // 執行查詢
  const favStatusResult = await sqlite.exec(favStatusSql, {
    $postId: postId,
    $userId: userId,
  });

  // 處理結果
  const fav = favStatusResult.length > 0;
  return { fav };
};

// ----------------------------
// 更新貼文互動
// ----------------------------

type UpdatePostInteractionParams = {
  postId: number;
  userId: number;
  type: "like" | "favorite";
  value: boolean;
};

type UpdatePostInteraction = (params: UpdatePostInteractionParams) => Promise<void>;

const updatePostInteraction: UpdatePostInteraction = async ({ postId, userId, type, value }) => {
  // 若 value 為 true，表示要新增互動紀錄
  if (value) {
    // 使用 INSERT OR IGNORE 避免重複插入的錯誤
    const insertSql = `
        INSERT OR IGNORE INTO post_interactions (userId, postId, type)
        VALUES ($userId, $postId, $type)
      `;

    await sqlite.exec(insertSql, {
      $userId: userId,
      $postId: postId,
      $type: type,
    });
  } else {
    // 若 value 為 false，表示要移除互動紀錄
    const deleteSql = `
        DELETE FROM post_interactions
        WHERE userId = $userId
          AND postId = $postId
          AND type = $type
      `;

    await sqlite.exec(deleteSql, {
      $userId: userId,
      $postId: postId,
      $type: type,
    });
  }
};

// ----------------------------
// 查詢貼文互動 (針對單一使用者獲取其收藏的貼文)
// ----------------------------

type FetchUserFavPostsParams = {
  userId: number;
};

type FetchUserFavPostsResult = number[];

type FetchUserFavPosts = (params: FetchUserFavPostsParams) => Promise<FetchUserFavPostsResult>;

const fetchUserFavPosts: FetchUserFavPosts = async ({ userId }) => {
  // 查詢使用者收藏的所有貼文 ID
  const favPostsSql = `
    SELECT postId
    FROM post_interactions
    WHERE userId = $userId
      AND type = 'favorite'
    ORDER BY createdAt DESC
  `;

  // 執行查詢
  const favPostsResult = await sqlite.exec(favPostsSql, {
    $userId: userId,
  });

  // 處理結果：將查詢結果轉換為貼文 ID 陣列
  return favPostsResult.map((row) => row.postId as number);
};

// ----------------------------
// 匯出
// ----------------------------

export { fetchPostInteractionLike, fetchPostInteractionFav, updatePostInteraction, fetchUserFavPosts };
