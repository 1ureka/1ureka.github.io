import { Toolbar, AppBar, Divider, useMediaQuery } from "@mui/material";
import { Container, Stack, Avatar } from "@mui/material";
import { Typography, Tooltip, IconButton } from "@mui/material";
import { Tabs, Tab } from "@mui/material";

import Inventory2Icon from "@mui/icons-material/Inventory2";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import ThemeControl from "../../components/ThemeControl";

import { useRecoilValue } from "recoil";
import { HOME_IS_AUTH, HOME_PAGE } from "../../utils/store";
import { useNavigateTo } from "../../utils/hooks";
import { useScrollTo } from "./useScrollTo";

const profileImage = "/favicon.png";

function Title({ sx }) {
  const homePage = useRecoilValue(HOME_PAGE);
  const isTop = homePage === 0;

  return (
    <Stack spacing={1} direction={"row"} alignItems="center" sx={sx}>
      <Avatar
        src={profileImage}
        sx={{
          width: 70,
          height: 70,
          translate: "0px -7px",
          transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          filter: isTop
            ? "drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.5)) drop-shadow(4px 4px 1px rgba(0, 0, 0, 0.35))"
            : "drop-shadow(2px 2px 1px rgba(0, 0, 0, 0)) drop-shadow(4px 4px 1px rgba(0, 0, 0, 0))",
        }}
      />
      <Stack direction={"column"}>
        <Typography
          variant="h5"
          component="h1"
          sx={{
            mr: 2,
            fontFamily: "Comfortaa",
            fontWeight: 700,
            textDecoration: "none",
            color: isTop ? "white" : "text.primary",
          }}
        >
          {"1ureka's CG"}
        </Typography>
      </Stack>
    </Stack>
  );
}

function Navigation() {
  const homePage = useRecoilValue(HOME_PAGE);

  const isTop = homePage === 0;
  const tabSX = {
    color: isTop ? "white" : "text.primary",
    transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    "&:hover": { backgroundColor: "divider" },
  };

  const list = ["Intro", "Scene", "Props"];
  const value = list[homePage];
  const scrollTo = useScrollTo();
  const handleChange = (_, val) => {
    scrollTo((current) => {
      const target = list.indexOf(val);
      const direction = target - current > 0 ? 1 : -1;
      return { target, direction };
    });
  };

  return (
    <Tabs value={value} onChange={handleChange} sx={{ flexGrow: 1 }}>
      <Tab label="Intro" sx={tabSX} value={"Intro"} />
      <Tab label="Scene" sx={tabSX} value={"Scene"} />
      <Tab label="Props" sx={tabSX} value={"Props"} />
    </Tabs>
  );
}

function Tools({ sx }) {
  const isAuth = useRecoilValue(HOME_IS_AUTH);
  const navigate1 = useNavigateTo("/manager");
  const navigate2 = useNavigateTo("/login");

  const homePage = useRecoilValue(HOME_PAGE);
  const isTop = homePage === 0;

  return (
    <Stack sx={{ flexGrow: 0, ...sx }} direction="row" spacing={0.5}>
      {isAuth ? (
        <Tooltip title="Manage Files">
          <IconButton onClick={navigate1} color={isTop ? "inherit" : "default"}>
            <Inventory2Icon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Sign In">
          <IconButton onClick={navigate2} color={isTop ? "inherit" : "default"}>
            <LoginRoundedIcon />
          </IconButton>
        </Tooltip>
      )}
      <ThemeControl color={isTop ? "inherit" : "default"} />
    </Stack>
  );
}

export default function Header() {
  const matche1 = useMediaQuery("(min-width:1050px)");
  const matche2 = useMediaQuery("(min-width:850px)");

  const homePage = useRecoilValue(HOME_PAGE);
  const isTop = homePage === 0;

  return (
    <AppBar
      position="absolute"
      sx={{
        color: isTop ? "white" : "inherit",
        py: 1.5,
        px: matche1 ? 12 : 0,
        transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        backdropFilter: isTop ? "blur(0px)" : " blur(10px)",
        backgroundColor: isTop ? "appBarHide" : "appBar",
        boxShadow: isTop
          ? "0px 0px 1px -1px rgba(0,0,0,0),0px 1px 1px 0px rgba(0,0,0,0),0px 1px 3px 0px rgba(0,0,0,0)"
          : "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
      }}
      elevation={0}
    >
      <Container maxWidth="xl">
        {matche2 ? (
          <Toolbar>
            <Title />
            <Divider orientation="vertical" flexItem sx={{ mx: 1.5 }}></Divider>
            <Navigation />
            <Tools />
          </Toolbar>
        ) : (
          <Toolbar>
            <Tooltip title="Navigate">
              <IconButton>
                <MenuOpenRoundedIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Title sx={{ flexGrow: 1, justifyContent: "center" }} />
            <Tools sx={{ flexDirection: "column" }} />
          </Toolbar>
        )}
      </Container>
    </AppBar>
  );
}
