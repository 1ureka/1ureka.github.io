import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Table, TableCell, TableContainer } from "@mui/material";
import { Checkbox, Stack, Box } from "@mui/material";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

import { EDITOR_INPUT, EDITOR_ORDER } from "../../../utils/store";
import { lightTheme } from "../../../utils/theme";

import { EnhancedTableHead, EnhancedTableToolbar } from "./Head";
import { MotionBody, MotionPaper, MotionRow, toolsItemVar } from "../../Motion";
import { orchestrationVar, tableItemVar } from "../../Motion";

function CellSelectBox({ checked, onClick }) {
  const handleClick = (e) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <TableCell padding="checkbox">
      <Checkbox
        color="primary"
        checked={checked}
        size="small"
        onClick={handleClick}
      />
    </TableCell>
  );
}

function CellName({ name, isDisplay }) {
  return (
    <TableCell
      padding="none"
      align="center"
      sx={(theme) => ({
        color: isDisplay && theme.palette.primary.main,
        overflow: "hidden",
        textOverflow: "ellipsis",
      })}
    >
      {name}
    </TableCell>
  );
}

function CellDisplayBox({ isDisplay }) {
  return (
    <TableCell padding="checkbox">
      <Box sx={{ display: "grid", placeItems: "center" }}>
        {isDisplay && (
          <VisibilityRoundedIcon sx={{ fontSize: 22 }} color="primary" />
        )}
      </Box>
    </TableCell>
  );
}

function TableRow({ i, name, selected, display, onSelect, onDisplay }) {
  const sx = {
    cursor: "pointer",
    backdropFilter: i % 2 ? "" : "brightness(0.85)",
  };

  return (
    <MotionRow
      hover
      variants={tableItemVar}
      tabIndex={-1}
      selected={display}
      onClick={onDisplay}
      sx={sx}
    >
      <CellSelectBox checked={selected} onClick={onSelect} />
      <CellName name={name} isDisplay={display} />
      <CellDisplayBox isDisplay={display} />
    </MotionRow>
  );
}

function TableBody() {
  const [input, setInput] = useRecoilState(EDITOR_INPUT);

  const order = useRecoilValue(EDITOR_ORDER);
  const orderedInput = React.useMemo(() => {
    const copy = input.slice();
    const sortOrder = order === "desc" ? -1 : 1;
    return copy.sort(
      (a, b) => a.file.name.localeCompare(b.file.name) * sortOrder
    );
  }, [input, order]);

  const isDisplay = (i) => orderedInput[i].display;
  const handleDisplay = (i) => {
    const newInput = orderedInput.map((item, index) => ({
      ...item,
      display: index === i,
    }));
    setInput(newInput);
  };

  const isSelected = (i) => orderedInput[i].selected;
  const handleSelect = (i) => {
    const newInput = orderedInput.map((item, index) => {
      if (index !== i) return item;
      return { ...item, selected: !item.selected };
    });
    setInput(newInput);
  };

  const variants = orchestrationVar({
    delay: 0.15,
    stagger: 0.5 / orderedInput.length,
  });

  return (
    <MotionBody variants={variants}>
      {orderedInput.map((item, i) => (
        <TableRow
          key={item.file.name}
          i={i}
          name={item.file.name}
          selected={isSelected(i)}
          display={isDisplay(i)}
          onSelect={() => handleSelect(i)}
          onDisplay={() => handleDisplay(i)}
        />
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
          <Table sx={{ tableLayout: "fixed" }} stickyHeader>
            <EnhancedTableHead />
            <TableBody />
          </Table>
        </TableContainer>
        <EnhancedTableToolbar />
      </Stack>
    </MotionPaper>
  );
}
