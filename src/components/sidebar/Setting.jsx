import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AnimatePresence, motion } from "framer-motion";
import { Divider, Paper, Stack, Typography } from "@mui/material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import { darkTheme } from "../../utils/theme";
import { MODE, SIDEBAR_SETTING_OPEN } from "../../utils/store";

const MotionPaper = motion(Paper);
const MotionStack = motion(Stack);

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

function ThemeControl() {
  const settings = ["Light", "Dark", "System"];
  const buttonSx = { py: 1, fontSize: "0.65rem", flexGrow: 1 };

  const [mode, setMode] = useRecoilState(MODE);
  const handleChange = (_, mode) => {
    if (mode) setMode(mode);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={mode}
      exclusive
      onChange={handleChange}
      sx={{ width: "100%" }}
    >
      {settings.map((val) => (
        <ToggleButton key={val} value={val} sx={buttonSx}>
          {val}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export function Setting() {
  const variants = {
    initial: {
      opacity: 0,
      y: 60,
      transition: { duration: 0 },
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 160,
        damping: 18,
      },
    },
  };

  return (
    <MotionStack sx={{ width: "100%" }} gap={2} variants={variants}>
      <Divider flexItem />
      <Title title="Settings" />
      <SubTitle title="MODE" />
      <ThemeControl />
    </MotionStack>
  );
}

export function SettingPanel() {
  const open = useRecoilValue(SIDEBAR_SETTING_OPEN);

  const variants = {
    initial: {
      scale: 0,
      opacity: 0,
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.7,
      },
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.7,
        delayChildren: 0.2,
        staggerChildren: 0.05,
      },
    },
  };

  const borderColor = darkTheme.palette.divider;
  const containerSx = {
    position: "absolute",
    bottom: -10,
    left: "100%",
    p: 5,
    transformOrigin: "bottom left",
    borderRadius: "0 20px 0 0",
    border: `solid ${borderColor}`,
    borderWidth: "1px 1px 0px 1px",
  };

  return (
    <AnimatePresence>
      {open && (
        <MotionPaper
          variants={variants}
          initial="initial"
          animate="animate"
          exit="initial"
          sx={containerSx}
        >
          <Setting />
        </MotionPaper>
      )}
    </AnimatePresence>
  );
}
