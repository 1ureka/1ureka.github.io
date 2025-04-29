import { Box, Typography } from "@mui/material";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";

import type { FallbackProps } from "react-error-boundary";
import { useResponsiveFontSize } from "../utils/theme";

const AppError = ({ error }: Partial<FallbackProps>) => {
  useResponsiveFontSize();

  return (
    <Box sx={{ display: "grid", placeItems: "center", height: "100dvh" }}>
      <Typography variant="h4" color="error" sx={{ display: "flex", alignItems: "center" }}>
        <ErrorOutlineRoundedIcon sx={{ mr: 1 }} />
        {error?.message || "發生了一些錯誤"}
      </Typography>
    </Box>
  );
};

export { AppError };
