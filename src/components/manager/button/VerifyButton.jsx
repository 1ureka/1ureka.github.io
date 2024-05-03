import { Button } from "@mui/material";
import ImageSearchRoundedIcon from "@mui/icons-material/ImageSearchRounded";

export default function VerifyButton() {
  return (
    <Button
      startIcon={<ImageSearchRoundedIcon fontSize="small" />}
      sx={(theme) => theme.typography.caption}
    >
      Verify Integrity
    </Button>
  );
}
