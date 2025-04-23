import { CssBaseline, ThemeProvider, useColorScheme, useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import { theme } from "@/home/utils/theme";
import { Toaster } from "@/components/Toast";

const useResponsiveFontSize = () => {
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  useEffect(() => {
    document.documentElement.style.fontSize = isSm ? "16px" : "14px";
  }, [isSm]);
};

function AppLogic() {
  useResponsiveFontSize();
  return null;
}

function CheckTheme({ children }: { children: React.ReactNode }) {
  const { mode } = useColorScheme();
  if (mode === undefined) return null;
  return children;
}

function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster />
      <AppLogic />
      <CheckTheme>{children}</CheckTheme>
    </ThemeProvider>
  );
}

export { AppWrapper };
