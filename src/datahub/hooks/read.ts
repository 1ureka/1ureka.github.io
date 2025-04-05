import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDbBytes, getObjectsByTypes, getTableForeignKeys } from "../data/read";
import { getTableInfo, getTotalRowCount } from "../data/read";
import type { SQLiteObjectType, TableColumnInfo } from "../data/read";

// const staleTime = 1 * 60 * 1000;
const staleTime = 0; // TODO: 測試完 loading state 後要記得改回 1 分鐘

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
    queryFn: async () => Promise.all(objects.map(async ({ name }) => getTableForeignKeys(name))),
    enabled: objects.length > 0,
    staleTime,
  });

  return { data, isFetching: isFetchingObjects || isFetchingForeignKeys };
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

const useFlowChart = () => {
  const { data: tables = [], isFetching: isFetchingTables } = useTableInfo({ types: ["table", "view"] });
  const { data: foreignKeys = [], isFetching: isFetchingForeignKeys } = useForeignKeys({ types: ["table", "view"] });

  // 將資料轉換為 TableNodeData 格式
  const nodes: TableNodeData[] = useMemo(() => {
    if (tables.length === 0 || foreignKeys.length === 0) return [];

    // 標記被參考的欄位 (isSource)
    const referencedFields: Record<string, Set<string>> = {};
    foreignKeys.forEach((keys) => {
      keys.forEach(({ table, to }) => {
        if (!referencedFields[table]) referencedFields[table] = new Set();
        referencedFields[table].add(to);
      });
    });

    // 為每個表格創建節點
    return tables.map(({ table, type, columns }, hueIndex) => {
      // 取得當前表格的外鍵
      const tableForginKeys = foreignKeys.find((keys) => keys.some((key) => key.table === table)) || [];

      const fields: TableNodeData["fields"] = columns.map((column) => ({
        fieldName: column.name,
        fieldType: column.type,
        nullable: column.pk === 1 ? "pk" : column.notnull === 0 ? "yes" : "no",
        isSource: referencedFields[table]?.has(column.name) || false,
        isTarget: tableForginKeys.some((key) => key.from === column.name),
      }));

      return { tableName: table, tableType: type, hueIndex, fields };
    });
  }, [tables, foreignKeys]);

  return { nodes, isFetching: isFetchingTables || isFetchingForeignKeys };
};

export { useDbBytes, useObjects, useRowCounts, useTableInfo, useForeignKeys, useFlowChart };
