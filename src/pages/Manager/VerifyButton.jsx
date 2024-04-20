import { Button, CircularProgress, Dialog, Skeleton } from "@mui/material";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Typography } from "@mui/material";
import ImageSearchRoundedIcon from "@mui/icons-material/ImageSearchRounded";
import { runWorkflow } from "../../utils/utils";
import { useState } from "react";

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

export default function VerifyDialog() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState({});
  const handleClick = async () => {
    setOpen(true);
    setLoading(true);
    const result = await runWorkflow("validator");
    setResult(result);
    setLoading(false);
  };
  const handleClose = () => {
    if (!loading) setOpen(false);
  };

  return (
    <>
      <Button
        variant="text"
        startIcon={<ImageSearchRoundedIcon />}
        onClick={handleClick}
      >
        Verify Integrity
      </Button>

      <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth>
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
          <Button onClick={handleClose} disabled={loading}>
            Close
            {loading && <Progress />}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
