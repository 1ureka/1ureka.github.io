import { Box, Button, Container, Paper } from "@mui/material";
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";

import "@/forum/app.css";
import { AppWrapper } from "@/forum/components/AppWrapper";
import { AppbarDesktop } from "@/forum/components/appbar/AppbarDesktop";
import { AppbarMobile } from "@/forum/components/appbar/AppbarMobile";
import { ScrollArea } from "@/forum/components/ScrollArea";
import { useResponsiveFontSize } from "@/forum/utils/theme";

// TODO: 上方有 tabs ，可以切換搜尋結果是 "文章" 或 "用戶" 或 "標籤"
function App() {
  const { isMd } = useResponsiveFontSize();

  return (
    <AppWrapper>
      <Box sx={{ bgcolor: "secondary.main", height: "35vh", position: "absolute", inset: "0 0 auto 0" }} />

      <ScrollArea>
        {isMd ? <AppbarDesktop /> : <AppbarMobile />}

        <Container maxWidth="lg" sx={{ position: "relative", my: 10 }}>
          <Paper sx={{ py: 3, borderRadius: 3, border: "1px solid", borderColor: "divider" }} elevation={1}>
            <Box sx={{ mx: 1.5 }}>
              <Button variant="outlined" color="primary" fullWidth endIcon={<ArrowRightAltRoundedIcon />}>
                查看更多
              </Button>
            </Box>
          </Paper>
        </Container>
      </ScrollArea>
    </AppWrapper>
  );
}

export default App;
