import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function Toggles({ options, value, onChange, sx }) {
  const handleChange = (_, mode) => {
    if (mode) onChange(mode);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={value}
      exclusive
      onChange={handleChange}
      sx={sx}
    >
      {options.map((val) => (
        <ToggleButton
          key={val}
          value={val}
          sx={{
            py: 1,
            flexGrow: 1,
            fontSize: (theme) => theme.typography.caption.fontSize,
          }}
        >
          {val}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
