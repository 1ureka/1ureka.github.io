import { useUrl } from "@/hooks/url";
import { useMemo } from "react";
import { useSearch } from "@/hooks/fuse";
import { useAllColumns, useObjects, useRowCounts } from "@/datahub/hooks/read";

// ------------------------------------------------------
// Url 狀態
// ------------------------------------------------------

export type SearchTopic = "db" | "table" | "column";
export const isSearchTopic = (value: string): value is SearchTopic => {
  return ["db", "table", "column"].includes(value);
};

export const useSearchTopic = () => {
  const { searchParams, updateSearchParams } = useUrl();
  const raw = searchParams.get("searchTopic") ?? "db";
  const searchTopic = isSearchTopic(raw) ? raw : "db";

  return { searchTopic, updateSearchParams };
};

export const useSearchQuery = () => {
  const { searchParams, updateSearchParams } = useUrl();
  const searchQuery = searchParams.get("searchQuery") ?? "";

  const handleQueryChange = (value: string) => {
    if (value === searchQuery) return;
    if (value.length > 99) return;
    updateSearchParams({ searchQuery: value }, { skipTransition: true });
  };

  return { searchQuery, handleQueryChange };
};

// ------------------------------------------------------
// 搜尋
// ------------------------------------------------------

const databases = [
  { primary: "論壇資料庫", secondary: "來自論壇樣板", id: "forum", type: "資料庫" },
  { primary: "相簿資料庫", secondary: "來自相簿樣板", id: "photos", type: "資料庫" },
];

const useSearchDatabases = (q: string) => {
  const search = useSearch(databases, ["primary", "secondary"]);
  const results = useMemo(() => search(q), [search, q]);

  return { results, isFetching: false };
};

const useSearchTables = (q: string) => {
  const { data: objects, isFetching: isFetchingObjects } = useObjects({ types: ["table", "view"] });
  const { data: rowCounts, isFetching: isFetchingRowCounts } = useRowCounts({ types: ["table", "view"] });
  const isFetching = isFetchingObjects || isFetchingRowCounts;

  const tables = useMemo(() => {
    if (!rowCounts || !objects) return [];

    return objects.map(({ name, type }) => {
      const count = rowCounts[name] || 0;
      return {
        id: name,
        primary: name,
        secondary: `該${{ table: "資料", view: "檢視" }[type as string]}表有 ${count} 筆紀錄`,
        type,
      };
    });
  }, [rowCounts, objects]);

  const search = useSearch(tables, ["primary", "secondary"]);
  const results = useMemo(() => search(q), [search, q]);

  return { results, isFetching };
};

const useSearchColumns = (q: string) => {
  const { data, isFetching } = useAllColumns();

  const columns = useMemo(() => {
    if (!data || data.length <= 0) return [];

    return data.map(({ id, name, type, from }) => {
      return {
        id,
        primary: name,
        secondary: `來自${{ table: "資料", view: "檢視" }[from.type]}表 "${from.table}"`,
        type,
      };
    });
  }, [data]);

  const search = useSearch(columns, ["primary", "secondary"]);
  const results = useMemo(() => search(q), [search, q]);

  return { results, isFetching };
};

export { useSearchDatabases, useSearchTables, useSearchColumns };
