import { useTreeItem2, UseTreeItem2Parameters } from "@mui/x-tree-view/useTreeItem2";
import { TreeItem2Content, TreeItem2IconContainer, TreeItem2GroupTransition } from "@mui/x-tree-view/TreeItem2";
import { TreeItem2Label, TreeItem2Root } from "@mui/x-tree-view/TreeItem2";
import { TreeItem2Icon } from "@mui/x-tree-view/TreeItem2Icon";
import { TreeItem2Provider } from "@mui/x-tree-view/TreeItem2Provider";

import { forwardRef, memo } from "react";
import { Box, ButtonBase, Tooltip, Typography } from "@mui/material";
import ViewColumnRoundedIcon from "@mui/icons-material/ViewColumnRounded";
import FormatIndentIncreaseRoundedIcon from "@mui/icons-material/FormatIndentIncreaseRounded";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import InfoOutlineRoundedIcon from "@mui/icons-material/InfoOutlineRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import DatasetRoundedIcon from "@mui/icons-material/DatasetRounded";
import { ellipsisSx } from "../home/commonSx";

interface CustomTreeItemProps
  extends Omit<UseTreeItem2Parameters, "rootRef">,
    Omit<React.HTMLAttributes<HTMLLIElement>, "onFocus"> {
  type: "table" | "column" | "columns" | "index" | "indexes" | "key" | "pk";
  hueIndex?: number;
  subtitle?: string;
  caption?: string;
}

const iconSize = 4; // mui space
const commonIconSx = { position: "absolute", color: "text.secondary", display: "grid", placeItems: "center" };
const fakeEditable = false;

const iconMap: Record<CustomTreeItemProps["type"], (hueIndex?: number) => React.ReactNode> = {
  table: (hueIndex?: number) => (
    <Box sx={commonIconSx}>
      <DatasetRoundedIcon sx={{ color: "primary.main", filter: `hue-rotate(${hueIndex ?? 0 * 20}deg)` }} />
    </Box>
  ),
  columns: () => (
    <Box sx={commonIconSx}>
      <ViewColumnRoundedIcon />
    </Box>
  ),
  column: () => (
    <Box sx={{ ...commonIconSx, opacity: 0.5 }}>
      <ViewColumnRoundedIcon />
    </Box>
  ),
  indexes: () => (
    <Box sx={commonIconSx}>
      <FormatIndentIncreaseRoundedIcon />
    </Box>
  ),
  index: () => (
    <Box sx={{ ...commonIconSx, opacity: 0.5 }}>
      <InfoOutlineRoundedIcon />
    </Box>
  ),
  key: () => (
    <Box sx={{ ...commonIconSx, opacity: 0.5 }}>
      <VpnKeyRoundedIcon />
    </Box>
  ),
  pk: () => (
    <Box sx={{ ...commonIconSx, color: "info.main" }}>
      <VpnKeyRoundedIcon />
    </Box>
  ),
};

const CustomTreeItem = forwardRef(function CustomTreeItem(props: CustomTreeItemProps, ref: React.Ref<HTMLLIElement>) {
  const { id, itemId, label, disabled, children, type, hueIndex, subtitle, caption, ...other } = props;

  const { getRootProps, getContentProps, getIconContainerProps, getLabelProps, getGroupTransitionProps, status } =
    useTreeItem2({ id, itemId, children, label, disabled, rootRef: ref });

  return (
    <TreeItem2Provider itemId={itemId}>
      <TreeItem2Root {...getRootProps(other)}>
        <TreeItem2Content
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 0.5,
            pl: iconSize / 2,
            pr: 1.5,
            borderRadius: 0,
            boxShadow: "-1px 0 0 var(--mui-palette-divider)",
          }}
          {...getContentProps()}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {!["column", "index", "pk", "key"].includes(type) && (
              <Box sx={{ display: "grid", placeItems: "center", p: iconSize / 2 }}>
                <TreeItem2IconContainer sx={{ position: "absolute" }} {...getIconContainerProps()}>
                  <TreeItem2Icon status={status} />
                </TreeItem2IconContainer>
              </Box>
            )}

            <Box sx={{ display: "grid", placeItems: "center", p: iconSize / 2 }}>{iconMap[type](hueIndex)}</Box>

            <TreeItem2Label
              {...getLabelProps()}
              sx={{ lineHeight: 1, pl: iconSize / 3, translate: "0 0.07rem", width: "auto", ...ellipsisSx }}
            />
            {subtitle && (
              <Box sx={{ p: 0.5, bgcolor: "divider", borderRadius: 1, ml: 1, translate: "0 0.07rem" }}>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", textTransform: "uppercase", lineHeight: 1, ...ellipsisSx }}
                >
                  {subtitle}
                </Typography>
              </Box>
            )}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", position: "relative" }}>
            {caption && (
              <Typography
                variant="body2"
                sx={{
                  mr: 1,
                  color: "text.secondary",
                  lineHeight: 1,
                  translate: "0 0.07rem",
                  textTransform: "uppercase",
                  fontFamily: `"jf openhuninn"`,
                  ...ellipsisSx,
                }}
              >
                {caption}
              </Typography>
            )}
            {["table", "columns", "indexes"].includes(type) && (
              <Tooltip
                title={
                  <Typography variant="body2">
                    {fakeEditable
                      ? `編輯 ${{ table: "資料表", columns: "欄位", indexes: "索引" }[type as string]}`
                      : "正被其他網站樣板使用中，無法編輯"}
                  </Typography>
                }
                arrow
                placement="right"
              >
                <ButtonBase
                  sx={{
                    display: "grid",
                    placeItems: "center",
                    p: iconSize / 2,
                    borderRadius: 1,
                    "&:hover": { bgcolor: "action.hover" },
                    "&:active": { bgcolor: "action.selected" },
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizRoundedIcon sx={{ color: "text.secondary", position: "absolute" }} />
                </ButtonBase>
              </Tooltip>
            )}
          </Box>
        </TreeItem2Content>
        {children && (
          <TreeItem2GroupTransition
            {...getGroupTransitionProps()}
            sx={{ pl: iconSize, boxShadow: "-1px 0 0 var(--mui-palette-divider)" }}
          />
        )}
      </TreeItem2Root>
    </TreeItem2Provider>
  );
});

const TreeViewItem = memo(CustomTreeItem);

export { TreeViewItem, iconSize };
