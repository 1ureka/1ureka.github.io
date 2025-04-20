import { Box, Skeleton, Typography } from "@mui/material";
import { TileTooltip } from "../TileTooltip";
import { StripedBackground } from "./StripedBackground";

import { chartChangeTransition } from "../commonSx";
import { ellipsisSx, underlineSx } from "@/utils/commonSx";
import { routes } from "@/routes";
import { useUrl } from "@/hooks/url";

type BarChartItemProps = {
  label: string;
  records: number;
  percentage: number;
  loading: boolean;
  noData: boolean;
  index: number;
};

const useHandleClick = (label: string) => {
  const { update } = useUrl();
  const handleClick = () => update(routes.datahub_tables, (prev) => ({ db: prev.db ?? null, table: label }));
  return handleClick;
};

const BarChartItem = ({ label, records, percentage, loading, noData, index }: BarChartItemProps) => {
  const handleClick = useHandleClick(label);

  return (
    <TileTooltip
      title={
        loading || noData ? null : (
          <Box>
            <Typography variant="subtitle2">{label}</Typography>
            <Typography>{records} 筆紀錄</Typography>
          </Box>
        )
      }
    >
      <Box
        onClick={handleClick}
        sx={{
          position: "relative",
          flex: 1,
          borderRadius: 2,
          overflow: "clip",
          transition: "all 0.2s ease-in-out",
          "&:hover": { bgcolor: "action.hover", "& .bar-content": { opacity: 1 } },
        }}
      >
        <StripedBackground color1="divider" color2="#fff0" angle={-20} stripeWidth={5} />
        <Box
          sx={{
            position: "absolute",
            inset: `${loading || noData ? 100 : Math.max(0, 100 - percentage)}% 0 0 0`,
            borderRadius: 2,
            overflow: "hidden",
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
  );
};

const BarChartItemLabel = ({ label, loading, noData }: BarChartItemProps) => {
  const handleClick = useHandleClick(label);

  if (loading) {
    return (
      <Skeleton variant="rounded" animation="wave">
        <Typography variant="body1" component="p" sx={{ flex: 1, textAlign: "center" }}>
          載入中
        </Typography>
      </Skeleton>
    );
  }

  if (noData) {
    return (
      <Typography
        variant="body1"
        component="p"
        sx={{ flex: 1, color: "text.secondary", ...ellipsisSx, textAlign: "center" }}
      >
        ---
      </Typography>
    );
  }

  return (
    <TileTooltip title={<Typography>{label}</Typography>}>
      <Typography
        onClick={handleClick}
        variant="body1"
        component="p"
        sx={{ flex: 1, color: "text.secondary", ...underlineSx, ...ellipsisSx, textAlign: "center" }}
      >
        {label}
      </Typography>
    </TileTooltip>
  );
};

export { BarChartItem, BarChartItemLabel };
