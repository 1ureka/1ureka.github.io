<script lang="ts">
  import { IconCopy, IconMaximize } from "$lib/icons";
  import Button from "$lib/components/actions/Button.svelte";
  import { copyText } from "$lib/utils/clipboard";
  import { addToast } from "$lib/components/floating/toast-events";
  import { formatError } from "$lib/utils/shared";
  import { THUMBNAIL_VARIANTS, thumbnailUrl, type VideoCard } from "$lib/oembed";
  import { getLightboxContext } from "../../logic/lightbox.svelte";

  let { card }: { card: VideoCard } = $props();

  const lightbox = getLightboxContext();

  const variants = $derived(THUMBNAIL_VARIANTS.map((v) => ({ ...v, url: thumbnailUrl(card.videoId, v.file) })));

  async function handleCopy(url: string) {
    try {
      await copyText(url);
      addToast({ message: "已複製縮圖連結", variant: "success" });
    } catch (e) {
      addToast({ message: formatError(e), variant: "error" });
    }
  }
</script>

<div class="grid">
  {#each variants as variant (variant.name)}
    <div class="card">
      <button
        type="button"
        class="preview"
        onclick={() => lightbox.handleOpen(variant.url, `${card.title}（${variant.name}）`)}
      >
        <img src={variant.url} alt={variant.name} loading="lazy" />
        <span class="zoom"><IconMaximize size={16} /></span>
        <span class="sr-only">放大 {variant.name}</span>
      </button>

      <div class="body">
        <div class="name">{variant.name}</div>
        <div class="dim">{variant.width} × {variant.height}</div>
        <Button variant="outlined" onclick={() => handleCopy(variant.url)}>
          <IconCopy size={13} />
          複製連結
        </Button>
      </div>
    </div>
  {/each}
</div>

<p class="note">註：maxresdefault 高畫質縮圖並非每部影片都提供，若圖片空白代表該解析度不存在。</p>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(9.375rem, 1fr));
    gap: 0.75rem;
  }

  .card {
    background-color: var(--color-bg-subtle);
    border: var(--border-style);
    border-radius: var(--radius-control);
    overflow: hidden;
  }

  .preview {
    position: relative;
    display: block;
    width: 100%;
    padding: 0;
    border: none;
    background: none;
  }

  .preview img {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    background-color: var(--color-bg-subtle);
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

  .body {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
    padding: 0.5625rem 0.625rem;
  }

  .name {
    font: var(--font-mono);
    font-weight: 700;
  }

  .dim {
    margin-bottom: 0.375rem;
    font: var(--font-caption);
    color: var(--color-text-muted);
  }

  .note {
    margin-top: 1.5rem;
    font: var(--font-caption);
    color: var(--color-text-muted);
  }
</style>
