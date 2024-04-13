import React from "react";
import { Box } from "@mui/material";
import { alpha } from "@mui/material/styles";

export default function GlassBox({ children, sx }) {
  return (
    <Box
      sx={(theme) => {
        const backgroundColor = alpha(theme.palette.background.default, 0.5);
        const borderColor = alpha(theme.palette.background.default, 0.1);
        const boxShadow = theme.shadows[3];
        return {
          position: "absolute",
          backdropFilter: "blur(10px)",
          border: "solid 1px",
          backgroundColor,
          borderColor,
          boxShadow,
          borderRadius: "7px",
          ...sx,
        };
      }}
    >
      {children}
    </Box>
  );
}
