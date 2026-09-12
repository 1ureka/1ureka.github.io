/**
 * @file types.ts
 * oEmbed 的原始回應與正規化後的資訊卡
 */

/** YouTube oEmbed 端點回傳的原始 JSON，欄位全部視為可選 */
export interface OEmbedRaw {
  title?: string;
  author_name?: string;
  author_url?: string;
  provider_name?: string;
  provider_url?: string;
  type?: string;
  html?: string;
  version?: string;
  width?: number;
  height?: number;
  thumbnail_url?: string;
  thumbnail_width?: number;
  thumbnail_height?: number;
}

/** 正規化後的一張影片資訊卡，缺欄位一律在這裡補上合理預設 */
export interface VideoCard {
  /** 正規化後的影片網址 */
  url: string;
  videoId: string;
  title: string;
  authorName: string;
  authorUrl: string;
  providerName: string;
  type: string;
  /** oEmbed 提供的內嵌 HTML，尺寸取決於查詢時帶的 maxwidth / maxheight */
  html: string;
  thumbnailUrl: string;
  thumbnailWidth?: number;
  thumbnailHeight?: number;
  width?: number;
  height?: number;
  version?: string;
  raw: OEmbedRaw;
  /** 這筆資料實際取得的時間，快取命中時為當初取得的時間 */
  fetchedAt: number;
  /** 這次取得是否來自本地快取 */
  fromCache: boolean;
}

/** 一次查詢的選項 */
export type LookupOptions = {
  /** 內嵌碼的最大寬度 */
  maxwidth?: number;
  /** 內嵌碼的最大高度 */
  maxheight?: number;
  /** 略過快取強制重新取得 */
  forceRefresh?: boolean;
};
