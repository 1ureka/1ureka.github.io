import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRows, type GetRowsParams } from "@/datahub/data/select";
import { useMemo } from "react";
import { useTableControls } from "@/datahub/hooks/tableControl";
import type { TableControlParams } from "@/datahub/hooks/tableControl";

const staleTime = 1000 * 60 * 1;
const rowsPerPage = 7;

const useRows = (params: GetRowsParams | null) => {
  const queryClient = useQueryClient();

  const { data, isFetched } = useQuery({
    queryKey: ["getRows", params],
    queryFn: () => getRows(params!),
    staleTime,
    enabled: params !== null,
  });

  if (params !== null && params.page !== undefined) {
    const nextPageParams = { ...params, page: params.page + 1 };
    queryClient.prefetchQuery({
      queryKey: ["getRows", nextPageParams],
      queryFn: () => getRows(nextPageParams),
    });
  }

  return { isFetching: !isFetched, data };
};

const useTableRows = (params: TableControlParams) => {
  const { tableColumns, page, order, orderByIndex } = useTableControls(params);
  const { data, isFetching } = useRows({
    table: params.table,
    limit: rowsPerPage,
    page,
    orderBy: tableColumns[orderByIndex]?.name ?? undefined,
    order,
  });

  const rows = useMemo(() => {
    if (!data || isFetching) return null;

    return data.rows.map((row) => ({
      id: JSON.stringify(row),
      values: tableColumns.map((col) => ({ value: row[col.name], align: col.align })),
    }));
  }, [tableColumns, data, isFetching]);

  return { rows, colSpan: tableColumns.length + 1, isFetching };
};

export { useTableRows, rowsPerPage };
