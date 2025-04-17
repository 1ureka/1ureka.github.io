import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { useSearch } from "@/hooks/fuse";
import { useSearchQuery, useSearchTopic, type SearchTopic } from "./searchTopic";
import { ResultButton } from "./SearchResultsItem";

const LoadingDisplay = () => (
  <Box sx={{ display: "grid", placeItems: "center", py: 10 }}>
    <CircularProgress size={24} />
  </Box>
);

const databases = [
  { primary: "論壇資料庫", secondary: "來自論壇樣板", id: "forum" },
  { primary: "相簿資料庫", secondary: "來自相簿樣板", id: "photos" },
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

const SearchDatabases = ({ q }: { q: string }) => {
  const search = useSearch(databases, ["primary", "secondary"]);
  const results = useMemo(() => search(q), [search, q]);

  if (!results || results.length === 0) {
    return (
      <Box sx={{ display: "grid", placeItems: "center", flex: 1, p: 2 }}>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {getSearchPrompt("db", q)}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      {results.map(({ highlights }, i) => (
        <ResultButton
          key={i}
          variant="db"
          primary={highlights.primary}
          secondary={highlights.secondary}
          type="資料庫"
        />
      ))}
    </>
  );
};

const SearchResults = () => {
  const { searchTopic } = useSearchTopic();
  const { searchQuery } = useSearchQuery();

  return (
    <Stack sx={{ p: 1.5, flex: 1 }}>
      {searchTopic === "db" && <SearchDatabases q={searchQuery} />}
      {/* TODO */}
    </Stack>
  );
};

export { SearchResults };
