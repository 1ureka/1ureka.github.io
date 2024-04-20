import React, { useState } from "react";
import { Alert, CircularProgress, IconButton, Stack } from "@mui/material";
import { List, ListItem, ListItemIcon, Grow } from "@mui/material";
import { ListItemText, Dialog, DialogTitle } from "@mui/material";
import { DialogContent, DialogActions } from "@mui/material";
import { Typography, Snackbar, Button, Divider } from "@mui/material";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import HideImageRoundedIcon from "@mui/icons-material/HideImageRounded";

import { useImageActions } from "../../utils/hooks";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { MANAGER_DELED, TABLE_PAGE } from "../../utils/store";
import { TABLE_SELECTED } from "../../utils/store";

//
// Elements
function Progress() {
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

function FinishHint({ open, onClose }) {
  const num = useRecoilValue(MANAGER_DELED);

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
      message={`${num} Files Deleted`}
      action={
        <IconButton size="small" onClick={onClose} color="inherit">
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      }
    />
  );
}

function Warning({ open }) {
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
          Please do not close this window to prevent data loss.
        </Alert>
      </Stack>
    </Grow>
  );
}

//
// Contents
function InfoHeader({ onClose }) {
  return (
    <>
      <DialogTitle sx={{ m: 0, p: 2 }}>Deleting Files</DialogTitle>
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseRoundedIcon />
      </IconButton>
    </>
  );
}

function InfoContents({ list }) {
  return (
    <DialogContent dividers>
      <Typography gutterBottom>
        Preparing to delete the following files
      </Typography>
      <List>
        {list.map((name, i) => (
          <React.Fragment key={name}>
            <ListItem>
              <ListItemIcon>
                <HideImageRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
            {i + 1 === list.length ? "" : <Divider />}
          </React.Fragment>
        ))}
      </List>
    </DialogContent>
  );
}

function InfoAction({ onSave, loading }) {
  return (
    <DialogActions>
      <Button onClick={onSave} disabled={loading}>
        Save changes
        {loading && <Progress />}
      </Button>
      <Warning open={loading} />
    </DialogActions>
  );
}

export default function InfoModal({ open, onClose }) {
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    if (onClose && !loading) onClose();
  };

  const [openSnack, setOpenSnack] = useState(false);
  const handleSnackClose = (_, reason) => {
    if (reason !== "clickaway") setOpenSnack(false);
  };

  const selected = useRecoilValue(TABLE_SELECTED);
  const setPage = useSetRecoilState(TABLE_PAGE);
  const { del: deleteImages } = useImageActions();
  const handleSaveChanges = async () => {
    setLoading(true);
    setPage(0);
    await deleteImages(selected);
    setLoading(false);
    if (onClose) onClose();
    setOpenSnack(true);
  };

  return (
    <React.Fragment>
      <Dialog onClose={handleClose} open={open} fullWidth>
        <InfoHeader onClose={handleClose} />
        <InfoContents list={selected} />
        <InfoAction onSave={handleSaveChanges} loading={loading} />
      </Dialog>
      <FinishHint open={openSnack} onClose={handleSnackClose} />
    </React.Fragment>
  );
}
