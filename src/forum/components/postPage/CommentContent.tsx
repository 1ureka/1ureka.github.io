import { Box, Typography, Tooltip, useMediaQuery } from "@mui/material";
import { NewComment } from "./NewComment";
import { CommentMenu } from "./CommentMenu";
import type { FetchCommentByIdResult } from "@/forum/data/comment";

import { routes } from "@/routes";
import { formatRelativeTime } from "@/utils/formatters";
import { useState } from "react";
import { useDeleteComment } from "@/forum/hooks/comment";

const CommentContent = ({ comment }: { comment: FetchCommentByIdResult }) => {
  const isMd = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const { mutateAsync: deleteComment, isPending } = useDeleteComment();
  const handleDelete = async () => {
    const result = await deleteComment(comment.id);
    if (result === null) return console.log("留言刪除成功");
    if (result.error) console.error(`留言刪除失敗：${result.error}`);
  };

  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <NewComment
        type="edit"
        commentId={comment.id}
        postId={comment.postId}
        parentId={comment.parentId ?? undefined}
        initialValues={{ content: comment.content }}
        onCancel={() => setIsEditing(false)}
        hideAvator
      />
    );
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography
          variant="subtitle2"
          component="a"
          sx={{ "&:hover": { textDecoration: "underline" }, color: "text.primary" }}
          href={`${routes.forum_users}?user=${comment.userName}`}
        >
          {comment.userName}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Typography variant="caption" color="text.secondary">
            {isMd ? comment.createdAt.toLocaleString() : formatRelativeTime(comment.createdAt)}
          </Typography>

          {comment.createdAt.getTime() !== comment.updatedAt.getTime() && (
            <Tooltip title={`最後編輯於 ${comment.updatedAt.toLocaleString()}`} arrow>
              <Typography variant="caption" color="text.secondary">
                (已編輯)
              </Typography>
            </Tooltip>
          )}

          <CommentMenu
            onDelete={handleDelete}
            onEdit={() => setIsEditing(true)}
            isPending={isPending}
            isSelf={comment.isSelf}
          />
        </Box>
      </Box>

      <Typography variant="body2" sx={{ mt: 0.5, whiteSpace: "pre-line" }}>
        {comment.content}
      </Typography>
    </>
  );
};

export { CommentContent };
