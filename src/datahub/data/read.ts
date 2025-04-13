import { getClient } from "./client";
import { tryCatchSync } from "@/utils/tryCatch";
import { aggregateStrings } from "../utils/array";
import dayjs from "dayjs";

const downloadDatabase = async (fileName: string = "database.sqlite") => {
  const client = getClient();
  return client.downloadDatabase(fileName);
};

// --------------------------------------------------------
// 資料庫大小、所有表、所有行數
// --------------------------------------------------------

const getDbBytes = async () => {
  const client = getClient();
  const bytes = await client.getDatabaseSize();
  return bytes;
};

type SQLiteObjectType = "table" | "view" | "index" | "trigger";

const getObjectsByTypes = async (types: SQLiteObjectType[]) => {
  const client = getClient();
  const results: { type: SQLiteObjectType; name: string }[] = [];

  await Promise.all(
    types.map(async (type) => {
      const sql = `
      SELECT name FROM sqlite_master WHERE type = $type AND name NOT LIKE 'sqlite_%' ORDER BY rowid;
      `;
      const rows = await client.exec(sql, { $type: type });

      rows.forEach((row) => {
        if (typeof row.name === "string") results.push({ type, name: row.name });
      });
    })
  );

  return results.toSorted((a, b) => a.type.localeCompare(b.type));
};

const getTotalRowCount = async (types: Exclude<SQLiteObjectType, "index" | "trigger">[]) => {
  const client = getClient();
  const results: { [table: string]: number } = {};

  // 獲取所有指定類型的物件
  const objects = await getObjectsByTypes(types);

  // 對每個物件執行 COUNT(*) 查詢
  await Promise.all(
    objects.map(async ({ name }) => {
      const sql = `SELECT COUNT(*) as count FROM ${name};`;
      const rows = await client.exec(sql);
      if (rows.length > 0) results[name] = Number(rows[0].count ?? 0);
      else results[name] = 0;
    })
  );

  return results;
};

// --------------------------------------------------------
// 表格結構、資料型別分析
// --------------------------------------------------------

type TableColumnInfo = {
  cid: number;
  name: string;
  type: string;
  notnull: number;
  dflt_value: string | null;
  pk: number;
};

const analyzeType = (value: unknown) => {
  // 注意: 只有字串會有衍伸類型
  if (value === null || value === undefined) return "empty";
  if (typeof value === "number" && Number.isInteger(value)) return "integer"; // 整數
  if (typeof value === "number") return "real"; // 浮點數

  // 開始分析字串類型
  if (typeof value !== "string") return "unknown";
  if (value.trim() === "") return "empty";

  // 可由 regexp 判斷的類型
  if (/^[0-9a-f]{8}-[0-9a-f]{4}/.test(value)) return "uuid";
  if (["true", "false", "0", "1"].includes(value.toLowerCase())) return "boolean";

  // 可由 dayjs 判斷的類型
  const date = dayjs(value);
  if (date.isValid()) return "date";

  // 可由 JSON.parse 判斷的類型
  const parseResult = tryCatchSync(() => JSON.parse(value));
  if (parseResult.error) return "text"; // 如果解析失敗，則視為普通文本

  const parsed = parseResult.data;
  if (Array.isArray(parsed)) return "json_array";
  if (typeof parsed === "object" && parsed !== null) return "json_object";

  return "text"; // 如果解析成功但不是陣列或物件，則視為普通文本
};

const getColumnType = async (tableName: string, col: string, type: string) => {
  const client = getClient();

  const sql = `SELECT "${col}" FROM "${tableName}" LIMIT 20;`;
  const rows = await client.exec(sql);
  if (rows.length === 0) return type; // 如果沒有資料，則不分析

  const typeArray = rows.map((row) => analyzeType(row[col])).filter((t) => t !== "empty");
  const result = aggregateStrings(typeArray, 0.9); // 找出最常見的類型，並要求至少 90% 的一致性
  if (!result || result === "unknown") return type; // 如果沒有明確的類型，或根本不是字串，則返回原始類型
  return result; // 返回聚合結果
};

const getTableInfo = async (tableName: string) => {
  const client = getClient();
  const sql = `PRAGMA table_info(${tableName});`;
  const tableInfo = (await client.exec(sql)) as TableColumnInfo[];
  if (tableInfo.length === 0) return null;

  const types = await Promise.all(tableInfo.map((col) => getColumnType(tableName, col.name, col.type)));
  const formatedTypes = types.map((type) => type.toLowerCase());
  return tableInfo.map((item, i) => ({ ...item, type: formatedTypes[i] }));
};

// --------------------------------------------------------
// 獲取 foreign 資訊
// --------------------------------------------------------

type TableForeignKey = {
  id: number; // 外鍵編號（同一條件的群組）
  seq: number; // 在該外鍵編號內的順序（通常 0）
  table: string; // 指向的表格名稱
  from: string; // 當前表格的欄位
  to: string; // 外部表格的欄位
  on_update: string; // ON UPDATE 行為（如 CASCADE）
  on_delete: string; // ON DELETE 行為（如 SET NULL）
  match: string; // MATCH 規則（通常為 'NONE'）
};

const getTableForeignKeys = async (tableName: string): Promise<TableForeignKey[]> => {
  const client = getClient();
  const sql = `PRAGMA foreign_key_list(${tableName});`;
  const foreignKeys = await client.exec(sql);

  return foreignKeys as TableForeignKey[];
};

// --------------------------------------------------------
// 獲取 indexes
// --------------------------------------------------------

type IndexListRow = {
  seq: number; // 索引在此表格中的順序
  name: string; // 索引名稱
  unique: 0 | 1; // 是否為 UNIQUE 索引
  origin: "c" | "u" | "pk"; // 來源：使用者建立、UNIQUE 約束、PRIMARY KEY
  partial: 0 | 1; // 是否為 partial index（有條件的索引）
};

type IndexInfoRow = {
  seqno: number; // 在索引中的順序
  cid: number; // 對應表格中欄位的 ID
  name: string; // 對應表格中欄位的名稱
};

type TableIndexInfo = IndexListRow & { columns: IndexInfoRow[] };

const getTableIndexInfo = async (tableName: string): Promise<TableIndexInfo[]> => {
  const client = getClient();

  // 獲取表格的索引列表
  const indexListSql = `PRAGMA index_list(${tableName});`;
  const indexList = (await client.exec(indexListSql)) as IndexListRow[];

  // 獲取每個索引的詳細資訊
  const indexInfos: TableIndexInfo[] = await Promise.all(
    indexList.map(async (index) => {
      const indexInfoSql = `PRAGMA index_info(${index.name});`;
      const columns = (await client.exec(indexInfoSql)) as IndexInfoRow[];

      return { ...index, columns };
    })
  );

  return indexInfos;
};

export { getDbBytes, downloadDatabase };
export { getObjectsByTypes, getTotalRowCount, getTableInfo, getTableForeignKeys, getTableIndexInfo };
export type { SQLiteObjectType, TableColumnInfo, TableForeignKey, TableIndexInfo };
