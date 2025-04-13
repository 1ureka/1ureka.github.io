import { lazy, Suspense } from "react";
import { Paper, CircularProgress, Box } from "@mui/material";
import { mdSpace, smSpace } from "../components/home/commonSx";
import { useUrl } from "../hooks/url";
import { routes } from "@/routes";

const LargeTiles = lazy(() =>
  import("../components/home/LargeTiles").then((module) => ({ default: module.LargeTiles }))
);
const SmallTiles = lazy(() =>
  import("../components/home/SmallTiles").then((module) => ({ default: module.SmallTiles }))
);
const SchemaSidebar = lazy(() => import("../components/schema/Sidebar"));
const SchemaFlowChart = lazy(() => import("../components/schema/FlowChart"));
const Tables = lazy(() => import("../components/tables/Tables"));

const paperSx = { borderRadius: 4, boxShadow: "none", flex: 1 } as const;

const elementsMap: Record<string, () => React.ReactNode | null> = {
  [routes.datahub_home]: () => (
    <Paper sx={{ ...paperSx, p: mdSpace }}>
      <title>資料樣板</title>
      <SmallTiles />
      <LargeTiles />
    </Paper>
  ),
  [routes.datahub_schema]: () => (
    <Paper sx={{ ...paperSx, position: "relative", overflow: "hidden", display: "flex", alignItems: "stretch" }}>
      <title>資料樣板 | 結構圖</title>
      <SchemaSidebar />
      <SchemaFlowChart />
    </Paper>
  ),
  [routes.datahub_tables]: () => (
    <Paper sx={{ ...paperSx, p: smSpace }}>
      <title>資料樣板 | 表格檢視</title>
      <Tables />
    </Paper>
  ),
};

const LoadingDisplay = () => (
  <Paper sx={{ ...paperSx, position: "relative", display: "grid", placeItems: "stretch" }}>
    <Box sx={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
      <CircularProgress />
    </Box>
  </Paper>
);

const Page = () => {
  const { pathname } = useUrl();

  if (!(pathname.get() in elementsMap)) {
    throw new Error(`頁面不存在: ${pathname.get()}`);
  }

  const elements = elementsMap[pathname.get()];

  return <Suspense fallback={<LoadingDisplay />}>{elements()}</Suspense>;
};

export { Page };
