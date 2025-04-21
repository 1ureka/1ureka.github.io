import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "@/home/utils/theme";
import { Toaster } from "@/components/Toast";

function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster />
      {children}
    </ThemeProvider>
  );
}

export { AppWrapper };
