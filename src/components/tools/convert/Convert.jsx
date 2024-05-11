import * as React from "react";
import { Divider, Stack, Typography } from "@mui/material";

import { MotionPaper, MotionStack, toolsItemVar } from "../../Motion";
import SplitButton from "./SplitButton";
import NumberInput from "./NumberInput";
import InputArea from "./InputArea";

function Title() {
  return (
    <MotionStack variants={toolsItemVar}>
      <Typography variant="h6" sx={{ mx: 2 }} color="primary">
        Image Conversion
      </Typography>
    </MotionStack>
  );
}

function Operation() {
  return (
    <MotionStack
      variants={toolsItemVar}
      direction="row"
      justifyContent="space-between"
      width="100%"
      gap={1}
    >
      <NumberInput />
      <SplitButton />
    </MotionStack>
  );
}

export default function Convert() {
  return (
    <MotionPaper variants={toolsItemVar} sx={{ p: 3 }} elevation={3}>
      <Stack alignItems="center" gap={2}>
        <Title />
        <Divider flexItem />
        <InputArea />
        <Operation />
      </Stack>
    </MotionPaper>
  );
}
