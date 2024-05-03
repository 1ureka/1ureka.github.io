import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { LinearProgress, Paper, Checkbox } from "@mui/material";
import { Table, TableCell, TableRow } from "@mui/material";
import { TableContainer } from "@mui/material";

import { MANAGER_ROWS, TABLE_ROWS_LENGTH } from "../../../utils/store";
import { TABLE_ORDER, TABLE_ORDER_BY } from "../../../utils/store";
import { TABLE_PAGE, TABLE_PAGE_ROWS } from "../../../utils/store";
import { TABLE_SELECTED } from "../../../utils/store";
import { lightTheme } from "../../../utils/theme";

import { EnhancedTableHead, EnhancedTableToolbar } from "./Head";
import { EnhancedTablePagination } from "./Pagination";
import { MotionBody, MotionRow, MotionStack, tableItemVar } from "../../Motion";

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

  const nameRows = visibleRows.map(({ name }) => name).join("");

  const transition = {
    staggerChildren: 0.5 / visibleRows.length,
    delaydelayChildren: 0.15,
  };
  const variants = { animate: { transition } };

  return (
    <MotionBody variants={variants} key={nameRows}>
      {visibleRows.map((row, index) => (
        <VisibleTableRow key={row.name} row={row} index={index} />
      ))}
      {emptyRows > 0 && (
        <TableRow style={{ height: 58 * emptyRows }}>
          <TableCell colSpan={3} />
        </TableRow>
      )}
    </MotionBody>
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
    <MotionRow
      variants={tableItemVar}
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
    </MotionRow>
  );
}

export default function EnhancedTable({ onDelete }) {
  const containerSx = {
    borderRadius: "10px",
    border: `2px solid ${lightTheme.palette.divider}`,
  };
  const fallback = (
    <MotionStack variants={tableItemVar} sx={{ p: 2, width: "100%" }}>
      <LinearProgress />
    </MotionStack>
  );
  return (
    <Paper sx={containerSx} elevation={1}>
      <EnhancedTableToolbar onDelete={onDelete} />
      <React.Suspense fallback={fallback}>
        <TableContainer>
          <Table sx={{ minWidth: 300, overflow: "hidden" }}>
            <EnhancedTableHead />
            <EnhancedTableBody />
          </Table>
        </TableContainer>
        <EnhancedTablePagination />
      </React.Suspense>
    </Paper>
  );
}
