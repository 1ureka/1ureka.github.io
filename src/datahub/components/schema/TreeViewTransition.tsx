import { motion } from "motion/react";
import { Collapse } from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";

export function TreeViewTransition(props: TransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: props.in ? 1 : 0, x: props.in ? 0 : 20 }}
      transition={{ duration: 0.3 }}
    >
      <Collapse {...props} />
    </motion.div>
  );
}
