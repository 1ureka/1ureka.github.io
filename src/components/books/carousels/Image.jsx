import { useRecoilValue } from "recoil";
import { Stack } from "@mui/material";
import { motion } from "framer-motion";

import { BOOKS_ROWS, BOOKS_SELECTED } from "../../../utils/store";
import { useImageLoad } from "../../../utils/hooks";

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

function Placeholder() {
  return (
    <img
      style={{ maxWidth: "100%", maxHeight: "100%", visibility: "hidden" }}
      src="https://fakeimg.pl/1920x1080/"
      alt=""
    ></img>
  );
}

function Thumbnail() {
  const rows = useRecoilValue(BOOKS_ROWS);
  const selected = useRecoilValue(BOOKS_SELECTED);
  const { category, name } = rows[selected];
  const [src, state] = useImageLoad(category, name, "1K");

  const sx = {
    position: "absolute",
    width: "100%",
    height: "100%",
    scale: "1.1",
    filter: "blur(10px)",
  };

  return state && <img style={sx} src={src} alt={name}></img>;
}

function Origin() {
  const rows = useRecoilValue(BOOKS_ROWS);
  const selected = useRecoilValue(BOOKS_SELECTED);
  const { category, name } = rows[selected];
  const [src, state] = useImageLoad(category, name, "4K");

  return;
}

export default function Image() {
  const containerSx = {
    position: "fixed",
    inset: 0,
    justifyContent: "center",
    alignItems: "center",
  };

  const imageContainerSx = {
    display: "flex",
    alignItems: "center",
    position: "relative",
    maxWidth: "75%",
    maxHeight: "77.5%",
    overflow: "hidden",
  };

  return (
    <Stack style={containerSx}>
      <motion.div variants={containerVar} style={imageContainerSx}>
        <Placeholder />
        <Thumbnail />
        <Origin />
      </motion.div>
    </Stack>
  );
}
