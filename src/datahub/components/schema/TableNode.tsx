import { Box, type BoxProps, Stack, Typography } from "@mui/material";
import DatasetRoundedIcon from "@mui/icons-material/DatasetRounded";

import { Handle, Position } from "@xyflow/react";
import type { Node, NodeProps } from "@xyflow/react";
import type { TableNodeData } from "@/datahub/hooks/read";
import { ellipsisSx } from "../home/commonSx";
import { memo } from "react";

export type TableNodeType = Node<TableNodeData, "tableNode">;

const mdSpace = 1.5;
const smSpace = 1;
const xsSpace = 0.5;
const borderRadius = 1.5;

const NodeBackground = ({ sx, ...props }: BoxProps) => (
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      borderRadius: borderRadius * 1.5,
      ...sx,
    }}
    {...props}
  />
);

const HeaderBackground = ({ sx, ...props }: BoxProps) => (
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      bgcolor: "primary.main",
      ...sx,
    }}
    {...props}
  />
);

const Header = memo(
  ({ tableName, tableType, hueIndex }: { tableName: string; tableType: string; hueIndex: number }) => {
    return (
      <Box
        sx={{
          position: "relative",
          borderRadius: borderRadius,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          overflow: "hidden",
          p: mdSpace,
          py: smSpace,
        }}
      >
        <HeaderBackground sx={{ filter: `hue-rotate(${hueIndex * 20}deg)`, opacity: 0.35 }} />

        <Box sx={{ display: "flex", alignItems: "flex-end", gap: smSpace, position: "relative" }}>
          <DatasetRoundedIcon sx={{ color: "text.primary", fontSize: "1.2rem" }} />
          <Typography variant="body1" component="h6" sx={{ lineHeight: 1, ...ellipsisSx }}>
            {tableName}
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Typography
            variant="caption"
            sx={{
              lineHeight: 1,
              alignSelf: "center",
              p: xsSpace,
              bgcolor: "background.paper",
              borderRadius: 1,
              textTransform: "uppercase",
            }}
          >
            {tableType}
          </Typography>
        </Box>

        <HeaderBackground sx={{ filter: `hue-rotate(${hueIndex * 20}deg)`, opacity: 0.35 }} />
      </Box>
    );
  }
);

const TableHead = memo(() => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: smSpace,
        p: smSpace,
        my: xsSpace,
      }}
    >
      <Typography variant="body2" sx={{ ...ellipsisSx, opacity: 0.85 }}>
        名稱
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="body2" sx={{ opacity: 0.85, width: "5rem", textAlign: "end", ...ellipsisSx }}>
          型別
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.85, width: "3rem", textAlign: "end", ...ellipsisSx }}>
          空值
        </Typography>
      </Box>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          borderRadius: 1,
          bgcolor: "divider",
          opacity: 0.5,
        }}
      />
    </Box>
  );
});

const endFieldSx = { color: "text.secondary", opacity: 0.85, textAlign: "end", ...ellipsisSx } as const;

const TableRow = memo(
  ({ fieldName, fieldType, nullable }: { fieldName: string; fieldType: string; nullable: "yes" | "no" | "pk" }) => {
    return (
      <>
        <Typography variant="body2" sx={{ ...ellipsisSx, opacity: 0.85 }}>
          {fieldName}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="caption" sx={{ textTransform: "uppercase", width: "5rem", ...endFieldSx }}>
            {fieldType}
          </Typography>
          <Typography variant="caption" sx={{ width: "3rem", ...endFieldSx }}>
            {{ yes: "可", no: "否", pk: "主鍵" }[nullable]}
          </Typography>
        </Box>
      </>
    );
  }
);

const TableNode = ({ selected, data }: NodeProps<TableNodeType>) => (
  <Box
    sx={{
      cursor: "move",
      width: 300,
      p: xsSpace,
      borderRadius: borderRadius * 1.5,
      bgcolor: "background.paper",
    }}
  >
    <NodeBackground sx={{ boxShadow: 2, opacity: 0.35 }} />
    <NodeBackground
      sx={{
        outline: selected ? 2 : 1,
        outlineColor: selected ? "primary.main" : "divider",
        filter: `hue-rotate(${data.hueIndex * 20}deg)`,
        opacity: 0.85,
      }}
    />

    <Header tableName={data.tableName} tableType={data.tableType} hueIndex={data.hueIndex} />

    <TableHead />

    <Stack sx={{ gap: mdSpace, alignItems: "stretch", p: mdSpace, pt: smSpace }}>
      {data.fields.map(({ fieldName, fieldType, nullable, isSource, isTarget }, index) => (
        <Box
          key={index}
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: smSpace,
          }}
        >
          <TableRow fieldName={fieldName} fieldType={fieldType} nullable={nullable} />
          {isTarget && (
            <Handle
              id={fieldName}
              type="target"
              position={Position.Left}
              style={{
                marginLeft: `calc(var(--mui-spacing) * ${-mdSpace})`,
                opacity: 0,
                pointerEvents: "none", // 禁止自訂連接
              }}
            />
          )}
          {isTarget && (
            <Handle
              id={fieldName + "_self"}
              type="target"
              position={Position.Right}
              style={{
                marginRight: `calc(var(--mui-spacing) * ${-mdSpace})`,
                opacity: 0,
                pointerEvents: "none", // 禁止自訂連接
              }}
            />
          )}
          {isSource && (
            <Handle
              id={fieldName}
              type="source"
              position={Position.Right}
              style={{
                marginRight: `calc(var(--mui-spacing) * ${-(mdSpace + xsSpace)})`,
                width: `calc(var(--mui-spacing) * ${1.5})`,
                height: "auto",
                aspectRatio: "1/1",
                background: "var(--mui-palette-background-paper)",
                border: `1px solid var(--mui-palette-divider)`,
                boxShadow: "var(--mui-shadows-1)",
                pointerEvents: "none", // 禁止自訂連接
              }}
            />
          )}
        </Box>
      ))}
    </Stack>
  </Box>
);

export { TableNode };
