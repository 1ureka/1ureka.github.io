import { Box, Checkbox, Skeleton, Typography } from "@mui/material";
import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import SortRoundedIcon from "@mui/icons-material/SortRounded";

import { useMemo } from "react";
import { useTableInfo } from "@/datahub/hooks/read";
import { useHiddenColumns, useSelectedTable, useSort } from "@/datahub/hooks/table";
import { smSpace } from "./commonSx";
import { ellipsisSx } from "@/utils/commonSx";

const TableHeaderLoading = () => (
  <TableRow>
    <TableCell padding="checkbox" sx={{ border: "none" }}>
      <Checkbox disabled size="small" />
    </TableCell>

    <TableCell sx={{ border: "none" }}>
      <Skeleton variant="rounded" animation="wave">
        <Typography variant="body2">載入中. . .</Typography>
      </Skeleton>
    </TableCell>
    {[...Array(4)].map((_, i) => (
      <TableCell key={i} sx={{ border: "none" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Skeleton variant="rounded" animation="wave">
            <Typography variant="body2">載入中. . .</Typography>
          </Skeleton>
        </Box>
      </TableCell>
    ))}
  </TableRow>
);

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

const TableHeader = () => {
  const { selected, isFetching: isFetchingObj } = useSelectedTable();
  const { data: tableInfo, isFetching: isFetchingInfo } = useTableInfo({ types: ["table", "view"] });
  const isFetching = isFetchingInfo || !tableInfo || isFetchingObj || !selected;

  const { hiddenColumns } = useHiddenColumns();

  const columns = useMemo(() => {
    if (!tableInfo || !selected) return null;
    const table = tableInfo.find(({ table }) => table === selected.name);
    if (!table) return null;
    const { columns } = table;
    const filtered = columns.filter(({ cid }) => !hiddenColumns.includes(cid));
    return filtered.toSorted((a, b) => {
      if (a.pk !== b.pk) return b.pk - a.pk;
      if (a.type === "text" && b.type !== "text") return -1;
      if (a.type !== "text" && b.type === "text") return 1;
      return a.cid - b.cid;
    });
  }, [tableInfo, selected, hiddenColumns]);

  const { order, orderBy, createToggleHandler } = useSort(columns?.length ?? 0);

  const checked = Math.random() > 0.5;
  const indeterminate = Math.random() > 0.5;
  const unchecked = !checked && !indeterminate;

  return (
    <TableHead sx={{ position: "relative" }}>
      <Background />

      {isFetching || !columns ? (
        <TableHeaderLoading />
      ) : (
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
            const { cid, name, type } = column;
            const isPk = column.pk === 1;
            const align = type !== "text" && !isPk ? "flex-end" : undefined;
            const active = orderBy === i;
            const scale = active ? (order === "desc" ? 1 : -1) : -1;

            return (
              <TableCell key={cid} sx={{ border: "none", minWidth: "10rem" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: align }}>
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
      )}
    </TableHead>
  );
};

export { TableHeader };
