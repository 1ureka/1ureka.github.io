import { createTheme } from "@mui/material";

const theme = createTheme({
  cssVariables: { colorSchemeSelector: ".mode-%s" },
  typography: { fontFamily: `Comfortaa, "jf openhuninn"` },
  colorSchemes: {
    light: {
      palette: {
        text: { primary: "#000" },
        primary: { main: "#e783ad", contrastText: "#fff" },
        secondary: { main: "#e783ad90", dark: "color-mix(in srgb, #e783ad 50%, var(--mui-palette-text-primary) 50%)" },
      },
    },
    dark: {
      palette: {
        primary: { main: "#e783ad", contrastText: "#fff" },
        secondary: { main: "#e783ad90", dark: "color-mix(in srgb, #e783ad 50%, var(--mui-palette-text-primary) 50%)" },
        background: { default: "#222", paper: "#222" },
      },
    },
  },
  spacing: "0.5rem",
});

export { theme };
