import { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

export default function PasswordInput({ error }) {
  const [showPassword, setShowPassword] = useState(false);
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
