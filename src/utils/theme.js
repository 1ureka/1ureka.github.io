import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    appBar: "rgba(0, 0, 0, 0.5)",
    appBarHide: "rgba(0, 0, 0, 0)",
    bgFilterUpper: "rgba(0, 0, 0, 0.85)",
    bgFilterLower: "rgba(0, 0, 0, 0.85)",
    primary: {
      main: "#e783ad",
    },
    secondary: {
      main: "#83e7bd",
    },
  },
  shape: {
    borderRadius: 7,
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    appBar: "rgba(255, 255, 255, 0.52)",
    appBarHide: "rgba(0, 0, 0, 0)",
    bgFilterUpper: "rgba(255, 255, 255, 0.85)",
    bgFilterLower: "rgba(0, 0, 0, 0.85)",
    primary: {
      main: "#e783ad",
      contrastText: "#fff",
    },
    secondary: {
      main: "#83e7bd",
      contrastText: "#fff",
    },
  },
  shape: {
    borderRadius: 7,
  },
});
