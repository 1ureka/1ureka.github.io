import { Stack } from "@mui/material";
import { motion } from "framer-motion";

function Placeholder() {
  return (
    <img
      style={{ maxWidth: "100%", maxHeight: "100%", visibility: "hidden" }}
      src="https://fakeimg.pl/1920x1080/"
      alt=""
    ></img>
  );
}

function Backdrop({ children }) {
  const sx = {
    position: "fixed",
    inset: 0,
    justifyContent: "center",
    alignItems: "center",
  };

  return <Stack style={sx}>{children}</Stack>;
}

export default function Container({ children, style, ...props }) {
  const sx = {
    display: "flex",
    alignItems: "center",
    position: "relative",
    maxWidth: "75%",
    maxHeight: "77.5%",
    overflow: "hidden",
    ...style,
  };

  return (
    <Backdrop>
      <motion.div style={sx} layout {...props}>
        <Placeholder />
        {children}
      </motion.div>
    </Backdrop>
  );
}
