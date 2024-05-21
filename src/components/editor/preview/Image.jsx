import * as React from "react";
import { CircularProgress, Stack } from "@mui/material";
import { useRecoilValue } from "recoil";
import { motion } from "framer-motion";

import { EDITOR_DISPLAY, EDITOR_INPUT } from "../../../utils/store";
import { toolsItemVar } from "../../Motion";
import { blobGetDataUrl } from "../../../utils/utils";
import { useImageFilter, useImageProcess } from "./hooks";

function Origin({ clipPath }) {
  const name = useRecoilValue(EDITOR_DISPLAY);
  const files = useRecoilValue(EDITOR_INPUT);
  const file = files.find((file) => file.name === name);

  const [dataUrl, setDataUrl] = React.useState(null);
  React.useEffect(() => {
    if (file) {
      (async () => {
        const url = await blobGetDataUrl(file);
        setDataUrl(url);
      })();
    }
    return () => setDataUrl(null);
  }, [file]);

  if (dataUrl)
    return (
      <motion.img
        variants={toolsItemVar}
        src={dataUrl}
        alt={name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          clipPath,
        }}
      />
    );

  if (name) return <CircularProgress />;

  return null;
}

function Result({ clipPath }) {
  const filter = useImageFilter();
  const { fileName, result, isProcess } = useImageProcess();

  if (!result) return null;

  return (
    <motion.img
      key={fileName}
      variants={toolsItemVar}
      src={result}
      alt={fileName}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        objectFit: "contain",
        filter,
        clipPath,
      }}
    />
  );
}

export default function Image({ clipPathL, clipPathR }) {
  const [isProcess, setIsProcess] = React.useState(true);

  return (
    <Stack sx={{ position: "relative", width: "100%", height: "100%" }}>
      <Origin clipPath={clipPathL} />
      <Result clipPath={clipPathR} />
    </Stack>
  );
}
