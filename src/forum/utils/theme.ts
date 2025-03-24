import { createTheme, useMediaQuery } from "@mui/material";
import { useEffect } from "react";

const theme = createTheme({
  cssVariables: { colorSchemeSelector: ".mode-%s" },
  typography: {
    fontFamily: `Comfortaa, "jf openhuninn", "Noto Sans TC"`,
  },
  colorSchemes: {
    light: {
      palette: {
        text: { primary: "#000" },
        primary: { main: "#FF772E", contrastText: "#fff" },
        // secondary: { main: "#075056" },
        secondary: { main: "#23585c" },
      },
    },
    dark: {
      palette: {
        primary: { main: "#FF772E", contrastText: "#fff" },
        secondary: { main: "#23585c" },
        background: { default: "#222", paper: "#222" },
      },
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
    else if (isMd) document.documentElement.style.fontSize = "14px";
    else if (isSm) document.documentElement.style.fontSize = "13px";
    else document.documentElement.style.fontSize = "13px";
  }, [isLg, isMd, isSm]);

  return { isLg, isMd, isSm };
};

export { theme, useResponsiveFontSize };
