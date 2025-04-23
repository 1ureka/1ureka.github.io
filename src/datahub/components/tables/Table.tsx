import { Table, TableBody, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { lgSpace } from "./commonSx";
import { TableHeader } from "./TableHeader";
import { TableRows } from "./TableRows";
import { useTableColumns } from "@/datahub/hooks/table";
import { PaginationLoading, TableHeaderLoading, TableRowsLoading } from "./TableLoading";
import { Pagination } from "./Pagination";

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

        <TableFooter>
          <TableRow>{!loading ? <Pagination table={table.name} columns={columns} /> : <PaginationLoading />}</TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export { TableComponent as Table };
