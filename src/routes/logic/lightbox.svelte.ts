/**
 * @file lightbox.svelte.ts
 * 管理全螢幕圖片檢視。
 *
 * 屬於殼層而非任何單一工具：兩個工具都會需要把某張圖放大來看。
 */

import { getContext, setContext } from "svelte";

class LightboxController {
  /** 目前檢視中的圖片，`null` 表示未開啟 */
  image = $state<{ src: string; alt: string } | null>(null);

  handleOpen = (src: string, alt: string) => {
    this.image = { src, alt };
  };

  handleClose = () => {
    this.image = null;
  };
}

const key = Symbol("lightbox-controller");

export const createLightboxContext = () => {
  const controller = new LightboxController();
  setContext(key, controller);
  return controller;
};

export const getLightboxContext = () => getContext<LightboxController>(key);
