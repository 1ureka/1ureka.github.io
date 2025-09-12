import { Box, Divider, Skeleton, Stack, Typography } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import { useForeignKeyCheck } from "@/datahub/hooks/analysis";
import { smSpace } from "../home/commonSx";

const ForeignKeyStatusBlock = () => {
  const { data: isValid, isFetching } = useForeignKeyCheck();

  return (
    <Box sx={{ display: "flex", gap: smSpace, alignItems: "center", minHeight: 60 }}>
      <Stack sx={{ alignItems: "flex-start", flex: 1 }}>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
          外鍵完整性測試
        </Typography>
        {isFetching ? (
          <Skeleton variant="rounded" animation="wave" width={80} height={24}>
            <Typography variant="h6">載入中</Typography>
          </Skeleton>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {isValid ? (
              <>
                <CheckCircleRoundedIcon sx={{ color: "success.main", fontSize: 20 }} />
                <Typography variant="h6" sx={{ color: "success.main" }}>
                  通過
                </Typography>
              </>
            ) : (
              <>
                <ErrorRoundedIcon sx={{ color: "error.main", fontSize: 20 }} />
                <Typography variant="h6" sx={{ color: "error.main" }}>
                  未通過
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

export { ForeignKeyStatusBlock };
