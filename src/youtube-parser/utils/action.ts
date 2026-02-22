import { videoStore, initialVideoState } from "./store";

// ---------------------------------------------------------------------------
// 核心邏輯
// ---------------------------------------------------------------------------

/**
 * 從各種格式的 YouTube URL 中解析出影片 ID（11 字元）
 *
 * 支援格式：
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/v/VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 */
const parseVideoId = (url: string): string | null => {
  const match = url.match(/(?:youtube\.com\/(?:watch\?.*v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match?.[1] ?? null;
};

/**
 * 根據影片 ID 產生三種尺寸的縮圖 URL
 *
 * - large:  maxresdefault (1280×720)
 * - medium: hqdefault     (480×360)
 * - small:  mqdefault     (320×180)
 */
const generateThumbnails = (videoId: string) => ({
  large: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
  medium: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
  small: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
});

/**
 * 發送 oEmbed API 請求，取得影片資訊並更新 store
 */
const fetchVideoInfo = async (url: string) => {
  videoStore.setState({ loading: true, error: null });

  const videoId = parseVideoId(url);
  if (!videoId) {
    videoStore.setState({ loading: false, error: "無法解析影片 ID，請確認連結格式正確" });
    return;
  }

  // 避免過度使用
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
  } catch (e) {
    const message = e instanceof Error ? e.message : "未知錯誤";
    videoStore.setState({ loading: false, error: message, videoInfo: null, thumbnails: null });
  }
};

// ---------------------------------------------------------------------------
// Event Handlers — 供 UI 直接作為事件處理器使用
// ---------------------------------------------------------------------------

/** 更新輸入框的值 */
const handleInputChange = (value: string) => {
  videoStore.setState({ inputValue: value });
};

/** 送出輸入框中的連結進行解析 */
const handleSubmit = () => {
  const { inputValue } = videoStore.getState();
  if (inputValue.trim()) fetchVideoInfo(inputValue.trim());
};

/** 鍵盤事件：在輸入框中按下 Enter 送出 */
const handleKeyDown = (e: { key: string }) => {
  if (e.key === "Enter") handleSubmit();
};

/** 拖放事件：放下連結 */
const handleDrop = (e: { preventDefault: () => void; dataTransfer?: DataTransfer | null }) => {
  e.preventDefault();
  videoStore.setState({ dropActive: false });

  const text = e.dataTransfer?.getData("text/uri-list") || e.dataTransfer?.getData("text/plain") || "";

  if (text.trim()) {
    videoStore.setState({ inputValue: text.trim() });
    fetchVideoInfo(text.trim());
  }
};

/** 拖放事件：拖曳經過（需 preventDefault 才能接收 drop） */
const handleDragOver = (e: { preventDefault: () => void }) => {
  e.preventDefault();
  videoStore.setState({ dropActive: true });
};

/** 拖放事件：拖曳離開區域 */
const handleDragLeave = () => {
  videoStore.setState({ dropActive: false });
};

/** 重置所有狀態回到初始值 */
const handleReset = () => {
  videoStore.setState({ ...initialVideoState });
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
