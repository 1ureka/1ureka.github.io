import { Box, Button, IconButton, Popover, Stack, Switch, TextField, Tooltip, Typography } from "@mui/material";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { useAnchorEl } from "@/hooks/utils";
import { useState } from "react";

const Settings = () => {
  const { anchorEl, handleOpen, handleClose } = useAnchorEl();
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1500));
    setLoading(false);
    handleClose();
  };

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
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.5, mb: 3 }}>
          <Box>
            <Typography variant="subtitle1">啟用自訂 API 服務位址</Typography>
            <Typography variant="body2" color="text.secondary">
              預設連接本地服務 localhost:7860，開啟後可自訂。
            </Typography>
          </Box>

          <Switch checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
        </Box>

        <Stack sx={{ gap: 2 }}>
          <Box>
            <Typography variant="subtitle1">自訂 API 服務位址</Typography>
            <Typography variant="body2" color="text.secondary">
              自訂連線目標，可指定遠端或本地部署的 API 服務位址。
            </Typography>
          </Box>

          <Tooltip title={!enabled && <Typography variant="body2">請先啟用自訂 API 服務位址</Typography>} followCursor>
            <TextField
              disabled={!enabled}
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
            onClick={handleClose}
            disabled={loading}
            sx={{ "&:hover": { bgcolor: "action.selected" } }}
          >
            取消
          </Button>
          <Button variant="contained" fullWidth disableElevation onClick={handleSave} loading={loading}>
            確認
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export { Settings };
