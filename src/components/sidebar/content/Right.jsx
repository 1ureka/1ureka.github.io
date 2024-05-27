import { useRecoilValue } from "recoil";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Divider, Link, Stack, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";

import { darkTheme } from "../../../utils/theme";
import { SIDEBAR_IS_AUTH, SIDEBAR_OPEN } from "../../../utils/store";
import { MotionButtonBase, MotionPaper, MotionStack } from "../../Motion";
import { sidebarRightVar, sidebarRightItemVar } from "../../Motion";
import Login from "../login/Login";

function SidebarNavTitle({ title }) {
  const lineSx = {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    background: "#fff",
  };

  const variants = {
    selected: { originX: [0], scaleX: 1 },
    unselected: { originX: [1], scaleX: 0 },
  };

  return (
    <Typography variant="h5" sx={{ position: "relative" }}>
      {title}
      <motion.div variants={variants} style={lineSx} />
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

  const subTitle = info && (
    <Typography variant="body2" sx={{ textWrap: "nowrap" }}>
      {info}
    </Typography>
  );

  return (
    <MotionStack variants={sidebarRightItemVar}>
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

function SidebarSocialLink({ title, info, icon, url }) {
  const linkProps = { href: url, target: "_blank", rel: "noopener" };
  const linkSx = {
    color: "text.secondary",
    "&:hover": { color: "text.primary" },
  };

  return (
    <Stack spacing={1}>
      <Typography variant="caption">{title}</Typography>
      <Stack direction={"row"} spacing={2}>
        {icon}
        <Link variant="h6" sx={linkSx} underline="hover" {...linkProps}>
          {info}
        </Link>
      </Stack>
    </Stack>
  );
}

function SidebarSocial() {
  const variants = sidebarRightItemVar;
  return (
    <Stack spacing={2.5}>
      <MotionStack variants={variants} direction="row" spacing={6.5}>
        <SidebarSocialLink
          title="SOURCE"
          info="GitHub"
          icon={<GitHubIcon />}
          url={"https://github.com/1ureka/1ureka.github.io"}
        />
        <SidebarSocialLink
          title="WATCH"
          info="Youtube"
          icon={<YouTubeIcon />}
          url={"https://www.youtube.com/@1ureka-"}
        />
      </MotionStack>

      <MotionStack variants={variants} spacing={2.5}>
        <Divider flexItem />
        <Typography variant="caption">
          Copyright © 1ureka. All rights reserved.
        </Typography>
      </MotionStack>
    </Stack>
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
    <MotionStack variants={sidebarRightItemVar} sx={sx}>
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
          variants={sidebarRightVar}
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
