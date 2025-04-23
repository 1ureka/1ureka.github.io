import { tryCatchSync } from "@/utils/tryCatch";
import { getClient } from "./client";

const normalizeCell = (value: unknown): string | number => {
  if (value === null || value === undefined) return "";
  if (typeof value === "string" || typeof value === "number") return value;

  const { data, error } = tryCatchSync(() => String(value));
  if (error) throw new Error(`無法將資料轉換為有效格式: ${error.message}`);
  return data;
};

const normalizeRow = (row: Record<string, unknown>): Row => {
  const transformedRow: Row = {};
  for (const key in row) transformedRow[key] = normalizeCell(row[key]);
  return transformedRow;
};

type GetRowsParams = {
  table: string;
  page?: number;
  limit?: number;
  orderBy?: string;
  order?: "asc" | "desc";
};

type Row = { [col: string]: string | number };

type GetRowsResult = {
  table: string;
  rows: Row[];
  nextPage: number | null;
  totalPages: number;
  totalRows: number;
};

type GetRows = (params: GetRowsParams) => Promise<GetRowsResult>;

const getRows: GetRows = async ({ table, page = 0, limit = 7, orderBy, order = "asc" }) => {
  const client = getClient();

  // 獲取資料表的總行數，若格式錯誤、不正常的資料，則會拋出錯誤
  const countQuery = `SELECT COUNT(*) as total FROM ${table}`;
  const countResult = await client.exec(countQuery);
  if (!countResult || !countResult.length) {
    throw new Error(`無法獲取 ${table} 表的資料總數，可能是表名錯誤或表不存在`);
  }

  const totalRaw = countResult[0].total;
  const total = Number(totalRaw);
  if (!Number.isInteger(total) || total < 0) {
    throw new Error(`無法解析 ${table} 表的總行數為有效整數`);
  }

  // 計算偏移與下一頁
  if (page < 0) page = 0;
  const offset = page * limit;
  const totalPages = Math.ceil(total / limit);
  const nextPage = page + 1 < totalPages ? page + 1 : null;

  // 組成並執行 SQL 查詢語句
  let query = `SELECT * FROM ${table}`;
  if (orderBy) query += ` ORDER BY ${String(orderBy)} ${order.toUpperCase()}`;
  query += ` LIMIT ${limit} OFFSET ${offset}`;

  // 保證資料至少是 string 或 number 型別，若無法保證，則會拋出錯誤
  const rawRows = await client.exec(query);
  const rows: Row[] = rawRows.map(normalizeRow);

  return { table, rows, nextPage, totalPages, totalRows: total };
};

export { getRows };
export type { GetRowsParams, GetRowsResult };
