import { getClient } from "./client";
import { tryCatch } from "@/utils/tryCatch";
import type { SQLiteObjectType, TableColumnInfo, TableIndexInfo } from "./read";
import dayjs from "dayjs";

// --------------------------------------------------------
// SQLite 健康檢查與風險分析
// --------------------------------------------------------

export type RiskLevel = "serious" | "potential";

export type Issue = {
  id: string;
  table: string;
  type: "date_format" | "foreign_key" | "freelist" | "index_redundant" | "index_missing" | "performance";
  level: RiskLevel;
  title: string;
  description: string;
  count?: number;
  actions?: string[]; // TODO: 預留擴展空間
};

export type AnalysisSummary = {
  totalIssues: number;
  issuesByTable: { [table: string]: number };
  foreignKeyIntegrity: boolean;
  issues: Issue[];
};

// 檢查日期格式是否為完整 ISO 8601
const checkDateFormats = async (
  tables: string[],
  tableInfos: { table: string; columns: TableColumnInfo[] }[]
): Promise<Issue[]> => {
  const client = getClient();
  const issues: Issue[] = [];

  for (const tableName of tables) {
    const columns = tableInfos.find((info) => info.table === tableName)?.columns || [];
    for (const column of columns) {
      // 檢查可能包含日期的欄位
      const columnType = column.type.toLowerCase();
      if (!columnType.includes("date") && !columnType.includes("time") && !columnType.includes("timestamp")) {
        continue;
      }

      // 檢查該欄位的資料格式
      const { data: rows } = await tryCatch(
        client.exec(
          `SELECT "${column.name}" FROM "${tableName}" WHERE "${column.name}" IS NOT NULL LIMIT 100;`,
          undefined,
          true
        )
      );

      if (!rows) continue;

      let invalidCount = 0;
      for (const row of rows) {
        const value = row[column.name as string];
        if (typeof value === "string" && value.trim()) {
          // 檢查是否為完整的 ISO 8601 格式
          const date = dayjs(value);
          if (!date.isValid() || !value.includes("T") || !value.includes("Z")) {
            invalidCount++;
          }
        }
      }

      if (invalidCount > 0) {
        issues.push({
          id: `date_${tableName}_${column.name}`,
          table: tableName,
          type: "date_format",
          level: "serious",
          title: `日期格式不符合 ISO 8601`,
          description: `欄位 ${column.name} 有 ${invalidCount} 筆資料非完整 ISO 8601 格式`,
          count: invalidCount,
        });
      }
    }
  }

  return issues;
};

// 檢查外鍵完整性
const checkForeignKeyIntegrity = async (): Promise<{ isValid: boolean; issues: Issue[] }> => {
  const client = getClient();

  // 啟用外鍵檢查
  await client.exec("PRAGMA foreign_keys = ON;");

  const { data: violations } = await tryCatch(client.exec("PRAGMA foreign_key_check;"));

  const isValid = !violations || violations.length === 0;
  const issues: Issue[] = [];

  if (!isValid && violations) {
    const violationsByTable: { [table: string]: number } = {};

    violations.forEach((violation) => {
      const table = violation.table as string;
      violationsByTable[table] = (violationsByTable[table] || 0) + 1;
    });

    Object.entries(violationsByTable).forEach(([table, count]) => {
      issues.push({
        id: `fk_${table}`,
        table,
        type: "foreign_key",
        level: "serious",
        title: "外鍵完整性錯誤",
        description: `${count} 筆資料違反外鍵約束`,
        count,
      });
    });
  }

  return { isValid, issues };
};

// 檢查 freelist 計數
const checkFreelistCount = async (): Promise<Issue[]> => {
  const client = getClient();
  const issues: Issue[] = [];

  const { data: freelistResult } = await tryCatch(client.exec("PRAGMA freelist_count;"));

  if (freelistResult && freelistResult.length > 0) {
    const freelistCount = Number((freelistResult[0] as { freelist_count?: number }).freelist_count || 0);

    if (freelistCount > 100) {
      issues.push({
        id: "freelist_high",
        table: "database",
        type: "freelist",
        level: "potential",
        title: "可回收空間過多",
        description: `有 ${freelistCount} 個可回收頁面，建議執行 VACUUM 清理`,
        count: freelistCount,
      });
    }
  }

  return issues;
};

// 檢查索引健康狀況
const checkIndexHealth = async (
  tables: string[],
  rowCounts: { [table: string]: number },
  tableIndexes: { table: string; indexes: TableIndexInfo[] }[]
): Promise<Issue[]> => {
  const issues: Issue[] = [];

  for (const tableName of tables) {
    const indexes = tableIndexes.find((info) => info.table === tableName)?.indexes || [];
    const rowCount = rowCounts[tableName] || 0;

    if (rowCount > 1000 && (!indexes || indexes.length === 0)) {
      issues.push({
        id: `index_missing_${tableName}`,
        table: tableName,
        type: "index_missing",
        level: "potential",
        title: "可能需要索引優化",
        description: `表格有 ${rowCount} 筆資料但沒有索引，可能影響查詢效能`,
        count: rowCount,
      });
    }
  }

  return issues;
};

// 獲取完整的分析摘要
export const getAnalysisSummary = async (data: {
  tables: { name: string; type: SQLiteObjectType }[];
  tableInfos: { table: string; columns: TableColumnInfo[] }[];
  rowCounts: { [table: string]: number };
  indexes: { table: string; indexes: TableIndexInfo[] }[];
}): Promise<AnalysisSummary> => {
  const [dateIssues, foreignKeyResult, freelistIssues, indexIssues] = await Promise.all([
    checkDateFormats(
      data.tables.map((table) => table.name),
      data.tableInfos
    ),
    checkForeignKeyIntegrity(),
    checkFreelistCount(),
    checkIndexHealth(
      data.tables.map((table) => table.name),
      data.rowCounts,
      data.indexes
    ),
  ]);

  const allIssues = [...dateIssues, ...foreignKeyResult.issues, ...freelistIssues, ...indexIssues];

  // 按表格統計問題數量
  const issuesByTable: { [table: string]: number } = {};
  allIssues.forEach((issue) => {
    issuesByTable[issue.table] = (issuesByTable[issue.table] || 0) + 1;
  });

  return {
    totalIssues: allIssues.length,
    issuesByTable,
    foreignKeyIntegrity: foreignKeyResult.isValid,
    issues: allIssues,
  };
};

// 僅檢查外鍵完整性 (用於 stat block)
export const checkForeignKeyOnly = async (): Promise<boolean> => {
  const result = await checkForeignKeyIntegrity();
  return result.isValid;
};
