import * as React from "react";
import { IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import Brightness5Icon from "@mui/icons-material/Brightness4";

import { useSetRecoilState } from "recoil";
import { THEME } from "../utils/store";
import { getSystemTheme } from "../utils/utils";

export default function ThemeControl({ size, direction }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const setTheme = useSetRecoilState(THEME);
  const settings = ["Light", "Dark", "System"];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleClickItems = (target) => {
    setAnchorElUser(null);
    if (target === "System") target = getSystemTheme();
    setTheme(target.toLowerCase());
  };

  return (
    <React.Fragment>
      <Tooltip title="Change Mode">
        <IconButton onClick={handleOpenUserMenu} size={size ? size : "medium"}>
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
