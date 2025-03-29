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
  const orderClause = orderBy === "latest" ? "c.createdAt DESC" : "COALESCE(cic.likeCount, 0) DESC, c.createdAt DESC";

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
// 匯出
// ----------------------------

export { fetchComments, fetchCommentById };
export type { FetchCommentByIdResult, CommentOrderBy };
