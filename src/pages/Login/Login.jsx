import React from "react";
import { Typography, Avatar, Grow } from "@mui/material";
import { Box, Paper, Stack, useMediaQuery } from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

import { TransitionGroup } from "react-transition-group";

import ThemeControl from "../../components/ThemeControl";
import LoginForm from "./LoginForm";
import Background from "./LoginBackground";

//
// Elements
function Title() {
  return (
    <Stack spacing={1} direction={"row"} alignItems="center">
      <Avatar
        src={"/favicon.png"}
        sx={{
          width: 70,
          height: 70,
          translate: "0px -7px",
          filter:
            "drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.5)) drop-shadow(4px 4px 1px rgba(0, 0, 0, 0.35))",
        }}
      />
      <Typography
        variant="h5"
        component="h1"
        sx={{ fontFamily: "Comfortaa", color: "white" }}
      >
        1ureka's CG
      </Typography>
    </Stack>
  );
}

//
// Contents
function LeftComponents() {
  return (
    <Box sx={{ position: "absolute", width: "100%", height: "100%" }}>
      <Background />
    </Box>
  );
}

function RightComponents() {
  return (
    <Paper
      sx={{
        height: "100%",
        backgroundImage: "none",
      }}
      elevation={5}
    >
      <Stack
        sx={{ width: "100%", height: "100%", px: 10 }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockRoundedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <LoginForm />
      </Stack>
      <Box sx={{ position: "absolute", top: 30, right: 30 }}>
        <ThemeControl />
      </Box>
    </Paper>
  );
}

export default function Login() {
  const matches = useMediaQuery("(min-width:1000px)");
  const matches2 = useMediaQuery("(min-width:1500px)");

  return (
    <TransitionGroup component={null}>
      <Grow>
        <Stack
          direction={"row"}
          sx={{ position: "fixed", top: 0, bottom: 0, left: 0, right: 0 }}
        >
          {matches ? (
            <Box
              sx={{
                position: "relative",
                width: matches2 ? "70%" : "50%",
                height: "100%",
              }}
            >
              <LeftComponents />
            </Box>
          ) : (
            ""
          )}
          <Box
            sx={{
              position: "relative",
              width: matches ? (matches2 ? "30%" : "50%") : "100%",
              height: "100%",
            }}
          >
            <RightComponents />
          </Box>
          <Box sx={{ position: "absolute", top: 30, left: 30 }}>
            <Title />
          </Box>
        </Stack>
      </Grow>
    </TransitionGroup>
  );
}
