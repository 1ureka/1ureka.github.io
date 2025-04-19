import { createTheme } from "@mui/material";

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
      },
    },
    dark: {
      palette: {
        text: {
          colored: "color-mix(in srgb, var(--mui-palette-primary-main) 50%, var(--mui-palette-text-primary) 50%)",
        },
        primary: { main: "#e783ad", contrastText: "#fff" },
        secondary: { main: "#e783ad90", dark: "color-mix(in srgb, #e783ad 50%, var(--mui-palette-text-primary) 50%)" },
        background: { default: "#222", paper: "#222" },
      },
    },
  },
  breakpoints: {
    values: { ...defaultTheme.breakpoints.values, md: 1000 },
  },
  spacing: "0.5rem",
});

export { theme };
