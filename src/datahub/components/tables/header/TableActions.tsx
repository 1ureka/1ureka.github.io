import { Button, Divider, List, ListItem, ListItemButton, ListItemText, Popover, Typography } from "@mui/material";
import type { ButtonProps } from "@mui/material";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

import { smSpace } from "../commonSx";
import { useMemo } from "react";
import { useAnchorEl } from "@/hooks/utils";
import { useLoadTableControls, useTableControls } from "@/datahub/hooks/tableControl";
import type { TableControlParams } from "@/datahub/hooks/tableControl";

const primaryButtonSx: (color: string) => ButtonProps["sx"] = (color) => ({
  "--temporary-color": color,
  bgcolor: "color-mix(in srgb, var(--temporary-color) 90%, var(--mui-palette-text-primary) 10%)",
  "&:hover": { bgcolor: "color-mix(in srgb, var(--temporary-color) 80%, var(--mui-palette-text-primary) 20%)" },
  color: "color-mix(in srgb, var(--temporary-color) 5%, var(--mui-palette-background-paper) 95%)",
  px: 1.5,
});

const standardizableTypes = ["date", "json_array", "json_object", "integer", "real", "boolean", "uuid"] as const;

const ColumnList = ({ params }: { params: TableControlParams }) => {
  const { selectableColumns } = useTableControls(params);
  const columns = useMemo(() => {
    return selectableColumns.filter(({ type }) =>
      standardizableTypes.includes(type as (typeof standardizableTypes)[number])
    );
  }, [selectableColumns]);

  return (
    <List dense>
      <ListItem>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          可標準化的欄位
        </Typography>
      </ListItem>

      <Divider sx={{ my: 0.5 }} />

      {columns.map(({ cid, name, type }) => (
        <ListItem key={cid} disablePadding>
          <ListItemButton role={undefined} dense>
            <ListItemText
              sx={{ display: "flex", width: 1, gap: smSpace, justifyContent: "space-between", my: 0.5 }}
              primary={name}
              secondary={type.toUpperCase()}
            />
          </ListItemButton>
        </ListItem>
      ))}

      {columns.length <= 0 && (
        <ListItem>
          <ListItemText sx={{ textAlign: "center" }} primary={"無可標準化的欄位"} />
        </ListItem>
      )}
    </List>
  );
};

const TableActions = () => {
  const { anchorEl, handleClose, handleOpen } = useAnchorEl();
  const { isFetching, tableControlParams } = useLoadTableControls();

  return (
    <>
      <Button
        sx={primaryButtonSx("var(--mui-palette-primary-main)")}
        endIcon={<ArrowDropDownRoundedIcon />}
        onClick={handleOpen}
        loading={isFetching}
      >
        標準化
      </Button>

      {tableControlParams && (
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          elevation={3}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          slotProps={{ paper: { sx: { maxHeight: 350 } } }}
        >
          <ColumnList params={tableControlParams} />
        </Popover>
      )}
    </>
  );
};

export { TableActions };
