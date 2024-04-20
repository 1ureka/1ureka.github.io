import { atom, selector, selectorFamily } from "recoil";
import { loadFile } from "./utils";

//
//
// Resources
export const INDEX = atom({
  key: "index",
  default: [{ category: "", name: "" }],
});

//
//
// Global
export const THEME = atom({
  key: "theme",
  default: "dark",
});
export const THEME_TOGGLE = atom({
  key: "themeToggle",
  default: "Dark",
});

//
//
// Intro
export const IS_INTRO_VISIBLE = atom({
  key: "IsIntroVisible",
  default: true,
});
export const HOME_PAGE = atom({
  key: "homePage",
  default: 0,
});
export const HOME_IS_SCROLLING = atom({
  key: "homeIsScrolling",
  default: true,
});
export const HOME_IS_AUTH = atom({
  key: "homeIsAuth",
  default: false,
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
        const data = await loadFile(`images/${category}/${name}/4K`);
        const KB = data[0].size / 1024;
        const size = Math.round((KB + Number.EPSILON) * 100) / 100;
        return { name, size };
      })
    );
    return rows;
  },
});
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
export const MANAGER_ADDED = atom({
  key: "managerAdded",
  default: 0,
});
export const MANAGER_DELED = atom({
  key: "managerDeleted",
  default: 0,
});
export const MANAGER_HEADER_H = atom({
  key: "managerHeaderH",
  default: "50px",
});

//
//
//Album
export const ALBUM_CATEGORY = atom({
  key: "albumCategory",
  default: "",
});
export const ALBUM_ROWS = selector({
  key: "albumRows",
  get: ({ get }) => {
    const albumCategory = get(ALBUM_CATEGORY);
    const index = get(INDEX);
    return index.filter(({ category }) => category === albumCategory);
  },
});
export const THUMBNAILS = selectorFamily({
  key: "thumbnails",
  get:
    (name) =>
    async ({ get }) => {
      const category = get(ALBUM_CATEGORY);
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
      const category = get(ALBUM_CATEGORY);
      const base64 = await loadFile(
        `images/${category}/${name}/4K/${name}.webp`
      );
      return `data:image/webp;base64,${base64.replace(/\n/g, "")}`;
    },
});
export const ALBUM_SELECTED = atom({
  key: "albemSelected",
  default: 0,
});
export const ALBUM_FILTER = atom({
  key: "albumFilter",
  default: { brightness: 1, contrast: 1, saturate: 1 },
});
export const DRAWER_WIDTH = atom({
  key: "drawerWidth",
  default: 0,
});
export const DRAWER_IMAGE_WIDTH = atom({
  key: "drawerImageWidth",
  default: "230px",
});
