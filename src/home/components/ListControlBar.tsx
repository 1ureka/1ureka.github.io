import { Box, IconButton, InputAdornment, MenuItem, TextField, useMediaQuery } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SortRoundedIcon from "@mui/icons-material/SortRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

const DesktopBar = () => (
  <Box sx={{ display: "flex", alignItems: "center" }}>
    <TextField
      select
      label="主題"
      variant="outlined"
      size="small"
      defaultValue="all"
      sx={{
        "& .MuiOutlinedInput-notchedOutline": {
          borderRadius: 2,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        },
      }}
      slotProps={{ select: { IconComponent: ExpandMoreRoundedIcon } }}
    >
      <MenuItem value="all" dense>
        全部
      </MenuItem>
      <MenuItem value="web" dense>
        社交
      </MenuItem>
      <MenuItem value="tool" dense>
        工具
      </MenuItem>
    </TextField>

    <TextField
      label="搜尋"
      variant="outlined"
      size="small"
      sx={{
        "& .MuiOutlinedInput-notchedOutline": {
          borderRadius: 2,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        },
      }}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end" sx={{ color: "text.secondary" }}>
              <IconButton edge="end" color="inherit">
                <SearchRoundedIcon />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />

    <Box sx={{ flex: 1 }} />

    <TextField
      select
      label="排序"
      variant="outlined"
      size="small"
      defaultValue="latest"
      sx={{ "& .MuiOutlinedInput-notchedOutline": { borderRadius: 2 } }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start" sx={{ color: "text.secondary" }}>
              <SortRoundedIcon />
            </InputAdornment>
          ),
        },
        select: { IconComponent: ExpandMoreRoundedIcon },
      }}
    >
      <MenuItem value="latest" dense>
        最新
      </MenuItem>
      <MenuItem value="title" dense>
        標題
      </MenuItem>
    </TextField>
  </Box>
);

const MobileBar = () => (
  <Box sx={{ display: "flex", alignItems: "stretch", flexDirection: "column", gap: 1 }}>
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <TextField
        select
        label="主題"
        variant="outlined"
        size="small"
        defaultValue="all"
        fullWidth
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            borderRadius: 2,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
        }}
        slotProps={{ select: { IconComponent: ExpandMoreRoundedIcon } }}
      >
        <MenuItem value="all" dense>
          全部
        </MenuItem>
        <MenuItem value="web" dense>
          社交
        </MenuItem>
        <MenuItem value="tool" dense>
          工具
        </MenuItem>
      </TextField>

      <TextField
        select
        label="排序"
        variant="outlined"
        size="small"
        defaultValue="latest"
        fullWidth
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            borderRadius: 2,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start" sx={{ color: "text.secondary" }}>
                <SortRoundedIcon />
              </InputAdornment>
            ),
          },
          select: { IconComponent: ExpandMoreRoundedIcon },
        }}
      >
        <MenuItem value="latest" dense>
          最新
        </MenuItem>
        <MenuItem value="title" dense>
          標題
        </MenuItem>
      </TextField>
    </Box>

    <TextField
      label="搜尋"
      variant="outlined"
      size="small"
      sx={{ "& .MuiOutlinedInput-notchedOutline": { borderRadius: 2 } }}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end" sx={{ color: "text.secondary" }}>
              <IconButton edge="end" color="inherit">
                <SearchRoundedIcon />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  </Box>
);

export const ListControlBar = () => {
  const isSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  if (isSm) {
    return <DesktopBar />;
  } else {
    return <MobileBar />;
  }
};
