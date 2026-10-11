/**
 * @file dropzone.svelte.ts
 * 追蹤是否有內容正被拖入視窗，供全域投放提示使用。
 *
 * 這裡只管「提示要不要出現」；投放內容本身由 `+page.svelte` 交給目前的工具，
 * 能不能解析是那個工具自己的職責。
 */

import { getContext, setContext } from "svelte";
import { hasDragPayload } from "#lib/utils/dnd.ts";

class DropzoneController {
  /**
   * dragenter / dragleave 會在每個子元素的邊界反覆成對觸發，
   * 單看事件會讓提示閃爍，因此以進出深度計數判斷是否真的離開視窗。
   */
  private depth = 0;

  /** 是否正有可用的內容懸停在視窗上 */
  active = $state(false);

  handleDragEnter = (event: DragEvent) => {
    if (!hasDragPayload(event.dataTransfer)) return;
    this.depth += 1;
    this.active = true;
  };

  handleDragOver = (event: DragEvent) => {
    if (!hasDragPayload(event.dataTransfer)) return;
    // 不攔截預設行為，瀏覽器會直接開啟被拖入的連結或檔案，drop 永遠不會發生
    event.preventDefault();
    if (event.dataTransfer !== null) event.dataTransfer.dropEffect = "copy";
  };

  handleDragLeave = () => {
    this.depth = Math.max(0, this.depth - 1);
    if (this.depth === 0) this.active = false;
  };

  /** 投放發生時收起提示；內容的處理不屬於這裡 */
  handleDrop = () => {
    this.depth = 0;
    this.active = false;
  };
}

const key = Symbol("dropzone-controller");

export const createDropzoneContext = () => {
  const controller = new DropzoneController();
  setContext(key, controller);
  return controller;
};

export const getDropzoneContext = () => getContext<DropzoneController>(key);
