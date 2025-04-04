import { Box, Button, IconButton } from "@mui/material";
import { Stack, TextField, Tooltip, Typography } from "@mui/material";

import CopyAllRoundedIcon from "@mui/icons-material/CopyAllRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";

import type { FetchUserByNameResult } from "@/forum/data/user";
import { routes } from "@/routes";
import { smSpace, xsSpace } from "./commonSx";

import { useEditProfile } from "@/forum/hooks/session";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { getFormErrorHelperText, getFormIsError } from "@/forum/utils/form";

const formSchema = z.object({
  email: z.string().trim().email("請輸入有效的電子郵件地址").max(100, "電子郵件地址過長"),
  username: z
    .string()
    .trim()
    .min(4, "使用者名稱至少 4 個字元")
    .max(20, "使用者名稱最多 20 個字元")
    .regex(/^[a-zA-Z0-9 ]+$/, "使用者名稱只能包含英文字母與數字"),
  description: z.string().trim().max(40, "個人簡介不可超過 40 個字元"),
});

export const BasicAccountSettings = ({ user }: { user: Required<FetchUserByNameResult> }) => {
  const { mutateAsync: editProfile, isPending } = useEditProfile();

  const form = useForm({
    defaultValues: { email: user.email, username: user.name, description: user.description },
    validators: { onBlur: formSchema },
    onSubmit: async ({ value }) => {
      if (isPending) return;
      const { email, username, description } = value;
      const result = await editProfile({
        userId: user.id,
        email,
        username: username.trim(),
        description: description.trim(),
      });
      if (result.error) return console.error(result.error);
      if (result.authenticated) return console.log("已成功更新個人資料！");
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
        <AssignmentRoundedIcon />
        <Typography variant="h6" sx={{ color: "text.primary" }}>
          基本資料
        </Typography>
      </Box>

      <form.Field
        name="email"
        children={(field) => (
          <TextField
            name={field.name}
            type="email"
            fullWidth
            size="small"
            variant="outlined"
            label="電子郵件"
            error={getFormIsError(field.state.meta.errors)}
            helperText={getFormErrorHelperText(field.state.meta.errors)}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
          />
        )}
      />
      <form.Field
        name="username"
        children={(field) => (
          <TextField
            name={field.name}
            type="text"
            fullWidth
            size="small"
            variant="outlined"
            label="使用者名稱"
            error={getFormIsError(field.state.meta.errors)}
            helperText={getFormErrorHelperText(field.state.meta.errors)}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
          />
        )}
      />

      <Box sx={{ display: "flex", gap: xsSpace, alignItems: "center" }}>
        <TextField
          label="個人檔案網址"
          value={`${window.location.origin}${routes.forum_users}?user=${name}`}
          variant="outlined"
          sx={{ flex: 1 }}
          disabled
          size="small"
        />
        <Tooltip arrow placement="top" title="複製個人檔案網址到剪貼簿">
          <IconButton
            onClick={() => {
              const origin = window.location.origin;
              const url = `${origin}${routes.forum_users}?user=${user.name}`;
              navigator.clipboard.writeText(url).then(() => {
                console.log("已複製個人檔案網址到剪貼簿！");
              });
            }}
          >
            <CopyAllRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip arrow placement="top" title="在新視窗中開啟個人檔案網址">
          <IconButton href={`${routes.forum_users}?user=${user.name}`} target="_blank" rel="noopener noreferrer">
            <OpenInNewRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <form.Field
        name="description"
        children={(field) => (
          <TextField
            name={field.name}
            type="text"
            fullWidth
            size="small"
            variant="outlined"
            label="個人簡介"
            placeholder="(職稱、學校、公司等)"
            multiline
            maxRows={3}
            error={getFormIsError(field.state.meta.errors)}
            helperText={getFormErrorHelperText(field.state.meta.errors)}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
          />
        )}
      />

      <Box sx={{ display: "flex", gap: xsSpace, alignItems: "center" }}>
        <Button variant="outlined" sx={{ flex: 1 }} onClick={() => form.reset()} loading={isPending}>
          重設表單
        </Button>
        <Button variant="contained" sx={{ flex: 1 }} disableElevation type="submit" loading={isPending}>
          儲存變更
        </Button>
      </Box>
    </Stack>
  );
};
