import * as React from "react";
import { alpha } from "@mui/material/styles";
import { Toolbar, Tooltip, TableCell } from "@mui/material";
import { TableHead, TableRow, TableSortLabel } from "@mui/material";
import { Typography, Checkbox, IconButton } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { MANAGER_ROWS, TABLE_ROWS_LENGTH } from "../../../utils/store";
import { TABLE_ORDER, TABLE_ORDER_BY } from "../../../utils/store";
import { TABLE_SELECTED, TABLE_SELECTED_LENGTH } from "../../../utils/store";

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

export function EnhancedTableToolbar({ onDelete }) {
  const numSelected = useRecoilValue(TABLE_SELECTED_LENGTH);

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <Typography sx={{ flex: "1 1 100%" }} variant="subtitle1" component="div">
        {numSelected} selected
      </Typography>

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={onDelete}>
            <DeleteRoundedIcon />
          </IconButton>
        </Tooltip>
      ) : (
        ""
      )}
    </Toolbar>
  );
}

export function EnhancedTableHead() {
  const setSelected = useSetRecoilState(TABLE_SELECTED);
  const rows = useRecoilValue(MANAGER_ROWS);
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const [order, setOrder] = useRecoilState(TABLE_ORDER);
  const [orderBy, setOrderBy] = useRecoilState(TABLE_ORDER_BY);
  const createSortHandler = (property) => () => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const lengthS = useRecoilValue(TABLE_SELECTED_LENGTH);
  const lengthA = useRecoilValue(TABLE_ROWS_LENGTH);

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={lengthS > 0 && lengthS < lengthA}
            checked={lengthA > 0 && lengthS === lengthA}
            onChange={handleSelectAllClick}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
