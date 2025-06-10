import { sqlite } from "./client";

// ----------------------------
// 查詢使用者互動 (針對單一使用者獲取其追蹤的使用者)
// ----------------------------

type FetchUserFollowingParams = { userId: number };
type FetchUserFollowingResult = { id: number; name: string; description: string }[];
type FetchUserFollowing = (params: FetchUserFollowingParams) => Promise<FetchUserFollowingResult | null>;

const fetchUserFollowing: FetchUserFollowing = async ({ userId }) => {
  // 查詢使用者追蹤的所有人員
  const followingSql = `
      SELECT u.id, u.name, u.description
      FROM user_interactions ui
      JOIN users u ON ui.followeeId = u.id
      WHERE ui.followerId = $userId
        AND ui.type = 'follow'
      ORDER BY ui.createdAt DESC
    `;

  // 執行查詢
  const followingResult = await sqlite.exec(followingSql, {
    $userId: userId,
  });

  // 處理結果
  if (!followingResult || followingResult.length === 0) return null;

  // 轉換為需要的格式
  return followingResult.map((row) => ({
    id: row.id as number,
    name: row.name as string,
    description: row.description as string,
  }));
};

// ----------------------------
// 查詢使用者互動 (針對單一使用者獲取其追蹤者)
// ----------------------------

type FetchUserFollowersParams = { userId: number };
type FetchUserFollowersResult = { id: number; name: string; description: string }[];
type FetchUserFollowers = (params: FetchUserFollowersParams) => Promise<FetchUserFollowersResult | null>;

const fetchUserFollowers: FetchUserFollowers = async ({ userId }) => {
  // 查詢追蹤該使用者的所有人員
  const followersSql = `
      SELECT u.id, u.name, u.description
      FROM user_interactions ui
      JOIN users u ON ui.followerId = u.id
      WHERE ui.followeeId = $userId
        AND ui.type = 'follow'
      ORDER BY ui.createdAt DESC
    `;

  // 執行查詢
  const followersResult = await sqlite.exec(followersSql, {
    $userId: userId,
  });

  // 處理結果
  if (!followersResult || followersResult.length === 0) return null;

  // 轉換為需要的格式
  return followersResult.map((row) => ({
    id: row.id as number,
    name: row.name as string,
    description: row.description as string,
  }));
};

// ----------------------------
// 更新使用者互動
// ----------------------------

type UpdateUserInteractionParams = {
  followerId: number;
  followeeId: number;
  value: boolean;
};

type UpdateUserInteraction = (params: UpdateUserInteractionParams) => Promise<void>;

const updateUserInteraction: UpdateUserInteraction = async ({ followerId, followeeId, value }) => {
  // 防止自我追蹤
  if (followerId === followeeId) {
    throw new Error("使用者不能追蹤自己");
  }

  const now = new Date().toISOString();

  // 若 value 為 true，表示要新增追蹤關係
  if (value) {
    // 使用 INSERT OR IGNORE 避免重複插入的錯誤
    const insertSql = `
          INSERT OR IGNORE INTO user_interactions (followerId, followeeId, type, createdAt)
          VALUES ($followerId, $followeeId, 'follow', $createdAt)
        `;

    await sqlite.exec(insertSql, {
      $followerId: followerId,
      $followeeId: followeeId,
      $createdAt: now,
    });
  } else {
    // 若 value 為 false，表示要移除追蹤關係
    const deleteSql = `
          DELETE FROM user_interactions
          WHERE followerId = $followerId
            AND followeeId = $followeeId
            AND type = 'follow'
        `;

    await sqlite.exec(deleteSql, {
      $followerId: followerId,
      $followeeId: followeeId,
    });
  }
};

// ----------------------------
// 檢查使用者互動狀態
// ----------------------------

type CheckUserInteractionParams = { targetId: number; userId: number };
type CheckUserInteractionResult = {
  follow: boolean; // 若有紀錄，則為已追蹤
};

type CheckUserInteraction = (params: CheckUserInteractionParams) => Promise<CheckUserInteractionResult>;

const checkUserInteraction: CheckUserInteraction = async ({ targetId, userId }) => {
  // 查詢使用者是否已追蹤目標使用者
  const followStatusSql = `
      SELECT 1 as follow
      FROM user_interactions
      WHERE followerId = $userId
        AND followeeId = $targetId
        AND type = 'follow'
      LIMIT 1
    `;

  // 執行查詢
  const followStatusResult = await sqlite.exec(followStatusSql, {
    $userId: userId,
    $targetId: targetId,
  });

  // 處理結果
  const follow = followStatusResult.length > 0;
  return { follow };
};

// ----------------------------
// 匯出
// ----------------------------

export { fetchUserFollowing, fetchUserFollowers, updateUserInteraction, checkUserInteraction };
