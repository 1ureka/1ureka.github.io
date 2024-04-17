import { useNavigate } from "react-router-dom";
import { delay, deleteFile, uploadFile, stringToBase64 } from "./utils";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
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
  const [index, setIndex] = useRecoilState(INDEX);
  const setSelected = useSetRecoilState(TABLE_SELECTED);
  const setAdded = useSetRecoilState(MANAGER_ADDED);
  const setDeled = useSetRecoilState(MANAGER_DELED);
  const category = useRecoilValue(MANAGER_CATEGORY);

  const filter = (names = [""]) => {
    const comparator = (item) =>
      category !== item.category || !names.includes(item.name);
    return index.filter(comparator);
  };

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

  /** @param {Object[]} list @param {string} list[].name @param {number} list[].size @param {string} list[].thumbnail @param {string} list[].origin */
  const add = async (list) => {
    // 遠端溝通
    await uploadImages(list);
    // 更新目錄
    const stage = list.map(({ name, size }) => ({ category, name, size }));
    const names = list.map((item) => item.name);
    const newIndex = [...filter(names), ...stage];
    setIndex(newIndex);
    setSelected((prev) => {
      const set = new Set([...prev, ...list.map((val) => val.name)]);
      return Array.from(set);
    });
    // 收尾
    await uploadFile(stringToBase64(JSON.stringify(newIndex)), "index.json");
    setAdded(list.length);
  };

  /**@param {string[]} names */
  const del = async (names) => {
    // 遠端溝通
    await deleteImages(names);
    // 更新目錄
    const newIndex = filter(names);
    setSelected([]);
    setIndex(newIndex);
    // 收尾
    await uploadFile(stringToBase64(JSON.stringify(newIndex)), "index.json");
    setDeled(names.length);
  };

  return { add, del };
}
