import * as React from "react";
import { Portal } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import Container from "./Container";

function FullscreenImage({ src, name }) {
  const [cursor, setCursor] = React.useState("grab");

  const aspectRatio = 16 / 9;
  const minWidth = window.innerHeight * aspectRatio;
  let w, h;

  if (window.innerWidth >= minWidth) {
    w = window.innerWidth;
    h = w / aspectRatio;
  } else {
    h = window.innerHeight;
    w = h * aspectRatio;
  }

  const scale = w / 3840;
  const x = (window.innerWidth - w) / 2;
  const y = (window.innerHeight - h) / 2;

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
        wrapperStyle={{
          position: "absolute",
          maxWidth: "100%",
          maxHeight: "100%",
        }}
        contentStyle={{ cursor }}
      >
        <motion.img src={src} alt={name} exit={{ opacity: 0 }}></motion.img>
      </TransformComponent>
    </TransformWrapper>
  );
}

export default function Fullscreen({ src, name, open, onClose }) {
  const [style, setStyle] = React.useState({});
  React.useEffect(() => {
    if (open) {
      setStyle({
        width: "100%",
        height: "100%",
        maxWidth: "100%",
        maxHeight: "100%",
      });
    } else {
      setStyle({});
    }
  }, [open]);

  const handleContextMenu = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onClose();
  };

  return (
    <Portal>
      <AnimatePresence mode="wait">
        {open && (
          <Container style={style} onContextMenu={handleContextMenu}>
            <FullscreenImage src={src} name={name} />
          </Container>
        )}
      </AnimatePresence>
    </Portal>
  );
}
