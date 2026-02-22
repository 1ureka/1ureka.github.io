import { create } from "zustand";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** YouTube oEmbed API 回傳的 JSON 資料格式 */
type OEmbedResponse = {
  /** 影片標題 */
  title: string;
  /** 頻道（作者）名稱 */
  author_name: string;
  /** 頻道頁面 URL */
  author_url: string;
  /** 資源類型，固定為 `"video"` */
  type: string;
  /** 嵌入 iframe 建議高度（px） */
  height: number;
  /** 嵌入 iframe 建議寬度（px） */
  width: number;
  /** oEmbed 規範版本，固定為 `"1.0"` */
  version: string;
  /** 提供者名稱，固定為 `"YouTube"` */
  provider_name: string;
  /** 提供者 URL */
  provider_url: string;
  /** API 回傳的原始縮圖高度（px） */
  thumbnail_height: number;
  /** API 回傳的原始縮圖寬度（px） */
  thumbnail_width: number;
  /** API 回傳的原始縮圖 URL（中等尺寸） */
  thumbnail_url: string;
  /** 嵌入用 iframe HTML 片段 */
  html: string;
  /** 使用者提供的原始影片 URL（由 action 附加） */
  url: string;
};

/** 縮圖尺寸 key：`large`（1280×720）、`medium`（480×360）、`small`（320×180） */
type ThumbnailSize = "large" | "medium" | "small";

/** 三種尺寸的縮圖 URL 對應表 */
type Thumbnails = Record<ThumbnailSize, string>;

// ---------------------------------------------------------------------------
// Video Store
// ---------------------------------------------------------------------------

/** 影片解析結果的完整狀態 */
type VideoState = {
  /** 是否正在呼叫 oEmbed API */
  loading: boolean;
  /** 錯誤訊息；`null` 表示無錯誤 */
  error: string | null;
  /** oEmbed API 回傳的影片資訊；尚未解析時為 `null` */
  videoInfo: OEmbedResponse | null;
  /** 三種尺寸的縮圖 URL；尚未解析時為 `null` */
  thumbnails: Thumbnails | null;
  /** 輸入框目前的值 */
  inputValue: string;
  /** 拖放區域是否正被拖曳經過（用於控制高亮樣式） */
  dropActive: boolean;
};

/** video store 的初始值 */
const initialVideoState: VideoState = {
  loading: false,
  error: null,
  videoInfo: null,
  thumbnails: null,
  inputValue: "",
  dropActive: false,
};

/** 影片解析結果的 Zustand store（唯讀，由 action 更新） */
const videoStore = create<VideoState>(() => ({ ...initialVideoState }));

// ---------------------------------------------------------------------------
// History Store
// ---------------------------------------------------------------------------

/** localStorage key，用於持久化搜尋歷史 */
const HISTORY_STORAGE_KEY = "youtube-parser-history";

/** 歷史記錄最大保留筆數 */
const HISTORY_MAX_LENGTH = 50;

/**
 * 從 localStorage 讀取已儲存的搜尋歷史。
 * 若資料不存在或格式異常則回傳空陣列。
 */
const loadHistory = (): string[] => {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === "string") : [];
  } catch {
    return [];
  }
};

/** 將歷史陣列寫入 localStorage */
const saveHistory = (history: string[]) => {
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
};

/** 輸入框歷史瀏覽狀態 */
type HistoryState = {
  /** 曾成功解析過的 URL 列表（最新在前） */
  entries: string[];
  /** 目前正在瀏覽的歷史索引；`-1` 表示不在歷史瀏覽模式 */
  cursor: number;
};

/** history store 的初始值（從 localStorage 載入） */
const initialHistoryState: HistoryState = {
  entries: loadHistory(),
  cursor: -1,
};

/** 搜尋歷史的 Zustand store（唯讀，由 action 更新） */
const historyStore = create<HistoryState>(() => ({ ...initialHistoryState }));

export { videoStore, initialVideoState, historyStore, initialHistoryState };
export { HISTORY_STORAGE_KEY, HISTORY_MAX_LENGTH, loadHistory, saveHistory };
export type { OEmbedResponse, Thumbnails, ThumbnailSize, VideoState, HistoryState };
