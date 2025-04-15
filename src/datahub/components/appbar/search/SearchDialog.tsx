import { Box, Button, Dialog, Divider, InputAdornment, TextField, Typography } from "@mui/material";
import type { DialogProps } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import { SearchTopicFilterFilled } from "./SearchTopic.tsx";
import { useSearchTopic, type SearchTopic } from "./searchTopic";
import { DialogContent, DialogContentLoading } from "./DialogContent";
import { QuickActions } from "./QuickActions";

const getPlaceholder = (searchTopic: SearchTopic) => {
  const map: Record<SearchTopic, string> = {
    db: "資料庫",
    table: "所有資料表",
    column: "所有表格欄位",
  };
  return `在 "${map[searchTopic]}" 中尋找...`;
};

const SearchDialog = (props: Omit<DialogProps, "children">) => {
  const isFetching = false;
  const { searchTopic } = useSearchTopic();

  return (
    <Dialog
      {...props}
      maxWidth="sm"
      fullWidth
      slotProps={{ paper: { elevation: 0, sx: { borderRadius: 2, maxHeight: 400 } } }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 1.5, position: "relative" }}>
        <SearchTopicFilterFilled />

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

      {isFetching ? <DialogContentLoading /> : <DialogContent />}

      <Divider />

      <QuickActions />
    </Dialog>
  );
};

export { SearchDialog };
