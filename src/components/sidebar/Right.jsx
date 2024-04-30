import * as React from "react";
import { useRecoilValue } from "recoil";
import { AnimatePresence, motion } from "framer-motion";
import { ButtonBase, Paper, Stack, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import { darkTheme } from "../../utils/theme";
import { SIDEBAR_OPEN } from "../../utils/store";

import { Setting } from "./Setting";

const MotionPaper = motion(Paper);
const MotionStack = motion(Stack);
const MotionButtonBase = motion(ButtonBase);

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

export default function SidebarRight() {
  const open = useRecoilValue(SIDEBAR_OPEN);

  const transition = {
    type: "spring",
    stiffness: 200,
    damping: 20,
  };
  const variants = {
    initial: { scaleX: 0, transition },
    animate: {
      scaleX: 1,
      transition: { ...transition, staggerChildren: 0.05, delayChildren: 0.15 },
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
          <Stack
            alignItems="flex-start"
            justifyContent="space-between"
            sx={{ height: "100%" }}
          >
            <SidebarNav />
            <Setting />
          </Stack>
        </MotionPaper>
      )}
    </AnimatePresence>
  );
}
