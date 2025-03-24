import { useEffect, useState } from "react";
import type { InputBaseComponentProps } from "@mui/material";
import { Box, IconButton, InputBase, Tooltip, Typography } from "@mui/material";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import KeyboardDoubleArrowLeftRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";

type CustomNumberInputProps = {
  prefix?: string;
  onChange: (value: number) => void;
} & Omit<InputBaseComponentProps, "onChange">;

const isInputValid = (value: number) => !isNaN(value) && value >= 0;

export const NumberInput = ({
  label,
  prefix = "≥",
  value,
  onChange,
  fullWidth = false,
  ...props
}: CustomNumberInputProps) => {
  const [inputValue, setInputValue] = useState(value.toString());

  useEffect(() => {
    if (isInputValid(value)) setInputValue(value.toString());
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const parsedValue = parseInt(newValue, 10);
    if (isInputValid(parsedValue)) {
      setInputValue(newValue);
      onChange(parsedValue);
    }
  };

  // 當輸入框失去焦點時，確保顯示有效數值
  const handleBlur = () => {
    if (!isInputValid(parseInt(inputValue, 10))) {
      setInputValue("0");
      onChange(0);
    }
  };

  const adjustValue = (amount: number) => {
    const newValue = Math.max(0, value + amount);
    setInputValue(newValue.toString());
    onChange(newValue);
  };

  return (
    <Box sx={{ width: fullWidth ? 1 : "auto" }}>
      <Box
        sx={{
          position: "relative",
          p: 0.5,
          mt: 0.5,
          borderRadius: 1.5,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          bgcolor: "FilledInput.bg",
        }}
      >
        <Typography variant="caption" sx={{ ml: 1, color: "text.secondary" }}>
          {label}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ display: "flex" }}>
            <Tooltip title="-100">
              <span>
                <IconButton size="small" onClick={() => adjustValue(-100)} disabled={value < 1}>
                  <KeyboardDoubleArrowLeftRoundedIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="-1">
              <span>
                <IconButton size="small" onClick={() => adjustValue(-1)} disabled={value < 1}>
                  <KeyboardArrowLeftRoundedIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
          </Box>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mx: 1,
            }}
          >
            <Typography variant="body2" sx={{ mr: 0.5, color: "text.secondary" }}>
              {prefix}
            </Typography>
            <InputBase
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleBlur}
              inputProps={{
                style: {
                  textAlign: "center",
                  padding: "0 4px",
                  width: "4rem",
                },
                min: 0,
              }}
              {...props}
            />
          </Box>

          <Box sx={{ display: "flex" }}>
            <Tooltip title="+1">
              <span>
                <IconButton size="small" onClick={() => adjustValue(1)}>
                  <KeyboardArrowRightRoundedIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="+100">
              <span>
                <IconButton size="small" onClick={() => adjustValue(100)}>
                  <KeyboardDoubleArrowRightRoundedIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
          </Box>

          <Box
            sx={{
              position: "absolute",
              inset: "auto 0 0 0",
              borderBottom:
                "1px solid rgba(var(--mui-palette-common-onBackgroundChannel) / var(--mui-opacity-inputUnderline))",
              transition: "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              pointerEvents: "none",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
