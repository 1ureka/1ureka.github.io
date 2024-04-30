import * as React from "react";
import { useRecoilValue } from "recoil";
import { Stack, CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { redirect, useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { THEME } from "./utils/store";
import { decode, delay } from "./utils/utils";
import Sidebar from "./components/sidebar/Sidebar";

import Cover from "./page/cover/Cover";
import Books from "./page/books/Books";

const isAuth = async () => {
  await delay(10);
  return true;
  // return sessionStorage.getItem("auth");
};

const authLoader = async () => {
  const auth = await isAuth();
  if (!auth) return redirect("/");
  return null;
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

function AnimatedOutlet() {
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
      <AnimatedOutlet />
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
