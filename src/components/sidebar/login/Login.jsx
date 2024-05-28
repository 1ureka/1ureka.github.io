import { Avatar, Box, Stack, Typography } from "@mui/material";
import { FormControlLabel, Checkbox, Divider } from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { motion } from "framer-motion";

import { PasswordInput, UsernameInput } from "./Inputs";
import { GuestButton, SubmitButton } from "./Buttons";
import { MotionStack, sidebarRightItemVar } from "../../Motion";
import { useAuth } from "../../../utils/hooks";

function MotionBox({ children }) {
  return <motion.div variants={sidebarRightItemVar}>{children}</motion.div>;
}

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

function Decals() {
  return (
    <Box sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <Decal sx={{ top: 0, left: 0, rotate: "90deg" }} />
      <Decal sx={{ top: 0, right: 0, rotate: "180deg" }} />
      <Decal sx={{ bottom: 0, left: 0, rotate: "0deg" }} />
      <Decal sx={{ bottom: 0, right: 0, rotate: "270deg" }} />
    </Box>
  );
}

function Form() {
  const { action, loading, error } = useAuth();

  const containerSx = {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "420px",
  };

  return (
    <Stack sx={containerSx}>
      <Title />
      <Box component="form" onSubmit={action} sx={{ mt: 1, px: 3 }}>
        <MotionBox>
          <UsernameInput error={error} />
          <PasswordInput error={error} />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
        </MotionBox>
        <MotionBox>
          <SubmitButton loading={loading} />
          <Divider sx={{ my: 0.7 }} />
          <GuestButton loading={loading} />
        </MotionBox>
      </Box>
    </Stack>
  );
}

export default function Login() {
  return (
    <>
      <Decals />
      <Form />
    </>
  );
}
