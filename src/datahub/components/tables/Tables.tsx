import { useEffect, useState } from "react";
import { useObjects, useTableInfo } from "@/datahub/hooks/read";
import {
  Box,
  Checkbox,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Popover,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import { useUrl } from "@/datahub/hooks/url";
import type { TableColumnInfo } from "@/datahub/data/read";

const smSpace = { xs: 0.5, sm: 1 };
const mdSpace = { xs: 1, md: 1.5 };
const width = "18rem";

const TableSelectLoading = () => (
  <Box sx={{ position: "relative" }}>
    <TextField
      size="small"
      variant="filled"
      sx={{ width }}
      disabled
      slotProps={{
        input: {
          sx: {
            borderRadius: 1,
            overflow: "hidden",
            "&::before": { borderBottom: 0 },
            "&:hover:not(.Mui-disabled, .Mui-error):before": { borderBottom: 0 },
            "& input": { p: smSpace },
          },
        },
      }}
    />
    <Box sx={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: "text.secondary" }}>
      <CircularProgress color="inherit" size={16} />
    </Box>
  </Box>
);

const useSelectedTable = () => {
  const { data, isFetching } = useObjects({ types: ["table", "view"] });
  const { searchParams, updateSearchParams } = useUrl();
  const value = searchParams.get("table") ?? null;

  const findIndexByName = (value: string) => {
    if (!data) return 0;
    const index = data.findIndex(({ name }) => name === value);
    return index !== -1 ? index : 0;
  };

  const [index, setIndex] = useState<number>(0);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!data) return;
    updateSearchParams({ table: data[findIndexByName(event.target.value)].name });
  };

  // 載入data完成後的初始化 + 之後路由更動時的更新
  useEffect(() => {
    if (!data) return;
    setIndex(findIndexByName(value ?? data[0].name));
  }, [value, data]);

  return { data, selected: data ? data[index] : null, handleChange, isFetching };
};

const TableSelect = () => {
  const { data, selected, handleChange, isFetching } = useSelectedTable();

  if (!data || !selected || isFetching) return <TableSelectLoading />;

  return (
    <TextField
      select
      value={selected.name}
      onChange={handleChange}
      size="small"
      variant="filled"
      sx={{ width }}
      slotProps={{
        select: {
          IconComponent: ArrowDropDownRoundedIcon,
          MenuProps: { slotProps: { paper: { sx: { maxHeight: 350 } } }, elevation: 3 },
        },
        input: {
          sx: {
            borderRadius: 1,
            overflow: "hidden",
            "&::before": { borderBottom: 0 },
            "&:hover:not(.Mui-disabled, .Mui-error):before": { borderBottom: 0 },
            "& #tables-ias": { color: "text.secondary", m: 0 },
            "& div[role='combobox']": { p: smSpace },
          },
          startAdornment: (
            <InputAdornment position="start" id="tables-ias">
              <Typography
                variant="caption"
                color="inherit"
                sx={{ p: 0.5, borderRadius: 1, bgcolor: "divider", textTransform: "uppercase" }}
              >
                {selected.type}
              </Typography>
            </InputAdornment>
          ),
        },
      }}
    >
      <MenuItem dense onClickCapture={(e) => e.stopPropagation()}>
        <AddRoundedIcon fontSize="small" sx={{ mr: 0.5 }} /> 新增資料表
      </MenuItem>
      <Divider />
      {data.map(({ name }, i) => (
        <MenuItem key={i} value={name} dense>
          {name}
        </MenuItem>
      ))}
    </TextField>
  );
};

const FilterFieldsLoading = () => (
  <Tooltip title="篩選欄位" arrow>
    <span style={{ position: "relative" }}>
      <IconButton
        loading
        centerRipple={false}
        size="small"
        sx={{
          bgcolor: "FilledInput.disabledBg",
          "&:hover": { bgcolor: "FilledInput.hoverBg" },
          borderRadius: 1,
          height: 1,
          width: "auto",
          aspectRatio: 1,
        }}
      >
        <FilterAltRoundedIcon fontSize="small" />
      </IconButton>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bgcolor: "FilledInput.disabledBg",
          borderRadius: 1,
          height: 1,
          width: "auto",
          aspectRatio: 1,
        }}
      />
    </span>
  </Tooltip>
);

const FilterFields = ({ columns }: { columns: TableColumnInfo[] }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl((prev) => (prev ? null : event.currentTarget));
  const handleClose = () => setAnchorEl(null);

  const [checked, setChecked] = useState([0]);
  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) newChecked.push(value);
    else newChecked.splice(currentIndex, 1);

    setChecked(newChecked);
  };

  return (
    <>
      <Tooltip title="篩選欄位" arrow>
        <span>
          <IconButton
            onClick={handleOpen}
            centerRipple={false}
            size="small"
            sx={{
              bgcolor: "FilledInput.disabledBg",
              "&:hover": { bgcolor: "FilledInput.hoverBg" },
              borderRadius: 1,
              height: 1,
              width: "auto",
              aspectRatio: 1,
            }}
          >
            <FilterAltRoundedIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        elevation={3}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{ paper: { sx: { maxHeight: 350 } } }}
      >
        <List dense>
          <ListItem>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              篩選欄位
            </Typography>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton role={undefined} onClick={handleToggle(0)} dense>
              <Checkbox
                edge="start"
                checked={checked.includes(0)}
                tabIndex={-1}
                disableRipple
                size="small"
                sx={{ py: 0 }}
              />
              <ListItemText primary={"顯示所有"} />
            </ListItemButton>
          </ListItem>

          <Divider sx={{ my: 0.5 }} />

          {columns.map((column, i) => (
            <ListItem key={i} disablePadding>
              <ListItemButton role={undefined} onClick={handleToggle(i + 1)} dense>
                <Checkbox
                  edge="start"
                  checked={checked.includes(i + 1)}
                  tabIndex={-1}
                  disableRipple
                  size="small"
                  sx={{ py: 0 }}
                />
                <ListItemText
                  sx={{ display: "flex", width: 1, gap: smSpace, justifyContent: "space-between", my: 0.5 }}
                  primary={column.name}
                  secondary={column.type.toUpperCase()}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
};

const FilterFieldsWrapper = () => {
  const { selected, isFetching: isFetchingObj } = useSelectedTable();
  const { data: tableInfo, isFetching } = useTableInfo({ types: ["table", "view"] });

  if (isFetching || !tableInfo || isFetchingObj || !selected) return <FilterFieldsLoading />;
  return <FilterFields columns={tableInfo.find(({ table }) => table === selected.name)?.columns ?? []} />;
};

const Tables = () => {
  return (
    <Stack>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "stretch", gap: mdSpace }}>
          <TableSelect />
          <FilterFieldsWrapper />
        </Box>
      </Box>
    </Stack>
  );
};

export default Tables;
