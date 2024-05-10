import * as React from "react";
import { Portal } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { MotionStack } from "../../Motion";

function calcDimension() {
  const aspectRatio = 16 / 9;
  const minWidth = window.innerHeight * aspectRatio;
  let w, h, initScale;

  if (window.innerWidth >= minWidth) {
    w = window.innerWidth;
    h = w / aspectRatio;
    initScale = (window.innerHeight * 0.775) / h;
  } else {
    h = window.innerHeight;
    w = h * aspectRatio;
    initScale = (window.innerWidth * 0.75) / w;
  }

  const scale = w / 3840;
  const x = (window.innerWidth - w) / 2;
  const y = (window.innerHeight - h) / 2;

  return { x, y, scale, initScale };
}

function FullscreenImage({ src, name, dimension }) {
  const [cursor, setCursor] = React.useState("grab");
  const { x, y, scale } = dimension;

  return (
    <TransformWrapper
      initialPositionX={x}
      initialPositionY={y}
      minScale={scale}
      initialScale={scale}
      onPanning={() => setCursor("grabbing")}
      onPanningStop={() => setCursor("grab")}
    >
      <TransformComponent
        wrapperStyle={{ width: "100%", height: "100%", overflow: "visible" }}
        contentStyle={{ cursor }}
      >
        <motion.img src={src} alt={name}></motion.img>
      </TransformComponent>
    </TransformWrapper>
  );
}

export default function Fullscreen({ src, name, open, onClose }) {
  const dimension = calcDimension();

  const handleContextMenu = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onClose();
  };

  const sx = {
    position: "fixed",
    inset: 0,
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <MotionStack
            onContextMenu={handleContextMenu}
            initial={{ scale: dimension.initScale }}
            animate={{ scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", bounce: 0 }}
            sx={sx}
          >
            <FullscreenImage src={src} name={name} dimension={dimension} />
          </MotionStack>
        )}
      </AnimatePresence>
    </Portal>
  );
}
