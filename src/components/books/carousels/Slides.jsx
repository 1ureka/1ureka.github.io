import * as React from "react";
import { useRecoilValue } from "recoil";
import { useSpring, useTransform, motion } from "framer-motion";
import { Skeleton } from "@mui/material";

import { BOOKS_ROWS, BOOKS_SELECTED } from "../../../utils/store";
import { useImageLoad } from "../../../utils/hooks";
import { MotionStack } from "../../Motion";

const containerVar = {
  initial: {
    opacity: 0,
    x: "30%",
  },
  animate: {
    opacity: 1,
    x: "0%",
    transition: { type: "spring", bounce: 0, duration: 1 },
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: { type: "spring", bounce: 0, duration: 1 },
  },
};

function SlidesImage({ category, name, selected }) {
  const [src, state] = useImageLoad(category, name, "1K");

  const size = { width: "100%", height: "auto", aspectRatio: "16/9" };
  const imageSX = {
    borderRadius: "5px",
    objectFit: "cover",
    ...size,
  };
  const containerSx = {
    position: "relative",
    translate: "0 -50%",
    transformOrigin: "right",
  };

  const variants = {
    selected: { opacity: 1, scale: 0.9 },
    unSelected: { opacity: 0.85, scale: 0.65 },
  };
  const animate = selected ? "selected" : "unSelected";

  return (
    <motion.div variants={variants} animate={animate} style={containerSx}>
      {state ? (
        <img src={src} alt={`Thumbnail of ${name}`} style={imageSX} />
      ) : (
        <Skeleton animation="wave" variant="rounded" sx={size} />
      )}
    </motion.div>
  );
}

export default function Slides() {
  const rows = useRecoilValue(BOOKS_ROWS);
  const selected = useRecoilValue(BOOKS_SELECTED);

  const spring = useSpring(0, { stiffness: 110, damping: 22 });
  const y = useTransform(
    spring,
    (latest) => `calc(50vh + (-100% / ${rows.length}) * ${latest})`
  );

  React.useEffect(() => {
    spring.set(selected);
  }, [selected]);

  return (
    <MotionStack
      variants={containerVar}
      style={{ y }}
      sx={{ position: "absolute", right: "1%", top: 0, width: "12.5%" }}
    >
      {rows.map(({ category, name }, i) => (
        <SlidesImage
          key={name}
          category={category}
          name={name}
          selected={i === selected}
        />
      ))}
    </MotionStack>
  );
}
