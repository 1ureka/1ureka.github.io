import { ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import { Drawer, Stack, useMediaQuery, ButtonBase } from "@mui/material";
import { Avatar, IconButton, Typography } from "@mui/material";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import SpaceDashboardRoundedIcon from "@mui/icons-material/SpaceDashboardRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";

import React, { useEffect, useRef, useState } from "react";
import { useNavigateTo } from "../../utils/hooks";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { DRAWER_IMAGE_WIDTH, DRAWER_WIDTH } from "../../utils/store";
import { ALBUM_SELECTED, ALBUM_ROWS } from "../../utils/store";

import GlassBox from "../../components/GlassBox";
import AlbumImage from "./SidebarImage";
import { delay } from "../../utils/utils";

const profileImage = "/favicon.png";

function Title() {
  return (
    <Stack
      direction={"row-reverse"}
      justifyContent={"center"}
      alignItems={"center"}
      spacing={1}
    >
      <Avatar
        src={profileImage}
        sx={{
          width: 70,
          height: 70,
          translate: "0px -7px",
        }}
      />
      <Typography
        variant="h5"
        sx={{
          fontFamily: "Comfortaa",
          fontWeight: 700,
          width: "min-content",
          m: 0,
        }}
      >
        {"1ureka's CG"}
      </Typography>
    </Stack>
  );
}

function DrawerHeader({ sx }) {
  const navigate = useNavigateTo("/");

  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"flex-start"}
      spacing={2}
      sx={sx}
    >
      <Tooltip title={"Back To Home"}>
        <IconButton size="small" onClick={navigate}>
          <ArrowBackIosNewRoundedIcon />
        </IconButton>
      </Tooltip>
      <Title />
      <div />
    </Stack>
  );
}

function DrawerImage({ name, isSelected, onSelect }) {
  const imageWidth = useRecoilValue(DRAWER_IMAGE_WIDTH);
  const ref = useRef(null);
  const [isShow, setShow] = useState(false);

  const show = (entries) => {
    entries.forEach(({ isIntersecting }) => {
      setShow(isIntersecting);
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(show, { threshold: 1 });
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  const transitionStyle = {
    transitionProperty: "filter, opacity",
    transitionTimingFunction: "ease-in-out",
    transitionDuration: "300ms",
  };

  const style = {
    ...transitionStyle,
    display: "flex",
    width: imageWidth,
    opacity: isShow ? (isSelected ? 0.375 : 1) : 0,
    filter: isShow ? "blur(0px)" : "blur(5px)",
    borderRadius: "5px",
  };

  return (
    <ButtonBase
      sx={{
        borderRadius: "5px",
        opacity: 0.8,
        "&:hover": { opacity: 1 },
        transition: "opacity 0.15s",
      }}
      disabled={isSelected}
      onClick={onSelect}
    >
      <AlbumImage ref={ref} name={name} isView={isShow} style={style} />
    </ButtonBase>
  );
}

function DrawerList() {
  const [selected, setSelected] = useRecoilState(ALBUM_SELECTED);
  const rows = useRecoilValue(ALBUM_ROWS);

  const createHandleSelect = (i) => async () => {
    await delay(250);
    setSelected(i);
  };

  return (
    <Stack
      direction={"column"}
      alignItems={"center"}
      spacing={2}
      sx={{ position: "relative", flexGrow: 1, px: "5px" }}
    >
      {rows.map((item, i) => (
        <DrawerImage
          key={item.name}
          name={item.name}
          isSelected={i === selected}
          onSelect={createHandleSelect(i)}
        />
      ))}
    </Stack>
  );
}

function DrawerToolbar({ sx }) {
  const [width, setWidth] = useRecoilState(DRAWER_IMAGE_WIDTH);

  const handleChange = (_, value) => {
    if (value) setWidth(value);
  };

  return (
    <Tooltip title={"Display Options"}>
      <ToggleButtonGroup
        value={width}
        onChange={handleChange}
        color="primary"
        exclusive
        size="small"
        sx={{ display: "flex", ...sx }}
      >
        <ToggleButton value="230px" sx={{ width: "33.33%" }}>
          <SpaceDashboardRoundedIcon sx={{ fontSize: "1.3em" }} />
        </ToggleButton>
        <ToggleButton value="300px" sx={{ width: "33.33%" }}>
          <SpaceDashboardRoundedIcon sx={{ fontSize: "1.6em" }} />
        </ToggleButton>
        <ToggleButton value="350px" sx={{ width: "33.33%" }}>
          <SpaceDashboardRoundedIcon sx={{ fontSize: "2em" }} />
        </ToggleButton>
      </ToggleButtonGroup>
    </Tooltip>
  );
}

function DrawerInner() {
  return (
    <Stack
      direction={"column"}
      alignItems={"center"}
      spacing={2}
      sx={{ px: 3 }}
    >
      <DrawerHeader
        sx={{
          position: "sticky",
          width: "100%",
          top: 0,
          pt: 3,
          backgroundColor: (theme) => theme.palette.background.default,
          zIndex: 1,
        }}
      />
      <DrawerList />
      <DrawerToolbar
        sx={{
          position: "sticky",
          width: "100%",
          bottom: 0,
          pb: 3,
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      />
    </Stack>
  );
}

export default function Sidebar({ isEntered }) {
  // for calc Content's left position
  const drawerRef = React.useRef(null);
  const matches = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const imageWidth = useRecoilValue(DRAWER_IMAGE_WIDTH);
  const setWidth = useSetRecoilState(DRAWER_WIDTH);
  useEffect(() => {
    const { width } = drawerRef.current.children[0].getBoundingClientRect();
    setWidth(matches ? width : 0);
  }, [isEntered, matches, imageWidth, setWidth]);

  const [open, setOpen] = React.useState(false);
  const scrollStyle = { scrollbarColor: "gray transparent" };
  return (
    <React.Fragment>
      <GlassBox
        sx={{
          display: { lg: "none" },
          position: "absolute",
          left: 30,
          borderRadius: "500px",
          rotate: "90deg",
        }}
      >
        <IconButton onClick={() => setOpen(true)} size="small">
          <ExpandLessRoundedIcon />
        </IconButton>
      </GlassBox>
      <Drawer
        variant="temporary"
        elevation={0}
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: { xs: "block", lg: "none" }, ...scrollStyle }}
      >
        <DrawerInner />
      </Drawer>
      <Drawer
        ref={drawerRef}
        variant="permanent"
        sx={{ display: { xs: "none", lg: "block" }, ...scrollStyle }}
        open
      >
        <DrawerInner />
      </Drawer>
    </React.Fragment>
  );
}
