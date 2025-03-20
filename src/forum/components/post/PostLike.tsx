import { Button, Tooltip, Typography } from "@mui/material";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import { usePostLike } from "@/forum/hooks/interaction";

const PostLike = ({ postId }: { postId: number }) => {
  const { isLiked, liked, handleLike, likeButtonDisabled, likeButtonLoading, likeButtonError } = usePostLike(postId);

  return (
    <Tooltip title={isLiked ? "取消喜歡" : "喜歡"} arrow placement="left">
      <span>
        <Button
          startIcon={<ThumbUpRoundedIcon />}
          size="small"
          color={isLiked ? "primary" : "inherit"}
          onClick={handleLike}
          disabled={likeButtonDisabled || likeButtonLoading || Boolean(likeButtonError)}
          loading={likeButtonLoading}
        >
          <Typography variant="caption" component="span">
            {likeButtonError ? "錯誤" : `${liked} 個讚`}
          </Typography>
        </Button>
      </span>
    </Tooltip>
  );
};

export { PostLike };
