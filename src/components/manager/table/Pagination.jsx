import { TablePagination } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { TABLE_ROWS_LENGTH } from "../../../utils/store";
import { TABLE_PAGE, TABLE_PAGE_ROWS } from "../../../utils/store";

export function EnhancedTablePagination() {
  const fullLength = useRecoilValue(TABLE_ROWS_LENGTH);
  const [page, setPage] = useRecoilState(TABLE_PAGE);
  const [perPage, setPerPage] = useRecoilState(TABLE_PAGE_ROWS);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    setPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={fullLength}
      page={page}
      rowsPerPage={perPage}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
