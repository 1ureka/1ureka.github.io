import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useSessionActions } from "@/forum/hooks/session";
import { useState } from "react";
import { routes } from "@/routes";

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
    window.location.href = routes.forum_home;
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

export { LoginForm };
