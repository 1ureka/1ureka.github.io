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
  EDITOR_INPUT,
  IMAGES,
  INDEX,
  MANAGER_ADDED,
  MANAGER_CATEGORY,
  MANAGER_DELED,
  TABLE_PAGE,
  TABLE_SELECTED,
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
  const [dragOver, setDragOver] = React.useState(false);

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
export function useManagerSelect() {
  const [task, setTask] = useState("");
  const [hint, setHint] = useState("");
  const [list, setList] = useState([]);

  const createInput = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;
    input.style.display = "none";
    return input;
  };

  const getInput = async () => {
    const input = createInput();
    const fileList = await new Promise((resolve) => {
      input.addEventListener("cancel", () => resolve([]));
      input.addEventListener("change", () => resolve(input.files));
      document.body.appendChild(input);
      input.click();
    });
    input.remove();
    return Array.from(fileList);
  };

  /** @param {File[]} files*/
  const processImages = (files) => {
    return Promise.all(
      files.map(async (file) => {
        const blobO = await compressImage(file);
        const blobT = await compressImage(file, { scale: 0.125 });
        const origin = await blobGetDataUrl(blobO);
        const thumbnail = await blobGetDataUrl(blobT);
        const name = file.name.replace(/\.[^.]+$/, "");
        return { name, origin, thumbnail };
      })
    );
  };

  const action = async () => {
    setHint("");
    setTask("Selecting files...");

    const files = await getInput();
    if (files.length === 0) {
      setHint("No file selected");
      setTask("");
      return;
    }
    if (!files.every((file) => file.type.match("image.*"))) {
      setHint("Please select only image files");
      setTask("");
      return;
    }

    setTask("Compressing files...");
    const list = await processImages(files);
    setTask("");
    setList(list);
  };

  return { action, task, hint, list };
}

export function useManagerUpload() {
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

export function useManagerDelete() {
  const syncIndex = useSyncIndex();
  const setSelected = useSetRecoilState(TABLE_SELECTED);
  const setDeled = useSetRecoilState(MANAGER_DELED);
  const setPage = useSetRecoilState(TABLE_PAGE);
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
    setPage(0);
    await syncIndex();
    setDeled(names.length);
  };
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

  return (action = (fileList) => {
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
  });
}

export function useEditorOutput() {
  const [input, setInput] = useRecoilState(EDITOR_INPUT);
  const selected = input.filter((item) => item.selected);

  const [loading, setLoading] = React.useState(false);
  const disabled = selected.length === 0 || loading;

  const outputOptions = useRecoilValue(EDITOR_OUTPUT);
  const filterOptions = useRecoilValue(EDITOR_FILTER);
  const options = { ...outputOptions, ...filterOptions };
  options.maxSize *= 1024 * 1024;

  const processImages = () => {
    return Promise.all(
      selected.map(async ({ file }) => {
        const filtered = await filterImage(file, options);
        const blob = await compressImage(filtered, options);
        const dataUrl = await blobGetDataUrl(blob);

        return {
          dataUrl,
          name: file.name.slice(0, file.name.lastIndexOf(".")),
        };
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

  return [action, loading, disabled];
}
