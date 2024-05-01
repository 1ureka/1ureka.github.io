import React from "react";
import { motion } from "framer-motion";
import { useSetRecoilState } from "recoil";
import { Box, FormControlLabel, Checkbox, Divider } from "@mui/material";

import { INDEX, SIDEBAR_IS_AUTH, SIDEBAR_OPEN } from "../../utils/store";
import { PasswordInput, UsernameInput } from "./Inputs";
import { GuestButton, SubmitButton } from "./Buttons";
import { delay, loadFile } from "../../utils/utils";

function MotionBox({ children }) {
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

  return <motion.div variants={variants}>{children}</motion.div>;
}

function useHandleSubmit(setLoading, setError) {
  const setIndex = useSetRecoilState(INDEX);
  const setAuth = useSetRecoilState(SIDEBAR_IS_AUTH);
  const setOpen = useSetRecoilState(SIDEBAR_OPEN);

  const loadData = async () => {
    setLoading(true);
    const [scene, props] = await Promise.all([
      loadFile("images/scene"),
      loadFile("images/props"),
      delay(500),
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
    setOpen(false);
  };
  const fail = () => {
    sessionStorage.clear();
    setError(true);
    setLoading(false);
  };

  return async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    sessionStorage.setItem("username", data.get("username"));
    sessionStorage.setItem("password", data.get("password"));
    try {
      await loadData();
      success();
    } catch (_) {
      fail();
    }
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
