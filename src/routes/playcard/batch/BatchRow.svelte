<script lang="ts">
  import { IconCopy, IconExternalLink } from "#lib/icons";
  import Button from "#lib/components/actions/Button.svelte";
  import ButtonLink from "#lib/components/actions/ButtonLink.svelte";
  import StatusPill from "#lib/components/display/StatusPill.svelte";
  import { copyText } from "#lib/utils/clipboard.ts";
  import { addToast } from "#lib/components/floating/toast-events.ts";
  import { formatError } from "#lib/utils/shared.ts";
  import { thumbnailUrl } from "#lib/oembed";
  import type { BatchRow } from "../logic/batch.svelte";
  import { tooltip } from "#lib/components/floating/tooltip.core.svelte.ts";

  let { row }: { row: BatchRow } = $props();

  async function handleCopy(html: string) {
    try {
      await copyText(html);
      addToast({ message: "已複製內嵌程式碼", variant: "success" });
    } catch (e) {
      addToast({ message: formatError(e), variant: "error" });
    }
  }
</script>

<tr>
  <td>
    <div class="title">
      {#if row.status === "ok"}
        <img src={thumbnailUrl(row.card.videoId)} alt="" loading="lazy" />
        <span class="text ellipsis" title={row.card.title}>{row.card.title}</span>
      {:else if row.status === "error"}
        <span class="placeholder"></span>
        <span class="text failed">{row.message}</span>
      {:else}
        <span class="placeholder"></span>
        <span class="text ellipsis">{row.url}</span>
      {/if}
    </div>
  </td>

  <td class="channel">{row.status === "ok" ? row.card.authorName : "—"}</td>

  <td>
    {#if row.status === "ok"}
      <StatusPill status="ok">成功</StatusPill>
    {:else if row.status === "error"}
      <StatusPill status="error">失敗</StatusPill>
    {:else}
      <StatusPill status="pending">等待中</StatusPill>
    {/if}
  </td>

  <td>
    {#if row.status === "ok"}
      <div class="actions">
        <ButtonLink
          variant="ghost"
          padding="icon"
          href={row.card.url}
          target="_blank"
          rel="noopener"
          {@attach tooltip({ content: "開啟" })}
        >
          <IconExternalLink size={20} />
          <span class="sr-only">開啟</span>
        </ButtonLink>
        <Button
          variant="ghost"
          padding="icon"
          onclick={() => handleCopy(row.card.html)}
          {@attach tooltip({ content: "內嵌碼" })}
        >
          <IconCopy size={20} />
          <span class="sr-only">內嵌碼</span>
        </Button>
      </div>
    {/if}
  </td>
</tr>

<style>
  td {
    padding: 0.625rem 0.875rem;
    font: var(--font-body2);
    vertical-align: middle;
    border-bottom: var(--border-style);
  }

  tr:last-child td {
    border-bottom: none;
  }

  .title {
    display: flex;
    align-items: center;
    gap: 0.625rem;
  }

  img,
  .placeholder {
    width: 4rem;
    height: 2.25rem;
    flex-shrink: 0;
    object-fit: cover;
    background-color: var(--color-bg-subtle);
    border-radius: 6px;
  }

  .text {
    max-width: 17.5rem;
    font-weight: 600;
  }

  .failed {
    font-weight: 400;
    color: var(--color-error);
  }

  .channel {
    color: var(--color-text-muted);
  }

  .actions {
    display: flex;
    gap: 0.375rem;
  }

  @media (max-width: 680px) {
    tr {
      display: block;
      padding: 0.75rem 0.875rem;
      border-bottom: var(--border-style);
    }

    td {
      display: block;
      width: 100%;
      padding: 0.25rem 0;
      border: none;
    }

    .text {
      max-width: 100%;
    }
  }
</style>
