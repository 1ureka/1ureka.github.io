/**
 * @file image.ts
 * 把任意來源的圖片重畫成一張只含像素的新圖。
 *
 * 這裡是 Rinse 的保證所在：來源的位元組從來不被複製，輸出一律是瀏覽器自
 * canvas 重新編碼出來的結果。中繼資料、結尾標記之後的附加資料、以及任何
 * 不是像素的東西都沒有出口——不是因為它們被移除了，而是因為它們從來沒有
 * 被帶過來。不是圖片的東西則根本解不開，在這一層就被擋下。
 */

/** 可輸出的格式；`alpha` 為 false 者在合成時必須先墊底色 */
export const OUTPUT_FORMATS = [
  { id: "png", label: "PNG", mime: "image/png", ext: "png", lossy: false, alpha: true },
  { id: "jpeg", label: "JPEG", mime: "image/jpeg", ext: "jpg", lossy: true, alpha: false },
  { id: "webp", label: "WebP", mime: "image/webp", ext: "webp", lossy: true, alpha: true },
] as const;

export type OutputFormat = (typeof OUTPUT_FORMATS)[number];
export type OutputFormatId = OutputFormat["id"];

/** 沖洗的輸出永遠是 PNG：無損，所以之後的任何再輸出都等價於從原圖轉出 */
export const RINSE_FORMAT: OutputFormatId = "png";

export function getFormat(id: OutputFormatId): OutputFormat {
  return OUTPUT_FORMATS.find((f) => f.id === id) ?? OUTPUT_FORMATS[0];
}

/** 解碼後的來源。`close()` 之後不可再使用，呼叫端有責任在用完時釋放 */
export type DecodedImage = {
  source: CanvasImageSource;
  width: number;
  height: number;
  close: () => void;
};

const DECODE_FAILED = "無法解讀成圖片，已擋下";

async function decodeWithBitmap(blob: Blob): Promise<DecodedImage> {
  // imageOrientation 必須明講：createImageBitmap 預設不套用 EXIF 方向，
  // 而我們正要把 EXIF 丟掉——不在這裡烘進像素，直向的照片就會永久躺平。
  const bitmap = await createImageBitmap(blob, { imageOrientation: "from-image" });
  return { source: bitmap, width: bitmap.width, height: bitmap.height, close: () => bitmap.close() };
}

function decodeWithImage(blob: Blob): Promise<DecodedImage> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();

    img.onload = () => {
      if (img.naturalWidth === 0 || img.naturalHeight === 0) {
        URL.revokeObjectURL(url);
        reject(new Error(DECODE_FAILED));
        return;
      }
      resolve({
        source: img,
        width: img.naturalWidth,
        height: img.naturalHeight,
        close: () => URL.revokeObjectURL(url),
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(DECODE_FAILED));
    };

    img.src = url;
  });
}

/** 解碼一份位元組。解不開就代表它不是（或不是能被畫出來的）圖片 */
export async function decodeImage(blob: Blob): Promise<DecodedImage> {
  if (typeof createImageBitmap === "function") {
    try {
      return await decodeWithBitmap(blob);
    } catch {
      // createImageBitmap 對部分格式（如無固有尺寸的 SVG）較嚴格，交給 <img> 再試一次
    }
  }
  return decodeWithImage(blob);
}

/** 一次輸出的設定 */
export type EncodeOptions = {
  format: OutputFormatId;
  /** 相對原圖的比例，1 為原尺寸 */
  scale?: number;
  /** 不支援透明的格式在合成時墊的底色 */
  background?: string;
  /** 有損格式的品質，0 到 1 */
  quality?: number;
};

/** 把解碼後的來源重畫並編碼成指定格式 */
export async function encodeImage(decoded: DecodedImage, options: EncodeOptions): Promise<Blob> {
  const format = getFormat(options.format);
  const scale = options.scale ?? 1;
  const width = Math.max(1, Math.round(decoded.width * scale));
  const height = Math.max(1, Math.round(decoded.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (ctx === null) throw new Error("無法取得 2D 繪圖上下文");

  // 不支援透明的格式若直接畫上去，原本透明的地方會變成黑色而不是「沒有東西」
  if (!format.alpha) {
    ctx.fillStyle = options.background ?? "#ffffff";
    ctx.fillRect(0, 0, width, height);
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(decoded.source, 0, 0, width, height);

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob((b) => resolve(b), format.mime, options.quality);
  });

  if (blob === null) throw new Error(`無法輸出成 ${format.label}`);
  // toBlob 遇到不支援的格式不會失敗，而是靜默退回 PNG；型別對不上就不算成功
  if (blob.type !== format.mime) throw new Error(`這個瀏覽器不支援輸出 ${format.label}`);

  return blob;
}

/** 允許取用的協定；其餘一律不碰 */
const PROTOCOLS = ["http:", "https:", "data:", "blob:"];

/** 自網址取得圖片的位元組。對方沒有開放跨來源讀取時會失敗，這是瀏覽器的規則，不是這裡的選擇 */
export async function fetchImageBlob(input: string): Promise<Blob> {
  let url: URL;
  try {
    url = new URL(input.trim());
  } catch {
    throw new Error("這不像是一個有效的網址");
  }

  if (!PROTOCOLS.includes(url.protocol)) throw new Error(`不支援 ${url.protocol} 開頭的網址`);

  let response: Response;
  try {
    response = await fetch(url.href, { mode: "cors", credentials: "omit" });
  } catch {
    throw new Error("讀不到這張圖：對方網站不允許其他網站直接取用它的圖片");
  }

  if (!response.ok) throw new Error(`對方回應 ${response.status}，這個網址上沒有圖片`);

  return response.blob();
}

/** 自網址猜一個檔名，猜不到時回傳 `image` */
export function fileNameFromUrl(input: string): string {
  try {
    const segment = new URL(input.trim()).pathname.split("/").filter(Boolean).pop();
    return segment === undefined ? "image" : baseName(decodeURIComponent(segment));
  } catch {
    return "image";
  }
}

/** 去掉副檔名，並濾掉檔案系統不收的字元 */
export function baseName(name: string): string {
  const stem = name.replace(/\.[^./\]+$/, "").replace(/[\/:*?"<>|]/g, "-");
  return stem.trim().length === 0 ? "image" : stem.trim();
}

/** 把 MIME 說成人看的格式名 */
export function describeType(mime: string | null | undefined): string {
  if (mime === null || mime === undefined || mime.length === 0) return "未知格式";
  const known = OUTPUT_FORMATS.find((f) => f.mime === mime);
  if (known !== undefined) return known.label;
  return mime.startsWith("image/") ? mime.slice(6).toUpperCase() : mime;
}
