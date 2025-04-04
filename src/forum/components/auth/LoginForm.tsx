import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useLogin } from "@/forum/hooks/session";
import { routes } from "@/routes";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { getFormErrorHelperText, getFormIsError } from "@/forum/utils/form";

const formSchema = z.object({
  username: z
    .string()
    .trim()
    .min(4, "使用者名稱至少 4 個字元")
    .max(20, "使用者名稱最多 20 個字元")
    .regex(/^[a-zA-Z0-9 ]+$/, "使用者名稱只能包含英文字母與數字"),
  password: z.string().trim().min(1, "密碼不能為空"),
});

const LoginForm = () => {
  const { mutateAsync: login, isPending } = useLogin();

  const form = useForm({
    defaultValues: { username: "", password: "" },
    validators: { onBlur: formSchema },
    onSubmit: async ({ value }) => {
      if (isPending) return;
      const { username, password } = value;
      const result = await login({ username, password });
      if (result.error) return console.error(result.error);
      if (result.authenticated) window.location.href = routes.forum_home;
    },
    onSubmitInvalid: () => {
      console.error("請檢查表單是否填寫正確");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.state.canSubmit) return console.error("請檢查表單是否填寫正確");
    form.handleSubmit();
  };

  return (
    <Stack component="form" sx={{ p: 6, flex: 1, justifyContent: "center" }} onSubmit={handleSubmit}>
      <Box sx={{ display: "grid", placeItems: "center", mb: 2 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: "center" }}>
          歡迎回來
        </Typography>
      </Box>

      <form.Field
        name="username"
        children={(field) => (
          <TextField
            required
            name={field.name}
            type="text"
            fullWidth
            size="small"
            variant="filled"
            sx={{ mb: 0.5 }}
            label="使用者名稱"
            error={getFormIsError(field.state.meta.errors)}
            helperText={getFormErrorHelperText(field.state.meta.errors)}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
          />
        )}
      />
      <form.Field
        name="password"
        children={(field) => (
          <TextField
            required
            name={field.name}
            type="password"
            fullWidth
            size="small"
            variant="filled"
            label="密碼"
            sx={{ mb: 0.5 }}
            error={getFormIsError(field.state.meta.errors)}
            helperText={getFormErrorHelperText(field.state.meta.errors)}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
          />
        )}
      />
      <Button
        type="submit"
        variant="contained"
        loading={isPending}
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
