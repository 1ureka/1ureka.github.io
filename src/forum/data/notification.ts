import { getSession } from "./session";
import { sqlite } from "./client";

// ----------------------------
// 用於產生通知訊息的映射
// ----------------------------

const messageMap = {
  reply_post: (actor: string, postTitle: string) => `${actor} 回覆了你的貼文「${postTitle}」`,
  reply_comment: (actor: string, commentContent: string) =>
    `${actor} 回覆了你的留言「${commentContent.slice(0, 20)}...」`,
  follow_user: (actor: string) => `${actor} 開始追蹤你`,
} as const;

type MessageType = keyof typeof messageMap;

// ----------------------------
// 查詢通知數量
// ----------------------------

type FetchNotificationCount = () => Promise<number>;

const fetchNotificationCount: FetchNotificationCount = async () => {
  // 獲取當前使用者 ID
  const session = await getSession({ server: true });
  if (!session.authenticated) return 0;
  const userId = session.user.id;

  // 只獲取未讀且未刪除的通知數量
  const countSql = `
      SELECT COUNT(*) as unreadCount
      FROM user_notifications
      WHERE receiverId = $userId AND isRead = 0 AND isDeleted = 0
    `;

  const countResult = await sqlite.exec(countSql, { $userId: userId });
  if (countResult.length === 0) return 0;
  const { unreadCount } = countResult[0];
  if (typeof unreadCount !== "number") return 0;
  return unreadCount;
};

// ----------------------------
// 查詢通知
// ----------------------------

// userId 由 getSession() 取得
type FetchNotificationsParams = {
  page?: number;
  limit?: number;
  priority?: MessageType[]; // ["comment_on_post", "reply_comment", "follow_user"] 就是優先順序
  filterBy?: MessageType[];
  order?: "asc" | "desc"; // 預設是 desc (最新的在前面)
  isRead?: boolean; // 是否已讀
  isDeleted?: boolean; // 是否已刪除
};

type Notification = {
  id: string; // 由 type, sourceId 組合而成的唯一識別符
  type: MessageType;
  sourceId: number;
  actorId: number;
  actorName: string;
  createdAt: Date;
  isRead: boolean;
  isDeleted: boolean;
  message: string; // 根據 messageMap 產生的訊息
  extraData?: {
    postId?: number;
    postTitle?: string;
    commentId?: number;
    commentContent?: string;
  };
};

type FetchNotificationsResult = {
  notifications: Notification[];
  nextPage: number | null;
  totalPages: number;
};

type FetchNotifications = (params: FetchNotificationsParams) => Promise<FetchNotificationsResult>;

const fetchNotifications: FetchNotifications = async ({
  page = 0,
  limit = 20,
  priority,
  filterBy,
  order = "desc",
  isRead,
  isDeleted = false,
} = {}) => {
  // 獲取當前使用者 ID
  const session = await getSession({ server: true });
  if (!session.authenticated) {
    return { notifications: [], nextPage: null, totalPages: 0 };
  }
  const userId = session.user.id;

  // 建立查詢條件
  const wheres = ["un.receiverId = $userId"];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: Record<string, any> = { $userId: userId };

  // 處理已讀/未讀篩選
  if (isRead !== undefined) {
    wheres.push(`un.isRead = $isRead`);
    params.$isRead = isRead ? 1 : 0;
  }

  // 處理已刪除篩選
  wheres.push(`un.isDeleted = $isDeleted`);
  params.$isDeleted = isDeleted ? 1 : 0;

  // 處理通知類型篩選
  if (filterBy && filterBy.length > 0) {
    const placeholders = filterBy.map((_, idx) => `$filterType${idx}`);
    wheres.push(`un.type IN (${placeholders.join(", ")})`);
    filterBy.forEach((type, idx) => {
      params[`$filterType${idx}`] = type;
    });
  }

  const whereClause = wheres.length > 0 ? `WHERE ${wheres.join(" AND ")}` : "";

  // 查詢通知總數
  const countSql = `
      SELECT COUNT(*) as total
      FROM user_notifications un
      ${whereClause}
    `;

  const countResult = await sqlite.exec(countSql, params);
  if (countResult.length === 0) return { notifications: [], nextPage: null, totalPages: 0 };
  const { total: totalCount } = countResult[0];
  if (typeof totalCount !== "number") return { notifications: [], nextPage: null, totalPages: 0 };

  const totalPages = Math.ceil(totalCount / limit);
  const nextPage = page + 1 < totalPages ? page + 1 : null;

  // 準備排序欄位
  let orderClause = `un.isRead ASC, un.createdAt ${order.toUpperCase()}`;

  // 處理優先順序（在未讀優先的基礎上再加上用戶指定的優先順序）
  if (priority && priority.length > 0) {
    const caseStatement = priority.map((type, index) => `WHEN un.type = '${type}' THEN ${index}`).join(" ");

    orderClause = `un.isRead ASC, (CASE ${caseStatement} ELSE ${
      priority.length
    } END), un.createdAt ${order.toUpperCase()}`;
  }

  // 分頁參數
  params.$limit = limit;
  params.$offset = page * limit;

  // 查詢通知資料
  const sql = `
      SELECT
        un.type,
        un.sourceId,
        un.receiverId,
        un.actorId,
        u.name as actorName,
        un.createdAt,
        un.isRead,
        un.isDeleted,
        CASE
          WHEN un.type = 'reply_post' THEN
            (SELECT p.id FROM comments c JOIN posts p ON c.postId = p.id WHERE c.id = un.sourceId)
          WHEN un.type = 'reply_comment' THEN
            (SELECT c2.postId FROM comments c2 WHERE c2.id = un.sourceId)
          ELSE NULL
        END as postId,
        CASE
          WHEN un.type = 'reply_post' THEN
            (SELECT p.title FROM comments c JOIN posts p ON c.postId = p.id WHERE c.id = un.sourceId)
          ELSE NULL
        END as postTitle,
        CASE
          WHEN un.type = 'reply_comment' THEN
            (SELECT c1.id FROM comments c2 JOIN comments c1 ON c2.parentId = c1.id WHERE c2.id = un.sourceId)
          ELSE NULL
        END as commentId,
        CASE
          WHEN un.type = 'reply_comment' THEN
            (SELECT c1.content FROM comments c2 JOIN comments c1 ON c2.parentId = c1.id WHERE c2.id = un.sourceId)
          ELSE NULL
        END as commentContent
      FROM user_notifications un
      JOIN users u ON un.actorId = u.id
      ${whereClause}
      ORDER BY ${orderClause}
      LIMIT $limit OFFSET $offset
    `;

  const result = await sqlite.exec(sql, params);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const notifications = result.map((row: any) => {
    // 產生通知訊息
    let message = "";
    let extraData: Notification["extraData"] = {};

    if (row.type === "reply_post") {
      message = messageMap.reply_post(row.actorName, row.postTitle || "");
      extraData = {
        postId: row.postId,
        postTitle: row.postTitle,
      };
    } else if (row.type === "reply_comment") {
      message = messageMap.reply_comment(row.actorName, row.commentContent || "");
      extraData = {
        postId: row.postId,
        commentId: row.commentId,
        commentContent: row.commentContent,
      };
    } else if (row.type === "follow_user") {
      message = messageMap.follow_user(row.actorName);
    }

    // 組合唯一ID
    const id = `${row.type}-${row.sourceId}`;

    return {
      id,
      type: row.type,
      sourceId: row.sourceId,
      actorId: row.actorId,
      actorName: row.actorName,
      createdAt: new Date(row.createdAt),
      isRead: Boolean(row.isRead),
      isDeleted: Boolean(row.isDeleted),
      message,
      extraData: Object.keys(extraData).length > 0 ? extraData : undefined,
    };
  });

  return { notifications, nextPage, totalPages };
};

// ----------------------------
// 已讀通知
// ----------------------------

type MarkNotificationReadParams = {
  type: MessageType;
  sourceId: number;
};

type MarkNotificationRead = (params: MarkNotificationReadParams) => Promise<{ error?: string }>;

const markNotificationRead: MarkNotificationRead = async ({ type, sourceId }) => {
  // 獲取當前使用者 ID
  const session = await getSession({ server: true });
  if (!session.authenticated) return { error: "未登入或授權失效" };
  const userId = session.user.id;

  // 驗證是否為用戶的通知
  const checkSql = `
      SELECT 1 FROM user_notifications
      WHERE receiverId = $userId AND type = $type AND sourceId = $sourceId
    `;

  const checkResult = await sqlite.exec(checkSql, { $userId: userId, $type: type, $sourceId: sourceId });

  if (checkResult.length === 0) return { error: "通知不存在或無權限標記" };

  // 更新通知狀態
  const upsertSql = `
      INSERT INTO notification_states (userId, type, sourceId, readAt, isDeleted)
      VALUES ($userId, $type, $sourceId, CURRENT_TIMESTAMP, 0)
      ON CONFLICT (userId, type, sourceId)
      DO UPDATE SET readAt = CURRENT_TIMESTAMP
      WHERE userId = $userId AND type = $type AND sourceId = $sourceId
    `;

  await sqlite.exec(upsertSql, { $userId: userId, $type: type, $sourceId: sourceId });
  return {};
};

// 標記所有通知為已讀
type MarkAllNotificationsRead = () => Promise<{ error?: string }>;

const markAllNotificationsRead: MarkAllNotificationsRead = async () => {
  // 獲取當前使用者 ID
  const session = await getSession({ server: true });
  if (!session.authenticated) return { error: "未登入或授權失效" };
  const userId = session.user.id;

  // 取得所有未讀通知
  const unreadSql = `
      SELECT type, sourceId
      FROM user_notifications
      WHERE receiverId = $userId AND isRead = 0 AND isDeleted = 0
    `;

  const unreadNotifications = await sqlite.exec(unreadSql, { $userId: userId });
  if (unreadNotifications.length === 0) return {}; // 沒有未讀通知

  // 批量插入已讀狀態
  const values = unreadNotifications
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((n: any) => `(${userId}, '${n.type}', ${n.sourceId}, CURRENT_TIMESTAMP, 0)`)
    .join(", ");

  const batchInsertSql = `
      INSERT OR REPLACE INTO notification_states
      (userId, type, sourceId, readAt, isDeleted)
      VALUES ${values}
    `;

  await sqlite.exec(batchInsertSql, {});

  return {};
};

// ----------------------------
// 刪除通知
// ----------------------------

type DeleteNotificationParams = {
  type: MessageType;
  sourceId: number;
};

type DeleteNotification = (params: DeleteNotificationParams) => Promise<{ error?: string }>;

const deleteNotification: DeleteNotification = async ({ type, sourceId }) => {
  // 獲取當前使用者 ID
  const session = await getSession({ server: true });
  if (!session.authenticated) return { error: "未登入或授權失效" };
  const userId = session.user.id;

  // 驗證是否為用戶的通知
  const checkSql = `
      SELECT 1 FROM user_notifications
      WHERE receiverId = $userId AND type = $type AND sourceId = $sourceId
    `;

  const checkResult = await sqlite.exec(checkSql, { $userId: userId, $type: type, $sourceId: sourceId });
  if (checkResult.length === 0) return { error: "通知不存在或無權限刪除" };

  // 更新通知狀態為已刪除
  const upsertSql = `
      INSERT INTO notification_states (userId, type, sourceId, readAt, isDeleted)
      VALUES ($userId, $type, $sourceId, CURRENT_TIMESTAMP, 1)
      ON CONFLICT (userId, type, sourceId)
      DO UPDATE SET isDeleted = 1
      WHERE userId = $userId AND type = $type AND sourceId = $sourceId
    `;

  await sqlite.exec(upsertSql, { $userId: userId, $type: type, $sourceId: sourceId });

  return {};
};

// 刪除所有通知
type DeleteAllNotifications = () => Promise<{ error?: string }>;

const deleteAllNotifications: DeleteAllNotifications = async () => {
  // 獲取當前使用者 ID
  const session = await getSession({ server: true });
  if (!session.authenticated) return { error: "未登入或授權失效" };
  const userId = session.user.id;

  // 取得使用者所有通知
  const notificationsSql = `
      SELECT type, sourceId
      FROM user_notifications
      WHERE receiverId = $userId AND isDeleted = 0
    `;

  const notifications = await sqlite.exec(notificationsSql, { $userId: userId });
  if (notifications.length === 0) return {}; // 沒有通知可刪除

  // 批量標記為已刪除
  const values = notifications
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((n: any) => `(${userId}, '${n.type}', ${n.sourceId}, CURRENT_TIMESTAMP, 1)`)
    .join(", ");

  const batchInsertSql = `
      INSERT OR REPLACE INTO notification_states
      (userId, type, sourceId, readAt, isDeleted)
      VALUES ${values}
    `;

  await sqlite.exec(batchInsertSql, {});

  return {};
};

// ----------------------------
// 匯出
// ----------------------------

export { fetchNotifications, fetchNotificationCount, markNotificationRead, markAllNotificationsRead };
export { deleteNotification, deleteAllNotifications };
export type { MessageType, Notification, FetchNotificationsParams, FetchNotificationsResult };
