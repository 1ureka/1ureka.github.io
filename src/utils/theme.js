import { createTheme } from "@mui/material";

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
    },
  },
  shape: {
    borderRadius: 5,
  },
  typography: {
    fontFamily: "Comfortaa",
  },
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
    },
  },
  shape: {
    borderRadius: 5,
  },
  typography: {
    fontFamily: "Comfortaa",
  },
});
