import { Box, Container, Paper, Typography } from "@mui/material";

import "@/forum/app.css";
import { AppWrapper } from "@/forum/components/AppWrapper";
import { AppbarDesktop } from "@/forum/components/appbar/AppbarDesktop";
import { AppbarMobile } from "@/forum/components/appbar/AppbarMobile";
import { ScrollArea } from "@/forum/components/ScrollArea";
import { useResponsiveFontSize } from "@/forum/utils/theme";

function App() {
  const { isMd } = useResponsiveFontSize();
  const urlParams = new URLSearchParams(window.location.search);
  if (!urlParams.get("user")) window.location.replace("/");

  return (
    <AppWrapper>
      <title>{`論壇樣板 | ${urlParams.get("user")}`}</title>

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
    </AppWrapper>
  );
}

export default App;
