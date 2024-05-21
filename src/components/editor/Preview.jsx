import * as React from "react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

import { EDITOR_DISPLAY, EDITOR_FILTER, EDITOR_INPUT } from "../../utils/store";
import { EDITOR_OUTPUT_SETTING, THEME } from "../../utils/store";
import { MotionStack, toolsItemVar } from "../Motion";
import { blobGetDataUrl, compressImage, createFilter } from "../../utils/utils";

const margin = "32px";

function Name() {
  const name = useRecoilValue(EDITOR_DISPLAY);
  const sx = { position: "absolute", top: "8px", left: "8px", zIndex: 1 };
  return (
    <Typography variant="caption" color="text.secondary" sx={sx}>
      {name}
    </Typography>
  );
}

function Origin({ clipPath }) {
  const name = useRecoilValue(EDITOR_DISPLAY);
  const files = useRecoilValue(EDITOR_INPUT);
  const file = files.find((file) => file.name === name);

  const [dataUrl, setDataUrl] = React.useState(null);
  React.useEffect(() => {
    if (file) {
      (async () => {
        const url = await blobGetDataUrl(file);
        setDataUrl(url);
      })();
    }
    return () => setDataUrl(null);
  }, [file]);

  if (dataUrl)
    return (
      <motion.img
        variants={toolsItemVar}
        src={dataUrl}
        alt={name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          clipPath,
        }}
      />
    );

  if (name) return <CircularProgress />;

  return null;
}

function Slider({ constraintsRef, x, cursor }) {
  const theme = useRecoilValue(THEME);
  const borderColor = theme.palette.divider;
  const bgColor = theme.palette.background.default;

  return (
    <Box sx={{ mx: margin, position: "absolute", inset: 0, zIndex: 1 }}>
      <motion.div
        drag="x"
        dragConstraints={constraintsRef}
        dragElastic={0}
        dragMomentum={false}
        onDragStart={() => cursor.set("none")}
        onDragEnd={() => cursor.set("pointer")}
        style={{
          position: "relative",
          left: "50%",
          height: "100%",
          width: "0px",
          border: `3px dashed ${borderColor}`,
          x,
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            translate: "-50% -50%",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            border: `3px ${borderColor} solid`,
            background: bgColor,
            cursor,
          }}
        ></motion.div>
      </motion.div>
    </Box>
  );
}

function useProcessImage() {
  const { maxSize, ...outputOpt } = useRecoilValue(EDITOR_OUTPUT_SETTING);
  const options = { maxSize: maxSize * 1024 * 1024, ...outputOpt };

  const fileName = useRecoilValue(EDITOR_DISPLAY);
  const files = useRecoilValue(EDITOR_INPUT);
  const file = files.find((file) => file.name === fileName);

  const [isProcess, setIsProcess] = React.useState(true);
  const [result, setResult] = React.useState(null);
  React.useEffect(() => {
    if (file)
      (async () => {
        const dataUrl = await compressImage(file, options);
        setResult(dataUrl);
        setIsProcess(false);
      })();
    return setIsProcess(true);
  }, [file, options]);

  const filterOpt = useRecoilValue(EDITOR_FILTER);
  const filter = createFilter(filterOpt);

  return { result, isProcess, filter };
}

function Result({ clipPath }) {
  const fileName = useRecoilValue(EDITOR_DISPLAY);
  const { result, isProcess, filter } = useProcessImage();

  if (!result) return null;

  return (
    <motion.img
      key={fileName}
      variants={toolsItemVar}
      src={result}
      alt={fileName}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        objectFit: "contain",
        filter,
        clipPath,
      }}
    />
  );
}

export default function Preview() {
  const theme = useRecoilValue(THEME);
  const color = theme.palette.divider;
  const border = `2px dashed ${color}`;

  const constraintsRef = React.useRef(null);
  const cursor = useMotionValue("pointer");
  const x = useMotionValue(-3);
  const clipPathL = useMotionTemplate`inset(0 calc(50% - ${x}px - 3px) 0 0)`;
  const clipPathR = useMotionTemplate`inset(0 0 0 calc(50% + ${x}px + 3px))`;

  return (
    <MotionStack
      ref={constraintsRef}
      variants={toolsItemVar}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        border,
        p: margin,
      }}
    >
      <Name />
      <Stack sx={{ position: "relative", width: "100%", height: "100%" }}>
        <Origin clipPath={clipPathL} />
        <Result clipPath={clipPathR} />
      </Stack>
      <Slider x={x} cursor={cursor} constraintsRef={constraintsRef} />
    </MotionStack>
  );
}
