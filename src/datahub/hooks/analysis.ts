import { useQuery } from "@tanstack/react-query";
import { checkDateFormats, checkForeignKeyIntegrity, checkFreelistCount } from "../data/analysis";
import { useTableInfo } from "./read";

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
  return useQuery({
    queryKey: ["foreignKeyCheck"],
    queryFn: checkForeignKeyIntegrity,
    staleTime,
  });
};

// 檢查 freelist 計數
export const useFreelistCheck = () => {
  return useQuery({
    queryKey: ["freelistCheck"],
    queryFn: checkFreelistCount,
    staleTime,
  });
};
