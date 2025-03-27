import { Box, Button, Container, Divider, Paper } from "@mui/material";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

import { AppWrapper } from "@/forum/components/AppWrapper";
import { AppbarDesktop } from "@/forum/components/appbar/AppbarDesktop";
import { AppbarMobile } from "@/forum/components/appbar/AppbarMobile";
import { ScrollArea } from "@/forum/components/ScrollArea";
import { AppFooter } from "@/forum/components/appbar/AppFooter";

import { useResponsiveFontSize } from "@/forum/utils/theme";
import { routes } from "@/routes";
import { UserTitle } from "@/forum/components/users/UserTitle";
import { UserIntro } from "@/forum/components/users/UserIntro";
import { UserAvatar } from "@/forum/components/users/UserAvatar";
import { FollowButton } from "@/forum/components/users/FollowButton";
import { PostList } from "@/forum/components/users/PostList";
import { UserStats } from "@/forum/components/users/UserStats";
import { UserStatsFollow } from "@/forum/components/users/UserStatsFollow";

function App() {
  const { isMd } = useResponsiveFontSize();

  return (
    <AppWrapper>
      <UserTitle />

      <Box sx={{ bgcolor: "secondary.main", height: "35vh", position: "absolute", inset: "0 0 auto 0" }} />

      <ScrollArea>
        {isMd ? <AppbarDesktop /> : <AppbarMobile />}

        <Container maxWidth="lg" sx={{ position: "relative", my: 10 }}>
          <Paper sx={{ pb: 3, borderRadius: 3, border: "1px solid", borderColor: "divider" }} elevation={1}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 3, flexWrap: "wrap" }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <UserAvatar />
                <UserIntro />
              </Box>

              <Box sx={{ m: 2 }}>
                <FollowButton />
              </Box>
            </Box>

            <Divider />

            <Box
              sx={{
                position: "relative",
                display: "flex",
                justifyContent: "space-between",
                gap: 3,
                alignItems: "center",
                px: 3,
                py: 2,
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ position: "absolute", inset: 0, bgcolor: "divider", opacity: 0.35, pointerEvents: "none" }} />

              <Box sx={{ display: "flex", gap: 1, alignItems: "center", color: "text.secondary" }}>
                <Button
                  variant="outlined"
                  startIcon={<ArrowBackIosRoundedIcon />}
                  size="small"
                  sx={{ mr: 1 }}
                  href={routes.forum_home}
                >
                  {isMd ? "返回首頁" : "首頁"}
                </Button>
                <UserStats />
              </Box>

              <Box sx={{ display: "flex", gap: 1, alignItems: "center", color: "text.secondary" }}>
                <UserStatsFollow />
              </Box>
            </Box>

            <Divider />

            <Box>
              <PostList />
            </Box>
          </Paper>
        </Container>

        <AppFooter />
      </ScrollArea>
    </AppWrapper>
  );
}

export default App;
