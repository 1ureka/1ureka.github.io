import { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useRecoilValueLoadable } from "recoil";

import { MANAGER_ADDED, MANAGER_CATEGORY, MANAGER_DELED } from "./store";
import { INDEX, TABLE_SELECTED, IMAGES } from "./store";
import { deleteFile, uploadFile, loadFile } from "./utils";
import { decode, delay, blobGetDataUrl } from "./utils";

//
// communicate
export function useSyncIndex() {
  const setIndex = useSetRecoilState(INDEX);

  const syncIndex = async () => {
    const [scene, props] = await Promise.all([
      loadFile("images/scene", true),
      loadFile("images/props", true),
    ]);
    const index = [
      ...scene.map(({ name }) => ({ category: "scene", name })),
      ...props.map(({ name }) => ({ category: "props", name })),
    ];
    setIndex(index);
  };

  return syncIndex;
}

export function useImageAdd() {
  const syncIndex = useSyncIndex();
  const setSelected = useSetRecoilState(TABLE_SELECTED);
  const setAdded = useSetRecoilState(MANAGER_ADDED);
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

  /** @param {Object[]} list @param {string} list[].name @param {string} list[].thumbnail @param {string} list[].origin */
  return async (list) => {
    await uploadImages(list);
    setSelected((prev) => {
      const set = new Set([...prev, ...list.map((val) => val.name)]);
      return Array.from(set);
    });
    await syncIndex();
    setAdded(list.length);
  };
}

export function useImageDelete() {
  const syncIndex = useSyncIndex();
  const setSelected = useSetRecoilState(TABLE_SELECTED);
  const setDeled = useSetRecoilState(MANAGER_DELED);
  const category = useRecoilValue(MANAGER_CATEGORY);

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

  /**@param {string[]} names */
  return async (names) => {
    await deleteImages(names);
    setSelected([]);
    await syncIndex();
    setDeled(names.length);
  };
}

//
// image loading and decoding
export function useBlob(blob) {
  const [state, setState] = useState(false);
  const [src, setSrc] = useState("");

  useEffect(() => {
    if (!blob) return;

    (async () => {
      const url = await blobGetDataUrl(blob);
      setSrc(url);
      setState(true);
    })();

    return () => {
      setSrc(null);
      setState(false);
    };
  }, [blob]);

  return [src, state];
}

export function useDecode(src) {
  const [state, setState] = useState(false);
  const [_src, setSrc] = useState("");
  const timeStamp = useRef(null);

  const decoding = (url, createAt) => {
    const img = new Image();
    img.src = url;

    (async () => {
      await delay(250);
      await decode(img);
      if (createAt !== timeStamp.current) return;
      setSrc(url);
      setState(true);
    })();
  };

  useEffect(() => {
    timeStamp.current = Date.now();
    setState(false);
    if (src) decoding(src, timeStamp.current);
  }, [src]);

  return [_src, state];
}

export function useImageLoad(category, name, size) {
  const [state, setState] = useState(false);
  const [src, setSrc] = useState("");
  const dataUrl = useRecoilValueLoadable(
    IMAGES([category, name, size].join("/"))
  );

  useEffect(() => {
    if (dataUrl.state === "hasValue") {
      setSrc(dataUrl.contents);
      setState(true);
    } else {
      setState(false);
    }
  }, [dataUrl.state, dataUrl.contents]);

  return [src, state];
}

export function useImageDecode(category, name, size) {
  const [state, setState] = useState(false);
  const [src, setSrc] = useState("");
  const timeStamp = useRef(false);
  const dataUrl = useRecoilValueLoadable(
    IMAGES([category, name, size].join("/"))
  );

  const decoding = (url, createAt) => {
    const img = new Image();
    img.src = url;

    (async () => {
      await delay(250);
      await decode(img);
      if (createAt !== timeStamp.current) return;
      setSrc(url);
      setState(true);
    })();
  };

  useEffect(() => {
    timeStamp.current = Date.now();
    setState(false);
    if (dataUrl.state === "hasValue")
      decoding(dataUrl.contents, timeStamp.current);
  }, [dataUrl.state, dataUrl.contents]);

  return [src, state];
}
