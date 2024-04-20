import React, { useEffect, useState } from "react";

import { IconButton, Typography, Divider, Grow } from "@mui/material";
import { Tooltip, Box, Stack } from "@mui/material";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";

import { TransitionGroup } from "react-transition-group";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ALBUM_FILTER, DRAWER_WIDTH } from "../../utils/store";
import { ALBUM_ROWS, ALBUM_SELECTED } from "../../utils/store";

import ThemeControl from "../../components/ThemeControl";
import Sidebar from "./Sidebar";
import GlassBox from "../../components/GlassBox";
import AlbumImage from "./AlbumImage";
import Setting from "./Setting";

//
// Panel
function ZoomControl({ zoom, onZoomIn, onZoomOut }) {
  return (
    <Stack direction={"row"} alignItems={"center"}>
      <Tooltip title="Zoom In" placement="top">
        <IconButton size="small" onClick={onZoomIn}>
          <AddRoundedIcon />
        </IconButton>
      </Tooltip>
      <Typography variant="body2">
        x {zoom === 1 ? "1.0" : zoom.toFixed(1)}
      </Typography>
      <Tooltip title="Zoom Out" onClick={onZoomOut} placement="top">
        <IconButton size="small">
          <RemoveRoundedIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

function ToolsControl({ onReset }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Stack direction={"row"} alignItems={"center"}>
      <Tooltip title="Setting" placement="top">
        <IconButton
          size="small"
          onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
        >
          <TuneRoundedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Reset" placement="top">
        <IconButton size="small" onClick={onReset}>
          <RestartAltRoundedIcon />
        </IconButton>
      </Tooltip>
      <ThemeControl size="small" direction="bottom" placement="top" />
      <Setting
        onClose={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
        open={isOpen}
      />
    </Stack>
  );
}

function BottomPanel(props) {
  const i = useRecoilValue(ALBUM_SELECTED);
  const rows = useRecoilValue(ALBUM_ROWS);

  return (
    <GlassBox sx={{ bottom: 30, p: 0.5 }}>
      <Stack
        direction={"row"}
        spacing={1}
        alignItems={"center"}
        justifyContent={"center"}
        flexWrap={"wrap"}
      >
        <ZoomControl {...props} />
        <Divider orientation="vertical" flexItem />
        <Typography>{rows[i].name}</Typography>
        <Divider orientation="vertical" flexItem />
        <ToolsControl {...props} />
      </Stack>
    </GlassBox>
  );
}

//
// Content
function useContentReset(ref) {
  useEffect(() => {
    const reset = (e) => {
      e.preventDefault();
      ref.current.centerView(1);
    };
    window.addEventListener("contextmenu", reset);
    return () => window.removeEventListener("contextmenu", reset);
  }, [ref]);
}

function useNameChangeReset(ref, name) {
  useEffect(() => {
    ref.current.centerView(1, 0);
  }, [ref, name]);
}

function Content() {
  const i = useRecoilValue(ALBUM_SELECTED);
  const rows = useRecoilValue(ALBUM_ROWS);
  const name = rows[i].name;

  const ref = React.useRef(null);

  const [zoom, setZoom] = useState(1);
  const handleZoom = (ref) => setZoom(ref.state.scale);
  const handleZoomIn = () => ref.current.zoomIn();
  const handleZoomOut = () => ref.current.zoomOut();
  const handleReset = () => ref.current.centerView(1);
  useContentReset(ref);
  useNameChangeReset(ref, name);

  const left = useRecoilValue(DRAWER_WIDTH);
  const sx = {
    position: "absolute",
    left,
    top: 0,
    bottom: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  };

  return (
    <Box sx={sx}>
      <TransformWrapper centerOnInit onTransformed={handleZoom} ref={ref}>
        <TransformComponent>
          <AlbumImage name={name} />
        </TransformComponent>
      </TransformWrapper>
      <BottomPanel
        zoom={zoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleReset}
      />
    </Box>
  );
}

//
// Page
export default function Album() {
  const [isEntered, setIsEntered] = React.useState(false);

  const sx = {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const setFilter = useSetRecoilState(ALBUM_FILTER);
  useEffect(() => {
    setFilter({ brightness: 1, contrast: 1, saturate: 1 });
  }, [setFilter]);

  return (
    <TransitionGroup component={null}>
      <Grow onEntered={() => setIsEntered(true)}>
        <Box sx={sx}>
          <Content />
          <Sidebar isEntered={isEntered} />
        </Box>
      </Grow>
    </TransitionGroup>
  );
}
