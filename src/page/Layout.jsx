import { Stack } from "@mui/material";
import { motion } from "framer-motion";

const MotionStack = motion(Stack);

const variants = {
  initial: {
    opacity: 0,
    y: 100,
    transition: { duration: 0 },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 15,
    },
  },
  exit: {
    opacity: 0,
    y: 50,
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.5,
    },
  },
};

export default function Layout({ children, animate, exit }) {
  const _animate = animate ? animate : variants.animate;
  const _exit = exit ? exit : variants.exit;

  const containerSx = {
    position: "relative",
    py: 3,
    px: 5,
    height: "100%",
    flexGrow: 1,
  };

  return (
    <MotionStack
      variants={{ ...variants, exit: _exit, animate: _animate }}
      initial="initial"
      animate="animate"
      exit="exit"
      sx={containerSx}
    >
      {children}
    </MotionStack>
  );
}
