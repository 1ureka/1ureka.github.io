import * as React from "react";
import { useRecoilValue } from "recoil";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { ButtonBase, Divider, Stack, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";

import { darkTheme } from "../../../utils/theme";
import { SIDEBAR_IS_AUTH, SIDEBAR_OPEN } from "../../../utils/store";
import { MotionButtonBase, MotionPaper, MotionStack } from "../../Motion";
import Login from "../login/Login";

const itemVariants = {
  initial: {
    opacity: 0,
    y: 60,
    transition: { duration: 0 },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 160,
      damping: 18,
    },
  },
};

function SidebarNavTitle({ title }) {
  const lineSx = {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    background: "#fff",
  };

  const variants = {
    selected: {
      originX: [0],
      scaleX: 1,
    },
    unselected: {
      originX: [1],
      scaleX: 0,
    },
  };

  return (
    <Typography variant="h6" sx={{ position: "relative" }}>
      {title}
      <motion.div variants={variants} style={lineSx}></motion.div>
    </Typography>
  );
}

function SidebarNavButton({ title, info, onClick, selected }) {
  const buttonSx = {
    display: "flex",
    justifyContent: "flex-start",
    gap: 2,
    p: 2,
  };

  const infoSx = { color: "text.secondary", textWrap: "nowrap" };
  const subTitle = info && (
    <Typography variant="caption" sx={infoSx}>
      {info}
    </Typography>
  );

  return (
    <MotionStack variants={itemVariants}>
      <MotionButtonBase
        variants={{ hover: { x: 10 } }}
        animate={selected ? "selected" : "unselected"}
        whileHover={["selected", "hover"]}
        onClick={onClick}
        sx={buttonSx}
      >
        <SidebarNavTitle title={title} />
        {subTitle}
      </MotionButtonBase>
    </MotionStack>
  );
}

function SidebarNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const config = [
    {
      title: "Cover",
      info: null,
      selected: pathname === "/",
      onClick: () => navigate("/"),
    },
    {
      title: "Books",
      info: "scene, props",
      selected: pathname === "/books",
      onClick: () => navigate("/books"),
    },
    {
      title: "Tools",
      info: "files, tools",
      selected: pathname === "/tools",
      onClick: () => navigate("/tools"),
    },
  ];

  return (
    <Stack gap={1}>
      {config.map((props) => (
        <SidebarNavButton key={props.title} {...props} />
      ))}
    </Stack>
  );
}

function SidebarSocialLink({ title, info, icon }) {
  const subSx = { color: "text.secondary", fontSize: "0.65rem" };
  const titleSx = {
    color: "text.secondary",
    "&:hover": { color: "text.primary", textDecoration: "underline" },
    cursor: "pointer",
  };
  return (
    <Stack spacing={1}>
      <Typography variant="caption" sx={subSx}>
        {title}
      </Typography>
      <Stack direction={"row"} spacing={2}>
        {icon}
        <Typography sx={titleSx}>{info}</Typography>
      </Stack>
    </Stack>
  );
}

function SidebarSocial() {
  return (
    <MotionStack variants={itemVariants} spacing={2.5}>
      <Stack direction="row" spacing={6.5}>
        <SidebarSocialLink title="SOURCE" info="GitHub" icon={<GitHubIcon />} />
        <SidebarSocialLink
          title="WATCH"
          info="Youtube"
          icon={<YouTubeIcon />}
        />
      </Stack>
      <Divider flexItem />
      <Typography
        variant="caption"
        sx={{ color: "text.secondary", fontSize: "0.65rem" }}
      >
        Copyright © 1ureka. All rights reserved.
      </Typography>
    </MotionStack>
  );
}

function SidebarDecal() {
  const sx = {
    position: "absolute",
    top: 0,
    right: 0,
    p: 1,
    pointerEvents: "none",
  };

  return (
    <MotionStack variants={itemVariants} sx={sx}>
      <img
        src="./decal2.webp"
        alt=""
        style={{ width: "150px", scale: "-1 -1", opacity: 0.2 }}
        decoding="async"
      />
    </MotionStack>
  );
}

function SidebarContent() {
  const isAuth = useRecoilValue(SIDEBAR_IS_AUTH);

  const containerSx = {
    alignItems: "flex-start",
    justifyContent: "space-between",
    height: "100%",
  };

  return isAuth ? (
    <Stack sx={containerSx}>
      <SidebarDecal />
      <SidebarNav />
      <SidebarSocial />
    </Stack>
  ) : (
    <Login />
  );
}

export default function SidebarRight() {
  const open = useRecoilValue(SIDEBAR_OPEN);

  const variants = {
    initial: {
      scaleX: 0,
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.5,
      },
    },
    animate: {
      scaleX: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        staggerChildren: 0.05,
        delayChildren: 0.15,
      },
    },
  };

  const borderColor = darkTheme.palette.divider;
  const containerSx = {
    height: "100%",
    position: "absolute",
    top: 0,
    left: "100%",
    p: 5,
    transformOrigin: "left",
    boxShadow: "none",
    borderRadius: "0",
    borderLeft: `solid 1px ${borderColor}`,
  };

  return (
    <AnimatePresence>
      {open && (
        <MotionPaper
          variants={variants}
          initial="initial"
          animate="animate"
          exit="initial"
          sx={containerSx}
        >
          <SidebarContent />
        </MotionPaper>
      )}
    </AnimatePresence>
  );
}