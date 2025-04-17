import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { ResultButton } from "./SearchResultsItem";

import { useMemo } from "react";
import { useSearch } from "@/hooks/fuse";
import { useSearchQuery, useSearchTopic, type SearchTopic } from "./searchTopic";
import { useAllColumns, useObjects, useRowCounts } from "@/datahub/hooks/read";

const LoadingDisplay = () => (
  <Box sx={{ display: "grid", placeItems: "center", flex: 1, p: 2 }}>
    <CircularProgress size={24} />
  </Box>
);

// 靜態資源
const databases = [
  { primary: "論壇資料庫", secondary: "來自論壇樣板", id: "forum", type: "資料庫" },
  { primary: "相簿資料庫", secondary: "來自相簿樣板", id: "photos", type: "資料庫" },
];

const getSearchPrompt = (searchTopic: SearchTopic, input?: string) => {
  const map: Record<SearchTopic, { label: string; example: string }> = {
    db: { label: "資料庫", example: "論壇" },
    table: { label: "資料表", example: "users, posts" },
    column: { label: "資料欄位", example: "email, createdAt" },
  };

  if (!input) return `輸入關鍵字以搜尋${map[searchTopic].label}，例如「${map[searchTopic].example}」`;

  return `找不到符合的${map[searchTopic].label}：${input}
    請確認拼字是否正確，或嘗試其他關鍵字。`;
};

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

const createSearchResults = (type: SearchTopic) => {
  const useResults = type === "db" ? useSearchDatabases : type === "table" ? useSearchTables : useSearchColumns;

  return ({ q }: { q: string }) => {
    const { results, isFetching } = useResults(q);

    if (isFetching) {
      return <LoadingDisplay />;
    }

    if (!results || results.length === 0) {
      return (
        <Box sx={{ display: "grid", placeItems: "center", flex: 1, p: 2 }}>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            {getSearchPrompt(type, q)}
          </Typography>
        </Box>
      );
    }

    return (
      <>
        {results.map(({ item, highlights }) => (
          <ResultButton
            key={item.id}
            variant={type}
            primary={highlights.primary}
            secondary={highlights.secondary}
            type={item.type}
          />
        ))}
      </>
    );
  };
};

const SearchDatabases = createSearchResults("db");
const SearchObjects = createSearchResults("table");
const SearchColumns = createSearchResults("column");

const SearchResults = () => {
  const { searchTopic } = useSearchTopic();
  const { searchQuery } = useSearchQuery();

  return (
    <Stack sx={{ p: 1.5, flex: 1 }}>
      {searchTopic === "db" && <SearchDatabases q={searchQuery} />}
      {searchTopic === "table" && <SearchObjects q={searchQuery} />}
      {searchTopic === "column" && <SearchColumns q={searchQuery} />}
    </Stack>
  );
};

export { SearchResults };
