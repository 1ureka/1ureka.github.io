import { createTheme, useMediaQuery } from "@mui/material";
import "@/assistant/utils/app.css";
import { useEffect } from "react";

declare module "@mui/material/styles" {
  interface Palette {
    border: Palette["primary"];
    bgOpacity: Palette["primary"];
  }
  interface PaletteOptions {
    border?: PaletteOptions["primary"];
    bgOpacity?: PaletteOptions["primary"];
  }
}

const theme = createTheme({
  cssVariables: { colorSchemeSelector: ".mode-%s" },
  typography: {
    fontFamily: `Comfortaa, "jf openhuninn"`,
  },
  colorSchemes: {
    light: {
      palette: {
        border: { main: "var(--mui-palette-divider)" },
        primary: { main: "#8179d2" },
        background: { paper: "#f9f9f9", default: "#f3f3f3" },
        bgOpacity: { main: "0.45" },
      },
    },
    dark: {
      palette: {
        border: { main: "transparent" },
        primary: { main: "#8179d2" },
        background: { paper: "#1a1a1a", default: "#050505" },
        bgOpacity: { main: "0.3" },
      },
    },
  },
  components: {
    MuiInputBase: { defaultProps: { sx: { "&.Mui-disabled::before": { borderBottomStyle: "solid" } } } },
    MuiButton: {
      styleOverrides: { contained: { "&:hover": { backgroundColor: "var(--mui-palette-primary-light)" } } },
    },
  },
  spacing: "0.5rem",
  shape: { borderRadius: 4 * 2.5 },
});

const useResponsiveFontSize = () => {
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    document.documentElement.style.fontSize = "16px";
  }, [isLg, isMd, isSm]);

  return { isLg, isMd, isSm };
};

export { theme, useResponsiveFontSize };
