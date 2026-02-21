import { Box, Button, Stack, Typography } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";

import type { FallbackProps } from "react-error-boundary";
import { routes } from "@/routes";

const AppError = ({ error, resetErrorBoundary }: Partial<FallbackProps>) => {
  const isError = error instanceof Error;
  const type = isError ? error.name : "UnknownError";
  const isFatal = type === "AbortError" || type === "NetworkError" || type === "TypeError";

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
      <Box sx={{ position: "relative", display: "grid", placeItems: "center" }}>
        <Stack sx={{ gap: 5, alignItems: "center" }}>
          <ErrorOutlineRoundedIcon sx={{ fontSize: 80 }} color="primary" />

          <Typography variant="h6" sx={{ textAlign: "center", maxWidth: 400 }}>
            {`錯誤類型：${type}`}
          </Typography>

          <Stack direction="row" sx={{ gap: 2 }}>
            <Button variant="outlined" startIcon={<ArrowBackRoundedIcon />} href={routes.home}>
              返回首頁
            </Button>
            {!isFatal && resetErrorBoundary && (
              <Button variant="contained" startIcon={<RefreshRoundedIcon />} onClick={resetErrorBoundary}>
                重試
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export { AppError };
