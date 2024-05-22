import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Table, TableCell, TableContainer } from "@mui/material";
import { Checkbox, Stack } from "@mui/material";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

import { EDITOR_INPUT_NAMES, EDITOR_SELECTED } from "../../../utils/store";
import { EDITOR_DISPLAY, EDITOR_ORDER } from "../../../utils/store";
import { lightTheme } from "../../../utils/theme";

import { EnhancedTableHead, EnhancedTableToolbar } from "./Head";
import { MotionBody, MotionPaper, MotionRow, toolsItemVar } from "../../Motion";
import { orchestrationVar, tableItemVar } from "../../Motion";

function comparator(order) {
  const sortOrder = order === "desc" ? 1 : -1;
  return (a, b) => {
    if (b < a) return -1 * sortOrder;
    if (b > a) return 1 * sortOrder;
    return 0;
  };
}

function CellSelectBox({ name }) {
  const [selected, setSelected] = useRecoilState(EDITOR_SELECTED);

  const isSelected = selected.indexOf(name) !== -1;
  const selectThis = (prev) => [...prev, name];
  const deselectThis = (prev) => prev.filter((item) => item !== name);

  const handleSelect = (e) => {
    e.stopPropagation();
    setSelected((prev) => (isSelected ? deselectThis(prev) : selectThis(prev)));
  };

  return (
    <TableCell padding="checkbox">
      <Checkbox
        color="primary"
        checked={isSelected}
        size="small"
        onClick={handleSelect}
      />
    </TableCell>
  );
}

function CellName({ name }) {
  const display = useRecoilValue(EDITOR_DISPLAY);
  const isDisplay = display === name;

  return (
    <TableCell
      padding="none"
      align="center"
      sx={(theme) => ({
        ...theme.typography.caption,
        color: isDisplay && theme.palette.primary.main,
        overflow: "hidden",
        textOverflow: "ellipsis",
      })}
    >
      {name}
    </TableCell>
  );
}

function CellDisplay({ name }) {
  const display = useRecoilValue(EDITOR_DISPLAY);
  const isDisplay = display === name;

  return (
    <TableCell padding="checkbox">
      <Checkbox
        icon={<></>}
        checkedIcon={<VisibilityRoundedIcon fontSize="small" />}
        checked={isDisplay}
        size="small"
      />
    </TableCell>
  );
}

function TableRow({ name, index }) {
  const [display, setDisplay] = useRecoilState(EDITOR_DISPLAY);
  const isDisplay = display === name;
  const handleDisplay = () => setDisplay(name);

  return (
    <MotionRow
      hover
      variants={tableItemVar}
      tabIndex={-1}
      onClick={handleDisplay}
      selected={isDisplay}
      sx={{
        cursor: "pointer",
        backdropFilter: index % 2 ? "" : "brightness(0.85)",
      }}
    >
      <CellSelectBox name={name} />
      <CellName name={name} />
      <CellDisplay name={name} />
    </MotionRow>
  );
}

function TableBody() {
  const names = useRecoilValue(EDITOR_INPUT_NAMES);
  const order = useRecoilValue(EDITOR_ORDER);

  const list = React.useMemo(
    () => names.slice().sort(comparator(order)),
    [names, order]
  );
  const variants = orchestrationVar({
    delay: 0.15,
    stagger: 0.5 / list.length,
  });

  return (
    <MotionBody variants={variants}>
      {list.map((name, i) => (
        <TableRow key={name} name={name} index={i} />
      ))}
    </MotionBody>
  );
}

export default function EnhancedTable() {
  const containerSx = {
    borderRadius: "10px",
    border: `2px solid ${lightTheme.palette.divider}`,
    flex: "1",
    height: "1px",
  };

  return (
    <MotionPaper variants={toolsItemVar} sx={containerSx} elevation={1}>
      <Stack sx={{ height: "100%" }}>
        <TableContainer sx={{ overflowX: "hidden", flex: "1" }}>
          <Table sx={{ tableLayout: "fixed" }}>
            <EnhancedTableHead />
            <TableBody />
          </Table>
        </TableContainer>
        <EnhancedTableToolbar />
      </Stack>
    </MotionPaper>
  );
}
