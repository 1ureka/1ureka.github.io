import { Box, Divider, Skeleton, Stack, Typography } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import { useCheckTimeFormat } from "@/datahub/hooks/analysis";

const CheckState = ({ isFetching }: { isFetching: boolean }) => (
  <Stack sx={{ alignItems: "flex-start" }}>
    <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
      檢查狀態
    </Typography>
    <Typography variant="body2" sx={{ fontWeight: "medium" }}>
      {isFetching ? "檢查中..." : "已完成"}
    </Typography>
  </Stack>
);

const OverviewItem = ({ data, isFetching }: ReturnType<typeof useCheckTimeFormat>) => {
  const issues = data;

  if (isFetching || issues === undefined)
    return (
      <Skeleton variant="rounded" animation="wave" width={80} height={24}>
        <Typography variant="h6">載入中</Typography>
      </Skeleton>
    );

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {issues.length === 0 ? (
        <>
          <CheckCircleRoundedIcon sx={{ color: "success.main", fontSize: 20 }} />
          <Typography variant="h6" sx={{ color: "success.main" }}>
            日期皆符合 ISO 格式
          </Typography>
        </>
      ) : (
        <>
          <ErrorRoundedIcon sx={{ color: "warning.main", fontSize: 20 }} />
          <Typography variant="h6" sx={{ color: "warning.main" }}>
            {issues.length} 個問題
          </Typography>
        </>
      )}
    </Box>
  );
};

const DateFormatCheck = () => {
  const { data, isFetching } = useCheckTimeFormat();

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", minHeight: 60 }}>
        <Stack sx={{ alignItems: "flex-start", flex: 1 }}>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
            是否有資料表的日期欄位未使用 ISO 8601 格式
          </Typography>
          {OverviewItem({ data, isFetching })}
        </Stack>
        <Divider orientation="vertical" flexItem />
        <CheckState isFetching={isFetching} />
      </Box>

      {/* TODO: list */}
    </Box>
  );
};

export { DateFormatCheck };
