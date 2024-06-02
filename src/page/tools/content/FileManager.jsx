import { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import AddToPhotosRoundedIcon from "@mui/icons-material/AddToPhotosRounded";
import ImageSearchRoundedIcon from "@mui/icons-material/ImageSearchRounded";

import { LoadingScreen, Table } from "../../../components/manager";
import { DryModeSwitch, ToggleButtons } from "../../../components/manager";
import { VerifyDialog } from "../../../components/manager";
import { DeleteDialog, UploadDialog } from "../../../components/manager";
import { ConsecutiveSnackbars } from "../../../components/manager";

import { MotionBox, MotionStack } from "../../../components/Motion";
import { managerItemVar } from "../../../components/Motion";

import { useManagerCategory } from "../../../utils/hooks";
import { blobGetDataUrl, compressImage } from "../../../utils/utils";
import { getNativeFiles } from "../../../utils/utils";

function processImages(files) {
  return Promise.all(
    files.map(async (file) => {
      const blobO = await compressImage(file);
      const blobT = await compressImage(file, { scale: 0.125 });
      const origin = await blobGetDataUrl(blobO);
      const thumbnail = await blobGetDataUrl(blobT);
      const name = file.name.replace(/\.[^.]+$/, "");
      return { name, origin, thumbnail };
    })
  );
}

export default function FileManager() {
  const { category, handleToggle } = useManagerCategory();

  const [stateL, setloadScreen] = useState({ open: false, info: "" });
  const [stateS, setSnack] = useState({ timeStamp: Date.now(), message: "" });
  const [stateD, setDialog] = useState({ id: "", props: {} });

  const handleAddClick = async () => {
    setloadScreen({ open: true, info: "Selecting files..." });

    const files = await getNativeFiles();
    if (files.length === 0) {
      setloadScreen((prev) => ({ ...prev, open: false }));
      setSnack({ timeStamp: Date.now(), message: "No file selected" });
      return;
    }
    if (!files.every((file) => file.type.match("image.*"))) {
      setloadScreen((prev) => ({ ...prev, open: false }));
      setSnack({
        timeStamp: Date.now(),
        message: "Please select only image files",
      });
      return;
    }

    setloadScreen({ open: true, info: "Compressing files..." });
    const list = await processImages(files);
    setloadScreen((prev) => ({ ...prev, open: false }));
    setDialog({ id: "upload", props: { list: list } });
  };

  const handleDelClick = (selected) => {
    setDialog({ id: "delete", props: { list: selected } });
  };

  const handleVerClick = () => {
    setDialog({ id: "verify", props: {} });
  };

  const handleDialogClose = (_, message) => {
    setDialog((prev) => ({ ...prev, id: "" }));
    message && setSnack({ timeStamp: Date.now(), message });
  };

  return (
    <Stack
      direction="row"
      sx={{ position: "relative", width: "100%", height: "100%", p: 3 }}
    >
      <MotionStack variants={managerItemVar} sx={{ px: 4, py: 3 }} spacing={8}>
        <MotionStack variants={managerItemVar} gap={1} alignItems="flex-start">
          <Typography variant="subTitle2">CATEGORY:</Typography>
          <ToggleButtons value={category} onChange={handleToggle} />
        </MotionStack>

        <MotionStack variants={managerItemVar} gap={1} alignItems="flex-start">
          <Typography variant="subTitle2">OPERATION:</Typography>

          <Button
            startIcon={<AddToPhotosRoundedIcon fontSize="small" />}
            onClick={handleAddClick}
          >
            Add Image
          </Button>

          <Button
            startIcon={<ImageSearchRoundedIcon fontSize="small" />}
            onClick={handleVerClick}
          >
            Verify Integrity
          </Button>
        </MotionStack>

        <Box sx={{ flexGrow: 1 }} />

        <MotionBox variants={managerItemVar}>
          <DryModeSwitch />
        </MotionBox>
      </MotionStack>

      <MotionStack
        variants={managerItemVar}
        sx={{
          flexGrow: 1,
          px: 8,
          py: 3,
          height: "100%",
          overflowY: "auto",
        }}
      >
        <Table onDelete={handleDelClick} />
      </MotionStack>

      <LoadingScreen {...stateL} />
      <ConsecutiveSnackbars {...stateS} />

      <VerifyDialog open={stateD.id === "verify"} onClose={handleDialogClose} />
      <UploadDialog
        open={stateD.id === "upload"}
        onClose={handleDialogClose}
        {...stateD.props}
      />
      <DeleteDialog
        open={stateD.id === "delete"}
        onClose={handleDialogClose}
        {...stateD.props}
      />
    </Stack>
  );
}
