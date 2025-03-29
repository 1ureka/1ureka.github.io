import { useCommentLikeButton } from "@/forum/hooks/commentInteraction";
import { Button, Typography } from "@mui/material";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";

const CommentLikeButton = ({ commentId, likeCount: fallback }: { commentId: number; likeCount: number }) => {
  const { liked, likeCount, handleLike, disabled, loading } = useCommentLikeButton(commentId);

  return (
    <Button
      size="small"
      startIcon={<ThumbUpRoundedIcon />}
      onClick={handleLike}
      color={liked ? "primary" : "inherit"}
      sx={{ color: liked ? undefined : "text.secondary" }}
      disabled={disabled}
      loading={loading}
    >
      <Typography variant="caption">{likeCount !== null ? (likeCount > 0 ? likeCount : "讚") : fallback}</Typography>
    </Button>
  );
};

export { CommentLikeButton };
