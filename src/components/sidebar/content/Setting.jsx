import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AnimatePresence } from "framer-motion";
import { Divider, Stack, Typography } from "@mui/material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import { darkTheme } from "../../../utils/theme";
import { BOOKS_FOLD, MODE, SIDEBAR_SETTING_OPEN } from "../../../utils/store";
import { MotionPaper, MotionStack } from "../../Motion";
import { sidebarRightVar, sidebarRightItemVar } from "../../Motion";

function Title({ title }) {
  return (
    <Typography variant="caption" sx={{ alignSelf: "center" }}>
      {title}
    </Typography>
  );
}

function SubTitle({ title }) {
  const sx = { color: "text.secondary", fontSize: "0.65rem" };
  return (
    <Typography variant="caption" sx={sx}>
      {title}
    </Typography>
  );
}

function Toggles({ options, value, onChange }) {
  const buttonSx = { py: 1, fontSize: "0.65rem", flexGrow: 1 };
  const handleChange = (_, mode) => {
    if (mode) onChange(mode);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={value}
      exclusive
      onChange={handleChange}
      sx={{ width: "100%" }}
    >
      {options.map((val) => (
        <ToggleButton key={val} value={val} sx={buttonSx}>
          {val}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

function ThemeControl() {
  const options = ["Light", "Dark", "System"];
  const [mode, setMode] = useRecoilState(MODE);
  return (
    <Toggles
      options={options}
      value={mode}
      onChange={(mode) => setMode(mode)}
    />
  );
}

function BooksDisplayControl() {
  const options = ["Fold", "Expand"];
  const [mode, setMode] = useRecoilState(BOOKS_FOLD);
  const value = mode ? "Fold" : "Expand";

  const handleChange = (mode) => {
    setMode(mode === "Fold");
  };

  return <Toggles options={options} value={value} onChange={handleChange} />;
}

function Content() {
  return (
    <Stack sx={{ width: "100%", alignItems: "flex-start" }} gap={2.5}>
      <MotionStack
        variants={sidebarRightItemVar}
        sx={{ width: "100%", alignItems: "center" }}
        gap={1.5}
      >
        <Divider flexItem />
        <Title title="Settings" />
      </MotionStack>
      <MotionStack variants={sidebarRightItemVar} sx={{ width: "100%" }}>
        <SubTitle title="MODE" />
        <ThemeControl />
      </MotionStack>
      <MotionStack variants={sidebarRightItemVar} sx={{ width: "100%" }}>
        <SubTitle title="BOOKS DISPLAY" />
        <BooksDisplayControl />
      </MotionStack>
    </Stack>
  );
}

export default function Setting() {
  const open = useRecoilValue(SIDEBAR_SETTING_OPEN);
  const borderColor = darkTheme.palette.divider;
  const containerSx = {
    position: "absolute",
    bottom: -10,
    left: "100%",
    p: 5,
    transformOrigin: "left",
    borderRadius: "0 20px 0 0",
    border: `solid ${borderColor}`,
    borderWidth: "1px 1px 0px 1px",
  };

  return (
    <AnimatePresence>
      {open && (
        <MotionPaper
          variants={sidebarRightVar}
          initial="initial"
          animate="animate"
          exit="initial"
          sx={containerSx}
        >
          <Content />
        </MotionPaper>
      )}
    </AnimatePresence>
  );
}
