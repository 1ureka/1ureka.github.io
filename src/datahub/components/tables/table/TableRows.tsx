import { Checkbox, Skeleton, TableCell, TableRow, Typography } from "@mui/material";
import { CheckboxProps } from "@mui/material";
import { rowsPerPage, useTableRows, useTableRowsByColumns } from "@/datahub/hooks/tableRows";
import { ellipsisSx } from "@/utils/commonSx";
import { tableRowsStyles } from "../commonSx";

const styles = tableRowsStyles;

const CheckboxCell = ({ checked, ...props }: CheckboxProps) => (
  <TableCell padding="checkbox" sx={styles.checkboxCell}>
    <Checkbox color="default" size="small" sx={styles.checkbox(checked ?? false)} checked={checked} {...props} />
  </TableCell>
);

const TableRows = (params: Parameters<typeof useTableRows>[0]) => {
  const { columns } = params;
  const { data, isFetching } = useTableRows(params);
  const { sortedRows } = useTableRowsByColumns({ rows: data?.rows ?? null, columns });

  if (isFetching || !data) {
    return (
      <>
        {[...Array(rowsPerPage)].map((_, i) => (
          <TableRow key={i} sx={styles.row(false, i)}>
            <CheckboxCell disabled />

            {columns.map((_, j) => (
              <TableCell key={j} sx={styles.rowCell(j === columns.length - 1)}>
                <Skeleton animation="wave" variant="rounded" sx={{ width: 1, maxWidth: "none" }}>
                  <Typography>載入中...</Typography>
                </Skeleton>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </>
    );
  }

  if (!sortedRows.length) {
    return (
      <TableRow sx={styles.row(false, 1)}>
        <TableCell sx={styles.rowCellFull} colSpan={columns.length + 1}>
          <Typography sx={{ color: "text.secondary", textAlign: "center" }}>
            該資料表 / 檢視表目前沒有任何資料
          </Typography>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {sortedRows.map((row, i) => {
        const checked = false;

        return (
          <TableRow key={`data${i}`} sx={styles.row(checked, i)}>
            <CheckboxCell checked={checked} />

            {row.map(({ value, align }, j) => (
              <TableCell key={j} align={align} sx={styles.rowCell(j === columns.length - 1)}>
                <Typography sx={ellipsisSx}>{value}</Typography>
              </TableCell>
            ))}
          </TableRow>
        );
      })}
    </>
  );
};

export { TableRows };
