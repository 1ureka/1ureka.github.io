import { Table, TableBody, TableContainer, TableHead } from "@mui/material";
import { lgSpace } from "./commonSx";
import { TableHeader } from "./TableHeader";
import { TableRows } from "./TableRows";
import { useTableColumns } from "@/datahub/hooks/table";
import { TableHeaderLoading, TableRowsLoading } from "./TableLoading";

const TableComponent = () => {
  const { isFetching, selectedTable: table, columnsForTable: columns } = useTableColumns();
  const loading = isFetching || !table || !columns;

  return (
    <TableContainer sx={{ mt: lgSpace }}>
      <Table sx={{ borderSpacing: "0 0.3rem", borderCollapse: "separate" }}>
        <TableHead sx={{ position: "relative" }}>
          {!loading ? <TableHeader columns={columns} /> : <TableHeaderLoading />}
        </TableHead>
        <TableBody>{!loading ? <TableRows table={table.name} columns={columns} /> : <TableRowsLoading />}</TableBody>
      </Table>
    </TableContainer>
  );
};

export { TableComponent as Table };
