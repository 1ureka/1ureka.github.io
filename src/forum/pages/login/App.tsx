import { Box, Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";

import { AppWrapper } from "@/forum/components/AppWrapper";
import { ScrollArea } from "@/forum/components/ScrollArea";
import { useResponsiveFontSize } from "@/forum/utils/theme";
import { ThemeMenuWithButton } from "@/forum/components/ThemeMenu";
import { NotSupportPage } from "@/forum/components/AppError";
import { useSessionActions } from "@/forum/hooks/session";
import { useState } from "react";
import { routes } from "@/forum/utils/routes";

const TOTAL_USRS = 1202;
const TOTAL_POSTS = 239;

const LoginForm = () => {
  const { login } = useSessionActions();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // TODO: 應該要先 validate 表單
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    await login({ username, password });
    window.location.href = routes.home;
  };

  return (
    <Stack component="form" sx={{ p: 6, flex: 1, justifyContent: "center" }} onSubmit={handleSubmit}>
      <Box sx={{ display: "grid", placeItems: "center", mb: 2 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: "center" }}>
          歡迎回來
        </Typography>
      </Box>

      <TextField
        required
        name="username"
        type="text"
        fullWidth
        size="small"
        variant="filled"
        label="使用者名稱"
        sx={{ mb: 0.5 }}
      />
      <TextField
        required
        name="password"
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
        loading={loading}
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
        登入
      </Button>
    </Stack>
  );
};

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
                      href={routes.home}
                      startIcon={<ArrowBackIosNewRoundedIcon />}
                    >
                      返回首頁
                    </Button>
                  </Box>

                  <LoginForm />

                  <Box sx={{ mt: 3, p: 2 }}>
                    <Typography variant="caption" gutterBottom>
                      還沒有帳號？
                      <Button href={routes.register} variant="outlined" size="small" sx={{ ml: 1 }}>
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
                <Stack sx={{ height: 1 }}>
                  <Box sx={{ alignSelf: "flex-end", p: 2, display: "flex", placeItems: "center" }}>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      切換主題
                    </Typography>
                    <ThemeMenuWithButton />
                  </Box>

                  <Box sx={{ p: 2, display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
                    <ForumRoundedIcon color="primary" sx={{ fontSize: "3rem" }} />
                    <Typography variant="h3" component="h1" sx={{ fontFamily: `"timemachine-wa"` }}>
                      論壇樣板
                    </Typography>
                  </Box>

                  <Box sx={{ position: "relative", p: 4, pb: 8, display: "grid", placeItems: "center" }}>
                    <Stack
                      sx={{
                        height: "18rem",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        width: "fit-content",
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ alignSelf: "center" }}>
                        登入後你可以：
                      </Typography>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <PostAddRoundedIcon fontSize="large" color="inherit" />
                        <Typography variant="h6" component="p">
                          發表與編輯文章
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <CommentRoundedIcon fontSize="large" color="inherit" />
                        <Typography variant="h6" component="p">
                          回覆文章
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <FavoriteRoundedIcon fontSize="large" color="inherit" />
                        <Typography variant="h6" component="p">
                          收藏文章
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <PersonAddRoundedIcon fontSize="large" color="inherit" />
                        <Typography variant="h6" component="p">
                          追蹤其他使用者
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>

                  <Box sx={{ p: 2 }}>
                    <Typography variant="body2" sx={{ textAlign: "center" }}>
                      加入我們的社群，
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: "center" }}>
                      與另外
                      <Typography component="span" variant="body2" sx={{ color: "primary.light" }}>
                        {` ${TOTAL_USRS} `}
                      </Typography>
                      位使用者以及
                      <Typography component="span" variant="body2" sx={{ color: "primary.light" }}>
                        {` ${TOTAL_POSTS} `}
                      </Typography>
                      篇文章互動 🎉
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Paper>
          </Container>
        )}
      </ScrollArea>
    </AppWrapper>
  );
}

export default App;
