import * as React from "react";
import { IconButton, Stack, alpha } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import ExpandCircleDownRoundedIcon from "@mui/icons-material/ExpandCircleDownRounded";

import { MotionPaper, coverRightVar } from "../Motion";
import { CloseButton, PlayButton, Radios } from "./Elements";

function Operation({ open, onClose }) {
  const bgcolor = (theme) => alpha(theme.palette.background.default, 0.8);

  return (
    <AnimatePresence>
      {open && (
        <MotionPaper
          variants={coverRightVar}
          elevation={5}
          initial="initial"
          animate="animate"
          exit="exit"
          sx={{ px: 1, py: 2, borderRadius: "20px 0 0 20px", bgcolor }}
        >
          <Stack spacing={1}>
            <CloseButton onClick={onClose} />
            <Radios />
            <PlayButton />
          </Stack>
        </MotionPaper>
      )}
    </AnimatePresence>
  );
}

function ExpandButton({ show, onClick }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          style={{ position: "absolute", right: "10px" }}
          variants={coverRightVar}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <IconButton onClick={onClick} color="primary">
            <ExpandCircleDownRoundedIcon sx={{ rotate: "90deg" }} />
          </IconButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Controls() {
  const [open, setOpen] = React.useState(true);

  const backdropStyle = {
    position: "absolute",
    display: "grid",
    placeItems: "center",
    right: "0px",
    height: "100%",
    zIndex: 1,
  };

  return (
    <div style={backdropStyle}>
      <Operation open={open} onClose={() => setOpen(false)} />
      <ExpandButton show={!open} onClick={() => setOpen(true)} />
    </div>
  );
}
