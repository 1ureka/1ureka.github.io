import { z } from "zod";
import { toggleSet } from "@/utils/array";
import { tryCatchSync } from "@/utils/tryCatch";
import { getRows } from "../data/select";

import { useUrl } from "@/hooks/url";
import { useCallback, useMemo } from "react";
import { useTableInfo } from "./read";
import { useCurrentTable } from "./tableSelect";
import { useQuery } from "@tanstack/react-query";

// ------------------------------------------------------
// data state
// ------------------------------------------------------

const staleTime = 1 * 60 * 1000;

const useColumns = (table: string | null) => {
  const { data, isFetching } = useTableInfo({ types: ["table", "view"] });

  const columns = useMemo(() => {
    if (!data || !table) return null;
    const result = data.find((item) => item.table === table);
    return result?.columns ?? null;
  }, [data, table]);

  return { columns, isFetching };
};

const useTotalRows = (table: string | null) => {
  const { data, isFetching } = useQuery({
    queryKey: ["getTotalRows", table],
    queryFn: () => getRows({ table: table!, limit: 1, page: 0 }),
    staleTime,
    enabled: table !== null,
  });

  return {
    totalPages: data?.totalPages ?? null,
    totalRows: data?.totalRows ?? null,
    isFetching,
  };
};

// ------------------------------------------------------
// url state
// ------------------------------------------------------

const IntegerArraySchema = z.array(z.number().int());

const useHiddenColumns = (cids: number[]) => {
  const { searchParams, updateSearchParams } = useUrl();

  const hiddenColumns = useMemo(() => {
    const value = searchParams.get("hiddenColumns") ?? null;
    if (!value) return [];

    const { data, error } = tryCatchSync(() => JSON.parse(value));
    if (error) return [];

    const result = IntegerArraySchema.safeParse(data);
    if (!result.success) return [];
    return Array.from(new Set(result.data));
  }, [searchParams]);

  const toggleAllColumns = useCallback(() => {
    const newHiddenColumns = hiddenColumns.length ? [] : [...cids];
    updateSearchParams({ hiddenColumns: JSON.stringify(newHiddenColumns) }, { skipTransition: true });
  }, [hiddenColumns, updateSearchParams, cids]);

  const createColumnToggler = useCallback(
    (cid: number) => () => {
      const newHiddenColumns = toggleSet(hiddenColumns, cid);
      updateSearchParams({ hiddenColumns: JSON.stringify(newHiddenColumns) }, { skipTransition: true });
    },
    [hiddenColumns, updateSearchParams]
  );

  return { hiddenColumns, toggleAllColumns, createColumnToggler };
};

const useOrder = (totalColumns: number) => {
  const { searchParams, updateSearchParams } = useUrl();

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

  const createOrderToggler = useCallback(
    (index: number) => () => {
      const newOrderBy = index;
      // 如果點擊的欄位是當前排序的欄位，則反轉排序順序，否則使用升序(預設)
      const newOrder = orderByIndex === newOrderBy && order === "asc" ? "desc" : "asc";
      updateSearchParams({ orderBy: newOrderBy.toString(), order: newOrder }, { skipTransition: true });
    },
    [orderByIndex, order, updateSearchParams]
  );

  return { orderByIndex, order, createOrderToggler };
};

const usePage = (totalPages: number) => {
  const { searchParams, updateSearchParams } = useUrl();

  const page = useMemo(() => {
    const value = searchParams.get("page") ?? null;
    if (!value) return 0;

    const parsedValue = parseInt(value, 10);
    if (!Number.isInteger(parsedValue)) return 0;
    if (parsedValue < 0 || parsedValue >= totalPages) return 0;

    return parsedValue;
  }, [searchParams, totalPages]);

  const handlePageChange = useCallback(
    (_: unknown, page: number) => {
      if (page < 0 || page >= totalPages) return;
      updateSearchParams({ page: page.toString() }, { skipTransition: true });
    },
    [updateSearchParams, totalPages]
  );

  return { page, handlePageChange };
};

// ------------------------------------------------------
// mix
// ------------------------------------------------------

export const useLoadTableControls = () => {
  const { selectedOption, isFetching: f1 } = useCurrentTable();
  const table = useMemo(() => selectedOption?.name ?? null, [selectedOption]);

  const { columns, isFetching: f2 } = useColumns(table);
  const { totalPages, totalRows, isFetching: f3 } = useTotalRows(table);

  const tableControlParams = useMemo(() => {
    if (!table || !columns || !totalPages || !totalRows) return null;

    return {
      table,
      columns,
      cids: columns.map((column) => column.cid),
      totalPages,
      totalRows,
    };
  }, [table, columns, totalPages, totalRows]);

  return { isFetching: f1 || f2 || f3, tableControlParams };
};

export type TableControlParams = NonNullable<ReturnType<typeof useLoadTableControls>["tableControlParams"]>;

export const useTableControls = (params: TableControlParams) => {
  // columns
  const { hiddenColumns, toggleAllColumns, createColumnToggler } = useHiddenColumns(params.cids);

  const columns = useMemo(() => {
    return params.columns.map((info) => ({ ...info, hidden: hiddenColumns.includes(info.cid) }));
  }, [params, hiddenColumns]);

  const selectableColumns = useMemo(() => {
    return columns.sort((a, b) => a.cid - b.cid);
  }, [columns]);

  const tableColumns = useMemo(() => {
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

  // order & page
  const { orderByIndex, order, createOrderToggler } = useOrder(tableColumns.length);
  const { page, handlePageChange } = usePage(params.totalPages);

  return {
    selectableColumns,
    tableColumns,
    toggleAllColumns,
    createColumnToggler,

    orderByIndex,
    order,
    createOrderToggler,

    page,
    totalPages: params.totalPages,
    totalRows: params.totalRows,
    handlePageChange,
  };
};
