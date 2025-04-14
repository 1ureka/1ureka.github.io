import { IconButton } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

const sx = { borderRadius: 2, "& svg": { transition: "scale 0.15s ease" }, "&:active svg": { scale: "0.5 1" } };

const MenuButton = ({ onClick }: { onClick: () => void }) => (
  <IconButton onClick={onClick} centerRipple={false} sx={sx}>
    <MenuRoundedIcon />
  </IconButton>
);

export { MenuButton };
