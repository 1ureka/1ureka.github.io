import { Box, Divider, type SxProps } from "@mui/material";
import { AppWrapper } from "@/youtube-parser/components/AppWrapper";
import { FormSection } from "@/youtube-parser/components/InputSection";
import { ThumbnailSection } from "@/youtube-parser/components/ThumbnailSection";
import { InfoSection } from "@/youtube-parser/components/InfoSection";

/** App 頁面佈局用的 CSS class 名稱 */
const classNames = {
  layout: "app-layout",
  infoPanel: "app-info-panel",
  infoPanelDivider: "app-info-panel-divider",
};

/** 根佈局樣式：滿版置中、雙欄 grid（lg 以上）、左側資訊面板 + 右側縮圖面板 */
const style: SxProps = {
  height: "100vh",
  overflow: "auto",
  px: 2,
  py: 4,
  display: "grid",
  placeItems: "center",

  [`& .${classNames.layout}`]: {
    display: "grid",
    gridTemplateColumns: { md: "1fr", lg: "1fr 1fr" },
    gap: 2,
    width: 1,
    maxWidth: 1600,
  },

  [`& .${classNames.infoPanel}`]: {
    display: "flex",
    flexDirection: "column",
    gap: 2.5,
    borderRadius: 2,
    bgcolor: "background.paper",
    border: "2px solid",
    borderColor: "border.main",
    p: 3,
  },

  [`& .${classNames.infoPanelDivider}`]: {
    borderBottomWidth: 2,
  },
};

/** 頁面主要佈局：左欄為表單 + 影片資訊，右欄為縮圖展示 */
const Layout = () => (
  <Box sx={style}>
    <div className={classNames.layout}>
      <div className={classNames.infoPanel}>
        <FormSection />
        <Divider flexItem className={classNames.infoPanelDivider} />
        <InfoSection />
      </div>
      <ThumbnailSection />
    </div>
  </Box>
);

const App = () => (
  <AppWrapper>
    <Layout />
  </AppWrapper>
);

export default App;
