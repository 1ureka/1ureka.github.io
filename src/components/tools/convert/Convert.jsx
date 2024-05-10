import * as React from "react";
import { useRecoilValue } from "recoil";
import { Divider, Stack, Typography } from "@mui/material";

import { THEME } from "../../../utils/store";
import { MotionPaper, MotionStack, toolsItemVar } from "../../Motion";
import SplitButton from "./SplitButton";
import NumberInput from "./NumberInput";

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

function InputArea() {
  const theme = useRecoilValue(THEME);

  return (
    <MotionStack
      variants={toolsItemVar}
      sx={{
        width: "100%",
        aspectRatio: "1/1",
        borderRadius: "10px",
        border: "3px dotted gray",
        bgcolor: theme.palette.divider,
        cursor: "pointer",
      }}
    ></MotionStack>
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
