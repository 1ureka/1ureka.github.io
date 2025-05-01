import { Box, Button, IconButton, Popover, Stack, Switch, TextField, Tooltip, Typography } from "@mui/material";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

import { useServerMetadata } from "@/assistant/hooks/api";
import { useAnchorEl } from "@/hooks/utils";
import { useState } from "react";
import { z } from "zod";

const SettingsMenu = ({ onClose }: { onClose: () => void }) => {
  const { url, enabled, handleChangeServer } = useServerMetadata();
  const [_url, setUrl] = useState<string>(url);
  const [_enabled, setEnabled] = useState<boolean>(enabled);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!_enabled) {
      handleChangeServer(false);
      return onClose();
    }

    const urlSchema = z.string().url();
    const { success } = urlSchema.safeParse(_url);
    if (!success) return console.error("無效的 API 服務位址");

    handleChangeServer(true, _url);
    onClose();
  };

  return (
    <Box component="form" onSubmit={handleSave}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.5, mb: 3 }}>
        <Box>
          <Typography variant="subtitle1">啟用 API 服務</Typography>
          <Typography variant="body2" color="text.secondary">
            本頁面預設僅供預覽。如需啟用完整功能，請開啟 API 服務並指定其位址。
          </Typography>
        </Box>

        <Switch onChange={(e) => setEnabled(e.target.checked)} checked={_enabled} />
      </Box>

      <Stack sx={{ gap: 2 }}>
        <Box>
          <Typography variant="subtitle1">自訂 API 服務位址</Typography>
          <Typography variant="body2" color="text.secondary">
            自訂連線目標，可指定遠端或本地部署的 API 服務位址。 詳細請參考{" "}
            <Typography
              component="a"
              href="https://github.com/1ureka/1ureka.blender.docs.rag"
              target="_blank"
              color="primary"
              sx={{ textDecoration: "underline" }}
            >
              1ureka/1ureka.blender.docs.rag
            </Typography>
          </Typography>
        </Box>

        <Tooltip title={!_enabled && <Typography variant="body2">請先啟用自訂 API 服務位址</Typography>} followCursor>
          <TextField
            disabled={!_enabled}
            value={_url}
            onChange={(e) => setUrl(e.target.value)}
            variant="outlined"
            size="small"
            placeholder="http://localhost:7860"
            fullWidth
          />
        </Tooltip>
      </Stack>

      <Box sx={{ display: "flex", mt: 4, gap: 1.5, color: "text.secondary" }}>
        <Button
          variant="contained"
          fullWidth
          disableElevation
          color="inherit"
          onClick={onClose}
          sx={{ "&:hover": { bgcolor: "action.selected" } }}
        >
          取消
        </Button>
        <Button variant="contained" fullWidth disableElevation type="submit">
          確認
        </Button>
      </Box>
    </Box>
  );
};

const Settings = () => {
  const { anchorEl, handleOpen, handleClose } = useAnchorEl();

  return (
    <>
      <Box sx={{ position: "absolute", inset: "auto auto 0 0", m: 3.5, bgcolor: "FilledInput.bg", borderRadius: 99 }}>
        <Tooltip title={<Typography variant="body2">設定</Typography>} placement="right" arrow>
          <IconButton centerRipple={false} sx={{ p: 1.5 }} onClick={handleOpen}>
            <SettingsRoundedIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Popover
        keepMounted={false}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "bottom", horizontal: "left" }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: { boxShadow: "none", outline: 3, outlineColor: "divider", p: 3, ml: 2, maxWidth: 450 },
          },
        }}
      >
        <SettingsMenu onClose={handleClose} />
      </Popover>
    </>
  );
};

export { Settings };
