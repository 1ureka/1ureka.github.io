import { Avatar, Backdrop, Paper, Stack } from "@mui/material";
import { ThemeProvider, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useRecoilState, useRecoilValue } from "recoil";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

import { LOGIN_OPEN, THEME } from "../../utils/store";
import { darkTheme } from "../../utils/theme";
import LoginForm from "./Form";

const MotionPaper = motion(Paper);
const MotionStack = motion(Stack);

const itemVariants = {
  initial: { opacity: 0, y: 70, transition: { duration: 0 } },
  exit: { opacity: 0, y: 70, transition: { duration: 0 } },
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

function Title() {
  return (
    <MotionStack variants={itemVariants} alignItems={"center"}>
      <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
        <LockRoundedIcon />
      </Avatar>
      <Typography variant="h5">Unlock</Typography>
    </MotionStack>
  );
}

function Container() {
  const open = useRecoilValue(LOGIN_OPEN);

  const transition = {
    type: "spring",
    stiffness: 200,
    damping: 18,
  };
  const variants = {
    initial: { scale: 0.5, y: 100, opacity: 0, transition },
    animate: {
      scale: 0.85,
      y: 0,
      opacity: 1,
      transition: { ...transition, staggerChildren: 0.05, delayChildren: 0.15 },
    },
  };

  const containerSx = {
    position: "absolute",
    width: "calc(100% - 64px)",
    maxWidth: "600px",
    border: `solid 1px ${darkTheme.palette.divider}`,
    borderRadius: "15px",
    zIndex: darkTheme.zIndex.drawer,
    py: 5,
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
          <Stack sx={{ px: 10 }} alignItems={"center"}>
            <Title />
            <LoginForm />
          </Stack>
        </MotionPaper>
      )}
    </AnimatePresence>
  );
}

export default function Login() {
  const [open, setOpen] = useRecoilState(LOGIN_OPEN);
  const theme = useRecoilValue(THEME);

  const backdropSx = {
    zIndex: darkTheme.zIndex.drawer,
    backdropFilter: "blur(5px)",
  };

  const handleClose = ({ target }) => {
    const classList = Array.from(target.classList);
    if (classList.includes("b")) setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Backdrop open={open} onClick={handleClose} sx={backdropSx} className="b">
        <Container />
      </Backdrop>
    </ThemeProvider>
  );
}
