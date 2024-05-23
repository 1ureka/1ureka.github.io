import * as React from "react";
import { Button, CircularProgress } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";

import { EDITOR_FILTER, EDITOR_OUTPUT } from "../../../utils/store";
import { EDITOR_INPUT } from "../../../utils/store";
import { compressImage, filterImage } from "../../../utils/utils";
import { blobGetDataUrl } from "../../../utils/utils";

function useOptions() {
  const outputOptions = useRecoilValue(EDITOR_OUTPUT);
  const filterOptions = useRecoilValue(EDITOR_FILTER);
  const options = { ...outputOptions, ...filterOptions };
  options.maxSize *= 1024 * 1024;

  return options;
}

function processImages({ selected, options }) {
  return Promise.all(
    selected.map(async ({ file }) => {
      const filtered = await filterImage(file, options);
      const blob = await compressImage(filtered, options);
      const dataUrl = await blobGetDataUrl(blob);

      return {
        dataUrl,
        name: file.name.slice(0, file.name.lastIndexOf(".")),
      };
    })
  );
}

function downloadImages(results) {
  results.forEach(({ dataUrl, name }) => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = name;
    link.click();
  });
}

// useEditorOutput?
function useAction() {
  const [input, setInput] = useRecoilState(EDITOR_INPUT);
  const selected = input.filter((item) => item.selected);

  const [loading, setLoading] = React.useState(false);
  const disabled = selected.length === 0 || loading;
  const options = useOptions();

  const action = async () => {
    setLoading(true);
    const results = await processImages({ selected, options });
    setInput((prev) => prev.filter((item) => !item.selected));

    downloadImages(results);
    setLoading(false);
  };

  return [action, loading, disabled];
}

export default function Action() {
  const [handleClick, loading, disabled] = useAction();

  return (
    <Button
      disabled={disabled}
      sx={(theme) => theme.typography.caption}
      variant="contained"
      onClick={handleClick}
    >
      Convert
      {loading && <CircularProgress size={30} sx={{ position: "absolute" }} />}
    </Button>
  );
}
