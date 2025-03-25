import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { theme } from "../utils/theme";
import { Toaster } from "@/components/Toast";
import { ErrorPage } from "@/forum/components/AppError";

const queryClient = new QueryClient();

function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary fallbackRender={(props) => <ErrorPage {...props} />}>{children}</ErrorBoundary>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export { AppWrapper };
