import { Box, IconButton } from "@mui/material";
import AssistantRoundedIcon from "@mui/icons-material/AssistantRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import { GithubIcon } from "@/home/components/GithubIcon";
import { ThemeSwitch } from "../ThemeSwitch";
import { lgSpace, mdSpace } from "@/home/utils/commonSx";

const iconButtonProps = { centerRipple: false, sx: { borderRadius: 2 } };

const HeroHeader = () => (
  <Box sx={{ position: "relative", p: mdSpace, px: lgSpace }}>
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <AssistantRoundedIcon color="primary" fontSize="large" />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <ThemeSwitch />

        <IconButton
          {...iconButtonProps}
          href="#projects"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            const search = document.querySelector("#search") as HTMLInputElement | null;
            search?.focus({ preventScroll: true });
          }}
        >
          <SearchRoundedIcon />
        </IconButton>

        <IconButton {...iconButtonProps} href="https://github.com/1ureka" target="_blank" rel="noopener noreferrer">
          <GithubIcon />
        </IconButton>
      </Box>
    </Box>
  </Box>
);

export { HeroHeader };
