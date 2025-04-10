import { Box, Button, Container, Paper, Stack, Typography, useMediaQuery } from "@mui/material";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import { AppWrapper } from "@/forum/components/AppWrapper";
import { AppBackground } from "@/forum/components/AppBackground";
import { AppbarDesktop } from "@/forum/components/appbar/AppbarDesktop";
import { AppbarMobile } from "@/forum/components/appbar/AppbarMobile";
import { ScrollArea } from "@/forum/components/ScrollArea";
import { AppFooter } from "@/forum/components/appbar/AppFooter";

import { routes } from "@/routes";
import { theme, useResponsiveFontSize } from "@/forum/utils/theme";
import { SearchForm } from "@/forum/components/search/SearchForm";
import { PostCounts, PostList } from "@/forum/components/search/PostList";
import { OrderTabs } from "@/forum/components/search/OrderTabs";

const Header = () => {
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      {isSm && (
        <Stack sx={{ alignItems: "flex-start", flex: 1 }}>
          <Button
            href={routes.forum_home}
            startIcon={<ArrowBackIosRoundedIcon />}
            variant="outlined"
            sx={{ textWrap: "nowrap" }}
          >
            {isMd ? "返回首頁" : "首頁"}
          </Button>
        </Stack>
      )}

      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <SearchRoundedIcon
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
          搜尋結果
        </Typography>
      </Box>

      <Stack sx={{ alignItems: "flex-end", flex: 1 }}>
        <PostCounts />
      </Stack>
    </>
  );
};

function App() {
  const { isMd } = useResponsiveFontSize();

  return (
    <AppWrapper>
      {" "}
      <AppBackground />
      <ScrollArea>
        {isMd ? <AppbarDesktop /> : <AppbarMobile />}

        <Container maxWidth="lg" sx={{ position: "relative", my: 10, px: 0 }}>
          <Paper sx={{ py: 3, borderRadius: 3, border: "1px solid", borderColor: "divider" }} elevation={1}>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center", pr: { xs: 3, md: 5 }, pl: 2 }}>
              <Header />
            </Box>

            <Box sx={{ position: "relative", mt: 2 }}>
              <SearchForm />

              <Box sx={{ position: "absolute", inset: 0, bgcolor: "divider", opacity: 0.35, pointerEvents: "none" }} />
            </Box>

            <Box sx={{ px: 2, borderBottom: 1, borderColor: "divider" }}>
              <OrderTabs />
            </Box>

            <PostList />
          </Paper>
        </Container>

        <AppFooter />
      </ScrollArea>
    </AppWrapper>
  );
}

export default App;
