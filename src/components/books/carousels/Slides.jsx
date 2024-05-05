import { MotionStack } from "../../Motion";

export default function Slides() {
  // maxWidth: 12.5%
  // selected scale: 1, un scale: 0.6
  return (
    <MotionStack
      sx={{ position: "absolute", right: 0, width: "12.5%", height: "100%" }}
    ></MotionStack>
  );
}
