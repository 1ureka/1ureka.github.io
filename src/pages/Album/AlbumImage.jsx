import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Grow, Skeleton } from "@mui/material";
import { decode, delay } from "../../utils/utils";
import { ALBUM_FILTER, ORIGIN } from "../../utils/store";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { useWindowFocus } from "../../utils/hooks";
import { TransitionGroup } from "react-transition-group";

function AlbumImage({ src }) {
  const imgStyle = {
    borderRadius: "5px",
    maxHeight: "100vh",
  };
  return (
    <TransitionGroup component={null}>
      <Grow timeout={750}>
        <img src={src} alt={""} style={imgStyle} />
      </Grow>
    </TransitionGroup>
  );
}

function FallBack({ src }) {
  const imgStyle = {
    borderRadius: "5px",
    maxHeight: "100vh",
    filter: "blur(10px)",
  };
  const containerSx = {
    height: "100vh",
    aspectRatio: "16/9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const skeleton = (
    <Skeleton animation="wave" variant="rounded" width="100%" height="100%" />
  );
  return (
    <Box sx={containerSx}>
      {src ? <img src={src} alt={""} style={imgStyle} /> : skeleton}
      <CircularProgress sx={{ position: "absolute" }} />
    </Box>
  );
}

export default React.forwardRef(({ name }, ref) => {
  const dataUrl = useRecoilValueLoadable(ORIGIN(name));
  const isWindowFocused = useWindowFocus();
  const [state, setState] = useState(false);
  const [_src, set_src] = useState("");

  useEffect(() => {
    if (!isWindowFocused) return;
    if (dataUrl.state === "hasValue") {
      const img = new Image();
      img.src = dataUrl.contents;
      (async () => {
        await delay(200);
        await decode(img);
        setState(true);
        set_src(dataUrl.contents);
      })();
    }
    return () => {
      setState(false);
    };
  }, [isWindowFocused, dataUrl.state, dataUrl.contents]);

  const { brightness, contrast, saturate } = useRecoilValue(ALBUM_FILTER);
  const containerSx = {
    display: "flex",
    filter: `brightness(${brightness}) contrast(${contrast}) saturate(${saturate})`,
  };
  return (
    <Box sx={containerSx} ref={ref}>
      {state ? <AlbumImage src={_src} /> : <FallBack src={_src} />}
    </Box>
  );
});
