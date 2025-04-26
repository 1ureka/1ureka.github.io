import { Box, Checkbox, Skeleton, TableCell, TableRow, Typography } from "@mui/material";
import { CheckboxProps } from "@mui/material";

import { ellipsisSx } from "@/utils/commonSx";
import { tableRowsStyles } from "../commonSx";
import { useTableRowSelect } from "@/datahub/hooks/tableSelect";
import { rowsPerPage, useTableRows } from "@/datahub/hooks/tableRows";
import type { TableControlParams } from "@/datahub/hooks/tableControl";

const styles = tableRowsStyles;

const CheckboxCell = ({ checked, ...props }: CheckboxProps) => (
  <TableCell padding="checkbox" sx={styles.checkboxCell}>
    <Checkbox color="default" size="small" sx={styles.checkbox(checked ?? false)} checked={checked} {...props} />
  </TableCell>
);

type RowProps = {
  id: string;
  values: { value: string | number; align: "left" | "right" }[];
  index: number;
};

const Row = ({ id, values, index }: RowProps) => {
  const { checked, toggle } = useTableRowSelect(id);

  return (
    <TableRow sx={styles.row(checked, index)}>
      <CheckboxCell checked={checked} onChange={toggle} />

      {values.map(({ value, align }, j) => (
        <TableCell key={j} align={align} sx={styles.rowCell(j === values.length - 1)}>
          <Typography sx={ellipsisSx}>{value}</Typography>
        </TableCell>
      ))}
    </TableRow>
  );
};

const TableRows = ({ params }: { params: TableControlParams }) => {
  const { rows, columns, isFetching } = useTableRows(params);
  const colSpan = columns.length + 1; // +1 是 checkbox

  if (isFetching || !rows) {
    return (
      <>
        {[...Array(rowsPerPage)].map((_, i) => (
          <TableRow key={i} sx={tableRowsStyles.row(false, i)}>
            <CheckboxCell checked={false} disabled />

            {columns.map(({ align }, j) => (
              <TableCell key={j} sx={styles.rowCell(j === columns.length - 1)}>
                <Box sx={{ display: "flex", justifyContent: align === "right" ? "flex-end" : "flex-start" }}>
                  <Skeleton variant="rounded" animation="wave" sx={{ maxWidth: "none", width: 0.5 }}>
                    <Typography sx={ellipsisSx}>載入中. . .</Typography>
                  </Skeleton>
                </Box>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </>
    );
  }

  if (!rows.length) {
    return (
      <TableRow sx={styles.row(false, 1)}>
        <TableCell sx={styles.rowCellFull} colSpan={colSpan}>
          <Typography sx={{ color: "text.secondary", textAlign: "center" }}>
            該資料表 / 檢視表目前沒有任何資料
          </Typography>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {rows.map((rowProps, i) => (
        <Row key={rowProps.id} {...rowProps} index={i} />
      ))}
    </>
  );
};

export { TableRows };
