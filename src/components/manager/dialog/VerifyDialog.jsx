import { Box, Button, Stack, Typography } from "@mui/material";
import { CircularProgress, Skeleton, Dialog } from "@mui/material";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { List, ListItem, ListItemText } from "@mui/material";
import { useManagerVerify } from "../../../utils/hooks";

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

export default function VerifyDialog({ open, onClose }) {
  const { action, result, loading } = useManagerVerify();
  const date = result ? new Date(result.timeStamp).toLocaleString() : "...";

  return (
    <Dialog onClose={(e) => onClose(e)} open={open} maxWidth="sm" fullWidth>
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
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
