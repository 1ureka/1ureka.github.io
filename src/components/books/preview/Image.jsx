import * as React from "react";
import { useRecoilValue } from "recoil";
import { motion } from "framer-motion";

import { BOOKS_ROWS, BOOKS_SELECTED } from "../../../utils/store";
import { useBooksImageDecode, useBooksImageLoad } from "../../../utils/hooks";
import Fullscreen from "./Fullscreen";

function useSelected() {
  const rows = useRecoilValue(BOOKS_ROWS);
  const selected = useRecoilValue(BOOKS_SELECTED);
  const { category, name } = rows[selected];
  return { category, name };
}

function Placeholder() {
  const style = { maxWidth: "75vw", maxHeight: "77.5vh", visibility: "hidden" };
  return <img style={style} src="./placeholder.jpg" alt="" />;
}

function Thumbnail() {
  const { category, name } = useSelected();
  const [src, state] = useBooksImageLoad(category, name, "1K");

  const imageStyle = {
    position: "absolute",
    display: "block",
    width: "100%",
    height: "100%",
    scale: "1.1",
    filter: "blur(5px) brightness(0.8)",
  };

  return state && <img style={imageStyle} src={src} alt={name} />;
}

const Origin = React.forwardRef(({ onClick }, ref) => {
  const { category, name } = useSelected();
  const [src, state] = useBooksImageDecode(category, name, "4K");

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

  const imageStyle = {
    position: "absolute",
    display: "block",
    width: "100%",
    height: "100%",
  };

  return (
    <motion.img
      ref={ref}
      variants={variants}
      animate={state ? "show" : "hide"}
      src={src}
      alt={name}
      onClick={() => state && onClick(src)}
      style={imageStyle}
    />
  );
});

function Container({ children }) {
  const transition = { type: "spring", bounce: 0, duration: 1 };
  const variants = {
    initial: { opacity: 0, scale: 1.1 },
    animate: { opacity: 1, scale: 1, transition },
    exit: { opacity: 0, scale: 1.1, transition },
  };

  const backdropStyle = {
    position: "fixed",
    inset: 0,
    display: "grid",
    placeItems: "center",
  };

  const containerStyle = {
    position: "relative",
    display: "grid",
    placeItems: "center",
    overflow: "clip",
  };

  return (
    <div style={backdropStyle}>
      <motion.div style={containerStyle} variants={variants}>
        {children}
      </motion.div>
    </div>
  );
}

export default function Image() {
  const ref = React.useRef(null);
  const [Props, setProps] = React.useState({
    src: "",
    open: false,
    originW: 1,
    originH: 1,
  });

  const handleClick = () => {
    const src = ref.current.src;
    const rect = ref.current.getBoundingClientRect();
    const originW = rect.width;
    const originH = rect.height;
    setProps({ src, open: true, originW, originH });
  };

  return (
    <Container>
      <Placeholder />
      <Thumbnail />
      <Origin ref={ref} onClick={handleClick} />
      <Fullscreen
        onClose={() => setProps((prev) => ({ ...prev, open: false }))}
        {...Props}
      />
    </Container>
  );
}
