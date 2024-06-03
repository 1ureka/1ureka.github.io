import { motion } from "framer-motion";

import {
  Box,
  ButtonBase,
  IconButton,
  Paper,
  Stack,
  TableBody,
  TableRow,
} from "@mui/material";

export const MotionBox = motion(Box);
export const MotionPaper = motion(Paper);
export const MotionStack = motion(Stack);
export const MotionBody = motion(TableBody);
export const MotionRow = motion(TableRow);
export const MotionIconButton = motion(IconButton);
export const MotionButtonBase = motion(ButtonBase);

export const orchestrationVar = ({ delay = 0, stagger = 0.1 } = {}) => ({
  animate: { transition: { delayChildren: delay, staggerChildren: stagger } },
});

//
// Appbar
export const sidebarLeftVar = {
  initial: { opacity: 0, x: -35 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.7,
      staggerChildren: 0.1,
    },
  },
  open: { transition: { staggerChildren: 0.1 } },
  close: { transition: { staggerChildren: 0.1 } },
};

export const sidebarRightVar = {
  initial: {
    scaleX: 0,
    transition: { type: "spring", bounce: 0, duration: 0.5 },
  },
  animate: {
    scaleX: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const sidebarLeftItemVar = {
  open: {
    opacity: 0,
    x: -60,
    height: 0,
    transition: { type: "spring", stiffness: 150, damping: 16 },
  },
  close: {
    opacity: 1,
    x: 0,
    height: "auto",
    transition: { type: "spring", stiffness: 150, damping: 16 },
  },
};

export const sidebarRightItemVar = {
  initial: {
    opacity: 0,
    y: 70,
    transition: { duration: 0 },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 160, damping: 18 },
  },
};

//
// Cover
export const coverVar = {
  initial: {
    opacity: 0,
    y: 100,
    transition: { duration: 0 },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 110, damping: 15 },
  },
  exit: {
    opacity: 0,
    scale: 1.5,
    transition: { type: "spring", bounce: 0, duration: 0.7 },
  },
};

export const coverRightVar = {
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
      bounce: 0,
      delay: 0.2,
      delayChildren: 0.5,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    x: 70,
    transition: { type: "spring", bounce: 0 },
  },
};

export const coverRightItemVar = {
  initial: {
    opacity: 0,
    y: 70,
    transition: { duration: 0 },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
  exit: {
    opacity: 0,
    y: 70,
    transition: { duration: 0 },
  },
};

//
// Books
export const booksVar = {
  initial: {
    opacity: 0,
    y: 100,
    transition: { duration: 0 },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 150, damping: 15 },
  },
  exit: {
    opacity: 0,
    y: 50,
    transition: { type: "spring", bounce: 0, duration: 0.5 },
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
    transition: { type: "spring", stiffness: 200, damping: 15 },
  },
  exit: {
    opacity: 0,
    y: 70,
    transition: { duration: 0 },
  },
};

export const carouselsVar = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.5,
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.5,
    },
  },
};

export const carouselsImageVar = {
  initial: {
    opacity: 0,
    scale: 1.1,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", bounce: 0, duration: 1 },
  },
  exit: {
    opacity: 0,
    scale: 1.1,
    transition: { type: "spring", bounce: 0, duration: 1 },
  },
};

export const carouselsSlidesVar = {
  initial: {
    opacity: 0,
    x: "30%",
  },
  animate: {
    opacity: 1,
    x: "0%",
    transition: { type: "spring", bounce: 0, duration: 1 },
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: { type: "spring", bounce: 0, duration: 1 },
  },
};

//
// Tools
export const toolsVar = {
  initial: {
    opacity: 0,
    y: 100,
    transition: { duration: 0 },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 150, damping: 15 },
  },
  exit: {
    opacity: 0,
    y: 50,
    transition: { type: "spring", bounce: 0, duration: 0.5 },
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
      staggerChildren: 0.15,
      delayChildren: 0.15,
    },
  },
  exit: {
    opacity: 0,
    y: 50,
    transition: { duration: 0 },
  },
};

// Components
export const tableItemVar = {
  initial: {
    opacity: 0,
    x: -30,
    transition: { duration: 0 },
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 200, damping: 15 },
  },
  exit: {
    opacity: 0,
    x: -30,
    transition: { duration: 0 },
  },
};
