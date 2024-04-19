import { useState } from "react";
import { Stack, Backdrop, Typography, Snackbar } from "@mui/material";
import { Button, IconButton, CircularProgress } from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import ThemeControl from "../../components/ThemeControl";
import { compressImage } from "../../utils/utils";

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
      const { dataUrl: origin } = await compressImage(file, 3840, 2160);
      const { dataUrl: thumbnail } = await compressImage(file, 1920, 1080);
      const name = file.name.replace(/\.[^.]+$/, "");
      return { name, origin, thumbnail };
    })
  );
};

//
// Elements
function Alert({ open, onClose, message }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
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

export default function AddButton({ onAdd }) {
  const [isProcess, setIsProcess] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alert, setAlert] = useState("");
  const [task, setTask] = useState("Compressing ?");

  const handleAdd = async () => {
    setOpenAlert(false);
    setIsProcess(true);
    setTask("Selecting files...");

    const input = createInput();
    const fileList = await getInput(input);
    input.remove();

    const files = Array.from(fileList);
    if (files.length === 0) {
      setAlert("No file selected");
      setOpenAlert(true);
      setIsProcess(false);
      return;
    }
    if (!files.every((file) => file.type.match("image.*"))) {
      setAlert("Please select only image files");
      setOpenAlert(true);
      setIsProcess(false);
      return;
    }

    setTask("Compressing files...");
    const list = await processImages(files);
    setIsProcess(false);

    onAdd(list);
  };
  const handleAlertClose = (_, reason) => {
    if (reason !== "clickaway") setOpenAlert(false);
  };

  return (
    <>
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <Button
          variant="contained"
          endIcon={<AddRoundedIcon />}
          onClick={handleAdd}
        >
          Add Image
        </Button>
        <ThemeControl />
      </Stack>

      <Backdrop
        open={isProcess}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Stack alignItems={"center"} spacing={2}>
          <CircularProgress color="primary" disableShrink />
          <Typography variant="body2">{task}</Typography>
        </Stack>
      </Backdrop>

      <Alert open={openAlert} onClose={handleAlertClose} message={alert} />
    </>
  );
}
