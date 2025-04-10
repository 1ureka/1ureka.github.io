import { createTheme, useMediaQuery } from "@mui/material";
import "@/photos/utils/app.css";
import { useEffect } from "react";

declare module "@mui/material/styles" {
  interface TypeText {
    colored: string;
  }
  interface Palette {
    border: Palette["primary"];
  }
  interface PaletteOptions {
    border?: PaletteOptions["primary"];
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
        text: {
          colored: "color-mix(in srgb, var(--mui-palette-primary-main) 50%, var(--mui-palette-text-primary) 50%)",
        },
        primary: { main: "#d077a1" },
        background: { paper: "#f9f9f9", default: "#f3f3f3" },
      },
    },
    dark: {
      palette: {
        border: { main: "transparent" },
        text: {
          colored: "color-mix(in srgb, var(--mui-palette-primary-main) 50%, var(--mui-palette-text-primary) 50%)",
        },
        primary: { main: "#d077a1" },
        background: { paper: "#272727", default: "#202020" },
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
});

const useResponsiveFontSize = () => {
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    if (isLg) document.documentElement.style.fontSize = "16px";
    // else if (isMd) document.documentElement.style.fontSize = "14px";
  }, [isLg, isMd, isSm]);

  return { isLg, isMd, isSm };
};

export { theme, useResponsiveFontSize };
