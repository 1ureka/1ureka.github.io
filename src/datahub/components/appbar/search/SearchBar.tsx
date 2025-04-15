import { InputAdornment, TextField } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { type SearchTopic, useSearchTopic } from "./searchTopic";

const getPlaceholder = (searchTopic: SearchTopic) => {
  const map: Record<SearchTopic, string> = {
    db: "資料庫",
    table: "所有資料表",
    column: "所有表格欄位",
  };
  return `在 "${map[searchTopic]}" 中尋找...`;
};

const SearchBar = () => {
  const { searchTopic } = useSearchTopic();

  return (
    <TextField
      variant="standard"
      placeholder={getPlaceholder(searchTopic)}
      sx={{ flex: 1 }}
      slotProps={{
        input: {
          sx: {
            "&::before": { borderBottom: 0 },
            "&:hover:not(.Mui-disabled, .Mui-error):before": { borderBottom: 0 },
          },
          startAdornment: (
            <InputAdornment position="start" sx={{ mr: 1.5 }}>
              <SearchRoundedIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export { SearchBar };
