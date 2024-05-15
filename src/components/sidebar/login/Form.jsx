import React from "react";
import { motion } from "framer-motion";
import { useSetRecoilState } from "recoil";
import { Box, FormControlLabel, Checkbox, Divider } from "@mui/material";

import { SIDEBAR_IS_AUTH, SIDEBAR_OPEN } from "../../../utils/store";
import { PasswordInput, UsernameInput } from "./Inputs";
import { GuestButton, SubmitButton } from "./Buttons";
import { useSyncIndex } from "../../../utils/hooks";
import { sidebarRightItemVar } from "../../Motion";

function MotionBox({ children }) {
  return <motion.div variants={sidebarRightItemVar}>{children}</motion.div>;
}

function useHandleSubmit(setLoading, setError) {
  const setAuth = useSetRecoilState(SIDEBAR_IS_AUTH);
  const setOpen = useSetRecoilState(SIDEBAR_OPEN);
  const syncIndex = useSyncIndex();

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
      setLoading(true);
      await syncIndex();
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
