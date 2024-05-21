import { MotionStack, orchestrationVar, toolsItemVar } from "../Motion";

import Preview from "./Preview";
import InputArea from "./action/InputArea";
import Filter from "./param/Filter";
import Output from "./param/Output";

function Left() {
  return (
    <MotionStack
      variants={toolsItemVar}
      sx={{ width: "25%", height: "100%", py: 3, px: 4 }}
      gap={6}
    >
      <Filter />
      <Output />
    </MotionStack>
  );
}

function Mid() {
  return (
    <MotionStack
      variants={toolsItemVar}
      sx={{ width: "50%", height: "100%", p: 3 }}
    >
      <Preview />
    </MotionStack>
  );
}

function Right() {
  return (
    <MotionStack
      variants={toolsItemVar}
      sx={{ width: "25%", height: "100%", py: 3, px: 4 }}
    >
      <InputArea />
    </MotionStack>
  );
}

export default function Editor() {
  const variants = orchestrationVar({ delay: 0, stagger: 0.15 });

  return (
    <MotionStack direction="row" variants={variants} sx={{ height: "100%" }}>
      <Left />
      <Mid />
      <Right />
    </MotionStack>
  );
}
