import { Box, Checkbox, Divider, IconButton, Popover, Tooltip, Typography } from "@mui/material";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import type { CheckboxProps, IconButtonProps } from "@mui/material";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";

import { useState } from "react";
import { useHiddenColumns, useTableColumns } from "@/datahub/hooks/table";
import { smSpace } from "./commonSx";
import type { TableColumnInfo } from "@/datahub/data/read";

const ListCheckBoxProps: CheckboxProps = {
  edge: "start",
  tabIndex: -1,
  disableRipple: true,
  size: "small",
  sx: { py: 0 },
};

const iconButtonSx: IconButtonProps["sx"] = {
  bgcolor: "FilledInput.disabledBg",
  "&:hover": { bgcolor: "FilledInput.hoverBg" },
  borderRadius: 1,
  height: 1,
  width: "auto",
  aspectRatio: 1,
};

const ColumnSelectLoading = () => (
  <Tooltip title="篩選欄位" arrow>
    <span style={{ position: "relative" }}>
      <IconButton loading centerRipple={false} size="small" sx={iconButtonSx}>
        <FilterAltRoundedIcon fontSize="small" />
      </IconButton>

      <Box
        sx={{
          position: "absolute",
          top: 0,
          bgcolor: "FilledInput.disabledBg",
          borderRadius: 1,
          height: 1,
          width: "auto",
          aspectRatio: 1,
        }}
      />
    </span>
  </Tooltip>
);

const ColumnSelect = ({ columns }: { columns: (TableColumnInfo & { hidden: boolean })[] }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl((prev) => (prev ? null : event.currentTarget));
  const handleClose = () => setAnchorEl(null);

  const { createToggleAllColumns, createToggleHandler } = useHiddenColumns();
  const isAllNotHidden = columns.every((col) => !col.hidden);
  const isAllHidden = columns.every((col) => col.hidden);

  return (
    <>
      <Tooltip title="篩選欄位" arrow>
        <span>
          <IconButton onClick={handleOpen} centerRipple={false} size="small" sx={iconButtonSx}>
            <FilterAltRoundedIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        elevation={3}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{ paper: { sx: { maxHeight: 350 } } }}
      >
        <List dense>
          <ListItem>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              篩選欄位
            </Typography>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton role={undefined} onClick={createToggleAllColumns(columns.length)} dense>
              <Checkbox
                {...ListCheckBoxProps}
                checked={isAllNotHidden}
                indeterminate={!isAllNotHidden && !isAllHidden}
              />
              <ListItemText primary={"顯示所有"} />
            </ListItemButton>
          </ListItem>

          <Divider sx={{ my: 0.5 }} />

          {columns.map((column) => (
            <ListItem key={column.cid} disablePadding>
              <ListItemButton role={undefined} onClick={createToggleHandler(column.cid)} dense>
                <Checkbox {...ListCheckBoxProps} checked={!column.hidden} />
                <ListItemText
                  sx={{ display: "flex", width: 1, gap: smSpace, justifyContent: "space-between", my: 0.5 }}
                  primary={column.name}
                  secondary={column.type.toUpperCase()}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
};

const ColumnSelectWrapper = () => {
  const { columnsForSelect, isFetching } = useTableColumns();
  if (isFetching) return <ColumnSelectLoading />;
  return <ColumnSelect columns={columnsForSelect ?? []} />;
};

export { ColumnSelectWrapper as ColumnSelect };
