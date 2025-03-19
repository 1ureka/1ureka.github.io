import { Avatar, Box, Button, Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
import { Fragment } from "react";
import type { Author, Post } from "../utils/test";

// TODO: top3Posts 改為 hotPosts (由父組件決定數量)
// TODO: authors 改為由父組件決定數量
// TODO: tags 改為由父組件決定數量
const FeedMobile = ({ top3Posts, tags, authors }: { top3Posts: Post[]; tags: string[]; authors: Author[] }) => {
  return (
    <Paper sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }} elevation={1}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" component="h2" sx={{ mb: 1.5 }}>
          本週熱門討論 🔥
        </Typography>

        {top3Posts.map((post, i) => (
          <Stack key={post.id} sx={{ gap: 0.5, my: i < 2 ? 1 : 0 }}>
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
            <Button endIcon={<ArrowRightAltRoundedIcon />} href={`#${post.id}`} sx={{ width: "fit-content" }}>
              查看更多
            </Button>
            {i < 2 && <Divider />}
          </Stack>
        ))}
      </Box>

      <Divider />

      <Box sx={{ p: 3, position: "relative" }}>
        <Box sx={{ position: "absolute", inset: 0, bgcolor: "divider", opacity: 0.35 }} />

        <Typography variant="h6" component="h2">
          你可能會喜歡
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1, mt: 1 }}>
          {tags.map((tag) => (
            <Chip key={tag} label={tag} clickable />
          ))}
        </Box>

        <Button sx={{ mt: 1 }} endIcon={<ArrowRightAltRoundedIcon />}>
          更多主題
        </Button>
      </Box>

      <Divider />

      <Box sx={{ p: 3 }}>
        <Typography variant="h6" component="h2" sx={{ mb: 1.5 }}>
          推薦追蹤
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            alignItems: "center",
            gap: 2,
          }}
        >
          {authors.slice(0, 5).map(({ name, description }) => (
            <Fragment key={name}>
              <Avatar sx={{ bgcolor: "primary.main", width: "2rem", height: "2rem" }}>
                {name.slice(0, 1).toUpperCase()}
              </Avatar>
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    textWrap: "nowrap",
                    color: "text.primary",
                    cursor: "pointer",
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                  component="a"
                  href={`/src/forum/pages/users/index.html?user=${name}`}
                >
                  {name}
                </Typography>
                <Typography variant="body2" component="p" sx={{ color: "text.secondary" }}>
                  {description}
                </Typography>
              </Box>
              <Chip variant="outlined" label="追蹤" clickable />
            </Fragment>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export { FeedMobile };
