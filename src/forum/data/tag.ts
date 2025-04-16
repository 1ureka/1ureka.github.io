import { getSession } from "./session";
import { sqlite } from "./client";

// ----------------------------
// 查詢所有標籤
// ----------------------------

type FetchTagsResult = { name: string; count: number }[];

type FetchTags = () => Promise<FetchTagsResult>;

const fetchTags: FetchTags = async () => {
  const sql = "SELECT tags FROM tag_stats";

  const result = await sqlite.exec(sql);
  if (result.length === 0) return [];

  // 從查詢結果中提取 tags 並解析 JSON 字串
  const uniqueTagsJson = result[0].tags as string;
  const tags = JSON.parse(uniqueTagsJson);
  return Array.isArray(tags) ? tags : [];
};

// ----------------------------
// 查詢使用過的標籤
// ----------------------------

type FetchUserTags = () => Promise<FetchTagsResult>;

const fetchUserTags: FetchUserTags = async () => {
  // 獲取當前使用者資訊
  const session = await getSession({ server: true });
  if (!session.authenticated) return [];
  const userId = session.user.id;

  const sql = `
      SELECT json_group_array(json_object('name', tag, 'count', COUNT)) as tags
      FROM (
        SELECT json_each.value AS tag, COUNT(*) AS COUNT
        FROM posts, json_each(posts.tags)
        WHERE posts.userId = $userId
        GROUP BY json_each.value
        ORDER BY COUNT DESC, tag
      )
    `;

  const result = await sqlite.exec(sql, { $userId: userId });
  if (result.length === 0) return [];

  // 從查詢結果中提取 tags 並解析 JSON 字串
  const userTagsJson = result[0].tags as string;
  const tags = JSON.parse(userTagsJson);
  return Array.isArray(tags) ? tags : [];
};

// ----------------------------
// 匯出
// ----------------------------

export { fetchTags, fetchUserTags };
export type { FetchTagsResult };
