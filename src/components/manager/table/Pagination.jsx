import { TablePagination } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { MANAGER_ROWS } from "../../../utils/store";
import { MANAGER_PAGE, MANAGER_PAGE_ROWS } from "../../../utils/store";

export function EnhancedTablePagination() {
  const rows = useRecoilValue(MANAGER_ROWS);
  const fullLength = rows.length;
  const [page, setPage] = useRecoilState(MANAGER_PAGE);
  const [perPage, setPerPage] = useRecoilState(MANAGER_PAGE_ROWS);

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
      showFirstButton
      showLastButton
    />
  );
}
