/**
 * @file parse.ts
 * 把使用者給的任意輸入解析成影片 id 與正規化網址
 */

/** 直接貼上 id 時的形狀：11 碼的 base64url 字元 */
const BARE_ID = /^[a-zA-Z0-9_-]{10,12}$/;

/** 路徑式的影片頁：/embed/xxx、/shorts/xxx、/live/xxx */
const PATH_FORMS = /^\/(embed|shorts|live)\/([^/?#]+)/;

/** 自任意輸入取出影片 id，取不到回傳 `null` */
export function extractVideoId(input: string): string | null {
  const s = input.trim();
  if (s.length === 0) return null;

  if (BARE_ID.test(s) && !s.includes(".") && !s.includes("/")) return s;

  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(s) ? s : `https://${s}`);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^(www|m|music)\./i, "").toLowerCase();

  if (host === "youtu.be") {
    return url.pathname.split("/").filter(Boolean)[0] ?? null;
  }

  if (host === "youtube.com" || host === "youtube-nocookie.com") {
    if (url.pathname === "/watch") return url.searchParams.get("v");
    return url.pathname.match(PATH_FORMS)?.[2] ?? null;
  }

  return null;
}

/** 把任意輸入正規化成標準的 watch 網址，無法解析時回傳 `null` */
export function normalizeUrl(input: string): string | null {
  const id = extractVideoId(input);
  return id === null ? null : `https://www.youtube.com/watch?v=${id}`;
}

/** YouTube 為每部影片提供的縮圖規格 */
export const THUMBNAIL_VARIANTS = [
  { name: "default", file: "default.jpg", width: 120, height: 90 },
  { name: "mqdefault", file: "mqdefault.jpg", width: 320, height: 180 },
  { name: "hqdefault", file: "hqdefault.jpg", width: 480, height: 360 },
  { name: "sddefault", file: "sddefault.jpg", width: 640, height: 480 },
  { name: "maxresdefault", file: "maxresdefault.jpg", width: 1280, height: 720 },
] as const;

/** 組出指定影片、指定規格的縮圖網址 */
export function thumbnailUrl(videoId: string, file = "mqdefault.jpg"): string {
  return `https://img.youtube.com/vi/${videoId}/${file}`;
}

/** 組出指定影片的 YouTube 觀看網址 */
export function watchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}
