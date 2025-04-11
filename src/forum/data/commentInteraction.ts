import { sqlite } from "./client";

// ----------------------------
// 查詢評論互動
// ----------------------------

type FetchCommentInteractionLikeParams = {
  commentId: number;
  userId: number;
};

type FetchCommentInteractionLikeResult = {
  liked: boolean; // 若有紀錄，則為有按讚
  likeCount: number;
};

type FetchCommentInteractionLike = (
  params: FetchCommentInteractionLikeParams
) => Promise<FetchCommentInteractionLikeResult | null>;

const fetchCommentInteractionLike: FetchCommentInteractionLike = async ({ commentId, userId }) => {
  // 查詢使用者是否已對此評論按讚
  const likeStatusSql = `
      SELECT 1 as liked
      FROM comment_interactions
      WHERE commentId = $commentId
        AND userId = $userId
        AND type = 'like'
      LIMIT 1
    `;

  // 查詢評論總按讚數
  const likeCountSql = `
      SELECT COALESCE(likeCount, 0) as likeCount
      FROM comment_interaction_counts
      WHERE commentId = $commentId
    `;

  // 執行查詢
  const likeStatusResult = await sqlite.exec(likeStatusSql, {
    $commentId: commentId,
    $userId: userId,
  });

  const likeCountResult = await sqlite.exec(likeCountSql, {
    $commentId: commentId,
  });

  // 處理結果
  const liked = likeStatusResult.length > 0;
  if (!likeCountResult[0] || !Number.isInteger(likeCountResult[0].likeCount)) {
    return null;
  }
  return { liked, likeCount: likeCountResult[0].likeCount as number };
};

// ----------------------------
// 更新評論互動
// ----------------------------

type UpdateCommentInteractionParams = {
  commentId: number;
  userId: number;
  type: "like";
  value: boolean;
};

type UpdateCommentInteraction = (params: UpdateCommentInteractionParams) => Promise<void>;

const updateCommentInteraction: UpdateCommentInteraction = async ({ commentId, userId, type, value }) => {
  // 若 value 為 true，表示要新增互動紀錄
  if (value) {
    // 使用 INSERT OR IGNORE 避免重複插入的錯誤
    const insertSql = `
        INSERT OR IGNORE INTO comment_interactions (userId, commentId, type)
        VALUES ($userId, $commentId, $type)
      `;

    await sqlite.exec(insertSql, { $userId: userId, $commentId: commentId, $type: type });
  } else {
    // 若 value 為 false，表示要移除互動紀錄
    const deleteSql = `
        DELETE FROM comment_interactions
        WHERE userId = $userId
          AND commentId = $commentId
          AND type = $type
      `;

    await sqlite.exec(deleteSql, { $userId: userId, $commentId: commentId, $type: type });
  }
};

// ----------------------------
// 匯出
// ----------------------------

export { fetchCommentInteractionLike, updateCommentInteraction };
