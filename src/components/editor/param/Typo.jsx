import { Typography } from "@mui/material";
import { MotionStack, toolsItemVar } from "../../Motion";

export function Title({ title, sx }) {
  return (
    <MotionStack variants={toolsItemVar}>
      <Typography variant="caption" sx={{ color: "text.secondary", ...sx }}>
        {title}
      </Typography>
    </MotionStack>
  );
}

export function SubTitle({ title }) {
  return (
    <MotionStack variants={toolsItemVar}>
      <Typography variant="caption">{title}</Typography>
    </MotionStack>
  );
}
