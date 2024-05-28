import { Box } from "@mui/material";

export default function Corners() {
  const styles = [
    { top: 0, left: 0, rotate: "90deg" },
    { top: 0, right: 0, rotate: "180deg" },
    { bottom: 0, left: 0, rotate: "0deg" },
    { bottom: 0, right: 0, rotate: "270deg" },
  ];

  return (
    <Box sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {styles.map((val, i) => (
        <img
          key={i}
          src="./decal.webp"
          alt=""
          style={{ position: "absolute", width: 140, opacity: 0.1, ...val }}
          decoding="async"
        />
      ))}
    </Box>
  );
}
