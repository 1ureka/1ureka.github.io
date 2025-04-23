import { Box, Checkbox, Skeleton, TablePagination, Typography } from "@mui/material";
import { TableCell, TableRow } from "@mui/material";
import { generateHeadCellSx, tableRowsStyles } from "../commonSx";
import { rowsPerPage } from "@/datahub/hooks/tablePublic";

export const TableHeaderLoading = () => (
  <TableRow>
    <TableCell padding="checkbox" sx={generateHeadCellSx("top-left")}>
      <Checkbox disabled size="small" />
    </TableCell>

    <TableCell sx={generateHeadCellSx("no-radius")}>
      <Skeleton variant="rounded" animation="wave" sx={{ maxWidth: "none", width: 0.5 }}>
        <Typography variant="body2">載入中. . .</Typography>
      </Skeleton>
    </TableCell>
    {[...Array(4)].map((_, i) => (
      <TableCell key={i} sx={generateHeadCellSx(i === 3 ? "top-right" : "no-radius")}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Skeleton variant="rounded" animation="wave" sx={{ maxWidth: "none", width: 0.5 }}>
            <Typography variant="body2">載入中. . .</Typography>
          </Skeleton>
        </Box>
      </TableCell>
    ))}
  </TableRow>
);

export const TableRowsLoading = () => (
  <>
    {[...Array(rowsPerPage)].map((_, i) => (
      <TableRow key={i} sx={tableRowsStyles.row(false, i)}>
        <TableCell padding="checkbox" sx={tableRowsStyles.checkboxCell}>
          <Checkbox disabled size="small" />
        </TableCell>

        <TableCell sx={tableRowsStyles.rowCell(false)}>
          <Skeleton variant="rounded" animation="wave" sx={{ maxWidth: "none", width: 0.5 }}>
            <Typography>載入中. . .</Typography>
          </Skeleton>
        </TableCell>
        {[...Array(4)].map((_, i) => (
          <TableCell key={i} sx={tableRowsStyles.rowCell(i === 3)}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Skeleton variant="rounded" animation="wave" sx={{ maxWidth: "none", width: 0.5 }}>
                <Typography>載入中. . .</Typography>
              </Skeleton>
            </Box>
          </TableCell>
        ))}
      </TableRow>
    ))}
  </>
);

export const PaginationLoading = () => (
  <TablePagination
    colSpan={6}
    count={0}
    rowsPerPage={10}
    rowsPerPageOptions={[10]}
    page={0}
    showFirstButton
    showLastButton
    slotProps={{ select: { inputProps: { "aria-label": "rows per page" } } }}
    onPageChange={() => {}}
    disabled
    sx={{ border: 0 }}
  />
);
