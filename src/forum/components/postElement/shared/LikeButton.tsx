import { Button, Tooltip, Typography } from "@mui/material";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import { usePostLikeButton } from "@/forum/hooks/postInteraction";

const LikeButton = ({ postId }: { postId: number }) => {
  const { isLiked, likeCount, handleLike, loading, disabled } = usePostLikeButton(postId);

  return (
    <Tooltip title={isLiked ? "取消喜歡" : "喜歡"} arrow placement="left">
      <span>
        <Button
          startIcon={<ThumbUpRoundedIcon />}
          size="small"
          color={isLiked ? "primary" : "inherit"}
          onClick={handleLike}
          disabled={disabled}
          loading={loading}
        >
          <Typography variant="caption" component="span">
            {`${likeCount} 個讚`}
          </Typography>
        </Button>
      </span>
    </Tooltip>
  );
};

export { LikeButton };
