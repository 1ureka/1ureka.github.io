import { Box, Divider, Stack } from "@mui/material";
import { mdSpace } from "./commonSx";

import { TablePicker } from "./header/TablePicker";
import { ColumnPicker } from "./header/ColumnPicker";
import { SelectActions } from "./header/SelectActions";
import { TableActions } from "./header/TableActions";
import { Table } from "./table/Table";

const Layout = () => {
  return (
    <Stack>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: mdSpace }}>
        <Box sx={{ display: "flex", alignItems: "stretch", gap: mdSpace }}>
          <TablePicker />
          <ColumnPicker />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: mdSpace }}>
          <SelectActions />
          <Divider flexItem orientation="vertical" />
          <TableActions />
        </Box>
      </Box>

      <Table />
    </Stack>
  );
};

export default Layout;
