import { useRecoilState } from "recoil";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Box, Stack, Typography } from "@mui/material";
import { Avatar, Checkbox, Divider } from "@mui/material";
import { FormControlLabel } from "@mui/material";

import LockRoundedIcon from "@mui/icons-material/LockRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";

import { MotionPaper, MotionStack } from "../../../components/Motion";
import { MotionBox, sidebarRightVar } from "../../../components/Motion";
import { sidebarRightItemVar } from "../../../components/Motion";

import { useAuth } from "../../../utils/hooks";
import { darkTheme } from "../../../utils/theme";

import { Flowers, LinkButton, NavButton } from "../../../components/appbar";
import { PasswordInput, UserInput } from "../../../components/appbar";
import { Corners, GuestButton, SubmitButton } from "../../../components/appbar";
import { BOOKS_TAB, TOOLS_TAB } from "../../../utils/store";

function DesktopExpandedLogin() {
  const { action, loading, error } = useAuth();

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      height="100%"
      minWidth="420px"
    >
      <MotionBox
        variants={sidebarRightItemVar}
        sx={{
          position: "absolute",
          inset: (theme) => theme.spacing(3),
          pointerEvents: "none",
        }}
      >
        <Corners />
      </MotionBox>

      <MotionStack variants={sidebarRightItemVar} alignItems={"center"}>
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockRoundedIcon />
        </Avatar>
        <Typography variant="h5">Unlock</Typography>
      </MotionStack>

      <Box component="form" onSubmit={action} sx={{ mt: 1, px: 3 }}>
        <MotionBox variants={sidebarRightItemVar}>
          <UserInput error={error} />
          <PasswordInput error={error} />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
        </MotionBox>

        <MotionBox variants={sidebarRightItemVar}>
          <SubmitButton loading={loading} />
          <Divider sx={{ my: 0.7 }} />
          <GuestButton loading={loading} />
        </MotionBox>
      </Box>
    </Stack>
  );
}

function DesktopExpandedContent() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [booksTab, setBooksTab] = useRecoilState(BOOKS_TAB);
  const [toolsTab, setToolsTab] = useRecoilState(TOOLS_TAB);

  const config = [
    {
      title: "BOOKS",
      type: "caption",
    },
    {
      title: "Scene",
      selected: pathname === "/books" && booksTab === "scene",
      onClick: () => {
        setBooksTab("scene");
        navigate("/books");
      },
    },
    {
      title: "Props",
      selected: pathname === "/books" && booksTab === "props",
      onClick: () => {
        setBooksTab("props");
        navigate("/books");
      },
    },
    {
      title: "TOOLS",
      type: "caption",
    },
    {
      title: "Manager",
      selected: pathname === "/tools" && toolsTab === "manager",
      onClick: () => {
        setToolsTab("manager");
        navigate("/tools");
      },
    },
    {
      title: "Editor",
      selected: pathname === "/tools" && toolsTab === "editor",
      onClick: () => {
        setToolsTab("editor");
        navigate("/tools");
      },
    },
  ];

  return (
    <Stack alignItems="flex-start" justifyContent="space-between" height="100%">
      <MotionStack
        variants={sidebarRightItemVar}
        sx={{
          position: "absolute",
          inset: "0 0 auto auto",
          p: 1,
          pointerEvents: "none",
        }}
      >
        <Flowers />
      </MotionStack>

      <Stack spacing={1}>
        {config.map((props, i) => (
          <MotionStack key={props.title} variants={sidebarRightItemVar}>
            {props.type === "caption" ? (
              <Typography variant="caption" sx={{ mt: i !== 0 && 6 }}>
                {props.title}
              </Typography>
            ) : (
              <NavButton {...props} />
            )}
          </MotionStack>
        ))}
      </Stack>

      <Stack spacing={2.5}>
        <MotionStack
          variants={sidebarRightItemVar}
          direction="row"
          spacing={6.5}
        >
          <LinkButton
            title="SOURCE"
            info="GitHub"
            icon={<GitHubIcon />}
            url={"https://github.com/1ureka/1ureka.github.io"}
          />
          <LinkButton
            title="WATCH"
            info="Youtube"
            icon={<YouTubeIcon />}
            url={"https://www.youtube.com/@1ureka-"}
          />
        </MotionStack>

        <MotionStack variants={sidebarRightItemVar} spacing={2.5}>
          <Divider flexItem />
          <Typography variant="caption">
            Copyright © 1ureka. All rights reserved.
          </Typography>
        </MotionStack>
      </Stack>
    </Stack>
  );
}

export default function DesktopExpanded({ open, isAuth }) {
  const containerSx = {
    height: "100%",
    position: "absolute",
    top: 0,
    left: "100%",
    p: 5,
    transformOrigin: "left",
    boxShadow: "none",
    borderRadius: "0",
    borderLeft: `solid 1px ${darkTheme.palette.divider}`,
  };

  return (
    <AnimatePresence>
      {open && (
        <MotionPaper
          sx={containerSx}
          variants={sidebarRightVar}
          initial="initial"
          animate="animate"
          exit="initial"
        >
          {isAuth ? <DesktopExpandedContent /> : <DesktopExpandedLogin />}
        </MotionPaper>
      )}
    </AnimatePresence>
  );
}
