import { Box, ButtonBase, CircularProgress, MenuItem, MenuList } from "@mui/material";
import { Popover, Stack, Typography } from "@mui/material";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

import { useState } from "react";
import { useRowCounts } from "@/datahub/hooks/read";
import { chartChangeTransition, noSpace, smSpace } from "../commonSx";
import { BarChartItem, BarChartItemLabel } from "./BarChartItem";

type DisplayCounts = 3 | 5 | 7;

const Title = ({ value, onClick }: { value: DisplayCounts; onClick: (displayCounts: DisplayCounts) => void }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl((prev) => (prev ? null : e.currentTarget));
  const handleClose = () => setAnchorEl(null);

  const createHandler = (displayCounts: DisplayCounts) => () => {
    onClick(displayCounts);
    handleClose();
  };

  return (
    <Box sx={{ display: "flex", gap: smSpace, justifyContent: "space-between", alignItems: "center", p: smSpace }}>
      <Typography variant="h5" component="h3">
        紀錄數
      </Typography>

      <ButtonBase sx={{ "&:hover": { bgcolor: "action.hover" }, p: 1, pr: 0, borderRadius: 1 }} onClick={handleOpen}>
        <Typography sx={{ color: "text.secondary" }}>前 {value} 筆</Typography>
        <ArrowDropDownRoundedIcon sx={{ color: "text.secondary" }} />
      </ButtonBase>

      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuList dense>
          <MenuItem onClick={createHandler(3)} selected={value === 3}>
            前 3 筆
          </MenuItem>
          <MenuItem onClick={createHandler(5)} selected={value === 5}>
            前 5 筆
          </MenuItem>
          <MenuItem onClick={createHandler(7)} selected={value === 7}>
            前 7 筆
          </MenuItem>
        </MenuList>
      </Popover>
    </Box>
  );
};

type DataArray = {
  label: string;
  records: number;
  percentage: number;
  loading: boolean;
  noData: boolean;
}[];

// 整理成可用於顯示的數據格式
const parseData = (data: { [table: string]: number } | null, displayCounts: DisplayCounts) => {
  if (data === null) {
    return {
      dataArray: [...Array(displayCounts)].map((_, i) => ({
        label: "載入中" + i,
        records: 0,
        percentage: 0,
        loading: true,
        noData: false,
      })),
      averageAmount: 0,
      averagePercentages: 0,
    };
  }

  const sortedData = Object.entries(data)
    .sort(([, a], [, b]) => b - a)
    .slice(0, displayCounts);

  const sortedKeys = sortedData.map(([key]) => key);
  const sortedValues = sortedData.map(([, value]) => value);

  const visualMultiplier = 1.75; // 為了了讓條形圖的長度更明顯，所定義的乘數

  const totalAmount = Object.values(sortedValues).reduce((a, b) => a + b, 0);
  const averageAmount = Math.round(totalAmount / displayCounts);
  const averagePercentages = Math.round((averageAmount / totalAmount) * 100 * visualMultiplier);
  const percentages = sortedValues.map((value) => Math.round((value / totalAmount) * 100 * visualMultiplier));

  const result: DataArray = sortedKeys.map((label, i) => ({
    label,
    records: sortedValues[i],
    percentage: percentages[i],
    loading: false,
    noData: false,
  }));

  // 補充不足的元素至長度為 displayCounts
  if (result.length < displayCounts) {
    const emptyItems: DataArray = [...Array(displayCounts - result.length)].map(() => ({
      label: "",
      records: 0,
      percentage: 0,
      loading: false,
      noData: true,
    }));

    return { dataArray: [...result, ...emptyItems], averageAmount, averagePercentages };
  }

  return { dataArray: result, averageAmount, averagePercentages };
};

const BarChart = () => {
  const [displayCounts, setDisplayCounts] = useState<DisplayCounts>(5);
  const { data, isFetching } = useRowCounts({ types: ["table", "view"] });
  const { dataArray, averageAmount, averagePercentages } = parseData(isFetching ? null : data ?? null, displayCounts);

  return (
    <Stack sx={{ aspectRatio: { xs: "2/1", ml: "2/1.2" }, borderTop: "1px solid", borderColor: "divider" }}>
      <Title value={displayCounts} onClick={setDisplayCounts} />

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
        }}
      >
        {dataArray.map((props, i) => (
          <BarChartItem key={i} index={i} {...props} />
        ))}

        <Box
          sx={{
            position: "absolute",
            inset: `0 0 ${isFetching ? 0 : averagePercentages}% 0`,
            borderBottom: "4px dashed",
            borderColor: "divider",
            pointerEvents: "none",
            mx: smSpace,
            scale: "1.02 1",
            transition: chartChangeTransition,
            "&:before": {
              content: `"平均 ${isFetching ? 0 : averageAmount} 筆"`,
              position: "absolute",
              right: 0,
              bottom: 0,
              fontSize: "1rem",
              color: "text.secondary",
              opacity: 0.75,
            },
          }}
        />

        {isFetching && (
          <Box sx={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", pointerEvents: "none" }}>
            <CircularProgress />
          </Box>
        )}
      </Box>

      <Box sx={{ display: "flex", gap: smSpace, p: smSpace, justifyContent: "space-around", alignItems: "center" }}>
        {dataArray.map((props, i) => (
          <BarChartItemLabel key={i} index={i} {...props} />
        ))}
      </Box>
    </Stack>
  );
};

export { BarChart };
