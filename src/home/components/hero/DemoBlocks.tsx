import { Box, Paper, Stack } from "@mui/material";
import type { BoxProps, PaperProps } from "@mui/material";

import { mdSpace, parallaxItemSx, smSpace } from "@/home/utils/commonSx";
import { ToastDemo } from "../demo/ToastDemo";
import { ChartDemo } from "../demo/ChartDemo";
import { PickerDemo } from "../demo/PickerDemo";
import { PostDemo } from "../demo/PostDemo";

const demoBlockSx: BoxProps["sx"] = {
  p: smSpace,
  pb: mdSpace,
};
const paperSx: PaperProps["sx"] = {
  position: "relative",
  borderRadius: 2,
  boxShadow: 0,
  transition: "inherit",
  overflow: "hidden",
  pointerEvents: "auto",
} as const;

const DemoPaper = ({ children, sx, ...props }: PaperProps) => (
  <Paper elevation={6} sx={{ ...paperSx, ...sx }} {...props}>
    {children}
  </Paper>
);

const CenterAbsoluteInMid = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ display: "grid", placeItems: "center", overflow: "hidden", width: 1, height: 700 }}>{children}</Box>
);

const Absolute = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ position: "absolute", px: mdSpace, pointerEvents: "none" }}>{children}</Box>
);

const DimensionProvider = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ minWidth: 1400, width: "100dvw", maxWidth: 1750, height: 700 }}>{children}</Box>
);

const GridLayout = () => (
  <Box sx={{ display: "grid", gridTemplateColumns: "1.2fr 2.2fr 2fr 1.2fr", width: 1, height: 1 }}>
    <Box sx={{ ...demoBlockSx, display: "grid", height: 0.95 }}>
      <DemoPaper />
    </Box>

    <Stack sx={{ ...demoBlockSx, alignItems: "flex-start", justifyContent: "flex-end", gap: smSpace }}>
      <DemoPaper sx={{ width: 0.6, ...parallaxItemSx(-50) }}>
        <ToastDemo />
      </DemoPaper>
      <DemoPaper sx={{ width: 1 }}>
        <ChartDemo />
      </DemoPaper>
    </Stack>

    <Stack sx={{ ...demoBlockSx, alignItems: "flex-end", justifyContent: "flex-end", gap: smSpace }}>
      <DemoPaper sx={{ width: 0.6, ...parallaxItemSx(-50) }}>
        <PickerDemo />
      </DemoPaper>
      <DemoPaper sx={{ width: 1 }}>
        <PostDemo />
      </DemoPaper>
    </Stack>

    <Box sx={{ ...demoBlockSx, display: "grid", height: 0.95 }}>
      <DemoPaper />
    </Box>
  </Box>
);

const DemoBlocks = () => (
  <CenterAbsoluteInMid>
    <Absolute>
      <DimensionProvider>
        <GridLayout />
      </DimensionProvider>
    </Absolute>
  </CenterAbsoluteInMid>
);

export { DemoBlocks };
