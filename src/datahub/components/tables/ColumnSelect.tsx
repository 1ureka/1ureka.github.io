import { Box, Checkbox, Divider, IconButton, Popover, Tooltip, Typography } from "@mui/material";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import type { CheckboxProps, IconButtonProps } from "@mui/material";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";

import { useState } from "react";
import { smSpace } from "./commonSx";
import { useColumnSelect } from "@/datahub/hooks/tablePublic";

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
  <Tooltip title={<Typography variant="body2">篩選欄位</Typography>} arrow>
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

const ColumnSelect = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl((prev) => (prev ? null : e.currentTarget));
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { isFetching, options, allChecked, allUnchecked, createToggleAllColumns, createToggleHandler } =
    useColumnSelect();

  if (isFetching || !options) return <ColumnSelectLoading />;

  return (
    <>
      <Tooltip title={<Typography variant="body2">篩選欄位</Typography>} arrow>
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
            <ListItemButton role={undefined} onClick={createToggleAllColumns(options.length)} dense>
              <Checkbox {...ListCheckBoxProps} checked={allChecked} indeterminate={!allChecked && !allUnchecked} />
              <ListItemText primary={"顯示所有"} />
            </ListItemButton>
          </ListItem>

          <Divider sx={{ my: 0.5 }} />

          {options.map(({ cid, hidden, name, type }) => (
            <ListItem key={cid} disablePadding>
              <ListItemButton role={undefined} onClick={createToggleHandler(cid)} dense>
                <Checkbox {...ListCheckBoxProps} checked={!hidden} />
                <ListItemText
                  sx={{ display: "flex", width: 1, gap: smSpace, justifyContent: "space-between", my: 0.5 }}
                  primary={name}
                  secondary={type.toUpperCase()}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
};

export { ColumnSelect };
