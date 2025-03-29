import { SQLiteClient } from "./SQLiteClient";
import dayjs from "dayjs";

// ------------------------------
// 詳細查詢貼文列表
// ------------------------------

type SearchPostsParams = {
  page?: number;
  limit?: number;
  all?: string;
  title?: string;
  content?: string;
  author?: string;
  likeCounts?: number;
  viewCounts?: number;
  startDate?: string | null;
  endDate?: string | null;
  orderBy?: "title" | "createdAt" | "updatedAt" | "viewCount" | "likeCount" | "commentCount";
  order?: "asc" | "desc";
};

type SearchPostsResult = {
  posts: number[];
  nextPage: number | null;
  totalPages: number;
  totalCount: number;
};

const searchPosts = async ({
  page = 0,
  limit = 10,
  all = "",
  title = "",
  content = "",
  author = "",
  likeCounts = 0,
  viewCounts = 0,
  startDate = null,
  endDate = null,
  orderBy = "createdAt",
  order = "desc",
}: SearchPostsParams = {}): Promise<SearchPostsResult> => {
  // ----------------------------
  // 建立條件子句
  const wheres = [];
  const params: Record<string, string | number> = {};

  // 搜尋關鍵字（標題、內容、作者名）
  if (all && all.trim()) {
    wheres.push("(p.title LIKE $all OR p.content LIKE $all OR u.name LIKE $all)");
    params.$all = `%${all.trim()}%`;
  }

  // 標題關鍵字
  if (title && title.trim()) {
    wheres.push("p.title LIKE $title");
    params.$title = `%${title.trim()}%`;
  }

  // 內容關鍵字
  if (content && content.trim()) {
    wheres.push("p.content LIKE $content");
    params.$content = `%${content.trim()}%`;
  }

  // 作者
  if (author && author.trim() && author !== "all") {
    wheres.push("u.name = $author");
    params.$author = author.trim();
  }

  // 讚數
  if (likeCounts > 0) {
    wheres.push("COALESCE(pic.likeCount, 0) >= $likeCounts");
    params.$likeCounts = likeCounts;
  }

  // 觀看次數
  if (viewCounts > 0) {
    wheres.push("p.viewCount >= $viewCounts");
    params.$viewCounts = viewCounts;
  }

  // 日期範圍 - 起始日期
  if (startDate && dayjs(startDate).isValid()) {
    // 確保日期格式正確
    const formattedStartDate = dayjs(startDate).toISOString();
    wheres.push("datetime(p.createdAt) >= datetime($startDate)");
    params.$startDate = formattedStartDate;
  }

  // 日期範圍 - 結束日期
  if (endDate && dayjs(endDate).isValid()) {
    // 確保日期格式正確
    const formattedEndDate = dayjs(endDate).toISOString();
    wheres.push("datetime(p.createdAt) <= datetime($endDate)");
    params.$endDate = formattedEndDate;
  }

  const whereClause = wheres.length > 0 ? `WHERE ${wheres.join(" AND ")}` : "";

  // ----------------------------
  // 準備排序欄位
  let orderColumn = "p.createdAt";
  if (orderBy === "likeCount" || orderBy === "commentCount") orderColumn = `pic.${orderBy}`;
  else if (orderBy === "createdAt" || orderBy === "updatedAt") orderColumn = `datetime(p.${orderBy})`;
  else orderColumn = `p.${orderBy}`;

  // ----------------------------
  // 查詢總數
  const countSql = `
      SELECT COUNT(*) as totalCount
      FROM posts p
      JOIN users u ON p.userId = u.id
      LEFT JOIN post_interaction_counts pic ON p.id = pic.postId
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
      SELECT p.id
      FROM posts p
      JOIN users u ON p.userId = u.id
      LEFT JOIN post_interaction_counts pic ON p.id = pic.postId
      ${whereClause}
      ORDER BY ${orderColumn} ${order.toUpperCase()}, datetime(p.createdAt) DESC
      LIMIT $limit OFFSET $offset
    `;

  const result = await SQLiteClient.exec(sql, params);
  const posts = result.map((post) => post.id) as number[];

  return { posts, nextPage, totalPages, totalCount };
};

// ----------------------------
// 匯出
// ----------------------------

export { searchPosts };
export type { SearchPostsParams, SearchPostsResult };
