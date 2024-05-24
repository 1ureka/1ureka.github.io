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

//
//
// Sidebar, Tabs
export const SIDEBAR_IS_AUTH = atom({
  key: "sidebarIsAuth",
  default: false,
});
export const SIDEBAR_OPEN = atom({
  key: "sidebarOpen",
  default: false,
});
export const SIDEBAR_SETTING_OPEN = atom({
  key: "sidebarSettingOpen",
  default: false,
});
export const BOOKS_TAB = atom({
  key: "booksTab",
  default: "scene",
});
export const TOOLS_TAB = atom({
  key: "toolsTab",
  default: "manager",
});

//
//
// Books
export const BOOKS_OPEN = atom({
  key: "booksOpen",
  default: false,
});
export const BOOKS_SELECTED = atom({
  key: "booksSelected",
  default: -1,
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
export const BOOKS_FOLD = atom({
  key: "booksFold",
  default: true,
});
export const IMAGES = selectorFamily({
  key: "thumbnails",
  get: (info) => async () => {
    const [category, name, size] = info.split("/");
    const url = `images/${category}/${name}/${size}/${name}.webp`;
    const base64 = await loadFile(url);
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
export const MANAGER_SELECTED = atom({
  key: "managerSelected",
  default: [],
});
export const MANAGER_ORDER = atom({
  key: "managerOrder",
  default: "asc",
});
export const MANAGER_ORDER_BY = atom({
  key: "managerOrderBy",
  default: "name",
});
export const MANAGER_PAGE = atom({
  key: "managerPage",
  default: 0,
});
export const MANAGER_PAGE_ROWS = atom({
  key: "managerRowsPerPage",
  default: 5,
});

//
//
// Editor
export const EDITOR_PROCESSING = atom({
  key: "editorProcessing",
  default: false,
});
export const EDITOR_FILTER = atom({
  key: "editorFilter",
  default: { saturate: 1, contrast: 1, exposure: 1 },
});
export const EDITOR_OUTPUT = atom({
  key: "editorOutput",
  default: { maxSize: 999, scale: 1, type: "webp" },
});
/** @type {import('recoil').RecoilState<{selected: Boolean, display: Boolean, file: File}[]>} */
export const EDITOR_INPUT = atom({
  key: "editorInput",
  default: [],
});
export const EDITOR_ORDER = atom({
  key: "editorOrder",
  default: "asc",
});
