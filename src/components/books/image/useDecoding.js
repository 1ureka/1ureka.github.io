import { useEffect, useState } from "react";
import { decode } from "../../../utils/utils";
import { THUMBNAILS } from "../../../utils/store";
import { useRecoilValueLoadable } from "recoil";

export default function useDecoding(category, name) {
  const dataUrl = useRecoilValueLoadable(
    THUMBNAILS([category, name].join("/"))
  );

  const [state, setState] = useState(false);
  const [src, setSrc] = useState("");

  const decoding = () => {
    setState(false);
    const img = new Image();
    img.src = dataUrl.contents;

    (async () => {
      await decode(img);
      setSrc(dataUrl.contents);
      setState(true);
    })();
  };

  useEffect(() => {
    if (dataUrl.state === "hasValue") decoding();
  }, [dataUrl.state, dataUrl.contents]);

  useEffect(() => {
    window.addEventListener("focus", decoding);
    return () => window.removeEventListener("focus", decoding);
  }, []);

  return [src, state];
}
