import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppError } from "./AppError";
import { ErrorBoundary } from "react-error-boundary";
import { theme } from "../utils/theme";
import { Toaster } from "@/components/Toast";

function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster />
      <ErrorBoundary fallbackRender={(props) => <AppError {...props} />}>{children}</ErrorBoundary>
    </ThemeProvider>
  );
}

export { AppWrapper };
