import { IconButton } from "@mui/material";
import ExpandCircleDownRoundedIcon from "@mui/icons-material/ExpandCircleDownRounded";

export default function ExpandButton({ onClick }) {
  return (
    <IconButton onClick={onClick} color="primary">
      <ExpandCircleDownRoundedIcon sx={{ rotate: "90deg" }} />
    </IconButton>
  );
}
