<script lang="ts">
  import { fly } from "svelte/transition";

  import { IconCopy, IconDropletFilled, IconExternalLink, IconStar, IconStarFilled } from "#lib/icons/index.ts";
  import Button from "#lib/components/actions/Button.svelte";
  import ButtonLink from "#lib/components/actions/ButtonLink.svelte";
  import { copyText } from "#lib/utils/clipboard.ts";
  import { addToast } from "#lib/components/floating/toast-events.ts";
  import { formatError } from "#lib/utils/shared.ts";
  import type { VideoCard } from "#lib/oembed/index.ts";

  import { getLookupContext } from "../logic/lookup.svelte";
  import { getHistoryContext } from "../logic/history.svelte";
  import { getRinseContext } from "../../rinse/logic/rinse.svelte";
  import ResultMonitor from "./ResultMonitor.svelte";
  import ResultEmbed from "./ResultEmbed.svelte";
  import ResultThumbs from "./ResultThumbs.svelte";
  import ResultRaw from "./ResultRaw.svelte";

  let { card }: { card: VideoCard } = $props();

  const lookup = getLookupContext();
  const history = getHistoryContext();
  const rinse = getRinseContext();

  type Subtab = "preview" | "embed" | "thumbs" | "raw";

  const SUBTABS: { id: Subtab; label: string }[] = [
    { id: "preview", label: "預覽" },
    { id: "embed", label: "內嵌碼" },
    { id: "thumbs", label: "縮圖" },
    { id: "raw", label: "原始資料" },
  ];

  let subtab = $state<Subtab>("preview");

  const starred = $derived(history.isStarred(card.videoId));
  const initial = $derived(card.authorName.trim().charAt(0).toUpperCase() || "?");

  function handleToggleStar() {
    // starred 是 derived，切換後立刻讀到的是新值，提示文字要先把舊值留下來
    const wasStarred = starred;
    lookup.handleToggleStar();
    addToast({ message: wasStarred ? "已移除星號" : "已加上星號", variant: "info" });
  }

  async function handleCopyUrl() {
    try {
      await copyText(card.url);
      addToast({ message: "已複製影片連結", variant: "success" });
    } catch (e) {
      addToast({ message: formatError(e), variant: "error" });
    }
  }
</script>

<article>
  {#key card.videoId}
    <ResultMonitor {card} />
  {/key}

  <div class="body">
    <h3>{card.title}</h3>

    <div class="meta">
      <a class="author" href={card.authorUrl} target="_blank" rel="noopener">
        <span class="avatar">{initial}</span>
        <span>{card.authorName}</span>
      </a>
      <span class="provider">{card.providerName} · {card.type}</span>
    </div>

    <div class="actions">
      <ButtonLink variant="outlined" href={card.url} target="_blank" rel="noopener">
        <IconExternalLink size={14} />
        在 YouTube 開啟
      </ButtonLink>

      <Button variant="outlined" onclick={handleCopyUrl}>
        <IconCopy size={14} />
        複製連結
      </Button>

      <Button variant="outlined" onclick={() => rinse.handleAdopt(card.thumbnailUrl, `${card.videoId}-thumbnail`)}>
        <IconDropletFilled size={14} />
        沖洗縮圖
      </Button>

      <Button variant={starred ? "primary" : "outlined"} onclick={handleToggleStar}>
        {#if starred}
          <IconStarFilled size={14} />
          已加星號
        {:else}
          <IconStar size={14} />
          加入星號
        {/if}
      </Button>
    </div>
  </div>

  <div class="subtabs" role="tablist" aria-label="資訊卡內容">
    {#each SUBTABS as item (item.id)}
      <button type="button" role="tab" aria-selected={subtab === item.id} onclick={() => (subtab = item.id)}>
        {item.label}
      </button>
    {/each}
  </div>

  <div class="subpanel">
    {#key subtab}
      <div in:fly={{ y: 6, duration: 180 }}>
        {#if subtab === "preview"}
          <p class="hint">點擊上方畫面中的播放鍵即可直接預覽（透過 YouTube 官方內嵌播放器）。</p>
        {:else if subtab === "embed"}
          <ResultEmbed {card} />
        {:else if subtab === "thumbs"}
          <ResultThumbs {card} />
        {:else}
          <ResultRaw {card} />
        {/if}
      </div>
    {/key}
  </div>
</article>

<style>
  article {
    background-color: var(--color-bg-card);
    border: var(--border-style);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  .body {
    padding: 1.375rem 1.625rem 0.5rem;
  }

  h3 {
    margin-bottom: 0.625rem;
    font: var(--font-title2);
    word-break: break-word;
    text-wrap: pretty;
  }

  .meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.125rem;
  }

  .author {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    height: var(--control-height);
    padding: 0 0.75rem 0 0.375rem;
    font: var(--font-button);
    color: var(--color-text-muted);
    text-decoration: none;
    background-color: var(--color-bg-subtle);
    border: var(--border-style);
    border-radius: var(--radius-pill);
    transition:
      color 0.15s var(--ease),
      border-color 0.15s var(--ease);

    &:hover {
      color: var(--color-accent);
      border-color: var(--color-accent);
    }
  }

  .avatar {
    display: grid;
    place-items: center;
    width: 1.25rem;
    height: 1.25rem;
    font: var(--font-body2);
    font-weight: 700;
    color: var(--color-accent);
    background-color: hsl(from var(--color-accent) h s l / 0.35);
    border-radius: 50%;
  }

  .provider {
    font: var(--font-mono);
    color: var(--color-text-muted);
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .subtabs {
    display: flex;
    gap: 1.25rem;
    margin-top: 0.875rem;
    padding: 1rem 1.625rem 0;
    border-top: var(--border-style);
  }

  .subtabs button {
    padding: 0.625rem 0.25rem;
    font: var(--font-button);
    color: var(--color-text-muted);
    border-bottom: 2px solid transparent;
    border-radius: 0;
    transition:
      color 0.15s var(--ease),
      border-color 0.15s var(--ease);

    &:hover {
      color: var(--color-text);
    }

    &[aria-selected="true"] {
      color: var(--color-text);
      border-bottom-color: var(--color-accent);
    }
  }

  .subpanel {
    padding: 1.125rem 1.625rem 1.625rem;
  }

  .hint {
    font: var(--font-body2);
    color: var(--color-text-muted);
  }

  @media (max-width: 640px) {
    .body {
      padding: 1.125rem 1.125rem 0.375rem;
    }

    .subtabs,
    .subpanel {
      padding-left: 1.125rem;
      padding-right: 1.125rem;
    }

    .subtabs {
      gap: 0.875rem;
      overflow-x: auto;

      /* 與卡片同色，純粹是為了讓這個 scroller 有不透明背景可搬進捲動內容空間 */
      background-color: var(--color-bg-card);
    }
  }
</style>
