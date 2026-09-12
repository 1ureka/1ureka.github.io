/**
 * @file sanitize.svelte.ts
 */

import { getContext, setContext } from "svelte";
import { formatError } from "$lib/utils/shared";
import type { DropPayload } from "$lib/utils/dnd";

/**
 * 封裝 FileReader 讀取 DataURL 為 Promise
 */
const readFileAsDataURL = async (file: File) => {
  const result = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result);
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });

  if (typeof result !== "string") {
    throw new Error("讀取檔案失敗");
  }

  return result;
};

/**
 * 封裝 Image 載入為 Promise
 */
const loadImage = (src: string) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
};

/**
 * 封裝 toBlob 為 Promise
 */
const canvasToBlob = (canvas: HTMLCanvasElement, type = "image/png", quality = 1) => {
  return new Promise<Blob | null>((resolve) => {
    canvas.toBlob((blob) => resolve(blob), type, quality);
  });
};

class SanitizeController {
  /** ? */
  private queue: File[] = [];
  /** 是否正在進行中 */
  pending = $state<boolean>(false);
  /** 最後一次發生的錯誤訊息 */
  error = $state<string | null>(null);

  /**
   * ?
   */
  private async process(file: File) {
    if (!file.type.startsWith("image/")) {
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

      const downloadAnchor = document.createElement("a");
      downloadAnchor.href = blobUrl;
      downloadAnchor.download = `${fileName}.png`;
      downloadAnchor.click();
      downloadAnchor.remove();

      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    } catch (error) {
      console.error("圖片處理失敗:", error);
    }
  }

  /**
   * ?
   */
  private async processNext() {
    if (this.queue.length === 0) {
      this.pending = false;
      return;
    }

    if (this.pending) {
      return;
    }

    this.pending = true;
    const file = this.queue.shift()!;

    try {
      await this.process(file);
    } catch (error) {
      this.error = "處理失敗" + formatError(error);
    } finally {
      this.processNext();
    }

    return;
  }

  /**
   * 接手一次全域投放
   */
  handleDrop = (payload: DropPayload) => {
    this.queue.push(...payload.files);
    this.processNext();
  };
}

const key = Symbol("sanitize-controller");

export const createSanitizeContext = () => {
  const controller = new SanitizeController();
  setContext(key, controller);
  return controller;
};

export const getSanitizeContext = () => getContext<SanitizeController>(key);
