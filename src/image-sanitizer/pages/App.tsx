import { Box, LinearProgress, type SxProps } from "@mui/material";
import { AppWrapper } from "@/image-sanitizer/components/AppWrapper";
import { generateMuiColorMix } from "@/utils/commonSx";
import { canvasToBlob, loadImage, readFileAsDataURL } from "@/image-sanitizer/utils";

/** 拖放區域 id */
const DROP_ZONE_ID = "drop-zone";
/** 進度條 id */
const PROGRESS_BAR_ID = "progress-bar";
/** 下載用的隱藏連結 */
const downloadAnchor = document.createElement("a");

/** 獲取拖放區域元素 */
const getDropZone = () => document.getElementById(DROP_ZONE_ID) as HTMLDivElement | null;
/** 獲取進度條元素 */
const getProgressBar = () => document.getElementById(PROGRESS_BAR_ID) as HTMLDivElement | null;

/**
 * 整個畫面的樣式
 */
const style: SxProps = {
  width: "100dvw",
  height: "100dvh",
  display: "grid",
  placeItems: "center",
  bgcolor: "background.default",

  "& *": {
    userSelect: "none",
  },

  [`& > #${DROP_ZONE_ID}`]: {
    width: "80%",
    height: "80%",

    display: "grid",
    placeItems: "center",
    border: "3px dashed",
    borderRadius: 3,

    borderColor: "border.main",
    bgcolor: "background.paper",
    color: "text.secondary",

    "&.drag-over": {
      borderColor: "primary.main",
      bgcolor: generateMuiColorMix("primary-main", "background-paper", 10),
      color: "primary.main",
    },

    transition: "all 0.15s",
  },

  [`& > #${PROGRESS_BAR_ID}`]: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    opacity: 0,
    transition: "opacity 0.3s",

    "&.active": {
      opacity: 1,
    },
  },
};

// ------------------------------------------------------------------------------

/**
 * 建立檔案處理器的參數型別
 */
type FileProcessorParams = {
  process: (file: File) => Promise<void>;
  onProgressStart: () => void;
  onProgressEnd: () => void;
};

/**
 * 建立一個檔案處理器，確保同一時間只有一個檔案在處理中
 */
const createFileProcessor = (params: FileProcessorParams) => {
  const { process, onProgressStart, onProgressEnd } = params;
  let isProcessing = false;
  const queue: File[] = [];

  const processNext = async () => {
    if (queue.length === 0) {
      isProcessing = false;
      onProgressEnd();
      return;
    }

    isProcessing = true;
    const file = queue.shift()!;

    try {
      await process(file);
    } catch (error) {
      console.error("處理失敗", error);
    } finally {
      processNext();
    }
  };

  return {
    process: (file: File) => {
      queue.push(file);
      if (!isProcessing) {
        onProgressStart();
        processNext();
      }
    },
  };
};

/**
 * 檔案處理器，模組單例
 */
const imageProcessor = createFileProcessor({
  onProgressStart: () => getProgressBar()?.classList.add("active"),
  onProgressEnd: () => getProgressBar()?.classList.remove("active"),
  process: async (file: File) => {
    if (!file.type.startsWith("image/")) {
      console.warn("非圖片檔案，跳過處理:", file.name);
      return;
    }

    try {
      const dataUrl = await readFileAsDataURL(file);
      const img = await loadImage(dataUrl);

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("無法取得 2D 繪圖上下文");
      }

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const blob = await canvasToBlob(canvas, "image/png");

      if (!blob) {
        throw new Error("無法將圖片轉換為 Blob");
      }

      const blobUrl = URL.createObjectURL(blob);
      const fileName = file.name ? file.name.replace(/\.[^/.]+$/, "") : "image";

      downloadAnchor.href = blobUrl;
      downloadAnchor.download = `${fileName}.png`;
      downloadAnchor.click();

      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    } catch (error) {
      console.error("圖片處理失敗:", error);
    }
  },
});

// ------------------------------------------------------------------------------

const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  getDropZone()?.classList.add("drag-over");
};

const handleDragLeave = () => {
  getDropZone()?.classList.remove("drag-over");
};

const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  getDropZone()?.classList.remove("drag-over");

  const files = Array.from(e.dataTransfer.files);
  files.forEach((file) => imageProcessor.process(file));
};

// ------------------------------------------------------------------------------

const Layout = () => (
  <Box sx={style} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
    <div id={DROP_ZONE_ID}>
      <p>將圖片拖曳到此處</p>
    </div>

    <LinearProgress id={PROGRESS_BAR_ID} variant="indeterminate" />
  </Box>
);

const App = () => (
  <AppWrapper>
    <Layout />
  </AppWrapper>
);

export default App;
