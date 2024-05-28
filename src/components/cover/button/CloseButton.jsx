import { IconButton } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function CloseButton({ onClick }) {
  return (
    <IconButton onClick={onClick}>
      <CloseRoundedIcon sx={{ fontSize: "24px" }} />
    </IconButton>
  );
}
