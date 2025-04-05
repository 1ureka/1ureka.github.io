import { Box, Typography } from "@mui/material";

const baseSx = { color: "text.secondary" } as const;
const kbdSx = { ...baseSx, borderRadius: 1, bgcolor: "divider", p: 0.7 } as const;

const SchemaHeader = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
      <Typography variant="body2" sx={kbdSx}>
        ⇧ Shift
      </Typography>
      <Typography variant="body2" sx={baseSx}>
        {" + "}
      </Typography>
      <Typography variant="body2" sx={kbdSx}>
        LMB
      </Typography>
      <Typography variant="body2" sx={baseSx}>
        可選取方框範圍內的所有項目，
      </Typography>
      <Typography variant="body2" sx={kbdSx}>
        ⌘ / Ctrl
      </Typography>
      <Typography variant="body2" sx={baseSx}>
        {" + "}
      </Typography>
      <Typography variant="body2" sx={kbdSx}>
        LMB
      </Typography>
      <Typography variant="body2" sx={baseSx}>
        可多選個別項目。
      </Typography>
    </Box>
  );
};

export { SchemaHeader };
