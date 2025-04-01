import { Box, ButtonBase, MenuItem, MenuList, Popover, Stack, Typography } from "@mui/material";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { TileTooltip } from "../TileTooltip";
import { StripedBackground } from "../StripedBackground";
import { ellipsisSx, noSpace, smSpace, underlineSx } from "../commonSx";
import { useState } from "react";

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

const BarChart = () => {
  const [displayCounts, setDisplayCounts] = useState<DisplayCounts>(5);

  // 假資料，實際上應該從 API 獲取且排序好
  const data: { [table: string]: number } = {
    comment_interactions: 560,
    post_interactions: 256,
    user_interactions: 96,
    comments: 68,
    comment_interaction_counts: 68,
    users: 16,
    user_interaction_counts: 16,
    posts: 15,
    post_interaction_counts: 15,
    comment_stats: 1,
  };

  // 為了了讓條形圖的長度更明顯，所定義的乘數
  const visualMultiplier = 1.75;

  const totalAmount = Object.values(data).reduce((a, b) => a + b, 0);
  const averageAmount = Math.round(totalAmount / displayCounts);
  const averagePercentages = Math.round((averageAmount / totalAmount) * 100 * visualMultiplier);

  const labels = Object.keys(data);
  const values = Object.values(data);
  const percentages = values.map((value) => Math.round((value / totalAmount) * 100 * visualMultiplier));

  // 整理成可用於顯示的數據格式
  const dataArray = labels
    .map((label, index) => ({
      label,
      records: values[index],
      percentage: percentages[index],
    }))
    .slice(0, displayCounts);

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
        {dataArray.map(({ label, records, percentage }, i) => (
          <TileTooltip
            key={label}
            title={
              <Box>
                <Typography variant="subtitle2">{label}</Typography>
                <Typography>{records} 筆紀錄</Typography>
              </Box>
            }
          >
            <Box
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
                  inset: `${Math.max(0, 100 - percentage)}% 0 0 0`,
                  borderRadius: 2,
                  overflow: "hidden",
                  bgcolor: "background.paper",
                }}
              >
                <Box
                  className="bar-content"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    bgcolor: "primary.main",
                    opacity: i === 0 ? 0.9 : 0.65,
                    transition: "all 0.2s ease-in-out",
                  }}
                />
              </Box>
            </Box>
          </TileTooltip>
        ))}

        <Box
          sx={{
            position: "absolute",
            inset: `0 0 ${averagePercentages}% 0`,
            borderBottom: "4px dashed",
            borderColor: "divider",
            pointerEvents: "none",
            mx: smSpace,
            scale: "1.02 1",
            "&:before": {
              content: `"平均 ${averageAmount} 筆"`,
              position: "absolute",
              right: 0,
              bottom: 0,
              fontSize: "1rem",
              color: "text.secondary",
              opacity: 0.75,
            },
          }}
        />
      </Box>

      <Box sx={{ display: "flex", gap: smSpace, p: smSpace, justifyContent: "space-around", alignItems: "center" }}>
        {dataArray.map(({ label }) => (
          <TileTooltip key={label} title={<Typography>{label}</Typography>}>
            <Typography
              variant="body1"
              component="p"
              sx={{ flex: 1, color: "text.secondary", ...underlineSx, ...ellipsisSx, textAlign: "center" }}
            >
              {label}
            </Typography>
          </TileTooltip>
        ))}
      </Box>
    </Stack>
  );
};

export { BarChart };
