import { usePostById } from "@/forum/hooks/post";
import { Button, Typography } from "@mui/material";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";

const buttonTypoSx = {
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
} as const;

const PrevPostNav = ({ currentPostId }: { currentPostId: number }) => {
  const { data: post, isFetching } = usePostById(currentPostId - 1);

  if (isFetching && !post) {
    return (
      <Button startIcon={<ArrowLeftRoundedIcon />} loading>
        <Typography variant="button" sx={buttonTypoSx}>
          載入中...
        </Typography>
      </Button>
    );
  }

  if (!post) {
    return (
      <Button startIcon={<ArrowLeftRoundedIcon />} disabled>
        <Typography variant="button" sx={buttonTypoSx}>
          沒有上一篇了
        </Typography>
      </Button>
    );
  }

  return (
    <Button startIcon={<ArrowLeftRoundedIcon />} href={`/src/forum/pages/post/index.html?postId=${post.id}`}>
      <Typography variant="button" sx={buttonTypoSx}>
        上一篇：{post.title}
      </Typography>
    </Button>
  );
};

const NextPostNav = ({ currentPostId }: { currentPostId: number }) => {
  const { data: post, isFetching } = usePostById(currentPostId + 1);

  if (isFetching && !post) {
    return (
      <Button endIcon={<ArrowRightRoundedIcon />} loading>
        <Typography variant="button" sx={buttonTypoSx}>
          載入中...
        </Typography>
      </Button>
    );
  }

  if (!post) {
    return (
      <Button endIcon={<ArrowRightRoundedIcon />} disabled>
        <Typography variant="button" sx={buttonTypoSx}>
          沒有下一篇了
        </Typography>
      </Button>
    );
  }

  return (
    <Button endIcon={<ArrowRightRoundedIcon />} href={`/src/forum/pages/post/index.html?postId=${post.id}`}>
      <Typography variant="button" sx={buttonTypoSx}>
        下一篇：{post.title}
      </Typography>
    </Button>
  );
};

export { PrevPostNav, NextPostNav };
