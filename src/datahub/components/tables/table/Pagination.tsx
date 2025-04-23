import { type TableColumns, useTableFoot } from "@/datahub/hooks/tablePublic";
import { rowsPerPage } from "@/datahub/hooks/tablePublic";
import { TablePagination } from "@mui/material";

const Pagination = ({ columns }: { columns: TableColumns }) => {
  const { totalRows, isFetching, page, handlePageChange } = useTableFoot();

  return (
    <TablePagination
      colSpan={columns.length + 1} // 補上 checkbox 的 colSpan
      count={totalRows ?? 0}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[rowsPerPage]}
      page={page}
      showFirstButton
      showLastButton
      slotProps={{ select: { inputProps: { "aria-label": "rows per page" } } }}
      onPageChange={handlePageChange}
      disabled={isFetching || !totalRows}
      sx={{ border: 0 }}
    />
  );
};

export { Pagination };
