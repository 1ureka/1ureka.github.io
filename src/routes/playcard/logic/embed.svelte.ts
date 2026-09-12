/**
 * @file embed.svelte.ts
 * 管理內嵌碼要輸出的尺寸。
 *
 * 尺寸是查詢的輸入而非結果的衍生——oEmbed 的內嵌 HTML 由端點依 maxwidth / maxheight 產生，
 * 所以它必須先於查詢存在，這也是它不依賴 lookup 的原因。
 */

import { getContext, setContext } from "svelte";

export const EMBED_SIZES = [
  { id: "320x180", label: "小・320×180", width: 320, height: 180 },
  { id: "640x360", label: "中・640×360", width: 640, height: 360 },
  { id: "854x480", label: "大・854×480", width: 854, height: 480 },
] as const;

export type EmbedSizeId = (typeof EMBED_SIZES)[number]["id"];

class EmbedController {
  /** 目前選定的尺寸 */
  current = $state<EmbedSizeId>("640x360");

  /** 目前尺寸的實際寬高，查詢時帶給端點 */
  dims = $derived(EMBED_SIZES.find((s) => s.id === this.current) ?? EMBED_SIZES[1]);

  handleSelect = (id: EmbedSizeId) => {
    this.current = id;
  };
}

const key = Symbol("playcard-embed-controller");

export const createEmbedContext = () => {
  const controller = new EmbedController();
  setContext(key, controller);
  return controller;
};

export const getEmbedContext = () => getContext<EmbedController>(key);
