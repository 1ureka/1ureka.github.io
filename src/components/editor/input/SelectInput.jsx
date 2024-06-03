import { MenuItem, TextField, Typography } from "@mui/material";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

export default function SelectInput({ options, value, onChange }) {
  const inputSx = {
    "& .MuiInputBase-input": {
      fontSize: (theme) => theme.typography.body1.fontSize,
    },
  };

  return (
    <TextField
      size="small"
      select
      value={value}
      onChange={onChange}
      InputProps={{ sx: inputSx }}
      SelectProps={{ IconComponent: ArrowDropDownRoundedIcon }}
    >
      {options.map(({ name, val }) => (
        <MenuItem key={name} value={val}>
          <Typography>{name}</Typography>
        </MenuItem>
      ))}
    </TextField>
  );
}
