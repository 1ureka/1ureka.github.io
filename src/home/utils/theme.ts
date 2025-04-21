import { createTheme, useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import "@/home/utils/app.css";

declare module "@mui/material/styles" {
  interface TypeText {
    colored: string;
  }
  interface Palette {
    coloredBg: Palette["primary"];
  }
  interface PaletteOptions {
    coloredBg?: PaletteOptions["primary"];
  }
}

const defaultTheme = createTheme();

const theme = createTheme({
  cssVariables: { colorSchemeSelector: ".mode-%s" },
  typography: { fontFamily: `Comfortaa, "jf openhuninn"` },
  colorSchemes: {
    light: {
      palette: {
        text: {
          primary: "#000",
          colored: "color-mix(in srgb, var(--mui-palette-primary-main) 50%, var(--mui-palette-text-primary) 50%)",
        },
        primary: { main: "#e783ad", contrastText: "#fff" },
        secondary: { main: "#e783ad90", dark: "color-mix(in srgb, #e783ad 50%, var(--mui-palette-text-primary) 50%)" },
        coloredBg: { main: "#ffd6e7" },
      },
    },
    dark: {
      palette: {
        text: {
          colored: "color-mix(in srgb, var(--mui-palette-primary-main) 50%, var(--mui-palette-text-primary) 50%)",
        },
        primary: { main: "#e783ad", contrastText: "#fff" },
        secondary: { main: "#e783ad90", dark: "color-mix(in srgb, #e783ad 50%, var(--mui-palette-text-primary) 50%)" },
        background: { default: "#202020", paper: "#202020" },
        coloredBg: { main: "var(--mui-palette-background-default)" },
      },
    },
  },
  breakpoints: {
    values: { ...defaultTheme.breakpoints.values, md: 1000 },
  },
  spacing: "0.5rem",
});

const useResponsiveFontSize = () => {
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    document.documentElement.style.fontSize = isSm ? "16px" : "14px";
  }, [isSm]);

  return { isSm };
};

export { theme, useResponsiveFontSize };
