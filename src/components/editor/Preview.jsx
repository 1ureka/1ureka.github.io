import { Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { THEME } from "../../utils/store";
import { MotionStack, toolsItemVar } from "../Motion";

function Name() {
  const sx = { position: "absolute", top: "8px", left: "8px", zIndex: 1 };
  return (
    <Typography variant="caption" color="text.secondary" sx={sx}>
      Image Name.jpg
    </Typography>
  );
}

export default function Preview() {
  const theme = useRecoilValue(THEME);
  const color = theme.palette.divider;
  const border = `2px dashed ${color}`;

  return (
    <MotionStack
      variants={toolsItemVar}
      sx={{ position: "relative", width: "100%", height: "100%", border }}
    >
      <Name />
    </MotionStack>
  );
}
