import { Box, Stack } from "@mui/material";
import { useResponsiveFontSize } from "../utils/theme";
import { useSqliteInitializer } from "../hooks/useSQLiteInitializer";

import { AppWrapper } from "@/datahub/components/AppWrapper";
import { AppNotSupported } from "../components/AppError";
import { Appbar, APPBAR_HEIGHT } from "../components/appbar/Appbar";
import { Sidebar } from "../components/aside/Sidebar";
import { Header } from "../components/aside/Header";
import { Page } from "./Page";

const SqlInitializer = () => {
  useSqliteInitializer();
  return null;
};

function App() {
  const { isSm } = useResponsiveFontSize();

  if (!isSm)
    return (
      <AppWrapper>
        <AppNotSupported />
      </AppWrapper>
    );

  return (
    <AppWrapper>
      <SqlInitializer />

      <Appbar />

      <Box component="main" sx={{ position: "relative", display: "flex", height: `calc(100dvh - ${APPBAR_HEIGHT}px)` }}>
        <Box sx={{ position: "absolute", inset: 0, bgcolor: "primary.main", opacity: 0.2, pointerEvents: "none" }} />

        <Sidebar />

        <Box sx={{ position: "relative", flex: 1, height: 1, overflow: "auto" }} id="scroll-area">
          <Stack sx={{ minHeight: 1, gap: 3, px: 2, pb: 3 }}>
            <Header />
            <Page />
          </Stack>
        </Box>
      </Box>
    </AppWrapper>
  );
}

export default App;
