import { Box, Typography, Tooltip, useMediaQuery } from "@mui/material";

import { routes } from "@/routes";
import { formatRelativeTime } from "@/utils/formatters";
import { CommentMenu } from "./CommentMenu";
import type { FetchCommentByIdResult } from "@/forum/data/comment";
import { useState } from "react";
import { NewComment } from "./NewComment";

const CommentContent = ({ comment }: { comment: FetchCommentByIdResult }) => {
  const isMd = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <NewComment
        type="edit"
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
            onDelete={() => {}}
            onEdit={() => setIsEditing(true)}
            isPending={false}
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
