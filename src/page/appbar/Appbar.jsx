import { useRecoilState, useRecoilValue } from "recoil";
import { ThemeProvider, Backdrop, Paper } from "@mui/material";

import { darkTheme } from "../../utils/theme";
import { APPBAR_IS_AUTH, APPBAR_OPEN } from "../../utils/store";
import { APPBAR_SETTING_OPEN } from "../../utils/store";

import DesktopCollapsed from "./desktop/Collapsed";
import DesktopExpanded from "./desktop/Expanded";
import DesktopSetting from "./desktop/Setting";

export default function Appbar() {
  const [settingOpen, setSettingOpen] = useRecoilState(APPBAR_SETTING_OPEN);
  const [open, setOpen] = useRecoilState(APPBAR_OPEN);
  const isAuth = useRecoilValue(APPBAR_IS_AUTH);

  const containerSx = {
    position: "relative",
    height: "100%",
    py: 3.5,
    px: 1.5,
    borderRadius: 0,
    zIndex: (theme) => theme.zIndex.drawer,
  };

  const backdropSx = {
    backdropFilter: "blur(5px)",
    zIndex: (theme) => theme.zIndex.drawer,
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Backdrop open={open} onClick={() => setOpen(false)} sx={backdropSx} />
      <Paper sx={containerSx}>
        <DesktopSetting open={settingOpen} />
        <DesktopCollapsed
          open={open}
          settingOpen={settingOpen}
          onMenuClick={() => setOpen((prev) => !prev)}
          onSettingClick={() => setSettingOpen((prev) => !prev)}
          isAuth={isAuth}
        />
        <DesktopExpanded open={open} isAuth={isAuth} />
      </Paper>
    </ThemeProvider>
  );
}
