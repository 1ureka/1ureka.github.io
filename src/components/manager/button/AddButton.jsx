import { useState } from "react";
import { Stack, Backdrop, Typography, Snackbar } from "@mui/material";
import { Button, IconButton, CircularProgress } from "@mui/material";
import AddToPhotosRoundedIcon from "@mui/icons-material/AddToPhotosRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { compressImage } from "../../../utils/utils";

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
      const { dataUrl: thumbnail } = await compressImage(file, 480, 270);
      const name = file.name.replace(/\.[^.]+$/, "");
      return { name, origin, thumbnail };
    })
  );
};

export default function AddButton({ onProcessComplete }) {
  const [process, setProcess] = useState(false);
  const [task, setTask] = useState("");
  const [alert, setAlert] = useState("");
  const handleAdd = async () => {
    setAlert("");
    setProcess(true);
    setTask("Selecting files...");

    const input = createInput();
    const fileList = await getInput(input);
    input.remove();

    const files = Array.from(fileList);
    if (files.length === 0) {
      setAlert("No file selected");
      setProcess(false);
      return;
    }
    if (!files.every((file) => file.type.match("image.*"))) {
      setAlert("Please select only image files");
      setProcess(false);
      return;
    }

    setTask("Compressing files...");
    const list = await processImages(files);
    setProcess(false);
    onProcessComplete(list);
  };

  return (
    <>
      <Button
        startIcon={<AddToPhotosRoundedIcon fontSize="small" />}
        sx={(theme) => theme.typography.caption}
        onClick={handleAdd}
      >
        Add Image
      </Button>

      <Backdrop
        open={process}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }}
      >
        <Stack alignItems={"center"} spacing={2}>
          <CircularProgress color="primary" disableShrink />
          <Typography variant="body2">{task}</Typography>
        </Stack>
      </Backdrop>

      <Snackbar
        autoHideDuration={3000}
        open={!!alert}
        message={alert}
        action={
          <IconButton size="small" onClick={onClose} color="inherit">
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        }
        onClose={(_, reason) => {
          if (reason !== "clickaway") setAlert("");
        }}
      />
    </>
  );
}
