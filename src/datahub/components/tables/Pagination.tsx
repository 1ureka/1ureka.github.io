import { useTableRows } from "@/datahub/hooks/tableRows";
import { TablePagination } from "@mui/material";

const Pagination = (params: Parameters<typeof useTableRows>[0]) => {
  const { columns } = params;
  const { data, isFetching, page, handlePageChange } = useTableRows(params);

  if (isFetching || !data) {
    return null;
  }

  return (
    <TablePagination
      colSpan={columns.length + 1} // 補上 checkbox 的 colSpan
      count={data.totalRows}
      rowsPerPage={10}
      rowsPerPageOptions={[10]}
      page={page}
      showFirstButton
      showLastButton
      slotProps={{ select: { inputProps: { "aria-label": "rows per page" } } }}
      onPageChange={handlePageChange}
      sx={{ border: 0 }}
    />
  );
};

export { Pagination };
