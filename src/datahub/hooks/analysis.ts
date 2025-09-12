import { useQuery } from "@tanstack/react-query";
import { getAnalysisSummary, checkForeignKeyOnly } from "../data/analysis";
import { useObjects, useTableInfo, useRowCounts, useIndexes } from "./read";
import type { AnalysisSummary } from "../data/analysis";

const staleTime = 5 * 60 * 1000; // 5 minutes

// 獲取完整的分析摘要
export const useAnalysisSummary = () => {
  const { data: tables = [] } = useObjects({ types: ["table"] });
  const { data: tableInfos = [] } = useTableInfo({ types: ["table"] });
  const { data: rowCounts = {} } = useRowCounts({ types: ["table"] });
  const { data: indexes = [] } = useIndexes({ types: ["table"] });

  return useQuery({
    queryKey: ["analysisSummary", tables, tableInfos, rowCounts, indexes],
    queryFn: async () => getAnalysisSummary({ tables, tableInfos, rowCounts, indexes }),
    enabled: tables.length > 0 && tableInfos.length > 0, // 確保有基本資料才執行
    staleTime,
  });
};

// 僅檢查外鍵完整性 (用於 stat block)
export const useForeignKeyCheck = () => {
  return useQuery({
    queryKey: ["foreignKeyCheck"],
    queryFn: checkForeignKeyOnly,
    staleTime,
  });
};

export type { AnalysisSummary };
