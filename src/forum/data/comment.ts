import { getSession } from "./session";
import { SQLiteClient } from "./SQLiteClient";

// ----------------------------
// 查詢單層留言列表
// ----------------------------

type CommentOrderBy = "latest" | "likes";

type FetchCommentsParams =
  | { postId: number; parentId?: never; orderBy?: CommentOrderBy }
  | { postId?: never; parentId: number; orderBy?: CommentOrderBy };

type FetchComments = (params: FetchCommentsParams) => Promise<number[]>;

const fetchComments: FetchComments = async (params) => {
  const isPostQuery = params.postId !== undefined;
  const whereClause = isPostQuery ? "c.postId = $id AND c.parentId IS NULL" : "c.parentId = $id";

  const orderBy = params.orderBy || "latest";
  const orderClause =
    orderBy === "latest" ? "datetime(c.createdAt) DESC" : "COALESCE(cic.likeCount, 0) DESC, datetime(c.createdAt) DESC";

  const sql = `
      SELECT c.id FROM comments c
      LEFT JOIN comment_interaction_counts cic ON c.id = cic.commentId
      WHERE ${whereClause} ORDER BY ${orderClause}
    `;

  const queryParams = { $id: isPostQuery ? params.postId : params.parentId };

  const result = await SQLiteClient.exec(sql, queryParams);
  return result.map((comment) => comment.id as number);
};

// ----------------------------
// 查詢留言詳細資訊
// ----------------------------

type FetchCommentByIdParams = { commentId: number };

type FetchCommentByIdResult = {
  id: number;
  postId: number;
  parentId?: number | null;
  content: string;
  userId: number;
  userName: string;
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
};

type FetchCommentById = (params: FetchCommentByIdParams) => Promise<FetchCommentByIdResult | null>;

const fetchCommentById: FetchCommentById = async ({ commentId }) => {
  const sql = `
      SELECT
        c.id,
        c.postId,
        c.parentId,
        c.content,
        c.userId,
        u.name as userName,
        COALESCE(cic.likeCount, 0) as likeCount,
        c.createdAt,
        c.updatedAt
      FROM
        comments c
      JOIN
        users u ON c.userId = u.id
      LEFT JOIN
        comment_interaction_counts cic ON c.id = cic.commentId
      WHERE
        c.id = $commentId
    `;

  const result = await SQLiteClient.exec(sql, { $commentId: commentId });
  if (result.length === 0) return null;

  const comment = result[0];

  return {
    ...comment,
    id: comment.id as number,
    postId: comment.postId as number,
    parentId: comment.parentId as number | null,
    content: comment.content as string,
    userId: comment.userId as number,
    userName: comment.userName as string,
    likeCount: comment.likeCount as number,
    createdAt: new Date(comment.createdAt as string),
    updatedAt: new Date(comment.updatedAt as string),
  };
};

// ----------------------------
// 創建留言
// ----------------------------

type CreateCommentParams = {
  postId: number;
  content: string;
  parentId?: number; // 若為回覆其他留言，則提供 parentId
};

type CreateComment = (params: CreateCommentParams) => Promise<{ error: string } | number>;

const createComment: CreateComment = async ({ postId, content, parentId }) => {
  // 獲取當前使用者 ID
  const session = await getSession({ server: true });
  if (!session.authenticated) return { error: "未登入或授權失效，無法創建留言" };
  const userId = session.user.id;

  // 驗證 postId 存在
  const checkPostSql = `SELECT id FROM posts WHERE id = $postId`;
  const postResult = await SQLiteClient.exec(checkPostSql, { $postId: postId });
  if (postResult.length === 0) return { error: "貼文不存在" };

  // 如果有 parentId，驗證此留言存在且屬於正確的貼文
  if (parentId) {
    const checkParentSql = `SELECT id, postId FROM comments WHERE id = $parentId`;
    const parentResult = await SQLiteClient.exec(checkParentSql, { $parentId: parentId });

    if (parentResult.length === 0) return { error: "回覆的留言不存在" };
    if (parentResult[0].postId !== postId) return { error: "回覆的留言不屬於此貼文" };
  }

  // 建立當前時間的 ISO 字串
  const now = new Date().toISOString();

  // 建立插入 SQL
  const sql = `
      INSERT INTO comments (userId, postId, parentId, content, createdAt, updatedAt)
      VALUES ($userId, $postId, $parentId, $content, $createdAt, $updatedAt)
      RETURNING id
    `;

  const params = {
    $userId: userId,
    $postId: postId,
    $parentId: parentId || null,
    $content: content,
    $createdAt: now,
    $updatedAt: now,
  };

  // 執行 SQL 並獲取新增的 ID
  const result = await SQLiteClient.exec(sql, params);
  if (!result || result.length === 0 || !(typeof result[0].id === "number")) {
    return { error: "創建留言失敗" };
  }

  return result[0].id;
};

// ----------------------------
// 匯出
// ----------------------------

export { fetchComments, fetchCommentById, createComment };
export type { FetchCommentByIdResult, CommentOrderBy };
