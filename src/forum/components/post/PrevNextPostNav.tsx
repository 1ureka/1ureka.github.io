import { usePostById } from "@/forum/hooks/post";
import { Button, Typography } from "@mui/material";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import { useUrl } from "@/forum/hooks/url";

const buttonTypoSx = {
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
} as const;

const PrevPostNav = () => {
  const { searchParams, updateSearchParams } = useUrl();
  const param = searchParams.get("postId");
  const postId = param && /^\d+$/.test(param) && Number(param) > 0 ? Number(param) : -1;
  const { data: post, isFetching } = usePostById(postId - 1);

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
    <Button
      startIcon={<ArrowLeftRoundedIcon />}
      onClick={() => updateSearchParams({ postId: (postId - 1).toString() })}
    >
      <Typography variant="button" sx={buttonTypoSx}>
        上一篇：{post.title}
      </Typography>
    </Button>
  );
};

const NextPostNav = () => {
  const { searchParams, updateSearchParams } = useUrl();
  const param = searchParams.get("postId");
  const postId = param && /^\d+$/.test(param) && Number(param) > 0 ? Number(param) : -1;
  const { data: post, isFetching } = usePostById(postId + 1);

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
    <Button endIcon={<ArrowRightRoundedIcon />} onClick={() => updateSearchParams({ postId: (postId + 1).toString() })}>
      <Typography variant="button" sx={buttonTypoSx}>
        下一篇：{post.title}
      </Typography>
    </Button>
  );
};

export { PrevPostNav, NextPostNav };
