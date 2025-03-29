import { useQuery } from "@tanstack/react-query";
import { fetchCommentById, fetchComments, type CommentOrderBy } from "../data/comment";

const staleTime = 1000 * 60 * 1;

const useCommentsByPostId = ({ postId, orderBy }: { postId: number; orderBy: CommentOrderBy }) => {
  return useQuery({
    queryKey: ["commentsByPost", postId, orderBy],
    queryFn: () => fetchComments({ postId, orderBy }),
    staleTime,
  });
};

const useCommentsByParentId = (parentId: number) => {
  return useQuery({
    queryKey: ["commentsByParent", parentId],
    queryFn: () => fetchComments({ parentId, orderBy: "latest" }),
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
