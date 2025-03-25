import { Box, Button, Container, Divider, Paper, Stack } from "@mui/material";
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";

import "./app.css";
import { AppWrapper } from "./components/AppWrapper";
import { AppbarDesktop } from "./components/appbar/AppbarDesktop";
import { AppbarMobile } from "./components/appbar/AppbarMobile";
import { ScrollArea } from "./components/ScrollArea";
import { AppFooter } from "@/forum/components/appbar/AppFooter";

import { routes } from "./utils/routes";
import { useResponsiveFontSize } from "./utils/theme";
import { NewPost } from "./components/postElement/NewPost";
import { FeedDesktop } from "./components/home/FeedDesktop";
import { FeedMobile } from "./components/home/FeedMobile";
import { PostList } from "./components/home/PostList";

function App() {
  const { isMd } = useResponsiveFontSize();

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

              <PostList />

              <Box sx={{ mx: 1.5 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  href={routes.posts}
                  endIcon={<ArrowRightAltRoundedIcon />}
                >
                  查看更多
                </Button>
              </Box>
            </Paper>
          </Box>

          <Stack sx={{ gap: { xs: 1, md: 4 }, maxWidth: { xs: 1, md: 400 }, width: { xs: 1, md: "30vw" } }}>
            {isMd ? <FeedDesktop /> : <FeedMobile />}
          </Stack>
        </Container>

        <AppFooter />
      </ScrollArea>
    </AppWrapper>
  );
}

export default App;
