import { Box, Button, Dialog, Divider, Typography } from "@mui/material";
import type { DialogProps } from "@mui/material";

import { SearchBar } from "./SearchBar.tsx";
import { SearchTopicFilterFilled } from "./SearchTopic.tsx";
import { DialogContent } from "./DialogContent";
import { QuickActions } from "./QuickActions";

const SearchDialog = (props: Omit<DialogProps, "children">) => {
  return (
    <Dialog {...props} maxWidth="sm" fullWidth slotProps={{ paper: { elevation: 0, sx: { borderRadius: 2 } } }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 1.5, position: "relative" }}>
        <SearchTopicFilterFilled />
        <SearchBar />

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

      <Box sx={{ maxHeight: "90dvh", overflowY: "auto", overflowX: "hidden" }}>
        <DialogContent />
        <QuickActions onNav={() => props.onClose?.({}, "escapeKeyDown")} />
      </Box>
    </Dialog>
  );
};

export { SearchDialog };
