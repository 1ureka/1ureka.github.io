import * as React from "react";
import { Button, CircularProgress } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";

import { EDITOR_DISPLAY, EDITOR_FILTER } from "../../../utils/store";
import { EDITOR_OUTPUT_SETTING } from "../../../utils/store";
import { EDITOR_SELECTED, EDITOR_INPUT } from "../../../utils/store";
import { compressImage, filterImage } from "../../../utils/utils";
import { blobGetDataUrl } from "../../../utils/utils";

function useOptions() {
  const outputOptions = useRecoilValue(EDITOR_OUTPUT_SETTING);
  const filterOptions = useRecoilValue(EDITOR_FILTER);
  const options = { ...outputOptions, ...filterOptions };
  options.maxSize *= 1024 * 1024;

  return options;
}

function processImages({ input, selected, options }) {
  return Promise.all(
    selected.map(async (name) => {
      const file = input.find((file) => file.name === name);
      const filtered = await filterImage(file, options);
      const blob = await compressImage(filtered, options);
      const dataUrl = await blobGetDataUrl(blob);

      return {
        dataUrl,
        name: name.slice(0, name.lastIndexOf(".")),
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

function useAction() {
  const [input, setInput] = useRecoilState(EDITOR_INPUT);
  const [selected, setSelected] = useRecoilState(EDITOR_SELECTED);
  const [display, setDisplay] = useRecoilState(EDITOR_DISPLAY);

  const [loading, setLoading] = React.useState(false);
  const disabled = selected.length === 0 || loading;
  const options = useOptions();

  const action = async () => {
    setLoading(true);
    const results = await processImages({ input, selected, options });

    const isSelected = (name) => selected.includes(name);
    if (isSelected(display)) setDisplay("");
    setInput((prev) => prev.filter((file) => !isSelected(file.name)));
    setSelected([]);

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
