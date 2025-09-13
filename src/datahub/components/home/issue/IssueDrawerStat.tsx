import { Paper, Stack, Typography } from "@mui/material";
import { ForeignKeyCheck } from "./ForeignKeyCheck";
import { FreeListCheck } from "./FreeListCheck";

const IssueDrawerStat = () => {
  return (
    <Stack sx={{ flex: 1, overflow: "auto", p: 2, gap: 2 }}>
      <Paper sx={{ p: 2, borderRadius: 2, border: "1px solid", borderColor: "divider", boxShadow: "none" }}>
        <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
          外鍵完整性檢查
        </Typography>
        <ForeignKeyCheck />
      </Paper>

      <Paper sx={{ p: 2, borderRadius: 2, border: "1px solid", borderColor: "divider", boxShadow: "none" }}>
        <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
          ISO 8601 日期格式檢查
        </Typography>
        <ForeignKeyCheck />
      </Paper>

      <Paper sx={{ p: 2, borderRadius: 2, border: "1px solid", borderColor: "divider", boxShadow: "none" }}>
        <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
          冗餘分頁檢查
        </Typography>
        <FreeListCheck />
      </Paper>
    </Stack>
  );
};

export { IssueDrawerStat };
