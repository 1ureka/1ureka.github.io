import { useRef, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { Box, Portal } from "@mui/material";

import { useBooksImageDecode, useBooksImageLoad } from "../../../utils/hooks";
import { MotionBox } from "../../../components/Motion";

const originVar = {
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

export default function BooksCarouselsImage({ category, name }) {
  const [src1K, state1K] = useBooksImageLoad(category, name, "1K");
  const [src4K, state4K] = useBooksImageDecode(category, name, "4K");

  const [cursor, setCursor] = useState("grab");
  const pointerEvents = useMotionValue("");
  const ref = useRef(null);
  const [Props, setProps] = useState({
    src: "",
    open: false,
    initScale: 1,
    w: 1,
    h: 1,
  });

  const handleEnterFull = () => {
    const src = ref.current.src;
    const rect = ref.current.getBoundingClientRect();
    const originW = rect.width;
    const originH = rect.height;
    const { initScale, w, h } = calcScale(originW, originH);
    setProps({ src, open: true, initScale, w, h });
  };

  const handleExitFull = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setProps((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ position: "absolute", inset: 0 }}>
      {state1K && (
        <img
          src={src1K}
          alt={name}
          style={{
            display: "block",
            position: "absolute",
            width: "100%",
            height: "100%",
            scale: "1.1",
            filter: "blur(5px) brightness(0.8)",
          }}
        />
      )}

      <motion.img
        ref={ref}
        variants={originVar}
        animate={state4K ? "show" : "hide"}
        src={src4K}
        alt={name}
        onClick={() => state4K && handleEnterFull()}
        style={{
          display: "block",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      />

      <Portal>
        <AnimatePresence>
          {Props.open && (
            <MotionBox
              onContextMenu={handleExitFull}
              position="fixed"
              sx={{ inset: 0, display: "grid", placeItems: "center" }}
              style={{ pointerEvents }}
            >
              <TransformWrapper
                centerOnInit
                onPanningStart={() => setCursor("grabbing")}
                onPanningStop={() => setCursor("grab")}
              >
                <TransformComponent
                  wrapperStyle={{ width: "100vw", height: "100vh" }}
                  contentStyle={{ cursor }}
                >
                  <motion.img
                    style={{ width: Props.w, height: Props.h }}
                    initial={{ scale: Props.initScale }}
                    animate={{ scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", bounce: 0 }}
                    src={Props.src}
                    alt=""
                    onAnimationStart={(def) =>
                      def.opacity === 0
                        ? pointerEvents.set("none")
                        : pointerEvents.set("")
                    }
                  />
                </TransformComponent>
              </TransformWrapper>
            </MotionBox>
          )}
        </AnimatePresence>
      </Portal>
    </Box>
  );
}
