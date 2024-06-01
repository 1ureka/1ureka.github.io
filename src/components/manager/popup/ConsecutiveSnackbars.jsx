import { useEffect, useState } from "react";
import { IconButton, Snackbar } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function ConsecutiveSnackbars({ timeStamp, message }) {
  const [snackPack, setSnackPack] = useState([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);

  useEffect(() => {
    if (message) setSnackPack((prev) => [...prev, { key: timeStamp, message }]);
  }, [timeStamp, message]);

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      const clonedSnackPack0 = { ...snackPack[0] };
      setMessageInfo(clonedSnackPack0);
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  const handleClose = (_, reason) => {
    if (reason !== "clickaway") setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  return (
    <Snackbar
      key={messageInfo?.key}
      open={open}
      onClose={handleClose}
      autoHideDuration={3500}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      TransitionProps={{ onExited: handleExited }}
      message={messageInfo?.message}
      action={
        <IconButton size="small" onClick={handleClose} color="inherit">
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      }
    />
  );
}
