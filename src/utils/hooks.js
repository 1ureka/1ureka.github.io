import { useNavigate } from "react-router-dom";
import { delay, deleteFile, uploadFile, loadFile } from "./utils";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { MANAGER_ADDED, MANAGER_CATEGORY, MANAGER_DELED } from "./store";
import { INDEX, TABLE_SELECTED } from "./store";
import { useEffect, useState } from "react";

export const useWindowFocus = () => {
  const [isWindowFocused, setWindowFocused] = useState(true);

  useEffect(() => {
    const onFocus = () => setWindowFocused(true);
    const onBlur = () => setWindowFocused(false);

    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);

    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  return isWindowFocused;
};

export const useNavigateTo = (location, callback) => {
  const navigate = useNavigate();
  return async () => {
    await delay(300);
    navigate(location);
    if (callback) callback();
  };
};

export function useImageActions() {
  const setIndex = useSetRecoilState(INDEX);
  const setSelected = useSetRecoilState(TABLE_SELECTED);
  const setAdded = useSetRecoilState(MANAGER_ADDED);
  const setDeled = useSetRecoilState(MANAGER_DELED);
  const category = useRecoilValue(MANAGER_CATEGORY);

  const uploadImages = async (list) => {
    await Promise.all(
      list.map(({ name: n, thumbnail: t, origin: o }) =>
        Promise.all([
          uploadFile(t.split(",")[1], `images/${category}/${n}/1K/${n}.webp`),
          uploadFile(o.split(",")[1], `images/${category}/${n}/4K/${n}.webp`),
        ])
      )
    );
  };

  const deleteImages = async (names = [""]) => {
    await Promise.all(
      names.map((n) =>
        Promise.all([
          deleteFile(`images/${category}/${n}/1K/${n}.webp`),
          deleteFile(`images/${category}/${n}/4K/${n}.webp`),
        ])
      )
    );
  };

  const syncIndex = async () => {
    const [scene, props] = await Promise.all([
      loadFile("images/scene"),
      loadFile("images/props"),
    ]);
    const index = [
      ...scene.map(({ name }) => ({ category: "scene", name })),
      ...props.map(({ name }) => ({ category: "props", name })),
    ];
    setIndex(index);
  };

  /** @param {Object[]} list @param {string} list[].name @param {string} list[].thumbnail @param {string} list[].origin */
  const add = async (list) => {
    await uploadImages(list);
    setSelected((prev) => {
      const set = new Set([...prev, ...list.map((val) => val.name)]);
      return Array.from(set);
    });
    await syncIndex();
    setAdded(list.length);
  };

  /**@param {string[]} names */
  const del = async (names) => {
    await deleteImages(names);
    setSelected([]);
    await syncIndex();
    setDeled(names.length);
  };

  return { add, del };
}
