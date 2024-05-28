import { Typography } from "@mui/material";
import { MotionButtonBase } from "../../Motion";
import { motion } from "framer-motion";

export default function NavButton({ title, info, selected, onClick }) {
  const buttonSx = {
    display: "flex",
    justifyContent: "flex-start",
    gap: 2,
    p: 2,
  };

  const lineSx = {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    background: "#fff",
  };

  const lineVar = {
    selected: { originX: [0], scaleX: 1 },
    unselected: { originX: [1], scaleX: 0 },
  };

  return (
    <MotionButtonBase
      onClick={onClick}
      sx={buttonSx}
      variants={{ hover: { x: 10 } }}
      animate={selected ? "selected" : "unselected"}
      whileHover={["selected", "hover"]}
    >
      <Typography variant="h5" sx={{ position: "relative" }}>
        {title}
        <motion.div variants={lineVar} style={lineSx} />
      </Typography>
      <Typography variant="body2" sx={{ textWrap: "nowrap" }}>
        {info}
      </Typography>
    </MotionButtonBase>
  );
}
