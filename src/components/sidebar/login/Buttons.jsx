import { CircularProgress } from "@mui/material";
import { Button, Stack } from "@mui/material";

export function GuestButton({ loading }) {
  return (
    <Stack alignItems="center" width="100%">
      <Button
        size="small"
        disabled={loading}
        type="button"
        sx={{ fontSize: (theme) => theme.typography.caption.fontSize }}
      >
        Sign in as a guest
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
