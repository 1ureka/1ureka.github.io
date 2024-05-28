import { useNavigate } from "react-router-dom";
import { Box, Divider, Stack, Typography } from "@mui/material";

import FilterHdrRoundedIcon from "@mui/icons-material/FilterHdrRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";

import { MotionStack } from "../../../components/Motion";
import { sidebarLeftItemVar, sidebarLeftVar } from "../../../components/Motion";

import { MenuButton, SettingButton } from "../../../components/appbar";
import { StyledIconButton } from "../../../components/appbar";

export default function DesktopCollapsed({
  open,
  settingOpen,
  onMenuClick,
  onSettingClick,
  isAuth,
}) {
  const navigate = useNavigate();

  const titleSx = {
    fontWeight: "800",
    rotate: "180deg",
    writingMode: "vertical-rl",
    letterSpacing: "0.3rem",
    my: 3,
  };

  return (
    <MotionStack
      sx={{ height: "100%", alignItems: "center" }}
      spacing={2.5}
      variants={sidebarLeftVar}
      initial="initial"
      animate={open ? ["open", "animate"] : ["close", "animate"]}
    >
      <MenuButton isAuth={isAuth} open={open} onClick={onMenuClick} />

      <Box height={10} />

      <MotionStack variants={sidebarLeftItemVar} alignItems="center">
        <StyledIconButton
          onClick={() => navigate("/")}
          icon={<FilterHdrRoundedIcon sx={{ fontSize: "20px" }} />}
          disabled={!isAuth}
        />
        <Typography sx={{ scale: "0.85", mt: 0.5 }}>Cover</Typography>
      </MotionStack>

      <MotionStack variants={sidebarLeftItemVar} alignItems="center">
        <StyledIconButton
          onClick={() => navigate("books")}
          icon={<BookmarkRoundedIcon sx={{ fontSize: "20px" }} />}
          disabled={!isAuth}
        />
        <Typography sx={{ scale: "0.85", mt: 0.5 }}>Books</Typography>
      </MotionStack>

      <Stack sx={{ flexGrow: 1, width: "100%" }} spacing={2.5}>
        <Divider flexItem />
        <Stack alignItems="center" sx={{ flexGrow: 1 }}>
          <Divider
            orientation="vertical"
            sx={{ flexGrow: 1, height: "auto" }}
          />
          <Typography sx={titleSx}>{"1ureka's CG"}</Typography>
          <Divider
            orientation="vertical"
            sx={{ flexGrow: 1, height: "auto" }}
          />
        </Stack>
        <Divider flexItem />
      </Stack>

      <MotionStack variants={sidebarLeftItemVar} alignItems="center">
        <SettingButton onClick={onSettingClick} open={settingOpen} />
      </MotionStack>
    </MotionStack>
  );
}
