import { lazy, Suspense } from "react";
import { Paper, CircularProgress, Box } from "@mui/material";
import { mdSpace } from "../components/home/commonSx";
import { useUrl } from "../hooks/url";

const LargeTiles = lazy(() =>
  import("../components/home/LargeTiles").then((module) => ({ default: module.LargeTiles }))
);
const SmallTiles = lazy(() =>
  import("../components/home/SmallTiles").then((module) => ({ default: module.SmallTiles }))
);
const SchemaSidebar = lazy(() => import("../components/schema/Sidebar"));
const SchemaFlow = lazy(() => import("../components/schema/Flow"));

type ValidPart = "home" | "schema";

const elementsMap: Record<ValidPart, () => React.ReactNode | null> = {
  home: () => (
    <Box sx={{ p: mdSpace }}>
      <SmallTiles />
      <LargeTiles />
    </Box>
  ),
  schema: () => (
    <Box sx={{ display: "flex", alignItems: "stretch", height: 1 }}>
      <SchemaSidebar />
      <SchemaFlow />
    </Box>
  ),
};

const isValidPart = (part: string): part is ValidPart => {
  return Object.keys(elementsMap).includes(part);
};

const Page = () => {
  const { hash } = useUrl();

  const parts = hash.getParts();
  const part1 = parts[0] || "home";

  if (!isValidPart(part1) || parts.length > 1) {
    throw new Error(`頁面不存在: ${hash.get()}`);
  }

  return (
    <Paper
      sx={{ borderRadius: 4, boxShadow: "none", flex: 1, position: "relative", display: "grid", placeItems: "stretch" }}
    >
      <Suspense
        fallback={
          <Box sx={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
            <CircularProgress />
          </Box>
        }
      >
        {elementsMap[part1]()}
      </Suspense>
    </Paper>
  );
};

export { Page };
