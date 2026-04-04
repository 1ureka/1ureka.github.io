import { Box, Stack } from "@mui/material";
import { mdSpace } from "./commonSx";

import { TablePicker } from "./header/TablePicker";
import { ColumnPicker } from "./header/ColumnPicker";
import { SelectActions } from "./header/SelectActions";
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
        </Box>
      </Box>

      <Table />
    </Stack>
  );
};

export default Layout;
