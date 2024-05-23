import { useEffect, useState } from "react";
import { Stack, Backdrop, Typography, Snackbar } from "@mui/material";
import { Button, IconButton, CircularProgress } from "@mui/material";
import AddToPhotosRoundedIcon from "@mui/icons-material/AddToPhotosRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { DialogAdd } from "../dialog/Dialog";
import { useManagerSelect } from "../../../utils/hooks";

function Action({ onClick }) {
  return (
    <Button
      startIcon={<AddToPhotosRoundedIcon fontSize="small" />}
      sx={(theme) => theme.typography.caption}
      onClick={onClick}
    >
      Add Image
    </Button>
  );
}

function Task({ open, info }) {
  return (
    <Backdrop
      open={open}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 2,
        bgcolor: "custom.backdrop",
      }}
    >
      <Stack alignItems={"center"} spacing={2}>
        <CircularProgress color="primary" disableShrink />
        <Typography variant="body2" color="text.secondary">
          {info}
        </Typography>
      </Stack>
    </Backdrop>
  );
}

function Hint({ open, info, onClose }) {
  return (
    <Snackbar
      autoHideDuration={3500}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={open}
      message={info}
      action={
        <IconButton size="small" onClick={onClose} color="inherit">
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      }
      onClose={(_, reason) => {
        if (reason !== "clickaway") onClose();
      }}
    />
  );
}

export default function AddButton() {
  const { action, task, hint, list } = useManagerSelect();

  const [openH, setOpenH] = useState(false);
  useEffect(() => setOpenH(!!hint), [hint]);

  const [openD, setOpenD] = useState(false);
  useEffect(() => setOpenD(list.length > 0), [list]);

  return (
    <>
      <Action onClick={action} />
      <Task open={!!task} info={task} />
      <Hint open={openH} info={hint} onClose={() => setOpenH(false)} />
      <DialogAdd open={openD} onClose={() => setOpenD(false)} list={list} />
    </>
  );
}
