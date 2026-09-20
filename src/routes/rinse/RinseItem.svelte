<script lang="ts">
  import { IconAdjustments, IconCopy, IconDownload, IconMaximize, IconTrash } from "$lib/icons";
  import Button from "$lib/components/actions/Button.svelte";
  import { tooltip } from "$lib/components/floating/tooltip.core.svelte";
  import { formatBytes, formatRelative } from "$lib/utils/shared";
  import { RINSE_FORMAT, describeType } from "$lib/utils/image";

  import { getLightboxContext } from "../logic/lightbox.svelte";
  import { getRinseContext, SOURCE_LABELS, type RinseEntry } from "./logic/rinse.svelte";

  let { entry, onsaveas }: { entry: RinseEntry; onsaveas: (entry: RinseEntry) => void } = $props();

  const rinse = getRinseContext();
  const lightbox = getLightboxContext();

  const filename = $derived(`${entry.name}.png`);
</script>

<div class="item">
  <button type="button" class="preview" onclick={() => lightbox.handleOpen(entry.url, filename)}>
    <img src={entry.previewUrl} alt="" loading="lazy" />
    <span class="zoom"><IconMaximize size={16} /></span>
    <span class="sr-only">放大 {filename}</span>
  </button>

  <div class="info">
    <span class="name ellipsis">{filename}</span>
    <span class="sub">
      <span class="dim">{entry.width} × {entry.height}</span>
      <span>·</span>
      <span class="trade">
        {describeType(entry.originalType)}
        {formatBytes(entry.originalSize)}
        <span class="arrow">→</span>
        PNG {formatBytes(entry.blob.size)}
      </span>
      <span>·</span>
      <span>{SOURCE_LABELS[entry.source]}</span>
      <span>·</span>
      <span>{formatRelative(entry.createdAt)}</span>
    </span>
  </div>

  <div class="actions">
    <Button
      variant="ghost"
      padding="icon"
      onclick={() => rinse.handleSave(entry, { format: RINSE_FORMAT })}
      {@attach tooltip({ content: "下載 PNG" })}
    >
      <IconDownload size={20} />
      <span class="sr-only">下載 {filename}</span>
    </Button>

    <Button variant="ghost" padding="icon" onclick={() => onsaveas(entry)} {@attach tooltip({ content: "另存為…" })}>
      <IconAdjustments size={20} />
      <span class="sr-only">另存為其他格式或尺寸</span>
    </Button>

    <Button
      variant="ghost"
      padding="icon"
      onclick={() => rinse.handleCopy(entry)}
      {@attach tooltip({ content: "複製 PNG 到剪貼簿" })}
    >
      <IconCopy size={20} />
      <span class="sr-only">複製 {filename}</span>
    </Button>

    <Button
      variant="ghost"
      padding="icon"
      onclick={() => rinse.handleRemove(entry.id)}
      {@attach tooltip({ content: "自清單移除" })}
    >
      <IconTrash size={20} />
      <span class="sr-only">自清單移除 {filename}</span>
    </Button>
  </div>
</div>

<style>
  .item {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    padding: 0.75rem;
  }

  .preview {
    position: relative;
    flex-shrink: 0;
    width: 6rem;
    height: 3.375rem;
    padding: 0;
    overflow: hidden;
    background: none;
    border: none;
    border-radius: var(--radius-sm);
  }

  .preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;

    /* 沖洗的結果可能帶透明；棋盤格讓「這裡沒有東西」與「這裡是白的」分得開 */
    background-color: var(--color-bg-subtle);
    background-image:
      linear-gradient(45deg, var(--color-bg-active) 25%, transparent 25%),
      linear-gradient(-45deg, var(--color-bg-active) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, var(--color-bg-active) 75%),
      linear-gradient(-45deg, transparent 75%, var(--color-bg-active) 75%);
    background-size: 12px 12px;
    background-position:
      0 0,
      0 6px,
      6px -6px,
      -6px 0;
  }

  .zoom {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.35);
    opacity: 0;
    transition: opacity 0.15s var(--ease);
  }

  .preview:hover .zoom,
  .preview:focus-visible .zoom {
    opacity: 1;
  }

  .info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .name {
    font: var(--font-title4);
  }

  .sub {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.4375rem;
    min-width: 0;
    font: var(--font-caption);
    color: var(--color-text-muted);
  }

  .dim,
  .trade {
    font: var(--font-kbd);
    white-space: nowrap;
  }

  .arrow {
    color: var(--color-accent);
  }

  .actions {
    display: flex;
    flex-shrink: 0;
    gap: 0.125rem;
  }

  @media (max-width: 640px) {
    .item {
      flex-wrap: wrap;
    }

    .actions {
      width: 100%;
      justify-content: flex-end;
    }
  }
</style>
