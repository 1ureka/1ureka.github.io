import { Stack } from "@mui/material";

import Param from "./Param";
import Preview from "./Preview";
import InputArea from "./InputArea";

function Left() {
  return (
    <Stack sx={{ width: "25%", height: "100%", py: 3, px: 4 }} gap={6}>
      <Param />
    </Stack>
  );
}

function Mid() {
  return (
    <Stack sx={{ width: "50%", height: "100%", p: 3 }}>
      <Preview />
    </Stack>
  );
}

function Right() {
  return (
    <Stack sx={{ width: "25%", height: "100%", py: 3, px: 4 }}>
      <InputArea />
    </Stack>
  );
}

export default function Editor() {
  return (
    <Stack direction="row" sx={{ height: "100%" }}>
      <Left />
      <Mid />
      <Right />
    </Stack>
  );
}