import { useUrl } from "@/datahub/hooks/url";
import { InputAdornment, MenuItem, TextField } from "@mui/material";
import type { InputProps } from "@mui/material";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import FindInPageRoundedIcon from "@mui/icons-material/FindInPageRounded";

const useSearchTopic = () => {
  const { searchParams, updateSearchParams } = useUrl();
  const raw = searchParams.get("searchTopic") ?? "db";
  const searchTopic = ["db", "table", "column"].includes(raw) ? raw : "db";

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === searchTopic) return;
    updateSearchParams({ searchTopic: value });
  };

  return { searchTopic, handleSelect };
};

const SrearchTopic = () => {
  const { searchTopic, handleSelect } = useSearchTopic();

  return (
    <TextField
      select
      value={searchTopic}
      onChange={handleSelect}
      size="small"
      variant="outlined"
      sx={{ bgcolor: "background.paper", backgroundImage: "linear-gradient(#fff1, #fff1)", borderRadius: 1 }}
      slotProps={{
        input: {
          sx: {
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "secondary.main" },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "divider" },
          },
        },
      }}
    >
      <MenuItem value="db" dense>
        資料庫
      </MenuItem>
      <MenuItem value="table" dense>
        資料表
      </MenuItem>
      <MenuItem value="column" dense>
        欄位
      </MenuItem>
    </TextField>
  );
};

const inputSx: InputProps["sx"] = {
  borderRadius: 2,
  overflow: "hidden",
  "&::before": { borderBottom: 0 },
  "&:hover:not(.Mui-disabled, .Mui-error):before": { borderBottom: 0 },
  "& input": { p: 1 },
  "& div[role='combobox']": { p: 1 },
};

const SearchTopicFilled = () => {
  const { searchTopic, handleSelect } = useSearchTopic();

  return (
    <TextField
      select
      value={searchTopic}
      onChange={handleSelect}
      variant="filled"
      sx={{ bgcolor: "background.paper", backgroundImage: "linear-gradient(#fff1, #fff1)", borderRadius: 1 }}
      slotProps={{
        select: { IconComponent: ArrowDropDownRoundedIcon, MenuProps: { elevation: 3 } },
        input: {
          sx: { ...inputSx, "& #tables-ias": { color: "text.secondary", m: 0 } },
          startAdornment: (
            <InputAdornment position="start" id="tables-ias">
              <FindInPageRoundedIcon sx={{ color: "text.secondary" }} />
            </InputAdornment>
          ),
        },
      }}
    >
      <MenuItem value="db" dense>
        資料庫
      </MenuItem>
      <MenuItem value="table" dense>
        資料表
      </MenuItem>
      <MenuItem value="column" dense>
        欄位
      </MenuItem>
    </TextField>
  );
};

export { SrearchTopic, SearchTopicFilled };
