/**
 * @file index.ts
 * 查詢 YouTube 官方 oEmbed 端點並正規化結果。
 *
 * 這裡是全站唯一的查詢路徑：快速查詢、批次查詢、內嵌尺寸切換都走同一個 `lookup()`，
 * 快取與錯誤訊息因此不會有第二種行為。
 */

import { cacheKey, readCache, writeCache } from "./cache";
import { extractVideoId, normalizeUrl, thumbnailUrl, watchUrl } from "./parse";
import type { LookupOptions, OEmbedRaw, VideoCard } from "./types";

export { extractVideoId, normalizeUrl, thumbnailUrl, watchUrl, THUMBNAIL_VARIANTS } from "./parse";
export type { LookupOptions, OEmbedRaw, VideoCard } from "./types";

const ENDPOINT = "https://www.youtube.com/oembed";

/** 端點的錯誤碼在這裡就翻成使用者看得懂的說法，呼叫端只需要顯示 message */
function describeStatus(status: number): string {
  if (status === 404) return "找不到這部影片，可能是私人影片、已下架，或連結有誤";
  if (status === 401) return "這部影片已停用內嵌功能，無法讀取資訊";
  return `伺服器回應錯誤（${status}）`;
}

function toCard(raw: OEmbedRaw, url: string, videoId: string): VideoCard {
  return {
    url,
    videoId,
    title: raw.title ?? "（未提供標題）",
    authorName: raw.author_name ?? "未知頻道",
    authorUrl: raw.author_url ?? watchUrl(videoId),
    providerName: raw.provider_name ?? "YouTube",
    type: raw.type ?? "video",
    html: raw.html ?? "",
    thumbnailUrl: raw.thumbnail_url ?? thumbnailUrl(videoId, "hqdefault.jpg"),
    thumbnailWidth: raw.thumbnail_width,
    thumbnailHeight: raw.thumbnail_height,
    width: raw.width,
    height: raw.height,
    version: raw.version,
    raw,
    fetchedAt: Date.now(),
    fromCache: false,
  };
}

/**
 * 查詢一個連結的資訊卡。
 *
 * 無法解析、連線失敗、端點回錯都以 `Error` 拋出，訊息已是可直接顯示的中文。
 */
export async function lookup(input: string, options: LookupOptions = {}): Promise<VideoCard> {
  const url = normalizeUrl(input);
  if (url === null) {
    throw new Error("這不像是有效的 YouTube 連結，請確認格式，例如 https://www.youtube.com/watch?v=...");
  }

  const videoId = extractVideoId(url);
  if (videoId === null) throw new Error("無法自這個連結取得影片 ID");

  const key = cacheKey(videoId, options.maxwidth, options.maxheight);
  if (options.forceRefresh !== true) {
    const cached = readCache(key);
    if (cached !== null) return cached;
  }

  const params = new URLSearchParams({ url, format: "json" });
  if (options.maxwidth !== undefined) params.set("maxwidth", String(options.maxwidth));
  if (options.maxheight !== undefined) params.set("maxheight", String(options.maxheight));

  let response: Response;
  try {
    response = await fetch(`${ENDPOINT}?${params}`);
  } catch {
    throw new Error("無法連上 YouTube 的 oEmbed 服務，請檢查網路連線後再試一次");
  }

  if (!response.ok) throw new Error(describeStatus(response.status));

  const card = toCard((await response.json()) as OEmbedRaw, url, videoId);
  writeCache(key, card);
  return card;
}
