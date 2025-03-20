import { Avatar, Box, Button, ButtonBase, Chip, Divider, Stack, Tooltip, Typography } from "@mui/material";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";

import type { Post } from "../utils/test";
import { PostLike } from "./PostLike";

const ExpandedPost = ({ post }: { post: Post }) => {
  return (
    <>
      <Box sx={{ p: 1.5, cursor: "pointer", "&:hover": { bgcolor: "action.hover" } }}>
        <Box sx={{ display: "flex", gap: 1.5, mb: 2, alignItems: "center" }}>
          <Avatar sx={{ bgcolor: "primary.main", width: "2rem", height: "2rem" }}>
            {post.author.slice(0, 1).toUpperCase()}
          </Avatar>
          <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
            by {post.author}
          </Typography>
          <Box sx={{ flex: 1 }} />
          <Typography variant="body2" sx={{ color: "text.secondary", opacity: 0.9 }}>
            {post.createdAt.toLocaleString()}
          </Typography>
        </Box>

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
                      <Chip label={name} size="small" />
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
            {post.tags.map(
              (tag, i) =>
                i < 5 && (
                  <Chip
                    key={tag}
                    label={tag}
                    clickable
                    size="small"
                    component="a"
                    href={`/src/forum/pages/posts/index.html?topic=${tag}`}
                  />
                )
            )}
            {post.tags.length > 5 && (
              <Chip
                label={`+${post.tags.length - 5}`}
                clickable
                size="small"
                variant="outlined"
                component="a"
                href={`/src/forum/pages/post/index.html?postId=${post.id}`}
              />
            )}
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
        }}
      >
        <Box sx={{ position: "absolute", inset: 0, bgcolor: "divider", opacity: 0.35 }} />

        <PostLike postId={post.id} />

        <Button color="inherit" startIcon={<CommentRoundedIcon />} size="small">
          <Typography variant="caption" component="span">
            {post.replyCount} 則回覆
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

export { ExpandedPost };
