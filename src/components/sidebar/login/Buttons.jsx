import { CircularProgress } from "@mui/material";
import { Button, Typography, Stack } from "@mui/material";

export function GuestButton({ loading }) {
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

export function SubmitButton({ loading }) {
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
