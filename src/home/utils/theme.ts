import { createTheme } from "@mui/material";
import "@/home/utils/app.css";

declare module "@mui/material/styles" {
  interface TypeText {
    colored: string;
  }
  interface Palette {
    coloredBg: Palette["primary"];
    border: Palette["primary"];
  }
  interface PaletteOptions {
    coloredBg?: PaletteOptions["primary"];
    border?: PaletteOptions["primary"];
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
        border: { main: "transparent" },
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
        border: { main: "var(--mui-palette-divider)" },
      },
    },
  },
  breakpoints: {
    values: { ...defaultTheme.breakpoints.values, md: 1000 },
  },
  spacing: "0.5rem",
});

export { theme };
