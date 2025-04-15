import { Box, Button, CircularProgress, Dialog, Divider, InputAdornment, TextField, Typography } from "@mui/material";
import type { DialogProps } from "@mui/material";
import { SearchTopicFilled } from "./SearchTopic";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useUrl } from "@/datahub/hooks/url";

const databases = {
  forum: { primary: "論壇資料庫", secondary: "來自論壇樣板" },
};

const SearchContentLoading = () => {
  return (
    <Box sx={{ display: "grid", placeItems: "center", py: 5 }}>
      <CircularProgress size={24} />
    </Box>
  );
};

const SearchContent = () => {
  return <></>;
};

const topicMap: Record<string, string> = {
  db: "資料庫",
  table: "所有資料表",
  column: "所有表格欄位",
};

const SearchDialog = (props: Omit<DialogProps, "children">) => {
  const isFetching = true;
  const { searchParams } = useUrl();
  const raw = searchParams.get("searchTopic") ?? "db";
  const searchTopic = ["db", "table", "column"].includes(raw) ? raw : "db";

  return (
    <Dialog
      {...props}
      maxWidth="sm"
      fullWidth
      slotProps={{ paper: { elevation: 0, sx: { borderRadius: 2, maxHeight: 400 } } }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 1.5, position: "relative" }}>
        <SearchTopicFilled />
        <TextField
          variant="standard"
          placeholder={`在 "${topicMap[searchTopic]}" 中尋找...`}
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
        <Button
          onClick={() => props.onClose?.({}, "escapeKeyDown")}
          color="inherit"
          sx={{
            bgcolor: "FilledInput.bg",
            "&:hover": { bgcolor: "FilledInput.disabledBg" },
            borderRadius: 1.5,
            p: 0.5,
            px: 1.5,
            minWidth: 0,
          }}
        >
          <Typography variant="caption" sx={{ textTransform: "lowercase" }}>
            esc
          </Typography>
        </Button>
      </Box>
      <Divider />
      {isFetching ? <SearchContentLoading /> : <SearchContent />}
    </Dialog>
  );
};

export { SearchDialog };
