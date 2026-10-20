<script lang="ts">
  import { fade, scale } from "svelte/transition";

  import { IconX } from "#lib/icons";
  import Button from "#lib/components/actions/Button.svelte";
  import { Modal } from "#lib/components/floating/modal.core.svelte.ts";
  import { getLightboxContext } from "../../logic/lightbox.svelte";
  import { Picker } from "./picker.svelte";
  import PickerTrigger from "./PickerTrigger.svelte";
  import PickerLoupe from "./PickerLoupe.svelte";
  import PickerPanel from "./PickerPanel.svelte";

  const lightbox = getLightboxContext();

  const picker = new Picker({
    get src() {
      return lightbox.image?.src;
    },
  });

  // Esc 與點背景一層一層退：先收起取色，取色已在待命才關閉 Lightbox
  function handleBack() {
    if (!picker.handleBack()) lightbox.handleClose();
  }

  const modal = new Modal({
    get open() {
      return lightbox.image !== null;
    },
    get onclose() {
      return handleBack;
    },
  });

  // 只有按下與放開都在背景上才算點背景；在圖片上按下、拖到背景放開（例如取色時拖出圖片）不算
  let pressedOnViewport = false;

  function handleViewportPointerDown(event: PointerEvent) {
    pressedOnViewport = event.target === event.currentTarget;
  }

  function handleViewportClick(event: MouseEvent) {
    if (pressedOnViewport && event.target === event.currentTarget) handleBack();
  }
</script>

<dialog bind:this={modal.dialogEl} aria-label="圖片檢視" oncancel={modal.handleCancel}>
  {#if lightbox.image !== null}
    <div
      class="viewport"
      role="presentation"
      onpointerdown={handleViewportPointerDown}
      onclick={handleViewportClick}
      in:fade={{ duration: 150 }}
      out:fade={{ duration: 150 }}
      onoutroend={modal.handleOutroEnd}
    >
      <div class="close">
        <Button variant="outlined" padding="icon" onclick={lightbox.handleClose}>
          <IconX size={17} />
          <span class="sr-only">關閉</span>
        </Button>
      </div>

      <img
        src={lightbox.image.src}
        alt={lightbox.image.alt}
        class:picking={picker.mode === "picking"}
        draggable={picker.mode === "picking" ? "false" : undefined}
        in:scale={{ duration: 200, start: 0.96 }}
        {@attach picker.target}
      />

      <PickerTrigger {picker} />
    </div>
  {/if}

  <!--
    放大鏡與結果面板是 popover，必須留在 dialog 裡：modal dialog 開著時，它以外的節點全是 inert。
    但要放在 viewport 外——viewport 離場時其中的區塊會被暫停，它們就沒辦法自己播完離場動畫。
  -->
  <PickerLoupe {picker} />
  <PickerPanel {picker} />
</dialog>

<style>
  dialog {
    position: fixed;
    inset: 0;
    width: 100dvw;
    height: 100dvh;
    max-width: none;
    max-height: none;
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    background: transparent;
    overflow: visible;
  }

  .viewport {
    display: grid;
    /* 隱式的 auto 列會被圖片的高度撐開，max-height: 100% 就跟著失效；固定成填滿視窗且不可被內容撐大的軌道 */
    grid-template: minmax(0, 1fr) / minmax(0, 1fr);
    place-items: center;
    width: 100%;
    height: 100%;
    padding: 2.5rem;
    background-color: var(--color-scrim-strong);
  }

  .close {
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
  }

  img {
    max-width: 100%;
    max-height: 100%;
    border-radius: var(--radius-sm);
    box-shadow: var(--shadow-lg);

    &.picking {
      cursor: crosshair;
      touch-action: none;
      user-select: none;
    }
  }
</style>
