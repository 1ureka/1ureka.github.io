import { useCallback, useEffect, useMemo, useState } from "react";
import { useObjects, useTableInfo } from "./read";
import { useUrl } from "@/hooks/url";

import { tryCatchSync } from "@/utils/tryCatch";
import { toggleSet } from "@/utils/array";
import { z } from "zod";

const IntegerArraySchema = z.array(z.number().int());

/**
 * 給 TableSelect(提供狀態與函數) 與 useTableColumns(提供狀態) 使用
 */
const useSelectedTable = () => {
  const { data, isFetching } = useObjects({ types: ["table", "view"] });
  const { searchParams, updateSearchParams } = useUrl();
  const value = searchParams.get("table") ?? null;

  const findIndexByName = useCallback(
    (value: string) => {
      if (!data) return 0;
      const index = data.findIndex(({ name }) => name === value);
      return index !== -1 ? index : 0;
    },
    [data]
  );

  const [index, setIndex] = useState<number>(0);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!data) return;
    updateSearchParams({
      table: data[findIndexByName(event.target.value)].name,
      hiddenColumns: null,
      orderBy: null,
      order: null,
    });
  };

  // 載入data完成後的初始化 + 之後路由更動時的更新
  useEffect(() => {
    if (!data) return;
    setIndex(findIndexByName(value ?? data[0].name));
  }, [value, data, findIndexByName]);

  return { data, selected: data && data.length > 0 ? data[index] : null, handleChange, isFetching };
};

/**
 * 給 ColumnSelect(提供函數) 與 useTableColumns(提供狀態) 使用
 */
const useHiddenColumns = () => {
  const { searchParams, updateSearchParams } = useUrl();
  const value = searchParams.get("hiddenColumns") ?? null;

  const hiddenColumns = useMemo(() => {
    if (!value) return [];

    const { data, error } = tryCatchSync(() => JSON.parse(value));
    if (error) return [];

    const result = IntegerArraySchema.safeParse(data);
    if (!result.success) return [];
    return Array.from(new Set(result.data));
  }, [value]);

  const createToggleAllColumns = useCallback(
    (length: number) => () => {
      const newHiddenColumns = hiddenColumns.length ? [] : Array.from({ length }, (_, i) => i);
      updateSearchParams({ hiddenColumns: JSON.stringify(newHiddenColumns) }, { skipTransition: true });
    },
    [hiddenColumns, updateSearchParams]
  );

  const createToggleHandler = useCallback(
    (cid: number) => () => {
      const newHiddenColumns = toggleSet(hiddenColumns, cid);
      updateSearchParams({ hiddenColumns: JSON.stringify(newHiddenColumns) }, { skipTransition: true });
    },
    [hiddenColumns, updateSearchParams]
  );

  return { hiddenColumns, createToggleAllColumns, createToggleHandler };
};

/**
 * 給 ColumnSelect(提供狀態) 與 TableHeader(提供狀態) 與 useTableRows(提供狀態) 使用
 */
const useTableColumns = () => {
  const { selected: selectedTable, isFetching: isFetchingObj } = useSelectedTable();
  const { data: tableInfo, isFetching: isFetchingInfo } = useTableInfo({ types: ["table", "view"] });
  const isFetching = isFetchingInfo || !tableInfo || isFetchingObj || !selectedTable;

  const { hiddenColumns } = useHiddenColumns();

  const columnsForSelect = useMemo(() => {
    if (!tableInfo || !selectedTable) return null;

    const table = tableInfo.find(({ table }) => table === selectedTable.name);
    if (!table) return null;

    const { columns: rawColumns } = table;
    const columns = rawColumns.map((info) => ({ ...info, hidden: hiddenColumns.includes(info.cid) }));

    return columns.toSorted((a, b) => a.cid - b.cid);
  }, [tableInfo, selectedTable, hiddenColumns]);

  const columnsForTable = useMemo(() => {
    if (!columnsForSelect) return null;

    const filtered = columnsForSelect.filter((column) => !column.hidden);
    return filtered.toSorted((a, b) => {
      if (a.pk !== b.pk) return b.pk - a.pk;
      if (a.type === "text" && b.type !== "text") return -1;
      if (a.type !== "text" && b.type === "text") return 1;
      return a.cid - b.cid;
    });
  }, [columnsForSelect]);

  return { isFetching, selectedTable, columnsForSelect, columnsForTable };
};

/**
 * 給 TableHeader(提供函數狀態) 使用
 */
const useSort = (length: number | null) => {
  const { searchParams, updateSearchParams } = useUrl();

  const orderBy = useMemo(() => {
    if (!length) return 0; // length可能還在loading中

    const value = searchParams.get("orderBy") ?? null;
    if (!value) return 0;

    const parsedValue = parseInt(value, 10);
    if (!Number.isInteger(parsedValue)) return 0;
    if (parsedValue < 0 || parsedValue >= length) return 0;

    return parsedValue;
  }, [searchParams, length]);

  const order: "asc" | "desc" = useMemo(() => {
    const value = searchParams.get("order") ?? null;
    if (!value) return "asc";
    if (["asc", "desc"].includes(value)) return value as "asc" | "desc";
    return "asc";
  }, [searchParams]);

  const createToggleHandler = useCallback(
    (index: number) => () => {
      const newOrderBy = index;
      // 如果點擊的欄位是當前排序的欄位，則反轉排序順序，否則使用升序(預設)
      const newOrder = orderBy === index && order === "asc" ? "desc" : "asc";
      updateSearchParams({ orderBy: newOrderBy.toString(), order: newOrder }, { skipTransition: true });
    },
    [orderBy, order, updateSearchParams]
  );

  return { orderBy, order, createToggleHandler };
};

export { useSelectedTable, useHiddenColumns, useTableColumns, useSort };
