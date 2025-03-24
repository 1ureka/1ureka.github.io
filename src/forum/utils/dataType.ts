type User = {
  id: number;
  name: string;
  description: string;
};

type Notification = {
  id: number;
  title: string;
  content: string;
};

type Photo = {
  name: string;
  url: string;
};

type Post = {
  // 實際來自關聯查詢的 User
  authorId: User["id"];
  author: User["name"];
  authorDescription: User["description"];

  // 實際來自快取視圖 post_interaction_counts, post_comments_count
  likeCount: number;
  replyCount: number;

  id: number;
  title: string;
  content: string;
  tags: string[]; // 盡量超過 3 個
  photos?: Photo[]; // 照片連結
  attachments?: File[]; // 附件連結
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
};

type Comment = {
  // 實際來自關聯查詢的 User
  authorId: User["id"];
  author: User["name"];
  authorDescription: User["description"];

  id: number;
  postId: number; // 所屬的貼文 ID
  parentId?: number; // 父留言 ID，若為空則為主留言
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export type { User, Notification, Post, Comment };
