/**
 * @file types.ts
 * 整個專案共用的基礎型別
 */

import type { HTMLAttributes } from "svelte/elements";

/** 將型別展開成較易閱讀的形式 */
export type Prettify<T> = { [K in keyof T]: T[K] } & {};

/** 一個圖示元件的 props */
export interface IconProps extends HTMLAttributes<SVGElement> {
  /** 圖示大小 (CSS 單位) */
  size?: number | string;
  /** 圖示顏色 (CSS 顏色值) */
  color?: string;
}
