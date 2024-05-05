import { Typography } from "@mui/material";
import { MotionStack } from "../../Motion";

const bottom = "3%";

function Hint() {
  return (
    <MotionStack sx={{ position: "absolute", right: "10%", bottom }}>
      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        SCROLL TO DISCOVER MORE
      </Typography>
    </MotionStack>
  );
}

function Name() {
  return (
    <MotionStack
      sx={{
        position: "fixed",
        left: 0,
        right: 0,
        alignItems: "center",
        bottom,
      }}
    >
      <Typography>Image Name 01</Typography>
    </MotionStack>
  );
}

function SlideIndicator() {
  return (
    <MotionStack
      direction="row"
      alignItems="flex-end"
      sx={{ position: "absolute", left: "2%", bottom }}
    >
      <Typography
        variant="h2"
        component="span"
        sx={{ color: "text.secondary" }}
      >
        0
      </Typography>
      <Typography
        variant="h2"
        component="span"
        sx={{ color: "text.secondary" }}
      >
        0
      </Typography>
      <Typography
        variant="h2"
        component="span"
        sx={{ color: "text.secondary" }}
      >
        1
      </Typography>
    </MotionStack>
  );
}

export default function Info() {
  return (
    <>
      <Hint />
      <Name />
      <SlideIndicator />
    </>
  );
}
