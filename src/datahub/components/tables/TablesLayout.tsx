import { Box, Button, ButtonProps, Divider, Stack } from "@mui/material";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

import { mdSpace } from "./commonSx";
import { ColumnSelect } from "./ColumnSelect";
import { TableSelect } from "./TableSelect";
import { Table } from "./Table";
import { SelectActions } from "./SelectActions";

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
          <SelectActions />

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
