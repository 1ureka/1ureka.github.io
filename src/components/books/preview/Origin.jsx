import * as React from "react";
import { useRecoilValue } from "recoil";
import { motion } from "framer-motion";
import { Stack, Typography } from "@mui/material";
import ZoomInRoundedIcon from "@mui/icons-material/ZoomInRounded";

import { BOOKS_ROWS, BOOKS_SELECTED } from "../../../utils/store";
import { useImageDecode } from "../../../utils/hooks";
import { MotionStack } from "../../Motion";
import Fullscreen from "./Fullscreen";

function HoverHint({ open }) {
  const sx = {
    position: "absolute",
    inset: 0,
    p: 3,
    justifyContent: "flex-start",
    alignItems: "center",
    filter: "drop-shadow(0 0 10px black)",
  };

  const variants = {
    show: { transition: { delayChildren: 0.1, staggerChildren: 0.05 } },
  };
  const itemVar = {
    show: { opacity: 1, y: 0 },
    hide: { opacity: 0, y: 50 },
  };

  return (
    <MotionStack sx={sx} variants={variants} animate={open ? "show" : "hide"}>
      <Stack direction="row" alignItems="center" color={"#fff"}>
        <MotionStack variants={itemVar}>
          <ZoomInRoundedIcon sx={{ mr: 1 }} />
        </MotionStack>
        <MotionStack variants={itemVar}>
          <Typography variant="caption" sx={{ fontSize: "0.65rem" }}>
            Click to Zoom
          </Typography>
        </MotionStack>
      </Stack>
    </MotionStack>
  );
}

function useSelected() {
  const rows = useRecoilValue(BOOKS_ROWS);
  const selected = useRecoilValue(BOOKS_SELECTED);
  const { category, name } = rows[selected];
  return { category, name };
}

function OriginImage({ src, name }) {
  const style = { width: "100%", height: "100%", objectFit: "cover" };
  return <img src={src} alt={name} style={style}></img>;
}

export default function Origin() {
  const { category, name } = useSelected();
  const [src, state] = useImageDecode(category, name, "4K");

  const [hover, setHover] = React.useState(false);
  const [fullscreen, setFullscreen] = React.useState(false);

  const containerSx = { position: "absolute", width: "100%", height: "100%" };

  const variants = {
    show: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", bounce: 0, duration: 1.5 },
    },
    hide: {
      opacity: 0,
      scale: 1.1,
      transition: { type: "spring", bounce: 0 },
    },
  };

  return (
    <motion.div
      variants={variants}
      animate={state ? "show" : "hide"}
      style={containerSx}
      onClick={() => state && setFullscreen(true)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <OriginImage src={src} name={name} />
      <HoverHint open={hover} />
      <Fullscreen
        src={src}
        name={name}
        open={fullscreen}
        onClose={() => setFullscreen(false)}
      />
    </motion.div>
  );
}
