import { useUrl } from "@/hooks/url";
import { useOrder, usePage, useRows, useTableOptions, useTotal } from "./tableInternal";
import { useColumns, useHiddenColumns, useSortedColumns } from "./tableInternal";
import { useCallback, useMemo } from "react";
import { toggleSet } from "@/utils/array";

const useTableSelect = () => {
  const { updateSearchParams } = useUrl();
  const { options, selectedOption, isFetching } = useTableOptions();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!options) return;
    const { name } = options.find((option) => option.name === e.target.value) ?? options[0];
    updateSearchParams({ table: name, hiddenColumns: null, orderBy: null, order: null, page: null });
  };

  return { options, selectedOption, handleChange, isFetching };
};

const useColumnSelect = () => {
  const { updateSearchParams } = useUrl();
  const hiddenColumns = useHiddenColumns();

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

  const { columns, isFetching } = useColumns();

  const options = useMemo(() => {
    if (isFetching || !columns) return null;
    return columns.sort((a, b) => a.cid - b.cid);
  }, [columns, isFetching]);

  const allChecked = useMemo(() => {
    if (!options) return true;
    return options.every((col) => !col.hidden);
  }, [options]);

  const allUnchecked = useMemo(() => {
    if (!options) return false;
    return options.every((col) => col.hidden);
  }, [options]);

  return { isFetching, options, allChecked, allUnchecked, createToggleAllColumns, createToggleHandler };
};

// ------------------------------------------------------------------------------

const useTable = () => {
  const { selectedOption, isFetching: f1 } = useTableOptions();
  const { sortedColumns, isFetching: f2 } = useSortedColumns();
  const isFetching = f1 || f2;

  return { table: selectedOption?.name ?? null, columns: sortedColumns, isFetching };
};

type TableColumns = NonNullable<ReturnType<typeof useTable>["columns"]>;

const useTableHead = (columns: TableColumns) => {
  const { updateSearchParams } = useUrl();
  const { orderByIndex, order } = useOrder(columns.length);

  const createToggleHandler = useCallback(
    (index: number) => () => {
      const newOrderBy = index;
      // 如果點擊的欄位是當前排序的欄位，則反轉排序順序，否則使用升序(預設)
      const newOrder = orderByIndex === newOrderBy && order === "asc" ? "desc" : "asc";
      updateSearchParams({ orderBy: newOrderBy.toString(), order: newOrder }, { skipTransition: true });
    },
    [orderByIndex, order, updateSearchParams]
  );

  return { orderByIndex, order, createToggleHandler };
};

const useTableFoot = () => {
  const { updateSearchParams } = useUrl();
  const { totalPages, totalRows, isFetching } = useTotal();
  const page = usePage(totalPages ?? 0);

  const handlePageChange = (_: React.MouseEvent | null, page: number) => {
    updateSearchParams({ page: page.toString() }, { skipTransition: true });
  };

  return { handlePageChange, page, totalRows, isFetching };
};

type SortedRows = { value: string | number; align: "left" | "right" }[][];

const useTableRows = (table: string, columns: TableColumns) => {
  const { totalPages, isFetching: f1 } = useTotal();
  const page = usePage(totalPages ?? 0);

  const { orderByIndex, order } = useOrder(columns.length);
  const orderBy = columns[orderByIndex]?.name;

  const params = { table, order, orderBy, page, limit: rowsPerPage };
  const { data, isFetching: f2 } = useRows(params);

  const isFetching = f1 || f2;

  const sortedRows = useMemo(() => {
    if (!data) return null;

    const orders = columns.map(({ name }) => name);
    const result: SortedRows = data.rows.map((row) =>
      orders.map((col, i) => ({ value: row[col], align: columns[i].align }))
    );

    return result;
  }, [columns, data]);

  return { sortedRows, isFetching };
};

// --------------------------------------------------------------------

const useSelectActions = useTotal;

const rowsPerPage = 7;
export { rowsPerPage };
export { useTableSelect, useColumnSelect, useSelectActions };
export { useTable, useTableHead, useTableFoot, useTableRows };
export type { TableColumns };
