import { useQuery } from "@tanstack/react-query";
import { fetchCommentById, fetchComments } from "../data/comment";

const staleTime = 1000 * 60 * 10;

const useCommentsByPostId = (postId: number) => {
  return useQuery({
    queryKey: ["commentsByPost", postId],
    queryFn: () => fetchComments({ postId }),
    staleTime,
  });
};

const useCommentsByParentId = (parentId: number) => {
  return useQuery({
    queryKey: ["commentsByParent", parentId],
    queryFn: () => fetchComments({ parentId }),
    staleTime,
  });
};

const useCommentById = (commentId: number) => {
  return useQuery({
    queryKey: ["comment", commentId],
    queryFn: () => fetchCommentById({ commentId }),
    staleTime,
  });
};

export { useCommentsByPostId, useCommentsByParentId, useCommentById };
