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

const isAuth = async () => {
  await delay(10);
  return sessionStorage.getItem("auth");
};

const authLoader = async () => {
  const auth = await isAuth();
  if (auth) return null;
  return redirect(`/?fail${Date.now()}`);
};

const coverLoader = async () => {
  const image = new Image();
  image.src = "./PJ28-2 とびら-1.webp";
  await decode(image);
  return true;
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

function useAuthHint() {
  const firstMountTime = React.useRef(Date.now());
  const setMessageQuene = useSetRecoilState(HINTS);
  const { search } = useLocation();

  React.useEffect(() => {
    if (Math.abs(Date.now() - firstMountTime.current) <= 1000) return;
    if (search.startsWith("?fail"))
      setMessageQuene((prev) => [
        ...prev,
        { message: "Unlock To Explore", key: Date.now() },
      ]);
  }, [search, setMessageQuene]);
}

function AnimatedOutlet() {
  const outlet = useOutlet();
  const { pathname } = useLocation();
  useAuthHint();

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
      <AnimatedOutlet />
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
