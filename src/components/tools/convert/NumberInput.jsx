import * as React from "react";
import { FormControl } from "@mui/material";
import { InputAdornment, InputLabel, OutlinedInput } from "@mui/material";

export default function NumberInput() {
  const [val, setVal] = React.useState("1");

  const handleChange = (e) => {
    if (e.target.value) setVal(e.target.value);
  };

  return (
    <FormControl fullWidth sx={{ flex: 1 }}>
      <InputLabel htmlFor="image-conversion-size-input">Size</InputLabel>
      <OutlinedInput
        id="image-conversion-size-input"
        startAdornment={<InputAdornment position="start">x</InputAdornment>}
        label="Size"
        size="small"
        type="number"
        inputProps={{ min: "0.1", max: "1.5", step: "0.1" }}
        value={val}
        onChange={handleChange}
      />
    </FormControl>
  );
}
