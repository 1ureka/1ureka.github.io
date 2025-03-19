import { Box, Container, CssBaseline, Paper, ThemeProvider, Typography } from "@mui/material";

import "@/forum/app.css";
import { Toaster } from "@/forum/components/Toast";
import { AppbarDesktop } from "@/forum/components/AppbarDesktop";
import { AppbarMobile } from "@/forum/components/AppbarMobile";
import { ScrollArea } from "@/forum/components/ScrollArea";
import { theme, useResponsiveFontSize } from "@/forum/utils/theme";

function App() {
  const { isMd } = useResponsiveFontSize();
  const urlParams = new URLSearchParams(window.location.search);
  if (!urlParams.get("user")) return window.location.replace("/");

  return (
    <ThemeProvider theme={theme}>
      <title>{`論壇樣板 | ${urlParams.get("user")}`}</title>
      <CssBaseline />
      <Toaster />

      <Box sx={{ bgcolor: "secondary.main", height: "35vh", position: "absolute", inset: "0 0 auto 0" }} />

      <ScrollArea>
        {isMd ? <AppbarDesktop /> : <AppbarMobile />}

        <Container maxWidth="lg" sx={{ position: "relative", my: 10 }}>
          <Paper sx={{ py: 3, borderRadius: 3, border: "1px solid", borderColor: "divider" }} elevation={1}>
            <Typography variant="h4" align="center">
              {urlParams.get("user")} 的個人檔案
            </Typography>
          </Paper>
        </Container>
      </ScrollArea>
    </ThemeProvider>
  );
}

export default App;
