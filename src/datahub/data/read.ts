import { tryCatchSync } from "@/utils/tryCatch";
import { useSQLiteStore } from "../hooks/useSQLiteStore";
import { aggregateStrings } from "../utils/array";
import dayjs from "dayjs";

const getClient = () => {
  const { client } = useSQLiteStore.getState();
  if (!client) throw new Error("SQLite client is not initialized.");
  return client;
};

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
      const sql = `SELECT name FROM sqlite_master WHERE type = $type AND name NOT LIKE 'sqlite_%';`;
      const rows = await client.exec(sql, { $type: type });

      rows.forEach((row) => {
        if (typeof row.name === "string") results.push({ type, name: row.name });
      });
    })
  );

  return results;
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

type TableInfo = {
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
  const tableInfo = (await client.exec(sql)) as TableInfo[];
  if (tableInfo.length === 0) return null;

  const types = await Promise.all(tableInfo.map((col) => getColumnType(tableName, col.name, col.type)));
  const formatedTypes = types.map((type) => type.toLowerCase());
  return tableInfo.map((item, i) => ({ ...item, type: formatedTypes[i] }));
};

export { getDbBytes, getObjectsByTypes, getTotalRowCount, getTableInfo };
export type { SQLiteObjectType };
