import { getSession } from "./session";
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
  prioritizeFollowers?: boolean;
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
  prioritizeFollowers,
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
  else if (orderBy === "createdAt" || orderBy === "updatedAt") orderColumn = `datetime(p.${orderBy})`;
  else orderColumn = `p.${orderBy}`;

  // 判斷是否啟用優先顯示追蹤者的文章
  let priorityJoinClause = "";
  let priorityOrderClause = "";

  if (prioritizeFollowers) {
    // 獲取當前session中的使用者ID
    const session = await getSession({ server: true });
    const currentUserId = session.authenticated ? session.user.id : null;

    if (currentUserId) {
      params.$currentUserId = currentUserId;

      // 新增 JOIN 子句，用來標記貼文是否來自追蹤者
      priorityJoinClause = `
        LEFT JOIN (
          SELECT followeeId, 1 AS isFollowed
          FROM user_interactions
          WHERE followerId = $currentUserId AND type = 'follow'
        ) AS following ON p.userId = following.followeeId
      `;

      // 優先排序追蹤者的文章
      priorityOrderClause = `CASE WHEN following.isFollowed = 1 THEN 1 ELSE 0 END DESC, `;
    }
  }

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
        ${priorityJoinClause}
        ${whereClause}
        ORDER BY ${priorityOrderClause}${orderColumn} ${order.toUpperCase()}, p.createdAt DESC
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
  isFromFollowing: boolean; // 是否來自追蹤者
  isSelf: boolean; // 是否為自己創建的貼文
};

type FetchPostById = (params: FetchPostByIdParams) => Promise<FetchPostByIdResult | null>;

const fetchPostById: FetchPostById = async ({ postId, incrementViewCount = false }) => {
  // 獲取當前使用者資訊，用於判斷是否來自追蹤者
  let currentUserId: number | null = null;
  const session = await getSession({ server: true });
  currentUserId = session.authenticated ? session.user.id : null;

  // 更新瀏覽計數 (非重要，因此不使用 await)
  if (incrementViewCount) {
    SQLiteClient.exec(`UPDATE posts SET viewCount = viewCount + 1 WHERE id = $postId`, { $postId: postId });
  }

  // 查詢貼文詳細資訊
  let sql = `
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
  `;

  // 如果有登入的使用者，增加判斷是否來自追蹤者的欄位
  if (currentUserId) {
    sql += `,
      EXISTS (
        SELECT 1
        FROM user_interactions
        WHERE followerId = $currentUserId
        AND followeeId = p.userId
        AND type = 'follow'
      ) as isFromFollowing
    `;
  } else {
    sql += `, 0 as isFromFollowing`;
  }

  sql += `
      FROM posts p
      JOIN users u ON p.userId = u.id
      LEFT JOIN post_interaction_counts pic ON p.id = pic.postId
      WHERE p.id = $postId
  `;

  const params: Record<string, string | number> = { $postId: postId };
  if (currentUserId) {
    params.$currentUserId = currentUserId;
  }

  const result = await SQLiteClient.exec(sql, params);
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
    isFromFollowing: Boolean(post.isFromFollowing),
    isSelf: currentUserId ? post.userId === currentUserId : false,
  };
};

// ----------------------------
// 創建貼文
// ----------------------------

// userId 自動從 session 中獲取
type CreatePostParams = Pick<FetchPostByIdResult, "title" | "content" | "tags" | "photos" | "attachments">;
type CreatePost = (params: CreatePostParams) => Promise<{ error: string } | number>;

const createPost: CreatePost = async ({ title, content, tags, photos, attachments }) => {
  // 獲取當前使用者 ID
  const session = await getSession({ server: true });
  if (!session.authenticated) return { error: "未登入或授權失效，無法創建貼文" };
  const userId = session.user.id;

  // 處理 JSON 資料
  const tagsJson = JSON.stringify(tags);
  const photosJson = photos ? JSON.stringify(photos) : null;
  const attachmentsJson = attachments ? JSON.stringify(attachments) : null;

  // 建立插入 SQL
  const sql = `
      INSERT INTO posts ( userId, title, content, tags, photos, attachments, createdAt, updatedAt )
      VALUES ( $userId, $title, $content, $tags, $photos, $attachments, $createdAt, $updatedAt )
      RETURNING id
    `;

  // 建立當前時間的 ISO 字串
  const now = new Date().toISOString();
  const params = {
    $userId: userId,
    $title: title,
    $content: content,
    $tags: tagsJson,
    $photos: photosJson,
    $attachments: attachmentsJson,
    $createdAt: now,
    $updatedAt: now,
  };

  // 執行 SQL 並獲取新增的 ID
  const result = await SQLiteClient.exec(sql, params);
  if (!result || result.length === 0 || !(typeof result[0].id === "number")) {
    return { error: "創建貼文失敗" };
  }

  return result[0].id;
};

// ----------------------------
// 更新貼文
// ----------------------------

type UpdatePostParams = Pick<FetchPostByIdResult, "id" | "title" | "content" | "tags" | "photos" | "attachments">;
type UpdatePost = (params: UpdatePostParams) => Promise<{ error: string } | null>;

const updatePost: UpdatePost = async ({ id: postId, title, content, tags, photos, attachments }) => {
  // 獲取當前使用者 ID
  const session = await getSession({ server: true });
  if (!session.authenticated) return { error: "未登入或授權失效，無法更新貼文" };
  const userId = session.user.id;

  // 驗證使用者是否為貼文擁有者
  const checkOwnerSql = `SELECT userId FROM posts WHERE id = $postId`;
  const checkResult = await SQLiteClient.exec(checkOwnerSql, { $postId: postId });

  if (checkResult.length === 0) return { error: "貼文不存在" };
  if (checkResult[0].userId !== userId) return { error: "您沒有權限更新此貼文" };

  // 處理 JSON 資料
  const tagsJson = JSON.stringify(tags);
  const photosJson = photos ? JSON.stringify(photos) : null;
  const attachmentsJson = attachments ? JSON.stringify(attachments) : null;

  // 更新時間戳
  const now = new Date().toISOString();

  // 建立更新 SQL
  const sql = `
      UPDATE posts
      SET title = $title,
          content = $content,
          tags = $tags,
          photos = $photos,
          attachments = $attachments,
          updatedAt = $updatedAt
      WHERE id = $postId AND userId = $userId
    `;

  const params = {
    $postId: postId,
    $userId: userId,
    $title: title,
    $content: content,
    $tags: tagsJson,
    $photos: photosJson,
    $attachments: attachmentsJson,
    $updatedAt: now,
  };

  // 執行 SQL
  await SQLiteClient.exec(sql, params);
  return null; // 成功無錯誤返回
};

// ------------------------------
// 刪除貼文
// ------------------------------

type DeletePost = (postId: number) => Promise<{ error: string } | null>;

const deletePost: DeletePost = async (postId) => {
  // 獲取當前使用者 ID
  const session = await getSession({ server: true });
  if (!session.authenticated) return { error: "未登入或授權失效，無法刪除貼文" };
  const userId = session.user.id;

  // 驗證使用者是否為貼文擁有者
  const checkOwnerSql = `SELECT userId FROM posts WHERE id = $postId`;
  const checkResult = await SQLiteClient.exec(checkOwnerSql, { $postId: postId });

  if (checkResult.length === 0) return { error: "貼文不存在" };
  if (checkResult[0].userId !== userId) return { error: "您沒有權限刪除此貼文" };

  // 刪除貼文
  const sql = `DELETE FROM posts WHERE id = $postId AND userId = $userId`;
  await SQLiteClient.exec(sql, { $postId: postId, $userId: userId });

  return null; // 成功無錯誤返回
};

// ----------------------------
// 匯出
// ----------------------------

export { fetchPosts, fetchPostCounts, fetchPostById, fetchTags, createPost, updatePost, deletePost };
export type { FetchPostsParams, FetchPostCountsParams, FetchPostByIdParams, FetchPostByIdResult };
