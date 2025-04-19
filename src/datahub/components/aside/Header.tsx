import { Box, Breadcrumbs, Menu, MenuItem, Typography } from "@mui/material";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import { useState } from "react";
import { useUrl } from "@/hooks/url";
import { routes } from "@/routes";

import { HeaderBackground } from "./HeaderBackground";
import { HomeHeader } from "../home/HomeHeader";
import { SchemaHeader } from "../schema/SchemaHeader";

const titleMap = {
  [routes.datahub_home]: "概覽",
  [routes.datahub_schema]: "結構圖",
  [routes.datahub_tables]: "表格檢視",
};

const elementsMap: Record<string, React.ReactNode | null> = {
  [routes.datahub_home]: <HomeHeader />,
  [routes.datahub_schema]: <SchemaHeader />,
  [routes.datahub_tables]: null,
};

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl((prev) => (prev ? null : event.currentTarget));
  const handleClose = () => setAnchorEl(null);

  const { updateSearchParams, searchParams, pathname } = useUrl();
  const createHandleDbClick = (dbName: string) => () => {
    updateSearchParams({ db: dbName });
    setAnchorEl(null);
  };

  if (!(pathname.get() in titleMap)) {
    throw new Error(`頁面不存在: ${pathname.get()}`);
  }

  const title = titleMap[pathname.get()];
  const elements = elementsMap[pathname.get()];

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
            {title}
          </Typography>
        </Box>

        {elements}
      </Box>
    </Box>
  );
};

export { Header };
