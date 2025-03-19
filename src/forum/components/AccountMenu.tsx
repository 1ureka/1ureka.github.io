import { useState } from "react";
import { Avatar, Button, Divider, IconButton, ListItemIcon, MenuItem, MenuList, Popover } from "@mui/material";
import type { PopoverProps } from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { useSession } from "../utils/session";

const AccountMenu = ({
  mobile,
  slotsProps,
}: {
  mobile?: boolean;
  slotsProps?: { popover?: Partial<PopoverProps> };
}) => {
  const { user } = useSession();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const onClose = () => setAnchorEl(null);

  return (
    <>
      {mobile ? (
        <IconButton onClick={handleClick} edge="end" size="small">
          <Avatar sx={{ bgcolor: "primary.main", width: "2rem", height: "2rem" }}>
            {user.name.slice(0, 1).toUpperCase()}
          </Avatar>
        </IconButton>
      ) : (
        <Button variant="outlined" color="inherit" startIcon={<AccountCircleRoundedIcon />} onClick={handleClick}>
          {user.name}
        </Button>
      )}

      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
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
