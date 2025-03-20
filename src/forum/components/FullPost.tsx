import type { Post } from "../utils/test";

const FullPost = ({ post }: { post: Post }) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

const Comment = ({ post }: { post: Post }) => {
  return (
    <div>
      <h2>Comments</h2>
    </div>
  );
};

export { FullPost, Comment };
