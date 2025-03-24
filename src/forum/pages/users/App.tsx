import { Box, Button, Container, Divider, Paper, Typography } from "@mui/material";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

import "@/forum/app.css";
import { AppWrapper } from "@/forum/components/AppWrapper";
import { AppbarDesktop } from "@/forum/components/appbar/AppbarDesktop";
import { AppbarMobile } from "@/forum/components/appbar/AppbarMobile";
import { ScrollArea } from "@/forum/components/ScrollArea";
import { useResponsiveFontSize } from "@/forum/utils/theme";

import { UserTitle } from "@/forum/components/users/UserTitle";
import { UserIntro } from "@/forum/components/users/UserIntro";
import { UserAvatar } from "@/forum/components/users/UserAvatar";
import { FollowButton } from "@/forum/components/users/FollowButton";
import { UserStats } from "@/forum/components/users/UserStats";

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
                <Button variant="outlined" startIcon={<ArrowBackIosRoundedIcon />} size="small" sx={{ mr: 1 }} href="/">
                  {isMd ? "返回首頁" : "首頁"}
                </Button>
                <UserStats />
              </Box>

              <Box sx={{ display: "flex", gap: 1, alignItems: "center", color: "text.secondary" }}>
                <PeopleRoundedIcon fontSize="small" color="inherit" />
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { textDecoration: "underline", cursor: "pointer", color: "text.primary" } }}
                >
                  2 位追蹤者
                </Typography>
                <Typography variant="body2">·</Typography>
                <Typography
                  variant="body2"
                  sx={{ "&:hover": { textDecoration: "underline", cursor: "pointer", color: "text.primary" } }}
                >
                  正在追蹤 1 人
                </Typography>
              </Box>
            </Box>

            <Divider />

            <Box>
              <Typography sx={{ textAlign: "center", mt: 9, mb: 6, color: "text.secondary" }}>
                他/她還沒有發布過任何文章
              </Typography>
            </Box>
          </Paper>
        </Container>
      </ScrollArea>
    </AppWrapper>
  );
}

export default App;
