<script lang="ts">
  import { IconStar, IconStarFilled, IconTrash } from "#lib/icons";
  import Button from "#lib/components/actions/Button.svelte";
  import { tooltip } from "#lib/components/floating/tooltip.core.svelte.ts";
  import { formatRelative } from "#lib/utils/shared.ts";

  import type { HistoryEntry } from "../logic/history.svelte";
  import { getHistoryContext } from "../logic/history.svelte";
  import { getLookupContext } from "../logic/lookup.svelte";

  let { entry }: { entry: HistoryEntry } = $props();

  // 狀態來自歷史，但「再查一次」這個事件屬於快速查詢
  const history = getHistoryContext();
  const lookup = getLookupContext();
</script>

<div class="item">
  <button type="button" class="open" onclick={() => lookup.handleUse(entry.url)}>
    <img src={entry.thumbnailUrl} alt="" loading="lazy" />
    <span class="info">
      <span class="title ellipsis">{entry.title}</span>
      <span class="sub">
        <span class="ellipsis">{entry.authorName}</span>
        <span>·</span>
        <span>{formatRelative(entry.fetchedAt)}</span>
      </span>
    </span>
    <span class="sr-only">重新查詢這部影片</span>
  </button>

  <div class="actions">
    <Button
      variant="ghost"
      padding="icon"
      onclick={() => history.handleToggleStar(entry.videoId)}
      {@attach tooltip({ content: entry.starred ? "移除星號" : "加入星號" })}
    >
      {#if entry.starred}
        <span class="starred"><IconStarFilled size={20} /></span>
      {:else}
        <IconStar size={20} />
      {/if}
      <span class="sr-only">切換星號</span>
    </Button>

    <Button
      variant="ghost"
      padding="icon"
      onclick={() => history.handleRemove(entry.videoId)}
      {@attach tooltip({ content: "刪除這筆紀錄" })}
    >
      <IconTrash size={20} />
      <span class="sr-only">刪除這筆紀錄</span>
    </Button>
  </div>
</div>

<style>
  .item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem;
  }

  .open {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 0.875rem;
    padding: 0;
    text-align: left;
    background: none;
    border: none;
  }

  img {
    width: 6rem;
    height: 3.375rem;
    flex-shrink: 0;
    object-fit: cover;
    background-color: var(--color-bg-subtle);
    border-radius: var(--radius-sm);
  }

  .info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.1875rem;
  }

  .title {
    font: var(--font-title4);
  }

  .sub {
    display: flex;
    gap: 0.5rem;
    min-width: 0;
    font: var(--font-caption);
    color: var(--color-text-muted);
  }

  .actions {
    display: flex;
    flex-shrink: 0;
    gap: 0.125rem;
  }

  .starred {
    display: inline-flex;
    color: var(--color-accent);
  }
</style>
