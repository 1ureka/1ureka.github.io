import { Button, Typography, useMediaQuery } from "@mui/material";
import BookmarkAddRoundedIcon from "@mui/icons-material/BookmarkAddRounded";
import BookmarkRemoveRoundedIcon from "@mui/icons-material/BookmarkRemoveRounded";
import { usePostFavButton } from "@/forum/hooks/postInteraction";

const FavButton = ({ postId }: { postId: number }) => {
  const isSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { isFavorited, handleFavorite, disabled } = usePostFavButton(postId);

  return (
    <Button
      color={isFavorited ? "primary" : "inherit"}
      startIcon={isFavorited ? <BookmarkRemoveRoundedIcon /> : <BookmarkAddRoundedIcon />}
      size="small"
      onClick={handleFavorite}
      disabled={disabled}
    >
      <Typography variant="caption" component="span">
        {isSm ? (isFavorited ? "取消" : "收藏") : isFavorited ? "取消收藏" : "收藏該貼文"}
      </Typography>
    </Button>
  );
};

const FavTextButton = ({ postId }: { postId: number }) => {
  const { isFavorited, handleFavorite, disabled, loading } = usePostFavButton(postId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleFavorite();
  };

  return (
    <Button
      size="small"
      color="inherit"
      startIcon={isFavorited ? <BookmarkRemoveRoundedIcon /> : <BookmarkAddRoundedIcon />}
      onClick={handleClick}
      disabled={disabled}
      loading={loading}
      variant={isFavorited ? "text" : "outlined"}
    >
      {isFavorited ? "取消收藏" : "收藏該貼文"}
    </Button>
  );
};

export { FavButton, FavTextButton };
