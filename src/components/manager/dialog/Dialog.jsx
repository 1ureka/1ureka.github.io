import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { List, ListItem, ListItemIcon, IconButton } from "@mui/material";
import { ListItemText, Dialog, DialogTitle } from "@mui/material";
import { DialogContent, DialogActions } from "@mui/material";
import { Typography, Button, Divider } from "@mui/material";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import HideImageRoundedIcon from "@mui/icons-material/HideImageRounded";

import { useImageAdd, useImageDelete } from "../../../utils/hooks";
import { MANAGER_ADDED, MANAGER_DELED } from "../../../utils/store";
import { TABLE_PAGE, TABLE_SELECTED } from "../../../utils/store";
import { FinishHint, Progress, Warning } from "./Elements";

function InfoHeader({ title, onClose }) {
  return (
    <>
      <DialogTitle sx={{ m: 0, p: 2 }}>{title}</DialogTitle>
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

function InfoContents({ info, list, icon }) {
  return (
    <DialogContent dividers>
      <Typography gutterBottom>{info}</Typography>
      <List>
        {list.map((item, i) => (
          <React.Fragment key={item.name || item}>
            <ListItem>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={item.name || item} />
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

function Template({ open, onClose, title, info, list, onSave, hint, icon }) {
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    if (onClose && !loading) onClose();
  };

  const [openSnack, setOpenSnack] = useState(false);
  const handleSnackClose = (_, reason) => {
    if (reason !== "clickaway") setOpenSnack(false);
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    await onSave();
    setLoading(false);
    onClose();
    setOpenSnack(true);
  };

  return (
    <React.Fragment>
      <Dialog onClose={handleClose} open={open} fullWidth>
        <InfoHeader title={title} onClose={handleClose} />
        <InfoContents info={info} list={list} icon={icon} />
        <InfoAction onSave={handleSaveChanges} loading={loading} />
      </Dialog>
      <FinishHint open={openSnack} onClose={handleSnackClose} message={hint} />
    </React.Fragment>
  );
}

export function DialogAdd({ open, onClose, list }) {
  const addImages = useImageAdd();
  const actionHandler = async () => {
    await addImages(list);
  };

  const num = useRecoilValue(MANAGER_ADDED);

  return (
    <Template
      open={open}
      onClose={onClose}
      title="Adding Files"
      info="Preparing to add the following files."
      list={list}
      onSave={actionHandler}
      hint={`${num} Files Added`}
      icon={<AddPhotoAlternateRoundedIcon />}
    />
  );
}

export function DialogDel({ open, onClose }) {
  const selected = useRecoilValue(TABLE_SELECTED);
  const setPage = useSetRecoilState(TABLE_PAGE);
  const deleteImages = useImageDelete();
  const actionHandler = async () => {
    setPage(0);
    await deleteImages(selected);
  };

  const num = useRecoilValue(MANAGER_DELED);

  return (
    <Template
      open={open}
      onClose={onClose}
      title="Deleting Files"
      info="Preparing to delete the following files."
      list={selected}
      onSave={actionHandler}
      hint={`${num} Files Deleted`}
      icon={<HideImageRoundedIcon />}
    />
  );
}