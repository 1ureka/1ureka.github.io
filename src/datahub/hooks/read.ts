import { useMemo } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { downloadDatabase, getDbBytes, getObjectsByTypes, getTableForeignKeys, getTableIndexInfo } from "../data/read";
import { getTableInfo, getTotalRowCount } from "../data/read";
import type { SQLiteObjectType, TableColumnInfo, TableIndexInfo } from "../data/read";

// const staleTime = 1 * 60 * 1000;
const staleTime = 0; // TODO: 測試完 loading state 後要記得改回 1 分鐘

const useDownloadDb = () => {
  return useMutation({
    mutationFn: downloadDatabase,
    onSuccess: (success) => {
      if (success) console.log("下載資料庫成功");
      else console.error("下載資料庫失敗");
    },
    onError: (error) => {
      console.error("下載資料庫失敗:", error);
    },
  });
};

const useDbBytes = () => {
  return useQuery({
    queryKey: ["dbBytes"],
    queryFn: () => getDbBytes(),
    staleTime,
  });
};

const useObjects = ({ types }: { types: SQLiteObjectType[] }) => {
  return useQuery({
    queryKey: ["objects", types],
    queryFn: () => getObjectsByTypes(types),
    staleTime,
  });
};

const useRowCounts = ({ types }: { types: Exclude<SQLiteObjectType, "index" | "trigger">[] }) => {
  return useQuery({
    queryKey: ["rowCounts", types],
    queryFn: () => getTotalRowCount(types),
    staleTime,
  });
};

const useTableInfo = ({ types }: { types: Exclude<SQLiteObjectType, "index" | "trigger">[] }) => {
  const { data: objects = [], isFetching: isFetchingObjects } = useObjects({ types });
  const { data, isFetching: isFetchingTableInfos } = useQuery({
    queryKey: ["tableInfos", objects],
    queryFn: async () => {
      const results = await Promise.all(
        objects.map(async ({ name, type }) => ({ table: name, type, columns: await getTableInfo(name) }))
      );

      return results.filter((obj) => obj.columns !== null) as {
        table: string;
        type: Exclude<SQLiteObjectType, "index" | "trigger">;
        columns: TableColumnInfo[];
      }[];
    },
    enabled: objects.length > 0,
    staleTime,
  });

  return { data, isFetching: isFetchingObjects || isFetchingTableInfos };
};

const useForeignKeys = ({ types }: { types: Exclude<SQLiteObjectType, "index" | "trigger">[] }) => {
  const { data: objects = [], isFetching: isFetchingObjects } = useObjects({ types });
  const { data, isFetching: isFetchingForeignKeys } = useQuery({
    queryKey: ["foreignKeys", objects],
    queryFn: async () => {
      const results = await Promise.all(
        objects.map(async ({ name, type }) => ({ table: name, type, keys: await getTableForeignKeys(name) }))
      );

      return results.filter((obj) => obj.keys.length > 0);
    },
    enabled: objects.length > 0,
    staleTime,
  });

  return { data, isFetching: isFetchingObjects || isFetchingForeignKeys };
};

const useIndexes = ({ types }: { types: Exclude<SQLiteObjectType, "index" | "trigger">[] }) => {
  const { data: objects = [], isFetching: isFetchingObjects } = useObjects({ types });
  const { data, isFetching: isFetchingIndexes } = useQuery({
    queryKey: ["indexes", objects],
    queryFn: async () => {
      const results = await Promise.all(
        objects.map(async ({ name, type }) => ({ table: name, type, indexes: await getTableIndexInfo(name) }))
      );

      return results.filter((obj) => obj.indexes.length > 0);
    },
    enabled: objects.length > 0,
    staleTime,
  });

  return { data, isFetching: isFetchingObjects || isFetchingIndexes };
};

type TableNodeData = {
  tableName: string;
  tableType: Exclude<SQLiteObjectType, "index" | "trigger">;
  hueIndex: number;
  fields: {
    fieldName: string;
    fieldType: string;
    nullable: "yes" | "no" | "pk";
    isSource?: boolean; // 是否被其它 forignKey 參考
    isTarget?: boolean; // 是否是 forignKey
  }[];
};

type TableEdgeData = {
  id: string;
  source: string;
  target: string;
  sourceHandle: string;
  targetHandle: string; // 若target, source在同個表，則targetHandle會是${targetId}_self
};

const useFlowChart = () => {
  const { data: tables = [], isFetching: isFetchingTables } = useTableInfo({ types: ["table", "view"] });
  const { data: foreignKeys = [], isFetching: isFetchingForeignKeys } = useForeignKeys({ types: ["table", "view"] });

  // 將資料轉換為 TableNodeData 格式
  const nodes: TableNodeData[] = useMemo(() => {
    if (tables.length === 0 || foreignKeys.length === 0) return [];

    // 標記被參考的欄位 (isSource)
    const referencedFields: Record<string, Set<string>> = {};
    foreignKeys.forEach(({ keys }) => {
      keys.forEach(({ table, to }) => {
        if (!referencedFields[table]) referencedFields[table] = new Set();
        referencedFields[table].add(to);
      });
    });

    // 為每個表格創建節點
    return tables
      .toSorted((a, b) => a.type.localeCompare(b.type))
      .map(({ table, type, columns }, i) => {
        // 取得當前表格的外鍵
        const foreginKeys = foreignKeys.find(({ table: _table }) => _table === table) || null;

        const fields: TableNodeData["fields"] = columns.map((column) => ({
          fieldName: column.name,
          fieldType: column.type,
          nullable: column.pk === 1 ? "pk" : column.notnull === 0 ? "yes" : "no",
          isSource: referencedFields[table]?.has(column.name) || false,
          isTarget: foreginKeys?.keys.some((key) => key.from === column.name) || false,
        }));

        const hueIndex = i % 7;

        return { tableName: table, tableType: type, hueIndex, fields };
      });
  }, [tables, foreignKeys]);

  const edges: TableEdgeData[] = useMemo(() => {
    if (tables.length === 0 || foreignKeys.length === 0) return [];

    const result: TableEdgeData[] = [];

    // 處理每個外鍵
    foreignKeys.forEach(({ table, keys }) => {
      keys.forEach(({ from, to, table: referencedTable }) => {
        const sourceHandle = to;
        const targetHandle = referencedTable === table ? `${from}_self` : from; // 若是同一個表格，則加上 _self

        result.push({
          id: `${referencedTable}.${targetHandle}->${table}.${sourceHandle}`,
          source: referencedTable,
          target: table,
          sourceHandle,
          targetHandle,
        });
      });
    });

    return result;
  }, [tables, foreignKeys]);

  return { nodes, edges, isFetching: isFetchingTables || isFetchingForeignKeys };
};

type TreeViewData = {
  [table: string]: {
    columns: TableColumnInfo[];
    indexes: TableIndexInfo[];
    type: "table" | "view";
    hueIndex: number;
  };
};

const useTreeView = () => {
  const { data: tables = [], isFetching: isFetchingTables } = useTableInfo({ types: ["table", "view"] });
  const { data: indexes = [], isFetching: isFetchingIndexes } = useIndexes({ types: ["table", "view"] });

  const data = useMemo(() => {
    if (tables.length === 0 || indexes.length === 0) return {};

    const result: TreeViewData = {};

    tables
      .toSorted((a, b) => a.type.localeCompare(b.type))
      .forEach(({ table, columns, type }, i) => {
        result[table] = { columns, indexes: [], type, hueIndex: i % 7 };
      });

    indexes.forEach(({ table, indexes: tableIndexes }) => {
      if (!result[table]) return;
      result[table].indexes.push(...tableIndexes);
    });

    return result;
  }, [tables, indexes]);

  return { data, isFetching: isFetchingTables || isFetchingIndexes };
};

export { useDownloadDb, useDbBytes, useObjects, useRowCounts, useTableInfo, useForeignKeys, useIndexes };
export { useFlowChart, useTreeView };
export type { TableNodeData };
