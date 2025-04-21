import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRows, type GetRowsParams } from "../data/select";
import { useTableColumns } from "./table";

const staleTime = 1 * 60 * 1000;

const useTableRows = (params: GetRowsParams) => {
  const { columnsForTable, isFetching: isFetchingColumns } = useTableColumns();
  const { data: rawData, isFetching: isFetchingRows } = useQuery({
    queryKey: ["getRows", params],
    queryFn: () => getRows(params),
    staleTime,
    enabled: columnsForTable !== null && columnsForTable.length > 0,
  });

  const isFetching = isFetchingRows || isFetchingColumns;

  const sortedRows = useMemo(() => {
    if (isFetching) return [];
    if (rawData === undefined || columnsForTable === null) return [];

    const orders = columnsForTable.map(({ name }) => name);

    const { rows } = rawData;
    const result: (string | number)[][] = rows.map((row) => {
      return orders.map((col) => {
        const value = row[col];
        if (value === null || value === undefined) return "";
        if (typeof value === "string" || typeof value === "number") return value;
        return String(value);
      });
    });

    return result;
  }, [isFetching, columnsForTable, rawData]);

  const metadata = useMemo(() => {
    if (isFetching) return null;
    if (rawData === undefined) return null;
    const { totalRows, totalPages } = rawData;
    return { totalRows, totalPages };
  }, [isFetching, rawData]);

  return { isFetching, rawData, sortedRows, metadata };
};

export { useTableRows };
