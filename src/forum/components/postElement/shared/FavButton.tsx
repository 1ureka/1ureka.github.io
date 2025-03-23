import { Button, Typography, useMediaQuery } from "@mui/material";
import BookmarkAddRoundedIcon from "@mui/icons-material/BookmarkAddRounded";
import { usePostFavButton } from "@/forum/hooks/postInteraction";

const FavButton = ({ postId }: { postId: number }) => {
  const isSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { isFavorited, handleFavorite, loading, disabled } = usePostFavButton(postId);

  return (
    <Button
      color={isFavorited ? "primary" : "inherit"}
      startIcon={<BookmarkAddRoundedIcon />}
      size="small"
      onClick={handleFavorite}
      disabled={disabled}
      loading={loading}
    >
      <Typography variant="caption" component="span">
        {isSm ? (isFavorited ? "取消" : "收藏") : isFavorited ? "取消收藏" : "收藏該貼文"}
      </Typography>
    </Button>
  );
};

export { FavButton };
