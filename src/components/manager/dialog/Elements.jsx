import { Alert, CircularProgress, IconButton, Stack } from "@mui/material";
import { Snackbar, Grow } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export function Progress() {
  return (
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
  );
}

export function FinishHint({ open, onClose, message }) {
  return (
    <Snackbar
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={open}
      onClose={onClose}
      message={message}
      action={
        <IconButton size="small" onClick={onClose} color="inherit">
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      }
    />
  );
}

export function Warning({ open }) {
  const containerSx = {
    position: "fixed",
    top: 20,
    left: 0,
    right: 0,
  };
  return (
    <Grow in={open}>
      <Stack alignItems={"center"} sx={containerSx}>
        <Alert variant="filled" severity="error">
          {"Please do not close this window to prevent data loss."}
        </Alert>
      </Stack>
    </Grow>
  );
}
