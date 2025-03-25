import { IconButton, ListItemIcon, MenuItem, MenuList, Popover, styled, Typography } from "@mui/material";
import { Avatar, BottomNavigationAction, Box, Button, CircularProgress, Divider, SwipeableDrawer } from "@mui/material";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { useState } from "react";
import { useSession, useSessionActions } from "@/forum/hooks/session";
import { routes } from "@/forum/utils/routes";

const AccountMenuList = ({ onItemClick }: { onItemClick: () => void }) => {
  const [loading, setLoading] = useState(false);
  const { logout } = useSessionActions();
  const handleLogout = () => {
    setLoading(true);
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

      <MenuItem onClick={handleLogout} disabled={loading}>
        <ListItemIcon>
          <LogoutRoundedIcon />
        </ListItemIcon>
        {loading ? "登出中..." : "登出"}
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
        <Button variant="outlined" color="inherit" startIcon={<LoginRoundedIcon />} href={routes.login}>
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

const Puller = styled("div")(({ theme }) => ({
  height: 30,
  width: 6,
  backgroundColor: theme.palette.divider,
  borderRadius: 3,
  position: "absolute",
  left: 8,
  top: "calc(50% - 15px)",
  ...theme.applyStyles("dark", {
    backgroundColor: theme.palette.divider,
  }),
}));

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
          showLabel
          label={user.name}
          onClick={handleOpen}
          icon={
            <Avatar sx={{ bgcolor: "primary.main", width: "2rem", height: "2rem", color: "primary.contrastText" }}>
              {user.name.slice(0, 1).toUpperCase()}
            </Avatar>
          }
        />
      ) : (
        <BottomNavigationAction showLabel label="登入" icon={<LoginRoundedIcon />} href={routes.login} />
      )}

      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        slotProps={{ paper: { sx: { width: 240 } } }}
      >
        <Puller />

        <Box sx={{ p: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="h6">帳戶</Typography>
          <IconButton onClick={handleClose}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        <AccountMenuList onItemClick={handleClose} />
      </SwipeableDrawer>
    </>
  );
};

export { AccountMenuDesktop, AccountMenuMobile };
