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
      variant="outlined"
      label="搜尋"
      size="small"
      sx={{
        width: "20vw",
        maxWidth: "22rem",
        bgcolor: "background.paper",
        backgroundImage: "linear-gradient(#fff1, #fff1)",
        borderRadius: 1,
      }}
      value={search}
      onChange={handleChange}
      onKeyDown={handleKeydown}
      slotProps={{
        input: {
          sx: {
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "secondary.main" },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "divider" },
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
