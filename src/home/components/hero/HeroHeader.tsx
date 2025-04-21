import { Box, IconButton } from "@mui/material";
import AssistantRoundedIcon from "@mui/icons-material/AssistantRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import { GithubIcon } from "@/home/components/GithubIcon";
import { ThemeSwitch } from "../ThemeSwitch";
import { lgSpace, mdSpace } from "@/home/utils/commonSx";

const HeaderIconButton = ({ children }: { children: React.ReactNode }) => (
  <IconButton centerRipple={false} sx={{ borderRadius: 2 }}>
    {children}
  </IconButton>
);

const HeroHeader = () => (
  <Box sx={{ p: mdSpace, px: lgSpace, bgcolor: "coloredBg.main" }}>
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <AssistantRoundedIcon color="primary" fontSize="large" />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <ThemeSwitch />

        <HeaderIconButton>
          <SearchRoundedIcon />
        </HeaderIconButton>

        <HeaderIconButton>
          <GithubIcon />
        </HeaderIconButton>
      </Box>
    </Box>
  </Box>
);

export { HeroHeader };
