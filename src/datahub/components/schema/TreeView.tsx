import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";
import UnfoldLessRoundedIcon from "@mui/icons-material/UnfoldLessRounded";
import { iconSize, TreeViewItem } from "./TreeViewItem";
import { useState } from "react";

export default function TreeView() {
  const [expanded, setExpanded] = useState<string[]>(["category_table", "category_columns", "category_indexes"]);

  // 處理節點展開/折疊的事件
  const handleItemExpansionToggle = (_: React.SyntheticEvent, itemId: string, isExpanded: boolean) => {
    if (isExpanded) {
      // 判斷是否為表格節點
      if (itemId.endsWith("_table")) {
        // 如果是表格節點，移除其他表格節點
        const tableNode = [itemId];
        const tableName = itemId.split("_")[0];
        const tableElements = ["columns", "indexes"].map((el) => `${tableName}_${el}`);
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

  return (
    <SimpleTreeView
      slots={{ expandIcon: UnfoldMoreRoundedIcon, collapseIcon: UnfoldLessRoundedIcon }}
      sx={{ ml: -iconSize / 2 }}
      expandedItems={expanded}
      onItemExpansionToggle={handleItemExpansionToggle}
    >
      <TreeViewItem type="table" itemId="category_table" label="Category" hueIndex={0} subtitle="table">
        <TreeViewItem type="columns" itemId="category_columns" label="欄位">
          <TreeViewItem type="pk" itemId="category_columns_id" label="id" caption="integer" />
          <TreeViewItem type="column" itemId="category_columns_name" label="name" caption="text" />
          <TreeViewItem type="column" itemId="category_columns_description" label="description" caption="text" />
        </TreeViewItem>
        <TreeViewItem type="indexes" itemId="category_indexes" label="索引">
          <TreeViewItem type="index" itemId="category_indexes_id" label="id" />
          <TreeViewItem type="index" itemId="category_indexes_name" label="name" />
        </TreeViewItem>
      </TreeViewItem>
      <TreeViewItem type="table" itemId="product_table" label="Product" hueIndex={1} subtitle="table">
        <TreeViewItem type="columns" itemId="product_columns" label="欄位">
          <TreeViewItem type="pk" itemId="product_columns_id" label="id" caption="integer" />
          <TreeViewItem type="column" itemId="product_columns_name" label="name" caption="text" />
          <TreeViewItem type="column" itemId="product_columns_description" label="description" caption="text" />
          <TreeViewItem type="column" itemId="product_columns_price" label="price" caption="real" />
          <TreeViewItem type="key" itemId="product_columns_category_id" label="category_id" caption="integer" />
        </TreeViewItem>
        <TreeViewItem type="indexes" itemId="product_indexes" label="索引">
          <TreeViewItem type="index" itemId="product_indexes_id" label="id" />
          <TreeViewItem type="index" itemId="product_indexes_name" label="name" />
          <TreeViewItem type="index" itemId="product_indexes_name_category_id" label="name → category_id" />
        </TreeViewItem>
      </TreeViewItem>
    </SimpleTreeView>
  );
}
