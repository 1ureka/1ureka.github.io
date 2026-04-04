import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { ResultButton } from "./SearchResultsItem";
import { useSearchQuery, useSearchTopic, type SearchTopic } from "@/datahub/hooks/search";
import { useSearchTables, useSearchColumns } from "@/datahub/hooks/search";

const LoadingDisplay = () => (
  <Box sx={{ display: "grid", placeItems: "center", flex: 1, p: 2 }}>
    <CircularProgress size={24} />
  </Box>
);

const getSearchPrompt = (searchTopic: SearchTopic, input?: string) => {
  const map: Record<SearchTopic, { label: string; example: string }> = {
    table: { label: "資料表", example: "users, posts" },
    column: { label: "資料欄位", example: "email, createdAt" },
  };

  if (!input) return `輸入關鍵字以搜尋${map[searchTopic].label}，例如「${map[searchTopic].example}」`;

  return `找不到符合的${map[searchTopic].label}：${input}
    請確認拼字是否正確，或嘗試其他關鍵字。`;
};

const createSearchResults = (type: SearchTopic) => {
  const useResults = type === "table" ? useSearchTables : useSearchColumns;

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
            id={item.id}
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

const SearchObjects = createSearchResults("table");
const SearchColumns = createSearchResults("column");

const SearchResults = () => {
  const { searchTopic } = useSearchTopic();
  const { searchQuery } = useSearchQuery();

  return (
    <Stack sx={{ p: 1.5, flex: 1 }}>
      {searchTopic === "table" && <SearchObjects q={searchQuery} />}
      {searchTopic === "column" && <SearchColumns q={searchQuery} />}
    </Stack>
  );
};

export { SearchResults };
