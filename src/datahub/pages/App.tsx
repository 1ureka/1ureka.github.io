import {
  Box,
  ButtonBase,
  Divider,
  FormControlLabel,
  FormHelperText,
  Paper,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import type { BoxProps, IconProps, TooltipProps } from "@mui/material";
import BackupTableRoundedIcon from "@mui/icons-material/BackupTableRounded";
import SummarizeRoundedIcon from "@mui/icons-material/SummarizeRounded";
import HealthAndSafetyRoundedIcon from "@mui/icons-material/HealthAndSafetyRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import TypeSpecimenRoundedIcon from "@mui/icons-material/TypeSpecimenRounded";

// import { routes } from "@/routes";
import { AppWrapper } from "@/datahub/components/AppWrapper";
import { useResponsiveFontSize } from "../utils/theme";
import { AppNotSupported } from "../components/AppError";
import { Appbar, APPBAR_HEIGHT } from "../components/appbar/Appbar";
import { Sidebar } from "../components/sidebar/Sidebar";
import { Header } from "../components/home/Header";
import { TileContent, TileTitle } from "../components/home/TileText";
import { StripedBackground } from "../components/home/StripedBackground";

const lgSpace = { xs: 4, md: 6, xl: 8 };
const mdSpace = { xs: 3, md: 4, xl: 5 };
const smSpace = { xs: 1, md: 2, xl: 3 };
const noSpace = { xs: 0, md: 0, xl: 0 };

const tileIconCommonSx: IconProps["sx"] = {
  color: "background.paper",
  bgcolor: "primary.main",
  borderRadius: 1,
  p: 1,
  fontSize: "3rem",
};

const smallTileCommonSx: BoxProps["sx"] = {
  display: "flex",
  alignItems: "center",
  gap: mdSpace,
} as const;

const ellipsisSx: BoxProps["sx"] = {
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  wordBreak: "break-all",
} as const;

const underlineSx: BoxProps["sx"] = {
  "&:hover": { textDecoration: "underline" },
  cursor: "pointer",
} as const;

const TileTooltip = ({ children, ...props }: TooltipProps) => {
  return (
    <Tooltip followCursor slotProps={{ transition: { timeout: { appear: 250, enter: 250, exit: 0 } } }} {...props}>
      {children}
    </Tooltip>
  );
};

const SmallTiles = () => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "grid",
        gap: lgSpace,
        gridTemplateColumns: { xs: "repeat(6, 1fr)", lg: "repeat(3, 1fr)" },
      }}
    >
      <Box sx={{ gridColumn: { xs: "span 4", lg: "auto" }, ...smallTileCommonSx }}>
        <BackupTableRoundedIcon sx={tileIconCommonSx} />

        <Box sx={{ display: "flex", gap: smSpace }}>
          <Stack sx={{ alignItems: "flex-start" }}>
            <TileTitle>資料庫大小</TileTitle>
            <TileContent sx={{ textWrap: "nowrap" }}>1,234 Bytes</TileContent>
          </Stack>

          <Divider flexItem orientation="vertical" />

          <Stack sx={{ alignItems: "flex-start" }}>
            <TileTitle>資料表總數</TileTitle>
            <TileContent>8</TileContent>
          </Stack>

          <Divider flexItem orientation="vertical" />

          <Stack sx={{ alignItems: "flex-start" }}>
            <TileTitle>檢視表總數</TileTitle>
            <TileContent>6</TileContent>
          </Stack>
        </Box>
      </Box>

      <Box sx={{ gridColumn: { xs: "1 / span 4", lg: "auto" }, ...smallTileCommonSx }}>
        <SummarizeRoundedIcon sx={tileIconCommonSx} />

        <Box sx={{ display: "flex", gap: smSpace }}>
          <Stack sx={{ alignItems: "flex-start" }}>
            <TileTitle>總紀錄數</TileTitle>
            <TileContent sx={{ textWrap: "nowrap" }}>1,234</TileContent>
          </Stack>

          <Divider flexItem orientation="vertical" />

          <Stack sx={{ alignItems: "flex-start" }}>
            <TileTitle>最多紀錄的資料表</TileTitle>
            <TileTooltip title={<Typography>comments_interactions</Typography>}>
              <TileContent sx={underlineSx}>comments_interactions</TileContent>
            </TileTooltip>
          </Stack>
        </Box>
      </Box>

      <Box
        sx={{ gridRow: { xs: "1", lg: "auto" }, gridColumn: { xs: "5 / span 2", lg: "auto" }, ...smallTileCommonSx }}
      >
        <HealthAndSafetyRoundedIcon sx={tileIconCommonSx} />

        <Stack sx={{ alignItems: "flex-start" }}>
          <TileTitle>潛在問題</TileTitle>
          <TileContent sx={{ textWrap: "nowrap", color: "warning.main", display: "inline-block", ...underlineSx }}>
            2
            <OpenInNewRoundedIcon fontSize="small" sx={{ verticalAlign: "middle", ml: 0.5 }} />
          </TileContent>
        </Stack>
      </Box>
    </Box>
  );
};

const recordsPercents = [81.6, 46.9, 40.8, 25.5, 5.1]; // 相對於前五筆總數的百分比 * 2

const LargeTiles = () => {
  return (
    <Box
      sx={{
        position: "relative",
        mt: lgSpace,
        display: "grid",
        gap: lgSpace,
        gridTemplateColumns: { xs: "1fr", ml: "repeat(2, 1fr)" },
        width: 1,
      }}
    >
      {/* Chart 1 */}
      <Stack sx={{ aspectRatio: { xs: "2/1", ml: "2/1.2" }, borderTop: "1px solid", borderColor: "divider" }}>
        <Box sx={{ display: "flex", gap: smSpace, justifyContent: "space-between", alignItems: "center", p: smSpace }}>
          <Typography variant="h5" component="h3">
            紀錄數
          </Typography>

          <ButtonBase sx={{ "&:hover": { bgcolor: "action.hover" }, p: 1, pr: 0, borderRadius: 1 }}>
            <Typography sx={{ color: "text.secondary" }}>前 5 筆</Typography>
            <ArrowDropDownRoundedIcon sx={{ color: "text.secondary" }} />
          </ButtonBase>
        </Box>

        <Box
          sx={{
            position: "relative",
            flex: 1,
            display: "flex",
            gap: smSpace,
            p: smSpace,
            py: noSpace,
            justifyContent: "space-around",
            alignItems: "stretch",
          }}
        >
          {[...Array(5)].map((_, i) => (
            <TileTooltip
              key={i}
              title={
                <Box>
                  <Typography variant="subtitle2">table_name_{i + 1}</Typography>
                  <Typography>{Math.round((recordsPercents[i] * 100) / 20)} 筆紀錄</Typography>
                </Box>
              }
            >
              <Box
                sx={{
                  position: "relative",
                  flex: 1,
                  borderRadius: 2,
                  overflow: "clip",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": { bgcolor: "action.hover", "& .bar-content": { opacity: 1 } },
                }}
              >
                <StripedBackground color1="divider" color2="#fff0" angle={-20} stripeWidth={5} />
                <Box
                  sx={{
                    position: "absolute",
                    inset: `${100 - recordsPercents[i]}% 0 0 0`,
                    borderRadius: 2,
                    overflow: "hidden",
                    bgcolor: "background.paper",
                  }}
                >
                  <Box
                    className="bar-content"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      bgcolor: "primary.main",
                      opacity: i === 0 ? 0.9 : 0.65,
                      transition: "all 0.2s ease-in-out",
                    }}
                  />
                </Box>
              </Box>
            </TileTooltip>
          ))}
          <Box
            sx={{
              position: "absolute",
              inset: `0 0 ${recordsPercents.reduce((a, b) => a + b, 0) / recordsPercents.length}% 0`,
              borderBottom: "4px dashed",
              borderColor: "divider",
              pointerEvents: "none",
              mx: smSpace,
              scale: "1.02 1",
              "&:before": {
                content: '"平均 136"',
                position: "absolute",
                right: 0,
                bottom: 0,
                fontSize: "1rem",
                color: "text.secondary",
                opacity: 0.75,
              },
            }}
          />
        </Box>

        <Box sx={{ display: "flex", gap: smSpace, p: smSpace, justifyContent: "space-around", alignItems: "center" }}>
          {[...Array(5)].map((_, i) => (
            <TileTooltip key={i} title={<Typography>table_name_{i + 1}</Typography>}>
              <Typography variant="body1" component="p" sx={{ color: "text.secondary", ...underlineSx, ...ellipsisSx }}>
                table_name_{i + 1}
              </Typography>
            </TileTooltip>
          ))}
        </Box>
      </Stack>

      {/* Chart 2 */}
      <Stack sx={{ aspectRatio: { xs: "2/1", ml: "2/1.2" }, borderTop: "1px solid", borderColor: "divider" }}>
        <Box
          sx={{ display: "flex", gap: smSpace, justifyContent: "space-between", alignItems: "flex-start", p: smSpace }}
        >
          <Stack sx={{ gap: 1 }}>
            <TileTitle>最常使用的型別</TileTitle>
            <TileContent variant="h4" sx={{ textTransform: "uppercase" }}>
              text
            </TileContent>
          </Stack>

          <TypeSpecimenRoundedIcon sx={tileIconCommonSx} />
        </Box>

        <Box sx={{ flex: 1 }} />

        <Box sx={{ display: "flex", gap: mdSpace, p: smSpace, mx: smSpace, alignItems: "center" }}>
          {[...Array(3)].map((_, i) => (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }} key={i}>
              <Box sx={{ borderRadius: 99, width: "1rem", height: "1rem", bgcolor: "primary.main" }} />
              <Typography variant="body1" component="p" sx={{ color: "text.secondary", ...ellipsisSx }}>
                type_{i + 1}
              </Typography>
            </Box>
          ))}
        </Box>
      </Stack>

      {/* Chart 3 */}
      <Box sx={{ aspectRatio: { xs: "2/1", ml: "2/1.2" }, borderTop: "1px solid", borderColor: "divider" }} />

      {/* Chart 4 */}
      <Stack sx={{ aspectRatio: { xs: "2/1", ml: "2/1.2" }, borderTop: "1px solid", borderColor: "divider" }}>
        <Box
          sx={{ display: "flex", gap: smSpace, justifyContent: "space-between", alignItems: "flex-start", p: smSpace }}
        >
          <Typography variant="h5" component="h3">
            使用的欄位名稱
          </Typography>

          <Stack sx={{ alignItems: "flex-end" }}>
            <FormControlLabel
              control={<Switch />}
              labelPlacement="start"
              label={
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  包含系統欄位
                </Typography>
              }
            />
            <FormHelperText>(id, createdAt, updatedAt, ...)</FormHelperText>
          </Stack>
        </Box>

        <Box sx={{ flex: 1 }} />
      </Stack>
    </Box>
  );
};

function App() {
  const { isSm } = useResponsiveFontSize();

  if (!isSm)
    return (
      <AppWrapper>
        <AppNotSupported />
      </AppWrapper>
    );

  return (
    <AppWrapper>
      <Appbar />

      <Box component="main" sx={{ position: "relative", display: "flex", height: `calc(100dvh - ${APPBAR_HEIGHT}px)` }}>
        <Box sx={{ position: "absolute", inset: 0, bgcolor: "primary.main", opacity: 0.2, pointerEvents: "none" }} />

        <Sidebar />

        <Box sx={{ position: "relative", flex: 1, height: 1, overflow: "auto" }}>
          <Stack sx={{ minHeight: 1, gap: 3, px: 6, pb: 3 }}>
            <Header />

            <Paper sx={{ borderRadius: 4, boxShadow: "none", flex: 1, p: mdSpace }}>
              <SmallTiles />
              <LargeTiles />
            </Paper>
          </Stack>
        </Box>
      </Box>
    </AppWrapper>
  );
}

export default App;
