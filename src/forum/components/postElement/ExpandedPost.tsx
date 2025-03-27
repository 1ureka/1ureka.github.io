import { Box, Button, ButtonBase, Chip, Divider, Skeleton, Stack, Tooltip, Typography } from "@mui/material";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";

import { LikeButton } from "./shared/LikeButton";
import { FavButton } from "./shared/FavButton";
import { TopicTags } from "./shared/TopicTags";
import { LoadingPostHeader, PostHeader } from "./shared/PostHeader";
import { usePostById } from "@/forum/hooks/post";
import { routes } from "@/routes";

const ExpandedLoadingPost = () => {
  return (
    <>
      <Box sx={{ p: 1.5, cursor: "pointer", "&:hover": { bgcolor: "action.hover" } }}>
        <LoadingPostHeader />

        <Skeleton variant="rounded" animation="wave">
          <Typography variant="h6" component="h3" sx={{ textAlign: "start" }}>
            正在載入標題...
          </Typography>
        </Skeleton>

        <Skeleton variant="text" sx={{ width: 0.8 }} animation="wave" />
        <Skeleton variant="text" sx={{ width: 0.7 }} animation="wave" />
        <Skeleton variant="text" sx={{ width: 0.2 }} animation="wave" />

        <Box sx={{ display: "flex", gap: 1.5, mt: 2 }}>
          {new Array(3).fill(null).map((_, i) => (
            <Skeleton key={i} variant="rounded" animation="wave">
              <Chip label="loading..." size="small" />
            </Skeleton>
          ))}
        </Box>
      </Box>

      <Divider flexItem />

      <Box
        sx={{
          p: 1.5,
          py: 1,
          display: "flex",
          gap: 1.5,
          alignItems: "center",
          position: "relative",
          color: "text.secondary",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ position: "absolute", inset: 0, bgcolor: "divider", opacity: 0.35 }} />

        <Button color="inherit" startIcon={<ThumbUpRoundedIcon />} size="small" loading={true}>
          <Typography variant="caption" component="span">
            100 個讚
          </Typography>
        </Button>

        <Button color="inherit" startIcon={<CommentRoundedIcon />} size="small" loading={true}>
          <Typography variant="caption" component="span">
            100 則回覆
          </Typography>
        </Button>

        <Box sx={{ flex: 1 }} />

        <Button color="inherit" startIcon={<VisibilityRoundedIcon />} size="small" loading={true}>
          <Typography variant="caption" component="span">
            1000 次瀏覽
          </Typography>
        </Button>
      </Box>

      <Divider flexItem />
    </>
  );
};

const ExpandedPost = ({ postId }: { postId: number }) => {
  const { data: post, isFetching } = usePostById({ postId });

  if (isFetching || !post) {
    return <ExpandedLoadingPost />;
  }

  const handleNavigateToPost = () => {
    window.location.href = `${routes.forum_post}?postId=${post.id}`;
  };

  return (
    <>
      <Box sx={{ p: 1.5, cursor: "pointer", "&:hover": { bgcolor: "action.hover" } }} onClick={handleNavigateToPost}>
        <PostHeader post={post} />

        <Stack sx={{ gap: 1.5, flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                textAlign: "start",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {post.title}
            </Typography>

            <Typography
              variant="body2"
              component="p"
              sx={{
                color: "text.secondary",
                textAlign: "start",
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "pre-line",
              }}
            >
              {post.content}
            </Typography>
          </Box>

          {post.photos && post.photos.length > 0 && (
            <Box
              sx={{
                flex: 0.5,
                display: "flex",
                gap: 1,
                mt: 1,
                flexWrap: "wrap",
                justifyContent: { xs: "flex-start", md: "flex-end" },
              }}
            >
              {post.photos.slice(0, 3).map(({ name, url }, i) => (
                <Tooltip title="查看圖片" key={`${url}${i}`} arrow placement="top">
                  <ButtonBase
                    sx={{
                      position: "relative",
                      width: 100,
                      height: 100,
                      bgcolor: "divider",
                      borderRadius: 1,
                      overflow: "hidden",
                    }}
                  >
                    {/* <img src={""} style={{ display: "block", position: "absolute", inset: 0 }} /> */}

                    <Box
                      sx={{ position: "absolute", inset: "auto 0 0 0", pb: 1, display: "grid", placeItems: "center" }}
                    >
                      <Box sx={{ maxWidth: 90 }}>
                        <Chip label={name} size="small" />
                      </Box>
                    </Box>
                  </ButtonBase>

                  {/* TODO: 用於顯示圖片的 dialog */}
                </Tooltip>
              ))}
              {post.photos.length > 3 && (
                <Tooltip title="查看更多圖片" arrow placement="top">
                  <Button
                    color="inherit"
                    sx={{ position: "relative", width: 100, height: 100, bgcolor: "divider", borderRadius: 1 }}
                  >
                    +{post.photos.length - 3}
                  </Button>
                </Tooltip>
              )}
            </Box>
          )}
        </Stack>

        <Stack
          sx={{
            gap: 1.5,
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "flex-end" },
            mt: 1,
          }}
        >
          <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
            <TopicTags post={post} displayCount={5} />
          </Box>

          {post.attachments && post.attachments.length > 0 && (
            <Box
              sx={{ display: "flex", gap: 1, flexWrap: "wrap", justifyContent: { xs: "flex-start", md: "flex-end" } }}
            >
              {post.attachments.slice(0, 3).map((file, index) => (
                <Tooltip title="下載附件" key={index} arrow placement="top">
                  <Chip
                    label={`${file.name} (${(file.size / 1024).toFixed(1)}KB)`}
                    clickable
                    icon={<AttachFileRoundedIcon />}
                  />
                </Tooltip>
              ))}
              {post.attachments.length > 3 && (
                <Chip label={`+${post.attachments.length - 3}`} variant="outlined" clickable />
              )}
            </Box>
          )}
        </Stack>
      </Box>

      <Divider flexItem />

      <Box
        sx={{
          p: 1.5,
          py: 1,
          display: "flex",
          gap: 1.5,
          alignItems: "center",
          position: "relative",
          color: "text.secondary",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ position: "absolute", inset: 0, bgcolor: "divider", opacity: 0.35 }} />

        <LikeButton postId={post.id} likeCount={post.likeCount} />
        <FavButton postId={post.id} />

        <Button
          color="inherit"
          startIcon={<CommentRoundedIcon />}
          size="small"
          href={`${routes.forum_post}?postId=${post.id}`}
        >
          <Typography variant="caption" component="span">
            {post.commentCount} 則回覆
          </Typography>
        </Button>

        <Box sx={{ flex: 1 }} />

        <Button
          startIcon={<VisibilityRoundedIcon />}
          disabled
          size="small"
          sx={{ "button&.Mui-disabled": { color: "text.secondary", opacity: 0.8 } }}
        >
          <Typography variant="caption" component="span">
            {post.viewCount} 次瀏覽
          </Typography>
        </Button>
      </Box>

      <Divider flexItem />
    </>
  );
};

export { ExpandedPost, ExpandedLoadingPost };
