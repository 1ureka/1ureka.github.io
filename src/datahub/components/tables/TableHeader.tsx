import { Box, Checkbox, Typography, TableCell, TableRow, TableSortLabel } from "@mui/material";
import SortRoundedIcon from "@mui/icons-material/SortRounded";

import { useSort, useTableColumns } from "@/datahub/hooks/table";
import { smSpace } from "./commonSx";
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

// 因為不知為何 TableHead (display: "table-header-group") 無法套用 border-radius
const Background = () => (
  <Box
    component="tr"
    aria-hidden="true"
    sx={{
      position: "absolute",
      inset: 0,
      borderRadius: 3,
      borderBottomRightRadius: "calc(1 * var(--mui-shape-borderRadius))",
      borderBottomLeftRadius: "calc(1 * var(--mui-shape-borderRadius))",
      bgcolor: "divider",
      opacity: 0.8,
      pointerEvents: "none",
    }}
  />
);

type TableHeaderProps = { columns: Exclude<ReturnType<typeof useTableColumns>["columnsForTable"], null> };

const TableHeader = ({ columns }: TableHeaderProps) => {
  const { order, orderBy, createToggleHandler } = useSort(columns?.length ?? 0);

  const checked = Math.random() > 0.5;
  const indeterminate = Math.random() > 0.5;
  const unchecked = !checked && !indeterminate;

  return (
    <>
      <Background />

      <TableRow>
        <TableCell padding="checkbox" sx={{ border: "none" }}>
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

          return (
            <TableCell key={cid} sx={{ border: "none", minWidth: "10rem" }}>
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
    </>
  );
};

export { TableHeader };
