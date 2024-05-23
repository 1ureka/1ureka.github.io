import * as React from "react";
import { LinearProgress, Stack } from "@mui/material";
import { useRecoilValue } from "recoil";
import { motion } from "framer-motion";

import { toolsItemVar } from "../../Motion";
import { createFilter, compressImage } from "../../../utils/utils";
import { delay, blobGetDataUrl } from "../../../utils/utils";
import { EDITOR_INPUT } from "../../../utils/store";
import { EDITOR_FILTER, EDITOR_OUTPUT } from "../../../utils/store";
import { useBlob, useDecode } from "../../../utils/hooks";

const imageSize = { width: "100%", height: "100%", objectFit: "contain" };

// useEditorPreview?
function useProcessImage(file) {
  const options = useRecoilValue(EDITOR_OUTPUT);

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

function Origin({ clipPath, src, state }) {
  const style = { ...imageSize, clipPath };

  return (
    state && (
      <motion.img variants={toolsItemVar} src={src} alt={""} style={style} />
    )
  );
}

function Result({ clipPath, src, state }) {
  const filterOpt = useRecoilValue(EDITOR_FILTER);
  const filter = createFilter(filterOpt);
  const style = { ...imageSize, position: "absolute", filter, clipPath };

  return (
    state && (
      <motion.img variants={toolsItemVar} src={src} alt={""} style={style} />
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
  const input = useRecoilValue(EDITOR_INPUT);
  const file = input.find((item) => item.display)?.file;

  const [originSrc, originState] = useOriginImage(file);
  const [resultSrc, resultState] = useResultImage(file);
  const state = originState && resultState;

  return (
    <>
      <Stack sx={{ position: "relative", width: "100%", height: "100%" }}>
        <Origin clipPath={clipPathL} src={originSrc} state={originState} />
        <Result clipPath={clipPathR} src={resultSrc} state={resultState} />
      </Stack>
      {file && !state && (
        <LinearProgress
          sx={{ position: "absolute", bottom: 0, width: "100%" }}
        />
      )}
    </>
  );
}
