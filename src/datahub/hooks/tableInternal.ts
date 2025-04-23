import { useMemo } from "react";
import { useObjects, useTableInfo } from "./read";
import { useUrl } from "@/hooks/url";
import { useQuery } from "@tanstack/react-query";

import { z } from "zod";
import { tryCatchSync } from "@/utils/tryCatch";
import { getRows, type GetRowsParams } from "../data/select";

const useTableOptions = () => {
  const { data: options, isFetching } = useObjects({ types: ["table", "view"] });
  const { searchParams } = useUrl();

  const selectedOption = useMemo(() => {
    if (!options) return null;

    const selectedName = searchParams.get("table");
    const selectedOption = options.find((option) => option.name === selectedName) ?? options[0];

    return selectedOption;
  }, [options, searchParams]);

  return { options, selectedOption, isFetching };
};

const IntegerArraySchema = z.array(z.number().int());

const useHiddenColumns = () => {
  const { searchParams } = useUrl();

  const hiddenColumns = useMemo(() => {
    const value = searchParams.get("hiddenColumns") ?? null;
    if (!value) return [];

    const { data, error } = tryCatchSync(() => JSON.parse(value));
    if (error) return [];

    const result = IntegerArraySchema.safeParse(data);
    if (!result.success) return [];
    return Array.from(new Set(result.data));
  }, [searchParams]);

  return hiddenColumns;
};

const useColumns = () => {
  const hiddenColumnCids = useHiddenColumns();
  const { selectedOption, isFetching: f1 } = useTableOptions();
  const { data: tableInfo, isFetching: f2 } = useTableInfo({ types: ["table", "view"] });
  const isFetching = f1 || f2 || !tableInfo || !selectedOption;

  const columns = useMemo(() => {
    if (!tableInfo || !selectedOption) return null;

    const table = tableInfo.find(({ table }) => table === selectedOption.name);
    if (!table) return null;

    const { columns: rawColumns } = table;
    return rawColumns.map((info) => ({ ...info, hidden: hiddenColumnCids.includes(info.cid) }));
  }, [tableInfo, selectedOption, hiddenColumnCids]);

  return { columns, isFetching };
};

const useSortedColumns = () => {
  const { columns, isFetching } = useColumns();

  const sortedColumns = useMemo(() => {
    if (!columns) return null;

    const filtered = columns.filter((column) => !column.hidden);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = filtered.map(({ hidden, ...column }) => {
      const isPk = column.pk >= 1;
      const align = (column.type !== "text" && !isPk ? "right" : "left") as "left" | "right";
      return { ...column, align };
    });

    return result.toSorted((a, b) => {
      if (a.pk !== b.pk) return b.pk - a.pk;
      if (a.type === "text" && b.type !== "text") return -1;
      if (a.type !== "text" && b.type === "text") return 1;
      return a.cid - b.cid;
    });
  }, [columns]);

  return { sortedColumns, isFetching };
};

const useOrder = (totalColumns: number) => {
  const { searchParams } = useUrl();

  const orderByIndex = useMemo(() => {
    const value = searchParams.get("orderBy") ?? null;
    if (!value) return 0;

    const parsedValue = parseInt(value, 10);
    if (!Number.isInteger(parsedValue)) return 0;
    if (parsedValue < 0 || parsedValue >= totalColumns) return 0;

    return parsedValue;
  }, [searchParams, totalColumns]);

  const order: "asc" | "desc" = useMemo(() => {
    const value = searchParams.get("order") ?? null;
    if (!value) return "asc";
    if (["asc", "desc"].includes(value)) return value as "asc" | "desc";
    return "asc";
  }, [searchParams]);

  return { orderByIndex, order };
};

const staleTime = 1 * 60 * 1000;

const useTotal = () => {
  const { selectedOption, isFetching: f1 } = useTableOptions();

  const { data, isFetching: f2 } = useQuery({
    queryKey: ["getTotalRows", selectedOption],
    queryFn: () => getRows({ table: selectedOption!.name, limit: 1, page: 0 }),
    staleTime,
    enabled: selectedOption !== null,
  });

  const { totalPages, totalRows } = useMemo(() => {
    return { totalPages: data?.totalPages ?? null, totalRows: data?.totalRows ?? null };
  }, [data]);

  const isFetching = f1 || f2;

  return { totalPages, totalRows, isFetching };
};

const usePage = (totalPages: number) => {
  const { searchParams } = useUrl();

  const page = useMemo(() => {
    const value = searchParams.get("page") ?? null;
    if (!value) return 0;

    const parsedValue = parseInt(value, 10);
    if (!Number.isInteger(parsedValue)) return 0;
    if (parsedValue < 0 || parsedValue >= totalPages) return 0;

    return parsedValue;
  }, [searchParams, totalPages]);

  return page;
};

const useRows = (params: GetRowsParams) => {
  const { data, isFetching } = useQuery({
    queryKey: ["getRows", params],
    queryFn: () => getRows(params),
    staleTime,
  });

  return { isFetching, data };
};

export { useTableOptions, useHiddenColumns, useColumns, useSortedColumns, useOrder, useTotal, usePage, useRows };
