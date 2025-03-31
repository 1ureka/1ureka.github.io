import { Box, Button, Container, Paper, Stack, Typography } from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

import { AppWrapper } from "@/forum/components/AppWrapper";
import { ScrollArea } from "@/forum/components/ScrollArea";
import { useResponsiveFontSize } from "@/forum/utils/theme";
import { NotSupportPage } from "@/forum/components/AppError";
import { routes } from "@/routes";
import { AuthIntro } from "@/forum/components/auth/AuthIntro";
import { LoginForm } from "@/forum/components/auth/LoginForm";

function App() {
  const { isMd } = useResponsiveFontSize();

  return (
    <AppWrapper>
      {!isMd && <NotSupportPage />}

      {isMd && <Box sx={{ position: "fixed", inset: "0 auto 0 0", width: 0.5, bgcolor: "secondary.main" }} />}

      <ScrollArea>
        {isMd && (
          <Container
            maxWidth="lg"
            sx={{ position: "relative", display: "grid", placeItems: "center", minHeight: "100vh" }}
          >
            <Paper
              sx={{ position: "relative", my: 10, borderRadius: 3, overflow: "hidden", display: "flex", width: 1 }}
              elevation={6}
            >
              <Box sx={{ flex: 1, position: "relative" }}>
                <Stack sx={{ height: 1 }}>
                  <Box sx={{ mb: 2, p: 2 }}>
                    <Button
                      sx={{ textWrap: "nowrap", width: "fit-content" }}
                      href={routes.forum_home}
                      startIcon={<ArrowBackIosNewRoundedIcon />}
                    >
                      返回首頁
                    </Button>
                  </Box>

                  <LoginForm />

                  <Box sx={{ mt: 3, p: 2 }}>
                    <Typography variant="caption" gutterBottom>
                      還沒有帳號？
                      <Button href={routes.forum_register} variant="outlined" size="small" sx={{ ml: 1 }}>
                        註冊
                      </Button>
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              <Box
                className="mode-dark"
                sx={{ position: "relative", flex: 1, bgcolor: "secondary.main", color: "text.primary" }}
              >
                <AuthIntro />
              </Box>
            </Paper>
          </Container>
        )}
      </ScrollArea>
    </AppWrapper>
  );
}

export default App;
