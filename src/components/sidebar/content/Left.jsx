import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import FilterHdrRoundedIcon from "@mui/icons-material/FilterHdrRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

import { darkTheme } from "../../../utils/theme";
import { SIDEBAR_IS_AUTH, SIDEBAR_OPEN } from "../../../utils/store";
import { SIDEBAR_SETTING_OPEN } from "../../../utils/store";
import { MotionIconButton, MotionStack } from "../../Motion";

const transition = { type: "spring", stiffness: 150, damping: 20 };
const itemVariants = {
  open: { opacity: 0, x: -60, height: 0, transition },
  close: { opacity: 1, x: 0, height: "auto", transition },
};

function StyledIconButton({ children, ...props }) {
  const isAuth = useRecoilValue(SIDEBAR_IS_AUTH);

  const sx = {
    outline: "1px solid gray",
    "&:hover": { outline: "1px solid #fff" },
    transition: "all 0.2s",
    ...props.sx,
  };

  return (
    <IconButton {...props} sx={sx} disabled={!isAuth}>
      {children}
    </IconButton>
  );
}

function SidebarSmallButton({ icon, title, onClick }) {
  return (
    <MotionStack
      variants={itemVariants}
      sx={{ alignItems: "center", gap: 0.5 }}
    >
      <StyledIconButton size="small" onClick={onClick}>
        {icon}
      </StyledIconButton>
      {title && (
        <Typography variant="caption" sx={{ scale: "0.85" }}>
          {title}
        </Typography>
      )}
    </MotionStack>
  );
}

function SidebarMenuButton() {
  const [open, setOpen] = useRecoilState(SIDEBAR_OPEN);
  const isAuth = useRecoilValue(SIDEBAR_IS_AUTH);

  const transition = { type: "spring", stiffness: 300, damping: 20 };
  const variants = {
    tap: { scale: 0.9, transition },
    hover: { outlineOffset: "3.5px", transition },
  };
  const sx = {
    outline: "1px solid gray",
    "&:hover": {
      outline: "solid 1px #fff",
      backgroundColor: "#fff",
      color: darkTheme.palette.background.paper,
    },
  };

  return (
    <MotionIconButton
      size="small"
      onClick={() => setOpen(!open)}
      variants={variants}
      whileHover={["hover"]}
      whileTap={["tap"]}
      sx={sx}
    >
      {open ? (
        <CloseRoundedIcon fontSize="medium" />
      ) : isAuth ? (
        <MenuRoundedIcon fontSize="medium" />
      ) : (
        <LockRoundedIcon fontSize="medium" />
      )}
    </MotionIconButton>
  );
}

function SidebarSettingButton() {
  const [open, setOpen] = useRecoilState(SIDEBAR_SETTING_OPEN);

  const transition = { type: "spring", stiffness: 300, damping: 20 };
  const variants = {
    open: { outlineOffset: "3.5px", transition },
    close: { transition },
  };

  const backgroundColor = open ? "#fff" : null;
  const sx = {
    backgroundColor,
    outline: "1px solid gray",
    "&:hover": { outline: "1px solid #fff", backgroundColor },
    color: open ? darkTheme.palette.background.paper : null,
  };

  return (
    <MotionStack variants={itemVariants} alignItems="center">
      <MotionIconButton
        variants={variants}
        animate={open ? "open" : "close"}
        onClick={() => setOpen(!open)}
        sx={sx}
      >
        <SettingsRoundedIcon sx={{ fontSize: "20px" }} />
      </MotionIconButton>
    </MotionStack>
  );
}

function SidebarSpacer() {
  const typoSx = {
    fontWeight: "800",
    rotate: "180deg",
    writingMode: "vertical-rl",
    letterSpacing: "0.3rem",
    my: 3,
  };

  return (
    <Stack sx={{ flexGrow: 1, width: "100%" }} gap={2.5}>
      <Divider flexItem />
      <Stack alignItems="center" sx={{ flexGrow: 1 }}>
        <Divider orientation="vertical" sx={{ flexGrow: 1, height: "auto" }} />
        <Typography variant="caption" sx={typoSx}>
          1ureka's CG
        </Typography>
        <Divider orientation="vertical" sx={{ flexGrow: 1, height: "auto" }} />
      </Stack>
      <Divider flexItem />
    </Stack>
  );
}

export default function SidebarLeft() {
  const open = useRecoilValue(SIDEBAR_OPEN);
  const navigate = useNavigate();

  const containerSx = { height: "100%", alignItems: "center" };
  const transition = { staggerChildren: 0.1 };
  const variants = { open: { transition }, close: { transition } };

  return (
    <MotionStack
      animate={open ? "open" : "close"}
      variants={variants}
      sx={containerSx}
      gap={2.5}
    >
      <SidebarMenuButton />
      <Box height={10}></Box>
      <SidebarSmallButton
        icon={<FilterHdrRoundedIcon sx={{ fontSize: "20px" }} />}
        title="Cover"
        onClick={() => navigate("/")}
      />
      <SidebarSmallButton
        icon={<BookmarkRoundedIcon sx={{ fontSize: "20px" }} />}
        title="Books"
        onClick={() => navigate("books")}
      />
      <SidebarSpacer />
      <SidebarSettingButton />
    </MotionStack>
  );
}
