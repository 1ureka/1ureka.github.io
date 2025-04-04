import { Box, Button, Dialog, Divider, IconButton } from "@mui/material";
import { Stack, Typography, useMediaQuery } from "@mui/material";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import DangerousRoundedIcon from "@mui/icons-material/DangerousRounded";

import type { DialogProps } from "@mui/material/Dialog";
import type { FetchUserByNameResult } from "@/forum/data/user";
import { lgSpace, mdSpace, smSpace, xsSpace } from "./commonSx";
import { BasicAccountSettings } from "./AccountSettingsBasic";
import { PasswordChangeSettings } from "./AccountSettingsPassword";

type AccountSettingsProps = DialogProps & {
  user: Required<FetchUserByNameResult>;
};

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
                  <PasswordChangeSettings userId={user.id} />
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
            <PasswordChangeSettings userId={user.id} />
            <Divider flexItem sx={{ mb: smSpace }} />
            <DeleteAccountSettings />
          </>
        )}
      </Stack>
    </Dialog>
  );
};

export { AccountSettings };
