import { Box, Skeleton } from "@mui/material";
import { useBooksImageLoad } from "../../../utils/hooks";
import { MotionBox } from "../../Motion";

export default function GalleryImage({ category, name, reflect }) {
  const [src, state] = useBooksImageLoad(category, name, "1K");

  const reflectSx = (clipPath) => ({
    clipPath,
    zIndex: 1,
    pointerEvents: "none",
    position: "absolute",
    inset: 0,
    filter: "blur(35px)",
    background: (theme) =>
      `linear-gradient(150deg, ${theme.palette.divider}, transparent)`,
  });

  return (
    <Box sx={{ aspectRatio: "172/100" }}>
      {state ? (
        <img
          src={src}
          alt={`Thumbnail of ${name}`}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.95,
          }}
        />
      ) : (
        <Skeleton
          animation="wave"
          variant="rounded"
          sx={{ width: "100%", height: "100%" }}
        />
      )}

      <MotionBox
        animate={reflect ? { opacity: 1, x: -30 } : { opacity: 0, x: -90 }}
        sx={reflectSx("polygon(35% 0, 50% 0, 25% 100%, 10% 100%)")}
      />
      <MotionBox
        animate={reflect ? { opacity: 1, x: 10 } : { opacity: 0, x: -50 }}
        sx={reflectSx("polygon(40% 0, 50% 0, 25% 100%, 15% 100%)")}
      />
    </Box>
  );
}
