import { Box, Button, Stack, Typography } from "@mui/material";
import CameraRoundedIcon from "@mui/icons-material/CameraRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";

import type { FallbackProps } from "react-error-boundary";
import { ScreenWidthError } from "@/utils/error";
import { useResponsiveFontSize } from "../utils/theme";
import { routes } from "@/routes";
import { useEffect } from "react";

const AppError = ({ error, resetErrorBoundary }: Partial<FallbackProps>) => {
  const { isSm, isMd } = useResponsiveFontSize();

  const isError = error instanceof Error;
  const isScreenWidthError = error instanceof ScreenWidthError;
  const type = isError ? error.name : "UnknownError";
  const isFatal = type === "AbortError" || type === "NetworkError" || type === "TypeError" || isScreenWidthError;

  useEffect(() => {
    if (isScreenWidthError && isSm) resetErrorBoundary?.();
  }, [isScreenWidthError, isSm, resetErrorBoundary]);

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        display: "grid",
        placeItems: "center",
        p: 2,
        bgcolor: "background.default",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          ...(!isMd ? { left: "50%", right: "-50%" } : {}),
          pointerEvents: "none",
          display: "grid",
          placeItems: "center",
          containerType: "inline-size",
        }}
      >
        <CameraRoundedIcon
          color="primary"
          sx={{ position: "absolute", aspectRatio: "1/1", width: "max(135cqw, 120cqh)", height: "auto" }}
        />
      </Box>

      <Box sx={{ position: "relative", display: "grid", placeItems: "center" }}>
        <Stack sx={{ gap: 5, alignItems: "center" }}>
          <Box sx={{ position: "relative" }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                position: "absolute",
                inset: 0,
                fontFamily: `"timemachine-wa"`,
                WebkitTextStroke: "15px var(--mui-palette-background-default)",
              }}
            >
              相簿樣板
            </Typography>
            <Typography
              variant="h2"
              component="h1"
              sx={{ position: "relative", fontFamily: `"timemachine-wa"`, color: "primary.main" }}
            >
              相簿樣板
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
                href={routes.photos_home}
                startIcon={<ArrowBackRoundedIcon />}
              >
                返回首頁
              </Button>
            )}
            {!isFatal && resetErrorBoundary && (
              <Button
                variant="text"
                color="inherit"
                onClick={() => resetErrorBoundary()}
                startIcon={<RefreshRoundedIcon />}
              >
                重新載入
              </Button>
            )}
            {isFatal && (
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<ErrorOutlineRoundedIcon />}
                sx={{ pointerEvents: "none" }}
              >
                該錯誤無法透過重新載入修正
              </Button>
            )}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export { AppError };
