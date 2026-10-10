<script lang="ts" generics="T extends string">
  import type { Snippet } from "svelte";
  import { crossfade } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  type Item = { id: T; label: string; hint?: string };

  interface Props {
    /** 分頁項目，順序即呈現順序 */
    items: Item[];
    /** 目前選定的分頁 */
    current: T;
    /** 整組分頁的無障礙名稱 */
    label: string;
    onselect: (id: T) => void;
    /** 放在分頁前面、不屬於分頁的控制項（例如開關），與分頁之間以分隔線隔開 */
    leading?: Snippet;
  }

  let { items, current, label, onselect, leading }: Props = $props();

  // 選取指示器在按鈕之間 crossfade，視覺上就是一顆滑過去的膠囊
  const [send, receive] = crossfade({ duration: 260, easing: cubicOut });
  const indicatorKey = $props.id();
</script>

<div class="tabbar">
  {#if leading}
    {@render leading()}
    <span class="divider" aria-hidden="true"></span>
  {/if}

  <div class="tabs" role="tablist" aria-label={label}>
    {#each items as item (item.id)}
      <button type="button" role="tab" aria-selected={item.id === current} onclick={() => onselect(item.id)}>
        <span class="label">{item.label}</span>

        {#if item.hint !== undefined}
          <span class="hint">{item.hint}</span>
        {/if}

        {#if item.id === current}
          <span class="indicator" in:receive={{ key: indicatorKey }} out:send={{ key: indicatorKey }}></span>
        {/if}
      </button>
    {/each}
  </div>
</div>

<style>
  .tabbar {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    padding: 4px;
    background-color: var(--color-bg-subtle);
    border: var(--border-style);
    border-radius: var(--radius-pill);
  }

  .tabs {
    display: inline-flex;
    gap: 2px;
  }

  .divider {
    height: 1.125rem;
    margin: 0 0.375rem;
    border-right: var(--border-style);
  }

  button {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 0.3125rem;
    padding: 0rem 1.125rem;
    height: calc(var(--control-height) * 0.8);
    white-space: nowrap;
    font: var(--font-button);
    color: var(--color-text-muted);
    border-radius: var(--radius-pill);
    transition: color 0.18s var(--ease);

    &:hover {
      color: var(--color-text);
    }

    &[aria-selected="true"] {
      color: color-mix(var(--color-accent) 85%, var(--color-text));
    }
  }

  .indicator {
    position: absolute;
    inset: 0;
    background-color: hsl(from var(--color-accent) h s l / 0.2);
    border-radius: var(--radius-pill);
    box-shadow: var(--shadow-sm);
  }

  .hint {
    opacity: 0.75;
    font: var(--font-kbd);
  }
</style>
