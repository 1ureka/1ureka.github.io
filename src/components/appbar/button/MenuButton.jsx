import { MotionIconButton } from "../../Motion";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

export default function MenuButton({ onClick, open, isAuth }) {
  const variants = {
    tap: {
      scale: 0.9,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    hover: {
      outlineOffset: "3.5px",
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  const sx = {
    outline: "1px solid gray",
    "&:hover": {
      outline: "solid 1px #fff",
      backgroundColor: "#fff",
      color: (theme) => theme.palette.background.paper,
    },
  };

  return (
    <MotionIconButton
      size="small"
      sx={sx}
      onClick={onClick}
      variants={variants}
      whileHover="hover"
      whileTap="tap"
    >
      {open ? (
        <CloseRoundedIcon fontSize="medium" />
      ) : isAuth ? (
        <MenuRoundedIcon fontSize="medium" />
      ) : (
        <LockRoundedIcon fontSize="medium" />
      )}
    </MotionIconButton>
  );
}
