import * as React from "react";
import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import Brightness5Icon from "@mui/icons-material/Brightness4";

import { useRecoilState, useSetRecoilState } from "recoil";
import { THEME, THEME_TOGGLE } from "../utils/store";
import { getSystemTheme } from "../utils/utils";

const settings = ["Light", "Dark", "System"];

export function ThemeToggles() {
  const setTheme = useSetRecoilState(THEME);
  const [value, setValue] = useRecoilState(THEME_TOGGLE);

  const handleChange = (_, val) => {
    if (val) setValue(val);

    if (val === "System") val = getSystemTheme();
    if (val) setTheme(val.toLowerCase());
  };

  return (
    <Stack>
      <Typography variant="button" sx={{ p: 1 }}>
        mode
      </Typography>
      <ToggleButtonGroup
        color="primary"
        value={value}
        exclusive
        onChange={handleChange}
      >
        {settings.map((val) => (
          <ToggleButton key={val} value={val} sx={{ py: 1 }}>
            {val}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
}

export default function ThemeControl({ size, direction, placement, color }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const setTheme = useSetRecoilState(THEME);
  const setToggle = useSetRecoilState(THEME_TOGGLE);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleClickItems = (target) => {
    setAnchorElUser(null);
    setToggle(target);
    if (target === "System") target = getSystemTheme();
    setTheme(target.toLowerCase());
  };

  return (
    <React.Fragment>
      <Tooltip title="Change Mode" placement={placement}>
        <IconButton
          onClick={handleOpenUserMenu}
          size={size ? size : "medium"}
          color={color}
        >
          <Brightness5Icon />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "55px" }}
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: direction ? direction : "top",
          horizontal: "center",
        }}
        keepMounted
        transformOrigin={{
          vertical: direction ? direction : "top",
          horizontal: "center",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={() => handleClickItems(setting)}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
}
