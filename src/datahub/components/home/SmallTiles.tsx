import { Box, Divider, Stack, Typography } from "@mui/material";
import type { BoxProps } from "@mui/material";
import BackupTableRoundedIcon from "@mui/icons-material/BackupTableRounded";
import SummarizeRoundedIcon from "@mui/icons-material/SummarizeRounded";
import HealthAndSafetyRoundedIcon from "@mui/icons-material/HealthAndSafetyRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

import { TileContent, TileTitle } from "./TileText";
import { TileTooltip } from "./TileTooltip";
import { lgSpace, mdSpace, smSpace, tileIconCommonSx, underlineSx } from "./commonSx";

const smallTileCommonSx: BoxProps["sx"] = {
  display: "flex",
  alignItems: "center",
  gap: mdSpace,
} as const;

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

export { SmallTiles };
