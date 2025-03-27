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
// 查詢所有標籤
// ----------------------------

type FetchTags = () => Promise<string[]>;

const fetchTags: FetchTags = async () => {
  const sql = "SELECT uniqueTags FROM tag_stats";

  const result = await SQLiteClient.exec(sql);
  if (result.length === 0) return [];

  // 從查詢結果中提取 uniqueTags 並解析 JSON 字串
  const uniqueTagsJson = result[0].uniqueTags as string;
  const tags = JSON.parse(uniqueTagsJson);
  return Array.isArray(tags) ? tags : [];
};

// ----------------------------
// 查詢貼文 (根據 ID)
// ----------------------------

type FetchPostByIdParams = {
  postId: number;
  incrementViewCount?: boolean;
};

type FetchPostByIdResult = {
  id: number;
  title: string;
  content: string;
  tags: string[];
  photos?: { name: string; url: string; size: number }[];
  attachments?: { name: string; url: string; size: number }[];
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  userName: string;
  likeCount: number;
  commentCount: number;
};

type FetchPostById = (params: FetchPostByIdParams) => Promise<FetchPostByIdResult | null>;

const fetchPostById: FetchPostById = async ({ postId, incrementViewCount = false }) => {
  // 更新瀏覽計數
  if (incrementViewCount) {
    await SQLiteClient.exec(`UPDATE posts SET viewCount = viewCount + 1 WHERE id = $postId`, { $postId: postId });
  }

  // 查詢貼文詳細資訊
  const sql = `
      SELECT
        p.id,
        p.title,
        p.content,
        p.tags,
        p.photos,
        p.attachments,
        p.viewCount,
        p.createdAt,
        p.updatedAt,
        p.userId,
        u.name as userName,
        COALESCE(pic.likeCount, 0) as likeCount,
        COALESCE(pic.commentCount, 0) as commentCount
      FROM
        posts p
      JOIN
        users u ON p.userId = u.id
      LEFT JOIN
        post_interaction_counts pic ON p.id = pic.postId
      WHERE
        p.id = $postId
    `;

  const result = await SQLiteClient.exec(sql, { $postId: postId });
  if (result.length === 0) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const post = result[0] as any;

  // 處理 JSON 資料
  return {
    ...post,
    tags: JSON.parse(post.tags || "[]"),
    photos: post.photos ? JSON.parse(post.photos) : undefined,
    attachments: post.attachments ? JSON.parse(post.attachments) : undefined,
    createdAt: new Date(post.createdAt),
    updatedAt: new Date(post.updatedAt),
    likeCount: post.likeCount || 0,
    commentCount: post.commentCount || 0,
  };
};

// ----------------------------
// 匯出
// ----------------------------

export { fetchPosts, fetchPostCounts, fetchPostById, fetchTags };
export type { FetchPostsParams, FetchPostCountsParams, FetchPostByIdParams, FetchPostByIdResult };
