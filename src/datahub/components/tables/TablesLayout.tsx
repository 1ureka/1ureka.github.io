import { Box, Button, ButtonProps, Divider, Stack, Tooltip, Typography } from "@mui/material";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

import { mdSpace, smSpace } from "./commonSx";
import { ColumnSelect } from "./ColumnSelect";
import { TableSelect } from "./TableSelect";
import { Table } from "./Table";

const secondaryButtonSx: (color: string) => ButtonProps["sx"] = (color) => ({
  "--temporary-color": color,
  bgcolor: "color-mix(in srgb, var(--temporary-color) 30%, transparent 70%)",
  "&:hover": { bgcolor: "color-mix(in srgb, var(--temporary-color) 40%, transparent 60%)" },
  color: "color-mix(in srgb, var(--temporary-color) 40%, var(--mui-palette-text-primary) 60%)",
  px: 1.5,
});

const primaryButtonSx: (color: string) => ButtonProps["sx"] = (color) => ({
  "--temporary-color": color,
  bgcolor: "color-mix(in srgb, var(--temporary-color) 90%, var(--mui-palette-text-primary) 10%)",
  "&:hover": { bgcolor: "color-mix(in srgb, var(--temporary-color) 80%, var(--mui-palette-text-primary) 20%)" },
  color: "color-mix(in srgb, var(--temporary-color) 5%, var(--mui-palette-background-paper) 95%)",
  px: 1.5,
});

const Layout = () => {
  return (
    <Stack>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: mdSpace }}>
        <Box sx={{ display: "flex", alignItems: "stretch", gap: mdSpace }}>
          <TableSelect />
          <ColumnSelect />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: mdSpace }}>
          <Typography sx={{ color: "text.secondary" }}>已選取 0 個:</Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: smSpace }}>
            <Tooltip title="以指定值覆蓋選取資料的某個欄位" arrow>
              <Button sx={secondaryButtonSx("var(--mui-palette-primary-main)")}>覆蓋欄位</Button>
            </Tooltip>
            <Button sx={secondaryButtonSx("var(--mui-palette-error-main)")}>刪除紀錄</Button>
          </Box>

          <Divider flexItem orientation="vertical" />
          <Button sx={primaryButtonSx("var(--mui-palette-primary-main)")} endIcon={<ArrowDropDownRoundedIcon />}>
            標準化
          </Button>
        </Box>
      </Box>

      <Table />
    </Stack>
  );
};

export default Layout;
