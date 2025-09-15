import { useQuery } from "@tanstack/react-query";
import { checkDateFormats, checkForeignKeyIntegrity, checkFreelistCount } from "../data/analysis";
import { useObjects, useTableInfo } from "./read";

const staleTime = 5 * 60 * 1000; // 5 minutes

export const useCheckTimeFormat = () => {
  const { data: tableInfo = [], isFetching: isFetchingTableInfo } = useTableInfo({ types: ["table"] });
  const { data, isFetching } = useQuery({
    queryKey: ["checkTimeFormat", tableInfo],
    queryFn: () => checkDateFormats(tableInfo),
    enabled: tableInfo.length > 0 && !isFetchingTableInfo,
    staleTime,
  });

  return { data, isFetching: isFetching || isFetchingTableInfo };
};

// 檢查外鍵完整性
export const useForeignKeyCheck = () => {
  const { data: tables = [], isFetching: isFetchingTables } = useObjects({ types: ["table"] });

  const { data, isFetching } = useQuery({
    queryKey: ["foreignKeyCheck", tables],
    queryFn: checkForeignKeyIntegrity,
    staleTime,
  });

  return { data, isFetching: isFetching || isFetchingTables, total: tables.length };
};

// 檢查 freelist 計數
export const useFreelistCheck = () => {
  return useQuery({
    queryKey: ["freelistCheck"],
    queryFn: checkFreelistCount,
    staleTime,
  });
};
