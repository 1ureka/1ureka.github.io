import { Box, Button, Tooltip, Typography } from "@mui/material";
import type { ButtonProps } from "@mui/material";
import { useState } from "react";

import { smSpace } from "../commonSx";
import { useTableSelectCount, useTableSubmit } from "@/datahub/hooks/tableSelect";
import { useLoadTableControls, useTableControls } from "@/datahub/hooks/tableControl";
import type { TableControlParams } from "@/datahub/hooks/tableControl";
import { DeleteConfirmDrawer } from "../DeleteConfirmDrawer";

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

const Wrapper = () => {
  const { isFetching, tableControlParams } = useLoadTableControls();
  const submit = useTableSubmit();

  if (isFetching || !tableControlParams) {
    return <LoadingDisplay />;
  }

  return <SelectActions params={tableControlParams} submit={submit} />;
};

const SelectActions = ({ params, submit }: { params: TableControlParams; submit: () => any }) => {
  const { totalRows } = useTableControls(params);
  const checkedAmount = useTableSelectCount(totalRows);
  const [deleteDrawerOpen, setDeleteDrawerOpen] = useState(false);

  const handleDeleteClick = () => {
    setDeleteDrawerOpen(true);
  };

  const getSelectedRowIds = () => {
    const selection = submit();
    if (selection.selectAll) {
      // TODO: 實現全選時排除某些行的邏輯
      // 目前簡化處理：如果是全選，返回空陣列（避免刪除全部資料）
      console.warn("暫不支援全選模式下的刪除操作");
      return [];
    } else {
      return selection.includeIds || [];
    }
  };

  return (
    <>
      <Typography sx={{ color: "text.secondary" }}>
        已選取 {checkedAmount} 個 / {totalRows} 個:
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: smSpace }}>
        <Tooltip title={<Typography variant="body2">以指定值覆蓋選取資料的某個欄位</Typography>} arrow>
          <span>
            <Button sx={secondaryButtonSx("var(--mui-palette-primary-main)")} disabled={checkedAmount <= 0}>
              覆蓋欄位
            </Button>
          </span>
        </Tooltip>
        <Button 
          sx={secondaryButtonSx("var(--mui-palette-error-main)")} 
          disabled={checkedAmount <= 0}
          onClick={handleDeleteClick}
        >
          刪除紀錄
        </Button>
      </Box>

      <DeleteConfirmDrawer
        open={deleteDrawerOpen}
        onClose={() => setDeleteDrawerOpen(false)}
        params={params}
        selectedRowIds={getSelectedRowIds()}
      />
    </>
  );
};

export { Wrapper as SelectActions };
