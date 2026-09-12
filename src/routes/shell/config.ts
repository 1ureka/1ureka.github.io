import { IconEraser, IconLinkFilled, IconPhotoFilled, IconPlayerPlayFilled } from "$lib/icons";
import type { ToolId } from "../logic/tool.svelte";

type ToolPresentation = {
  /** 品牌區顯示的名稱 */
  name: string;
  /** 品牌標記的圖示 */
  Icon: typeof IconPlayerPlayFilled;
  /** 全域投放提示的圖示與說明 */
  DropIcon: typeof IconPlayerPlayFilled;
  dropHint: string;
};

/** 每個工具在殼層的呈現；工具本身的內容由各自的元件負責 */
export const TOOLS: Record<ToolId, ToolPresentation> = {
  playcard: {
    name: "Playcard",
    Icon: IconPlayerPlayFilled,
    DropIcon: IconLinkFilled,
    dropHint: "放開以查詢這個 YouTube 連結",
  },
  sanitizer: {
    name: "Sanitizer",
    Icon: IconEraser,
    DropIcon: IconPhotoFilled,
    dropHint: "放開以載入這張圖片",
  },
};
