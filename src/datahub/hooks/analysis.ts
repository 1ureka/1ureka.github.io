import { useQuery } from "@tanstack/react-query";
import { getAnalysisSummary, checkForeignKeyOnly } from "../data/analysis";
import type { AnalysisSummary } from "../data/analysis";

const staleTime = 5 * 60 * 1000; // 5 minutes

// 獲取完整的分析摘要
export const useAnalysisSummary = () => {
  return useQuery({
    queryKey: ["analysisSummary"],
    queryFn: getAnalysisSummary,
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