import { MotionIconButton } from "../../Motion";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

export default function SettingButton({ onClick, open }) {
  const variants = {
    open: {
      outlineOffset: "3.5px",
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    close: {
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  const backgroundColor = open ? "#fff" : null;
  const sx = {
    backgroundColor,
    outline: "1px solid gray",
    "&:hover": { outline: "1px solid #fff", backgroundColor },
    color: (theme) => (open ? theme.palette.background.paper : null),
  };

  return (
    <MotionIconButton
      variants={variants}
      animate={open ? "open" : "close"}
      onClick={onClick}
      sx={sx}
    >
      <SettingsRoundedIcon sx={{ fontSize: "20px" }} />
    </MotionIconButton>
  );
}
