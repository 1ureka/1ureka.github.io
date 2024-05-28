import { useRecoilState } from "recoil";
import { Divider, Stack, Typography } from "@mui/material";
import { AnimatePresence } from "framer-motion";

import { MotionPaper, MotionStack } from "../../../components/Motion";
import { sidebarRightVar } from "../../../components/Motion";
import { sidebarRightItemVar } from "../../../components/Motion";

import { darkTheme } from "../../../utils/theme";
import { BOOKS_FOLD, MODE } from "../../../utils/store";

import { Toggles } from "../../../components/appbar";

export default function DesktopSetting({ open }) {
  const modeOptions = ["Light", "Dark", "System"];
  const [mode, setMode] = useRecoilState(MODE);

  const booksDisplayOptions = ["Fold", "Expand"];
  const [fold, setFold] = useRecoilState(BOOKS_FOLD);
  const display = fold ? "Fold" : "Expand";

  const containerSx = {
    position: "absolute",
    bottom: -10,
    left: "100%",
    p: 5,
    transformOrigin: "left",
    borderRadius: "0 20px 0 0",
    border: `solid ${darkTheme.palette.divider}`,
    borderWidth: "1px 1px 0px 1px",
  };

  return (
    <AnimatePresence>
      {open && (
        <MotionPaper
          variants={sidebarRightVar}
          initial="initial"
          animate="animate"
          exit="initial"
          sx={containerSx}
        >
          <Stack sx={{ width: "100%", alignItems: "flex-start" }} gap={2.5}>
            <MotionStack
              variants={sidebarRightItemVar}
              sx={{ width: "100%", alignItems: "center" }}
              spacing={1.5}
            >
              <Divider flexItem />
              <Typography variant="subTitle">Settings</Typography>
            </MotionStack>

            <MotionStack variants={sidebarRightItemVar} sx={{ width: "100%" }}>
              <Typography variant="caption">MODE</Typography>
              <Toggles
                options={modeOptions}
                value={mode}
                onChange={(mode) => setMode(mode)}
                sx={{ width: "100%" }}
              />
            </MotionStack>

            <MotionStack variants={sidebarRightItemVar} sx={{ width: "100%" }}>
              <Typography variant="caption">BOOKS DISPLAY</Typography>
              <Toggles
                options={booksDisplayOptions}
                value={display}
                onChange={(mode) => setFold(mode === "Fold")}
                sx={{ width: "100%" }}
              />
            </MotionStack>
          </Stack>
        </MotionPaper>
      )}
    </AnimatePresence>
  );
}
