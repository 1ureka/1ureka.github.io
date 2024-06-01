import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function ToggleButtons({ value, onChange }) {
  return (
    <ToggleButtonGroup
      color="primary"
      value={value}
      exclusive
      onChange={onChange}
      size="small"
    >
      <ToggleButton value="scene" sx={{ py: 1 }}>
        Scene
      </ToggleButton>
      <ToggleButton value="props" sx={{ py: 1 }}>
        Props
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
