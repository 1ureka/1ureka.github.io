import { useEffect, useRef, useState } from "react";

import {
  useRecoilValue,
  useSetRecoilState,
  useRecoilValueLoadable,
  useRecoilState,
} from "recoil";

import {
  BOOKS_OPEN,
  BOOKS_ROWS,
  BOOKS_SELECTED,
  EDITOR_FILTER,
  EDITOR_INPUT,
  EDITOR_OUTPUT,
  IMAGES,
  INDEX,
  SIDEBAR_IS_AUTH,
  SIDEBAR_OPEN,
  MANAGER_CATEGORY,
  MANAGER_PAGE,
  MANAGER_SELECTED,
  MANAGER_VERIFY_RESULT,
  MANAGER_VERIFY_ID,
  MANAGER_DRY_MODE,
} from "./store";

import {
  deleteFile,
  uploadFile,
  loadFile,
  decode,
  delay,
  blobGetDataUrl,
  compressImage,
  filterImage,
} from "./utils";

//
// Global
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

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const setAuth = useSetRecoilState(SIDEBAR_IS_AUTH);
  const setOpen = useSetRecoilState(SIDEBAR_OPEN);
  const syncIndex = useSyncIndex();

  const success = () => {
    sessionStorage.setItem("auth", "1");
    setAuth(true);
    setOpen(false);
  };
  const fail = () => {
    sessionStorage.clear();
    setError(true);
    setLoading(false);
  };

  const action = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    sessionStorage.setItem("username", data.get("username"));
    sessionStorage.setItem("password", data.get("password"));
    try {
      setLoading(true);
      await syncIndex();
      success();
    } catch (_) {
      fail();
    }
  };

  return { action, loading, error };
}

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

export function useDropArea(onDrop) {
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    onDrop(e.dataTransfer.files);
  };

  const DropProps = {
    onDragEnter: () => setDragOver(true),
    onDragLeave: () => setDragOver(false),
    onDrop: handleDrop,
    onDragOver: handleDragOver,
  };

  return [dragOver, DropProps];
}

//
// Books
export function useBooksGroups() {
  const rows = useRecoilValue(BOOKS_ROWS);

  const groups = {};
  rows.forEach((item, i) => {
    const matches = item.name.match(`^(.+)-\\d+`);
    const groupName = matches ? matches[1] : item.name;
    if (!groups[groupName]) groups[groupName] = [];
    groups[groupName].push({ ...item, i });
  });

  return { rows, groups };
}

export function useBooksGroupClick() {
  const [group, setGroup] = useState("");

  const createHandlerG = (group) => async () => {
    await delay(200);
    setGroup(group);
  };

  return { group, createHandlerG };
}

export function useBooksImageClick() {
  const setOpen = useSetRecoilState(BOOKS_OPEN);
  const setSelected = useSetRecoilState(BOOKS_SELECTED);

  useEffect(() => {
    return () => setOpen(false);
  }, [setOpen]);

  const createHandlerI = (index) => async () => {
    await delay(200);
    setSelected(index);
    setOpen(true);
  };

  return { createHandlerI };
}

export function useBooksImageLoad(category, name, size) {
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

export function useBooksImageDecode(category, name, size) {
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

//
// Manager
export function useManagerCategory() {
  const [category, setCategory] = useRecoilState(MANAGER_CATEGORY);
  const setPage = useSetRecoilState(MANAGER_PAGE);
  const setSelected = useSetRecoilState(MANAGER_SELECTED);

  const handleToggle = (_, category) => {
    if (!category) return;
    setPage(0);
    setSelected([]);
    setCategory(category);
  };

  return { category, handleToggle };
}

export function useManagerUpload() {
  const syncIndex = useSyncIndex();
  const setSelected = useSetRecoilState(MANAGER_SELECTED);
  const category = useRecoilValue(MANAGER_CATEGORY);
  const isDry = useRecoilValue(MANAGER_DRY_MODE);

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
    await (isDry ? delay(1500) : uploadImages(list));
    setSelected((prev) => {
      const set = new Set([...prev, ...list.map((val) => val.name)]);
      return Array.from(set);
    });
    await syncIndex();
    return list.length;
  };
}

export function useManagerDelete() {
  const syncIndex = useSyncIndex();
  const setSelected = useSetRecoilState(MANAGER_SELECTED);
  const setPage = useSetRecoilState(MANAGER_PAGE);
  const category = useRecoilValue(MANAGER_CATEGORY);
  const isDry = useRecoilValue(MANAGER_DRY_MODE);

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
    await (isDry ? delay(1500) : deleteImages(names));
    setSelected([]);
    setPage(0);
    await syncIndex();
    return names.length;
  };
}

export function useManagerVerify() {
  const setID = useSetRecoilState(MANAGER_VERIFY_ID);
  const results = useRecoilValueLoadable(MANAGER_VERIFY_RESULT);
  const loading = results.state !== "hasValue";

  const action = () => setID((prev) => (prev += 1));

  const parseData = () => {
    if (loading) return null;

    const { result, timeStamp } = results.contents;
    const { emptyDirectories, propsMissingFiles, sceneMissingFiles } = result;

    const list = [
      { title: "Empty Directories", items: emptyDirectories },
      { title: "Props Missing Files", items: propsMissingFiles },
      { title: "Scene Missing Files", items: sceneMissingFiles },
    ];

    return { list, timeStamp };
  };

  return { action, result: parseData(), loading };
}

//
// Editor
export function useEditorInput() {
  const [input, setInput] = useRecoilState(EDITOR_INPUT);
  const inputNames = input.map((item) => item.file.name);

  const copyName = (fileName) => {
    const dotIndex = fileName.lastIndexOf(".");
    const name = fileName.slice(0, dotIndex);
    const extension = fileName.slice(dotIndex + 1);
    return `${name} (copy).${extension}`;
  };

  const action = (fileList) => {
    const files = Array.from(fileList);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    const newFiles = imageFiles.map((file) => {
      if (!inputNames.includes(file.name)) return file;
      return new File([file], copyName(file.name), { type: file.type });
    });

    if (newFiles.length === 0) return;

    const newInput = newFiles.map((file, i) => ({
      selected: true,
      display: i + 1 === newFiles.length,
      file,
    }));

    setInput((prev) => {
      const prevInput = prev.map((item) => ({ ...item, display: false }));
      return [...prevInput, ...newInput];
    });
  };

  return action;
}

export function useEditorOutput() {
  const [input, setInput] = useRecoilState(EDITOR_INPUT);
  const selected = input.filter((item) => item.selected);

  const [loading, setLoading] = useState(false);
  const disabled = selected.length === 0 || loading;

  const outputOptions = useRecoilValue(EDITOR_OUTPUT);
  const filterOptions = useRecoilValue(EDITOR_FILTER);
  const options = { ...outputOptions, ...filterOptions };
  options.maxSize *= 1024 * 1024;

  const name = (fileName) => {
    const name = fileName.slice(0, fileName.lastIndexOf("."));
    const extension = options.type;
    return `${name}.${extension}`;
  };

  const processImages = () => {
    return Promise.all(
      selected.map(async ({ file }) => {
        const filtered = await filterImage(file, options);
        const blob = await compressImage(filtered, options);
        const dataUrl = await blobGetDataUrl(blob);
        return { dataUrl, name: name(file.name) };
      })
    );
  };

  const action = async () => {
    setLoading(true);
    const results = await processImages();
    setInput((prev) => prev.filter((item) => !item.selected));

    results.forEach(({ dataUrl, name }) => {
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = name;
      link.click();
    });

    setLoading(false);
  };

  return { action, loading, disabled };
}

export function useEditorPreview(file) {
  const options = useRecoilValue(EDITOR_OUTPUT);

  const [state, setState] = useState(false);
  const [src, setSrc] = useState(null);

  useEffect(() => {
    setState(false);
    if (!file) return;

    let lastTrigger = true;
    (async () => {
      await delay(500);
      if (!lastTrigger) return;

      const { maxSize, ...restOptions } = options;
      const blob = await compressImage(file, {
        maxSize: maxSize * 1024 * 1024,
        ...restOptions,
      });

      const dataUrl = await blobGetDataUrl(blob);
      setSrc(dataUrl);
      setState(true);
    })();

    return () => (lastTrigger = false);
  }, [file, options]);

  return [src, state];
}
