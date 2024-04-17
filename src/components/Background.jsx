import { Box } from "@mui/material";
import React from "react";
import styles from "./Background.module.css";

const WaveBackground = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url("/images/background/login.webp")`,
        backgroundSize: "60% 60%",
        filter: "brightness(2.2) grayscale(1)",
      }}
      className={styles.bg}
    ></Box>
  );
};

const RadioFilter = () => {
  const sx = (theme) => ({
    position: "absolute",
    inset: 0,
    backgroundImage: `radial-gradient(rgb(0 0 0 / 0) 0px,
    ${theme.palette.background.default} 0.5px)`,
    backgroundSize: "10px 10px",
    backdropFilter: "blur(20px)",
    scale: "2.5",
    rotate: "45deg",
  });

  return <Box sx={sx}></Box>;
};

export default function Background() {
  return (
    <Box
      sx={{
        zIndex: -1,
        position: "absolute",
        inset: 0,
        overflow: "hidden",
      }}
    >
      <WaveBackground />
      <RadioFilter />
    </Box>
  );
}
