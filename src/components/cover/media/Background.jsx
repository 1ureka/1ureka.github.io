import { Box } from "@mui/material";

export default function Background() {
  const imgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  const gradientSx = {
    position: "absolute",
    inset: 0,
    background: "radial-gradient(transparent, transparent, rgb(0 0 0 / 0.55))",
  };

  return (
    <Box sx={{ position: "absolute", inset: 0, scale: "1.05" }}>
      <img src="./PJ28-2 とびら-1.webp" style={imgStyle} alt="" />
      <Box sx={gradientSx} />
    </Box>
  );
}
