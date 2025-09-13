import { Box, Divider, Skeleton, Stack, Typography } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import { useFreelistCheck } from "@/datahub/hooks/analysis";
import { smSpace } from "@/datahub/components/home/commonSx";

const FreeListCheck = () => {
  const { data: counts, isFetching } = useFreelistCheck();

  return (
    <Box sx={{ display: "flex", gap: smSpace, alignItems: "center", minHeight: 60 }}>
      <Stack sx={{ alignItems: "flex-start", flex: 1 }}>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
          檢查是否有可以刪除的冗餘分頁
        </Typography>
        {isFetching || counts === undefined ? (
          <Skeleton variant="rounded" animation="wave" width={80} height={24}>
            <Typography variant="h6">載入中</Typography>
          </Skeleton>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {counts === 0 ? (
              <>
                <CheckCircleRoundedIcon sx={{ color: "success.main", fontSize: 20 }} />
                <Typography variant="h6" sx={{ color: "success.main" }}>
                  無冗餘分頁
                </Typography>
              </>
            ) : (
              <>
                <ErrorRoundedIcon sx={{ color: "warning.main", fontSize: 20 }} />
                <Typography variant="h6" sx={{ color: "warning.main" }}>
                  {counts} 個冗餘分頁
                </Typography>
              </>
            )}
          </Box>
        )}
      </Stack>

      <Divider orientation="vertical" flexItem />

      <Stack sx={{ alignItems: "flex-start" }}>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
          檢查狀態
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: "medium" }}>
          {isFetching ? "檢查中..." : "已完成"}
        </Typography>
      </Stack>
    </Box>
  );
};

export { FreeListCheck };
