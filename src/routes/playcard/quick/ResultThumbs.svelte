<script lang="ts">
  import { IconCopy, IconDropletFilled, IconMaximize } from "$lib/icons";
  import Button from "$lib/components/actions/Button.svelte";
  import { tooltip } from "$lib/components/floating/tooltip.core.svelte";
  import { copyText } from "$lib/utils/clipboard";
  import { addToast } from "$lib/components/floating/toast-events";
  import { formatError } from "$lib/utils/shared";
  import { THUMBNAIL_VARIANTS, thumbnailUrl, type VideoCard } from "$lib/oembed";
  import { getLightboxContext } from "../../logic/lightbox.svelte";
  import { getRinseContext } from "../../rinse/logic/rinse.svelte";

  let { card }: { card: VideoCard } = $props();

  const lightbox = getLightboxContext();

  // 縮圖直接遞給另一個工具去沖洗。YouTube 的縮圖主機開放跨來源讀取，
  // 所以這條路不必經過拖曳，也不必開第二個分頁。
  const rinse = getRinseContext();

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

        <div class="actions">
          <Button
            variant="outlined"
            style="flex: 1; min-width: 0;"
            onclick={() => rinse.handleAdopt(variant.url, `${card.videoId}-${variant.name}`)}
          >
            <IconDropletFilled size={13} />
            沖洗 PNG
          </Button>

          <Button
            variant="ghost"
            padding="icon"
            onclick={() => handleCopy(variant.url)}
            {@attach tooltip({ content: "複製縮圖連結" })}
          >
            <IconCopy size={16} />
            <span class="sr-only">複製縮圖連結</span>
          </Button>
        </div>
      </div>
    </div>
  {/each}
</div>

<p class="note">
  註：maxresdefault 高畫質縮圖並非每部影片都提供，若圖片空白代表該解析度不存在。「沖洗 PNG」會把縮圖交給 Rinse
  重畫成一張乾淨的 PNG 再存下來。
</p>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(10.625rem, 1fr));
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

  .actions {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    width: 100%;
  }

  .note {
    margin-top: 1.5rem;
    font: var(--font-caption);
    color: var(--color-text-muted);
  }
</style>
