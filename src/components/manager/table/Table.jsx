import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { LinearProgress, Paper, Checkbox, Typography } from "@mui/material";
import { Table, TableCell, TableRow } from "@mui/material";
import { TableContainer } from "@mui/material";

import { MANAGER_ROWS, MANAGER_SELECTED } from "../../../utils/store";
import { MANAGER_ORDER, MANAGER_ORDER_BY } from "../../../utils/store";
import { MANAGER_PAGE, MANAGER_PAGE_ROWS } from "../../../utils/store";
import { MANAGER_ROW_HEIGHT } from "../../../utils/store";
import { lightTheme } from "../../../utils/theme";

import { EnhancedTableHead, EnhancedTableToolbar } from "./Head";
import { EnhancedTablePagination } from "./Pagination";
import { MotionBody, MotionRow, MotionStack } from "../../Motion";
import { orchestrationVar, tableItemVar } from "../../Motion";

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
  const rowsLength = rows.length;
  const page = useRecoilValue(MANAGER_PAGE);
  const pageRows = useRecoilValue(MANAGER_PAGE_ROWS);
  const order = useRecoilValue(MANAGER_ORDER);
  const orderBy = useRecoilValue(MANAGER_ORDER_BY);

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

  const variants = orchestrationVar({
    delay: 0.15,
    stagger: 0.5 / visibleRows.length,
  });

  const key = visibleRows.map(({ name }) => name).join("");

  const [height, setHeight] = useRecoilState(MANAGER_ROW_HEIGHT);
  const ref = React.useRef(null);
  React.useEffect(() => {
    setHeight((p) => (p !== null ? p : ref.current.clientHeight / 5));
  }, [setHeight]);

  return (
    <MotionBody variants={variants} key={key} ref={ref}>
      {visibleRows.map((row, index) => (
        <VisibleTableRow key={row.name} row={row} index={index} />
      ))}
      {emptyRows > 0 && (
        <TableRow style={{ height: height * emptyRows }}>
          <TableCell colSpan={3} />
        </TableRow>
      )}
    </MotionBody>
  );
}

function VisibleTableRow({ row, index }) {
  const [selected, setSelected] = useRecoilState(MANAGER_SELECTED);
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
        <Checkbox color="primary" checked={isSelected(row.name)} size="small" />
      </TableCell>
      <TableCell sx={{ p: 1.5 }}>
        <Typography variant="caption">{row.name}</Typography>
      </TableCell>
      <TableCell align="right" sx={{ p: 1.5 }}>
        <Typography variant="caption">{row.size}</Typography>
      </TableCell>
    </MotionRow>
  );
}

export default function EnhancedTable() {
  const containerSx = {
    borderRadius: "10px",
    border: `2px solid ${lightTheme.palette.divider}`,
    zIndex: 1,
  };
  const fallback = (
    <MotionStack variants={tableItemVar} sx={{ p: 2, width: "100%" }}>
      <LinearProgress />
    </MotionStack>
  );
  return (
    <Paper sx={containerSx} elevation={1}>
      <EnhancedTableToolbar />
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
