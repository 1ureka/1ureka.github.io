import { Box, Stack, Typography } from "@mui/material";
import { InputAdornment, OutlinedInput } from "@mui/material";
import { MenuItem, TextField } from "@mui/material";

import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { useRecoilState } from "recoil";
import { EDITOR_OUTPUT } from "../../../utils/store";
import { SubTitle, Title } from "./Typo";
import { MotionStack, toolsItemVar } from "../../Motion";

const inputSx = {
  "& .MuiInputBase-input": {
    fontSize: (theme) => theme.typography.body1.fontSize,
  },
};

function OutputInput({ end, inputProps, value, onChange }) {
  const endAdornment = (
    <InputAdornment position="end">
      <Typography variant="body2">{end}</Typography>
    </InputAdornment>
  );

  return (
    <MotionStack variants={toolsItemVar}>
      <OutlinedInput
        endAdornment={endAdornment}
        size="small"
        type="number"
        inputProps={inputProps}
        value={value}
        onChange={onChange}
        sx={inputSx}
      />
    </MotionStack>
  );
}

function OutputSelect({ options, value, onChange }) {
  return (
    <MotionStack variants={toolsItemVar}>
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
    </MotionStack>
  );
}

function OutputGrid({ children }) {
  const sx = {
    display: "grid",
    gridTemplateColumns: "0.6fr 1.2fr",
    alignItems: "center",
  };
  return (
    <Box sx={sx} gap={1.5}>
      {children}
    </Box>
  );
}

export default function Output() {
  const [{ maxSize, scale, type }, setOutput] = useRecoilState(EDITOR_OUTPUT);

  const handleMaxSize = ({ target }) => {
    const { value } = target;
    const parsedValue = parseFloat(value);
    if (!value || parsedValue < 1 || parsedValue > 999) return;
    setOutput((prev) => ({ ...prev, maxSize: parsedValue }));
  };
  const handleScale = ({ target }) => {
    const { value } = target;
    const parsedValue = parseFloat(value);
    if (!value || parsedValue < 0.1 || parsedValue > 1.5) return;
    setOutput((prev) => ({ ...prev, scale: parsedValue }));
  };
  const handleType = ({ target }) => {
    if (!target.value) return;
    setOutput((prev) => ({ ...prev, type: target.value }));
  };

  return (
    <Stack gap={1}>
      <Title title={"OUTPUT:"} sx={{ mb: 1 }} />
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
            { name: "webp", val: "webp" },
            { name: "jpg", val: "jpeg" },
            { name: "png", val: "png" },
          ]}
          value={type}
          onChange={handleType}
        />
      </OutputGrid>
    </Stack>
  );
}
