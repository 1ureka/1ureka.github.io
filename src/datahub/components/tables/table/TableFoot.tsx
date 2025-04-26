import { TablePagination } from "@mui/material";
import { useTableControls } from "@/datahub/hooks/tableControl";
import type { TableControlParams } from "@/datahub/hooks/tableControl";
import { rowsPerPage } from "@/datahub/hooks/tableRows";

const TableFoot = ({ params }: { params: TableControlParams }) => {
  const { tableColumns, totalRows, page, handlePageChange } = useTableControls(params);

  if (tableColumns.length === 0) {
    return (
      <TablePagination
        colSpan={2}
        count={0}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[rowsPerPage]}
        page={0}
        showFirstButton
        showLastButton
        onPageChange={handlePageChange}
        sx={{ border: 0 }}
      />
    );
  }

  return (
    <TablePagination
      colSpan={tableColumns.length + 1} // 補上 checkbox 的 colSpan
      count={totalRows ?? 0}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[rowsPerPage]}
      page={page}
      showFirstButton
      showLastButton
      onPageChange={handlePageChange}
      sx={{ border: 0 }}
    />
  );
};

export { TableFoot };
