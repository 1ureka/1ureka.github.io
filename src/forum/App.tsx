import { Box, Button, Container, Divider, Paper, Stack } from "@mui/material";
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";

import "./app.css";
import { AppWrapper } from "./components/AppWrapper";
import { AppbarDesktop } from "./components/appbar/AppbarDesktop";
import { AppbarMobile } from "./components/appbar/AppbarMobile";
import { NewPost } from "./components/NewPost";
import { CollapsedPost } from "./components/CollapsedPost";
import { FeedDesktop } from "./components/FeedDesktop";
import { FeedMobile } from "./components/FeedMobile";
import { ScrollArea } from "./components/ScrollArea";
import { posts, authors } from "./utils/test";
import { useResponsiveFontSize } from "./utils/theme";

function App() {
  const { isMd } = useResponsiveFontSize();

  const top3Posts = posts.toSorted((a, b) => b.viewCount - a.viewCount).slice(0, 3);
  const tags = posts.flatMap((post) => post.tags).slice(0, 5);

  return (
    <AppWrapper>
      <Box sx={{ bgcolor: "secondary.main", height: "35vh", position: "absolute", inset: "0 0 auto 0" }} />

      <ScrollArea>
        {isMd ? <AppbarDesktop /> : <AppbarMobile />}

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
              <NewPost />

              <Divider />

              <Stack sx={{ alignItems: "stretch", mb: 1.5 }}>
                {posts.slice(0, 5).map((post) => (
                  <CollapsedPost key={post.id} post={post} />
                ))}
              </Stack>

              <Box sx={{ mx: 1.5 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  href="/src/forum/pages/posts/index.html"
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
    </AppWrapper>
  );
}

export default App;
