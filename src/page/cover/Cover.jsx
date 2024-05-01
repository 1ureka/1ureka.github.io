import * as React from "react";
import { Box, Stack, ThemeProvider, Tooltip } from "@mui/material";
import { Radio, RadioGroup, Avatar, Checkbox } from "@mui/material";
import { motion } from "framer-motion";

import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

import { darkTheme, lightTheme } from "../../utils/theme";
import Layout from "../../components/generic/Layout";

const MotionStack = motion(Stack);

function Title() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Avatar sx={{ width: 65, height: 65 }} />
    </ThemeProvider>
  );
}

function Radios() {
  const [val, setVal] = React.useState(0);

  const sizeSx = { "& .MuiSvgIcon-root": { fontSize: 20 } };

  return (
    <Tooltip title="Change Cover" placement="left">
      <RadioGroup value={val} onChange={({ target }) => setVal(target.value)}>
        {[0, 1, 2].map((i) => (
          <Radio key={i} value={i} sx={sizeSx} />
        ))}
      </RadioGroup>
    </Tooltip>
  );
}

function Control() {
  const [isPaused, setIsPaused] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);

  const handleAnimation = ({ target }) => {
    setIsPaused(target.checked);
  };

  const handleVisible = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <Stack spacing={0.5}>
      <Tooltip
        title={isPaused ? "Play Animation" : "Pause Animation"}
        placement="left"
      >
        <Checkbox
          icon={<PauseRoundedIcon />}
          checkedIcon={<PlayArrowRoundedIcon />}
          onChange={handleAnimation}
          sx={{ "& .MuiSvgIcon-root": { fontSize: 22 } }}
        />
      </Tooltip>
      <Tooltip title={!isVisible ? "Show UI" : "Hide UI"} placement="left">
        <Checkbox
          icon={<VisibilityOffRoundedIcon />}
          checkedIcon={<VisibilityRoundedIcon />}
          onChange={handleVisible}
          sx={{ "& .MuiSvgIcon-root": { fontSize: 22 } }}
          checked={!isVisible}
        />
      </Tooltip>
    </Stack>
  );
}

//
// Layout
function Background() {
  const imgStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    scale: "1.05",
  };

  const gradientSx = {
    ...imgStyle,
    background: "radial-gradient(transparent, transparent, rgb(0 0 0 / 0.55))",
  };
  return (
    <Box sx={{ position: "absolute", inset: 0 }}>
      <img src="./PJ28-2 とびら-1.webp" style={imgStyle} alt="" />
      <Box sx={gradientSx} />
    </Box>
  );
}

function ContentLayout({ justify, children }) {
  const itemVariants = {
    initial: { opacity: 0, x: 70, transition: { duration: 0 } },
    exit: { opacity: 0, x: 70, transition: { duration: 0 } },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  return (
    <MotionStack
      variants={itemVariants}
      justifyContent={justify}
      alignItems="flex-end"
      sx={{ height: "calc(100% /3)" }}
    >
      {children}
    </MotionStack>
  );
}

function Content() {
  const transition = { staggerChildren: 0.1, delayChildren: 0.2 };
  const variants = { animate: { transition } };

  const containerSx = {
    position: "absolute",
    top: 0,
    right: 0,
    p: 2,
    height: "100%",
    zIndex: 1,
  };

  return (
    <MotionStack variants={variants} sx={containerSx}>
      <ContentLayout justify="flex-start">
        <Title />
      </ContentLayout>
      <ContentLayout justify="center">
        <Radios />
      </ContentLayout>
      <ContentLayout justify="flex-end">
        <Control />
      </ContentLayout>
    </MotionStack>
  );
}

export default function Cover() {
  const animate = {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 110,
      damping: 15,
    },
  };

  const exit = {
    opacity: 0,
    scale: 1.5,
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.7,
    },
  };

  return (
    <Layout animate={animate} exit={exit}>
      <ThemeProvider theme={darkTheme}>
        <Background />
        <Content />
      </ThemeProvider>
    </Layout>
  );
}
