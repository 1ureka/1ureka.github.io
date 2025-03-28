import { Button, Tooltip, Typography } from "@mui/material";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import { usePostLikeButton } from "@/forum/hooks/postInteraction";

const LikeButton = ({ postId, likeCount: fallback }: { postId: number; likeCount: number }) => {
  const { liked, likeCount, handleLike, disabled } = usePostLikeButton(postId);

  return (
    <Tooltip title={liked ? "取消喜歡" : "喜歡"} arrow placement="left">
      <span>
        <Button
          startIcon={<ThumbUpRoundedIcon />}
          size="small"
          color={liked ? "primary" : "inherit"}
          onClick={handleLike}
          disabled={disabled}
        >
          <Typography variant="caption" component="span">
            {likeCount ?? fallback} 個讚
          </Typography>
        </Button>
      </span>
    </Tooltip>
  );
};

export { LikeButton };
