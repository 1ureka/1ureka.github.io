<script lang="ts">
  import type { Snippet } from "svelte";

  let { icon, children }: { icon?: Snippet; children: Snippet } = $props();
</script>

<div class="empty">
  {#if icon}
    <span>{@render icon()}</span>
  {/if}
  <p>{@render children()}</p>
</div>

<style>
  .empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 3.5rem 1.25rem;
    text-align: center;
    color: var(--color-text-muted);
    border: var(--border-style);
    border-style: dashed;
    border-radius: var(--radius-md);
  }

  span {
    color: inherit;
  }

  p {
    font: var(--font-body2);
    color: inherit;
  }
</style>
