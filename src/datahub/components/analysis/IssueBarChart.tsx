import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { useAnalysisSummary } from "@/datahub/hooks/analysis";
import { chartChangeTransition, noSpace, smSpace } from "../home/commonSx";
import { useUrl } from "@/hooks/url";
import { routes } from "@/routes";
import { underlineSx } from "@/utils/commonSx";

type DataArray = {
  label: string;
  issues: number;
  percentage: number;
  loading: boolean;
  noData: boolean;
}[];

// 整理成可用於顯示的數據格式
const parseData = (issuesByTable: { [table: string]: number } | null) => {
  if (!issuesByTable) {
    return {
      dataArray: [...Array(3)].map((_, i) => ({
        label: "載入中" + i,
        issues: 0,
        percentage: 0,
        loading: true,
        noData: false,
      })),
      topTables: [],
      bottomTables: [],
    };
  }

  const sortedEntries = Object.entries(issuesByTable).sort(([, a], [, b]) => b - a);

  const topTables = sortedEntries.slice(0, 3);
  const bottomTables = sortedEntries.slice(3, 6);

  const visualMultiplier = 1.75; // 為了讓條形圖的長度更明顯
  const totalIssues = Object.values(issuesByTable).reduce((a, b) => a + b, 0);

  const dataArray: DataArray = topTables.map(([label, issues]) => ({
    label,
    issues,
    percentage: totalIssues > 0 ? Math.round((issues / totalIssues) * 100 * visualMultiplier) : 0,
    loading: false,
    noData: false,
  }));

  // 補充不足的元素至長度為 3
  if (dataArray.length < 3) {
    const emptyItems: DataArray = [...Array(3 - dataArray.length)].map(() => ({
      label: "",
      issues: 0,
      percentage: 0,
      loading: false,
      noData: true,
    }));
    dataArray.push(...emptyItems);
  }

  return {
    dataArray,
    topTables: topTables.map(([name]) => name),
    bottomTables: bottomTables.map(([name]) => name),
  };
};

const BarChartItem = ({ label, issues, percentage, loading, noData }: DataArray[0]) => {
  const { update } = useUrl();

  const handleClick = () => {
    if (label && !loading && !noData) {
      update(routes.datahub_tables, (prev) => ({ db: prev.db ?? null, table: label }));
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        flex: 1,
        minHeight: "120px",
        cursor: label && !loading && !noData ? "pointer" : "default",
        "&:hover": label && !loading && !noData ? { "& > div": { opacity: 0.8 } } : {},
      }}
      onClick={handleClick}
    >
      {!noData && (
        <Box
          sx={{
            width: "80%",
            height: `${percentage}%`,
            bgcolor: loading ? "divider" : "warning.main",
            borderRadius: 1,
            transition: chartChangeTransition,
            opacity: loading ? 0.3 : 1,
          }}
        />
      )}
    </Box>
  );
};

const BarChartItemLabel = ({ label, issues, loading, noData }: DataArray[0]) => {
  const { update } = useUrl();

  const handleClick = () => {
    if (label && !loading && !noData) {
      update(routes.datahub_tables, (prev) => ({ db: prev.db ?? null, table: label }));
    }
  };

  if (noData) return <Box sx={{ flex: 1 }} />;

  return (
    <Stack
      sx={{
        flex: 1,
        alignItems: "center",
        cursor: label && !loading && !noData ? "pointer" : "default",
        ...(!loading && !noData && label ? underlineSx : {}),
      }}
      onClick={handleClick}
    >
      <Typography variant="body2" sx={{ fontWeight: "bold", textAlign: "center" }}>
        {loading ? "..." : issues}
      </Typography>
      <Typography variant="caption" sx={{ textAlign: "center", opacity: 0.7 }}>
        {loading ? "載入中" : label}
      </Typography>
    </Stack>
  );
};

const BottomTablesList = ({ tables }: { tables: string[] }) => {
  const { update } = useUrl();

  if (tables.length === 0) return null;

  return (
    <Box sx={{ mt: 2, p: 2, bgcolor: "background.paper", borderRadius: 1 }}>
      <Typography variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
        其他有問題的資料表：
      </Typography>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {tables.map((table) => (
          <Typography
            key={table}
            variant="caption"
            sx={{
              ...underlineSx,
              color: "primary.main",
              cursor: "pointer",
            }}
            onClick={() => update(routes.datahub_tables, (prev) => ({ db: prev.db ?? null, table }))}
          >
            {table}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

const IssueBarChart = () => {
  const { data, isFetching } = useAnalysisSummary();
  const { dataArray, bottomTables } = useMemo(
    () => parseData(isFetching ? null : data?.issuesByTable ?? null),
    [data?.issuesByTable, isFetching]
  );

  return (
    <Stack sx={{ minHeight: 200 }}>
      <Box sx={{ display: "flex", gap: smSpace, justifyContent: "space-between", alignItems: "center", p: smSpace }}>
        <Typography variant="h6" component="h3">
          潛在風險
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          前 3 個問題資料表
        </Typography>
      </Box>

      <Box
        sx={{
          position: "relative",
          flex: 1,
          display: "flex",
          gap: smSpace,
          p: smSpace,
          py: noSpace,
          justifyContent: "space-around",
          alignItems: "stretch",
          minHeight: 120,
        }}
      >
        {dataArray.map((props, i) => (
          <BarChartItem key={i} {...props} />
        ))}

        {isFetching && (
          <Box sx={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", pointerEvents: "none" }}>
            <CircularProgress size={24} />
          </Box>
        )}
      </Box>

      <Box sx={{ display: "flex", gap: smSpace, p: smSpace, justifyContent: "space-around", alignItems: "center" }}>
        {dataArray.map((props, i) => (
          <BarChartItemLabel key={i} {...props} />
        ))}
      </Box>

      <BottomTablesList tables={bottomTables} />
    </Stack>
  );
};

export { IssueBarChart };
