import * as React from "react";
import { motion } from "framer-motion";
import { Stack } from "@mui/material";
import Table from "../../components/table/Table";

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

export default function Manager() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{ position: "relative", width: "100%" }}
    >
      <MotionStack variants={variants} sx={{ width: "50%", px: 1, py: 3 }}>
        <Table />
      </MotionStack>
      <MotionStack variants={variants} sx={{ width: "50%" }}></MotionStack>
    </Stack>
  );
}
