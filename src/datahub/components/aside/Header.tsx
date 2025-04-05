import { Box, Breadcrumbs, Menu, MenuItem, Typography } from "@mui/material";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import { useState } from "react";
import { useUrl } from "@/datahub/hooks/url";

import { HeaderBackground } from "./HeaderBackground";
import { HomeHeader } from "../home/HomeHeader";
import { SchemaHeader } from "../schema/SchemaHeader";

type ValidPart = "home" | "schema";

const titleMap: Record<ValidPart, string> = {
  home: "概覽",
  schema: "結構",
};

const elementsMap: Record<ValidPart, React.ReactNode | null> = {
  home: <HomeHeader />,
  schema: <SchemaHeader />,
};

const isValidPart = (part: string): part is ValidPart => {
  return Object.keys(titleMap).includes(part);
};

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl((prev) => (prev ? null : event.currentTarget));
  const handleClose = () => setAnchorEl(null);

  const { updateSearchParams, searchParams, hash } = useUrl();
  const createHandleDbClick = (dbName: string) => () => {
    updateSearchParams({ db: dbName });
    setAnchorEl(null);
  };

  const parts = hash.getParts();
  const part1 = parts[0] || "home";

  if (!isValidPart(part1) || parts.length > 1) {
    throw new Error(`頁面不存在: ${hash.get()}`);
  }

  return (
    <Box
      sx={{
        position: "relative",
        p: 5,
        overflow: "hidden",
        borderRadius: 4,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      }}
    >
      <HeaderBackground />

      <Box sx={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <Box>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <DnsRoundedIcon fontSize="small" sx={{ color: "text.secondary" }} />
            <Breadcrumbs>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                資料庫
              </Typography>
              <Typography
                variant="body2"
                sx={{ "&:hover": { textDecoration: "underline" }, cursor: "pointer", color: "text.primary" }}
                onClick={handleOpen}
              >
                論壇資料庫
              </Typography>
            </Breadcrumbs>

            <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose}>
              <MenuItem onClick={handleClose} selected={(searchParams.get("db") || "forum") === "forum"}>
                <Typography variant="body2" sx={{ color: "text.primary" }} onClick={createHandleDbClick("forum")}>
                  論壇資料庫
                </Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Typography variant="h4" component="h2" sx={{ pt: 1.5 }}>
            {titleMap[part1]}
          </Typography>
        </Box>

        {elementsMap[part1]}
      </Box>
    </Box>
  );
};

export { Header };
