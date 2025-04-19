import { Box, useMediaQuery } from "@mui/material";
import { SearchFilter } from "./SearchFilter";
import { OrderSelect } from "./OrderSelect";
import { SearchBar } from "./SearchBar";

const DesktopBar = () => (
  <Box sx={{ display: "flex", alignItems: "center" }}>
    <SearchFilter position="left" />
    <SearchBar position="right" />
    <Box sx={{ flex: 1 }} />
    <OrderSelect position="mid" />
  </Box>
);

const MobileBar = () => (
  <Box sx={{ display: "flex", alignItems: "stretch", flexDirection: "column", gap: 1 }}>
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <SearchFilter position="left" fullWidth />
      <OrderSelect position="right" fullWidth />
    </Box>
    <SearchBar position="mid" />
  </Box>
);

export const ListControlBar = () => {
  const isSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  if (isSm) return <DesktopBar />;
  else return <MobileBar />;
};
