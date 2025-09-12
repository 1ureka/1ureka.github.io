import { Box, Drawer, IconButton, Paper, Stack, Typography, Divider } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { IssueBarChart } from "./IssueBarChart";
import { ForeignKeyStatusBlock } from "./ForeignKeyStatusBlock";
import { RiskList } from "./RiskList";
import { mdSpace, smSpace } from "../home/commonSx";

interface IssueAnalysisDrawerProps {
  open: boolean;
  onClose: () => void;
}

const IssueAnalysisDrawer = ({ open, onClose }: IssueAnalysisDrawerProps) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: { width: { xs: "100%", sm: 480, md: 600 }, maxWidth: "90vw" },
        },
      }}
    >
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: smSpace,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="h5" component="h2">
            SQLite 資料庫分析
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, overflow: "auto", p: smSpace }}>
          <Stack gap={mdSpace}>
            {/* 第一個 Stat Block: 潛在風險直條圖 */}
            <Paper sx={{ p: mdSpace, borderRadius: 2, border: "1px solid", borderColor: "divider", boxShadow: "none" }}>
              <IssueBarChart />
            </Paper>

            {/* 第二個 Stat Block: 外鍵完整性測試 */}
            <Paper sx={{ p: mdSpace, borderRadius: 2, border: "1px solid", borderColor: "divider", boxShadow: "none" }}>
              <Typography variant="h6" component="h3" sx={{ mb: mdSpace }}>
                外鍵完整性檢查
              </Typography>
              <ForeignKeyStatusBlock />
            </Paper>

            <Divider />

            {/* 風險清單 */}
            <Box>
              <Typography variant="h6" component="h3" sx={{ mb: mdSpace }}>
                詳細風險清單
              </Typography>
              <RiskList />
            </Box>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};

export { IssueAnalysisDrawer };
