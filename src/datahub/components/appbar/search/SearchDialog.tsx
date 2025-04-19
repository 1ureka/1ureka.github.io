import { Box, Button, Dialog, Divider, Stack, Typography } from "@mui/material";
import type { DialogProps } from "@mui/material";

import { SearchBar } from "./SearchBar.tsx";
import { SearchTopicFilterFilled } from "./SearchTopic.tsx";
import { SearchResults } from "./SearchResults";
import { QuickActions } from "./QuickActions";
import { useUrl } from "@/hooks/url.ts";

const SearchDialog = (props: Omit<DialogProps, "children" | "open" | "onClose">) => {
  const { searchParams, updateSearchParams } = useUrl();
  const open = searchParams.get("search") === "true";
  const handleClose = () => updateSearchParams({ search: "false" }, true);

  return (
    <Dialog
      {...props}
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      slotProps={{ paper: { elevation: 0, sx: { borderRadius: 2 } } }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 1.5, position: "relative" }}>
        <SearchTopicFilterFilled />
        <SearchBar />

        <Button
          onClick={handleClose}
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
        <QuickActions />
      </Stack>
    </Dialog>
  );
};

export { SearchDialog };
