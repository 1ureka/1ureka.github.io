import { Box, Button, Dialog, Divider, Stack, Typography } from "@mui/material";
import type { DialogProps } from "@mui/material";

import { SearchBar } from "./SearchBar.tsx";
import { SearchTopicFilterFilled } from "./SearchTopic.tsx";
import { SearchResults } from "./SearchResults";
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

      <Stack sx={{ height: "60dvh", overflowY: "auto", overflowX: "hidden" }}>
        <SearchResults />
        <QuickActions onNav={() => props.onClose?.({}, "escapeKeyDown")} />
      </Stack>
    </Dialog>
  );
};

export { SearchDialog };
