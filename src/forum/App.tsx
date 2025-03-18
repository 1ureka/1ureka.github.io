import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  createTheme,
  CssBaseline,
  Divider,
  Paper,
  Stack,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import type { BoxProps } from "@mui/material";
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import { Toaster } from "./Toast";
import "./app.css";
import { posts, authors } from "./test";
import { Fragment, useEffect, useState } from "react";
import { AppbarDesktop } from "./components/AppbarDesktop";
import { AppbarMobile } from "./components/AppbarMobile";
import { NewPost } from "./components/NewPost";
import { CollapsedPost } from "./components/CollapsedPost";

const theme = createTheme({
  cssVariables: { colorSchemeSelector: ".mode-%s" },
  typography: {
    fontFamily: `"timemachine-wa", "NOTO SANS TC"`,
  },
  colorSchemes: {
    light: {
      palette: {
        text: { primary: "#000" },
        primary: { main: "#FF772E", contrastText: "#fff" },
        secondary: { main: "#075056" },
      },
    },
    dark: {
      palette: {
        primary: { main: "#FF772E", contrastText: "#fff" },
        secondary: { main: "#075056" },
        background: { default: "#222", paper: "#222" },
      },
    },
  },
});

const overflowSx: BoxProps["sx"] = {
  position: "relative",
  height: "100dvh",
  overflow: "auto",
  scrollbarWidth: "thin",
  scrollbarColor: "gray transparent",
};

/**
 * 滾動容器
 */
const ScrollArea = ({ children, ...props }: BoxProps) => (
  <Box sx={overflowSx} {...props}>
    {children}
  </Box>
);

const USER = "1ureka";
const userLikes = new Set<number>();
for (const post of posts) {
  if (Math.random() < 0.5) userLikes.add(post.id);
}

function App() {
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    if (isMd) document.documentElement.style.fontSize = "16px";
    else document.documentElement.style.fontSize = "14px";
  }, [isMd]);

  const top3Posts = posts.toSorted((a, b) => b.viewCount - a.viewCount).slice(0, 3);
  const tags = posts.flatMap((post) => post.tags).slice(0, 5);

  const [likes, setLikes] = useState(userLikes);

  return (
    <ThemeProvider theme={theme}>
      <title>論壇樣板</title>
      <CssBaseline />
      <Toaster />

      <Box sx={{ bgcolor: "secondary.main", height: "35vh", position: "absolute", inset: "0 0 auto 0" }} />

      <ScrollArea>
        {isMd ? <AppbarDesktop user={USER} /> : <AppbarMobile user={USER} />}

        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            my: 10,
            display: "flex",
            gap: 4,
            flexDirection: { xs: "column-reverse", md: "row" },
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Paper sx={{ py: 3, borderRadius: 3, border: "1px solid", borderColor: "divider" }} elevation={1}>
              <NewPost user={USER} />

              <Divider />

              <Stack sx={{ alignItems: "stretch", mb: 1.5 }}>
                {posts.slice(0, 5).map((post) => (
                  <CollapsedPost
                    key={post.id}
                    post={post}
                    like={likes.has(post.id)}
                    onLike={() => {
                      if (likes.has(post.id)) likes.delete(post.id);
                      else likes.add(post.id);
                      setLikes(new Set(likes));
                    }}
                  />
                ))}
              </Stack>

              <Box sx={{ mx: 1.5 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  href="/posts"
                  endIcon={<ArrowRightAltRoundedIcon />}
                >
                  查看更多
                </Button>
              </Box>
            </Paper>
          </Box>

          <Stack sx={{ gap: { xs: 1, md: 4 }, maxWidth: { xs: 1, md: 400 }, width: { xs: 1, md: "30vw" } }}>
            <Paper sx={{ p: 3, borderRadius: 3, border: "1px solid", borderColor: "divider" }} elevation={1}>
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
            </Paper>
            <Paper sx={{ p: 3, borderRadius: 3, border: "1px solid", borderColor: "divider" }} elevation={1}>
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
            </Paper>
            <Paper sx={{ p: 3, borderRadius: 3, border: "1px solid", borderColor: "divider" }} elevation={1}>
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
                      <Typography variant="subtitle1" sx={{ textWrap: "nowrap" }}>
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
            </Paper>
          </Stack>
        </Container>
      </ScrollArea>
    </ThemeProvider>
  );
}

export default App;
