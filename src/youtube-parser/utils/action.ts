import { videoStore, initialVideoState, historyStore, HISTORY_MAX_LENGTH, saveHistory } from "./store";

// ---------------------------------------------------------------------------
// 核心邏輯
// ---------------------------------------------------------------------------

/**
 * 從各種格式的 YouTube URL 中解析出 11 字元的影片 ID。
 *
 * 支援格式：
 * - `https://www.youtube.com/watch?v=VIDEO_ID`
 * - `https://youtu.be/VIDEO_ID`
 * - `https://www.youtube.com/embed/VIDEO_ID`
 * - `https://www.youtube.com/v/VIDEO_ID`
 * - `https://www.youtube.com/shorts/VIDEO_ID`
 *
 * @returns 影片 ID 字串，若無法解析則回傳 `null`
 */
const parseVideoId = (url: string): string | null => {
  const match = url.match(/(?:youtube\.com\/(?:watch\?.*v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match?.[1] ?? null;
};

/**
 * 根據影片 ID 產生三種尺寸的縮圖 URL。
 *
 * | key      | 檔名             | 解析度   |
 * | -------- | ---------------- | -------- |
 * | `large`  | maxresdefault    | 1280×720 |
 * | `medium` | hqdefault        | 480×360  |
 * | `small`  | mqdefault        | 320×180  |
 */
const generateThumbnails = (videoId: string) => ({
  large: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
  medium: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
  small: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
});

/**
 * 將一筆 URL 加入搜尋歷史（最新在前），並同步寫入 localStorage。
 * 若該 URL 已存在，會先移除舊的再插入最前方，避免重複。
 * 超過 {@link HISTORY_MAX_LENGTH} 的舊記錄會被自動截斷。
 */
const pushHistory = (url: string) => {
  const { entries } = historyStore.getState();
  const next = [url, ...entries.filter((e) => e !== url)].slice(0, HISTORY_MAX_LENGTH);
  historyStore.setState({ entries: next, cursor: -1 });
  saveHistory(next);
};

/**
 * 發送 YouTube oEmbed API 請求，取得影片資訊並更新 {@link videoStore}。
 *
 * 流程：
 * 1. 解析影片 ID，失敗則寫入錯誤訊息
 * 2. 延遲 500ms 避免過度請求
 * 3. 呼叫 oEmbed API 取得 JSON
 * 4. 同時產生三種尺寸縮圖 URL
 * 5. 成功後將 URL 加入搜尋歷史
 */
const fetchVideoInfo = async (url: string) => {
  videoStore.setState({ loading: true, error: null });

  const videoId = parseVideoId(url);
  if (!videoId) {
    videoStore.setState({ loading: false, error: "無法解析影片 ID，請確認連結格式正確" });
    return;
  }

  // 簡易節流：避免連續快速請求
  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
    const res = await fetch(oembedUrl);

    if (!res.ok) {
      throw new Error(res.status === 404 ? "找不到該影片" : `API 請求失敗 (${res.status})`);
    }

    const videoInfo = await res.json();
    const thumbnails = generateThumbnails(videoId);

    videoStore.setState({ loading: false, videoInfo: { ...videoInfo, url }, thumbnails });
    pushHistory(url);
  } catch (e) {
    const message = e instanceof Error ? e.message : "未知錯誤";
    videoStore.setState({ loading: false, error: message, videoInfo: null, thumbnails: null });
  }
};

// ---------------------------------------------------------------------------
// Event Handlers — 供 UI 直接綁定為事件處理器
// ---------------------------------------------------------------------------

/**
 * 更新輸入框的值，同時重置歷史瀏覽游標。
 *
 * 綁定方式：`onChange={(e) => handleInputChange(e.target.value)}`
 */
const handleInputChange = (value: string) => {
  videoStore.setState({ inputValue: value });
  historyStore.setState({ cursor: -1 });
};

/**
 * 送出輸入框中的連結進行解析。
 *
 * 綁定方式：`onClick={handleSubmit}`
 */
const handleSubmit = () => {
  const { inputValue } = videoStore.getState();
  if (inputValue.trim()) fetchVideoInfo(inputValue.trim());
};

/**
 * 輸入框鍵盤事件處理器。
 *
 * - `Enter`：送出連結
 * - `ArrowUp`：切換到較舊的歷史記錄
 * - `ArrowDown`：切換到較新的歷史記錄（或回到空白）
 *
 * 綁定方式：`onKeyDown={handleKeyDown}`
 */
const handleKeyDown = (e: { key: string; preventDefault?: () => void }) => {
  if (e.key === "Enter") {
    handleSubmit();
    return;
  }

  const { entries, cursor } = historyStore.getState();
  if (entries.length === 0) return;

  if (e.key === "ArrowUp") {
    e.preventDefault?.();
    const next = Math.min(cursor + 1, entries.length - 1);
    historyStore.setState({ cursor: next });
    videoStore.setState({ inputValue: entries[next] });
    return;
  }

  if (e.key === "ArrowDown") {
    e.preventDefault?.();
    const next = cursor - 1;
    if (next < 0) {
      historyStore.setState({ cursor: -1 });
      videoStore.setState({ inputValue: "" });
    } else {
      historyStore.setState({ cursor: next });
      videoStore.setState({ inputValue: entries[next] });
    }
  }
};

/**
 * 拖放事件：使用者放下（drop）一段文字或連結。
 * 自動觸發解析，不需額外按按鈕。
 *
 * 綁定方式：`onDrop={handleDrop}`
 */
const handleDrop = (e: { preventDefault: () => void; dataTransfer?: DataTransfer | null }) => {
  e.preventDefault();
  videoStore.setState({ dropActive: false });

  const text = e.dataTransfer?.getData("text/uri-list") || e.dataTransfer?.getData("text/plain") || "";

  if (text.trim()) {
    videoStore.setState({ inputValue: text.trim() });
    fetchVideoInfo(text.trim());
  }
};

/**
 * 拖放事件：拖曳物件經過拖放區域。
 * 必須呼叫 `preventDefault()` 才能接收後續的 drop 事件。
 *
 * 綁定方式：`onDragOver={handleDragOver}`
 */
const handleDragOver = (e: { preventDefault: () => void }) => {
  e.preventDefault();
  videoStore.setState({ dropActive: true });
};

/**
 * 拖放事件：拖曳物件離開拖放區域，關閉高亮樣式。
 *
 * 綁定方式：`onDragLeave={handleDragLeave}`
 */
const handleDragLeave = () => {
  videoStore.setState({ dropActive: false });
};

/**
 * 重置所有狀態（videoStore + historyStore 游標）回到初始值。
 * 注意：不會清除 localStorage 中的歷史記錄。
 *
 * 綁定方式：`onClick={handleReset}`
 */
const handleReset = () => {
  videoStore.setState({ ...initialVideoState });
  historyStore.setState({ cursor: -1 });
};

export {
  parseVideoId,
  generateThumbnails,
  fetchVideoInfo,
  handleInputChange,
  handleSubmit,
  handleKeyDown,
  handleDrop,
  handleDragOver,
  handleDragLeave,
  handleReset,
};
