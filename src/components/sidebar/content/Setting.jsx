import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AnimatePresence } from "framer-motion";
import { Divider, Stack, Typography } from "@mui/material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import { darkTheme } from "../../../utils/theme";
import { MODE, SIDEBAR_SETTING_OPEN } from "../../../utils/store";
import { MotionPaper, MotionStack } from "../../Motion";

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

function WindowControl() {
  const isFullscreen = () =>
    window.matchMedia("(display-mode: fullscreen)").matches ||
    window.document.fullscreenElement;

  const options = ["Yes", "No"];
  const [mode, setMode] = React.useState(isFullscreen() ? "Yes" : "No");

  const handleChange = (mode) => {
    setMode(mode);
    mode === "Yes"
      ? document.documentElement.requestFullscreen()
      : document.exitFullscreen();
  };

  React.useEffect(() => {
    const handleResize = () => setMode(isFullscreen() ? "Yes" : "No");
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <Toggles options={options} value={mode} onChange={handleChange} />;
}

function Content() {
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
        stiffness: 200,
        damping: 18,
      },
    },
  };

  return (
    <Stack
      sx={{ width: "100%", alignItems: "flex-start" }}
      gap={2.5}
      variants={variants}
    >
      <MotionStack
        variants={variants}
        sx={{ width: "100%", alignItems: "center" }}
        gap={1.5}
      >
        <Divider flexItem />
        <Title title="Settings" />
      </MotionStack>
      <MotionStack variants={variants} sx={{ width: "100%" }}>
        <SubTitle title="MODE" />
        <ThemeControl />
      </MotionStack>
      <MotionStack variants={variants} sx={{ width: "100%" }}>
        <SubTitle title="FULLSCREEN" />
        <WindowControl />
      </MotionStack>
    </Stack>
  );
}

export default function Setting() {
  const open = useRecoilValue(SIDEBAR_SETTING_OPEN);

  const variants = {
    initial: {
      scaleX: 0,
      opacity: 0,
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.7,
      },
    },
    animate: {
      scaleX: 1,
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
    transformOrigin: "left",
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
          <Content />
        </MotionPaper>
      )}
    </AnimatePresence>
  );
}