import { useQuery } from "@tanstack/react-query";
import { getDbBytes, getObjectsByTypes, getTotalRowCount } from "../data/read";
import type { SQLiteObjectType } from "../data/read";

const staleTime = 1 * 60 * 1000;

const useDbBytes = () => {
  return useQuery({
    queryKey: ["dbBytes"],
    queryFn: () => getDbBytes(),
    staleTime,
  });
};

const useObjects = ({ types }: { types: SQLiteObjectType[] }) => {
  return useQuery({
    queryKey: ["posts", ...types.toSorted()],
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

export { useDbBytes, useObjects, useRowCounts };
