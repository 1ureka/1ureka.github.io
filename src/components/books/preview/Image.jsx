import { Stack } from "@mui/material";
import { motion } from "framer-motion";

import Thumbnail from "./Thumbnail";
import Origin from "./Origin";

function Placeholder() {
  return (
    <img
      style={{ maxWidth: "100%", maxHeight: "100%", visibility: "hidden" }}
      src="https://fakeimg.pl/1920x1080/"
      alt=""
    ></img>
  );
}

function Backdrop({ children }) {
  const sx = {
    position: "fixed",
    inset: 0,
    justifyContent: "center",
    alignItems: "center",
  };

  return <Stack style={sx}>{children}</Stack>;
}

function Container({ children, variants }) {
  const sx = {
    display: "flex",
    alignItems: "center",
    position: "relative",
    maxWidth: "75%",
    maxHeight: "77.5%",
    overflow: "hidden",
  };

  return (
    <Backdrop>
      <motion.div style={sx} variants={variants}>
        <Placeholder />
        {children}
      </motion.div>
    </Backdrop>
  );
}

export default function Image() {
  const variants = {
    initial: {
      opacity: 0,
      scale: 1.1,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", bounce: 0, duration: 1 },
    },
    exit: {
      opacity: 0,
      scale: 1.1,
      transition: { type: "spring", bounce: 0, duration: 1 },
    },
  };

  return (
    <Container variants={variants}>
      <Thumbnail />
      <Origin />
    </Container>
  );
}
