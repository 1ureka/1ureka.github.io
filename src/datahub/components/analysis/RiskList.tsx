import { 
  Box, 
  Chip, 
  List, 
  ListItem, 
  ListItemText, 
  Typography, 
  Alert,
  CircularProgress
} from "@mui/material";
import { useAnalysisSummary } from "@/datahub/hooks/analysis";
import type { Issue, RiskLevel } from "@/datahub/data/analysis";
import { useUrl } from "@/hooks/url";
import { routes } from "@/routes";
import { underlineSx } from "@/utils/commonSx";

const getRiskLevelColor = (level: RiskLevel): "error" | "warning" => {
  return level === "serious" ? "error" : "warning";
};

const getRiskLevelText = (level: RiskLevel): string => {
  return level === "serious" ? "嚴重" : "潛在";
};

const RiskLevelExplanation = () => (
  <Alert severity="info" sx={{ mb: 2 }}>
    <Typography variant="body2" sx={{ mb: 1, fontWeight: "medium" }}>
      風險等級說明：
    </Typography>
    <Typography variant="body2" component="div">
      • <strong>嚴重</strong>：會導致資料錯誤或遺失的問題（如外鍵錯誤、日期格式錯誤）
      <br />
      • <strong>潛在</strong>：可能影響效能或未來擴展的問題（如冗餘索引、缺少索引）
    </Typography>
  </Alert>
);

const IssueListItem = ({ issue }: { issue: Issue }) => {
  const { update } = useUrl();
  
  const handleTableClick = () => {
    if (issue.table !== "database") {
      update(routes.datahub_tables, (prev) => ({ db: prev.db ?? null, table: issue.table }));
    }
  };

  const tableDisplay = issue.table === "database" ? (
    <Typography variant="body2" sx={{ color: "text.secondary" }}>
      {issue.table}
    </Typography>
  ) : (
    <Typography 
      variant="body2" 
      sx={{ 
        ...underlineSx, 
        color: "primary.main",
        cursor: "pointer",
      }}
      onClick={handleTableClick}
    >
      {issue.table}
    </Typography>
  );

  return (
    <ListItem sx={{ px: 0, alignItems: "flex-start" }}>
      <ListItemText
        primary={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
            <Chip 
              label={getRiskLevelText(issue.level)} 
              color={getRiskLevelColor(issue.level)}
              size="small"
            />
            <Typography variant="subtitle2" sx={{ fontWeight: "medium" }}>
              {issue.title}
            </Typography>
          </Box>
        }
        secondary={
          <Box>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              {issue.description}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                資料表：
              </Typography>
              {tableDisplay}
              {issue.count && (
                <>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    •
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    影響 {issue.count} 筆
                  </Typography>
                </>
              )}
            </Box>
            
            {/* TODO: 預留 actions 按鈕空間 */}
            {issue.actions && issue.actions.length > 0 && (
              <Box sx={{ mt: 1 }}>
                {/* TODO: 實現 action 按鈕 */}
                <Typography variant="caption" sx={{ color: "text.disabled" }}>
                  解決方案：{issue.actions.join(", ")}
                </Typography>
              </Box>
            )}
          </Box>
        }
      />
    </ListItem>
  );
};

const RiskList = () => {
  const { data, isFetching } = useAnalysisSummary();

  if (isFetching) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!data || data.issues.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="body1" sx={{ color: "success.main", fontWeight: "medium" }}>
          🎉 沒有發現潛在風險
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
          您的資料庫健康狀況良好
        </Typography>
      </Box>
    );
  }

  // 按風險等級分組
  const seriousIssues = data.issues.filter(issue => issue.level === "serious");
  const potentialIssues = data.issues.filter(issue => issue.level === "potential");

  return (
    <Box>
      <RiskLevelExplanation />
      
      {seriousIssues.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: "error.main" }}>
            嚴重問題 ({seriousIssues.length})
          </Typography>
          <List dense>
            {seriousIssues.map((issue) => (
              <IssueListItem key={issue.id} issue={issue} />
            ))}
          </List>
        </Box>
      )}

      {potentialIssues.length > 0 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 2, color: "warning.main" }}>
            潛在問題 ({potentialIssues.length})
          </Typography>
          <List dense>
            {potentialIssues.map((issue) => (
              <IssueListItem key={issue.id} issue={issue} />
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export { RiskList };