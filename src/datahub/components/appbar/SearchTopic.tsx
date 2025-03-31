import { MenuItem, TextField } from "@mui/material";

const SrearchTopic = () => {
  return (
    <TextField
      select
      defaultValue="db"
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
      <MenuItem value="record" dense>
        紀錄
      </MenuItem>
    </TextField>
  );
};

export { SrearchTopic };
