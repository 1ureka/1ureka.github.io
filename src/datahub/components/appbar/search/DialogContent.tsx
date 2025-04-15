import { Box, CircularProgress, Typography } from "@mui/material";
import { useSearchTopic, type SearchTopic } from "./searchTopic";

const DialogContentLoading = () => (
  <Box sx={{ display: "grid", placeItems: "center", py: 5 }}>
    <CircularProgress size={24} />
  </Box>
);

const databases = {
  forum: { primary: "論壇資料庫", secondary: "來自論壇樣板" },
};

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

const DialogContent = () => {
  const { searchTopic } = useSearchTopic();

  return (
    <Box sx={{ display: "grid", placeItems: "center", py: 5 }}>
      <Typography variant="body2" color="text.secondary" textAlign="center">
        {getSearchPrompt(searchTopic)}
      </Typography>
    </Box>
  );
};

export { DialogContent, DialogContentLoading };
