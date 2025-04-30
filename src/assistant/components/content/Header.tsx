import { Box, CircularProgress, Typography } from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import { ThemeSwitch } from "../ThemeSwitch";
import { useApiStatus, type ApiStatus } from "@/assistant/hooks/api";

const FilledContainerSx = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  borderRadius: 1,
  bgcolor: "FilledInput.bg",
  p: 1.5,
};

const HeaderLeft = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      <AutoAwesomeRoundedIcon
        className="mode-light"
        sx={{ fontSize: "2.8rem", bgcolor: "text.secondary", borderRadius: 1, color: "background.default", p: 1 }}
      />
      <Typography
        variant="h4"
        component="h2"
        sx={{ fontSize: "1.85rem", lineHeight: 1, translate: "0 2px", display: { xs: "none", sm: "block" } }}
      >
        Blender RAG
      </Typography>
    </Box>
  );
};

const statusMap: Record<ApiStatus, { color: string; text: string }> = {
  loading: { color: "text.secondary", text: "啟動中" },
  offline: { color: "text.secondary", text: "已離線" },
  connected: { color: "success.light", text: "已連線" },
  error: { color: "error.light", text: "出現錯誤" },
};

const HeaderRight = () => {
  const apiStatus = useApiStatus();

  return (
    <Box sx={{ display: "flex", alignItems: "stretch", gap: 2 }}>
      <ThemeSwitch />

      <Box sx={FilledContainerSx}>
        <Box sx={{ position: "relative", p: 1 }}>
          {apiStatus !== "loading" ? (
            <Box
              sx={{ position: "absolute", inset: 0, bgcolor: statusMap[apiStatus].color, borderRadius: 99, scale: 0.7 }}
            />
          ) : (
            <Box sx={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
              <CircularProgress size={16} sx={{ color: "text.secondary" }} />
            </Box>
          )}
        </Box>
        <Typography variant="body2" sx={{ textWrap: "nowrap", lineHeight: 1 }}>
          {statusMap[apiStatus].text}
        </Typography>
      </Box>
    </Box>
  );
};

const Header = () => {
  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        top: 0,
        p: 3.5,
        zIndex: 1,
      }}
    >
      <HeaderLeft />
      <HeaderRight />
    </Box>
  );
};

export { Header };
