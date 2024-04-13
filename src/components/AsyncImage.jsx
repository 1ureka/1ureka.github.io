import React, { useEffect, useState } from "react";
import { Box, Skeleton } from "@mui/material";
import { decode } from "../utils/utils";
import { useWindowFocus } from "../utils/hooks";

export default React.forwardRef(({ src, style, ...props }, ref) => {
  const isWindowFocused = useWindowFocus();
  const [state, setState] = useState(false);
  const [_src, set_src] = useState(src);

  useEffect(() => {
    if (!isWindowFocused) return;
    const img = new Image();
    img.src = src;
    (async () => {
      await decode(img);
      setState(true);
      set_src(src);
    })();
    return () => {
      setState(false);
    };
  }, [src, isWindowFocused]);

  const sx = {
    position: style.position ? style.position : "absolute",
    width: style.width ? style.width : "100%",
    height: style.height ? style.height : "100%",
    ...style,
  };

  const imgStyle = {
    position: "absolute",
    borderRadius: "5px",
    width: "100%",
    height: "100%",
    objectFit: style.objectFit ? style.objectFit : "cover",
    objectPosition: style.objectPosition,
  };

  return (
    <Box sx={sx} ref={ref}>
      {state ? (
        <img src={_src} alt={""} style={imgStyle} {...props} />
      ) : (
        <Skeleton
          animation="wave"
          variant="rounded"
          width={"100%"}
          height={"100%"}
        />
      )}
    </Box>
  );
});
