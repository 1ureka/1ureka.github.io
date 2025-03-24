import { Avatar, Box, Button, Container, Divider, Paper, Typography } from "@mui/material";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import NotificationAddRoundedIcon from "@mui/icons-material/NotificationAddRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

import "@/forum/app.css";
import { AppWrapper } from "@/forum/components/AppWrapper";
import { AppbarDesktop } from "@/forum/components/appbar/AppbarDesktop";
import { AppbarMobile } from "@/forum/components/appbar/AppbarMobile";
import { ScrollArea } from "@/forum/components/ScrollArea";
import { useResponsiveFontSize } from "@/forum/utils/theme";
import { authors } from "@/forum/utils/data";

function App() {
  const { isMd } = useResponsiveFontSize();
  const urlParams = new URLSearchParams(window.location.search);
  const user = authors.find((author) => author.name === urlParams.get("user"));
  if (user === undefined) {
    window.location.replace("/");
    return null;
  }

  const avatorSize = 6;
  const borderOffset = 0.8;

  return (
    <AppWrapper>
      <title>{`論壇樣板 | ${user.name}`}</title>

      <Box sx={{ bgcolor: "secondary.main", height: "35vh", position: "absolute", inset: "0 0 auto 0" }} />

      <ScrollArea>
        {isMd ? <AppbarDesktop /> : <AppbarMobile />}

        <Container maxWidth="lg" sx={{ position: "relative", my: 10 }}>
          <Paper sx={{ pb: 3, borderRadius: 3, border: "1px solid", borderColor: "divider" }} elevation={1}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 3,
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                    width: `${avatorSize}rem`,
                    alignSelf: "flex-end",
                    m: 2,
                  }}
                >
                  <Box sx={{ position: "absolute", bottom: 0, width: 1, height: "auto", aspectRatio: 1 }}>
                    <Box
                      sx={{
                        borderRadius: "50%",
                        position: "absolute",
                        inset: `${-borderOffset}rem`,
                        bgcolor: "background.paper",
                        backgroundImage: "var(--Paper-overlay)",
                      }}
                    />
                  </Box>

                  <Avatar
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      width: 1,
                      height: "auto",
                      aspectRatio: 1,
                      bgcolor: "primary.main",
                      boxShadow: 3,
                    }}
                  >
                    <Typography variant="h3" component="span" sx={{ translate: "0px 5%", color: "white" }}>
                      {user.name.charAt(0).toUpperCase()}
                    </Typography>
                  </Avatar>
                </Box>

                <Box sx={{ m: 2 }}>
                  <Typography variant="h5" component="h2">
                    {user.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.description}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ m: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<NotificationAddRoundedIcon />}
                  sx={{
                    borderRadius: 99,
                    transition: "all 0.2s ease",
                    boxShadow: 3,
                    scale: "1.001",
                    "&:hover": { bgcolor: "primary.main", scale: "1.05", boxShadow: 3 },
                    "&:active": { scale: "0.95" },
                  }}
                >
                  追蹤
                </Button>
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

                <BarChartRoundedIcon fontSize="small" color="inherit" />
                <Typography variant="body2">{isMd ? "發布了 0 篇文章" : "0 篇文章"}</Typography>
                <Typography variant="body2">·</Typography>
                <Typography variant="body2">{isMd ? "獲得了 0 次讚" : "0 次讚"}</Typography>
                <Typography variant="body2">·</Typography>
                <Typography variant="body2">{isMd ? "文章總瀏覽次數 0 次" : "0 次瀏覽"}</Typography>
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
