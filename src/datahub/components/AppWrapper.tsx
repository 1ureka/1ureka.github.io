import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { theme } from "../utils/theme";
import { Toaster } from "@/components/Toast";
import { AppError } from "./AppError";
import { WidthNotSupport } from "@/components/WidthNotSupport";

const queryClient = new QueryClient();

function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary fallbackRender={(props) => <AppError {...props} />}>{children}</ErrorBoundary>
        <WidthNotSupport minWidth={700} render={(error) => <AppError error={error} />} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export { AppWrapper };
