import { TableCell, Stack, CircularProgress } from "@mui/material";
import { TableHead, TableRow, TableSortLabel } from "@mui/material";
import { Typography, Checkbox, Button } from "@mui/material";

import { useRecoilState, useRecoilValue } from "recoil";
import { EDITOR_INPUT, EDITOR_ORDER } from "../../../utils/store";
import { useEditorOutput } from "../../../utils/hooks";

function ConvertButton() {
  const { action, loading, disabled } = useEditorOutput();

  return (
    <Button disabled={disabled} variant="contained" onClick={action}>
      Convert
      {loading && <CircularProgress size={30} sx={{ position: "absolute" }} />}
    </Button>
  );
}

export function EnhancedTableToolbar() {
  const input = useRecoilValue(EDITOR_INPUT);
  const numSelected = input.filter((item) => item.selected).length;

  return (
    <Stack direction="row" sx={{ alignItems: "center", pl: 2, pr: 1, py: 1 }}>
      <Typography sx={{ flex: "1" }} component="div">
        {numSelected} selected
      </Typography>
      <ConvertButton />
    </Stack>
  );
}

export function EnhancedTableHead() {
  const [input, setInput] = useRecoilState(EDITOR_INPUT);
  const handleSelectAllClick = (e) => {
    setInput((prev) => {
      const isChecked = e.target.checked;
      return prev.map((item) => ({ ...item, selected: isChecked }));
    });
  };

  const [order, setOrder] = useRecoilState(EDITOR_ORDER);
  const handleSetOrder = () => {
    setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const lengthS = input.filter((item) => item.selected).length;
  const lengthA = input.length;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={lengthS > 0 && lengthS < lengthA}
            checked={lengthA > 0 && lengthS === lengthA}
            onChange={handleSelectAllClick}
            size="small"
          />
        </TableCell>
        <TableCell align={"center"} padding={"none"} sortDirection={order}>
          <TableSortLabel active direction={order} onClick={handleSetOrder}>
            File name
          </TableSortLabel>
        </TableCell>
        <TableCell padding="checkbox" />
      </TableRow>
    </TableHead>
  );
}
