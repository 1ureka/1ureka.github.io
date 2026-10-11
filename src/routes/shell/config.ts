import { IconDropletFilled, IconLinkFilled, IconPhotoFilled, IconPlayerPlayFilled } from "#lib/icons/index.ts";
import type { ToolId } from "../logic/tool.svelte";

type ToolPresentation = {
  /** 品牌區顯示的名稱 */
  name: string;
  /** 品牌標記的圖示 */
  Icon: typeof IconPlayerPlayFilled;
  /** 品牌標記的圖示大小；每個圖示的視覺重量不同，同一個數字看起來不會一樣大 */
  markSize: number;
  /** 全域投放提示的圖示與說明 */
  DropIcon: typeof IconPlayerPlayFilled;
  dropHint: string;
};

/** 每個工具在殼層的呈現；工具本身的內容由各自的元件負責 */
export const TOOLS: Record<ToolId, ToolPresentation> = {
  playcard: {
    name: "Playcard",
    Icon: IconPlayerPlayFilled,
    markSize: 15,
    DropIcon: IconLinkFilled,
    dropHint: "放開以查詢這個 YouTube 連結",
  },
  rinse: {
    name: "Rinse",
    Icon: IconDropletFilled,
    markSize: 17,
    DropIcon: IconPhotoFilled,
    dropHint: "放開以沖洗這張圖片",
  },
};
