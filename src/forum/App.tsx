import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Divider,
  Paper,
  Stack,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import type { BoxProps } from "@mui/material";
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
import { Toaster } from "./Toast";
import "./app.css";
import { posts, authors } from "./test";
import { useEffect, useState } from "react";

import { AppbarDesktop } from "./components/AppbarDesktop";
import { AppbarMobile } from "./components/AppbarMobile";
import { NewPost } from "./components/NewPost";
import { CollapsedPost } from "./components/CollapsedPost";
import { FeedDesktop } from "./components/FeedDesktop";
import { FeedMobile } from "./components/FeedMobile";

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
  spacing: "0.5rem",
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
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    if (isLg) document.documentElement.style.fontSize = "16px";
    else if (isMd) document.documentElement.style.fontSize = "14px";
    else if (isSm) document.documentElement.style.fontSize = "13px";
    else document.documentElement.style.fontSize = "13px";
  }, [isLg, isMd, isSm]);

  const top3Posts = posts.toSorted((a, b) => b.viewCount - a.viewCount).slice(0, 3);
  const tags = posts.flatMap((post) => post.tags).slice(0, 5);

  const [likes, setLikes] = useState(userLikes);

  return (
    <ThemeProvider theme={theme}>
      <title>論壇樣板</title>
      <CssBaseline />
      <Toaster />

      <Box sx={{ bgcolor: "secondary.main", height: "35vh", position: "absolute", inset: "0 0 auto 0" }} />

      <ScrollArea
        className="top"
        onScroll={(e) => {
          const target = e.target as HTMLElement;
          if (target.scrollTop < 25) target.classList.add("top");
          else target.classList.remove("top");
        }}
      >
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
            {isMd ? (
              <FeedDesktop top3Posts={top3Posts} tags={tags} authors={authors} />
            ) : (
              <FeedMobile top3Posts={top3Posts} tags={tags} authors={authors.slice(0, 3)} />
            )}
          </Stack>
        </Container>
      </ScrollArea>
    </ThemeProvider>
  );
}

export default App;
