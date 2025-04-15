import { Box, Button, Container, Divider, Paper, Stack } from "@mui/material";
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";

import { AppWrapper } from "@/forum/components/AppWrapper";
import { AppBackground } from "../components/AppBackground";
import { AppbarDesktop } from "@/forum/components/appbar/AppbarDesktop";
import { AppbarMobile } from "@/forum/components/appbar/AppbarMobile";
import { ScrollArea } from "@/forum/components/ScrollArea";
import { AppFooter } from "@/forum/components/appbar/AppFooter";

import { routes } from "@/routes";
import { useResponsiveFontSize } from "@/forum/utils/theme";
import { NewPost } from "@/forum/components/postElement/NewPost";
import { FeedDesktop } from "@/forum/components/home/FeedDesktop";
import { FeedMobile } from "@/forum/components/home/FeedMobile";
import { PostList } from "@/forum/components/home/PostList";

function App() {
  const { isMd } = useResponsiveFontSize();

  return (
    <AppWrapper>
      <AppBackground />

      <ScrollArea>
        {isMd ? <AppbarDesktop /> : <AppbarMobile />}

        <Container
          maxWidth={false}
          sx={{
            position: "relative",
            my: 10,
            display: "flex",
            gap: 4,
            maxWidth: 1400,
            flexDirection: { xs: "column-reverse", md: "row" },
            px: 0,
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
                  href={`${routes.forum_posts}?followPrior=true&orderBy=createdAt&orderDesc=true`}
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
