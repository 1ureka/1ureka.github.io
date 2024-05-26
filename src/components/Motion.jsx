import { motion } from "framer-motion";
import { ButtonBase, IconButton, Paper, Stack } from "@mui/material";
import { TableBody, TableRow } from "@mui/material";

export const MotionPaper = motion(Paper);
export const MotionStack = motion(Stack);
export const MotionBody = motion(TableBody);
export const MotionRow = motion(TableRow);
export const MotionIconButton = motion(IconButton);
export const MotionButtonBase = motion(ButtonBase);

export function MotionCover({ children }) {
  const variants = {
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

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ position: "relative", height: "100%", flexGrow: 1 }}
    >
      {children}
    </motion.div>
  );
}

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

export function MotionPage({ children }) {
  const variants = {
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

  const sx = { position: "relative", py: 3, px: 5, height: "100%" };

  return (
    <MotionStack
      variants={variants}
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

export const sidebarLeftVar = {
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
      staggerChildren: 0.05,
      delayChildren: 0.15,
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
