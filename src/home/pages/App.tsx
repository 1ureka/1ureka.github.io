import { Box, Stack } from "@mui/material";
import { smSpace, lgSpace, viewTimelineSx } from "../utils/commonSx";
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
      ...viewTimelineSx({ targetView: "--hero", range: "exit-crossing", from: 0, to: -150 }),
    }}
  >
    <Box sx={{ pt: 10, textAlign: "center" }}>{children}</Box>
  </Box>
);

function App() {
  return (
    <AppWrapper>
      <Box
        sx={{
          position: "relative",
          height: "100dvh",
          width: "100dvw",
          overflowY: "auto",
          overflowX: "hidden",
          bgcolor: "coloredBg.main",
        }}
      >
        <HeroBackground />

        <Stack
          id="hero"
          sx={{
            position: "relative",
            minHeight: "max(100dvh, 850px)",
            viewTimelineName: "--hero",
            justifyContent: "space-between",
          }}
        >
          <PositionTitleAndCTA>
            <HeroTitle />
            <HeroCTA />
          </PositionTitleAndCTA>

          <HeroHeader />
          <DemoBlocks />
        </Stack>

        <Box
          id="projects"
          sx={{
            position: "relative",
            minHeight: "100dvh",
            viewTimelineName: "--projects",
            bgcolor: "background.default",
            borderRadius: "2rem",
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            border: "5px dashed",
            borderBottom: 0,
            borderColor: "border.main",
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
          }}
        >
          <Box
            sx={{
              p: lgSpace,
              pb: smSpace,
              ...viewTimelineSx({ targetView: "--projects", range: "entry", from: 50, to: 0 }),
            }}
          >
            <ListControlBar />
          </Box>

          <Box
            sx={{
              p: lgSpace,
              pt: smSpace,
              ...viewTimelineSx({ targetView: "--projects", range: "entry", from: 150, to: 0 }),
            }}
          >
            <ProjectList />
          </Box>
        </Box>
      </Box>
    </AppWrapper>
  );
}

export default App;
