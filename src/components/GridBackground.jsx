import { Box } from "@mui/material";

export default function name() {
  return (
    <Box
      sx={{
        zIndex: -1,
        position: "absolute",
        inset: 0,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("/images/background/login.webp")`,
          backgroundSize: "60% 60%",
          filter: "brightness(1.7) grayscale(1)",
        }}
      ></Box>
      <Box
        sx={(theme) => ({
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(rgb(0 0 0 / 0) 0px,
    ${theme.palette.background.default} 1px)`,
          backgroundSize: "20px 20px",
          backdropFilter: "blur(20px)",
        })}
      ></Box>
    </Box>
  );
}
