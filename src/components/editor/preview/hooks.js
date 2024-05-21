import * as React from "react";
import { useRecoilValue } from "recoil";

import { EDITOR_DISPLAY, EDITOR_FILTER } from "../../../utils/store";
import { EDITOR_INPUT } from "../../../utils/store";
import { EDITOR_OUTPUT_SETTING } from "../../../utils/store";
import { compressImage, createFilter } from "../../../utils/utils";

export function useImageSetting() {
  const { maxSize, ...outputOpt } = useRecoilValue(EDITOR_OUTPUT_SETTING);
  const options = { maxSize: maxSize * 1024 * 1024, ...outputOpt };

  const fileName = useRecoilValue(EDITOR_DISPLAY);
  const files = useRecoilValue(EDITOR_INPUT);
  const file = files.find((file) => file.name === fileName);

  return { fileName, file, options };
}

let _isProcess = false;

export function useImageProcess() {
  const { fileName, file, options } = useImageSetting();
  const [isProcess, setIsProcess] = React.useState(true);
  const [result, setResult] = React.useState(null);
  const [lastOptions, setLastOptions] = React.useState(null);

  React.useEffect(() => {
    const currentOptions = { ...options, fileName };

    const setProcess = (bool) => {
      _isProcess = bool;
      setIsProcess(bool);
    };

    const processImage = async () => {
      //   console.log("process", currentOptions);
      setProcess(true);
      const dataUrl = await compressImage(file, options);
      setResult(dataUrl);
      setProcess(false);
      setLastOptions(currentOptions);
    };

    if (file && !_isProcess) {
      if (JSON.stringify(lastOptions) !== JSON.stringify(currentOptions)) {
        processImage();
      }
    }
  }, [file, options, lastOptions]);

  return { fileName, result, isProcess };
}

export function useImageFilter() {
  const filterOpt = useRecoilValue(EDITOR_FILTER);
  const filter = createFilter(filterOpt);

  return filter;
}
