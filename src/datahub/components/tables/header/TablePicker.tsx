import { Box, CircularProgress, Divider, InputAdornment, MenuItem, TextField, Typography } from "@mui/material";
import type { InputProps, TextFieldProps } from "@mui/material";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import { smSpace } from "../commonSx";
import { useTablePicker } from "@/datahub/hooks/tableSelect";

const inputSx: InputProps["sx"] = {
  borderRadius: 1,
  overflow: "hidden",
  "&::before": { borderBottom: 0 },
  "&:hover:not(.Mui-disabled, .Mui-error):before": { borderBottom: 0 },
  "& input": { p: smSpace },
  "& div[role='combobox']": { p: smSpace },
};

const FieldProps: TextFieldProps = {
  sx: { width: "18rem" },
  size: "small",
  variant: "filled",
};

const LoadingDisplay = () => (
  <Box sx={{ position: "relative" }}>
    <TextField {...FieldProps} disabled slotProps={{ input: { sx: inputSx } }} />
    <Box sx={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: "text.secondary" }}>
      <CircularProgress color="inherit" size={16} />
    </Box>
  </Box>
);

const TablePicker = () => {
  const { options, selectedOption, handleChange, isFetching } = useTablePicker();

  if (!options || !selectedOption || isFetching) return <LoadingDisplay />;

  return (
    <TextField
      select
      value={selectedOption.name}
      onChange={handleChange}
      {...FieldProps}
      slotProps={{
        select: {
          IconComponent: ArrowDropDownRoundedIcon,
          MenuProps: { slotProps: { paper: { sx: { maxHeight: 350 } } }, elevation: 3 },
        },
        input: {
          sx: { ...inputSx, "& #tables-ias": { color: "text.secondary", m: 0 } },
          startAdornment: (
            <InputAdornment position="start" id="tables-ias">
              <Typography
                variant="caption"
                color="inherit"
                sx={{ p: 0.5, borderRadius: 1, bgcolor: "divider", textTransform: "uppercase" }}
              >
                {selectedOption.type}
              </Typography>
            </InputAdornment>
          ),
        },
      }}
    >
      <MenuItem dense onClickCapture={(e) => e.stopPropagation()}>
        <AddRoundedIcon fontSize="small" sx={{ mr: 0.5 }} /> 新增資料表
      </MenuItem>
      <Divider />
      {options.map(({ name }, i) => (
        <MenuItem key={i} value={name} dense>
          {name}
        </MenuItem>
      ))}
    </TextField>
  );
};

export { TablePicker };
