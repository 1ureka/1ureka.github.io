import { atom, selector, selectorFamily } from "recoil";
import { getSystemTheme, loadFile } from "./utils";
import { darkTheme, lightTheme } from "./theme";

//
//
// Global
export const INDEX = atom({
  key: "index",
  default: [{ category: "", name: "" }],
});
export const MODE = atom({
  key: "mode",
  default: "Light",
});
export const THEME = selector({
  key: "theme",
  get: ({ get }) => {
    let mode = get(MODE).toLowerCase();
    if (mode === "system") mode = getSystemTheme();
    const theme = mode === "dark" ? darkTheme : lightTheme;
    return theme;
  },
});
export const AUTH = atom({
  key: "auth",
  default: sessionStorage.getItem("auth"),
});
export const HINTS = atom({
  key: "hints",
  default: [],
});

//
//
// Sidebar
export const SIDEBAR_OPEN = atom({
  key: "sidebarOpen",
  default: false,
});
export const SIDEBAR_SETTING_OPEN = atom({
  key: "sidebarSettingOpen",
  default: false,
});

//
//
// Tabs
export const BOOKS_TAB = atom({
  key: "booksTab",
  default: "scene",
});
export const Tools_TAB = atom({
  key: "toolsTab",
  default: "manager",
});

//
//
// Cover
export const LOGIN_OPEN = atom({
  key: "loginOpen",
  default: false,
});

//
//
// Books
export const BOOKS_SELECTED = atom({
  key: "booksSelected",
  default: 0,
});
export const BOOKS_FILTER = atom({
  key: "booksFilter",
  default: { brightness: 1, contrast: 1, saturate: 1 },
});
export const BOOKS_ROWS = selector({
  key: "booksRows",
  get: ({ get }) => {
    const bookCategory = get(BOOKS_TAB);
    const index = get(INDEX);
    return index.filter(({ category }) => category === bookCategory);
  },
});
export const THUMBNAILS = selectorFamily({
  key: "thumbnails",
  get:
    (name) =>
    async ({ get }) => {
      const category = get(BOOKS_ROWS);
      const base64 = await loadFile(
        `images/${category}/${name}/1K/${name}.webp`
      );
      return `data:image/webp;base64,${base64.replace(/\n/g, "")}`;
    },
});
export const ORIGIN = selectorFamily({
  key: "origin",
  get:
    (name) =>
    async ({ get }) => {
      const category = get(BOOKS_ROWS);
      const base64 = await loadFile(
        `images/${category}/${name}/4K/${name}.webp`
      );
      return `data:image/webp;base64,${base64.replace(/\n/g, "")}`;
    },
});

//
//
// Manager
export const MANAGER_CATEGORY = atom({
  key: "managerCategory",
  default: "scene",
});
export const MANAGER_ROWS = selector({
  key: "managerRows",
  get: async ({ get }) => {
    const managerCategory = get(MANAGER_CATEGORY);
    const index = get(INDEX).filter(
      ({ category }) => category === managerCategory
    );
    const rows = await Promise.all(
      index.map(async ({ category, name }) => {
        const data = await loadFile(`images/${category}/${name}/4K`, true);
        const KB = data[0].size / 1024;
        const size = Math.round((KB + Number.EPSILON) * 100) / 100;
        return { name, size };
      })
    );
    return rows;
  },
});
export const MANAGER_ADDED = atom({
  key: "managerAdded",
  default: 0,
});
export const MANAGER_DELED = atom({
  key: "managerDeleted",
  default: 0,
});

//
//
// Table
export const TABLE_ROWS_LENGTH = selector({
  key: "tableRowsLength",
  get: ({ get }) => {
    const rows = get(MANAGER_ROWS);
    return rows.length;
  },
});
export const TABLE_ORDER = atom({
  key: "tableOrder",
  default: "asc",
});
export const TABLE_ORDER_BY = atom({
  key: "tableOrderBy",
  default: "name",
});
export const TABLE_SELECTED = atom({
  key: "tableSelected",
  default: [],
});
export const TABLE_SELECTED_LENGTH = selector({
  key: "tableSelectedLength",
  get: ({ get }) => {
    const selected = get(TABLE_SELECTED);
    return selected.length;
  },
});
export const TABLE_PAGE = atom({
  key: "tablePage",
  default: 0,
});
export const TABLE_PAGE_ROWS = atom({
  key: "tableRowsPerPage",
  default: 5,
});
