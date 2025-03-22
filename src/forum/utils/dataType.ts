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
  id: number;
  title: string;
  author: string; // 作者名稱(英文)
  content: string;
  tags: string[]; // 盡量超過 3 個
  photos?: Photo[]; // 照片連結
  attachments?: File[]; // 附件連結
  viewCount: number;
  likeCount: number;
  replyCount: number;
  createdAt: Date;
  updatedAt: Date;
};

type Comment = {
  id: number;
  postId: number; // 所屬的貼文 ID
  parentId?: number; // 父留言 ID，若為空則為主留言
  userId: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export type { User, Notification, Post, Comment };
