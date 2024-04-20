import * as React from "react";
import { Checkbox, Grow, Radio, RadioGroup } from "@mui/material";
import { Grid, Stack, Paper, IconButton } from "@mui/material";
import { Chip, Tooltip, Typography } from "@mui/material";
import { Dialog, DialogContent, FormControl } from "@mui/material";
import { FormLabel, FormControlLabel } from "@mui/material";
import { ThemeProvider, useMediaQuery } from "@mui/material";

import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import BrokenImageRoundedIcon from "@mui/icons-material/BrokenImageRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

import gsap from "gsap";
import { darkTheme } from "../../utils/theme";
import { useRecoilState, useRecoilValue } from "recoil";
import { IS_INTRO_VISIBLE } from "../../utils/store";

//
// Elements
function CoverSelect({ selected, onChange }) {
  const isVisible = useRecoilValue(IS_INTRO_VISIBLE);

  return (
    <Grow in={isVisible}>
      <Paper
        elevation={2}
        sx={{ position: "absolute", right: "5%", borderRadius: "500px", py: 1 }}
      >
        <Tooltip title="Change Cover" placement="top">
          <RadioGroup
            name="scene-radio-buttons-group"
            value={selected}
            onChange={onChange}
          >
            <Radio value="a" size="small" />
            <Radio value="b" size="small" />
            <Radio value="c" size="small" />
          </RadioGroup>
        </Tooltip>
      </Paper>
    </Grow>
  );
}

function CoverNameTag() {
  const isVisible = useRecoilValue(IS_INTRO_VISIBLE);

  return (
    <Grow in={isVisible}>
      <Chip
        icon={<BrokenImageRoundedIcon fontSize="small" />}
        label="Cover: background image 1"
      />
    </Grow>
  );
}

function CoverModilPanel({ selected, onChange }) {
  const isVisible = useRecoilValue(IS_INTRO_VISIBLE);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grow in={isVisible}>
        <IconButton onClick={handleClick}>
          <BrokenImageRoundedIcon
            fontSize="small"
            sx={{ color: "text.secondary" }}
          />
        </IconButton>
      </Grow>
      <Dialog onClose={handleClose} open={open}>
        <DialogContent>
          <FormControl>
            <FormLabel>Change Background Image</FormLabel>
            <RadioGroup
              name="cover-select"
              value={selected}
              onChange={onChange}
            >
              <FormControlLabel
                value="a"
                control={<Radio />}
                label="background image 1"
              />
              <FormControlLabel
                value="b"
                control={<Radio />}
                label="background image 2"
              />
              <FormControlLabel
                value="c"
                control={<Radio />}
                label="background image 3"
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
      </Dialog>
    </>
  );
}

function ScrollHint() {
  const isVisible = useRecoilValue(IS_INTRO_VISIBLE);
  const iconRef = React.useRef(null);
  const labelRef = React.useRef(null);

  React.useEffect(() => {
    const tl = gsap
      .timeline()
      .to(iconRef.current, {
        ease: "power1.inOut",
        duration: 2.5,
        repeat: -1,
        startAt: { y: -20, opacity: 0 },
        keyframes: [
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1 },
          { y: 10, opacity: 0 },
        ],
      })
      .to(
        labelRef.current,
        {
          ease: "power1.inOut",
          duration: 2.5,
          repeat: -1,
          startAt: { opacity: 0.5 },
          keyframes: [{ opacity: 0.5 }, { opacity: 1 }, { opacity: 0.5 }],
        },
        "<"
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <Grow in={isVisible}>
      <Stack direction={"column"} alignItems={"center"}>
        <KeyboardArrowDownRoundedIcon ref={iconRef} color="action" />
        <Typography
          variant="body2"
          sx={{ userSelect: "none", color: "#fff" }}
          ref={labelRef}
        >
          scroll
        </Typography>
      </Stack>
    </Grow>
  );
}

function AnimationControl({ onPaused }) {
  const [isPaused, setIsPaused] = React.useState(false);
  const [isVisible, setIsVisible] = useRecoilState(IS_INTRO_VISIBLE);

  const handleAnimation = (e) => {
    setIsPaused(e.target.checked);
    if (onPaused) onPaused(e.target.checked);
  };

  const handleHide = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <Stack direction={"row"} spacing={0}>
      <Tooltip
        title={isPaused ? "Play Animation" : "Pause Animation"}
        placement="top"
      >
        <Checkbox
          icon={<PauseRoundedIcon />}
          checkedIcon={<PlayArrowRoundedIcon />}
          onChange={handleAnimation}
          size="small"
        />
      </Tooltip>
      <Tooltip title={!isVisible ? "Show UI" : "Hide UI"} placement="top">
        <Checkbox
          icon={<VisibilityOffRoundedIcon />}
          checkedIcon={<VisibilityRoundedIcon />}
          onChange={handleHide}
          size="small"
          checked={!isVisible}
        />
      </Tooltip>
    </Stack>
  );
}

//
// Background
// function Background() {
//   return (
//     <Box
//       sx={{
//         position: "absolute",
//         width: "100%",
//         height: "100%",
//         clipPath: "inset(0px)",
//       }}
//     >
//       <img
//         style={{
//           position: "absolute",
//           width: "100%",
//           height: "100%",
//           objectFit: "cover",
//         }}
//         src={bg}
//         alt="bg Img"
//       />
//       <Box
//         sx={{
//           position: "absolute",
//           width: "100%",
//           height: "100%",
//           backgroundColor: "bgFilterLower",
//           maskImage: ` linear-gradient(rgb(0 0 0 / 0),  rgb(0 0 0 / 0), rgb(0 0 0 / 1))`,
//         }}
//       ></Box>
//       <Box
//         sx={{
//           position: "absolute",
//           width: "100%",
//           height: "100%",
//           backgroundColor: "bgFilterUpper",
//           maskImage: `linear-gradient(rgb(0 0 0 / 1),  rgb(0 0 0 / 0), rgb(0 0 0 / 0))`,
//         }}
//       ></Box>
//     </Box>
//   );
// }

//
// Contents
function BottomItem({ sx, children }) {
  return (
    <Grid
      item
      xs
      sx={{
        display: "flex",
        alignItems: "center",
        ...sx,
      }}
    >
      {children}
    </Grid>
  );
}

function BottomComponents({ onPaused, selected, onChange }) {
  const match = useMediaQuery("(min-width:850px)");

  return (
    <Grid
      container
      sx={{
        width: "90%",
        position: "absolute",
        bottom: 0,
        pb: 6,
      }}
    >
      <BottomItem sx={{ justifyContent: "flex-start" }}>
        {match ? (
          <CoverNameTag />
        ) : (
          <CoverModilPanel selected={selected} onChange={onChange} />
        )}
      </BottomItem>

      <BottomItem sx={{ justifyContent: "center" }}>
        <ScrollHint />
      </BottomItem>

      <BottomItem sx={{ justifyContent: "flex-end" }}>
        <AnimationControl onPaused={onPaused} />
      </BottomItem>
    </Grid>
  );
}

export default function Content() {
  const match = useMediaQuery("(min-width:850px)");
  const [selected, setSelected] = React.useState("b");
  const handleRadio = ({ target }) => {
    setSelected(target.value);
  };

  return (
    <React.Fragment>
      {/* <Background /> */}
      {match ? <CoverSelect selected={selected} onChange={handleRadio} /> : ""}
      <ThemeProvider theme={darkTheme}>
        <BottomComponents selected={selected} onChange={handleRadio} />
      </ThemeProvider>
    </React.Fragment>
  );
}
