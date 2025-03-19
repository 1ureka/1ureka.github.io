import { Box, Container, CssBaseline, Divider, Paper, Stack, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";

import { posts } from "@/forum/utils/test";
import "@/forum/app.css";

import { Toaster } from "@/forum/components/Toast";
import { AppbarDesktop } from "@/forum/components/AppbarDesktop";
import { AppbarMobile } from "@/forum/components/AppbarMobile";
import { ScrollArea } from "@/forum/components/ScrollArea";
import { theme, useResponsiveFontSize } from "@/forum/utils/theme";
import { ExpandedPost } from "@/forum/components/ExpandedPost";
import { OrderTabs } from "@/forum/components/OrderTabs";
import { TopicSelect } from "@/forum/components/TopicSelect";

function App() {
  const { isMd } = useResponsiveFontSize();
  const urlParams = new URLSearchParams(window.location.search);
  const filterdPosts = posts.filter((post) =>
    urlParams.has("topic") ? post.tags.includes(urlParams.get("topic")!) : true
  );

  return (
    <ThemeProvider theme={theme}>
      <title>{urlParams.has("topic") ? `論壇樣板 | 貼文 #${urlParams.get("topic")}` : "論壇樣板 | 貼文"}</title>
      <CssBaseline />
      <Toaster />

      <Box sx={{ bgcolor: "secondary.main", height: "35vh", position: "absolute", inset: "0 0 auto 0" }} />

      <ScrollArea>
        {isMd ? <AppbarDesktop /> : <AppbarMobile />}

        <Container maxWidth="lg" sx={{ position: "relative", my: 10 }}>
          <Paper sx={{ py: 3, borderRadius: 3, border: "1px solid", borderColor: "divider" }} elevation={1}>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center", px: { xs: 3, md: 5 } }}>
              <PeopleRoundedIcon
                className="mode-light"
                sx={{
                  fontSize: 48,
                  mr: 1,
                  bgcolor: "primary.main",
                  borderRadius: 1,
                  color: "background.default",
                  p: 1,
                  opacity: 0.8,
                }}
              />
              <Typography variant="h5" component="h2">
                貼文列表
              </Typography>

              <TopicSelect />

              <Box sx={{ flex: 1 }} />

              <Typography variant="body2" component="span" sx={{ color: "text.secondary" }}>
                共 {filterdPosts.length} 篇
              </Typography>
            </Box>

            <Divider sx={{ mt: 2 }} />

            <Box sx={{ position: "relative", px: { xs: 1, sm: 2, md: 5 } }}>
              <Box sx={{ position: "absolute", inset: 0, bgcolor: "divider", opacity: 0.35 }} />
              <OrderTabs />
            </Box>

            <Divider />

            <Stack sx={{ alignItems: "stretch", mb: 1.5 }}>
              {filterdPosts.map((post) => (
                <ExpandedPost key={post.id} post={post} />
              ))}
              {filterdPosts.length === 0 && (
                <Typography variant="body1" component="p" sx={{ color: "text.secondary", textAlign: "center", mt: 3 }}>
                  沒有符合條件的貼文
                </Typography>
              )}
            </Stack>
          </Paper>
        </Container>
      </ScrollArea>
    </ThemeProvider>
  );
}

export default App;
