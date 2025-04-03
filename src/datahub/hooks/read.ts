import { useQuery } from "@tanstack/react-query";
import { getDbBytes, getObjectsByTypes, getTableInfo, getTotalRowCount } from "../data/read";
import type { SQLiteObjectType } from "../data/read";

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
    queryKey: ["objects", ...types.toSorted()],
    queryFn: () => getObjectsByTypes(types),
    staleTime,
  });
};

const useRowCounts = ({ types }: { types: Exclude<SQLiteObjectType, "index" | "trigger">[] }) => {
  return useQuery({
    queryKey: ["rowCounts", ...types.toSorted()],
    queryFn: () => getTotalRowCount(types),
    staleTime,
  });
};

const useTableInfo = ({ types }: { types: Exclude<SQLiteObjectType, "index" | "trigger">[] }) => {
  const { data: objects = [], isFetching: isFetchingObjects } = useObjects({ types });
  const { data, isFetching: isFetchingTableInfos } = useQuery({
    queryKey: ["tableInfos", ...objects.map((obj) => obj.name)],
    queryFn: async () =>
      (await Promise.all(objects.map(({ name }) => getTableInfo(name)))).filter((info) => info !== null),
    enabled: objects.length > 0,
    staleTime,
  });

  return { data, isFetching: isFetchingObjects || isFetchingTableInfos };
};

export { useDbBytes, useObjects, useRowCounts, useTableInfo };
