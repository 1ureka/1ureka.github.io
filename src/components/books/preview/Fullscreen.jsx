import * as React from "react";
import { Portal } from "@mui/material";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

function calcScale(originW, originH) {
  const containerRatio = window.innerWidth / window.innerHeight;
  const imageRatio = originW / originH;

  let initScale, w, h;
  if (containerRatio > imageRatio) {
    w = window.innerWidth;
    h = w / imageRatio;
    initScale = originW / w;
  } else {
    h = window.innerHeight;
    w = h * imageRatio;
    initScale = originH / h;
  }

  return { initScale, w, h };
}

function FullscreenImage({ src, originW, originH, pointerEvents }) {
  const { initScale, w, h } = calcScale(originW, originH);
  const [cursor, setCursor] = React.useState("grab");

  return (
    <TransformWrapper
      centerOnInit
      onPanningStart={() => setCursor("grabbing")}
      onPanningStop={() => setCursor("grab")}
    >
      <TransformComponent
        wrapperStyle={{ overflow: "visible", width: "100vw", height: "100vh" }}
        contentStyle={{ cursor }}
      >
        <motion.img
          initial={{ scale: initScale }}
          animate={{ scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", bounce: 0 }}
          src={src}
          alt=""
          style={{ width: w, height: h }}
          onAnimationStart={(def) => {
            if (def.opacity === 0) {
              pointerEvents.set("none");
            } else {
              pointerEvents.set("");
            }
          }}
        />
      </TransformComponent>
    </TransformWrapper>
  );
}

export default function Fullscreen({ src, originW, originH, open, onClose }) {
  const pointerEvents = useMotionValue("");

  const handleContextMenu = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onClose();
  };

  const style = {
    position: "fixed",
    inset: 0,
    display: "grid",
    placeItems: "center",
    pointerEvents,
  };

  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <motion.div onContextMenu={handleContextMenu} style={style}>
            <FullscreenImage
              src={src}
              originW={originW}
              originH={originH}
              pointerEvents={pointerEvents}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
