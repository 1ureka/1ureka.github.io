import { posts } from "./test";

// TODO: 換成真正的 cookie session，並且由於是MPA，所以react週期不會重新開始，所以可以直接用全域變數
const USER = "1ureka";
const USER_LIKES = new Set<number>();
for (const post of posts) {
  if (Math.random() < 0.5) USER_LIKES.add(post.id);
}

// TODO: 直接返回全域的 cookie session
const useSession = () => {
  return {
    user: {
      id: 1,
      name: USER,
      likes: USER_LIKES,
    },
  };
};

export { useSession };
