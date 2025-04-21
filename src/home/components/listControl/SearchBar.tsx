import { InputAdornment, TextField } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import { z } from "zod";
import { useUrl } from "@/hooks/url";

const maxLength = 50;
const qSchema = z.string().max(maxLength, { message: `搜尋關鍵字長度不能超過 ${maxLength} 個字元` });

const outlineElementSelector = "& .MuiOutlinedInput-notchedOutline";
const sxMap = {
  left: { [outlineElementSelector]: { borderRadius: 2, borderTopRightRadius: 0, borderBottomRightRadius: 0 } },
  right: { [outlineElementSelector]: { borderRadius: 2, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } },
  mid: { [outlineElementSelector]: { borderRadius: 2 } },
} as const;

const SearchBar = ({ position, fullWidth }: { position: "left" | "right" | "mid"; fullWidth?: boolean }) => {
  const { searchParams, updateSearchParams } = useUrl();
  const { data } = qSchema.safeParse(searchParams.get("q"));
  const q = data ?? "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { data, error } = qSchema.safeParse(e.target.value);
    if (error) return console.error(error.errors[0].message);

    const value = data ?? "";
    if (q === value) return;

    if (value === "") updateSearchParams({ q: null }, { skipTransition: true });
    else updateSearchParams({ q: value }, { skipTransition: true });
  };

  return (
    <TextField
      id="search"
      label="搜尋"
      variant="outlined"
      size="small"
      value={q}
      onChange={handleChange}
      sx={sxMap[position]}
      fullWidth={fullWidth}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end" sx={{ color: "text.secondary" }}>
              <SearchRoundedIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export { SearchBar };
