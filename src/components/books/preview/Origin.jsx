import * as React from "react";
import { useRecoilValue } from "recoil";
import { motion } from "framer-motion";

import { BOOKS_ROWS, BOOKS_SELECTED } from "../../../utils/store";
import { useImageDecode } from "../../../utils/hooks";
import Fullscreen from "./Fullscreen";

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

  const containerSx = {
    position: "absolute",
    width: "100%",
    height: "100%",
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
      onClick={() => state && setFullscreen(true)}
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
