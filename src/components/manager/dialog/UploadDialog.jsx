import { Fragment, useState } from "react";

import { Alert, Button, Divider, Stack, Typography } from "@mui/material";
import { CircularProgress, Dialog, Grow, IconButton } from "@mui/material";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { List, ListItem, ListItemText, ListItemIcon } from "@mui/material";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import { useManagerUpload } from "../../../utils/hooks";

export default function UploadDialog({ open, onClose, list = [] }) {
  const [loading, setLoading] = useState(false);
  const addImages = useManagerUpload();

  const handleSave = async (e) => {
    setLoading(true);
    const num = await addImages(list);
    setLoading(false);
    onClose(e, `${num} Files Added`);
  };

  const handleClose = () => {
    if (!loading) onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <IconButton
        onClick={handleClose}
        sx={{ position: "absolute", right: 8, top: 8, color: "grey.500" }}
      >
        <CloseRoundedIcon fontSize="small" />
      </IconButton>

      <DialogTitle sx={{ m: 0, p: 2 }}>Uploading Files</DialogTitle>

      <DialogContent dividers>
        <Typography gutterBottom>
          Preparing to upload the following files:
        </Typography>
        <List>
          {list.map((item, i) => (
            <Fragment key={item.name || item}>
              <ListItem>
                <ListItemIcon>
                  <AddPhotoAlternateRoundedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={item.name || item} />
              </ListItem>
              {i + 1 === list.length ? "" : <Divider />}
            </Fragment>
          ))}
        </List>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleSave} disabled={loading}>
          Save changes
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
      </DialogActions>

      <Grow in={loading}>
        <Stack
          alignItems={"center"}
          sx={{ position: "fixed", inset: "20px 0 auto 0" }}
        >
          <Alert variant="filled" severity="error">
            {"Please do not close this window to prevent data loss."}
          </Alert>
        </Stack>
      </Grow>
    </Dialog>
  );
}
