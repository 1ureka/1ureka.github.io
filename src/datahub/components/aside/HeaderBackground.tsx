import { Box } from "@mui/material";

const HeaderBackground = () => (
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      overflow: "hidden",
      display: "flex",
      justifyContent: "center",
    }}
  >
    <Box
      sx={{
        position: "relative",
        maskImage: "radial-gradient(circle at 50% 25%, #0003 0%, #000a 100%)",
        bgcolor: "primary.main",
        fill: "var(--mui-palette-background-paper)",
        fillOpacity: 0.375,
        width: 1,
        minWidth: 1200,
        height: 1,
      }}
    >
      <svg
        style={{ scale: "1.01 -1" }}
        width="100%"
        height="200"
        viewBox="0 0 1920 300"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path d="M0,160 C160,180 320,140 480,160 C640,180 800,120 960,150 C1120,180 1280,130 1440,160 C1600,190 1760,150 1920,170 L1920,300 L0,300 Z" />
        <path d="M0,190 C120,210 240,160 360,190 C480,220 600,140 720,180 C840,220 960,130 1080,180 C1200,230 1320,160 1440,200 C1560,240 1740,180 1920,210 L1920,300 L0,300 Z" />
        <path d="M0,230 C160,250 320,190 480,230 C640,270 800,180 960,220 C1120,260 1280,170 1440,210 C1600,250 1760,200 1920,230 L1920,300 L0,300 Z" />
      </svg>
    </Box>
  </Box>
);

export { HeaderBackground };
