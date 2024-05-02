import * as React from "react";
import { useRecoilValue } from "recoil";
import { Stack, CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useBeforeUnload, useLocation, useOutlet } from "react-router-dom";
import { redirect } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { THEME } from "./utils/store";
import { decode, delay } from "./utils/utils";

import Sidebar from "./components/sidebar/Sidebar";
import Cover from "./page/cover/Page";
import Books from "./page/books/Page";
import Tools from "./page/tool/Page";

const coverLoader = async () => {
  const image = new Image();
  image.src = "./PJ28-2 とびら-1.webp";
  await decode(image);
  return true;
};

const authLoader = async () => {
  await delay(10);
  if (sessionStorage.getItem("auth")) return null;
  return redirect(`/`);
};

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        index: true,
        element: <Cover />,
        loader: coverLoader,
      },
      {
        path: "books",
        element: <Books />,
        loader: authLoader,
      },
      {
        path: "tools",
        element: <Tools />,
        loader: authLoader,
      },
    ],
  },
]);

function Outlet() {
  const outlet = useOutlet();
  const { pathname } = useLocation();

  const key = React.useMemo(() => {
    return pathname + Date.now();
  }, [pathname]);

  return (
    <AnimatePresence mode="wait" initial={true}>
      {outlet && React.cloneElement(outlet, { key })}
    </AnimatePresence>
  );
}

function Root() {
  const theme = useRecoilValue(THEME);

  const containerSx = {
    position: "absolute",
    inset: 0,
    backgroundColor: theme.palette.custom.background,
  };

  return (
    <Stack direction={"row"} sx={containerSx}>
      <Sidebar />
      <Outlet />
    </Stack>
  );
}

export default function App() {
  const theme = useRecoilValue(THEME);

  const handleBeforeUnload = React.useCallback(() => {
    sessionStorage.clear();
  }, []);

  useBeforeUnload(handleBeforeUnload);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
