import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Grow, Skeleton } from "@mui/material";
import { decode, delay } from "../../utils/utils";
import { ORIGIN } from "../../utils/store";
import { useRecoilValueLoadable } from "recoil";
import { useWindowFocus } from "../../utils/hooks";
import { TransitionGroup } from "react-transition-group";

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

  const imgStyle = {
    borderRadius: "5px",
    maxHeight: "100vh",
  };

  const fallBack = {
    ...imgStyle,
    filter: "blur(10px)",
  };

  return (
    <Box sx={{ display: "flex" }} ref={ref}>
      {state ? (
        <TransitionGroup component={null}>
          <Grow timeout={750}>
            <img src={_src} alt={""} style={imgStyle} />
          </Grow>
        </TransitionGroup>
      ) : (
        <Box
          sx={{
            height: "100vh",
            aspectRatio: "16/9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {_src ? (
            <img src={_src} alt={""} style={fallBack} />
          ) : (
            <Skeleton
              animation="wave"
              variant="rounded"
              width={"100%"}
              height={"100%"}
            />
          )}
          <CircularProgress sx={{ position: "absolute" }} />
        </Box>
      )}
    </Box>
  );
});
