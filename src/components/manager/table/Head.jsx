import * as React from "react";
import { Typography, Checkbox, Button, Stack } from "@mui/material";
import { TableHead, TableRow, TableSortLabel, TableCell } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import { useRecoilState, useRecoilValue } from "recoil";
import { MANAGER_ROWS, MANAGER_SELECTED } from "../../../utils/store";
import { MANAGER_ORDER, MANAGER_ORDER_BY } from "../../../utils/store";
import { DialogDel } from "../dialog/Dialog";

export function EnhancedTableToolbar() {
  const [open, setOpen] = React.useState(false);
  const selected = useRecoilValue(MANAGER_SELECTED);
  const num = selected.length;

  const containerSx = {
    p: 1.5,
    pl: 2.5,
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <Stack direction="row" sx={containerSx}>
      <Typography variant="subTitle1">{num} selected</Typography>
      <Button
        onClick={() => setOpen(true)}
        disabled={!num > 0}
        startIcon={<DeleteRoundedIcon fontSize="small" />}
      >
        Delete
      </Button>
      <DialogDel open={open} onClose={() => setOpen(false)} />
    </Stack>
  );
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "File name",
  },
  {
    id: "size",
    numeric: true,
    disablePadding: false,
    label: "Size (KB)",
  },
];

function LabelCells() {
  const [order, setOrder] = useRecoilState(MANAGER_ORDER);
  const [orderBy, setOrderBy] = useRecoilState(MANAGER_ORDER_BY);
  const createSortHandler = (property) => () => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <>
      {headCells.map((headCell) => (
        <TableCell
          key={headCell.id}
          align={headCell.numeric ? "right" : "left"}
          sortDirection={orderBy === headCell.id ? order : false}
          sx={{ p: 1.5 }}
        >
          <TableSortLabel
            active={orderBy === headCell.id}
            direction={orderBy === headCell.id ? order : "asc"}
            onClick={createSortHandler(headCell.id)}
          >
            <Typography sx={{ lineHeight: 0.1 }}>{headCell.label}</Typography>
          </TableSortLabel>
        </TableCell>
      ))}
    </>
  );
}

function SelectCell() {
  const [selected, setSelected] = useRecoilState(MANAGER_SELECTED);
  const rows = useRecoilValue(MANAGER_ROWS);

  const handleSelectAllClick = (e) => {
    if (e.target.checked) {
      setSelected(rows.map((n) => n.name));
    } else {
      setSelected([]);
    }
  };

  const lengthS = selected.length;
  const lengthA = rows.length;

  return (
    <TableCell padding="checkbox">
      <Checkbox
        color="primary"
        indeterminate={lengthS > 0 && lengthS < lengthA}
        checked={lengthA > 0 && lengthS === lengthA}
        onChange={handleSelectAllClick}
        size="small"
      />
    </TableCell>
  );
}

export function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        <SelectCell />
        <LabelCells />
      </TableRow>
    </TableHead>
  );
}
