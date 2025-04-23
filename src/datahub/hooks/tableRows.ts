import { useUrl } from "@/hooks/url";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSort } from "./table";

import { getRows } from "../data/select";
import type { GetRowsResult } from "../data/select";
import type { TableColumnInfo } from "../data/read";

const useTablePage = ({ totalPages }: { totalPages: number }) => {
  const { searchParams, updateSearchParams } = useUrl();

  const page = useMemo(() => {
    const value = searchParams.get("page") ?? null;
    if (!value) return 0;

    const parsedValue = parseInt(value, 10);
    if (!Number.isInteger(parsedValue)) return 0;
    if (parsedValue < 0 || parsedValue >= totalPages) return 0;

    return parsedValue;
  }, [searchParams, totalPages]);

  const handlePageChange = (_: React.MouseEvent | null, page: number) => {
    updateSearchParams({ page: page.toString() }, { skipTransition: true });
  };

  return { page, handlePageChange };
};

const staleTime = 1 * 60 * 1000;

type Columns = (TableColumnInfo & { align: "left" | "right" })[];
type SortedRows = { column: string; value: string | number; align: "left" | "right" }[][];

const useTableRows = ({ table, columns }: { table: string; columns: Columns }) => {
  const [totalPages, setTotalPages] = useState(0);
  const { page, handlePageChange } = useTablePage({ totalPages });
  const { orderBy: orderByIndex, order } = useSort(columns.length);
  const orderBy = columns[orderByIndex].name;

  const params = { table, order, orderBy, page };
  const { data, isFetched } = useQuery({
    queryKey: ["getRows", params],
    queryFn: () => getRows(params),
    staleTime,
    enabled: columns.length > 0,
  });

  useEffect(() => {
    if (data) setTotalPages(data.totalPages);
  }, [data]);

  return { isFetching: !isFetched, data, page, handlePageChange };
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

export { useTableRows, useTableRowsByColumns, useTablePage };
