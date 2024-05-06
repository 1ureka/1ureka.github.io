import * as React from "react";
import { useRecoilValue } from "recoil";
import { useSpring, useTransform } from "framer-motion";
import { BOOKS_ROWS, BOOKS_SELECTED } from "../../../utils/store";
import { MotionStack } from "../../Motion";
import SlidesImage from "../image/SlidesImage";

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
