import { IconButton } from "@mui/material";

export default function StyledIconButton({ onClick, icon, disabled }) {
  const sx = {
    outline: "1px solid gray",
    "&:hover": { outline: "1px solid #fff" },
    transition: "all 0.2s",
  };

  return (
    <IconButton size="small" sx={sx} disabled={disabled} onClick={onClick}>
      {icon}
    </IconButton>
  );
}
