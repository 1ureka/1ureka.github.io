import { Box, Skeleton, Typography } from "@mui/material";
import { TileTooltip } from "../TileTooltip";
import { StripedBackground } from "./StripedBackground";

import { ellipsisSx, underlineSx } from "@/utils/commonSx";
import { chartChangeTransition } from "../commonSx";
import { formatNumber } from "@/utils/formatters";
import { useUrl } from "@/hooks/url";

const visualMultiplier = 1.375; // 視覺化的比例因子

type FlatBarChartItemProps = {
  field: string;
  count: number;
  percentage: number;
  loading: boolean;
  noData: boolean;
  index: number;
};

const FlatBarChartItem = ({ field, count, percentage, loading, noData, index }: FlatBarChartItemProps) => {
  const { updateSearchParams } = useUrl();
  const handleClick = () => updateSearchParams({ search: "true", searchQuery: field, searchTopic: "column" }, true);

  return (
    <>
      <Box>
        {loading ? (
          <Skeleton variant="rounded" animation="wave">
            <Typography variant="body1" sx={{ ...ellipsisSx, ...underlineSx, width: "6rem" }}>
              載入中
            </Typography>
          </Skeleton>
        ) : noData ? (
          <Typography variant="body1" sx={{ ...ellipsisSx, width: "6rem" }}>
            ---
          </Typography>
        ) : (
          <TileTooltip title={<Typography>{field}</Typography>}>
            <Typography variant="body1" sx={{ ...ellipsisSx, ...underlineSx, width: "6rem" }} onClick={handleClick}>
              {field}
            </Typography>
          </TileTooltip>
        )}
      </Box>

      <TileTooltip
        title={
          loading || noData ? null : (
            <Box>
              <Typography variant="subtitle2">{field}</Typography>
              <Typography>所有欄位名稱中的 {`${Math.round(percentage * 100)}%`}</Typography>
            </Box>
          )
        }
      >
        <Box
          onClick={handleClick}
          sx={{
            width: 1,
            height: "1rem",
            borderRadius: 99,
            position: "relative",
            overflow: "clip",
            display: "flex",
            alignItems: "center",
            "&:hover": { bgcolor: "action.hover", "& .bar-content": { opacity: 1 } },
            transition: "all 0.2s ease-in-out",
          }}
        >
          <StripedBackground color1="divider" color2="#fff0" angle={-35} stripeWidth={5} />

          <Box
            sx={{
              position: "absolute",
              width: Math.max(0, Math.min(percentage * visualMultiplier, 1)),
              height: 1,
              borderRadius: 9,
              overflow: "clip",
              bgcolor: "background.paper",
              transition: chartChangeTransition,
            }}
          >
            <Box
              className="bar-content"
              sx={{
                position: "absolute",
                inset: 0,
                bgcolor: "primary.main",
                opacity: index === 0 ? 0.9 : 0.65,
                transition: "all 0.2s ease-in-out",
              }}
            />
          </Box>
        </Box>
      </TileTooltip>

      <Box>
        {loading ? (
          <Skeleton variant="rounded" animation="wave">
            <Typography variant="body1" sx={{ ...ellipsisSx, maxWidth: "10rem" }}>
              載入中
            </Typography>
          </Skeleton>
        ) : (
          <Typography variant="body1" sx={{ ...ellipsisSx, maxWidth: "10rem" }}>
            {noData ? "---" : formatNumber(count)}
          </Typography>
        )}
      </Box>
    </>
  );
};

export { FlatBarChartItem };
