import { FormControl } from "@mui/material";
import { InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { useRecoilState } from "recoil";
import { CONVERT_SIZE } from "../../../utils/store";

export default function NumberInput() {
  const [val, setVal] = useRecoilState(CONVERT_SIZE);

  const handleChange = ({ target }) => {
    const { value } = target;
    const parsedValue = parseFloat(value);
    if (!value || parsedValue < 0.1 || parsedValue > 1.5) return;
    setVal(parsedValue);
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
