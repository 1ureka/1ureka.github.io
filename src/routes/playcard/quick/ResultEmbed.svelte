<script lang="ts">
  import { IconCopy } from "#lib/icons/index.ts";
  import Button from "#lib/components/actions/Button.svelte";
  import CodeBlock from "#lib/components/display/CodeBlock.svelte";
  import { copyText } from "#lib/utils/clipboard.ts";
  import { addToast } from "#lib/components/floating/toast-events.ts";
  import { formatError } from "#lib/utils/shared.ts";
  import type { VideoCard } from "#lib/oembed/index.ts";

  import { getEmbedContext, EMBED_SIZES } from "../logic/embed.svelte";

  let { card }: { card: VideoCard } = $props();

  const embed = getEmbedContext();

  const code = $derived(card.html.length > 0 ? card.html : "（此影片未提供內嵌程式碼）");

  async function handleCopy() {
    try {
      await copyText(code);
      addToast({ message: "已複製內嵌程式碼", variant: "success" });
    } catch (e) {
      addToast({ message: formatError(e), variant: "error" });
    }
  }
</script>

<div class="sizes">
  {#each EMBED_SIZES as size (size.id)}
    <button type="button" aria-pressed={embed.current === size.id} onclick={() => embed.handleSelect(size.id)}>
      {size.label}
    </button>
  {/each}
</div>

<CodeBlock {code} />

<div class="toolbar">
  <Button variant="outlined" onclick={handleCopy}>
    <IconCopy size={14} />
    複製程式碼
  </Button>
</div>

<style>
  .sizes {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
    margin-bottom: 0.75rem;
  }

  /* 三選一的即時切換，不是下拉；高度與其他控制項一致 */
  .sizes button {
    display: inline-flex;
    align-items: center;
    height: var(--control-height);
    padding: 0 0.75rem;
    font: var(--font-button);
    color: var(--color-text-muted);
    background-color: var(--color-bg-card);
    border: var(--border-style);
    border-radius: var(--radius-sm);
    transition: all 0.15s var(--ease);

    &:hover {
      border-color: var(--color-border);
    }

    &[aria-pressed="true"] {
      color: var(--color-accent);
      background-color: var(--color-accent-tint);
      border-color: var(--color-accent);
    }
  }

  .toolbar {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 0.625rem;
  }
</style>
