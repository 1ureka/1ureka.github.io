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
const SchemaFlowChart = lazy(() => import("../components/schema/FlowChart"));

type ValidPart = "home" | "schema";

const paperSx = { borderRadius: 4, boxShadow: "none", flex: 1 } as const;

const elementsMap: Record<ValidPart, () => React.ReactNode | null> = {
  home: () => (
    <Paper sx={{ ...paperSx, p: mdSpace }}>
      <SmallTiles />
      <LargeTiles />
    </Paper>
  ),
  schema: () => (
    <Paper sx={{ ...paperSx, position: "relative", overflow: "hidden", display: "flex", alignItems: "stretch" }}>
      <title>資料樣板 | 結構圖</title>
      <SchemaSidebar />
      <SchemaFlowChart />
    </Paper>
  ),
};

const isValidPart = (part: string): part is ValidPart => {
  return Object.keys(elementsMap).includes(part);
};

const LoadingDisplay = () => (
  <Paper sx={{ ...paperSx, position: "relative", display: "grid", placeItems: "stretch" }}>
    <Box sx={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
      <CircularProgress />
    </Box>
  </Paper>
);

const Page = () => {
  const { hash } = useUrl();

  const parts = hash.getParts();
  const part1 = parts[0] || "home";

  if (!isValidPart(part1) || parts.length > 1) {
    throw new Error(`頁面不存在: ${hash.get()}`);
  }

  return <Suspense fallback={<LoadingDisplay />}>{elementsMap[part1]()}</Suspense>;
};

export { Page };
