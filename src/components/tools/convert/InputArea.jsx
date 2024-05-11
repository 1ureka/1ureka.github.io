import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { CONVERT_INPUT, THEME } from "../../../utils/store";
import { MotionStack, toolsItemVar } from "../../Motion";

export default function InputArea() {
  const theme = useRecoilValue(THEME);
  const [input, setInput] = useRecoilState(CONVERT_INPUT);

  const handleClick = () => {};

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
