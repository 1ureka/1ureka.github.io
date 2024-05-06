import { Stack } from "@mui/material";
import { motion } from "framer-motion";

const containerVar = {
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

const imageVar = {}; // 需要考慮AnimationPresence的情況

export default function CarouselsImage() {
  return (
    <Stack
      style={{
        position: "fixed",
        inset: 0,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <motion.div
        variants={containerVar}
        style={{ maxWidth: "75%", maxHeight: "77.5%", overflow: "hidden" }}
      >
        <motion.img
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
          }}
          src="https://fakeimg.pl/1920x1080/?text=こんにちは&font=noto"
          alt=""
        ></motion.img>
      </motion.div>
    </Stack>
  );
}
