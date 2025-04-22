import { Box, Checkbox, Typography, TableCell, TableRow, TableSortLabel } from "@mui/material";
import SortRoundedIcon from "@mui/icons-material/SortRounded";

import { useSort, useTableColumns } from "@/datahub/hooks/table";
import { generateHeadCellSx, smSpace } from "./commonSx";
import { ellipsisSx } from "@/utils/commonSx";

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

type TableHeaderProps = { columns: Exclude<ReturnType<typeof useTableColumns>["columnsForTable"], null> };

const TableHeader = ({ columns }: TableHeaderProps) => {
  const { order, orderBy, createToggleHandler } = useSort(columns?.length ?? 0);

  const checked = Math.random() > 0.5;
  const indeterminate = Math.random() > 0.5;
  const unchecked = !checked && !indeterminate;

  return (
    <TableRow>
      <TableCell padding="checkbox" sx={generateHeadCellSx("first")}>
        <Checkbox
          color="default"
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

      {columns.map((column, i) => {
        const { cid, name, type, align } = column;
        const isPk = column.pk >= 1;
        const active = orderBy === i;
        const scale = active ? (order === "desc" ? 1 : -1) : -1;
        const justifyContent = align === "right" ? "flex-end" : "flex-start";
        const isLast = i === columns.length - 1;

        return (
          <TableCell key={cid} sx={{ minWidth: "10rem", ...generateHeadCellSx(isLast ? "last" : "middle") }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent }}>
              <TableSortLabel
                active={active}
                direction={active ? order : "asc"}
                IconComponent={SortRoundedIcon}
                slotProps={{ icon: { sx: { transform: `scaleY(${scale})` } } }}
                onClick={createToggleHandler(i)}
              >
                <Typography variant="body2">{name}</Typography>
              </TableSortLabel>
              <Captions isPk={isPk} type={type} />
            </Box>
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export { TableHeader };
