const data = {
  users: {
    columns: [
      { cid: 0, name: "id", type: "integer", notnull: 0, dflt_value: null, pk: 1 },
      { cid: 1, name: "name", type: "text", notnull: 1, dflt_value: null, pk: 0 },
      { cid: 2, name: "email", type: "text", notnull: 1, dflt_value: null, pk: 0 },
      { cid: 3, name: "hashedPassword", type: "text", notnull: 1, dflt_value: null, pk: 0 },
      { cid: 4, name: "description", type: "text", notnull: 0, dflt_value: "''", pk: 0 },
      { cid: 5, name: "createdAt", type: "date", notnull: 1, dflt_value: "CURRENT_TIMESTAMP", pk: 0 },
      { cid: 6, name: "updatedAt", type: "date", notnull: 1, dflt_value: "CURRENT_TIMESTAMP", pk: 0 },
    ],
    indexes: [
      {
        seq: 0,
        name: "sqlite_autoindex_users_2",
        unique: 1,
        origin: "u",
        partial: 0,
        columns: [{ seqno: 0, cid: 2, name: "email" }],
      },
      {
        seq: 1,
        name: "sqlite_autoindex_users_1",
        unique: 1,
        origin: "u",
        partial: 0,
        columns: [{ seqno: 0, cid: 1, name: "name" }],
      },
    ],
    type: "table",
    hueIndex: 0,
  },
  posts: {
    columns: [
      { cid: 0, name: "id", type: "integer", notnull: 0, dflt_value: null, pk: 1 },
      { cid: 1, name: "userId", type: "integer", notnull: 1, dflt_value: null, pk: 0 },
      { cid: 2, name: "title", type: "text", notnull: 1, dflt_value: null, pk: 0 },
      { cid: 3, name: "content", type: "text", notnull: 1, dflt_value: null, pk: 0 },
      { cid: 4, name: "tags", type: "json_array", notnull: 1, dflt_value: null, pk: 0 },
      { cid: 5, name: "photos", type: "json_array", notnull: 0, dflt_value: null, pk: 0 },
      { cid: 6, name: "attachments", type: "json_array", notnull: 0, dflt_value: null, pk: 0 },
      { cid: 7, name: "viewCount", type: "integer", notnull: 0, dflt_value: "0", pk: 0 },
      { cid: 8, name: "createdAt", type: "date", notnull: 1, dflt_value: "CURRENT_TIMESTAMP", pk: 0 },
      { cid: 9, name: "updatedAt", type: "date", notnull: 1, dflt_value: "CURRENT_TIMESTAMP", pk: 0 },
    ],
    indexes: [],
    type: "table",
    hueIndex: 1,
  },
  comments: {
    columns: [
      { cid: 0, name: "id", type: "integer", notnull: 0, dflt_value: null, pk: 1 },
      { cid: 1, name: "userId", type: "integer", notnull: 1, dflt_value: null, pk: 0 },
      { cid: 2, name: "postId", type: "integer", notnull: 1, dflt_value: null, pk: 0 },
      { cid: 3, name: "parentId", type: "integer", notnull: 0, dflt_value: null, pk: 0 },
      { cid: 4, name: "content", type: "text", notnull: 1, dflt_value: null, pk: 0 },
      { cid: 5, name: "createdAt", type: "date", notnull: 1, dflt_value: "CURRENT_TIMESTAMP", pk: 0 },
      { cid: 6, name: "updatedAt", type: "date", notnull: 1, dflt_value: "CURRENT_TIMESTAMP", pk: 0 },
    ],
    indexes: [],
    type: "table",
    hueIndex: 2,
  },
  post_interactions: {
    columns: [
      { cid: 0, name: "id", type: "integer", notnull: 0, dflt_value: null, pk: 1 },
      { cid: 1, name: "userId", type: "integer", notnull: 1, dflt_value: null, pk: 0 },
      { cid: 2, name: "postId", type: "integer", notnull: 1, dflt_value: null, pk: 0 },
      { cid: 3, name: "type", type: "text", notnull: 1, dflt_value: null, pk: 0 },
      { cid: 4, name: "createdAt", type: "date", notnull: 1, dflt_value: "CURRENT_TIMESTAMP", pk: 0 },
    ],
    indexes: [
      {
        seq: 0,
        name: "sqlite_autoindex_post_interactions_1",
        unique: 1,
        origin: "u",
        partial: 0,
        columns: [
          { seqno: 0, cid: 1, name: "userId" },
          { seqno: 1, cid: 2, name: "postId" },
          { seqno: 2, cid: 3, name: "type" },
        ],
      },
    ],
    type: "table",
    hueIndex: 3,
  },
  comment_interactions: {
    columns: [
      { cid: 0, name: "id", type: "integer", notnull: 0, dflt_value: null, pk: 1 },
      { cid: 1, name: "userId", type: "integer", notnull: 1, dflt_value: null, pk: 0 },
      { cid: 2, name: "commentId", type: "integer", notnull: 1, dflt_value: null, pk: 0 },
      { cid: 3, name: "type", type: "text", notnull: 1, dflt_value: null, pk: 0 },
      { cid: 4, name: "createdAt", type: "date", notnull: 1, dflt_value: "CURRENT_TIMESTAMP", pk: 0 },
    ],
    indexes: [
      {
        seq: 0,
        name: "sqlite_autoindex_comment_interactions_1",
        unique: 1,
        origin: "u",
        partial: 0,
        columns: [
          { seqno: 0, cid: 1, name: "userId" },
          { seqno: 1, cid: 2, name: "commentId" },
          { seqno: 2, cid: 3, name: "type" },
        ],
      },
    ],
    type: "table",
    hueIndex: 4,
  },
  user_interactions: {
    columns: [
      { cid: 0, name: "id", type: "integer", notnull: 0, dflt_value: null, pk: 1 },
      { cid: 1, name: "followerId", type: "integer", notnull: 1, dflt_value: null, pk: 0 },
      { cid: 2, name: "followeeId", type: "integer", notnull: 1, dflt_value: null, pk: 0 },
      { cid: 3, name: "type", type: "text", notnull: 1, dflt_value: null, pk: 0 },
      { cid: 4, name: "createdAt", type: "date", notnull: 1, dflt_value: "CURRENT_TIMESTAMP", pk: 0 },
    ],
    indexes: [
      {
        seq: 0,
        name: "sqlite_autoindex_user_interactions_1",
        unique: 1,
        origin: "u",
        partial: 0,
        columns: [
          { seqno: 0, cid: 1, name: "followerId" },
          { seqno: 1, cid: 2, name: "followeeId" },
          { seqno: 2, cid: 3, name: "type" },
        ],
      },
    ],
    type: "table",
    hueIndex: 5,
  },
  notification_states: {
    columns: [
      { cid: 0, name: "userId", type: "integer", notnull: 1, dflt_value: null, pk: 1 },
      { cid: 1, name: "type", type: "text", notnull: 1, dflt_value: null, pk: 2 },
      { cid: 2, name: "sourceId", type: "integer", notnull: 1, dflt_value: null, pk: 3 },
      { cid: 3, name: "readAt", type: "date", notnull: 1, dflt_value: "CURRENT_TIMESTAMP", pk: 0 },
      { cid: 4, name: "isDeleted", type: "integer", notnull: 1, dflt_value: "0", pk: 0 },
    ],
    indexes: [
      {
        seq: 0,
        name: "sqlite_autoindex_notification_states_1",
        unique: 1,
        origin: "pk",
        partial: 0,
        columns: [
          { seqno: 0, cid: 0, name: "userId" },
          { seqno: 1, cid: 1, name: "type" },
          { seqno: 2, cid: 2, name: "sourceId" },
        ],
      },
    ],
    type: "table",
    hueIndex: 6,
  },
  user_interaction_counts: {
    columns: [
      { cid: 0, name: "userId", type: "integer", notnull: 0, dflt_value: null, pk: 0 },
      { cid: 1, name: "followerCount", type: "integer", notnull: 0, dflt_value: null, pk: 0 },
      { cid: 2, name: "followingCount", type: "integer", notnull: 0, dflt_value: null, pk: 0 },
      { cid: 3, name: "postCount", type: "integer", notnull: 0, dflt_value: null, pk: 0 },
      { cid: 4, name: "totalLikeCount", type: "integer", notnull: 0, dflt_value: null, pk: 0 },
      { cid: 5, name: "totalViewCount", type: "integer", notnull: 0, dflt_value: null, pk: 0 },
    ],
    indexes: [],
    type: "view",
    hueIndex: 0,
  },
  user_stats: {
    columns: [{ cid: 0, name: "totalUsers", type: "integer", notnull: 0, dflt_value: null, pk: 0 }],
    indexes: [],
    type: "view",
    hueIndex: 1,
  },
  post_stats: {
    columns: [{ cid: 0, name: "totalPosts", type: "integer", notnull: 0, dflt_value: null, pk: 0 }],
    indexes: [],
    type: "view",
    hueIndex: 2,
  },
  comment_stats: {
    columns: [{ cid: 0, name: "totalComments", type: "integer", notnull: 0, dflt_value: null, pk: 0 }],
    indexes: [],
    type: "view",
    hueIndex: 3,
  },
  post_interaction_counts: {
    columns: [
      { cid: 0, name: "postId", type: "integer", notnull: 0, dflt_value: null, pk: 0 },
      { cid: 1, name: "likeCount", type: "integer", notnull: 0, dflt_value: null, pk: 0 },
      { cid: 2, name: "favoriteCount", type: "integer", notnull: 0, dflt_value: null, pk: 0 },
      { cid: 3, name: "commentCount", type: "integer", notnull: 0, dflt_value: null, pk: 0 },
    ],
    indexes: [],
    type: "view",
    hueIndex: 4,
  },
  comment_interaction_counts: {
    columns: [
      { cid: 0, name: "commentId", type: "integer", notnull: 0, dflt_value: null, pk: 0 },
      { cid: 1, name: "likeCount", type: "integer", notnull: 0, dflt_value: null, pk: 0 },
    ],
    indexes: [],
    type: "view",
    hueIndex: 5,
  },
};

import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";
import UnfoldLessRoundedIcon from "@mui/icons-material/UnfoldLessRounded";
import { TreeViewItem } from "./TreeItemDemo";
import { useEffect, useState } from "react";
import { toEntries } from "@/utils/typedBuiltins";

const iconSize = 4; // mui space
const sep = ",_,";

export function TreeDemo() {
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
    const firstTable = Object.keys(data)[0];
    const firstTableNode = `${firstTable}${sep}table`;
    const firstTableColumns = `${firstTable}${sep}columns`;
    const firstTableIndexes = `${firstTable}${sep}indexes`;
    setExpanded([firstTableNode, firstTableColumns, firstTableIndexes]);
  }, []);

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
          hueIndex={-hueIndex}
          subtitle={type}
        >
          <TreeViewItem type="columns" itemId={`${tableName}${sep}columns`} label="欄位">
            {columns.map(({ name, type, pk }) => (
              <TreeViewItem
                key={`${tableName}${sep}column${sep}${name}`}
                itemId={`${tableName}${sep}column${sep}${name}`}
                type={pk >= 1 ? "pk" : name.toLowerCase().includes("id") ? "key" : "column"}
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
