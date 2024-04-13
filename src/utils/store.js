import { atom, selector, selectorFamily } from "recoil";
import { loadFile } from "./utils";

//
//
// Resources
export const INDEX = atom({
  key: "index",
  default: [{ category: "", name: "", size: 0 }],
});

//
//
// Global
export const THEME = atom({
  key: "theme",
  default: "dark",
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
  default: "Intro",
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
  get: ({ get }) => {
    const managerCategory = get(MANAGER_CATEGORY);
    const index = get(INDEX);
    return index.filter(({ category }) => category === managerCategory);
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
export const DRAWER_WIDTH = atom({
  key: "drawerWidth",
  default: 0,
});
export const DRAWER_IMAGE_WIDTH = atom({
  key: "drawerImageWidth",
  default: "230px",
});
