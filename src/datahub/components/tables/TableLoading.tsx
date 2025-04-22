import { Box, Checkbox, Skeleton, Typography } from "@mui/material";
import { TableCell, TableRow } from "@mui/material";
import { generateHeadCellSx, tableRowsStyles } from "./commonSx";

export const TableHeaderLoading = () => (
  <TableRow>
    <TableCell padding="checkbox" sx={generateHeadCellSx("first")}>
      <Checkbox disabled size="small" />
    </TableCell>

    <TableCell sx={generateHeadCellSx("middle")}>
      <Skeleton variant="rounded" animation="wave" sx={{ maxWidth: "none", width: 0.5 }}>
        <Typography variant="body2">載入中. . .</Typography>
      </Skeleton>
    </TableCell>
    {[...Array(4)].map((_, i) => (
      <TableCell key={i} sx={generateHeadCellSx(i === 3 ? "last" : "middle")}>
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
    {[...Array(5)].map((_, i) => (
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
