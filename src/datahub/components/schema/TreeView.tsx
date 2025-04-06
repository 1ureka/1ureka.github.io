import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";
import UnfoldLessRoundedIcon from "@mui/icons-material/UnfoldLessRounded";
import { iconSize, TreeViewItem } from "./TreeViewItem";
import { useEffect, useState } from "react";
import { useTreeView } from "@/datahub/hooks/read";
import { Box, CircularProgress } from "@mui/material";
import { toEntries } from "@/utils/typedBuiltins";

const sep = ",_,";

export default function TreeView() {
  const { data, isFetching } = useTreeView();
  const [expanded, setExpanded] = useState<string[]>([]);

  // 處理節點展開/折疊的事件
  const handleItemExpansionToggle = (_: React.SyntheticEvent, itemId: string, isExpanded: boolean) => {
    if (isExpanded) {
      // 判斷是否為表格節點
      if (itemId.endsWith(sep + "table")) {
        // 如果是表格節點，移除其他表格節點
        const tableNode = [itemId];
        const tableName = itemId.split(sep)[0];
        const tableElements = ["columns", "indexes"].map((el) => `${tableName}${sep}${el}`);
        setExpanded([...tableNode, ...tableElements]);
      } else {
        // 其他類型節點正常添加
        setExpanded([...expanded, itemId]);
      }
    } else {
      // 折疊時，從展開列表中移除此節點
      setExpanded(expanded.filter((id) => id !== itemId));
    }
  };

  useEffect(() => {
    if (isFetching || !data) return;
    const firstTable = Object.keys(data)[0];
    const firstTableNode = `${firstTable}${sep}table`;
    const firstTableColumns = `${firstTable}${sep}columns`;
    const firstTableIndexes = `${firstTable}${sep}indexes`;
    setExpanded([firstTableNode, firstTableColumns, firstTableIndexes]);
  }, [data, isFetching]);

  if (isFetching) {
    return (
      <Box sx={{ display: "grid", placeItems: "center", height: 1 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <SimpleTreeView
      slots={{ expandIcon: UnfoldMoreRoundedIcon, collapseIcon: UnfoldLessRoundedIcon }}
      sx={{ ml: -iconSize / 2 }}
      expandedItems={expanded}
      onItemExpansionToggle={handleItemExpansionToggle}
    >
      {toEntries(data).map(([tableName, { columns, indexes, type, hueIndex }]) => (
        <TreeViewItem
          key={tableName}
          type="table"
          itemId={`${tableName}${sep}table`}
          label={tableName}
          hueIndex={hueIndex}
          subtitle={type}
        >
          <TreeViewItem type="columns" itemId={`${tableName}${sep}columns`} label="欄位">
            {columns.map(({ name, type, pk }) => (
              <TreeViewItem
                key={`${tableName}${sep}column${sep}${name}`}
                itemId={`${tableName}${sep}column${sep}${name}`}
                type={pk === 1 ? "pk" : "column"}
                label={name}
                caption={type}
              />
            ))}
          </TreeViewItem>
          <TreeViewItem type="indexes" itemId={`${tableName}${sep}indexes`} label="索引">
            {indexes.length === 0 && (
              <TreeViewItem type="index" itemId={`${tableName}${sep}no${sep}index`} label="無索引" />
            )}
            {indexes.map(({ name, unique, columns }) => (
              <TreeViewItem
                key={`${tableName}${sep}index${sep}${name}`}
                itemId={`${tableName}${sep}index${sep}${name}`}
                type="index"
                label={columns
                  .toSorted((a, b) => a.seqno - b.seqno)
                  .map(({ name }) => name)
                  .join(" → ")}
                caption={unique === 1 ? "UNIQUE" : undefined}
              />
            ))}
          </TreeViewItem>
        </TreeViewItem>
      ))}
    </SimpleTreeView>
  );
}
