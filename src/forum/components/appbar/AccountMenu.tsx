import { IconButton, ListItemIcon, MenuItem, MenuList, Popover, styled, Typography } from "@mui/material";
import { BottomNavigationAction, Box, Button, CircularProgress, Divider, SwipeableDrawer } from "@mui/material";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { useState } from "react";
import { useSession, useLogout } from "@/forum/hooks/session";
import { routes } from "@/routes";
import { UserAvatar } from "../userElement/UserAvatar";
import type { FetchUserByNameResult } from "@/forum/data/user";
import { AccountSettings } from "../auth/AccountSettings";

const AccountMenuList = ({ onItemClick, user }: { onItemClick: () => void; user: FetchUserByNameResult }) => {
  const { mutate: logout, isPending } = useLogout();
  const handleLogout = () => {
    logout();
    onItemClick();
  };

  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    onItemClick();
  };

  return (
    <MenuList dense>
      <MenuItem href={`${routes.forum_users}?user=${user.name}`} component="a">
        <ListItemIcon>
          <PersonRoundedIcon />
        </ListItemIcon>
        個人檔案
      </MenuItem>

      <MenuItem onClick={handleOpenDialog} className="account-settings-button">
        <ListItemIcon>
          <ManageAccountsRoundedIcon />
        </ListItemIcon>
        設定
      </MenuItem>
      <AccountSettings open={openDialog} user={{ email: "", ...user }} onClose={handleCloseDialog} />

      <Divider />

      <MenuItem onClick={handleLogout} disabled={isPending}>
        <ListItemIcon>
          <LogoutRoundedIcon />
        </ListItemIcon>
        {isPending ? "登出中..." : "登出"}
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
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<AccountCircleRoundedIcon />}
          onClick={handleOpen}
          sx={{ textTransform: "none", borderRadius: 2 }}
        >
          {user.name}
        </Button>
      ) : (
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<LoginRoundedIcon />}
          href={routes.forum_login}
          sx={{ borderRadius: 2 }}
        >
          登入
        </Button>
      )}

      {authenticated && (
        <Popover
          anchorEl={anchorEl}
          anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
          transformOrigin={{ horizontal: "center", vertical: "top" }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          keepMounted
        >
          <AccountMenuList onItemClick={handleClose} user={user} />
        </Popover>
      )}
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
          icon={<UserAvatar name={user.name} sx={{ color: "primary.contrastText" }} />}
        />
      ) : (
        <BottomNavigationAction showLabel label="登入" icon={<LoginRoundedIcon />} href={routes.forum_login} />
      )}

      {authenticated && (
        <SwipeableDrawer
          anchor="right"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          slotProps={{ paper: { sx: { width: 240 } } }}
          keepMounted
        >
          <Puller />

          <Box sx={{ p: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="h6">帳戶</Typography>
            <IconButton onClick={handleClose}>
              <CloseRoundedIcon />
            </IconButton>
          </Box>

          <AccountMenuList onItemClick={handleClose} user={user} />
        </SwipeableDrawer>
      )}
    </>
  );
};

export { AccountMenuDesktop, AccountMenuMobile };
