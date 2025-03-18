import { useState } from "react";
import { Avatar, Button, Divider, IconButton, ListItemIcon, MenuItem, MenuList, Popover } from "@mui/material";
import type { PopoverProps } from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

const AccountMenu = ({
  user,
  mobile,
  slotsProps,
}: {
  user: string;
  mobile?: boolean;
  slotsProps?: { popover?: Partial<PopoverProps> };
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const onClose = () => setAnchorEl(null);

  return (
    <>
      {mobile ? (
        <IconButton onClick={handleClick} edge="end" size="small">
          <Avatar sx={{ bgcolor: "primary.main", width: "2rem", height: "2rem" }}>
            {user.slice(0, 1).toUpperCase()}
          </Avatar>
        </IconButton>
      ) : (
        <Button variant="outlined" color="inherit" startIcon={<AccountCircleRoundedIcon />} onClick={handleClick}>
          {user}
        </Button>
      )}

      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        open={open}
        onClose={onClose}
        {...slotsProps?.popover}
      >
        <MenuList dense>
          <MenuItem onClick={onClose}>
            <ListItemIcon>
              <PersonRoundedIcon />
            </ListItemIcon>
            個人檔案
          </MenuItem>
          <MenuItem onClick={onClose}>
            <ListItemIcon>
              <ManageAccountsRoundedIcon />
            </ListItemIcon>
            設定
          </MenuItem>
          <Divider />
          <MenuItem onClick={onClose}>
            <ListItemIcon>
              <LogoutRoundedIcon />
            </ListItemIcon>
            登出
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
};

export { AccountMenu };
