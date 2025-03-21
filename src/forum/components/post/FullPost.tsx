import { Box, ButtonBase, Chip, CircularProgress, Divider, Stack, Tooltip, Typography } from "@mui/material";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import SellIcon from "@mui/icons-material/Sell";

import { usePostById } from "@/forum/hooks/post";
import { PostHeader } from "./PostHeader";
import { TopicTags } from "./TopicTags";

const FullPost = ({ postId }: { postId: number }) => {
  const { data: post, isFetching } = usePostById(postId);

  if (isFetching && !post) {
    return <CircularProgress />;
  }

  if (!post) {
    return (
      <Box sx={{ py: 1.5 }}>
        <Divider />
        <Typography variant="body1" component="p" sx={{ color: "text.secondary", textAlign: "center", mt: 6 }}>
          找不到該貼文
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 1.5 }}>
      <title>{`論壇樣板 | ${post.title}`}</title>
      <Divider />

      <Box sx={{ position: "relative", py: 1.5, height: "fit-content" }}>
        <Box sx={{ position: "absolute", inset: 0, bgcolor: "divider", opacity: 0.35, pointerEvents: "none" }} />
        <Box sx={{ px: 2.5 }}>
          <PostHeader post={post} sx={{ m: 0 }} />
        </Box>
      </Box>

      <Divider />

      <Box sx={{ px: 2.5, mt: 2 }}>
        <Typography variant="h4" component="h2" sx={{ textAlign: "start" }} gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body2" component="p" sx={{ whiteSpace: "pre-line" }}>
          {post.content}
        </Typography>

        {post.photos && post.photos.length > 0 && (
          <Box sx={{ display: "grid", gap: 1, mt: 2, gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))" }}>
            {post.photos.map(({ name, url }, i) => (
              <Tooltip title="查看圖片" key={`${url}${i}`} arrow placement="top">
                <ButtonBase
                  sx={{
                    position: "relative",
                    aspectRatio: "1 / 1",
                    bgcolor: "divider",
                    borderRadius: 1,
                    overflow: "hidden",
                  }}
                >
                  {/* <img src={""} style={{ display: "block", position: "absolute", inset: 0 }} /> */}

                  <Box sx={{ position: "absolute", inset: "auto 0 0 0", pb: 1, display: "grid", placeItems: "center" }}>
                    <Chip label={name} size="small" />
                  </Box>
                </ButtonBase>

                {/* TODO: 用於顯示圖片的 dialog */}
              </Tooltip>
            ))}
          </Box>
        )}

        <Stack
          sx={{
            gap: 1.5,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap-reverse",
            mt: 2,
          }}
        >
          <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", alignItems: "center" }}>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary", display: "flex", alignItems: "center", gap: 0.5 }}
            >
              <SellIcon fontSize="small" />
              標籤：
            </Typography>
            <TopicTags post={post} displayCount={99} />
          </Box>

          {post.attachments && post.attachments.length > 0 && (
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center" }}>
              <Typography
                variant="subtitle2"
                sx={{ color: "text.secondary", display: "flex", alignItems: "center", gap: 0.5 }}
              >
                <AttachFileRoundedIcon fontSize="small" />
                附件：
              </Typography>
              {post.attachments.map((file, index) => (
                <Tooltip title="下載附件" key={index} arrow placement="top">
                  <Chip
                    label={`${file.name} (${(file.size / 1024).toFixed(1)}KB)`}
                    clickable
                    icon={<AttachFileRoundedIcon fontSize="small" />}
                  />
                </Tooltip>
              ))}
            </Box>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

const Comment = ({ postId }: { postId: number }) => {
  return <div></div>;
};

export { FullPost as Post, Comment };
