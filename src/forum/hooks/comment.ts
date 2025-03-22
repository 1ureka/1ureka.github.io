// ----------------------------------------
// 假資料與模擬 API
// ----------------------------------------

import { useQuery } from "@tanstack/react-query";
import { comments } from "../utils/data";

const fakeFetchCommentsByPostId = async (postId: number) => {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
  return (
    comments
      .filter((comment) => {
        const isMainComment = comment.postId === postId && !comment.parentId;
        return isMainComment;
      })
      .map((comment) => comment.id) || []
  );
};

const fakeFetchCommentsByParentId = async (parentId: number) => {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
  return comments.filter((comment) => comment.parentId === parentId).map((comment) => comment.id) || [];
};

const fakeFetchCommentsByCommentId = async (commentId: number) => {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
  return comments.filter((comment) => comment.parentId === commentId).map((comment) => comment.id) || [];
};

const fakeFetchCommentById = async (commentId: number) => {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
  return comments.find((comment) => comment.id === commentId) || null;
};

// ----------------------------------------
// 實際 Hook
// ----------------------------------------

const staleTime = 1000 * 60 * 10;

const useCommentsByPostId = (postId: number) => {
  return useQuery({
    queryKey: ["commentsByPost", postId],
    queryFn: () => fakeFetchCommentsByPostId(postId),
    staleTime,
  });
};

const useCommentsByParentId = (parentId: number) => {
  return useQuery({
    queryKey: ["commentsByParent", parentId],
    queryFn: () => fakeFetchCommentsByParentId(parentId),
    staleTime,
  });
};

const useCommentsByCommentId = (commentId: number) => {
  return useQuery({
    queryKey: ["commentsByComment", commentId],
    queryFn: () => fakeFetchCommentsByCommentId(commentId),
    staleTime,
  });
};

const useCommentById = (commentId: number) => {
  return useQuery({
    queryKey: ["comment", commentId],
    queryFn: () => fakeFetchCommentById(commentId),
    staleTime,
  });
};

export { useCommentsByPostId, useCommentsByParentId, useCommentsByCommentId, useCommentById };
