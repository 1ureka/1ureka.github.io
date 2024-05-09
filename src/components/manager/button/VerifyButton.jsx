import { useState } from "react";
import { Button, CircularProgress, Dialog, Skeleton } from "@mui/material";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Typography } from "@mui/material";

import ImageSearchRoundedIcon from "@mui/icons-material/ImageSearchRounded";

import { runWorkflow } from "../../../utils/utils";

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

function Action({ onClick }) {
  return (
    <Button
      startIcon={<ImageSearchRoundedIcon fontSize="small" />}
      sx={(theme) => theme.typography.caption}
      onClick={onClick}
    >
      Verify Integrity
    </Button>
  );
}

function Content({ onClose, open, result }) {
  const loading = !result;
  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {loading ? "Verifying..." : "Verify Result:"}
      </DialogTitle>

      <DialogContent dividers>
        {loading ? (
          <>
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
          </>
        ) : (
          <Typography sx={{ whiteSpace: "pre-wrap" }}>
            {JSON.stringify(result, null, 2)}
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Close
          {loading && <Progress />}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function VerifyButton() {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState(null);
  const handleClick = async () => {
    setOpen(true);
    const result = await runWorkflow("valid");
    setResult(result);
  };
  const handleClose = () => {
    if (!result) return;
    setOpen(false);
    setResult(null);
  };
  return (
    <>
      <Action onClick={handleClick} />
      <Content onClose={handleClose} open={open} result={result} />
    </>
  );
}
