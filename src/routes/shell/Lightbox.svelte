<script lang="ts">
  import { fade, scale } from "svelte/transition";

  import { IconX } from "#lib/icons";
  import Button from "#lib/components/actions/Button.svelte";
  import { Modal } from "#lib/components/floating/modal.core.svelte.ts";
  import { getLightboxContext } from "../logic/lightbox.svelte";

  const lightbox = getLightboxContext();

  const modal = new Modal({
    get open() {
      return lightbox.image !== null;
    },
    get onclose() {
      return lightbox.handleClose;
    },
  });

  function handleViewportClick(event: MouseEvent) {
    if (event.target === event.currentTarget) lightbox.handleClose();
  }
</script>

<dialog bind:this={modal.dialogEl} aria-label="圖片檢視" oncancel={modal.handleCancel}>
  {#if lightbox.image !== null}
    <div
      class="viewport"
      role="presentation"
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

      <img src={lightbox.image.src} alt={lightbox.image.alt} in:scale={{ duration: 200, start: 0.96 }} />
    </div>
  {/if}
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
  }
</style>
