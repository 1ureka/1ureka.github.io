import { Button, Divider, Skeleton, Stack, Typography } from "@mui/material";
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
import { usePostById, usePosts } from "@/forum/hooks/post";

const LoadingDisplay = () => {
  return (
    <>
      <Skeleton variant="rounded" animation="wave">
        <Typography variant="subtitle1" component="h3">
          正在載入...
        </Typography>
      </Skeleton>
      <Skeleton variant="rounded" animation="wave">
        <Typography
          variant="body2"
          component="p"
          sx={{ color: "text.secondary", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
        >
          正在載入內容中. . .
        </Typography>
      </Skeleton>
      <Button endIcon={<ArrowRightAltRoundedIcon />} sx={{ width: "fit-content" }} loading={true}>
        查看更多
      </Button>
    </>
  );
};

const PostDisplay = ({ postId }: { postId: number }) => {
  const { data: post, isFetching } = usePostById(postId);

  if (isFetching || !post) {
    return <LoadingDisplay />;
  }

  return (
    <>
      <Typography variant="subtitle1" component="h3">
        {post.title}
      </Typography>
      <Typography
        variant="body2"
        component="p"
        sx={{ color: "text.secondary", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
      >
        {post.content}
      </Typography>
      <Button
        endIcon={<ArrowRightAltRoundedIcon />}
        sx={{ width: "fit-content" }}
        href={`/src/forum/pages/post/index.html?postId=${post.id}`}
      >
        查看更多
      </Button>
    </>
  );
};

const FeedHotSection = ({ length }: { length: number }) => {
  const { data, isFetching } = usePosts({ limit: length, order: "desc", orderBy: "viewCount" });

  return (
    <>
      <Typography variant="h6" component="h2" sx={{ mb: 1.5 }}>
        本週熱門討論 🔥
      </Typography>

      {isFetching || !data
        ? [...Array(length)].map((_, i) => (
            <Stack key={i} sx={{ gap: 0.5, my: i < 2 ? 1 : 0 }}>
              <LoadingDisplay />
              {i < 2 && <Divider />}
            </Stack>
          ))
        : data.map((postId, i) => (
            <Stack key={postId} sx={{ gap: 0.5, my: i < 2 ? 1 : 0 }}>
              <PostDisplay postId={postId} />
              {i < 2 && <Divider />}
            </Stack>
          ))}
    </>
  );
};

export { FeedHotSection };
