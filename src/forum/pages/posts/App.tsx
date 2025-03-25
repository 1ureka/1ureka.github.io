import { Box, Button, Container, Divider, Paper, Stack, Typography } from "@mui/material";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

import "@/forum/app.css";
import { AppWrapper } from "@/forum/components/AppWrapper";
import { AppbarDesktop } from "@/forum/components/appbar/AppbarDesktop";
import { AppbarMobile } from "@/forum/components/appbar/AppbarMobile";
import { ScrollArea } from "@/forum/components/ScrollArea";

import { routes } from "@/forum/utils/routes";
import { useResponsiveFontSize } from "@/forum/utils/theme";
import { OrderTabs } from "@/forum/components/posts/OrderTabs";
import { TopicSelect } from "@/forum/components/posts/TopicSelect";
import { PageTitle, PostCounts, PostList } from "@/forum/components/posts/PostList";

function App() {
  const { isMd } = useResponsiveFontSize();

  return (
    <AppWrapper>
      <PageTitle />

      <Box sx={{ bgcolor: "secondary.main", height: "35vh", position: "absolute", inset: "0 0 auto 0" }} />

      <ScrollArea>
        {isMd ? <AppbarDesktop /> : <AppbarMobile />}

        <Container maxWidth="lg" sx={{ position: "relative", my: 10 }}>
          <Paper sx={{ py: 3, borderRadius: 3, border: "1px solid", borderColor: "divider" }} elevation={1}>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center", pr: { xs: 3, md: 5 }, pl: 2 }}>
              <Stack sx={{ alignItems: "flex-start", flex: 1 }}>
                <Button
                  href={routes.home}
                  startIcon={<ArrowBackIosRoundedIcon />}
                  variant="outlined"
                  sx={{ textWrap: "nowrap" }}
                >
                  {isMd ? "返回首頁" : "首頁"}
                </Button>
              </Stack>

              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
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
              </Box>

              <Stack sx={{ alignItems: "flex-end", flex: 1 }}>
                <PostCounts />
              </Stack>
            </Box>

            <Divider sx={{ mt: 2 }} />

            <Box sx={{ position: "relative", px: { xs: 1, sm: 2, md: 5 } }}>
              <Box sx={{ position: "absolute", inset: 0, bgcolor: "divider", opacity: 0.35 }} />
              <OrderTabs />
            </Box>

            <Divider />

            <PostList />
          </Paper>
        </Container>
      </ScrollArea>
    </AppWrapper>
  );
}

export default App;
