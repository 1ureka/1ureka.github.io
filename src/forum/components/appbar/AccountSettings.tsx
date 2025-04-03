import {
  Box,
  Button,
  Dialog,
  Divider,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import CopyAllRoundedIcon from "@mui/icons-material/CopyAllRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import DangerousRoundedIcon from "@mui/icons-material/DangerousRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

import type { DialogProps } from "@mui/material/Dialog";
import type { FetchUserByNameResult } from "@/forum/data/user";
import { routes } from "@/routes";
import { useState } from "react";

type AccountSettingsProps = DialogProps & {
  user: Required<FetchUserByNameResult>;
};

const lgSpace = { xs: 4, sm: 6 } as const;
const mdSpace = 4;
const smSpace = 2;
const xsSpace = 1;

const Header = () => (
  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: mdSpace, width: 1 }}>
    <PersonRoundedIcon
      className="mode-light"
      sx={{ fontSize: "3rem", bgcolor: "primary.main", borderRadius: 1, color: "background.default", p: 1 }}
    />

    <Stack sx={{ gap: xsSpace }}>
      <Typography variant="h5">帳戶設定</Typography>
      <Typography variant="body2" sx={{ opacity: 0.8 }}>
        在這裡你可以更新個人資料、修改密碼或刪除帳號。
      </Typography>
    </Stack>
  </Box>
);

const BasicAccountSettings = ({ user }: { user: Required<FetchUserByNameResult> }) => {
  const [name, setName] = useState(user.name);
  const [description, setDescription] = useState(user.description || "");
  const [email, setEmail] = useState(user.email || "");

  return (
    <Stack sx={{ gap: smSpace }}>
      <Box sx={{ display: "flex", gap: xsSpace, alignItems: "center", color: "text.secondary", mb: xsSpace }}>
        <AssignmentRoundedIcon />
        <Typography variant="h6" sx={{ color: "text.primary" }}>
          基本資料
        </Typography>
      </Box>

      <TextField
        label="電子郵件"
        type="email"
        value={email}
        variant="outlined"
        fullWidth
        size="small"
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="使用者名稱"
        value={name}
        variant="outlined"
        fullWidth
        size="small"
        onChange={(e) => setName(e.target.value)}
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

      <TextField
        label="個人簡介"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="(職稱、學校、公司等)"
        variant="outlined"
        fullWidth
        multiline
        maxRows={3}
        size="small"
      />

      <Box sx={{ display: "flex", gap: xsSpace, alignItems: "center" }}>
        <Button variant="outlined" sx={{ flex: 1 }}>
          重設表單
        </Button>
        <Button variant="contained" sx={{ flex: 1 }} disableElevation>
          儲存變更
        </Button>
      </Box>
    </Stack>
  );
};

const PasswordChangeSettings = () => {
  return (
    <Stack sx={{ gap: smSpace }}>
      <Box sx={{ display: "flex", gap: xsSpace, alignItems: "center", color: "text.secondary", mb: xsSpace }}>
        <LockRoundedIcon />
        <Typography variant="h6" sx={{ color: "text.primary" }}>
          修改密碼
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: xsSpace, alignItems: "center" }}>
        <TextField label="舊密碼" type="password" variant="outlined" fullWidth size="small" />
        <TextField label="新密碼" type="password" variant="outlined" fullWidth size="small" />
      </Box>

      <Button variant="contained" sx={{ flex: 1 }} disableElevation disabled>
        送出變更
      </Button>
    </Stack>
  );
};

const DeleteAccountSettings = () => {
  return (
    <Box>
      <Button variant="contained" color="error" fullWidth disableElevation startIcon={<DangerousRoundedIcon />}>
        刪除帳號
      </Button>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        刪除帳號將會永久刪除所有相關資料，無法復原。
      </Typography>
    </Box>
  );
};

const AccountSettings = ({ onClose, user, ...props }: AccountSettingsProps) => {
  const isMd = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <Dialog onClose={onClose} maxWidth="lg" fullWidth {...props}>
      <Stack sx={{ p: lgSpace, gap: smSpace }}>
        <Box sx={{ position: "absolute", inset: "0 0 auto auto", zIndex: 1 }}>
          <IconButton onClick={(e) => onClose && onClose(e, "backdropClick")} sx={{ m: smSpace }}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        {isMd ? (
          <>
            <Header />
            <Divider flexItem sx={{ mt: smSpace }} />
            <Box sx={{ display: "flex", gap: lgSpace, width: 1, alignItems: "stretch" }}>
              <Stack sx={{ gap: smSpace, flex: 1 }}>
                <BasicAccountSettings user={user} />
              </Stack>
              <Stack sx={{ gap: smSpace, flex: 1, justifyContent: "space-between" }}>
                <Box>
                  <PasswordChangeSettings />
                  <Divider flexItem sx={{ mt: smSpace }} />
                </Box>
                <DeleteAccountSettings />
              </Stack>
            </Box>
          </>
        ) : (
          <>
            <Header />
            <Divider flexItem sx={{ mt: smSpace }} />
            <BasicAccountSettings user={user} />
            <Divider flexItem />
            <PasswordChangeSettings />
            <Divider flexItem sx={{ mb: smSpace }} />
            <DeleteAccountSettings />
          </>
        )}
      </Stack>
    </Dialog>
  );
};

export { AccountSettings };
