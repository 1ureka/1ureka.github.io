import { Box, Button, ButtonGroup, Container, Paper } from "@mui/material";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

import { AppWrapper } from "@/forum/components/AppWrapper";
import { AppbarDesktop } from "@/forum/components/appbar/AppbarDesktop";
import { AppbarMobile } from "@/forum/components/appbar/AppbarMobile";
import { ScrollArea } from "@/forum/components/ScrollArea";
import { AppFooter } from "@/forum/components/appbar/AppFooter";

import { routes } from "@/forum/utils/routes";
import { useResponsiveFontSize } from "@/forum/utils/theme";
import { NextPostNav, PrevPostNav } from "@/forum/components/postPage/PrevNextPostNav";
import { PostBlock } from "@/forum/components/postPage/PostBlock";

function App() {
  const { isMd } = useResponsiveFontSize();

  return (
    <AppWrapper>
      <Box sx={{ bgcolor: "secondary.main", height: "35vh", position: "absolute", inset: "0 0 auto 0" }} />

      <ScrollArea>
        {isMd ? <AppbarDesktop /> : <AppbarMobile />}

        <Container maxWidth="lg" sx={{ position: "relative", my: 10 }}>
          <Paper sx={{ pb: 3, borderRadius: 3, border: "1px solid", borderColor: "divider" }} elevation={1}>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mx: 2 }}>
              <Button
                href={routes.home}
                startIcon={<ArrowBackIosRoundedIcon />}
                variant="outlined"
                sx={{ textWrap: "nowrap" }}
              >
                {isMd ? "返回首頁" : "首頁"}
              </Button>

              <Box sx={{ flex: 1 }} />

              <ButtonGroup variant="text">
                <PrevPostNav />
                <NextPostNav />
              </ButtonGroup>
            </Box>

            <PostBlock />
          </Paper>
        </Container>

        <AppFooter />
      </ScrollArea>
    </AppWrapper>
  );
}

export default App;
