import { Box, Chip, Dialog, IconButton, Skeleton, Tooltip } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import type { DialogProps } from "@mui/material/Dialog";

function deterministicRandomFromName(name: string): 1 | 2 | 3 | 4 {
  const hash = djb2(name);
  const value = (hash % 4) + 1;
  return value as 1 | 2 | 3 | 4;
}

function djb2(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i); // hash * 33 + c
  }
  return Math.abs(hash);
}

const getRandomAspectRatio = (name: string) => {
  const aspectRatios = ["16/9", "4/3", "1/1", "3/2"];
  return aspectRatios[deterministicRandomFromName(name) - 1];
};

const PhotoDialog = ({ open, onClose, name, ...props }: DialogProps & { name: string }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{ paper: { elevation: 1, sx: { overflow: "hidden", position: "relative" } } }}
      maxWidth="md"
      fullWidth
      {...props}
    >
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{ aspectRatio: getRandomAspectRatio(name), width: 1, height: "auto", bgcolor: "divider" }}
      />

      <Box sx={{ position: "absolute", inset: "auto 0 0 0", p: 1, display: "grid", placeItems: "center" }}>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Box sx={{ maxWidth: 200 }}>
            <Chip label={name} />
          </Box>
          <Tooltip title="下載圖片" arrow>
            <IconButton size="small">
              <DownloadRoundedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box sx={{ position: "absolute", inset: "0 0 auto auto", p: 1 }}>
        <IconButton onClick={(e) => onClose && onClose(e, "escapeKeyDown")}>
          <CloseRoundedIcon />
        </IconButton>
      </Box>
    </Dialog>
  );
};

export { PhotoDialog };
