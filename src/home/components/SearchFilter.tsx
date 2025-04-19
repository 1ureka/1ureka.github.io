import { Box, InputAdornment, MenuItem, TextField, Typography } from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import DesktopWindowsRoundedIcon from "@mui/icons-material/DesktopWindowsRounded";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";

import { fromEntries } from "@/utils/typedBuiltins";
import { useFilterState } from "../hooks/useControl";

const filterOptions = [
  {
    value: "all",
    icon: <AppsRoundedIcon color="inherit" />,
    label: "全部",
    description: "顯示所有作品，包含不同裝置的設計",
  },
  {
    value: "desktop",
    icon: <DesktopWindowsRoundedIcon color="inherit" />,
    label: "桌面型",
    description: "主要設計給電腦或大型螢幕使用的介面",
  },
  {
    value: "rwd",
    icon: <DevicesRoundedIcon color="inherit" />,
    label: "響應式",
    description: "可自動適應手機、平板與電腦等多種裝置",
  },
] as const;

const filterOptionsMap = fromEntries(filterOptions.map((option) => [option.value, option]));

const outlineElementSelector = "& .MuiOutlinedInput-notchedOutline";
const sxMap = {
  left: { [outlineElementSelector]: { borderRadius: 2, borderTopRightRadius: 0, borderBottomRightRadius: 0 } },
  right: { [outlineElementSelector]: { borderRadius: 2, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } },
  mid: { [outlineElementSelector]: { borderRadius: 2 } },
} as const;

const SearchFilter = ({ position, fullWidth }: { position: "left" | "right" | "mid"; fullWidth?: boolean }) => {
  const { filter, handleChange } = useFilterState();

  return (
    <TextField
      select
      label="適用裝置"
      variant="outlined"
      size="small"
      value={filter}
      sx={sxMap[position]}
      fullWidth={fullWidth}
      onChange={handleChange}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start" sx={{ color: "text.secondary" }}>
              {filterOptionsMap[filter].icon}
            </InputAdornment>
          ),
        },
        select: {
          IconComponent: ExpandMoreRoundedIcon,
          renderValue: () => filterOptionsMap[filter].label,
          MenuProps: {
            elevation: 3,
            anchorOrigin: { vertical: "bottom", horizontal: "left" },
            transformOrigin: { vertical: "top", horizontal: "left" },
            slotProps: {
              paper: {
                sx: {
                  maxHeight: 350,
                  borderRadius: 2,
                  "& ul": { display: "flex", flexDirection: "column", gap: 0.5, p: 1 },
                },
              },
            },
          },
        },
      }}
    >
      {filterOptions.map(({ value, icon, label, description }) => (
        <MenuItem key={value} value={value} sx={{ p: 1, m: 0, borderRadius: 1.5, transition: "none" }} dense>
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
            <Box sx={{ color: filter === value ? "text.colored" : "text.secondary" }}>{icon}</Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" gutterBottom>
                {label}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {description}
              </Typography>
            </Box>
          </Box>
        </MenuItem>
      ))}
    </TextField>
  );
};

export { SearchFilter };
