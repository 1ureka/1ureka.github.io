import * as React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Stack, CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { redirect, useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { HINTS, THEME } from "./utils/store";
import { decode, delay } from "./utils/utils";

import Sidebar from "./components/sidebar/Sidebar";
import Cover from "./page/cover/Cover";
import Books from "./page/books/Books";
import Snackbars from "./components/generic/Snackbars";

const coverLoader = async () => {
  const image = new Image();
  image.src = "./PJ28-2 とびら-1.webp";
  await decode(image);
  return true;
};

const authLoader = async () => {
  await delay(10);
  if (sessionStorage.getItem("auth")) return null;
  return redirect(`/?fail${Date.now()}`);
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
        element: "",
        loader: authLoader,
      },
    ],
  },
]);

function Outlet() {
  const outlet = useOutlet();
  const { pathname, search } = useLocation();

  const firstTime = React.useRef(Date.now());
  const setMessageQuene = useSetRecoilState(HINTS);
  React.useEffect(() => {
    if (Math.abs(Date.now() - firstTime.current) <= 500) return;

    if (search.startsWith("?fail")) {
      const item = { message: "Unlock To Explore", key: Date.now() };
      setMessageQuene((prev) => [...prev, item]);
    }
  }, [search, setMessageQuene]);

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
      <Snackbars />
    </Stack>
  );
}

export default function App() {
  const theme = useRecoilValue(THEME);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
