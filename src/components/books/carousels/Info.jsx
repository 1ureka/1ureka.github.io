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
  const wordSx = {
    color: "text.secondary",
    fontFamily: `"Major Mono Display"`,
    lineHeight: "normal",
  };
  const bigWord = (word) => (
    <Typography variant="h2" component="span" sx={wordSx}>
      {word}
    </Typography>
  );
  const smallWord = (word) => (
    <Typography variant="h5" component="span" sx={wordSx}>
      {word}
    </Typography>
  );

  return (
    <MotionStack
      direction="row"
      alignItems="flex-end"
      sx={{ position: "absolute", left: "2%", bottom }}
    >
      {bigWord(0)}
      {bigWord(0)}
      {bigWord(1)}
      {bigWord("/")}
      {smallWord(3)}
      {smallWord(4)}
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
