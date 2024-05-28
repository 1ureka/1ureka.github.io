import { createTheme } from "@mui/material";

/** @param {import("@mui/material").Palette} palette */
const typography = (palette) => ({
  fontFamily: "Comfortaa",
  // h1: {},
  // h2: {},
  // h3: {},
  h4: {
    fontWeight: 400,
    fontSize: "1.5rem",
    lineHeight: 1.334,
  },
  h5: {
    fontWeight: 500,
    fontSize: "1.25rem",
    lineHeight: 1.6,
  },
  h6: {
    fontWeight: 400,
    fontSize: "1rem",
    lineHeight: 1.5,
  },
  subTitle1: {
    fontWeight: 500,
    fontSize: "0.75rem",
    lineHeight: 1.66,
  },
  subTitle2: {
    fontWeight: 500,
    fontSize: "0.75rem",
    lineHeight: 1.66,
    color: palette.text.secondary,
  },
  body1: {
    fontSize: "0.75rem",
    lineHeight: 1.66,
  },
  body2: {
    fontSize: "0.75rem",
    lineHeight: 1.66,
    color: palette.text.secondary,
  },
  caption: {
    fontSize: "0.65rem",
    lineHeight: 1.66,
    color: palette.text.secondary,
  },
  button: {
    fontSize: "0.75rem",
    lineHeight: 1.66,
  },
  // overline : {}
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#e783ad",
    },
    secondary: {
      main: "#83e7bd",
    },
    custom: {
      background: "#121212",
      content: "rgba(255, 255, 255, 0.05)",
      unSelected: "rgba(0, 0, 0, 0.25)",
      backdrop: "#121212d8",
    },
  },
  shape: { borderRadius: 5 },
  typography,
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#e783ad",
      contrastText: "#fff",
    },
    secondary: {
      main: "#83e7bd",
      contrastText: "#fff",
    },
    custom: {
      background: "rgba(0, 0, 0, 0.12)",
      content: "#ffffff",
      unSelected: "#bdbdbd",
      backdrop: "rgba(255, 255, 255, 0.85)",
    },
  },
  shape: { borderRadius: 5 },
  typography,
});
