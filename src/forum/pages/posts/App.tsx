import { Box, Container, CssBaseline, Divider, Paper, Stack } from "@mui/material";
import { ThemeProvider } from "@mui/material";

import { posts } from "@/forum/utils/test";
import "@/forum/app.css";

import { Toaster } from "@/forum/components/Toast";
import { AppbarDesktop } from "@/forum/components/AppbarDesktop";
import { AppbarMobile } from "@/forum/components/AppbarMobile";
import { ScrollArea } from "@/forum/components/ScrollArea";
import { theme, useResponsiveFontSize } from "@/forum/utils/theme";
import { ExpandedPost } from "@/forum/components/ExpandedPost";
import { OrderTabs } from "@/forum/components/OrderTabs";

function App() {
  const { isMd } = useResponsiveFontSize();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster />

      <Box sx={{ bgcolor: "secondary.main", height: "35vh", position: "absolute", inset: "0 0 auto 0" }} />

      <ScrollArea>
        {isMd ? <AppbarDesktop /> : <AppbarMobile />}

        <Container maxWidth="lg" sx={{ position: "relative", my: 10 }}>
          <Paper sx={{ py: 3, borderRadius: 3, border: "1px solid", borderColor: "divider" }} elevation={1}>
            <Box sx={{ position: "relative", px: { xs: 1, sm: 2, md: 4 } }}>
              <Box sx={{ position: "absolute", inset: 0, bgcolor: "divider", opacity: 0.35 }} />
              <OrderTabs />
            </Box>

            <Divider />

            <Stack sx={{ alignItems: "stretch", mb: 1.5 }}>
              {posts.map((post) => (
                <ExpandedPost key={post.id} post={post} />
              ))}
            </Stack>
          </Paper>
        </Container>
      </ScrollArea>
    </ThemeProvider>
  );
}

export default App;
