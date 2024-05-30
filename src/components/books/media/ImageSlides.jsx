import { Skeleton } from "@mui/material";
import { useBooksImageLoad } from "../../../utils/hooks";
import { useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { MotionBox, MotionStack } from "../../Motion";

function Image({ category, name }) {
  const [src, state] = useBooksImageLoad(category, name, "1K");

  const sx = {
    display: "block",
    width: "100%",
    height: "auto",
    aspectRatio: "16/9",
    objectFit: "cover",
  };

  return state ? (
    <img src={src} alt={`Thumbnail of ${name}`} style={sx} />
  ) : (
    <Skeleton animation="wave" variant="rounded" sx={sx} />
  );
}

export default function ImageSlides({ rows, selected }) {
  const spring = useSpring(0, { stiffness: 110, damping: 22 });
  const y = useTransform(
    spring,
    (latest) => `calc(50vh + (-100% / ${rows.length}) * ${latest})`
  );
  useEffect(() => {
    spring.set(selected);
  }, [selected]);

  return (
    <MotionStack style={{ y }}>
      {rows.map(({ category, name }, i) => (
        <MotionBox
          key={name}
          sx={{
            translate: "0 -50%",
            transformOrigin: "right",
            borderRadius: 1,
            overflow: "clip",
          }}
          animate={
            i === selected
              ? { opacity: 1, scale: 0.9 }
              : { opacity: 0.85, scale: 0.65 }
          }
        >
          <Image category={category} name={name} />
        </MotionBox>
      ))}
    </MotionStack>
  );
}
