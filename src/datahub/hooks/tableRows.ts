import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSort } from "./table";

import { getRows } from "../data/select";
import type { GetRowsResult } from "../data/select";
import type { TableColumnInfo } from "../data/read";

const staleTime = 1 * 60 * 1000;

type Columns = (TableColumnInfo & { align: "left" | "right" })[];
type SortedRows = { column: string; value: string | number; align: "left" | "right" }[][];

const useTableRows = ({ table, columns }: { table: string; columns: Columns }) => {
  const { orderBy: orderByIndex, order } = useSort(columns.length);
  const orderBy = columns[orderByIndex].name;

  const params = { table, order, orderBy };
  const { data, isFetched } = useQuery({
    queryKey: ["getRows", params],
    queryFn: () => getRows(params),
    staleTime,
    enabled: columns.length > 0,
  });

  return { isFetching: !isFetched, data };
};

const useTableRowsByColumns = ({ rows, columns }: { rows: GetRowsResult["rows"] | null; columns: Columns }) => {
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
