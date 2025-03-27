import { SQLiteClient } from "./SQLiteClient";

// ----------------------------
// 查詢貼文總數
// ----------------------------

type FetchPostCountsParams = {
  topic?: string;
};

type FetchPostCounts = (params?: FetchPostCountsParams) => Promise<number>;

const fetchPostCounts: FetchPostCounts = async ({ topic } = {}) => {
  const wheres = [];
  const params: Record<string, string | number> = {};

  if (topic) {
    wheres.push("EXISTS (SELECT 1 FROM json_each(tags) WHERE value = $topic)");
    params.$topic = topic;
  }

  const whereClause = wheres.length > 0 ? `WHERE ${wheres.join(" AND ")}` : "";

  const countSql = `
      SELECT COUNT(*) as totalCount
      FROM posts
      ${whereClause}
    `;

  const countResult = (await SQLiteClient.exec(countSql, params)) as { totalCount: number }[];
  return countResult[0]?.totalCount || 0;
};

// ----------------------------
// 查詢貼文列表
// ----------------------------

type FetchPostsParams = {
  page?: number;
  limit?: number;
  topic?: string;
  userId?: number;
  orderBy?: "title" | "createdAt" | "updatedAt" | "viewCount" | "likeCount" | "commentCount";
  order?: "asc" | "desc";
};

type FetchPosts = (params?: FetchPostsParams) => Promise<{
  posts: number[];
  nextPage: number | null;
  totalPages: number;
}>;

const fetchPosts: FetchPosts = async ({
  page = 0,
  limit = 10,
  topic,
  userId,
  orderBy = "createdAt",
  order = "desc",
} = {}) => {
  // ----------------------------
  // 建立條件子句
  const wheres = [];
  const params: Record<string, string | number> = {};

  if (topic) {
    wheres.push("EXISTS (SELECT 1 FROM json_each(tags) WHERE value = $topic)");
    params.$topic = topic;
  }

  if (userId) {
    wheres.push("userId = $userId");
    params.$userId = userId;
  }

  const whereClause = wheres.length > 0 ? `WHERE ${wheres.join(" AND ")}` : "";

  // ----------------------------
  // 準備排序欄位
  let orderColumn = "p.createdAt";
  if (orderBy === "likeCount" || orderBy === "commentCount") orderColumn = `pic.${orderBy}`;
  else orderColumn = `p.${orderBy}`;

  // ----------------------------
  // 查詢總數
  const countSql = `
      SELECT COUNT(*) as totalCount
      FROM posts
      ${whereClause}
    `;

  const countResult = (await SQLiteClient.exec(countSql, params)) as { totalCount: number }[];
  const totalCount = countResult[0]?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / limit);
  const nextPage = page + 1 < totalPages ? page + 1 : null;

  // ----------------------------
  // 查詢貼文 ID
  params.$limit = limit;
  params.$offset = page * limit;

  const sql = `
        SELECT id
        FROM posts p
        LEFT JOIN post_interaction_counts pic ON p.id = pic.postId
        ${whereClause}
        ORDER BY ${orderColumn} ${order.toUpperCase()}, p.createdAt DESC
        LIMIT $limit OFFSET $offset
      `;

  const result = await SQLiteClient.exec(sql, params);
  const posts = result.map((post) => post.id) as number[];

  return { posts, nextPage, totalPages };
};

// ----------------------------
// 匯出
// ----------------------------

export { fetchPosts, fetchPostCounts };
export type { FetchPostsParams, FetchPostCountsParams };
