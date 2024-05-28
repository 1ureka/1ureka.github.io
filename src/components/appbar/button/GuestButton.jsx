import { Button, Stack } from "@mui/material";

export default function GuestButton({ loading }) {
  return (
    <Stack alignItems="center" width="100%">
      <Button
        size="small"
        disabled={loading}
        type="button"
        sx={{ fontSize: (theme) => theme.typography.caption.fontSize }}
      >
        Sign in as a guest
      </Button>
    </Stack>
  );
}
