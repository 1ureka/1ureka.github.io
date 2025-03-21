import { Box, Button, ButtonGroup, Container, Paper } from "@mui/material";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

import "@/forum/app.css";
import { AppWrapper } from "@/forum/components/AppWrapper";
import { AppbarDesktop } from "@/forum/components/appbar/AppbarDesktop";
import { AppbarMobile } from "@/forum/components/appbar/AppbarMobile";
import { ScrollArea } from "@/forum/components/ScrollArea";
import { useResponsiveFontSize } from "@/forum/utils/theme";
import { Post, Comment } from "@/forum/components/post/FullPost";
import { NextPostNav, PrevPostNav } from "@/forum/components/post/PrevNextPostNav";

function App() {
  const { isMd } = useResponsiveFontSize();

  return (
    <AppWrapper>
      <Box sx={{ bgcolor: "secondary.main", height: "35vh", position: "absolute", inset: "0 0 auto 0" }} />

      <ScrollArea>
        {isMd ? <AppbarDesktop /> : <AppbarMobile />}

        <Container maxWidth="lg" sx={{ position: "relative", my: 10 }}>
          <Paper sx={{ pb: 3, borderRadius: 3, border: "1px solid", borderColor: "divider" }} elevation={1}>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mx: 1 }}>
              <Button href="/" startIcon={<ArrowBackIosRoundedIcon />} variant="outlined" sx={{ textWrap: "nowrap" }}>
                {isMd ? "返回首頁" : "首頁"}
              </Button>

              <Box sx={{ flex: 1 }} />

              <ButtonGroup variant="text">
                <PrevPostNav />
                <NextPostNav />
              </ButtonGroup>
            </Box>

            <Post />
            <Comment />
          </Paper>
        </Container>
      </ScrollArea>
    </AppWrapper>
  );
}

export default App;
