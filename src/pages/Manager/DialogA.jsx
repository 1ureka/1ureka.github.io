import React, { useState } from "react";
import { CircularProgress, Snackbar } from "@mui/material";
import { List, ListItem, ListItemIcon } from "@mui/material";
import { ListItemText, Dialog, DialogTitle } from "@mui/material";
import { DialogContent, DialogActions } from "@mui/material";
import { Button, Typography, Divider, IconButton } from "@mui/material";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";

import { useImageActions } from "../../utils/hooks";
import { useRecoilValue } from "recoil";
import { MANAGER_ADDED } from "../../utils/store";

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
  const num = useRecoilValue(MANAGER_ADDED);

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
      message={`${num} Files Added`}
      action={
        <IconButton size="small" onClick={onClose} color="inherit">
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      }
    />
  );
}

//
// Contents
function InfoHeader({ onClose }) {
  return (
    <>
      <DialogTitle sx={{ m: 0, p: 2 }}>Adding Files</DialogTitle>
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
      <Typography gutterBottom>Preparing to add the following files</Typography>
      <List>
        {list.map((item, i) => (
          <React.Fragment key={item.name}>
            <ListItem>
              <ListItemIcon>
                <AddPhotoAlternateRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={item.name} />
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
    </DialogActions>
  );
}

export default function InfoModal({ open, onClose, list }) {
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    if (onClose && !loading) onClose();
  };

  const [openSnack, setOpenSnack] = useState(false);
  const handleSnackClose = (_, reason) => {
    if (reason !== "clickaway") setOpenSnack(false);
  };

  const { add: addImages } = useImageActions();
  const handleSaveChanges = async () => {
    setLoading(true);
    await addImages(list);
    setLoading(false);
    if (onClose) onClose();
    setOpenSnack(true);
  };

  return (
    <React.Fragment>
      <Dialog onClose={handleClose} open={open} fullWidth>
        <InfoHeader onClose={handleClose} />
        <InfoContents list={list} />
        <InfoAction onSave={handleSaveChanges} loading={loading} />
      </Dialog>
      <FinishHint open={openSnack} onClose={handleSnackClose} />
    </React.Fragment>
  );
}
