import { Table, TableBody, TableContainer } from "@mui/material";
import { lgSpace } from "./commonSx";
import { TableHeader } from "./TableHeader";
import { TableRows } from "./TableRows";
import { useTableColumns } from "@/datahub/hooks/table";

const TableComponent = () => {
  const { isFetching, selectedTable, columnsForTable: columns } = useTableColumns();

  return (
    <TableContainer sx={{ mt: lgSpace }}>
      <Table sx={{ borderSpacing: "0 0.3rem", borderCollapse: "separate" }}>
        <TableHeader loading={isFetching} columns={columns} />
        <TableBody>
          {!isFetching && columns && selectedTable && (
            <TableRows params={{ table: selectedTable.name }} columns={columns} />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { TableComponent as Table };
