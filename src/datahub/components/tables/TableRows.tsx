import { Checkbox, Skeleton, TableCell, TableRow, Typography } from "@mui/material";
import { CheckboxProps } from "@mui/material";
import { useTableRows, useTableRowsByColumns } from "@/datahub/hooks/tableRows";
import { ellipsisSx } from "@/utils/commonSx";

const generateMuiColorMix = (color1: string, color2: string, percentage: number) => {
  return `color-mix(in srgb, var(--mui-palette-${color1}) ${percentage}%, var(--mui-palette-${color2}) ${
    100 - percentage
  }%)`;
};

const styles = {
  checkboxCell: { borderRadius: 2, borderTopRightRadius: 0, borderBottomRightRadius: 0 },
  checkbox: (checked: boolean) => ({
    color: checked ? generateMuiColorMix("text-primary", "primary-main", 30) : undefined,
  }),

  row: (selected: boolean, index: number) =>
    ({
      "& td, & th": { border: 0 },
      position: "relative",
      borderRadius: 2,
      bgcolor: selected
        ? generateMuiColorMix("action-hover", "primary-light", 80)
        : index % 2 === 0
        ? "color-mix(in srgb, var(--mui-palette-action-hover), transparent)"
        : "action.hover",
    } as const),

  rowCellFull: { py: 8, borderRadius: 2 },
  rowCell: (isFinal: boolean) => ({
    py: 3,
    ...(isFinal ? { borderRadius: 2, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } : {}),
  }),
};

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
        {[...Array(5)].map((_, i) => (
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
