import { TableCell, Stack } from "@mui/material";
import { TableHead, TableRow, TableSortLabel } from "@mui/material";
import { Typography, Checkbox } from "@mui/material";

import { useRecoilState, useRecoilValue } from "recoil";
import { EDITOR_INPUT_NAMES, EDITOR_SELECTED } from "../../../utils/store";
import { EDITOR_ORDER } from "../../../utils/store";
import Action from "../action/Action";

export function EnhancedTableToolbar() {
  const selected = useRecoilValue(EDITOR_SELECTED);
  const numSelected = selected.length;

  return (
    <Stack direction="row" sx={{ alignItems: "center", pl: 2, pr: 1, py: 1 }}>
      <Typography sx={{ flex: "1" }} variant="caption" component="div">
        {numSelected} selected
      </Typography>
      <Action />
    </Stack>
  );
}

function EnhancedTableSortLable({ label }) {
  const [order, setOrder] = useRecoilState(EDITOR_ORDER);
  const handleSetOrder = () => {
    setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <TableSortLabel
      active
      direction={order}
      onClick={handleSetOrder}
      sx={(theme) => theme.typography.caption}
    >
      {label}
    </TableSortLabel>
  );
}

export function EnhancedTableHead() {
  const [selected, setSelected] = useRecoilState(EDITOR_SELECTED);
  const names = useRecoilValue(EDITOR_INPUT_NAMES);
  const handleSelectAllClick = (e) => {
    setSelected(() => (e.target.checked ? [...names] : []));
  };

  const order = useRecoilValue(EDITOR_ORDER);
  const lengthS = selected.length;
  const lengthA = names.length;

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
          <EnhancedTableSortLable label="File name" />
        </TableCell>
        <TableCell padding="checkbox"></TableCell>
      </TableRow>
    </TableHead>
  );
}
