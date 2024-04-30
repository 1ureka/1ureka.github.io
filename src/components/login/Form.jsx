import React from "react";
import { motion } from "framer-motion";
import { useSetRecoilState } from "recoil";
import { Box, FormControlLabel, Checkbox, Divider } from "@mui/material";

import { AUTH, HINTS, INDEX, LOGIN_OPEN } from "../../utils/store";
import { PasswordInput, UsernameInput } from "./Inputs";
import { GuestButton, SubmitButton } from "./Buttons";
import { loadFile } from "../../utils/utils";

function MotionBox({ children }) {
  const AnimatedBox = motion(Box);

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

  return <AnimatedBox variants={variants}>{children}</AnimatedBox>;
}

function useHandleSubmit(setLoading, setError) {
  const setIndex = useSetRecoilState(INDEX);
  const setAuth = useSetRecoilState(AUTH);
  const setOpen = useSetRecoilState(LOGIN_OPEN);
  const setMessageQuene = useSetRecoilState(HINTS);

  const loadData = async () => {
    const [scene, props] = await Promise.all([
      loadFile("images/scene"),
      loadFile("images/props"),
    ]);
    const index = [
      ...scene.map(({ name }) => ({ category: "scene", name })),
      ...props.map(({ name }) => ({ category: "props", name })),
    ];
    setIndex(index);
  };

  const success = () => {
    sessionStorage.setItem("auth", "1");
    setAuth(true);
    setMessageQuene((prev) => [
      ...prev,
      { message: "The key unlocked. Welcome!", key: Date.now() },
    ]);
  };
  const fail = () => {
    sessionStorage.clear();
    setError(true);
    setMessageQuene((prev) => [
      ...prev,
      { message: "Key didn't match. Please try again.", key: Date.now() },
    ]);
  };

  return async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    sessionStorage.setItem("username", data.get("username"));
    sessionStorage.setItem("password", data.get("password"));

    setLoading(true);
    try {
      await loadData();
      success();
      setOpen(false);
    } catch (_) {
      fail();
    }
    setLoading(false);
  };
}

export default function LoginForm() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const handleSubmit = useHandleSubmit(setLoading, setError);

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
  );
}
