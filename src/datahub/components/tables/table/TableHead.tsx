import { Box, Checkbox, Typography, TableCell, TableRow, TableSortLabel } from "@mui/material";
import SortRoundedIcon from "@mui/icons-material/SortRounded";

import { generateHeadCellSx, smSpace } from "../commonSx";
import { ellipsisSx } from "@/utils/commonSx";

import { useMemo } from "react";
import { useTableAllSelect } from "@/datahub/hooks/tableSelect";
import { useTableControls } from "@/datahub/hooks/tableControl";
import type { TableControlParams } from "@/datahub/hooks/tableControl";

const captionBgSx = { p: 0.5, borderRadius: 1, bgcolor: "divider" };
const captionSx = { textTransform: "uppercase", lineHeight: 1, color: "text.secondary" };

const Captions = ({ isPk, type }: { isPk: boolean; type: string }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: smSpace, color: "text.secondary" }}>
    {isPk && (
      <Typography variant="caption" sx={{ ...captionBgSx, ...captionSx }}>
        PK
      </Typography>
    )}
    <Box sx={captionBgSx}>
      <Typography variant="caption" sx={{ ...captionSx, ...ellipsisSx }}>
        {type}
      </Typography>
    </Box>
  </Box>
);

const useTableHeadCheckbox = (params: TableControlParams) => {
  const { checked, indeterminate, toggle: toggleCheckedAll } = useTableAllSelect(params.totalRows);
  const unchecked = useMemo(() => !checked && !indeterminate, [checked, indeterminate]);

  return { toggleCheckedAll, checked, unchecked, indeterminate };
};

const TableHead = ({ params }: { params: TableControlParams }) => {
  const { tableColumns, orderByIndex, order, createOrderToggler } = useTableControls(params);
  const { toggleCheckedAll, checked, unchecked, indeterminate } = useTableHeadCheckbox(params);

  return (
    <TableRow>
      <TableCell padding="checkbox" sx={generateHeadCellSx("top-left")}>
        <Checkbox
          color="default"
          onChange={toggleCheckedAll}
          indeterminate={indeterminate}
          checked={checked}
          size="small"
          sx={{
            color: !unchecked
              ? "color-mix(in srgb, var(--mui-palette-text-primary) 30%, var(--mui-palette-primary-main) 70%)"
              : undefined,
          }}
        />
      </TableCell>

      {tableColumns.map((column, i) => {
        const { cid, name, type, align } = column;
        const isPk = column.pk >= 1;
        const active = orderByIndex === i;
        const scale = active ? (order === "desc" ? 1 : -1) : -1;
        const justifyContent = align === "right" ? "flex-end" : "flex-start";
        const isLast = i === tableColumns.length - 1;

        return (
          <TableCell key={cid} sx={{ minWidth: "10rem", ...generateHeadCellSx(isLast ? "top-right" : "no-radius") }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent }}>
              <TableSortLabel
                active={active}
                direction={active ? order : "asc"}
                IconComponent={SortRoundedIcon}
                slotProps={{ icon: { sx: { transform: `scaleY(${scale})` } } }}
                onClick={createOrderToggler(i)}
              >
                <Typography variant="body2">{name}</Typography>
              </TableSortLabel>
              <Captions isPk={isPk} type={type} />
            </Box>
          </TableCell>
        );
      })}

      {tableColumns.length === 0 && <TableCell sx={generateHeadCellSx("top-right")} colSpan={1} />}
    </TableRow>
  );
};

export { TableHead };
