import * as React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Box, Stack, ThemeProvider, Tooltip } from "@mui/material";
import { Radio, RadioGroup, Avatar, Button, Checkbox } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

import { darkTheme, lightTheme } from "../../utils/theme";
import { AUTH, LOGIN_OPEN } from "../../utils/store";
import Layout from "../../components/generic/Layout";
import Login from "../../components/login/Login";

const MotionStack = motion(Stack);

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

function Title() {
  return (
    <Stack direction="row" alignItems="center" sx={{ p: 2 }}>
      <ThemeProvider theme={lightTheme}>
        <Avatar sx={{ width: 80, height: 80 }} />
      </ThemeProvider>
    </Stack>
  );
}

function Radios() {
  const [val, setVal] = React.useState(0);

  const sizeSx = { "& .MuiSvgIcon-root": { fontSize: 22 } };

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

function MainButton() {
  const isAuth = useRecoilValue(AUTH);

  const variants = {
    initial: { opacity: 0, y: 70, transition: { duration: 0 } },
    exit: { opacity: 0, y: 70, transition: { duration: 0 } },
    animate: { opacity: 1, y: 0 },
  };

  const containerSx = {
    position: "absolute",
    alignSelf: "flex-start",
    bottom: darkTheme.spacing(3),
  };

  const containerProps = {
    variants: variants,
    sx: containerSx,
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  };

  const startIcon = isAuth ? (
    <MapRoundedIcon style={{ fontSize: 30 }} />
  ) : (
    <LockRoundedIcon style={{ fontSize: 30 }} />
  );

  const setOpen = useSetRecoilState(LOGIN_OPEN);
  const navigate = useNavigate();

  const handleClick = () => {
    if (isAuth) {
      navigate("/books");
    } else {
      setOpen(true);
    }
  };

  const buttonProps = {
    variant: "outlined",
    size: "large",
    sx: { ...darkTheme.typography.h5 },
    startIcon,
    onClick: handleClick,
  };

  return (
    <MotionStack {...containerProps}>
      <Button {...buttonProps}>{isAuth ? "Explore" : "Unlock"}</Button>
    </MotionStack>
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
          size="small"
        />
      </Tooltip>
      <Tooltip title={!isVisible ? "Show UI" : "Hide UI"} placement="left">
        <Checkbox
          icon={<VisibilityOffRoundedIcon />}
          checkedIcon={<VisibilityRoundedIcon />}
          onChange={handleVisible}
          size="small"
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

function ContentLayout({ align, children }) {
  return (
    <MotionStack
      variants={itemVariants}
      direction="row"
      justifyContent="flex-end"
      alignItems={align}
      sx={{ height: "calc(100% /3)" }}
    >
      {children}
    </MotionStack>
  );
}

function Content() {
  const transition = { staggerChildren: 0.1, delayChildren: 0.2 };
  const variants = { animate: { transition } };

  return (
    <MotionStack variants={variants} sx={{ height: "100%", zIndex: 1 }}>
      <ContentLayout align="flex-start">
        <Title />
      </ContentLayout>
      <ContentLayout align="center">
        <Radios />
      </ContentLayout>
      <ContentLayout align="flex-end">
        <Control />
      </ContentLayout>
      <MainButton />
    </MotionStack>
  );
}

export default function Cover() {
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
    <Layout exit={exit}>
      <ThemeProvider theme={darkTheme}>
        <Background />
        <Content />
        <Login />
      </ThemeProvider>
    </Layout>
  );
}
