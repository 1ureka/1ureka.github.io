import { useEffect, useState } from "react";
import { Box, Skeleton } from "@mui/material";
import { decode } from "../../utils/utils";
import { THUMBNAILS } from "../../utils/store";
import { useRecoilValueLoadable } from "recoil";
import { motion } from "framer-motion";

function useDecoding(category, name) {
  const dataUrl = useRecoilValueLoadable(
    THUMBNAILS([category, name].join("/"))
  );

  const [state, setState] = useState(false);
  const [src, setSrc] = useState("");

  const decoding = () => {
    setState(false);
    const img = new Image();
    img.src = dataUrl.contents;

    (async () => {
      await decode(img);
      setSrc(dataUrl.contents);
      setState(true);
    })();
  };

  useEffect(() => {
    if (dataUrl.state === "hasValue") decoding();
  }, [dataUrl.state, dataUrl.contents]);

  useEffect(() => {
    window.addEventListener("focus", decoding);
    return () => window.removeEventListener("focus", decoding);
  }, []);

  return [src, state];
}

export default function AsyncImage({ category, name }) {
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
