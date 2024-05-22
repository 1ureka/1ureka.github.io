import { useState } from "react";
import { Stack, Backdrop, Typography, Snackbar } from "@mui/material";
import { Button, IconButton, CircularProgress } from "@mui/material";

import AddToPhotosRoundedIcon from "@mui/icons-material/AddToPhotosRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { blobGetDataUrl, compressImage } from "../../../utils/utils";
import { DialogAdd } from "../dialog/Dialog";

//
// utils
const createInput = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.multiple = true;
  input.style.display = "none";
  return input;
};

/** @returns {Promise<FileList | null>} */
const getInput = async (input) => {
  return await new Promise((resolve) => {
    input.addEventListener("cancel", () => resolve([]));
    input.addEventListener("change", () => resolve(input.files));
    document.body.appendChild(input);
    input.click();
  });
};

/** @param {File[]} files*/
const processImages = async (files) => {
  return await Promise.all(
    files.map(async (file) => {
      const blobO = await compressImage(file);
      const blobT = await compressImage(file, { scale: 0.125 });
      const origin = await blobGetDataUrl(blobO);
      const thumbnail = await blobGetDataUrl(blobT);
      const name = file.name.replace(/\.[^.]+$/, "");
      return { name, origin, thumbnail };
    })
  );
};

//
// Cmponents
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

function Progress({ open, task }) {
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
          {task}
        </Typography>
      </Stack>
    </Backdrop>
  );
}

function Hint({ open, alert, onClose }) {
  return (
    <Snackbar
      autoHideDuration={3500}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={open}
      message={alert}
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
  const [task, setTask] = useState("");
  const [alert, setAlert] = useState("");
  const [list, setList] = useState([]);

  const handleAdd = async () => {
    setAlert("");
    setTask("Selecting files...");

    const input = createInput();
    const fileList = await getInput(input);
    input.remove();

    const files = Array.from(fileList);
    if (files.length === 0) {
      setAlert("No file selected");
      setTask("");
      return;
    }
    if (!files.every((file) => file.type.match("image.*"))) {
      setAlert("Please select only image files");
      setTask("");
      return;
    }

    setTask("Compressing files...");
    const list = await processImages(files);
    setTask("");
    setList(list);
  };

  return (
    <>
      <Action onClick={handleAdd} />
      <Progress open={!!task} task={task} />
      <Hint open={!!alert} alert={alert} onClose={() => setAlert("")} />
      <DialogAdd
        open={list.length > 0}
        onClose={() => setList([])}
        list={list}
      />
    </>
  );
}
