import * as React from "react";
import { Box, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

import { EDITOR_DISPLAY, THEME } from "../../../utils/store";
import { MotionStack, toolsItemVar } from "../../Motion";
import Image from "./Image";

const margin = "32px";

function Name() {
  const name = useRecoilValue(EDITOR_DISPLAY);
  const sx = { position: "absolute", top: "8px", left: "8px", zIndex: 1 };
  return (
    <Typography variant="caption" color="text.secondary" sx={sx}>
      {name}
    </Typography>
  );
}

function SliderHandle({ cursor }) {
  const theme = useRecoilValue(THEME);
  const borderColor = theme.palette.divider;
  const bgColor = theme.palette.background.default;

  return (
    <motion.div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        translate: "-50% -50%",
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        border: `3px ${borderColor} solid`,
        background: bgColor,
        cursor,
      }}
    ></motion.div>
  );
}

function Slider({ constraintsRef, x, cursor }) {
  const theme = useRecoilValue(THEME);
  const borderColor = theme.palette.divider;

  const lineStyle = {
    position: "relative",
    left: "50%",
    height: "100%",
    width: "0px",
    border: `3px dashed ${borderColor}`,
    x,
  };

  return (
    <Box sx={{ mx: margin, position: "absolute", inset: 0, zIndex: 1 }}>
      <motion.div
        drag="x"
        dragConstraints={constraintsRef}
        dragElastic={0}
        dragMomentum={false}
        onDragStart={() => cursor.set("none")}
        onDragEnd={() => cursor.set("pointer")}
        style={lineStyle}
      >
        <SliderHandle cursor={cursor} />
      </motion.div>
    </Box>
  );
}

export default function Preview() {
  const theme = useRecoilValue(THEME);
  const color = theme.palette.divider;
  const border = `2px dashed ${color}`;

  const constraintsRef = React.useRef(null);
  const cursor = useMotionValue("pointer");
  const x = useMotionValue(-3);
  const clipPathL = useMotionTemplate`inset(0 calc(50% - ${x}px - 3px) 0 0)`;
  const clipPathR = useMotionTemplate`inset(0 0 0 calc(50% + ${x}px + 3px))`;

  const containerSx = {
    position: "relative",
    width: "100%",
    height: "100%",
    border,
    p: margin,
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <MotionStack ref={constraintsRef} variants={toolsItemVar} sx={containerSx}>
      <Name />
      <Image clipPathL={clipPathL} clipPathR={clipPathR} />
      <Slider x={x} cursor={cursor} constraintsRef={constraintsRef} />
    </MotionStack>
  );
}
