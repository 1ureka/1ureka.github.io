import { Backdrop, CircularProgress, Stack, Typography } from "@mui/material";

export default function loadingScreen({ open, info }) {
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
        <Typography variant="body2">{info}</Typography>
      </Stack>
    </Backdrop>
  );
}
