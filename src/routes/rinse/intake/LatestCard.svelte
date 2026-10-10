<script lang="ts">
  import { IconAdjustments, IconCheckFilled, IconCopy, IconDownload, IconInfoCircleFilled, IconMaximize } from "$lib/icons";
  import Button from "$lib/components/actions/Button.svelte";
  import Modal from "$lib/components/floating/Modal.svelte";
  import { formatBytes } from "$lib/utils/shared";
  import { RINSE_FORMAT, describeType } from "$lib/utils/image";

  import { getLightboxContext } from "../../logic/lightbox.svelte";
  import { getRinseContext, SOURCE_LABELS, type RinseLatest } from "../logic/rinse.svelte";
  import { getRinseTabsContext } from "../logic/tabs.svelte";
  import RinseSaveAs from "../RinseSaveAs.svelte";

  let { latest }: { latest: RinseLatest } = $props();

  const rinse = getRinseContext();
  const tabs = getRinseTabsContext();
  const lightbox = getLightboxContext();

  const filename = $derived(`${latest.name}.png`);
  const record = $derived(latest.record);

  // 另存為的對話框是這張卡的呈現細節，不需要進 controller
  let saving = $state(false);
</script>

<article>
  <button type="button" class="preview" onclick={() => lightbox.handleOpen(latest.url, filename)}>
    {#key latest.url}
      <img src={latest.url} alt={filename} />
    {/key}
    <span class="zoom"><IconMaximize size={18} /></span>
    <span class="sr-only">放大 {filename}</span>
  </button>

  <div class="body">
    <h3 class="ellipsis">{filename}</h3>

    <div class="meta">
      <span class="mono">{record.width} × {record.height}</span>
      <span>·</span>
      <span class="mono">
        {describeType(record.originalType)}
        {formatBytes(record.originalSize)}
        <span class="arrow">→</span>
        PNG {formatBytes(record.size)}
      </span>
      <span>·</span>
      <span>{SOURCE_LABELS[record.source]}</span>
    </div>

    {#if latest.saved}
      <p class="status saved">
        <IconCheckFilled size={15} />
        <span>已存進歷史</span>
        <button type="button" class="link" onclick={() => tabs.handleSelect("history")}>查看</button>
      </p>
    {:else}
      <p class="status unsaved">
        <IconInfoCircleFilled size={15} />
        <span>沒有存進歷史</span>
        <button type="button" class="link" onclick={() => tabs.handleSelect("history")}>整理歷史</button>
      </p>
    {/if}

    <div class="actions">
      <Button variant="primary" onclick={() => rinse.handleSave(latest, { format: RINSE_FORMAT })}>
        <IconDownload size={15} />
        下載 PNG
      </Button>

      <Button variant="outlined" onclick={() => (saving = true)}>
        <IconAdjustments size={15} />
        另存為…
      </Button>

      <Button variant="outlined" onclick={() => rinse.handleCopy(latest.blob)}>
        <IconCopy size={15} />
        複製
      </Button>
    </div>
  </div>
</article>

<Modal open={saving} onclose={() => (saving = false)} aria-label="另存為">
  <RinseSaveAs image={latest} onclose={() => (saving = false)} />
</Modal>

<style>
  article {
    position: relative;
    background-color: var(--color-bg-card);
    border: var(--border-style);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  .preview {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 22rem;
    padding: 1rem;
    border: none;
    border-bottom: var(--border-style);

    /* 沖洗的結果可能帶透明；棋盤格讓「這裡沒有東西」與「這裡是白的」分得開 */
    background-color: var(--color-bg-subtle);
    background-image:
      linear-gradient(45deg, var(--color-bg-active) 25%, transparent 25%),
      linear-gradient(-45deg, var(--color-bg-active) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, var(--color-bg-active) 75%),
      linear-gradient(-45deg, transparent 75%, var(--color-bg-active) 75%);
    background-size: 16px 16px;
    background-position:
      0 0,
      0 8px,
      8px -8px,
      -8px 0;
  }

  .preview img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    box-shadow: var(--shadow-lg);
  }

  .zoom {
    position: absolute;
    right: 0.75rem;
    bottom: 0.75rem;
    display: grid;
    place-items: center;
    width: 2.25rem;
    height: 2.25rem;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.45);
    border-radius: var(--radius-control);
    opacity: 0;
    transition: opacity 0.15s var(--ease);
  }

  .preview:hover .zoom,
  .preview:focus-visible .zoom {
    opacity: 1;
  }

  .body {
    padding: 1.375rem 1.625rem 1.5rem;
  }

  h3 {
    margin-bottom: 0.5rem;
    font: var(--font-title2);
  }

  .meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.4375rem;
    font: var(--font-caption);
    color: var(--color-text-muted);
  }

  .mono {
    font: var(--font-kbd);
    white-space: nowrap;
  }

  .arrow {
    color: var(--color-accent);
  }

  .status {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    margin: 0.875rem 0 1.125rem;
    font: var(--font-body2);

    &.saved {
      color: var(--color-success);
    }

    &.unsaved {
      color: var(--color-error);
    }
  }

  .link {
    margin-left: 0.25rem;
    font: var(--font-body2);
    color: var(--color-text-muted);
    text-decoration: underline;
    text-underline-offset: 3px;

    &:hover {
      color: var(--color-text);
    }
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  @media (max-width: 640px) {
    .preview {
      height: 16rem;
    }
  }
</style>
