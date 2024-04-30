import React from "react";
import { useSetRecoilState } from "recoil";
import { motion } from "framer-motion";

import { CircularProgress, Divider } from "@mui/material";
import { InputAdornment, IconButton } from "@mui/material";
import { Button, Typography, Box, Stack } from "@mui/material";
import { TextField, FormControlLabel, Checkbox } from "@mui/material";

import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

import { AUTH, HINTS, INDEX, LOGIN_OPEN } from "../../utils/store";
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

function UsernameInput({ error }) {
  return (
    <TextField
      error={error}
      margin="normal"
      required
      fullWidth
      label="Username"
      name="username"
      autoComplete="username"
      autoFocus
    />
  );
}

function PasswordInput({ error }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => e.preventDefault();

  return (
    <TextField
      error={error}
      helperText={error ? "Incorrect username or password." : ""}
      margin="normal"
      required
      fullWidth
      name="password"
      label="Password"
      type={showPassword ? "text" : "password"}
      autoComplete="current-password"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? (
                <VisibilityOffRoundedIcon fontSize="small" />
              ) : (
                <VisibilityRoundedIcon fontSize="small" />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

function GuestMode({ loading }) {
  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <Stack alignItems={"center"} sx={{ width: "100%" }}>
      <Button
        variant="text"
        size="small"
        onClick={handleClick}
        disabled={loading}
      >
        <Typography variant="caption">Sign in as a guest</Typography>
      </Button>
    </Stack>
  );
}

function Submit({ loading }) {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 1 }}
      disabled={loading}
    >
      Sign In
      {loading && (
        <CircularProgress
          size={30}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-15px",
            marginLeft: "-15px",
          }}
        />
      )}
    </Button>
  );
}

export default function LoginForm() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const setAuth = useSetRecoilState(AUTH);
  const setIndex = useSetRecoilState(INDEX);
  const setMessageQuene = useSetRecoilState(HINTS);
  const setOpen = useSetRecoilState(LOGIN_OPEN);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    sessionStorage.setItem("username", data.get("username"));
    sessionStorage.setItem("password", data.get("password"));

    try {
      setLoading(true);
      const [scene, props] = await Promise.all([
        loadFile("images/scene"),
        loadFile("images/props"),
      ]);
      const index = [
        ...scene.map(({ name }) => ({ category: "scene", name })),
        ...props.map(({ name }) => ({ category: "props", name })),
      ];
      setIndex(index);
      sessionStorage.setItem("auth", "1");
      setAuth(true);
      setMessageQuene((prev) => [
        ...prev,
        { message: "The key unlocked. Welcome!", key: Date.now() },
      ]);
      setOpen(false);
    } catch (_) {
      sessionStorage.clear();
      setLoading(false);
      setError(true);
      setMessageQuene((prev) => [
        ...prev,
        { message: "Key didn't match. Please try again.", key: Date.now() },
      ]);
    }
  };

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
        <Submit loading={loading} />
        <Divider sx={{ my: 0.7 }} />
        <GuestMode loading={loading} />
      </MotionBox>
    </Box>
  );
}
