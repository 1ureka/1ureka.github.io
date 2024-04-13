import * as React from "react";
import { alpha } from "@mui/material/styles";
import { Box, Paper, Toolbar, Tooltip } from "@mui/material";
import { Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead, TableRow } from "@mui/material";
import { TablePagination, TableSortLabel } from "@mui/material";
import { Typography, Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { MANAGER_ROWS, TABLE_ROWS_LENGTH } from "../../utils/store";
import { TABLE_ORDER, TABLE_ORDER_BY } from "../../utils/store";
import { TABLE_SELECTED, TABLE_SELECTED_LENGTH } from "../../utils/store";
import { TABLE_PAGE, TABLE_PAGE_ROWS } from "../../utils/store";

function comparator(order, orderBy) {
  const sortOrder = order === "desc" ? 1 : -1;
  return (a, b) => {
    if (typeof a[orderBy] === "number" && typeof b[orderBy] === "number") {
      return (a[orderBy] - b[orderBy]) * sortOrder;
    } else {
      if (b[orderBy] < a[orderBy]) {
        return -1 * sortOrder;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1 * sortOrder;
      }
      return 0;
    }
  };
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

function EnhancedTableHead() {
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

function EnhancedTableToolbar({ onDelete }) {
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
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        ""
      )}
    </Toolbar>
  );
}

function EnhancedTablePagination() {
  const fullLength = useRecoilValue(TABLE_ROWS_LENGTH);
  const [page, setPage] = useRecoilState(TABLE_PAGE);
  const [perPage, setPerPage] = useRecoilState(TABLE_PAGE_ROWS);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    setPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={fullLength}
      page={page}
      rowsPerPage={perPage}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}

function EnhancedTableBody() {
  const rows = useRecoilValue(MANAGER_ROWS);
  const rowsLength = useRecoilValue(TABLE_ROWS_LENGTH);
  const page = useRecoilValue(TABLE_PAGE);
  const pageRows = useRecoilValue(TABLE_PAGE_ROWS);
  const order = useRecoilValue(TABLE_ORDER);
  const orderBy = useRecoilValue(TABLE_ORDER_BY);

  const visibleRows = React.useMemo(
    () =>
      rows
        .slice()
        .sort(comparator(order, orderBy))
        .slice(page * pageRows, page * pageRows + pageRows),
    [rows, order, orderBy, page, pageRows]
  );

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * pageRows - rowsLength) : 0;

  return (
    <TableBody>
      {visibleRows.map((row, index) => (
        <VisibleTableRow key={row.name} row={row} index={index} />
      ))}
      {emptyRows > 0 && (
        <TableRow style={{ height: 58 * emptyRows }}>
          <TableCell colSpan={3} />
        </TableRow>
      )}
    </TableBody>
  );
}

function VisibleTableRow({ row, index }) {
  const [selected, setSelected] = useRecoilState(TABLE_SELECTED);
  const isSelected = (name) => selected.indexOf(name) !== -1;
  const handleClick = () => {
    const isSelectedRow = isSelected(row.name);
    setSelected(
      isSelectedRow
        ? selected.filter((item) => item !== row.name)
        : [...selected, row.name]
    );
  };

  return (
    <TableRow
      hover
      onClick={() => handleClick(row.name)}
      tabIndex={-1}
      selected={isSelected(row.name)}
      sx={{
        cursor: "pointer",
        backdropFilter: index % 2 ? "" : "brightness(0.85)",
      }}
    >
      <TableCell padding="checkbox">
        <Checkbox color="primary" checked={isSelected(row.name)} />
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        {row.name}
      </TableCell>
      <TableCell align="right">{row.size}</TableCell>
    </TableRow>
  );
}

export default function EnhancedTable({ onDelete }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar onDelete={onDelete} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <EnhancedTableHead />
            <EnhancedTableBody />
          </Table>
        </TableContainer>
        <EnhancedTablePagination />
      </Paper>
    </Box>
  );
}
