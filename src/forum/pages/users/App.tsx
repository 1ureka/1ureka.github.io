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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster />

      <Box sx={{ bgcolor: "secondary.main", height: "35vh", position: "absolute", inset: "0 0 auto 0" }} />

      <ScrollArea>
        {isMd ? <AppbarDesktop /> : <AppbarMobile />}

        <Container maxWidth="lg" sx={{ position: "relative", my: 10 }}>
          <Paper sx={{ py: 3, borderRadius: 3, border: "1px solid", borderColor: "divider" }} elevation={1}>
            {urlParams.get("user") ? (
              <Typography variant="h4" align="center">
                {urlParams.get("user")}'s profile
              </Typography>
            ) : (
              <Typography variant="h4" align="center">
                404 Not Found
              </Typography>
            )}
          </Paper>
        </Container>
      </ScrollArea>
    </ThemeProvider>
  );
}

export default App;
