import { Avatar, Box, Stack, Typography } from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { MotionStack, sidebarRightItemVar } from "../../Motion";
import LoginForm from "./Form";

function Title() {
  return (
    <MotionStack variants={sidebarRightItemVar} alignItems={"center"}>
      <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
        <LockRoundedIcon />
      </Avatar>
      <Typography variant="h5">Unlock</Typography>
    </MotionStack>
  );
}

function Decal({ sx }) {
  return (
    <MotionStack
      variants={sidebarRightItemVar}
      sx={{ position: "absolute", p: 3, ...sx }}
    >
      <img
        src="./decal.webp"
        alt=""
        style={{ width: 140, opacity: 0.1 }}
        decoding="async"
      />
    </MotionStack>
  );
}

export default function Login() {
  return (
    <>
      <Box sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <Decal sx={{ top: 0, left: 0, rotate: "90deg" }} />
        <Decal sx={{ top: 0, right: 0, rotate: "180deg" }} />
        <Decal sx={{ bottom: 0, left: 0, rotate: "0deg" }} />
        <Decal sx={{ bottom: 0, right: 0, rotate: "270deg" }} />
      </Box>
      <Stack
        sx={{
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          scale: "0.85",
          minWidth: "420px",
        }}
      >
        <Title />
        <LoginForm />
      </Stack>
    </>
  );
}
