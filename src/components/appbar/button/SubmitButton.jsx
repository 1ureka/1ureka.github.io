import { Button, CircularProgress } from "@mui/material";

export default function SubmitButton({ loading }) {
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
