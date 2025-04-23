import { Box, Stack } from "@mui/material";
import type { BoxProps, PaperProps } from "@mui/material";

import { mdSpace, smSpace, viewTimelineSx } from "@/home/utils/commonSx";
import { ToastDemo } from "../demo/ToastDemo";
import { ChartDemo } from "../demo/ChartDemo";
import { PickerDemo } from "../demo/PickerDemo";
import { PostDemo } from "../demo/PostDemo";
import { TreeDemo } from "../demo/TreeDemo";
import { SidebarDemo } from "../demo/SidebarDemo";
import { PaperM } from "@/components/Motion";

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

const DemoPaper = ({ children, sx, ...props }: React.ComponentProps<typeof PaperM>) => (
  <PaperM
    transition={{ type: "spring", bounce: 0, visualDuration: 0.75 }}
    variants={{
      initial: { opacity: 0, scale: 0.9, y: 200 },
      animate: { opacity: 1, scale: 1, y: 0 },
    }}
    elevation={6}
    sx={{ ...paperSx, ...sx }}
    {...props}
  >
    {children}
  </PaperM>
);

const CenterAbsoluteInMid = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ display: "grid", placeItems: "center", overflow: "hidden", width: 1, height: 700 }}>{children}</Box>
);

const Absolute = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ position: "absolute", px: mdSpace, pointerEvents: "none" }}>{children}</Box>
);

const DimensionProvider = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      minWidth: 1400,
      width: "100dvw",
      maxWidth: 1750,
      height: 700,
      ...viewTimelineSx({ targetView: "--hero", range: "exit-crossing", from: 0, to: -100 }),
    }}
  >
    {children}
  </Box>
);

const GridLayout = () => (
  <Box sx={{ display: "grid", gridTemplateColumns: "1.2fr 2.2fr 2fr 1.2fr", width: 1, height: 1 }}>
    <Box sx={{ ...demoBlockSx, ...viewTimelineSx({ targetView: "--hero", range: "exit-crossing", from: 0, to: -50 }) }}>
      <DemoPaper sx={{ height: "calc(0.9 * 700px)", overflowY: "auto" }}>
        <SidebarDemo />
      </DemoPaper>
    </Box>

    <Stack sx={{ ...demoBlockSx, alignItems: "flex-start", justifyContent: "flex-end", gap: smSpace }}>
      <Box sx={{ width: 0.6, ...viewTimelineSx({ targetView: "--hero", range: "exit-crossing", from: 0, to: -100 }) }}>
        <DemoPaper>
          <ToastDemo />
        </DemoPaper>
      </Box>
      <Box sx={{ width: 1 }}>
        <DemoPaper>
          <ChartDemo />
        </DemoPaper>
      </Box>
    </Stack>

    <Stack sx={{ ...demoBlockSx, alignItems: "flex-end", justifyContent: "flex-end", gap: smSpace }}>
      <Box sx={{ width: 0.6, ...viewTimelineSx({ targetView: "--hero", range: "exit-crossing", from: 0, to: -120 }) }}>
        <DemoPaper>
          <PickerDemo />
        </DemoPaper>
      </Box>
      <Box sx={{ width: 1, ...viewTimelineSx({ targetView: "--hero", range: "exit-crossing", from: 0, to: -25 }) }}>
        <DemoPaper>
          <PostDemo />
        </DemoPaper>
      </Box>
    </Stack>

    <Box sx={{ ...demoBlockSx, ...viewTimelineSx({ targetView: "--hero", range: "exit-crossing", from: 0, to: -50 }) }}>
      <DemoPaper sx={{ height: "calc(0.9 * 700px)" }}>
        <TreeDemo />
      </DemoPaper>
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
