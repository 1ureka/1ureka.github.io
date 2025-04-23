import { Table, TableBody, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { lgSpace } from "../commonSx";

import { TableHeader } from "./TableHeader";
import { TableRows } from "./TableRows";
import { Pagination } from "./Pagination";
import { PaginationLoading, TableHeaderLoading, TableRowsLoading } from "./TableLoading";
import { useTable } from "@/datahub/hooks/tablePublic";

const TableComponent = () => {
  const { isFetching, columns, table } = useTable();
  const loading = isFetching || !columns || !table;

  return (
    <TableContainer sx={{ mt: lgSpace }}>
      <Table sx={{ borderSpacing: "0 0.3rem", borderCollapse: "separate" }}>
        <TableHead sx={{ position: "relative" }}>
          {!loading ? <TableHeader columns={columns} /> : <TableHeaderLoading />}
        </TableHead>

        <TableBody>{!loading ? <TableRows columns={columns} table={table} /> : <TableRowsLoading />}</TableBody>

        <TableFooter>
          <TableRow>{!loading ? <Pagination columns={columns} /> : <PaginationLoading />}</TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export { TableComponent as Table };
