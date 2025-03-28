import { Box, Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

import { AppWrapper } from "@/forum/components/AppWrapper";
import { ScrollArea } from "@/forum/components/ScrollArea";
import { useResponsiveFontSize } from "@/forum/utils/theme";
import { NotSupportPage } from "@/forum/components/AppError";
import { routes } from "@/routes";
import { AuthIntro } from "@/forum/components/auth/AuthIntro";

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
                <Stack component="form" sx={{ height: 1 }}>
                  <Box sx={{ mb: 2, p: 2 }}>
                    <Button
                      sx={{ textWrap: "nowrap", width: "fit-content" }}
                      href={routes.forum_home}
                      startIcon={<ArrowBackIosNewRoundedIcon />}
                    >
                      返回首頁
                    </Button>
                  </Box>

                  <Stack sx={{ p: 6, flex: 1, justifyContent: "center" }}>
                    <Box sx={{ display: "grid", placeItems: "center", mb: 2 }}>
                      <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: "center" }}>
                        加入我們
                      </Typography>
                    </Box>

                    <TextField
                      required
                      type="email"
                      fullWidth
                      size="small"
                      variant="filled"
                      label="電子郵件"
                      sx={{ mb: 0.5 }}
                    />
                    <TextField
                      required
                      type="text"
                      fullWidth
                      size="small"
                      variant="filled"
                      label="使用者名稱"
                      sx={{ mb: 0.5 }}
                    />
                    <TextField
                      required
                      type="password"
                      fullWidth
                      size="small"
                      variant="filled"
                      label="密碼"
                      sx={{ mb: 0.5 }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        mt: 1.5,
                        width: 0.8,
                        alignSelf: "center",
                        borderRadius: 99,
                        "&:hover": { bgcolor: "primary.light", scale: 1.02 },
                        "&:active": { scale: 0.98 },
                        transition: "all 0.2s ease",
                      }}
                    >
                      註冊
                    </Button>
                  </Stack>

                  <Box sx={{ mt: 3, p: 2 }}>
                    <Typography variant="caption" gutterBottom>
                      已經有帳號？
                      <Button href={routes.forum_login} variant="outlined" size="small" sx={{ ml: 1 }}>
                        登入
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
