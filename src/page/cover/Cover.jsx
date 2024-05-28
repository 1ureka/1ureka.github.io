import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Box, Stack, alpha } from "@mui/material";

import { Background, CoverRadio } from "../../components/cover";
import { CloseButton, ExpandButton, PlayButton } from "../../components/cover";
import { MotionBox, MotionPaper, coverVar } from "../../components/Motion";
import { coverRightItemVar, coverRightVar } from "../../components/Motion";

function Sidebar() {
  const [open, setOpen] = useState(true);
  const [paused, setPaused] = useState(false);
  const [cover, setCover] = useState(0);

  const bgcolor = (theme) => alpha(theme.palette.background.default, 0.8);

  return (
    <Box
      display="grid"
      height="100%"
      sx={{ position: "absolute", placeItems: "center", right: 0 }}
    >
      <AnimatePresence>
        {open && (
          <MotionPaper
            elevation={5}
            sx={{ px: 1, py: 2, borderRadius: "20px 0 0 20px", bgcolor }}
            variants={coverRightVar}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Stack spacing={1}>
              <MotionBox variants={coverRightItemVar}>
                <CloseButton onClick={() => setOpen(false)} />
              </MotionBox>

              <MotionBox variants={coverRightItemVar}>
                <CoverRadio value={cover} onChange={(val) => setCover(val)} />
              </MotionBox>

              <MotionBox variants={coverRightItemVar}>
                <PlayButton value={paused} onChange={(val) => setPaused(val)} />
              </MotionBox>
            </Stack>
          </MotionPaper>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!open && (
          <MotionBox
            sx={{ position: "absolute", right: 1.25 }}
            variants={coverRightVar}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ExpandButton onClick={() => setOpen(true)} />
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
}

export default function Page() {
  return (
    <MotionBox
      sx={{ position: "relative", flexGrow: 1 }}
      variants={coverVar}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Background />
      <Sidebar />
    </MotionBox>
  );
}
