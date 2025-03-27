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

export type { User, Notification, Comment };
