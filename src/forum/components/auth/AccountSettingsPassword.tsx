import { Box, Button } from "@mui/material";
import { Stack, TextField, Typography } from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

import { smSpace, xsSpace } from "./commonSx";
import { useChangePassword } from "@/forum/hooks/session";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { getFormErrorHelperText, getFormIsError } from "@/forum/utils/form";

const formSchema = z.object({
  currentPassword: z.string().trim().min(1, "密碼不能為空"),
  newPassword: z.string().trim().min(1, "密碼不能為空"),
});

export const PasswordChangeSettings = ({ userId }: { userId: number }) => {
  const { mutateAsync: chandgePassword, isPending } = useChangePassword();

  const form = useForm({
    defaultValues: { currentPassword: "", newPassword: "" },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      if (isPending) return;
      const { currentPassword, newPassword } = value;
      const result = await chandgePassword({ userId, currentPassword, newPassword });
      if (result.error) return console.error(result.error);
      if (result.authenticated) return console.log("已成功更密碼！");
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
    <Stack sx={{ gap: smSpace }} component="form" onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", gap: xsSpace, alignItems: "center", color: "text.secondary", mb: xsSpace }}>
        <LockRoundedIcon />
        <Typography variant="h6" sx={{ color: "text.primary" }}>
          修改密碼
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: xsSpace, alignItems: "center" }}>
        <form.Field
          name="currentPassword"
          children={(field) => (
            <TextField
              name={field.name}
              label="舊密碼"
              type="password"
              variant="outlined"
              fullWidth
              size="small"
              error={getFormIsError(field.state.meta.errors)}
              helperText={getFormErrorHelperText(field.state.meta.errors)}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
          )}
        />
        <form.Field
          name="newPassword"
          children={(field) => (
            <TextField
              name={field.name}
              label="新密碼"
              type="password"
              variant="outlined"
              fullWidth
              size="small"
              error={getFormIsError(field.state.meta.errors)}
              helperText={getFormErrorHelperText(field.state.meta.errors)}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
          )}
        />
      </Box>

      <form.Subscribe
        selector={(form) => form.isDirty}
        children={(isDirty) => (
          <Button
            variant="contained"
            type="submit"
            disabled={!isDirty}
            loading={isPending}
            disableElevation
            sx={{ flex: 1 }}
          >
            {isPending ? "修改中..." : "送出變更"}
          </Button>
        )}
      />
    </Stack>
  );
};
