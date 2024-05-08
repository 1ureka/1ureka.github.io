import * as React from "react";
import { useRecoilValue } from "recoil";
import { Portal } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import { BOOKS_ROWS, BOOKS_SELECTED } from "../../../utils/store";
import { useImageDecode } from "../../../utils/hooks";
import Container from "./Container";

function FullscreenImage({ src, name }) {
  const [cursor, setCursor] = React.useState("grab");

  return (
    <TransformWrapper
      initialPositionX={(window.innerWidth - 1920) / 2}
      initialPositionY={(window.innerHeight - 1080) / 2}
      minScale={0.5}
      initialScale={0.5}
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

function Fullscreen({ src, name, open, onClose }) {
  const [style, setStyle] = React.useState(null);
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

  const [fullscreen, setFullscreen] = React.useState(false);
  const handleClick = () => state && setFullscreen(true);

  const containerSx = {
    position: "absolute",
    width: "100%",
    height: "100%",
    cursor: "pointer",
  };

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
      onClick={handleClick}
    >
      <OriginImage src={src} name={name} />
      <Fullscreen
        src={src}
        name={name}
        open={fullscreen}
        onClose={() => setFullscreen(false)}
      />
    </motion.div>
  );
}
