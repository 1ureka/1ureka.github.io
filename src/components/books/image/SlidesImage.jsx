import { motion } from "framer-motion";
import { Skeleton } from "@mui/material";
import useDecoding from "./useDecoding";

export default function SlidesImage({ category, name, selected }) {
  const [src, state] = useDecoding(category, name);

  const size = { width: "100%", height: "100%" };
  const imageSX = {
    borderRadius: "5px",
    objectFit: "cover",
    ...size,
  };
  const skeletonSx = {
    aspectRatio: "16/9",
    ...size,
  };
  const containerSx = {
    position: "relative",
    translate: "0 -50%",
    transformOrigin: "right",
  };

  const variants = {
    selected: { opacity: 1, scale: 0.9 },
    unSelected: { opacity: 0.85, scale: 0.65 },
  };
  const animate = selected ? "selected" : "unSelected";

  return (
    <motion.div variants={variants} animate={animate} style={containerSx}>
      {state ? (
        <img src={src} alt={`Thumbnail of ${name}`} style={imageSX} />
      ) : (
        <Skeleton animation="wave" variant="rounded" sx={skeletonSx} />
      )}
    </motion.div>
  );
}
