import { alpha } from "@mui/material/styles";
import { Toolbar, Tooltip, TableCell } from "@mui/material";
import { TableHead, TableRow, TableSortLabel } from "@mui/material";
import { Typography, Checkbox, IconButton } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import { useRecoilState, useRecoilValue } from "recoil";
import { MANAGER_ROWS, MANAGER_SELECTED } from "../../../utils/store";
import { MANAGER_ORDER, MANAGER_ORDER_BY } from "../../../utils/store";

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
  const selected = useRecoilValue(MANAGER_SELECTED);
  const numSelected = selected.length;

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
  const [selected, setSelected] = useRecoilState(MANAGER_SELECTED);
  const rows = useRecoilValue(MANAGER_ROWS);
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const [order, setOrder] = useRecoilState(MANAGER_ORDER);
  const [orderBy, setOrderBy] = useRecoilState(MANAGER_ORDER_BY);
  const createSortHandler = (property) => () => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const lengthS = selected.length;
  const lengthA = rows.length;

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
