import React, { useState } from "react";

import { Dialog, DialogContent, Divider, Grow } from "@mui/material";
import { IconButton, Typography, Slider } from "@mui/material";
import { Tooltip, Box, Stack } from "@mui/material";

import ExposureRoundedIcon from "@mui/icons-material/ExposureRounded";
import ColorLensRoundedIcon from "@mui/icons-material/ColorLensRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";

import { TransitionGroup } from "react-transition-group";
import { useRecoilValue } from "recoil";
import { DRAWER_WIDTH } from "../../utils/store";

import ThemeControl from "../../components/ThemeControl";
import Sidebar from "./Sidebar";
import GlassBox from "../../components/GlassBox";

//
// Content
function ZoomControl() {
  return (
    <Stack direction={"row"} alignItems={"center"}>
      <Tooltip title="Zoom In">
        <IconButton size="small">
          <AddRoundedIcon />
        </IconButton>
      </Tooltip>
      <Typography variant="body2">x 1.1</Typography>
      <Tooltip title="Zoom Out">
        <IconButton size="small">
          <RemoveRoundedIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

function ToolsControl() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Stack direction={"row"} alignItems={"center"}>
      <Tooltip title="Setting">
        <IconButton
          size="small"
          onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
        >
          <TuneRoundedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Reset">
        <IconButton size="small">
          <RestartAltRoundedIcon />
        </IconButton>
      </Tooltip>
      <ThemeControl size="small" direction={"bottom"} />
      <SettingDialog
        onClose={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
        open={isOpen}
      />
    </Stack>
  );
}

function SettingDialog({ onClose, open }) {
  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth={"sm"}>
      <DialogContent sx={{ p: 2 }}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
            <ExposureRoundedIcon
              fontSize="small"
              sx={{ color: "text.secondary" }}
            />
            <Typography variant="caption">Exposure</Typography>
          </Stack>
          <Tooltip title={"Close"} placement="top">
            <IconButton size="small" onClick={onClose}>
              <CloseRoundedIcon />
            </IconButton>
          </Tooltip>
        </Stack>
        <Slider
          min={0.5}
          max={1.5}
          defaultValue={1}
          step={0.1}
          marks
          valueLabelDisplay="auto"
        />

        <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
          <ColorLensRoundedIcon
            fontSize="small"
            sx={{ color: "text.secondary" }}
          />
          <Typography variant="caption">Saturation</Typography>
        </Stack>

        <Slider
          min={0.5}
          max={1.5}
          defaultValue={1}
          step={0.1}
          marks
          valueLabelDisplay="auto"
        />
      </DialogContent>
    </Dialog>
  );
}

function BottomPanel() {
  return (
    <GlassBox sx={{ bottom: 30, p: 0.5 }}>
      <Stack direction={"row"} spacing={1} alignItems={"center"}>
        <ZoomControl />
        <Divider orientation="vertical" flexItem />
        <Typography>Image Name 1</Typography>
        <Divider orientation="vertical" flexItem />
        <ToolsControl />
      </Stack>
    </GlassBox>
  );
}

function Content() {
  const left = useRecoilValue(DRAWER_WIDTH);
  return (
    <Box
      sx={{
        position: "absolute",
        left,
        top: 0,
        bottom: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src="https://fakeimg.pl/1920x1080/?text=こんにちは&font=noto"
        alt=""
        style={{ width: "100%", height: "100%" }}
      />
      <BottomPanel />
    </Box>
  );
}

//
// page
export default function Album() {
  const [isEntered, setIsEntered] = React.useState(false);

  return (
    <TransitionGroup component={null}>
      <Grow onEntered={() => setIsEntered(true)}>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Content />
          <Sidebar isEntered={isEntered} />
        </Box>
      </Grow>
    </TransitionGroup>
  );
}
