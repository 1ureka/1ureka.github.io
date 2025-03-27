import { Box, Button, ButtonBase, Chip, CircularProgress } from "@mui/material";
import { Divider, Skeleton, Stack, Tooltip, Typography } from "@mui/material";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import BookmarkAddRoundedIcon from "@mui/icons-material/BookmarkAddRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import SellIcon from "@mui/icons-material/Sell";

import { LoadingPostHeader, PostHeader } from "./shared/PostHeader";
import { TopicTags } from "./shared/TopicTags";
import { LikeButton } from "./shared/LikeButton";
import { FavButton } from "./shared/FavButton";
import type { FetchPostByIdResult } from "@/forum/data/post";

// 用於生成載入中的貼文內容 (每個lenght長度是0~1)
const randomLengthArray = (length: number) => Array.from({ length }, () => Math.random() * 0.7 + 0.3);

const LoadingFullPost = () => (
  <Box sx={{ pt: 1.5 }}>
    <Divider />

    <Box sx={{ position: "relative", py: 1.5, height: "fit-content" }}>
      <Box sx={{ position: "absolute", inset: 0, bgcolor: "divider", opacity: 0.35, pointerEvents: "none" }} />
      <Box sx={{ px: 2.5 }}>
        <LoadingPostHeader sx={{ m: 0 }} />
      </Box>
    </Box>

    <Divider sx={{ mb: 2.5 }} />

    <Box sx={{ px: 2.5, position: "relative" }}>
      <Skeleton variant="rounded" animation="wave" sx={{ mb: 1 }}>
        <Typography variant="h4" component="h2" sx={{ textAlign: "start" }} gutterBottom>
          正在載入標題... 正在載入
        </Typography>
      </Skeleton>

      {randomLengthArray(4).map((width, i) => (
        <Skeleton key={i} variant="text" animation="wave" width={`${width * 100}%`} />
      ))}

      <CircularProgress sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
    </Box>

    <Divider sx={{ mt: 2.5 }} />

    <Box
      sx={{
        p: 1.5,
        py: 1,
        display: "flex",
        gap: 1.5,
        alignItems: "center",
        position: "relative",
        color: "text.secondary",
      }}
    >
      <Box sx={{ position: "absolute", inset: 0, bgcolor: "divider", opacity: 0.35 }} />

      <Button color="inherit" startIcon={<ThumbUpRoundedIcon />} size="small" loading={true}>
        <Typography variant="caption" component="span">
          100 個讚
        </Typography>
      </Button>

      <Button color="inherit" startIcon={<BookmarkAddRoundedIcon />} size="small" loading={true}>
        <Typography variant="caption" component="span">
          收藏該貼文
        </Typography>
      </Button>

      <Box sx={{ flex: 1 }} />

      <Button color="inherit" startIcon={<VisibilityRoundedIcon />} size="small" loading={true}>
        <Typography variant="caption" component="span">
          1000 次瀏覽
        </Typography>
      </Button>
    </Box>

    <Divider />
  </Box>
);

const FullPost = ({ post }: { post: FetchPostByIdResult }) => (
  <Box sx={{ pt: 1.5 }}>
    <title>{`論壇樣板 | ${post.title}`}</title>
    <Divider />

    <Box sx={{ position: "relative", py: 1.5, height: "fit-content" }}>
      <Box sx={{ position: "absolute", inset: 0, bgcolor: "divider", opacity: 0.35, pointerEvents: "none" }} />
      <Box sx={{ px: 2.5 }}>
        <PostHeader post={post} sx={{ m: 0 }} />
      </Box>
    </Box>

    <Divider sx={{ mb: 2.5 }} />

    <Box sx={{ px: 2.5 }}>
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
                  <Box sx={{ maxWidth: 150 }}>
                    <Chip label={name} size="small" />
                  </Box>
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

    <Divider sx={{ mt: 2.5 }} />

    <Box
      sx={{
        px: 2.5,
        py: 1,
        display: "flex",
        gap: 1.5,
        alignItems: "center",
        position: "relative",
        color: "text.secondary",
      }}
    >
      <Box sx={{ position: "absolute", inset: 0, bgcolor: "divider", opacity: 0.35 }} />

      <LikeButton postId={post.id} />
      <FavButton postId={post.id} />

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
  </Box>
);

export { FullPost, LoadingFullPost };
