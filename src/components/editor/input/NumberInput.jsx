import { InputAdornment, OutlinedInput, Typography } from "@mui/material";

export default function NumberInput({ end, inputProps, value, onChange }) {
  const endAdornment = (
    <InputAdornment position="end">
      <Typography variant="body2">{end}</Typography>
    </InputAdornment>
  );

  const inputSx = {
    "& .MuiInputBase-input": {
      fontSize: (theme) => theme.typography.body1.fontSize,
    },
  };

  return (
    <OutlinedInput
      endAdornment={endAdornment}
      size="small"
      type="number"
      inputProps={inputProps}
      value={value}
      onChange={onChange}
      sx={inputSx}
    />
  );
}
