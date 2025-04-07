import { useState } from "react";
import { Box, Button, Typography, IconButton, Tooltip, BoxProps, Skeleton } from "@mui/material";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

import { useCommentById, useCommentsByParentId } from "@/forum/hooks/comment";
import { Replies } from "./Comments";
import { NewComment } from "./NewComment";
import { routes } from "@/routes";
import { UserAvatar } from "../userElement/UserAvatar";
import { CommentLikeButton } from "./CommentLikeButton";

interface CommentProps {
  postId: number;
  commentId: number;
  nestedLevel: number;
}

const Comment = ({ postId, commentId, nestedLevel, sx, ...props }: CommentProps & BoxProps) => {
  if (nestedLevel < 0) throw new Error("nestedLevel must be greater than 0");

  const { data: comment, isFetching } = useCommentById(commentId);
  const { data: comments, isFetching: isFetchingComments } = useCommentsByParentId(commentId);

  const [isShowReplies, setIsShowReplies] = useState(false);
  const handleSwitchReplies = () => setIsShowReplies((prev) => !prev);

  const [isShowNewComment, setIsShowNewComment] = useState(false);
  const handleSwitchNewComment = () => setIsShowNewComment((prev) => !prev);

  if (isFetching || !comment || isFetchingComments) {
    return <LoadingComment nestedLevel={nestedLevel} sx={sx} {...props} />;
  }

  return (
    <Box
      sx={{
        position: "relative",
        py: 1,
        pb: nestedLevel > 0 ? 0 : 1,
        pl: 2,
        borderLeft: nestedLevel > 0 ? "2px solid" : "none",
        borderColor: "divider",
        ...sx,
      }}
      {...props}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
        <UserAvatar name={comment.userName} sx={{ mt: 1 }} />

        <Box sx={{ flex: 1 }}>
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
                {comment.createdAt.toLocaleString()}
              </Typography>

              {comment.createdAt.getTime() !== comment.updatedAt.getTime() && (
                <Tooltip title={`最後編輯於 ${comment.updatedAt.toLocaleString()}`} arrow>
                  <Typography variant="caption" color="text.secondary">
                    (已編輯)
                  </Typography>
                </Tooltip>
              )}

              <Tooltip title="更多選項" arrow>
                <IconButton size="small">
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Typography variant="body2" sx={{ mt: 0.5, whiteSpace: "pre-line" }}>
            {comment.content}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mt: 1, gap: 1 }}>
            <CommentLikeButton commentId={commentId} likeCount={comment.likeCount} />

            <Button
              size="small"
              startIcon={<ReplyRoundedIcon />}
              sx={{ color: "text.secondary" }}
              onClick={handleSwitchNewComment}
            >
              <Typography variant="caption">{isShowNewComment ? "取消回覆" : "回覆"}</Typography>
            </Button>
          </Box>

          {isShowNewComment && (
            <NewComment onCancel={() => setIsShowNewComment(false)} postId={postId} parentId={commentId} />
          )}

          {comments && comments.length > 0 && (
            <Button
              startIcon={
                isShowReplies ? (
                  <KeyboardArrowDownRoundedIcon
                    sx={{ transform: "rotate(180deg)", transition: "transform 0.2s ease", transformOrigin: "center" }}
                  />
                ) : (
                  <KeyboardArrowDownRoundedIcon />
                )
              }
              sx={{ mt: 1 }}
              size="small"
              onClick={handleSwitchReplies}
            >
              {isShowReplies ? "隱藏回覆" : `顯示 ${comments.length || 0} 則回覆`}
            </Button>
          )}

          {isShowReplies && comments && <Replies commentId={commentId} postId={postId} />}
        </Box>
      </Box>
    </Box>
  );
};

const LoadingComment = ({ nestedLevel, sx, ...props }: { nestedLevel: number } & BoxProps) => (
  <Box
    sx={{
      position: "relative",
      py: 1,
      pb: nestedLevel > 0 ? 0 : 1,
      pl: 2,
      borderLeft: nestedLevel > 0 ? "2px solid" : "none",
      borderColor: "divider",
      ...sx,
    }}
    {...props}
  >
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
      <Skeleton variant="circular" width={"2rem"} height={"2rem"} sx={{ mt: 1 }} animation="wave" />

      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Skeleton variant="rounded" animation="wave">
            <Typography variant="subtitle2" component="span">
              載入名稱中...
            </Typography>
          </Skeleton>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Skeleton variant="rounded" animation="wave">
              <Typography variant="caption" color="text.secondary">
                0000-00-00 00:00:00
              </Typography>
            </Skeleton>

            <Tooltip title="更多選項" arrow>
              <span>
                <IconButton size="small" disabled>
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
          </Box>
        </Box>

        <Skeleton variant="rounded" animation="wave">
          <Typography variant="body2" sx={{ mt: 0.5, whiteSpace: "pre-line" }}>
            佔位文字，佔位文字，佔位文字，佔位文字，佔位文字，佔位文字，
          </Typography>
        </Skeleton>

        <Box sx={{ display: "flex", alignItems: "center", mt: 1, gap: 1 }}>
          <Button size="small" startIcon={<ThumbUpRoundedIcon />} sx={{ color: "text.secondary" }} loading>
            <Typography variant="caption">{"讚"}</Typography>
          </Button>

          <Button size="small" startIcon={<ReplyRoundedIcon />} sx={{ color: "text.secondary" }} loading>
            <Typography variant="caption">回覆</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  </Box>
);

export { Comment, LoadingComment };
