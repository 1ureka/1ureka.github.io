import { Table, TableBody, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { lgSpace } from "../commonSx";

import { TableLoading } from "./TableLoading";
import { TableHead as TableHeadRow } from "./TableHead";
import { TableRows } from "./TableRows";
import { TableFoot } from "./TableFoot";

import { useLoadTableControls } from "@/datahub/hooks/tableControl";
import type { TableControlParams } from "@/datahub/hooks/tableControl";

const TableDisplay = ({ params }: { params: TableControlParams }) => {
  return (
    <Table sx={{ borderSpacing: "0 0.3rem", borderCollapse: "separate" }}>
      <TableHead sx={{ position: "relative" }}>
        <TableHeadRow params={params} />
      </TableHead>

      <TableBody>
        <TableRows params={params} />
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableFoot params={params} />
        </TableRow>
      </TableFooter>
    </Table>
  );
};

const Wrapper = () => {
  const { isFetching, tableControlParams } = useLoadTableControls();

  return (
    <TableContainer sx={{ mt: lgSpace }}>
      {isFetching || !tableControlParams ? <TableLoading /> : <TableDisplay params={tableControlParams} />}
    </TableContainer>
  );
};

export { Wrapper as Table };
