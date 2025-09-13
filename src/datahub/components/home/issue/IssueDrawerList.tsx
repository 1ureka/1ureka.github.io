import { Box, List, ListItem, Typography, CircularProgress } from "@mui/material";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import DangerousRoundedIcon from "@mui/icons-material/DangerousRounded";
import { TileTooltip } from "@/datahub/components/home/TileTooltip";
import { useAnalysisSummary } from "@/datahub/hooks/analysis";
import type { Issue, RiskLevel } from "@/datahub/data/analysis";
import { useUrl } from "@/hooks/url";
import { routes } from "@/routes";
import { underlineSx } from "@/utils/commonSx";

const iconSize = "medium";
const iconSx = { fontSize: 64, borderRadius: 1.5, color: "#fff", p: 1.5 };
const iconMap: Record<RiskLevel, React.ReactNode> = {
  serious: <DangerousRoundedIcon fontSize={iconSize} sx={{ ...iconSx, bgcolor: "error.main" }} />,
  potential: <WarningRoundedIcon fontSize={iconSize} sx={{ ...iconSx, bgcolor: "warning.main" }} />,
};

const IssueListItem = ({ issue }: { issue: Issue }) => {
  const { update } = useUrl();

  const handleTableClick = () => {
    if (issue.table !== "database") {
      update(routes.datahub_tables, (prev) => ({ db: prev.db ?? null, table: issue.table }));
    }
  };

  const tableDisplay =
    issue.table === "database" ? (
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {issue.table}
      </Typography>
    ) : (
      <Typography variant="body2" sx={{ ...underlineSx, color: "primary.main" }} onClick={handleTableClick}>
        {issue.table}
      </Typography>
    );

  return (
    <ListItem sx={{ display: "grid", gap: 2.5, alignItems: "center", gridTemplateColumns: "auto 1fr auto auto", p: 1 }}>
      <Box sx={{ display: "grid", placeItems: "center", opacity: 0.8 }}>{iconMap[issue.level]}</Box>

      <Box>
        <Typography variant="subtitle1">{issue.title}</Typography>

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
        </Box>
      </Box>
    </ListItem>
  );
};

const IssueDrawerList = () => {
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
          沒有發現潛在風險
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
          您的資料庫健康狀況良好
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="h6" component="h3">
          風險詳情
        </Typography>

        <TileTooltip
          title={
            <Typography variant="body2" component="div">
              • <strong>嚴重</strong>：會導致資料錯誤或遺失的問題（如外鍵錯誤、日期格式錯誤）
              <br />• <strong>潛在</strong>：可能影響效能或未來擴展的問題（如冗餘索引、缺少索引）
            </Typography>
          }
        >
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", px: 1, py: 0.25, borderRadius: 1, ...underlineSx, cursor: "help" }}
          >
            嚴重 {data.issues.filter((issue) => issue.level === "serious").length} 筆 • 潛在{" "}
            {data.issues.filter((issue) => issue.level === "potential").length} 筆
          </Typography>
        </TileTooltip>
      </Box>
      <List dense>
        {data.issues.map((issue) => (
          <IssueListItem key={issue.id} issue={issue} />
        ))}
      </List>
    </Box>
  );
};

export { IssueDrawerList };
