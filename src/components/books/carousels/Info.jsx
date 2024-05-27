import * as React from "react";
import { useSpring, useTransform } from "framer-motion";
import { useRecoilValue } from "recoil";
import { Stack, Typography } from "@mui/material";
import PhotoRoundedIcon from "@mui/icons-material/PhotoRounded";

import { BOOKS_ROWS, BOOKS_SELECTED } from "../../../utils/store";
import { MotionStack } from "../../Motion";
import { LeftClickIcon, RightClickIcon } from "./SvgIcons";

const bottom = "3%";
const top = "3%";
const left = "2%";

function MouseHint() {
  const flexProps = { direction: "row", alignItems: "ceter" };

  const containerSx = {
    position: "absolute",
    left,
    top,
    color: "text.secondary",
  };

  return (
    <Stack {...flexProps} sx={containerSx} gap={3.5}>
      <Stack {...flexProps} gap={1}>
        <RightClickIcon />
        <Typography variant="caption">exit</Typography>
      </Stack>
      <Stack {...flexProps} gap={1}>
        <LeftClickIcon />
        <PhotoRoundedIcon fontSize="small" />
        <Typography variant="caption">fullscreen</Typography>
      </Stack>
    </Stack>
  );
}

function ScrollHint() {
  return (
    <Stack sx={{ position: "absolute", right: "10%", bottom }}>
      <Typography variant="body2">SCROLL TO DISCOVER MORE</Typography>
    </Stack>
  );
}

function Name() {
  const rows = useRecoilValue(BOOKS_ROWS);
  const selected = useRecoilValue(BOOKS_SELECTED);
  const { name } = rows[selected];
  return (
    <Stack
      sx={{
        position: "fixed",
        left: 0,
        right: 0,
        alignItems: "center",
        bottom,
      }}
    >
      <Typography variant="h6">{name}</Typography>
    </Stack>
  );
}

function Word({ type, sx, children }) {
  const wordSx = {
    color: "text.secondary",
    fontFamily: `"Major Mono Display"`,
    lineHeight: "normal",
    ...sx,
  };

  const wordVariant = type === "big" ? "h2" : "h4";

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
    <Stack
      direction="row"
      alignItems="flex-end"
      sx={{ position: "absolute", left, bottom }}
    >
      <Numbers type="big" current={current[0]} />
      <Numbers type="big" current={current[1]} />
      <Numbers type="big" current={current[2]} />
      <Word type="big">{"/"}</Word>
      <Numbers type="small" current={total[0]} />
      <Numbers type="small" current={total[1]} />
    </Stack>
  );
}

export default function Info() {
  return (
    <>
      <MouseHint />
      <ScrollHint />
      <Name />
      <SlideIndicator />
    </>
  );
}
