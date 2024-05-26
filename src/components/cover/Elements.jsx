import * as React from "react";
import { Divider, IconButton, Stack, Tooltip } from "@mui/material";
import { Radio, RadioGroup, Checkbox } from "@mui/material";
import { motion } from "framer-motion";

import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { coverRightItemVar } from "../Motion";

function AnimateWrapper({ children }) {
  return <motion.div variants={coverRightItemVar}>{children}</motion.div>;
}

export function CloseButton({ onClick }) {
  return (
    <AnimateWrapper>
      <IconButton onClick={onClick}>
        <CloseRoundedIcon sx={{ fontSize: "24px" }} />
      </IconButton>
    </AnimateWrapper>
  );
}

export function Radios() {
  const [val, setVal] = React.useState(0);

  const sizeSx = { "& .MuiSvgIcon-root": { fontSize: 20 } };

  return (
    <AnimateWrapper>
      <Stack alignItems="center" sx={{ height: "60vh" }} spacing={2}>
        <Divider flexItem />
        <Divider orientation="vertical" sx={{ flexGrow: 1, height: "auto" }} />
        <Tooltip title="Change Cover" placement="left">
          <RadioGroup
            value={val}
            onChange={({ target }) => setVal(target.value)}
          >
            {[0, 1, 2].map((i) => (
              <Radio key={i} value={i} sx={sizeSx} />
            ))}
          </RadioGroup>
        </Tooltip>
        <Divider orientation="vertical" sx={{ flexGrow: 1, height: "auto" }} />
        <Divider flexItem />
      </Stack>
    </AnimateWrapper>
  );
}

export function PlayButton() {
  const [isPaused, setIsPaused] = React.useState(false);

  const handleAnimation = ({ target }) => {
    setIsPaused(target.checked);
  };

  return (
    <AnimateWrapper>
      <Tooltip
        title={isPaused ? "Play Animation" : "Pause Animation"}
        placement="left"
      >
        <Checkbox
          icon={<PauseRoundedIcon />}
          checkedIcon={<PlayArrowRoundedIcon />}
          onChange={handleAnimation}
          sx={{ "& .MuiSvgIcon-root": { fontSize: 22 } }}
        />
      </Tooltip>
    </AnimateWrapper>
  );
}
