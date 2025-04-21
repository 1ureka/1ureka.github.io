import { Box, keyframes } from "@mui/material";

const move = keyframes({
  "0%": { transform: "translate(0, 0)" },
  "100%": { transform: "translate(0, 240px)" },
});

const HeroBackground = () => (
  <Box sx={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
    <Box
      sx={{
        position: "absolute",
        inset: "-50% auto auto -50%",
        width: "200%",
        height: "200%",
        maskImage: "linear-gradient(to right, #fff, #fff0 40%, #fff0 60%, #fff 100%)",
        background:
          "radial-gradient(circle, transparent 12%, var(--mui-palette-primary-main) 12%, var(--mui-palette-primary-main) 20%, transparent 20%)",
        backgroundSize: "120px 120px",
        backgroundPosition: "center",
        animation: `${move} 5s linear infinite`,
      }}
    />
  </Box>
);

export { HeroBackground };
