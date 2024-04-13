import React, { useState } from "react";
import { CircularProgress, IconButton } from "@mui/material";
import { List, ListItem, ListItemIcon } from "@mui/material";
import { ListItemText, Dialog, DialogTitle } from "@mui/material";
import { DialogContent, DialogActions } from "@mui/material";
import { Typography, Snackbar, Button, Divider } from "@mui/material";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import HideImageRoundedIcon from "@mui/icons-material/HideImageRounded";

import { useImageActions } from "../../utils/hooks";
import { useRecoilValue } from "recoil";
import { MANAGER_DELED, MANAGER_ROWS } from "../../utils/store";
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
        {list.map((item, i) => (
          <React.Fragment key={item.name}>
            <ListItem>
              <ListItemIcon>
                <HideImageRoundedIcon />
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
  const { del: deleteImages } = useImageActions();
  const handleSaveChanges = async () => {
    setLoading(true);
    await deleteImages(list.map(({ name }) => name));
    setLoading(false);
    if (onClose) onClose();
    setOpenSnack(true);
  };

  const rows = useRecoilValue(MANAGER_ROWS);
  const list = selected.map((name) => {
    return rows.find((item) => item.name === name);
  });

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
