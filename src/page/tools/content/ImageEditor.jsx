import { useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";

import { MotionBox, MotionStack } from "../../../components/Motion";
import { orchestrationVar, toolsItemVar } from "../../../components/Motion";
import { NumberInput, SelectInput } from "../../../components/editor";
import { FilterSlider, InputArea, Table } from "../../../components/editor";

import { createFilter } from "../../../utils/utils";
import { EDITOR_FILTER } from "../../../utils/store";
import { EDITOR_INPUT, EDITOR_OUTPUT } from "../../../utils/store";
import { useBlob, useDecode, useEditorPreview } from "../../../utils/hooks";

function EditingOptions() {
  const [{ saturate, contrast, exposure }, setFilter] =
    useRecoilState(EDITOR_FILTER);

  const handleSaturate = (_, val) =>
    setFilter((prev) => ({ ...prev, saturate: val }));
  const handleContrast = (_, val) =>
    setFilter((prev) => ({ ...prev, contrast: val }));
  const handleExposure = (_, val) =>
    setFilter((prev) => ({ ...prev, exposure: val }));

  const [{ maxSize, scale, type }, setOutput] = useRecoilState(EDITOR_OUTPUT);

  const handleMaxSize = ({ target }) => {
    const { value } = target;
    const parsedValue = parseFloat(value);
    if (!value || parsedValue < 1 || parsedValue > 999) return;
    setOutput((prev) => ({ ...prev, maxSize: parsedValue }));
  };
  const handleScale = ({ target }) => {
    const { value } = target;
    const parsedValue = parseFloat(value);
    if (!value || parsedValue < 0.1 || parsedValue > 1.5) return;
    setOutput((prev) => ({ ...prev, scale: parsedValue }));
  };
  const handleType = ({ target }) => {
    if (!target.value) return;
    setOutput((prev) => ({ ...prev, type: target.value }));
  };

  return (
    <Stack spacing={6} sx={{ height: "100%", py: 3, px: 4 }}>
      <Stack spacing={1}>
        <MotionStack variants={toolsItemVar}>
          <Typography variant="subTitle2" sx={{ mb: 1 }}>
            FILTER:
          </Typography>
        </MotionStack>

        <MotionStack variants={toolsItemVar}>
          <Typography>saturation</Typography>
          <FilterSlider value={saturate} onChange={handleSaturate} />
        </MotionStack>

        <MotionStack variants={toolsItemVar}>
          <Typography>contrast</Typography>
          <FilterSlider value={contrast} onChange={handleContrast} />
        </MotionStack>

        <MotionStack variants={toolsItemVar}>
          <Typography>exposure</Typography>
          <FilterSlider value={exposure} onChange={handleExposure} />
        </MotionStack>
      </Stack>

      <Stack spacing={1}>
        <MotionStack variants={toolsItemVar}>
          <Typography variant="subTitle2" sx={{ mb: 1 }}>
            OUTPUT:
          </Typography>
        </MotionStack>

        <Box
          display="grid"
          sx={{ gridTemplateColumns: "0.6fr 1.2fr", alignItems: "center" }}
          gap={1.5}
        >
          <MotionStack variants={toolsItemVar}>
            <Typography>max size</Typography>
          </MotionStack>
          <MotionStack variants={toolsItemVar}>
            <NumberInput
              end={"MB"}
              inputProps={{ min: "1", max: "999", step: "1" }}
              value={maxSize}
              onChange={handleMaxSize}
            />
          </MotionStack>

          <MotionStack variants={toolsItemVar}>
            <Typography>scale</Typography>
          </MotionStack>
          <MotionStack variants={toolsItemVar}>
            <NumberInput
              end={"x"}
              inputProps={{ min: "0.1", max: "1.5", step: "0.1" }}
              value={scale}
              onChange={handleScale}
            />
          </MotionStack>

          <MotionStack variants={toolsItemVar}>
            <Typography>file type</Typography>
          </MotionStack>
          <MotionStack variants={toolsItemVar}>
            <SelectInput
              options={[
                { name: "webp", val: "webp" },
                { name: "jpg", val: "jpeg" },
                { name: "png", val: "png" },
              ]}
              value={type}
              onChange={handleType}
            />
          </MotionStack>
        </Box>
      </Stack>
    </Stack>
  );
}

function EditingPreview() {
  const constraintsRef = useRef(null);
  const cursor = useMotionValue("pointer");
  const x = useMotionValue(-3);
  const clipPathL = useMotionTemplate`inset(0 calc(50% - ${x}px - 3px) 0 0)`;
  const clipPathR = useMotionTemplate`inset(0 0 0 calc(50% + ${x}px + 3px))`;

  const input = useRecoilValue(EDITOR_INPUT);
  const file = input.find((item) => item.display)?.file;
  const name = input.find((item) => item.display)?.file.name;

  const [originUrl, originUrlState] = useBlob(file);
  const [originSrc, originState] = useDecode(originUrlState && originUrl);
  const [resultUrl, resultUrlState] = useEditorPreview(file);
  const [resultSrc, resultState] = useDecode(resultUrlState && resultUrl);
  const state = originState && resultState;

  const filterOpt = useRecoilValue(EDITOR_FILTER);
  const filter = createFilter(filterOpt);

  return (
    <Box sx={{ p: 3, height: "100%" }}>
      <Box
        position="relative"
        ref={constraintsRef}
        sx={{
          height: "100%",
          border: 2,
          borderColor: "divider",
          borderStyle: "dashed",
          p: 4,
        }}
      >
        <Typography
          variant="caption"
          sx={{ position: "absolute", inset: "0 auto auto 0", p: 1, zIndex: 1 }}
        >
          {name}
        </Typography>

        <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
          {originState && (
            <motion.img
              variants={toolsItemVar}
              src={originSrc}
              alt={""}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                clipPath: clipPathL,
              }}
            />
          )}
          {resultState && (
            <motion.img
              variants={toolsItemVar}
              src={resultSrc}
              alt={""}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
                clipPath: clipPathR,
                filter,
              }}
            />
          )}
        </Box>
        {file && !state && (
          <LinearProgress
            sx={{ position: "absolute", inset: "auto 0 0 0", width: "100%" }}
          />
        )}

        <Box sx={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <MotionBox
            drag="x"
            dragConstraints={constraintsRef}
            dragElastic={0}
            dragMomentum={false}
            onDragStart={() => cursor.set("none")}
            onDragEnd={() => cursor.set("pointer")}
            style={{ x }}
            sx={{
              position: "relative",
              left: "50%",
              height: "100%",
              width: "0px",
              border: 3,
              borderColor: "divider",
              borderStyle: "dashed",
            }}
          >
            <MotionBox
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                translate: "-50% -50%",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: 3,
                borderColor: "divider",
                borderStyle: "solid",
                bgcolor: "background.default",
              }}
              style={{ cursor }}
            />
          </MotionBox>
        </Box>
      </Box>
    </Box>
  );
}

export default function ImageEditor() {
  return (
    <MotionStack
      variants={orchestrationVar({ delay: 0, stagger: 0.15 })}
      direction="row"
      sx={{ height: "100%" }}
    >
      <MotionBox variants={toolsItemVar} sx={{ width: "25%", height: "100%" }}>
        <EditingOptions />
      </MotionBox>

      <MotionBox variants={toolsItemVar} sx={{ width: "50%", height: "100%" }}>
        <EditingPreview />
      </MotionBox>

      <MotionStack
        variants={toolsItemVar}
        sx={{ width: "25%", height: "100%", py: 3, px: 4 }}
        spacing={3}
      >
        <InputArea />
        <Table />
      </MotionStack>
    </MotionStack>
  );
}
