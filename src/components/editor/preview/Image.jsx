import * as React from "react";
import { LinearProgress, Stack } from "@mui/material";
import { useRecoilValue } from "recoil";
import { motion } from "framer-motion";

import { toolsItemVar } from "../../Motion";
import { createFilter, compressImage } from "../../../utils/utils";
import { delay, blobGetDataUrl } from "../../../utils/utils";
import { EDITOR_DISPLAY_FILE, EDITOR_DISPLAY } from "../../../utils/store";
import { EDITOR_FILTER, EDITOR_OUTPUT_SETTING } from "../../../utils/store";
import { useBlob, useDecode } from "../../../utils/hooks";

const imageSize = { width: "100%", height: "100%", objectFit: "contain" };

function useProcessImage(file) {
  const options = useRecoilValue(EDITOR_OUTPUT_SETTING);

  const [state, setState] = React.useState(false);
  const [src, setSrc] = React.useState(null);
  const timeStamp = React.useRef(null);

  const processing = async (file, options, createAt) => {
    await delay(500);
    if (createAt !== timeStamp.current) return;

    const { maxSize, ...restOptions } = options;
    const blob = await compressImage(file, {
      maxSize: maxSize * 1024 * 1024,
      ...restOptions,
    });

    const dataUrl = await blobGetDataUrl(blob);
    setSrc(dataUrl);
    setState(true);
  };

  React.useEffect(() => {
    timeStamp.current = Date.now();
    setState(false);
    if (file) processing(file, options, timeStamp.current);
  }, [file, options]);

  return [src, state];
}

function Origin({ clipPath, name, src, state }) {
  const style = { ...imageSize, clipPath };

  return (
    state && (
      <motion.img variants={toolsItemVar} src={src} alt={name} style={style} />
    )
  );
}

function Result({ clipPath, name, src, state }) {
  const filterOpt = useRecoilValue(EDITOR_FILTER);
  const filter = createFilter(filterOpt);
  const style = { ...imageSize, position: "absolute", filter, clipPath };

  return (
    state && (
      <motion.img
        key={name}
        variants={toolsItemVar}
        src={src}
        alt={name}
        style={style}
      />
    )
  );
}

function useOriginImage(file) {
  const [dataUrl, urlState] = useBlob(file);
  const [src, state] = useDecode(urlState && dataUrl);
  return [src, state];
}

function useResultImage(file) {
  const [dataUrl, urlState] = useProcessImage(file);
  const [src, state] = useDecode(urlState && dataUrl);
  return [src, state];
}

export default function Image({ clipPathL, clipPathR }) {
  const name = useRecoilValue(EDITOR_DISPLAY);
  const file = useRecoilValue(EDITOR_DISPLAY_FILE);
  const [originSrc, originState] = useOriginImage(file);
  const [resultSrc, resultState] = useResultImage(file);
  const state = originState && resultState;

  return (
    <>
      <Stack sx={{ position: "relative", width: "100%", height: "100%" }}>
        <Origin
          clipPath={clipPathL}
          src={originSrc}
          state={originState}
          name={name}
        />
        <Result
          clipPath={clipPathR}
          src={resultSrc}
          state={resultState}
          name={name}
        />
      </Stack>
      {name && !state && (
        <LinearProgress
          sx={{ position: "absolute", bottom: 0, width: "100%" }}
        />
      )}
    </>
  );
}
