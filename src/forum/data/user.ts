import { SQLiteClient } from "./SQLiteClient";

// ----------------------------
// 查詢總使用者數
// ----------------------------

type FetchUserCount = () => Promise<number>;

const fetchUserCount: FetchUserCount = async () => {
  const sql = `
      SELECT COUNT(*) as count
      FROM users
    `;

  const result = (await SQLiteClient.exec(sql)) as { count: number }[];
  return result[0]?.count || 0;
};

// ----------------------------
// 查詢使用者列表
// ----------------------------

type FetchUsersParams = {
  page?: number;
  limit?: number;
  isAuthor?: boolean;
  orderBy?: "name" | "createdAt" | "updatedAt" | "postCount" | "followerCount";
  order?: "asc" | "desc";
};

type FetchUsers = (params?: FetchUsersParams) => Promise<{
  users: { id: number; name: string; description: string }[];
  nextPage: number | null;
  totalPages: number;
}>;

const fetchUsers: FetchUsers = async ({
  page = 0,
  limit = 10,
  isAuthor = false,
  orderBy = "createdAt",
  order = "desc",
} = {}) => {
  // ----------------------------
  // 建立條件子句
  const wheres = [];
  const params: Record<string, string | number> = {};

  if (isAuthor) {
    wheres.push("EXISTS (SELECT 1 FROM posts WHERE posts.userId = u.id)");
  }

  const whereClause = wheres.length > 0 ? `WHERE ${wheres.join(" AND ")}` : "";

  // ----------------------------
  // 準備排序欄位
  let orderColumn = "u.createdAt";
  if (orderBy === "postCount" || orderBy === "followerCount") orderColumn = `uic.${orderBy}`;
  else orderColumn = `u.${orderBy}`;

  // ----------------------------
  // 查詢總數
  const countSql = `
      SELECT COUNT(*) as totalCount
      FROM users u
      ${whereClause}
    `;

  const countResult = (await SQLiteClient.exec(countSql, params)) as { totalCount: number }[];
  const totalCount = countResult[0]?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / limit);
  const nextPage = page + 1 < totalPages ? page + 1 : null;

  // ----------------------------
  // 查詢使用者 ID
  params.$limit = limit;
  params.$offset = page * limit;

  const sql = `
      SELECT u.id, u.name, u.description
      FROM users u
      LEFT JOIN user_interaction_counts uic ON u.id = uic.userId
      ${whereClause}
      ORDER BY ${orderColumn} ${order.toUpperCase()}, u.createdAt DESC
      LIMIT $limit OFFSET $offset
    `;

  const users = await SQLiteClient.exec(sql, params);

  return { users, nextPage, totalPages } as unknown as ReturnType<FetchUsers>;
};

// ----------------------------
// 查詢使用者名稱、描述、id (根據使用者名稱)
// ----------------------------

type FetchUserByNameParams = {
  name: string;
};

type FetchUserByNameResult = {
  id: number;
  name: string;
  description: string;
};

type FetchUserByName = (params: FetchUserByNameParams) => Promise<FetchUserByNameResult | null>;

const fetchUserByName: FetchUserByName = async ({ name }) => {
  const sql = `
      SELECT id, name, description
      FROM users
      WHERE name = $name
      LIMIT 1
    `;

  const results = await SQLiteClient.exec(sql, { $name: name });

  if (results.length === 0) {
    return null;
  }

  return results[0] as unknown as ReturnType<FetchUserByName>;
};

// ----------------------------
// 查詢使用者統計
// ----------------------------

type FetchUserStatsParams = {
  userId: number;
};

type FetchUserStats = (params: FetchUserStatsParams) => Promise<{
  followerCount: number;
  followingCount: number;
  postCount: number;
  likeCount: number;
  viewCount: number;
}>;

const fetchUserStats: FetchUserStats = async ({ userId }) => {
  const sql = `
      SELECT
        followerCount,
        followingCount,
        postCount,
        totalLikeCount as likeCount,
        totalViewCount as viewCount
      FROM user_interaction_counts
      WHERE userId = $userId
    `;

  const results = await SQLiteClient.exec(sql, { $userId: userId });

  return results[0] as unknown as ReturnType<FetchUserStats>;
};

// ----------------------------
// 匯出
// ----------------------------

export { fetchUserCount, fetchUsers, fetchUserByName, fetchUserStats };
export type { FetchUsersParams, FetchUserByNameParams, FetchUserStatsParams, FetchUserByNameResult };
