import React, { useEffect, useState } from "react";
import { Box, Skeleton } from "@mui/material";
import { decode } from "../utils/utils";
import { THUMBNAILS } from "../utils/store";
import { useRecoilValueLoadable } from "recoil";
import { useWindowFocus } from "../utils/hooks";

export default React.forwardRef(({ name, style, isView }, ref) => {
  const dataUrl = useRecoilValueLoadable(THUMBNAILS(name));
  const isWindowFocused = useWindowFocus();
  const [state, setState] = useState(false);
  const [_src, set_src] = useState("");

  useEffect(() => {
    if (!isView) return;
    if (!isWindowFocused) return;
    if (dataUrl.state === "hasValue") {
      const img = new Image();
      img.src = dataUrl.contents;
      (async () => {
        await decode(img);
        setState(true);
        set_src(dataUrl.contents);
      })();
    }
    return () => {
      setState(false);
    };
  }, [isView, isWindowFocused, dataUrl.state, dataUrl.contents]);

  const imgStyle = {
    borderRadius: "5px",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  return (
    <Box sx={{ ...style, aspectRatio: "16/9" }} ref={ref}>
      {state ? (
        <img src={_src} alt={""} style={imgStyle} />
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
