import { createTheme } from "@mui/material";
import "@/image-sanitizer/utils/app.css";

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
        primary: { main: "#ff0000" },
        background: { paper: "#f9f9f9", default: "#f3f3f3" },
      },
    },
    dark: {
      palette: {
        border: { main: "var(--mui-palette-divider)" },
        text: {
          colored: "color-mix(in srgb, var(--mui-palette-primary-main) 50%, var(--mui-palette-text-primary) 50%)",
        },
        primary: { main: "#ff3333" },
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

export { theme };
