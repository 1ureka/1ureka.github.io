import { getClient } from "./client";
import { tryCatch } from "@/utils/tryCatch";
import type { TableColumnInfo } from "./read";

// --------------------------------------------------------
// SQLite 健康檢查與風險分析
// --------------------------------------------------------

type Issue = {
  id: string;
  type: "date_format" | "foreign_key" | "freelist";
  table: string;
  column?: string;
  count: number | string; // 比如 "99+"
};

// 100 有可能真的是 100 或 100 以上，所以記得要標註為 "99+"
const checkSingleColumnDateFormat = async (table: string, column: TableColumnInfo): Promise<number> => {
  const client = getClient();
  const { data: invalidRows } = await tryCatch(
    client.exec(
      `
          SELECT "${column.name}"
          FROM "${table}"
          WHERE "${column.name}" IS NOT NULL
            AND "${column.name}" NOT GLOB '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]T[0-9][0-9]:[0-9][0-9]:[0-9][0-9].[0-9][0-9][0-9]Z'
          LIMIT 100;
          `
    )
  );

  return invalidRows ? invalidRows.length : 0;
};

// 檢查日期格式是否為完整 ISO 8601
export const checkDateFormats = async (
  tableInfos: { table: string; columns: TableColumnInfo[] }[]
): Promise<Issue[]> => {
  const issues: Issue[] = [];

  await Promise.all(
    tableInfos.map(async (tableInfo) => {
      const { table, columns } = tableInfo;

      const dateColumns = columns.filter((col) => {
        const colType = col.type.toLowerCase();
        return colType.includes("date") || colType.includes("time") || colType.includes("timestamp");
      });

      await Promise.all(
        dateColumns.map(async (column) => {
          const invalidCount = await checkSingleColumnDateFormat(table, column);
          const id = `date_${table}_${column.name}`;
          if (invalidCount > 0)
            issues.push({
              id,
              table,
              type: "date_format",
              column: column.name,
              count: invalidCount > 99 ? "99+" : invalidCount,
            });
        })
      );
    })
  );

  return issues.toSorted((a, b) => {
    const numA = typeof a.count === "number" ? a.count : 100;
    const numB = typeof b.count === "number" ? b.count : 100;

    if (numA !== numB) return numB - numA; // 數字大的排前面
    return a.table.localeCompare(b.table);
  });
};

// 檢查外鍵完整性
export const checkForeignKeyIntegrity = async (): Promise<Issue[]> => {
  const client = getClient();

  await client.exec("PRAGMA foreign_keys = ON;");
  const { data: violations } = await tryCatch(client.exec("PRAGMA foreign_key_check;"));
  const issues: Issue[] = [];

  if (violations && violations.length > 0) {
    const violationsByTable: { [table: string]: number } = {};

    violations.forEach((violation) => {
      const table = violation.table as string;
      violationsByTable[table] = (violationsByTable[table] || 0) + 1;
    });

    Object.entries(violationsByTable).forEach(([table, count]) => {
      issues.push({ id: `fk_${table}`, table, type: "foreign_key", count });
    });
  }

  return issues;
};

// 檢查 freelist 計數
export const checkFreelistCount = async (): Promise<number> => {
  const client = getClient();

  const { data: freelistResult } = await tryCatch(client.exec("PRAGMA freelist_count;"));
  if (freelistResult && freelistResult.length > 0) {
    const freelistCount = Number((freelistResult[0] as { freelist_count?: number }).freelist_count || 0);
    return freelistCount;
  }

  return 0;
};
