import { IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useState } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value);

  const href = "#" + search;
  const handleKeydown: React.KeyboardEventHandler<HTMLDivElement> = ({ key }) => {
    if (key !== "Enter") return;
    if (!search.trim()) return console.error("請輸入搜尋內容");
    console.log("還沒寫完，請稍後再試");
    window.location.href = "#";
  };

  return (
    <TextField
      variant="filled"
      label="搜尋"
      size="small"
      sx={{ width: "20vw", maxWidth: "25rem", minWidth: "15rem", scale: "0.9", transformOrigin: "left" }}
      value={search}
      onChange={handleChange}
      onKeyDown={handleKeydown}
      slotProps={{
        input: {
          sx: {
            borderRadius: 2,
            overflow: "hidden",
            "&::before": { borderBottom: 0 },
            "&:hover:not(.Mui-disabled, .Mui-error):before": { borderBottom: 0 },
          },
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
