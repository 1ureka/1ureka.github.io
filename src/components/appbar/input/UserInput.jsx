import { TextField } from "@mui/material";

export default function UserInput({ error }) {
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
