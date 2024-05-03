import { motion } from "framer-motion";
import {
  ButtonBase,
  IconButton,
  Paper,
  Stack,
  TableBody,
  TableRow,
} from "@mui/material";

export const MotionPaper = motion(Paper);
export const MotionStack = motion(Stack);
export const MotionBody = motion(TableBody);
export const MotionRow = motion(TableRow);
export const MotionIconButton = motion(IconButton);
export const MotionButtonBase = motion(ButtonBase);

export function MotionPage({ children, animate, exit }) {
  const _initial = {
    opacity: 0,
    y: 100,
    transition: { duration: 0 },
  };

  let _animate = {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 150, damping: 15 },
  };
  if (animate) _animate = animate;

  let _exit = {
    opacity: 0,
    y: 50,
    transition: { type: "spring", bounce: 0, duration: 0.5 },
  };
  if (exit) _exit = exit;

  const sx = { position: "relative", py: 3, px: 5, height: "100%" };

  return (
    <MotionStack
      variants={{ initial: _initial, exit: _exit, animate: _animate }}
      initial="initial"
      animate="animate"
      exit="exit"
      sx={{ ...sx, flexGrow: 1 }}
    >
      {children}
    </MotionStack>
  );
}

export const orchestrationVar = ({ delay, stagger }) => ({
  animate: { transition: { delayChildren: delay, staggerChildren: stagger } },
});

export const coverItemVar = {
  initial: {
    opacity: 0,
    x: 70,
    transition: { duration: 0 },
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
  exit: {
    opacity: 0,
    x: 70,
    transition: { duration: 0 },
  },
};

export const booksItemVar = {
  initial: {
    opacity: 0,
    y: 70,
    transition: { duration: 0 },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
  exit: {
    opacity: 0,
    y: 70,
    transition: { duration: 0 },
  },
};

export const managerItemVar = {
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
      staggerChildren: 0.05,
      delayChildren: 0.15,
    },
  },
  exit: {
    opacity: 0,
    y: 50,
    transition: { duration: 0 },
  },
};

export const tableItemVar = {
  initial: {
    opacity: 0,
    x: -30,
    transition: { duration: 0 },
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
  exit: {
    opacity: 0,
    x: -30,
    transition: { duration: 0 },
  },
};

export const toolsItemVar = {
  initial: {
    opacity: 0,
    y: 70,
    transition: { duration: 0 },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      staggerChildren: 0.05,
      delayChildren: 0.15,
    },
  },
  exit: {
    opacity: 0,
    y: 70,
    transition: { duration: 0 },
  },
};
