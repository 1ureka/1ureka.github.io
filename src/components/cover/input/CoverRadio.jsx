import { Divider, Radio, RadioGroup, Stack, Tooltip } from "@mui/material";

export default function CoverRadio({ value, onChange }) {
  return (
    <Stack alignItems="center" sx={{ height: "60vh" }} spacing={2}>
      <Divider flexItem />
      <Divider orientation="vertical" sx={{ flexGrow: 1, height: "auto" }} />

      <Tooltip title="Change Cover" placement="left">
        <RadioGroup
          value={value}
          onChange={({ target }) => onChange(target.value)}
        >
          {[0, 1, 2].map((i) => (
            <Radio
              key={i}
              value={i}
              sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
            />
          ))}
        </RadioGroup>
      </Tooltip>

      <Divider orientation="vertical" sx={{ flexGrow: 1, height: "auto" }} />
      <Divider flexItem />
    </Stack>
  );
}
