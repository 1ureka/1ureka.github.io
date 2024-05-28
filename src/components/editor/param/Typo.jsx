import { Typography } from "@mui/material";
import { MotionStack, toolsItemVar } from "../../Motion";

export function Title({ title, sx }) {
  return (
    <MotionStack variants={toolsItemVar}>
      <Typography variant="subTitle2" sx={sx}>
        {title}
      </Typography>
    </MotionStack>
  );
}

export function SubTitle({ title }) {
  return (
    <MotionStack variants={toolsItemVar}>
      <Typography>{title}</Typography>
    </MotionStack>
  );
}
