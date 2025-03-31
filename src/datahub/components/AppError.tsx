import { Box, Button, Stack, Typography } from "@mui/material";
import DataExplorationRoundedIcon from "@mui/icons-material/DataExplorationRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import type { FallbackProps } from "react-error-boundary";
import { useResponsiveFontSize } from "../utils/theme";
import { routes } from "@/routes";

/**
 * 錯誤顯示組件，適用於 ErrorBoundary 的 fallbackRender
 */
function AppError({ error, resetErrorBoundary, isFatal }: Partial<FallbackProps> & { isFatal?: boolean }) {
  useResponsiveFontSize();

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 2, sm: 4 },
        bgcolor: "background.default",
      }}
    >
      <Box sx={{ position: "absolute", inset: 0, bgcolor: "primary.main", opacity: 0.1, pointerEvents: "none" }} />

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            maskImage: "radial-gradient(circle at 50% 25%, #0008 0%, #0008 100%)",
            pointerEvents: "none",
            bgcolor: "primary.main",
            fill: "var(--mui-palette-background-paper)",
            fillOpacity: 0.2,
            width: 1,
            minWidth: 1200,
            height: 1,
          }}
        >
          <svg
            style={{ scale: "1 -1" }}
            width="100%"
            height="200"
            viewBox="0 0 1920 300"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path d="M0,160 C160,180 320,140 480,160 C640,180 800,120 960,150 C1120,180 1280,130 1440,160 C1600,190 1760,150 1920,170 L1920,300 L0,300 Z" />
            <path d="M0,190 C120,210 240,160 360,190 C480,220 600,140 720,180 C840,220 960,130 1080,180 C1200,230 1320,160 1440,200 C1560,240 1740,180 1920,210 L1920,300 L0,300 Z" />
            <path d="M0,230 C160,250 320,190 480,230 C640,270 800,180 960,220 C1120,260 1280,170 1440,210 C1600,250 1760,200 1920,230 L1920,300 L0,300 Z" />
          </svg>

          <svg
            style={{ position: "absolute", inset: "auto 0 0 0" }}
            width="100%"
            height="200"
            viewBox="0 0 1920 300"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path d="M0,160 C160,180 320,140 480,160 C640,180 800,120 960,150 C1120,180 1280,130 1440,160 C1600,190 1760,150 1920,170 L1920,300 L0,300 Z" />
            <path d="M0,190 C120,210 240,160 360,190 C480,220 600,140 720,180 C840,220 960,130 1080,180 C1200,230 1320,160 1440,200 C1560,240 1740,180 1920,210 L1920,300 L0,300 Z" />
            <path d="M0,230 C160,250 320,190 480,230 C640,270 800,180 960,220 C1120,260 1280,170 1440,210 C1600,250 1760,200 1920,230 L1920,300 L0,300 Z" />
          </svg>
        </Box>
      </Box>

      <Box sx={{ position: "relative", zIndex: 1, display: "grid", placeItems: "center" }}>
        <Stack sx={{ gap: 5, alignItems: "center" }}>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center", translate: "-2.5%" }}>
            <DataExplorationRoundedIcon sx={{ fontSize: "4rem", color: "secondary.dark" }} />
            <Typography variant="h3" component="h1" sx={{ fontFamily: `"timemachine-wa"`, color: "secondary.dark" }}>
              資料樣板
            </Typography>
          </Box>

          <Stack sx={{ gap: 1, alignItems: "center" }}>
            <Typography variant="h5" component="h3">
              發生錯誤
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              {error?.message || "未知錯誤"}
            </Typography>
          </Stack>

          <Box sx={{ display: "flex", gap: 2, mt: 2, color: "text.secondary" }}>
            {!isFatal && (
              <Button
                variant="outlined"
                color="inherit"
                disableElevation
                href={routes.datahub_home}
                startIcon={<ArrowBackRoundedIcon />}
              >
                返回首頁
              </Button>
            )}
            {resetErrorBoundary && (
              <Button
                variant="text"
                color="inherit"
                onClick={() => resetErrorBoundary()}
                startIcon={<RefreshRoundedIcon />}
              >
                重新載入
              </Button>
            )}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

const AppNotSupported = () => (
  <AppError error={{ message: "請使用寬度超過 650px 的裝置或將視窗放大，以使用此應用程式。" }} isFatal />
);

export { AppError, AppNotSupported };
