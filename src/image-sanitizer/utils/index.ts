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

export { readFileAsDataURL, loadImage, canvasToBlob };
