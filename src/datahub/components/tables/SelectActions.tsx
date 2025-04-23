import { Box, Button, Tooltip, Typography } from "@mui/material";
import type { ButtonProps } from "@mui/material";
import { smSpace } from "./commonSx";

const secondaryButtonSx: (color: string) => ButtonProps["sx"] = (color) => ({
  "--temporary-color": color,
  bgcolor: "color-mix(in srgb, var(--temporary-color) 30%, transparent 70%)",
  "&:hover": { bgcolor: "color-mix(in srgb, var(--temporary-color) 40%, transparent 60%)" },
  color: "color-mix(in srgb, var(--temporary-color) 40%, var(--mui-palette-text-primary) 60%)",
  px: 1.5,
});

const SelectActions = () => {
  return (
    <>
      <Typography sx={{ color: "text.secondary" }}>已選取 0 個:</Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: smSpace }}>
        <Tooltip title="以指定值覆蓋選取資料的某個欄位" arrow>
          <Button sx={secondaryButtonSx("var(--mui-palette-primary-main)")}>覆蓋欄位</Button>
        </Tooltip>
        <Button sx={secondaryButtonSx("var(--mui-palette-error-main)")}>刪除紀錄</Button>
      </Box>
    </>
  );
};

export { SelectActions };
