import { useState } from "react";
import { List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Box, Button, CircularProgress, Dialog, Skeleton } from "@mui/material";

import ImageSearchRoundedIcon from "@mui/icons-material/ImageSearchRounded";
import { useManagerVerify } from "../../../utils/hooks";

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

function VerifyResult({ list }) {
  return (
    <Box>
      {list.map(({ title, items }, i) => (
        <Box key={i} p={1}>
          <Stack spacing={2} direction="row">
            <Typography>{title}: . . .</Typography>
            <Typography color={items.length > 0 ? "error" : "text.secondary"}>
              {items.length > 0 ? "FAIL" : "PASS"}
            </Typography>
          </Stack>
          {items.length > 0 && (
            <List>
              {items.map((item, itemIndex) => (
                <ListItem key={itemIndex}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      ))}
    </Box>
  );
}

function VerifyDialog({ onClose, open }) {
  const { action, result, loading } = useManagerVerify();
  const date = result ? new Date(result.timeStamp).toLocaleString() : "...";

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
          <VerifyResult list={result.list} />
        )}
      </DialogContent>

      <DialogActions>
        <Typography
          variant="caption"
          sx={{ position: "absolute", left: "16px" }}
        >
          Last check time: {date}
        </Typography>
        <Button onClick={action} disabled={loading}>
          Rerun
          {loading && <Progress />}
        </Button>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function VerifyButton() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleClick = () => setOpen(true);

  return (
    <>
      <Button
        startIcon={<ImageSearchRoundedIcon fontSize="small" />}
        onClick={handleClick}
      >
        Verify Integrity
      </Button>
      <VerifyDialog onClose={handleClose} open={open} />
    </>
  );
}
