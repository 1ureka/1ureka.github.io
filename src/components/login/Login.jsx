import { Avatar, Box, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import LoginForm from "./Form";

const MotionStack = motion(Stack);

const itemVariants = {
  initial: { opacity: 0, y: 70, transition: { duration: 0 } },
  exit: { opacity: 0, y: 70, transition: { duration: 0 } },
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

function Title() {
  return (
    <MotionStack variants={itemVariants} alignItems={"center"}>
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
      variants={itemVariants}
      sx={{ position: "absolute", p: 3, ...sx }}
    >
      <img src="./decal.png" alt="" style={{ width: 140, opacity: 0.1 }} />
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
