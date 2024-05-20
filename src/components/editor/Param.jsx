import { Box, Stack, Typography, Slider } from "@mui/material";
import { InputAdornment, OutlinedInput } from "@mui/material";
import { MenuItem, TextField } from "@mui/material";

import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { useRecoilState } from "recoil";
import { EDITOR_FILTER, EDITOR_OUTPUT_SETTING } from "../../utils/store";

function Title({ title }) {
  return (
    <Typography variant="caption" sx={{ color: "text.secondary" }}>
      {title}
    </Typography>
  );
}

function SubTitle({ title }) {
  return <Typography variant="caption">{title}</Typography>;
}

function FilterSlider({ value, onChange }) {
  const sliderProps = {
    min: 0.5,
    max: 1.5,
    step: 0.1,
    valueLabelDisplay: "auto",
    size: "small",
  };

  return <Slider value={value} marks {...sliderProps} onChange={onChange} />;
}

const inputSx = {
  "& .MuiInputBase-input": {
    fontSize: "0.75rem",
  },
};

function OutputInput({ end, inputProps, value, onChange }) {
  const endAdornment = (
    <InputAdornment position="end">
      <Typography variant="caption">{end}</Typography>
    </InputAdornment>
  );

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

function OutputSelect({ options, value, onChange }) {
  const icon = ArrowDropDownRoundedIcon;

  return (
    <TextField
      size="small"
      select
      value={value}
      onChange={onChange}
      InputProps={{ sx: inputSx }}
      SelectProps={{ IconComponent: icon }}
    >
      {options.map(({ name, val }) => (
        <MenuItem key={name} value={val}>
          {name}
        </MenuItem>
      ))}
    </TextField>
  );
}

function OutputGrid({ children }) {
  const sx = {
    display: "grid",
    gridTemplateColumns: "0.6fr 1.2fr",
    alignItems: "center",
  };
  return (
    <Box sx={sx} gap={1}>
      {children}
    </Box>
  );
}

export default function Param() {
  const [{ saturate, contrast, exposure }, setFilter] =
    useRecoilState(EDITOR_FILTER);

  const handleSaturate = (_, val) =>
    setFilter((prev) => ({ ...prev, saturate: val }));
  const handleContrast = (_, val) =>
    setFilter((prev) => ({ ...prev, contrast: val }));
  const handleExposure = (_, val) =>
    setFilter((prev) => ({ ...prev, exposure: val }));

  const [{ maxSize, scale, type }, setOutput] = useRecoilState(
    EDITOR_OUTPUT_SETTING
  );
  const handleMaxSize = ({ target }) => {
    const { value } = target;
    const parsedValue = parseFloat(value);
    if (!value || parsedValue < 1 || parsedValue > 999) return;
    setOutput((prev) => ({ ...prev, maxSize: value }));
  };
  const handleScale = ({ target }) => {
    const { value } = target;
    const parsedValue = parseFloat(value);
    if (!value || parsedValue < 0.1 || parsedValue > 1.5) return;
    setOutput((prev) => ({ ...prev, scale: value }));
  };
  const handleType = ({ target }) => {
    if (!target.value) return;
    setOutput((prev) => ({ ...prev, type: target.value }));
  };

  return (
    <>
      <Stack gap={1}>
        <Title title={"FILTER:"} />
        <SubTitle title={"saturation"} />
        <FilterSlider value={saturate} onChange={handleSaturate} />
        <SubTitle title={"contrast"} />
        <FilterSlider value={contrast} onChange={handleContrast} />
        <SubTitle title={"exposure"} />
        <FilterSlider value={exposure} onChange={handleExposure} />
      </Stack>

      <Stack gap={1}>
        <Title title={"OUTPUT:"} />
        <OutputGrid>
          <SubTitle title={"max size"} />
          <OutputInput
            end={"MB"}
            inputProps={{ min: "1", max: "999", step: "1" }}
            value={maxSize}
            onChange={handleMaxSize}
          />
          <SubTitle title={"scale"} />
          <OutputInput
            end={"x"}
            inputProps={{ min: "0.1", max: "1.5", step: "0.1" }}
            value={scale}
            onChange={handleScale}
          />
          <SubTitle title={"file type"} />
          <OutputSelect
            options={[
              { name: "webp", val: "image/webp" },
              { name: "jpg", val: "image/jpeg" },
              { name: "png", val: "image/png" },
            ]}
            value={type}
            onChange={handleType}
          />
        </OutputGrid>
      </Stack>
    </>
  );
}
