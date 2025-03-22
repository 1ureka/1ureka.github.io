// TODO: 根據 user id 獲取其公開資訊, 根據 user id 獲取其 post id array, 根據 user id 獲取其 comment id array, 根據 user id 獲取其 follower user id array

// ----------------------------------------
// 假資料與模擬 API
// ----------------------------------------

import { useQuery } from "@tanstack/react-query";
import { authors } from "../utils/data";

const fakeFetchUsers = async () => {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
  return authors;
};

// TODO: 到時這個api應該 query 有 post 的 users
const fakeFetchAuthors = async () => {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 2500));
  return authors;
};

// ----------------------------------------
// 實際 Hook
// ----------------------------------------

const staleTime = 1 * 60 * 1000;

/**
 * 獲取所有使用者
 */
const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fakeFetchUsers,
    staleTime,
  });
};

/**
 * 獲取所有作者 (有發布過文章的使用者)
 */
const useAuthors = () => {
  return useQuery({
    queryKey: ["authors"],
    queryFn: fakeFetchAuthors,
    staleTime,
  });
};

export { useUsers, useAuthors };
