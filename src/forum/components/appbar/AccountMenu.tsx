import { IconButton, ListItemIcon, MenuItem, MenuList, Popover, Typography } from "@mui/material";
import { Avatar, BottomNavigationAction, Box, Button, CircularProgress, Divider, Drawer } from "@mui/material";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { useState } from "react";
import { useSession, useSessionActions } from "@/forum/hooks/session";

const AccountMenuList = ({ onItemClick }: { onItemClick: () => void }) => {
  const { logout } = useSessionActions();
  const handleLogout = () => {
    logout();
    onItemClick();
  };

  return (
    <MenuList dense>
      {/* 之後改為 anchor ，直接導航 */}
      <MenuItem onClick={onItemClick}>
        <ListItemIcon>
          <PersonRoundedIcon />
        </ListItemIcon>
        個人檔案
      </MenuItem>

      {/* 之後會打開 dialog */}
      <MenuItem onClick={onItemClick}>
        <ListItemIcon>
          <ManageAccountsRoundedIcon />
        </ListItemIcon>
        設定
      </MenuItem>

      <Divider />

      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <LogoutRoundedIcon />
        </ListItemIcon>
        登出
      </MenuItem>
    </MenuList>
  );
};

const AccountMenuDesktop = () => {
  const { user, loading, authenticated } = useSession();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(anchorEl ? null : event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  if (loading) {
    return (
      <Button variant="outlined" color="inherit" startIcon={<AccountCircleRoundedIcon />} disabled loading={loading}>
        Loading
      </Button>
    );
  }

  return (
    <>
      {authenticated ? (
        <Button variant="outlined" color="inherit" startIcon={<AccountCircleRoundedIcon />} onClick={handleOpen}>
          {user.name}
        </Button>
      ) : (
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<LoginRoundedIcon />}
          href="/src/forum/pages/login/index.html"
        >
          登入
        </Button>
      )}

      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <AccountMenuList onItemClick={handleClose} />
      </Popover>
    </>
  );
};

const AccountMenuMobile = () => {
  const { user, loading, authenticated } = useSession();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (loading) {
    return <BottomNavigationAction showLabel label="帳戶" icon={<CircularProgress size={"2rem"} />} />;
  }

  return (
    <>
      {authenticated ? (
        <BottomNavigationAction
          label={user.name}
          onClick={handleOpen}
          icon={
            <Avatar sx={{ bgcolor: "primary.main", width: "2rem", height: "2rem", color: "primary.contrastText" }}>
              {user.name.slice(0, 1).toUpperCase()}
            </Avatar>
          }
          showLabel
        />
      ) : (
        <BottomNavigationAction
          showLabel
          label="登入"
          icon={<LoginRoundedIcon />}
          href="/src/forum/pages/login/index.html"
        />
      )}

      <Drawer anchor="right" open={open} onClose={handleClose} slotProps={{ paper: { sx: { width: 240 } } }}>
        <Box sx={{ p: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="h6">帳戶</Typography>
          <IconButton onClick={handleClose}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        <AccountMenuList onItemClick={handleClose} />
      </Drawer>
    </>
  );
};

export { AccountMenuDesktop, AccountMenuMobile };
