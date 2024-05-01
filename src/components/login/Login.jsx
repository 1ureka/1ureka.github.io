import { Avatar, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import LoginForm from "./Form";

function Title() {
  const MotionStack = motion(Stack);

  const variants = {
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
  return (
    <MotionStack variants={variants} alignItems={"center"}>
      <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
        <LockRoundedIcon />
      </Avatar>
      <Typography variant="h5">Unlock</Typography>
    </MotionStack>
  );
}

export default function Login() {
  return (
    <Stack
      minWidth={"420px"}
      sx={{
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        scale: "0.85",
      }}
    >
      <Title />
      <LoginForm />
    </Stack>
  );
}
