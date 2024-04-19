import React from "react";
import { CircularProgress, Divider } from "@mui/material";
import { InputAdornment, IconButton } from "@mui/material";
import { Button, Typography, Box, Stack } from "@mui/material";
import { TextField, FormControlLabel, Checkbox } from "@mui/material";

import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

import { useSetRecoilState } from "recoil";
import { INDEX } from "../../utils/store";
import { useNavigateTo } from "../../utils/hooks";
import { base64ToString, loadFile } from "../../utils/utils";

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
  const navigate = useNavigateTo("/");
  const handleClick = (e) => {
    e.preventDefault();
    navigate();
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

export default function LoginForm() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const setIndex = useSetRecoilState(INDEX);
  const navigate = useNavigateTo("/");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    sessionStorage.setItem("username", data.get("username"));
    sessionStorage.setItem("password", data.get("password"));

    setLoading(true);

    const [scene, props] = await Promise.all([
      loadFile("images/scene"),
      loadFile("images/props"),
    ]);
    const index = [
      ...scene?.map(({ name }) => ({ category: "scene", name })),
      ...props?.map(({ name }) => ({ category: "props", name })),
    ];

    if (index.length > 0) {
      setIndex(index);
      sessionStorage.setItem("auth", "1");
      navigate();
    } else {
      sessionStorage.clear();
      setLoading(false);
      setError(true);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <UsernameInput error={error} />
      <PasswordInput error={error} />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
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
      <Divider sx={{ my: 0.7 }} />
      <GuestMode loading={loading} />
    </Box>
  );
}
