import * as React from "react";
import { useRecoilValue } from "recoil";
import { Stack, Typography } from "@mui/material";
import { useSpring, useTransform } from "framer-motion";

import { BOOKS_ROWS, BOOKS_SELECTED } from "../../../utils/store";
import { MotionStack } from "../../Motion";
const bottom = "3%";

function Hint() {
  return (
    <MotionStack sx={{ position: "absolute", right: "10%", bottom }}>
      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        SCROLL TO DISCOVER MORE
      </Typography>
    </MotionStack>
  );
}

function Name() {
  const rows = useRecoilValue(BOOKS_ROWS);
  const selected = useRecoilValue(BOOKS_SELECTED);
  const { name } = rows[selected];
  return (
    <MotionStack
      sx={{
        position: "fixed",
        left: 0,
        right: 0,
        alignItems: "center",
        bottom,
      }}
    >
      <Typography>{name}</Typography>
    </MotionStack>
  );
}

function Word({ type, sx, children }) {
  const wordSx = {
    color: "text.secondary",
    fontFamily: `"Major Mono Display"`,
    lineHeight: "normal",
    ...sx,
  };

  const wordVariant = type === "big" ? "h2" : "h5";

  return (
    <Typography variant={wordVariant} component="span" sx={wordSx}>
      {children}
    </Typography>
  );
}

function Number({ type, index }) {
  const wordSx = {
    position: index !== 0 && "absolute",
    top: index !== 0 && `${index * 100}%`,
  };

  return (
    <Word type={type} sx={wordSx}>
      {index}
    </Word>
  );
}

function Numbers({ type, current }) {
  const spring = useSpring(0, { stiffness: 37, damping: 8, mass: 0.3 });
  const y = useTransform(spring, (latest) => `${latest}%`);

  React.useEffect(() => {
    spring.set(-current * 100);
  }, [current]);

  return (
    <Stack sx={{ position: "relative", overflow: "hidden" }}>
      <MotionStack style={{ y }}>
        {Array(10)
          .fill()
          .map((_, i) => (
            <Number key={i} type={type} index={i} />
          ))}
      </MotionStack>
    </Stack>
  );
}

function SlideIndicator() {
  const rows = useRecoilValue(BOOKS_ROWS);
  const selected = useRecoilValue(BOOKS_SELECTED) + 1;
  const current = selected.toString().padStart(3, "0").split("");
  const total = rows.length.toString().padStart(2, "0").split("");
  return (
    <MotionStack
      direction="row"
      alignItems="flex-end"
      sx={{ position: "absolute", left: "2%", bottom }}
    >
      <Numbers type="big" current={current[0]} />
      <Numbers type="big" current={current[1]} />
      <Numbers type="big" current={current[2]} />
      <Word type="big">{"/"}</Word>
      <Numbers type="small" current={total[0]} />
      <Numbers type="small" current={total[1]} />
    </MotionStack>
  );
}

export default function Info() {
  return (
    <>
      <Hint />
      <Name />
      <SlideIndicator />
    </>
  );
}
