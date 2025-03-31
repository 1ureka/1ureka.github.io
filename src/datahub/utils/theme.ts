import { createTheme, useMediaQuery } from "@mui/material";
import "@/datahub/utils/app.css";
import { useEffect } from "react";

const defaultTheme = createTheme();

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    ml: true;
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
        primary: { main: "#66cccc", dark: "#45a1a1" },
        secondary: { main: "#66cccc90", dark: "color-mix(in srgb, #66cccc 50%, var(--mui-palette-text-primary) 50%)" },
      },
    },
    dark: {
      palette: {
        primary: { main: "#66cccc", dark: "#2d8686" },
        secondary: { main: "#66cccc90", dark: "color-mix(in srgb, #66cccc 50%, var(--mui-palette-text-primary) 50%)" },
        background: { default: "#222", paper: "#222" },
      },
    },
  },
  breakpoints: {
    values: {
      ...defaultTheme.breakpoints.values,
      sm: 700,
      ml: 1440,
    },
  },
  components: {
    MuiInputBase: { defaultProps: { sx: { "&.Mui-disabled::before": { borderBottomStyle: "solid" } } } },
  },
  spacing: "0.5rem",
});

const useResponsiveFontSize = () => {
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    if (isLg) document.documentElement.style.fontSize = "16px";
    else if (isMd) document.documentElement.style.fontSize = "14px";
  }, [isLg, isMd, isSm]);

  return { isLg, isMd, isSm };
};

export { theme, useResponsiveFontSize };
