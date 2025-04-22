import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRows, type GetRowsResult, type GetRowsParams } from "../data/select";
import type { useTableColumns } from "./table";

const staleTime = 1 * 60 * 1000;

type UseRowsParams = { params: GetRowsParams; columns: Columns };

const useTableRows = ({ params, columns }: UseRowsParams) => {
  const { data, isFetched } = useQuery({
    queryKey: ["getRows", params],
    queryFn: () => getRows(params),
    staleTime,
    enabled: columns.length > 0,
  });

  return { isFetching: !isFetched, data };
};

type Rows = GetRowsResult["rows"];
type Columns = Exclude<ReturnType<typeof useTableColumns>["columnsForTable"], null>;
type SortedRows = { column: string; value: string | number; align: "left" | "right" }[][];

const useTableRowsByColumns = ({ rows, columns }: { rows: Rows | null; columns: Columns }) => {
  const sortedRows = useMemo(() => {
    if (!rows) return [];

    const orders = columns.map(({ name }) => name);
    const result: SortedRows = rows.map((row) =>
      orders.map((col, i) => ({ column: col, value: row[col], align: columns[i].align }))
    );

    return result;
  }, [columns, rows]);

  return { sortedRows };
};

export { useTableRows, useTableRowsByColumns };
