import { LinearProgress, Stack } from "@mui/material";
import { useRecoilValue } from "recoil";
import { motion } from "framer-motion";

import { toolsItemVar } from "../../Motion";
import { createFilter } from "../../../utils/utils";
import { EDITOR_INPUT, EDITOR_FILTER } from "../../../utils/store";
import { useBlob, useDecode, useEditorPreview } from "../../../utils/hooks";

const imageSize = { width: "100%", height: "100%", objectFit: "contain" };

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
  const [dataUrl, urlState] = useEditorPreview(file);
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
