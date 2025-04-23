import { Box, Button, Tooltip, Typography } from "@mui/material";
import type { ButtonProps } from "@mui/material";
import { smSpace } from "./commonSx";
import { useTableRows } from "@/datahub/hooks/tableRows";
import { useTableColumns } from "@/datahub/hooks/table";

const secondaryButtonSx: (color: string) => ButtonProps["sx"] = (color) => ({
  "--temporary-color": color,
  bgcolor: "color-mix(in srgb, var(--temporary-color) 30%, transparent 70%)",
  "&:hover": { bgcolor: "color-mix(in srgb, var(--temporary-color) 40%, transparent 60%)" },
  color: "color-mix(in srgb, var(--temporary-color) 40%, var(--mui-palette-text-primary) 60%)",
  px: 1.5,
});

const LoadingDisplay = () => (
  <>
    <Typography sx={{ color: "text.secondary" }}>已選取 0 個:</Typography>

    <Box sx={{ display: "flex", alignItems: "center", gap: smSpace }}>
      <Button sx={secondaryButtonSx("var(--mui-palette-primary-main)")} loading>
        覆蓋欄位
      </Button>
      <Button sx={secondaryButtonSx("var(--mui-palette-error-main)")} loading>
        刪除紀錄
      </Button>
    </Box>
  </>
);

const SelectActions = (params: Parameters<typeof useTableRows>[0]) => {
  const { isFetching, data } = useTableRows(params);

  if (isFetching || !data) {
    return <LoadingDisplay />;
  }

  const { totalRows } = data;
  const selectedAmount = 0;

  return (
    <>
      <Typography sx={{ color: "text.secondary" }}>
        已選取 {selectedAmount} 個 / {totalRows} 個:
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: smSpace }}>
        <Tooltip title={<Typography variant="body2">以指定值覆蓋選取資料的某個欄位</Typography>} arrow>
          <Button sx={secondaryButtonSx("var(--mui-palette-primary-main)")}>覆蓋欄位</Button>
        </Tooltip>
        <Button sx={secondaryButtonSx("var(--mui-palette-error-main)")}>刪除紀錄</Button>
      </Box>
    </>
  );
};

const Wrapper = () => {
  const { isFetching, selectedTable: table, columnsForTable: columns } = useTableColumns();
  const loading = isFetching || !table || !columns;

  if (loading) {
    return <LoadingDisplay />;
  }

  return <SelectActions table={table.name} columns={columns} />;
};

export { Wrapper as SelectActions };
