import { create } from "zustand";

/** YouTube oEmbed API 回傳的資料格式 */
type OEmbedResponse = {
  title: string;
  author_name: string;
  author_url: string;
  type: string;
  height: number;
  width: number;
  version: string;
  provider_name: string;
  provider_url: string;
  thumbnail_height: number;
  thumbnail_width: number;
  thumbnail_url: string;
  html: string;
  url: string;
};

/** 縮圖尺寸 key */
type ThumbnailSize = "large" | "medium" | "small";

/** 三種尺寸的縮圖 URL */
type Thumbnails = Record<ThumbnailSize, string>;

/** 影片解析結果狀態 */
type VideoState = {
  /** 是否正在載入中 */
  loading: boolean;
  /** 錯誤訊息（null 表示無錯誤） */
  error: string | null;
  /** oEmbed API 回傳的影片資訊 */
  videoInfo: OEmbedResponse | null;
  /** 三種尺寸的縮圖 URL */
  thumbnails: Thumbnails | null;
  /** 輸入框的值 */
  inputValue: string;
  /** 拖放區域是否處於拖曳中狀態 */
  dropActive: boolean;
};

const initialVideoState: VideoState = {
  loading: false,
  error: null,
  videoInfo: null,
  thumbnails: null,
  inputValue: "",
  dropActive: false,
};

const videoStore = create<VideoState>(() => ({ ...initialVideoState }));

export { videoStore, initialVideoState };
export type { OEmbedResponse, Thumbnails, ThumbnailSize, VideoState };
