import { Box, InputAdornment, MenuItem, Stack, TextField, Typography } from "@mui/material";
import SortRoundedIcon from "@mui/icons-material/SortRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";

import { fromEntries } from "@/utils/typedBuiltins";
import { useOrderState } from "@/home/hooks/useControl";

const orderByOptions = [
  { value: "time", label: "時間" },
  { value: "title", label: "標題" },
  { value: "progress", label: "完成度" },
] as const;
const orderOptions = [
  { value: "asc", label: "升序", icon: <ArrowUpwardRoundedIcon color="inherit" /> },
  { value: "desc", label: "降序", icon: <ArrowUpwardRoundedIcon color="inherit" sx={{ rotate: "180deg" }} /> },
] as const;

const orderByOptionsMap = fromEntries(orderByOptions.map((option) => [option.value, option]));
const orderOptionsMap = fromEntries(orderOptions.map((option) => [option.value, option]));

const outlineElementSelector = "& .MuiOutlinedInput-notchedOutline";
const sxMap = {
  left: { [outlineElementSelector]: { borderRadius: 2, borderTopRightRadius: 0, borderBottomRightRadius: 0 } },
  right: { [outlineElementSelector]: { borderRadius: 2, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } },
  mid: { [outlineElementSelector]: { borderRadius: 2 } },
} as const;

const OrderSelect = ({ position, fullWidth }: { position: "left" | "right" | "mid"; fullWidth?: boolean }) => {
  const { orderState, handleChange, createChangeOrderHandler } = useOrderState();

  return (
    <TextField
      select
      label="排序"
      variant="outlined"
      size="small"
      value={orderState.orderBy}
      sx={sxMap[position]}
      fullWidth={fullWidth}
      onChange={handleChange}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start" sx={{ color: "text.secondary" }}>
              <SortRoundedIcon />
            </InputAdornment>
          ),
        },
        select: {
          IconComponent: ExpandMoreRoundedIcon,
          renderValue: () =>
            `${orderByOptionsMap[orderState.orderBy].label} • ${orderOptionsMap[orderState.order].label}`,
          MenuProps: {
            elevation: 3,
            slotProps: {
              paper: {
                sx: { borderRadius: 2, "& ul": { display: "flex", flexDirection: "column", gap: 0.5, p: 1 } },
              },
            },
          },
        },
      }}
    >
      {orderByOptions.map(({ value, label }) => (
        <MenuItem
          key={value}
          value={value}
          sx={{ p: 0, px: 1, py: 0.25, m: 0, borderRadius: 1.5, transition: "none" }}
          dense
        >
          <Typography variant="subtitle1">{label}</Typography>
        </MenuItem>
      ))}

      {/*
          包在Stack裡面，讓MUI認為它只是說明用元素，
          其value就不影響實際選單，
          也使多隔一層的MenuItem可以有正確的select樣式
          (不然會完全沒有選取樣式，因為TextField的直接子元素MenuItem select樣式一次只能有一個)
       */}
      <Stack sx={{ gap: 0.5, pt: 0.5, borderTop: 1, borderColor: "divider" }}>
        {orderOptions.map(({ value, icon, label }) => (
          <MenuItem
            key={value}
            sx={{ p: 0, px: 1, py: 0.25, m: 0, borderRadius: 1.5, transition: "none" }}
            onClick={createChangeOrderHandler(value)}
            selected={orderState.order === value}
            dense
          >
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
              <Box sx={{ color: orderState.order === value ? "text.colored" : "text.secondary" }}>{icon}</Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1">{label}</Typography>
              </Box>
            </Box>
          </MenuItem>
        ))}
      </Stack>
    </TextField>
  );
};

export { OrderSelect };
