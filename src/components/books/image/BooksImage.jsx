import { Box, Skeleton } from "@mui/material";
import useDecoding from "./useDecoding";

export default function BooksImage({ category, name }) {
  const [src, state] = useDecoding(category, name);

  const size = { width: "100%", height: "100%" };
  const imageSX = {
    borderRadius: "5px",
    objectFit: "cover",
    opacity: 0.95,
    ...size,
  };

  return (
    <Box sx={size}>
      {state ? (
        <img src={src} alt={`Thumbnail of ${name}`} style={imageSX} />
      ) : (
        <Skeleton animation="wave" variant="rounded" sx={size} />
      )}
    </Box>
  );
}
