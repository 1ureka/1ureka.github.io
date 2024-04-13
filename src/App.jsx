import { CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { redirect, useBeforeUnload } from "react-router-dom";
import { useRecoilValue } from "recoil";
import * as React from "react";

import Home from "./pages/Home/Home";
import Album from "./pages/Album/Album";
import Login from "./pages/Login/Login";
import Manager from "./pages/Manager/Manager";
import NotFound from "./pages/NotFound/NotFound";

import { darkTheme, lightTheme } from "./utils/theme";
import { THEME } from "./utils/store";
import { delay } from "./utils/utils";

const isAuth = async () => {
  await delay(10);
  return sessionStorage.getItem("auth");
};

const authLoader = async () => {
  const auth = await isAuth();
  if (!auth) return redirect("/login");
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "/album",
    element: <Album />,
    loader: authLoader,
  },
  {
    path: "/manager",
    element: <Manager />,
    loader: authLoader,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default function App() {
  console.log("render App");

  const theme = useRecoilValue(THEME);

  const handleBeforeUnload = React.useCallback(() => {
    sessionStorage.clear();
  }, []);

  useBeforeUnload(handleBeforeUnload);

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
