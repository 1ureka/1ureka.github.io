import { useState } from "react";
import { IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { routes } from "@/routes";

const SEARCH_PAGE = routes.forum_search;
const SEARCH_QUERY = "?all=";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value);

  const href = SEARCH_PAGE + SEARCH_QUERY + search;
  const handleKeydown: React.KeyboardEventHandler<HTMLDivElement> = ({ key }) => {
    if (key !== "Enter") return;
    if (!search.trim()) return console.error("請輸入搜尋內容");
    window.location.href = href;
  };

  return (
    <TextField
      variant="filled"
      label="搜尋"
      placeholder="使用者 / 貼文"
      size="small"
      sx={{ minWidth: 150, width: 1, maxWidth: 800 }}
      value={search}
      onChange={handleChange}
      onKeyDown={handleKeydown}
      slotProps={{
        input: {
          endAdornment: (
            <Tooltip title={search.trim() ? "搜尋" : "請輸入搜尋內容"} arrow>
              <InputAdornment position="end">
                <IconButton edge="end" href={href} disabled={!search.trim()}>
                  <SearchRoundedIcon />
                </IconButton>
              </InputAdornment>
            </Tooltip>
          ),
        },
      }}
    />
  );
};

export { SearchBar };
