import * as React from "react";
import { Button, CircularProgress } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";

import { EDITOR_FILTER, EDITOR_INPUT } from "../../../utils/store";
import { EDITOR_OUTPUT_SETTING } from "../../../utils/store";
import { EDITOR_SELECTED } from "../../../utils/store";

function useAction() {
  const [selected, setSelected] = useRecoilState(EDITOR_SELECTED);
  const [input, setInput] = useRecoilState(EDITOR_INPUT);
  const outputOptions = useRecoilValue(EDITOR_OUTPUT_SETTING);
  const filterOptions = useRecoilValue(EDITOR_FILTER);

  const [loading, setLoading] = React.useState(false);
  const findFile = (name) => input.find((file) => file.name === name);

  const action = async () => {
    setLoading(true);

    /** @type {string[]} */
    const results = await Promise.all(
      selected.map((name) => {
        const file = findFile(name);
        console.log(`compress ${file.name}... with options`);
        console.table(outputOptions);
        console.table(filterOptions);
      })
    );

    setInput((prev) =>
      prev.filter((file) => !selected.some((name) => file.name === name))
    );
    setSelected([]);

    // const list = results.map((result, i) => ({ name: names[i], ...result }));
    // list.forEach(({ dataUrl, name }) => {
    //   const link = document.createElement("a");
    //   link.href = dataUrl;
    //   link.download = `${name.substring(0, name.lastIndexOf("."))}.${type}`;
    //   link.click();
    // });

    setLoading(false);
  };

  return [action, loading, selected.length === 0 || loading];
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
