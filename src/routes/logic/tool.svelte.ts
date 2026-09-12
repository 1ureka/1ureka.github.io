/**
 * @file tool.svelte.ts
 * 管理目前啟用的是哪一個工具
 */

import { getContext, setContext } from "svelte";

/** 站上的工具；兩個工具共用同一個網址，切換純粹是本地狀態 */
export type ToolId = "playcard" | "sanitizer";

/** 切換的循環順序 */
const ORDER: ToolId[] = ["playcard", "sanitizer"];

class ToolController {
  /** 目前啟用的工具 */
  current = $state<ToolId>("playcard");

  /** 按下切換鈕後會成為目前工具的那一個 */
  next = $derived(ORDER[(ORDER.indexOf(this.current) + 1) % ORDER.length]);

  /** 切換到下一個工具 */
  handleSwitch = () => {
    this.current = this.next;
  };
}

const key = Symbol("tool-controller");

export const createToolContext = () => {
  const controller = new ToolController();
  setContext(key, controller);
  return controller;
};

export const getToolContext = () => getContext<ToolController>(key);
