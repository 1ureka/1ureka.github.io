import React from "react";
import { Box } from "@mui/material";

const background = "/images/background/gridH.png";

export default function GridBackground() {
  return (
    <Box
      sx={{
        zIndex: -1,
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",
        filter: "drop-shadow(0px 0px 10px gray)",
        maskImage: `
            linear-gradient( to left,
            rgb(0 0 0 / 0.6),
            rgb(0 0 0 / 0),
            rgb(0 0 0 / 0),
            rgb(0 0 0 / 0.25)
            )
          `,
      }}
    >
      <img
        src={background}
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </Box>
  );
}
