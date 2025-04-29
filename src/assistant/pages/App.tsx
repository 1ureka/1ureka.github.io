import { Stack } from "@mui/material";
import { useResponsiveFontSize } from "../utils/theme";

import { AppWrapper } from "@/assistant/components/AppWrapper";
import { Background } from "@/assistant/components/content/Background";
import { Header } from "@/assistant/components/content/Header";
import { Main } from "@/assistant/components/content/Main";
import { Settings } from "@/assistant/components/content/Settings";

function App() {
  useResponsiveFontSize();

  return (
    <AppWrapper>
      <Background />

      <Stack sx={{ minHeight: "100dvh" }}>
        <Header />
        <Main />
      </Stack>

      <Settings />
    </AppWrapper>
  );
}

export default App;
