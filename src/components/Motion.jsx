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
