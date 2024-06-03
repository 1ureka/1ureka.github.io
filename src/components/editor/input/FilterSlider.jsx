import { Slider } from "@mui/material";

export default function FilterSlider({ value, onChange }) {
  return (
    <Slider
      value={value}
      marks
      min={0.5}
      max={1.5}
      step={0.1}
      valueLabelDisplay="auto"
      size="small"
      onChange={onChange}
    />
  );
}
