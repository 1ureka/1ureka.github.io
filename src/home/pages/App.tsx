import { Box, Stack } from "@mui/material";
import { smSpace, lgSpace, parallaxItemSx, parallaxScrollContainerSx } from "../utils/commonSx";
import { AppWrapper } from "../components/AppWrapper";

import { HeroTitle } from "../components/hero/HeroTitle";
import { HeroCTA } from "../components/hero/HeroCTA";
import { HeroHeader } from "../components/hero/HeroHeader";
import { HeroBackground } from "../components/hero/HeroBackground";
import { DemoBlocks } from "../components/hero/DemoBlocks";

import { ListControlBar } from "@/home/components/listControl/ListControlBar";
import { ProjectList } from "@/home/components/list/ProjectList";

const PositionTitleAndCTA = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      position: "absolute",
      inset: "0 0 auto 0",
      minHeight: "fit-content",
      height: "57.5dvh",
      display: "grid",
      placeItems: "center",
      ...parallaxItemSx(-100),
    }}
  >
    <Box sx={{ pt: 10, textAlign: "center" }}>{children}</Box>
  </Box>
);

function App() {
  return (
    <AppWrapper>
      <Box sx={parallaxScrollContainerSx}>
        <HeroBackground />

        <PositionTitleAndCTA>
          <HeroTitle />
          <HeroCTA />
        </PositionTitleAndCTA>

        <Stack sx={{ minHeight: "100dvh", justifyContent: "space-between", bgcolor: "coloredBg.main" }}>
          <HeroHeader />
          <DemoBlocks />
        </Stack>

        <Box sx={{ minHeight: "100dvh" }}>
          <Box sx={{ bgcolor: "coloredBg.main" }}>
            <Box
              sx={{
                borderRadius: "2rem",
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                border: "5px dashed",
                borderBottom: 0,
                borderColor: "border.main",
                borderLeft: "5px solid transparent",
                borderRight: "5px solid transparent",
                bgcolor: "background.default",
                p: lgSpace,
                pb: smSpace,
              }}
            >
              <ListControlBar />
            </Box>
          </Box>

          <Box sx={{ p: lgSpace, pt: smSpace }}>
            <ProjectList />
          </Box>
        </Box>
      </Box>
    </AppWrapper>
  );
}

export default App;
